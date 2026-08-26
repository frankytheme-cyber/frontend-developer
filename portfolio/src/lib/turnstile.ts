/**
 * Verifica del token Cloudflare Turnstile (captcha invisibile e gratuito).
 *
 * Variabili d'ambiente:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  0x4AAA...   — chiave pubblica, mostra il widget
 *   TURNSTILE_SECRET_KEY            0x4AAA...   — chiave privata, verifica il token
 *
 * Se TURNSTILE_SECRET_KEY non è impostata il controllo viene saltato: il form
 * resta funzionante e protetto dagli altri strati (honeypot, time-trap,
 * rate limit, filtro contenuti).
 */

const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = { ok: true } | { ok: false; reason: string };

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true };

  if (!token) return { ok: false, reason: "token mancante" };

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);

    const res = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };

    if (data.success) return { ok: true };
    return { ok: false, reason: (data["error-codes"] ?? ["verifica fallita"]).join(", ") };
  } catch (err) {
    // Cloudflare irraggiungibile: non blocchiamo un utente vero per un problema nostro.
    console.error("[turnstile] verifica non riuscita:", err instanceof Error ? err.message : err);
    return { ok: true };
  }
}
