# Portfolio — Simone Puliti · Frontend Developer

Landing page portfolio minimalista dark, stile terminale.
Stack: **Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion**

---

## Avvio rapido

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Aggiornare i progetti

Tutto il contenuto dei progetti è in un unico file tipizzato:

```
src/data/projects.ts
```

### Aggiungere un progetto web

```ts
// src/data/projects.ts
export const webProjects: Project[] = [
  // ...
  {
    id: "nuovo-progetto",                  // slug unico
    name: "Nome Progetto",
    description: "Descrizione breve del progetto.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://esempio.it",         // opzionale
    repoUrl: "https://github.com/tu/repo", // opzionale
  },
];
```

### Aggiungere un progetto crypto / DeFi

Stesso schema, ma nell'array `cryptoProjects`:

```ts
export const cryptoProjects: Project[] = [
  // ...
  {
    id: "nuovo-defi",
    name: "Nome Protocollo",
    description: "Dashboard React per ...",
    tech: ["React", "Viem", "wagmi", "TypeScript"],
    repoUrl: "https://github.com/tu/repo",
  },
];
```

### Tipo `Project`

```ts
type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;  // URL sito live (mostra icona ArrowUpRight)
  repoUrl?: string;  // URL GitHub (mostra icona Github)
};
```

---

## Personalizzare i dati personali

| Cosa                    | File                                       |
| ----------------------- | ------------------------------------------ |
| Nome, titolo, tagline   | `src/components/Hero.tsx`                  |
| Statistiche (counters)  | `src/components/Hero.tsx`                  |
| Email, GitHub, LinkedIn | `src/components/Contact.tsx`               |
| Metadata SEO, JSON-LD   | `src/app/layout.tsx`                       |
| URL sito                | `.env.local` → `NEXT_PUBLIC_SITE_URL`      |

---

## Variabili d'ambiente

Crea un file `.env.local` nella root del progetto:

```env
NEXT_PUBLIC_SITE_URL=https://tuosito.it
```

Su Vercel, aggiungila in **Settings → Environment Variables**.

---

## Build e sitemap

```bash
npm run build
# esegue automaticamente: next build → next-sitemap
# genera: public/sitemap.xml + public/robots.txt
```

La configurazione sitemap è in `next-sitemap.config.js`.

---

## Deploy su Vercel

1. Push del repo su GitHub
2. Vai su [vercel.com](https://vercel.com) → **New Project** → importa il repo
3. Aggiungi la variabile `NEXT_PUBLIC_SITE_URL` nelle impostazioni
4. Click **Deploy** — Vercel rileva automaticamente Next.js

**Ogni push su `main` fa re-deploy automatico.**

### Dominio custom

In Vercel → **Domains** → aggiungi il tuo dominio e segui le istruzioni DNS.

---

## Struttura file

```
src/
├── app/
│   ├── globals.css        # stili base + palette
│   ├── layout.tsx         # metadata SEO, JSON-LD, font
│   └── page.tsx           # composizione sezioni
├── components/
│   ├── Hero.tsx           # typewriter, counter animato
│   ├── ProjectsWeb.tsx    # griglia progetti web
│   ├── ProjectsCrypto.tsx # griglia progetti DeFi
│   ├── ProjectCard.tsx    # card riusabile (web + crypto)
│   └── Contact.tsx        # link contatti, disponibilità
└── data/
    └── projects.ts        # ← MODIFICA QUI per aggiornare i progetti
```
