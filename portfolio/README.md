# simonepuliti.dev — Astro + Decap CMS

Sito di Simone Puliti, migrato da Next.js ad **Astro** (output statico + endpoint
serverless mirati) con contenuti editabili da **Decap CMS**.

Stack: **Astro 7 · TypeScript · Tailwind CSS v4 · Decap CMS · Vercel**

---

## Avvio rapido

```bash
npm install
npm run dev
# → http://localhost:4321 (o la prima porta libera)
```

```bash
npm run build     # build statica + funzioni serverless (Vercel adapter)
npm run preview   # richiede `vercel dev` per l'adapter Vercel, vedi sotto
```

Per testare in locale le route serverless (form contatti, OAuth Decap) con lo
stesso ambiente di produzione, usa la Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

---

## Struttura

```
src/
├── content.config.ts     # schema delle content collections (Astro content layer)
├── content/
│   ├── guide/            # articoli (ex "blog"), Markdown
│   ├── projects-web/     # card progetti "Siti Web"
│   ├── projects-crypto/  # card progetti "Dashboard & Fintech"
│   └── service/          # testo delle pagine /servizi/*
├── layouts/BaseLayout.astro   # <head>, meta tag, JSON-LD, font
├── components/            # sezioni e componenti .astro (Nav, Hero, Contact, ...)
├── lib/                   # validazione form, invio email, anti-spam, Turnstile
├── scripts/reveal.ts       # animazioni reveal on-scroll (progressive enhancement)
└── pages/
    ├── index.astro, assistenza-wordpress-verona.astro, tool-ai-verona.astro
    ├── servizi/[slug].astro, progetti/siti-web.astro, progetti/dashboard-fintech.astro
    ├── chi-sono.astro, contatti.astro
    ├── guide/index.astro, guide/[slug].astro
    └── api/contact.ts, api/auth.ts, api/callback.ts
public/
├── admin/            # Decap CMS (index.html + config.yml)
└── images/           # asset statici referenziati da content/ (es. fiamm.jpg)
```

### Principio di progressive enhancement

Ogni pagina funziona **senza JavaScript**: navigazione (dropdown e menu mobile
sono `<details>`/`<summary>` nativi), animazioni reveal (visibili subito senza
JS, animate con JS), form contatti (POST classico con redirect a
`/contatti?sent=1` / `?error=...` se JS è disabilitato, altrimenti `fetch` con
stato inline). JS migliora l'esperienza, non è un requisito.

---

## Contenuti e Decap CMS

Tutti i contenuti editoriali (guide, progetti, testo delle pagine servizio)
sono **content collections Markdown** in `src/content/`, pensate per essere
modificate da Decap CMS su `/admin` senza toccare il codice.

### Login e pubblicazione

1. Vai su `https://<dominio>/admin`.
2. Clicca **Login with GitHub** → verrai reindirizzato a GitHub per
   l'autorizzazione, poi riportato al pannello.
3. Modifica un contenuto (es. un progetto, un articolo) e premi **Pubblica**:
   Decap fa un commit diretto sul branch `dev` del repository.
4. Deploy automatico: ogni push su `dev` genera un'anteprima Vercel; il merge
   `dev → main` (e quindi la pubblicazione definitiva) lo decide il cliente
   dopo revisione.

### Setup OAuth provider (una tantum, per chi amministra il repo)

Vercel non ha un provider OAuth nativo per Decap come Netlify Identity. Questo
progetto include un provider OAuth GitHub "fatto in casa" con due endpoint
serverless (`src/pages/api/auth.ts` e `src/pages/api/callback.ts`), che
implementano il protocollo "external OAuth client" documentato da Decap CMS.

1. Crea una **GitHub OAuth App**: GitHub → Settings → Developer settings →
   OAuth Apps → New OAuth App.
   - Homepage URL: `https://<dominio-produzione>`
   - Authorization callback URL: `https://<dominio-produzione>/api/callback`
2. Copia **Client ID** e **Client Secret** nelle variabili d'ambiente Vercel:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
3. In `public/admin/config.yml`, `backend.base_url` deve puntare al dominio
   dove girano `/api/auth` e `/api/callback` (di default `https://simonepuliti.dev`).
   **Nota:** le anteprime Vercel per-PR hanno un dominio diverso a ogni deploy,
   quindi il login su `/admin` va testato su un dominio stabile (produzione o
   un alias fisso), non sull'URL di anteprima effimero di ogni PR.
4. L'utente che fa login deve avere permessi di scrittura sul repository
   `frankytheme-cyber/frontend-developer` (collaboratore o membro
   dell'organizzazione).

---

## Form contatti

Endpoint serverless `src/pages/api/contact.ts`, protetto da 5 livelli
anti-spam (honeypot, time-trap, rate limit, Turnstile opzionale, filtro
contenuti). Invio email tramite [Resend](https://resend.com).

Variabili d'ambiente (vedi `.env.example`):

```env
RESEND_API_KEY=...
CONTACT_TO_EMAIL=simowebdesigner@gmail.com
CONTACT_FROM_EMAIL="Sito Simone Puliti <noreply@simonepuliti.dev>"
PUBLIC_TURNSTILE_SITE_KEY=...   # opzionale
TURNSTILE_SECRET_KEY=...       # opzionale
```

Senza `RESEND_API_KEY` configurata, in sviluppo l'invio viene simulato
(loggato in console) così il form resta testabile end-to-end.

---

## Redirect e SEO

- `/blog` e `/blog/:slug` → redirect 301 a `/guide` e `/guide/:slug`
  (`vercel.json`), poiché la sezione articoli è stata rinominata nella nuova
  mappa di navigazione.
- Sitemap generata automaticamente in build (`@astrojs/sitemap`) su
  `/sitemap-index.xml`, referenziata da `robots.txt`.
- Meta tag (title, description, OG, Twitter, geo, canonical) e dati
  strutturati JSON-LD sono presenti su ogni pagina (`BaseLayout.astro` +
  blocco `jsonLd` per pagina); i **valori definitivi di copy/keyword** sono a
  cura di SEO & GEO.

---

## Aperto / da decidere (handoff per PM, SEO & GEO, QA)

- Pagine `/servizi/*` e `/chi-sono` hanno contenuto placeholder (segnalato nel
  testo stesso) in attesa del copy definitivo da SEO & GEO.
- `/contatti` come pagina reale per il CTA "Contatti": applicata la regola del
  Board in SIM-31 §4.2 ("ogni voce porta a una pagina vera"); PM può
  confermare o correggere se l'intenzione era diversa.
- `/guide` ora monta la `Nav` (il vecchio `/blog` non la montava): scelta
  necessaria perché "Guide" è ora una voce di navigazione primaria.
- Le animazioni `whileInView` di Framer Motion sono state riprodotte con un
  sistema CSS + IntersectionObserver equivalente (stessa curva di easing,
  stagger sulle card), ma i valori di delay per singolo elemento sono stati
  **raggruppati in poche fasce** invece di replicare ogni valore esatto in
  millisecondi — nessuna differenza percepibile, ma segnalato per il confronto
  QA pixel-by-pixel.
- Advisory npm nota (non bloccante): `@astrojs/vercel` dipende da
  `@vercel/routing-utils` → `path-to-regexp` (GHSA-9wv6-86v2-598j, ReDoS).
  Nessuna versione dell'adapter attualmente disponibile la risolve; da
  monitorare con `npm audit` ai prossimi aggiornamenti.
- Lighthouse non ancora misurato in locale (richiede build Vercel/preview
  reale per i punteggi più rappresentativi): da eseguire su anteprima Vercel
  prima della sign-off QA.
