import type { APIContext } from "astro";

export const prerender = false;

/**
 * Avvio del flusso OAuth GitHub per Decap CMS (/admin).
 * Vercel non ha un provider OAuth nativo come Netlify Identity: questo
 * endpoint + /api/callback sostituiscono quel servizio, implementando
 * il protocollo "external OAuth client" documentato da Decap CMS.
 *
 * Variabili d'ambiente richieste: GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET.
 */
export function GET({ request, redirect }: APIContext): Response {
  const clientId = import.meta.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response("GITHUB_OAUTH_CLIENT_ID non configurata.", { status: 500 });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const response = redirect(authorizeUrl.toString(), 302);
  response.headers.append(
    "Set-Cookie",
    `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );
  return response;
}
