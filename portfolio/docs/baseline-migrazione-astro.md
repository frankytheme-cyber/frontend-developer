# Baseline fedeltà visiva — Migrazione simonepuliti.dev → Astro + Decap

**Issue:** SIM-31 (figlio di SIM-30) · **Autore:** Designer · **Data:** 2026-10-12
**Scopo:** documentare 1:1 l'aspetto attuale del sito (Next.js) per il porting in Astro.
**NON è un redesign.** La grafica deve restare IDENTICA. Questo documento + gli screenshot
"prima" sono la baseline di confronto per Builder (SIM-32) e per la QA finale.

> Fonte autorevole dei token = `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Nav.tsx`
> del repo attuale. Gli screenshot sono catturati dal sito live `https://simonepuliti.dev`
> (verificato identico al repo: tema `sage-dark` forzato).

---

## 1. Pagine pubbliche (inventario)

Tutte presenti in `sitemap-0.xml`. Screenshot "prima" catturati ai 4 breakpoint richiesti
(360 · 768 · 1280 · 1920). Full-page, tema reale `sage-dark`.

| # | Pagina | URL | Sorgente | Altezza full-page @1280 |
|---|--------|-----|----------|--------------------------|
| 1 | Home (one-page) | `/` | `src/app/page.tsx` | 5714 px |
| 2 | Assistenza WordPress | `/assistenza-wordpress-verona` | `src/app/assistenza-wordpress-verona/page.tsx` | 3321 px |
| 3 | Tool AI | `/tool-ai-verona` | `src/app/tool-ai-verona/page.tsx` | 4307 px |
| 4 | Guide / Blog (lista) | `/blog` | `src/app/blog/page.tsx` | 898 px |
| 5 | Articolo | `/blog/come-integrare-claude-api-in-nextjs` | `src/app/blog/[slug]/page.tsx` | 4100 px |

Nomenclatura file screenshot: `<pagina>__<width>w.png` (es. `home__360w.png`).

> Nota cattura: le sezioni usano reveal `whileInView` (framer-motion). Per una baseline
> fedele dello stato "a riposo" gli screenshot sono stati catturati con reveal forzati
> visibili e `prefers-reduced-motion: reduce` (blob/aurora fermi). È così che l'utente
> vede la pagina dopo lo scroll — niente contenuti nascosti.

---

## 2. Design tokens (da portare 1:1)

### 2.1 Tema
- **Tema unico forzato: `sage-dark`** (dark mode). In `layout.tsx`:
  `defaultTheme="sage-dark"`, `forcedTheme="sage-dark"`, `enableSystem={false}`, `themes=["sage-dark"]`.
- Nel CSS esistono 5 palette × light/dark + fallback, **ma solo `sage-dark` è attiva in produzione.**
  Builder: portare `sage-dark` come tema attivo. Le altre palette sono codice legacy —
  **non** vanno esposte né rimosse dalla grafica (non impattano il render). `themeColor` meta = `#161e24`.
- `<html lang="it">`, `scroll-behavior: smooth`, `section[id] { scroll-margin-top: 72px }`.

### 2.2 Colori — `sage-dark` (token semantici, valori esatti)
| Token | Valore |
|-------|--------|
| `--bg` | `#161e24` |
| `--surface` | `#1c2024` |
| `--surface-2` | `#1f2a32` |
| `--border` | `rgba(255,255,255,0.10)` |
| `--border-soft` | `rgba(255,255,255,0.05)` |
| `--border-hover` | `#b3a8ff` |
| `--text` | `#f0f4f7` |
| `--muted` | `#b8c4cc` |
| `--muted-2` | `#8a98a0` |
| `--accent` | `#b3a8ff` (lavanda) |
| `--accent-light` | `#d0c8ff` |
| `--accent-dim` | `rgba(179,168,255,0.12)` |
| `--accent-2` | `#b3a8ff` |
| `--accent-2-soft` | `rgba(179,168,255,0.18)` |
| `--badge-text` | `#d0c8ff` |
| `--badge-bg` | `rgba(179,168,255,0.10)` |
| `--badge-border` | `rgba(255,255,255,0.10)` |
| `--card-bg` | `#1c2024` |
| `--card-border` | `rgba(255,255,255,0.10)` |
| `--card-bg-hover` | `#252a2f` |
| `--cloud-opacity` | `0.18` |
| `--section-alt` | `#1f2a32` |

### 2.3 Banda scura alternata — classe `.section-dark`
Usata come wrapper per le sezioni "AIServices" (Tool AI) e "ProjectsWeb" (Siti Web) nella home.
Ridefinisce i token nel suo scope:
| Token | Valore |
|-------|--------|
| `background` / `--bg` | `#161e24` |
| `--surface` | `#1c2024` |
| `--surface-2` | `#0a0c0d` |
| `--text` | `#ffffff` |
| `--muted` | `#8e9398` |
| `--muted-2` | `#6b7075` |
| `--accent` / `--accent-2` | `#b3a8ff` |
| `--badge-text` | `#d0c8ff` |
| `--badge-bg` | `rgba(179,168,255,0.08)` |
| `--card-bg` | `#1c2024` |
| `--card-bg-hover` | `#252a2f` |
| `--section-alt` | `#131516` |

### 2.4 Colori "dot" letterali (non token — valori fissi nelle card servizi Hero)
`#ff5722` · `#171412` · `#f59e0b` · `#0ea5e9` · `#ec4899` · `#10b981`.
CTA primaria scura letterale: bg `#171412`, border `#2a2724`, testo `#fff`.
Errore form: `#d9534f`.

### 2.5 Tipografia
- **Font testo:** `Inter` (Google, `next/font`), variabile `--font-inter`, pesi `400 500 600 700 800 900`.
  Fallback: `system-ui, -apple-system, sans-serif`.
- **Font mono:** `Geist Mono` (Google), variabile `--font-geist-mono` → `--font-mono`
  (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`).
  Usato per: label nav, eyebrow/badge, label form, breadcrumb, numeri, blocchi codice.
- **Base:** `body { font-size:16px; line-height:1.6 }`.
- **Scala display (clamp):**
  - H1 home: `clamp(2rem, 5.2vw, 4rem)`, `font-black (900)`, `line-height .95`, `letter-spacing -.03em`.
  - H1 landing/sezioni: `clamp(1.8rem, 4vw, 2.8rem)`, `font-black`, `tracking -.02em`.
  - H1 blog: `clamp(2.5rem, 6vw, 4.5rem)`, `font-black`, `tracking -.03em`, `leading-none`.
  - Sub hero: `clamp(1rem, 2vw, 1.35rem)` 600; eyebrow mono `11px` 600 uppercase `letter-spacing 1.4px`.
  - Body/tagline: `1rem–1.125rem`, `line-height 1.6–1.8`.
- **Prose blog** (`.prose-blog`): body `1.0625rem`/`1.8`; h2 `1.5rem` 800; h3 `1.125rem` 700;
  code/pre mono `.875rem`, bg `--surface`, border `--border`, radius `.75rem` (pre) / `.3rem` (inline code).

### 2.6 Spaziatura e layout
- Scala = **Tailwind v4 default** (0.25rem step). Nessuna spaziatura "fuori scala".
- **Padding sezioni:** `py-10 md:py-20` = 40px mobile / 80px ≥768px. Padding orizzontale `px-6` = 24px.
- **Container:** sezioni `max-w-6xl` (72rem/1152px) `mx-auto`; nav `max-width:1200px`;
  hero contenuto `max-width:1080px`; blog `max-w-4xl` (56rem); tagline hero `max-width:640px`.
- **Nav height:** `h-14` (56px) desktop; header fixed, `z-30`.

### 2.7 Radii
| Elemento | Radius |
|----------|--------|
| Card servizi Hero | `12px` |
| Pulsanti (CTA, hero, mobile menu) | `2px` |
| `.contact-card` | `4px` |
| `.contact-field` / submit / ghost | `2px` |
| Badge / eyebrow pill | `999px` |
| Dot colore card | `999px` (cerchio) |
| `pre` codice | `.75rem` · scrollbar thumb `2px` |

### 2.8 Bordi
- Default `1px solid var(--border)`; soft `var(--border-soft)`; hover → `var(--accent)` o `var(--border-hover)`.

### 2.9 Breakpoint (Tailwind v4 default)
`sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
Switch nav desktop/mobile = **`md` (768px)**: menu orizzontale `hidden md:flex`, hamburger `md:hidden`.

### 2.10 Ombre / focus
- Nessuna drop-shadow diffusa (design flat su superfici).
- **Focus-visible form:** `outline:none; border-color:var(--accent); box-shadow: 0 0 0 3px var(--accent-dim)`.
- Header on-scroll (`scrollY>8`): `backdrop-filter: saturate(140%) blur(10px)`,
  bg `color-mix(in oklab, var(--bg) 80%, transparent)`, `border-bottom 1px var(--border-soft)`.

### 2.11 Animazioni / transizioni (portare 1:1, con rispetto `prefers-reduced-motion`)
- **Intro framer-motion** (hero e sezioni): fade/translate con `delay` 0.1→0.8s,
  `duration` 0.3–0.6s, easing `[0.16, 1, 0.3, 1]` (e `easeOut`). Card servizi: stagger `delay 0.8 + i*0.06`.
- **Reveal sezioni:** `whileInView` (comparsa on-scroll).
- **Blob/sfondo decorativi** (`AuroraBackground`, nuvole hero, light-blob): keyframe
  `aurora-drift-1/2/3` (14/18/22s), `cloud-1/2/3` (16/20/24s), `light-drift-1..4` (10–15s),
  tutti `ease-in-out infinite alternate`.
- **`@media (prefers-reduced-motion: reduce)`** → `animation:none !important` su tutti i blob/aurora/cloud. **Mantenere.**
- **Hover/transition UI:** colori `.15s`; `opacity`/all `.2s`; nav `duration-200`;
  card servizi `border-color .15s`; field `border-color .15s, box-shadow .15s`.
- **Scrollbar** custom webkit: width `4px`, thumb `var(--border)` → hover `var(--accent)`.
- **`::selection`:** `color-mix(in oklab, var(--accent) 25%, transparent)`.
- **Texture:** `.hero-grain` (SVG fractal noise, `opacity .04`, `mix-blend multiply`),
  `ParticlesBackground` (particelle), `OrderBook`/`TerminalCode` (widget animati).

---

## 3. Inventario sezioni per pagina (struttura, non ridisegnare)

### 3.1 Home `/` (`page.tsx`)
Ordine DOM: `AuroraBackground` → `ParticlesBackground` → `Nav` → contenuto `z-10`:
1. **Hero** (`#top`) — eyebrow pill "Disponibile · Verona / Remote"; H1 *"Web Designer & Sviluppatore Tool AI a Verona."*; sub "Simone Puliti"; H2 mono servizi; tagline; 2 CTA ("Parliamo del tuo progetto" primaria + "Scopri i miei progetti" ghost); griglia 6 card servizi (`grid-cols-1 sm:2 lg:3`).
2. **Tool AI** (`#tool-ai`, wrapper `.section-dark`) — `AIServices`: H2 "Tool AI su Misura", terminale integrazione, pills tech, 4 card feature.
3. **Dashboard & Tool** (`#progetti-crypto`) — `ProjectsCrypto`: H2 "Dashboard & Tool", widget `OrderBook`, pills, 3 project card (Uniswap Pool Analyzer, Rebalance Tool, Order Book Simulator).
4. **Siti Web** (`#progetti-web`, wrapper `.section-dark`) — `ProjectsWeb`: H2 "Siti Web", terminale, 3 project card (Sartori di Verona, Domini Veneti, FIAMM Easy Rider).
5. **Contatti** (`#contatti`) — `Contact` + `ContactForm`: H2 "Lavoriamo insieme.", form (nome, email, topic/select, messaggio, consenso privacy, honeypot, Turnstile), contatti (email, LinkedIn, "Verona, Italia").

> Componente `BlogPreview` (`#blog`) esiste nel repo ma **non** è montato nella home attuale.

### 3.2 `/assistenza-wordpress-verona` (`page.tsx`)
`Nav` + breadcrumb (`/ → Assistenza WordPress`), H1, sezioni servizio con H2 `#servizi`, CTA `#contatti`.

### 3.3 `/tool-ai-verona` (`page.tsx`)
`Nav` + breadcrumb, H1, sezioni (casi uso `#casi-uso`), più H2, CTA `#contatti`.

### 3.4 `/blog` (`page.tsx`)
**NON** monta `<Nav/>`. Back-link proprio "← simonepuliti.dev". Eyebrow "Articoli", H1 "Blog.",
sottotitolo, divisore, griglia `sm:grid-cols-2` di `BlogCard`. Empty state: *"Nessun articolo pubblicato."*

### 3.5 `/blog/[slug]` (`page.tsx`)
Articolo MDX con `.prose-blog`, `.back-link`, `.article-cta`.

---

## 4. Mappa di navigazione (confermata dal Board)

**Stile grafico del menu = identico all'attuale `Nav.tsx`** (logo "Simone Puliti**.**" con dot `--accent-2`;
label mono uppercase `tracking .14em`, colore `--muted` → hover `--text`; header fixed con blur on-scroll;
switch mobile a `md` con hamburger `lucide` Menu/X, pannello mobile con blur). Da aggiungere: pattern **dropdown**
per "Servizi" e "Progetti" (nuova variante del componente nav — vedi §4.3) e **Contatti come pulsante CTA**.

### 4.1 Nav attuale (da sostituire) — SOLO ancore
`Tool AI (#tool-ai)` · `Dashboard & Tool (#progetti-crypto)` · `Progetti Web (#progetti-web)` · `Contatti (#contatti)`.

### 4.2 Nav confermata → destinazioni reali
Regola Board: **ogni voce porta a una pagina vera quando esiste, non a un'ancora.**

| Voce menu | Sotto-voce | Destinazione | Stato |
|-----------|-----------|--------------|-------|
| **Servizi** ▾ | Siti WordPress & E-commerce | `/servizi/siti-wordpress-ecommerce` | **DA CREARE** (baseline: card servizio Hero + copy SEO esistente) |
| | Assistenza WordPress | `/assistenza-wordpress-verona` | **ESISTE** ✓ |
| | Tool AI | `/tool-ai-verona` | **ESISTE** ✓ |
| | App React / Next.js | `/servizi/app-react-nextjs` | **DA CREARE** (baseline: card servizio Hero) |
| **Progetti** ▾ | Siti web | `/progetti/siti-web` | **DA CREARE** (baseline: sezione home `ProjectsWeb` / `#progetti-web`) |
| | Dashboard & Fintech | `/progetti/dashboard-fintech` | **DA CREARE** (baseline: sezione home `ProjectsCrypto` / `#progetti-crypto`) |
| **Chi sono** | — | `/chi-sono` | **DA CREARE** (nuova pagina — contenuto da fornire/SEO) |
| **Guide** | — | `/guide` (contenuti attuali in `/blog`) | **ESISTE come `/blog`** → rinominare/collegare a `/guide`; vuota all'inizio, gestita in **Decap**. Decidere con PM/SEO se mantenere `/blog` con redirect 301 → `/guide`. |
| **Contatti** (CTA) | — | `/contatti` | **DA CREARE** come pagina (riuso `ContactForm`); in alternativa interim ancora `/#contatti`. Da confermare con PM. |

### 4.3 Note per il Builder sulla nuova nav
- Il componente `Nav.tsx` attuale ha solo link flat: va esteso con 2 **dropdown** (Servizi, Progetti).
  Questa è una **nuova variante** del componente di navigazione (segnalata a PM per la libreria).
  Deve restare coerente con lo stile esistente (mono uppercase, hover `--text`, blur on-scroll).
- Mobile: un solo menu chiaro (hamburger esistente), dropdown come gruppi espandibili. No navigazione sperimentale, no scroll-jacking.
- "Contatti" diventa **pulsante CTA** (stile `.contact-submit` / CTA scura hero), non link testo.
- Le pagine "DA CREARE" portano **contenuto nuovo**: è lavoro di Build/Content, non modifica della grafica.
  La grafica/token di quelle pagine riusa 1:1 i token di questo documento e lo stile delle landing esistenti.

---

## 5. Asset e font (licenze)
- Font: `Inter` e `Geist Mono` via Google Fonts / `next/font` (licenza SIL OFL). In Astro usare `@fontsource` o import equivalenti.
- Immagini: `public/images/fiamm.jpg` (progetto reale FIAMM), `og-image.png`, SVG di sistema. Nessun asset di terzi non licenziato.
- Analytics: `@vercel/analytics`. Form: Cloudflare **Turnstile** (anti-spam) + honeypot. Portare le stesse misure.

---

## 6. Criteri di accettazione (per Builder SIM-32 e QA)
**Builder — porta in Astro mantenendo identico:**
1. Tema `sage-dark` (valori token §2.2) + banda `.section-dark` (§2.3) + token letterali (§2.4).
2. Tipografia Inter + Geist Mono, scala clamp §2.5.
3. Spaziature/container §2.6, radii §2.7, breakpoint `md=768` per switch nav §2.9.
4. Animazioni §2.11 **incluso `prefers-reduced-motion: reduce`**.
5. Struttura sezioni per pagina §3 (stesso ordine, stessi id ancora dove restano).
6. Nuova nav §4 con dropdown, pagine reali dove esistono, CTA Contatti.
7. Contrasto: testo/pulsanti ≥ WCAG AA (verifica a valle in QA; il tema dark attuale è la baseline).

**QA — confronto visivo finale:**
- Confrontare ogni pagina Astro vs screenshot "prima" allegati, ai 4 breakpoint (360/768/1280/1920).
- Verificare: nessuna deriva di colore/spaziatura, font corretti, reveal/animazioni presenti e
  disattivate con reduced-motion, nav dropdown funzionante e link alle pagine reali, form Turnstile+honeypot.
- Nessuna regressione SEO/meta (coordinare con SEO & GEO — non in scope Design).

**Vincolo trasversale:** NESSUN redesign. Ogni differenza visiva rispetto alla baseline è un difetto, non un miglioramento.
