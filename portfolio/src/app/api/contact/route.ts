import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { MIN_FILL_MS, topicLabel, validateContact, type ContactFields } from "@/lib/contact";
import { scoreSpam } from "@/lib/spam";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Anti-spam, cinque strati ───────────────────────────────────
   1. honeypot: campo "website" nascosto, i bot lo compilano
   2. time-trap: submit in meno di 3 secondi = bot
   3. rate limit in memoria: 3 invii / 10 min per IP
      (su serverless la memoria è per-istanza, quindi è una barriera
      morbida: alza il muro senza richiedere un KV store)
   4. Turnstile: captcha Cloudflare, attivo se le chiavi sono configurate
   5. filtro contenuti: punteggio su frasi, link e alfabeto del messaggio */

const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

const recentHits = (ip: string, now: number) =>
  (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);

function rateLimited(ip: string): boolean {
  return recentHits(ip, Date.now()).length >= MAX_PER_WINDOW;
}

/** Consuma uno slot solo per i messaggi davvero spediti, così chi sbaglia
    a compilare il form non si autoblocca per dieci minuti. */
function recordHit(ip: string): void {
  const now = Date.now();
  hits.set(ip, [...recentHits(ip, now), now]);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every(t => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Payload = Partial<ContactFields> & {
  website?: string;
  elapsed?: number;
  turnstileToken?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // Honeypot e time-trap: rispondiamo 200 senza inviare, così il bot non capisce di essere stato bloccato.
  const tooFast = typeof body.elapsed === "number" && body.elapsed < MIN_FILL_MS;
  if ((body.website ?? "").trim() !== "" || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Hai già inviato diversi messaggi. Riprova tra qualche minuto." },
      { status: 429 },
    );
  }

  const { errors, clean, valid } = validateContact(body);
  if (!valid) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const captcha = await verifyTurnstile(body.turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "Verifica anti-spam non superata. Ricarica la pagina e riprova." },
      { status: 403 },
    );
  }

  recordHit(ip);

  const spam = scoreSpam(clean);
  if (spam.drop) {
    // 200 finto: il bot crede di avere avuto successo e non riprova con altre varianti.
    console.warn(`[contact] messaggio scartato (score ${spam.score}): ${spam.reasons.join("; ")}`);
    return NextResponse.json({ ok: true });
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
    return NextResponse.json(
      { error: "Invio non riuscito. Scrivimi pure a simowebdesigner@gmail.com." },
      { status: result.reason === "not-configured" ? 503 : 502 },
    );
  }

  return NextResponse.json({ ok: true, simulated: result.simulated });
}
