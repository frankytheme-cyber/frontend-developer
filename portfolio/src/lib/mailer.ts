/**
 * Invio email tramite l'API REST di Resend (nessuna dipendenza aggiuntiva).
 *
 * Variabili d'ambiente richieste (.env.local in dev, dashboard host in prod):
 *   RESEND_API_KEY      re_xxxxxxxx           — chiave da resend.com/api-keys
 *   CONTACT_TO_EMAIL    simowebdesigner@gmail.com  — dove ricevi i messaggi
 *   CONTACT_FROM_EMAIL  "Sito | Simone Puliti <noreply@simonepuliti.dev>"
 *                       — il dominio dev'essere verificato su Resend
 *
 * Se le variabili non sono configurate: in sviluppo l'email viene stampata in
 * console (simulata) così il form è testabile; in produzione l'invio fallisce
 * in modo esplicito invece di far credere all'utente che sia partita.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type MailInput = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true; simulated: boolean }
  | { ok: false; reason: "not-configured" | "provider-error"; detail: string };

export async function sendMail({ subject, html, text, replyTo }: MailInput): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    const detail = "RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL non configurate";
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mailer] ${detail} — email simulata:\n--- ${subject} ---\n${text}\n---`);
      return { ok: true, simulated: true };
    }
    return { ok: false, reason: "not-configured", detail };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      // evita richieste appese che tengono viva la lambda
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => res.statusText);
      console.error("[mailer] Resend ha risposto", res.status, detail);
      return { ok: false, reason: "provider-error", detail: `${res.status} ${detail}` };
    }

    return { ok: true, simulated: false };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[mailer] invio fallito:", detail);
    return { ok: false, reason: "provider-error", detail };
  }
}
