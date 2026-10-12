import type { APIContext } from "astro";

export const prerender = false;

const GITHUB_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie") ?? "";
  return header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

/** Pagina HTML che completa l'handshake postMessage richiesto da Decap CMS
 *  per i client OAuth esterni (protocollo "authorizing:github" / "authorization:github:success"). */
function handshakePage(message: string): string {
  const safeMessage = JSON.stringify(message);
  return `<!doctype html>
<html><body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${safeMessage}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;
}

export async function GET({ request }: APIContext): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, "decap_oauth_state");

  const clientId = import.meta.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response("GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET non configurate.", { status: 500 });
  }
  if (!code || !state || state !== expectedState) {
    return new Response(handshakePage("authorization:github:error:stato non valido"), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  const tokenRes = await fetch(GITHUB_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${url.origin}/api/callback`,
    }),
  });

  const tokenData = (await tokenRes.json().catch(() => ({}))) as {
    access_token?: string;
    error_description?: string;
  };

  if (!tokenData.access_token) {
    const reason = tokenData.error_description ?? "token GitHub non ricevuto";
    return new Response(handshakePage(`authorization:github:error:${reason}`), {
      status: 401,
      headers: { "Content-Type": "text/html" },
    });
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });
  return new Response(handshakePage(`authorization:github:success:${payload}`), {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "decap_oauth_state=; Path=/; HttpOnly; Max-Age=0",
    },
  });
}
