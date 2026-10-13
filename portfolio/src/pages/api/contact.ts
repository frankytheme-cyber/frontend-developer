import type { APIContext } from "astro";
import { sendMail } from "@/lib/mailer";
import { MIN_FILL_MS, topicLabel, validateContact, type ContactFields } from "@/lib/contact";
import { scoreSpam } from "@/lib/spam";
import { verifyTurnstile } from "@/lib/turnstile";

export const prerender = false;

/* ── Anti-spam, cinque strati ───────────────────────────────────
   1. honeypot: campo "website" nascosto, i bot lo compilano
   2. time-trap: submit in meno di 3 secondi = bot (solo se il client ha JS:
      senza JS non possiamo misurare il tempo di compilazione, si salta)
   3. rate limit in memoria: 3 invii / 10 min per IP
   4. Turnstile: captcha Cloudflare, attivo se le chiavi sono configurate
   5. filtro contenuti: punteggio su frasi, link e alfabeto del messaggio */

const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

const recentHits = (ip: string, now: number) => (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

function rateLimited(ip: string): boolean {
  return recentHits(ip, Date.now()).length >= MAX_PER_WINDOW;
}

function recordHit(ip: string): void {
  const now = Date.now();
  hits.set(ip, [...recentHits(ip, now), now]);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Payload = Partial<ContactFields> & {
  website?: string;
  elapsed?: number;
  turnstileToken?: string;
};

async function parsePayload(request: Request): Promise<{ payload: Payload; wantsJson: boolean }> {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");

  if (wantsJson) {
    return { payload: (await request.json()) as Payload, wantsJson: true };
  }

  const form = await request.formData();
  const loadedAt = Number(form.get("loadedAt") ?? "");
  return {
    payload: {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      topic: String(form.get("topic") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "true" || form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      elapsed: loadedAt ? Date.now() - loadedAt : undefined,
    },
    wantsJson: false,
  };
}

export async function POST({ request, redirect }: APIContext): Promise<Response> {
  let payload: Payload;
  let wantsJson: boolean;
  try {
    ({ payload, wantsJson } = await parsePayload(request));
  } catch {
    return new Response(JSON.stringify({ error: "Richiesta non valida." }), { status: 400 });
  }

  const respond = (status: number, body: { ok?: boolean; error?: string; errors?: unknown; simulated?: boolean }, redirectQuery = "") => {
    if (wantsJson) {
      return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
    }
    return redirect(`/contatti${redirectQuery}`, 303);
  };

  // Honeypot e time-trap (solo se misurabile): rispondiamo "ok" senza inviare,
  // così il bot non capisce di essere stato bloccato.
  const tooFast = typeof payload.elapsed === "number" && payload.elapsed < MIN_FILL_MS;
  if ((payload.website ?? "").trim() !== "" || tooFast) {
    return respond(200, { ok: true }, "?sent=1");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return respond(429, { error: "Hai già inviato diversi messaggi. Riprova tra qualche minuto." }, "?error=rate-limit");
  }

  const { errors, clean, valid } = validateContact(payload);
  if (!valid) {
    if (!wantsJson) return respond(422, { errors }, "?error=validation");
    return new Response(JSON.stringify({ errors }), { status: 422, headers: { "Content-Type": "application/json" } });
  }

  const captcha = await verifyTurnstile(payload.turnstileToken, ip);
  if (!captcha.ok) {
    return respond(403, { error: "Verifica anti-spam non superata. Ricarica la pagina e riprova." }, "?error=captcha");
  }

  recordHit(ip);

  const spam = scoreSpam(clean);
  if (spam.drop) {
    console.warn(`[contact] messaggio scartato (score ${spam.score}): ${spam.reasons.join("; ")}`);
    return respond(200, { ok: true }, "?sent=1");
  }

  const label = topicLabel(clean.topic);
  const text = [
    `Nome:      ${clean.name}`,
    `Email:     ${clean.email}`,
    `Argomento: ${label}`,
    "",
    clean.message,
    ...(spam.flag ? ["", `— filtro anti-spam: score ${spam.score} (${spam.reasons.join("; ")})`] : []),
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#171412">
      <h2 style="margin:0 0 16px;font-size:18px">Nuovo messaggio dal sito</h2>
      <table style="border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:2px 12px 2px 0;color:#6b665f">Nome</td><td><strong>${escapeHtml(clean.name)}</strong></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#6b665f">Email</td><td><a href="mailto:${escapeHtml(clean.email)}">${escapeHtml(clean.email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#6b665f">Argomento</td><td>${escapeHtml(label)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;padding:16px;background:#f4f1eb;border-left:3px solid #3d2fa9">${escapeHtml(clean.message)}</div>
      ${spam.flag ? `<p style="margin-top:16px;font-size:13px;color:#8a5a00">Filtro anti-spam: score ${spam.score} — ${escapeHtml(spam.reasons.join("; "))}</p>` : ""}
    </div>
  `;

  const result = await sendMail({
    subject: `${spam.flag ? "[possibile spam] " : ""}[Sito] ${label} — ${clean.name}`,
    text,
    html,
    replyTo: clean.email,
  });

  if (!result.ok) {
    return respond(
      result.reason === "not-configured" ? 503 : 502,
      { error: "Invio non riuscito. Scrivimi pure a simowebdesigner@gmail.com." },
      "?error=send-failed",
    );
  }

  return respond(200, { ok: true, simulated: result.simulated }, "?sent=1");
}
