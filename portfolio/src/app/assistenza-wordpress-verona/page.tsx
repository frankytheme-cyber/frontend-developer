import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Shield, Zap, Bug, RefreshCw, ShoppingCart, LifeBuoy, Check, MessageSquare } from "lucide-react";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tuosito.it";
const PAGE_URL = `${SITE_URL}/assistenza-wordpress-verona`;

export const metadata: Metadata = {
  title: "Assistenza WordPress a Verona — Manutenzione, Sicurezza e Recupero Siti",
  description:
    "Assistenza WordPress professionale a Verona: manutenzione, sicurezza, recupero siti hackerati, ottimizzazione velocità, aggiornamenti. Intervento rapido, anche in emergenza. Preventivo gratuito.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "assistenza WordPress Verona",
    "manutenzione WordPress Verona",
    "sito WordPress hackerato Verona",
    "ottimizzazione WordPress Verona",
    "supporto WordPress Verona",
    "esperto WordPress Verona",
    "tecnico WordPress Verona",
    "aggiornamento WordPress Verona",
    "sicurezza WordPress Verona",
    "WooCommerce assistenza Verona",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: PAGE_URL,
    title: "Assistenza WordPress a Verona — Simone Puliti",
    description:
      "Manutenzione, sicurezza, recupero siti WordPress hackerati e ottimizzazione velocità. Freelance a Verona, intervento rapido.",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistenza WordPress a Verona — Simone Puliti",
    description:
      "Esperto WordPress freelance a Verona: manutenzione, sicurezza, ottimizzazione, recupero siti hackerati.",
  },
};

const SERVIZI = [
  {
    icon: RefreshCw,
    title: "Manutenzione mensile",
    description:
      "Aggiornamenti core, plugin e tema testati prima della messa in produzione. Backup giornalieri, monitoraggio uptime, report mensile chiaro.",
  },
  {
    icon: Shield,
    title: "Sicurezza e protezione",
    description:
      "Protezione del server, firewall applicativo, doppia autenticazione, scansione malware periodica. Sito al riparo da attacchi automatizzati.",
  },
  {
    icon: Bug,
    title: "Recupero siti hackerati",
    description:
      "Sito infetto, defacement o blacklist Google? Pulizia completa del codice, rimozione malware, ripristino reputazione e prevenzione recidive.",
  },
  {
    icon: Zap,
    title: "Ottimizzazione velocità",
    description:
      "Sito lento? Analisi Core Web Vitals, ottimizzazione immagini, cache, query DB e lazy loading. Punteggi PageSpeed sopra 90 anche su mobile.",
  },
  {
    icon: ShoppingCart,
    title: "Supporto WooCommerce",
    description:
      "Risoluzione bug checkout, integrazioni pagamenti, sincronizzazione gestionali, ottimizzazione conversioni e-commerce.",
  },
  {
    icon: LifeBuoy,
    title: "Supporto on-demand",
    description:
      "Bug puntuali, modifiche grafiche, nuove funzionalità, migrazione siti. Interventi puntuali senza abbonamenti vincolanti.",
  },
];

const FAQ = [
  {
    q: "In quanto tempo intervieni se il mio sito WordPress è giù?",
    a: "Per emergenze (sito offline, hack, errori critici) intervengo entro poche ore dalla segnalazione, anche in serata o nel weekend. Per richieste non urgenti rispondo entro 24h lavorative.",
  },
  {
    q: "Il mio sito è stato hackerato, cosa fai esattamente?",
    a: "Analisi completa del codice e del database per individuare malware, backdoor e file modificati. Pulizia chirurgica (mantengo i contenuti, rimuovo solo il codice infetto), reset di tutte le credenziali, messa in sicurezza del server per evitare recidive e richiesta di rimozione dalla blacklist Google se necessario.",
  },
  {
    q: "Lavori solo a Verona o anche da remoto?",
    a: "L'assistenza WordPress è quasi sempre remota (ottimo per intervenire velocemente). Sono basato a Verona e per progetti più complessi posso fare incontri di persona in tutto il Veneto: Vicenza, Padova, Treviso, Brescia, Mantova.",
  },
  {
    q: "Posso passare la manutenzione del mio sito a te se l'ha fatto un altro sviluppatore?",
    a: "Sì. Faccio un audit iniziale gratuito del codice e dell'hosting per capire lo stato del sito, poi propongo un piano. Spesso il primo intervento include anche pulizia di codice obsoleto e rifacimento dei backup.",
  },
  {
    q: "Quali hosting WordPress consigli?",
    a: "Per siti con buon traffico consiglio hosting gestiti come SiteGround, Kinsta o Cloudways. Per siti piccoli vanno bene anche Serverplan o Keliweb. Posso aiutarti a migrare verso un hosting migliore senza downtime.",
  },
  {
    q: "Fai anche aggiornamenti grafici o di contenuto?",
    a: "Sì, gestisco modifiche grafiche, aggiornamenti di contenuto e nuove funzionalità su richiesta, con preventivo concordato prima di iniziare.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Assistenza WordPress a Verona",
    serviceType: "Manutenzione e sicurezza WordPress",
    provider: {
      "@type": "Person",
      name: "Simone Puliti",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Verona" },
      { "@type": "AdministrativeArea", name: "Veneto" },
      { "@type": "Country", name: "Italia" },
    ],
    description:
      "Assistenza WordPress professionale a Verona: manutenzione mensile, sicurezza, recupero siti hackerati, ottimizzazione velocità, supporto WooCommerce.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Assistenza WordPress Verona", item: PAGE_URL },
    ],
  },
];

export default function AssistenzaWordPressVeronaPage() {
  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 pt-32 pb-16 max-w-5xl mx-auto">
          <nav className="text-xs mb-8" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }} aria-label="Breadcrumb">
            <Link href="/" className="hover:underline" style={{ color: "var(--muted)" }}>Home</Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--text)" }}>Assistenza WordPress Verona</span>
          </nav>

          <span
            className="inline-flex items-center mb-6"
            style={{
              gap: "10px",
              padding: "7px 14px",
              borderRadius: "999px",
              background: "var(--badge-bg)",
              border: "1px solid var(--border-soft)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "var(--badge-text)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent-2)", display: "inline-block" }} />
            WordPress Support · Verona
          </span>

          <h1
            className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ color: "var(--text)" }}
          >
            Assistenza WordPress <br />
            a Verona<span style={{ color: "var(--accent-2)" }}>.</span>
          </h1>

          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
            <strong style={{ color: "var(--text)" }}>Manutenzione, sicurezza, ottimizzazione e recupero</strong> di siti
            WordPress per aziende e professionisti a Verona. Intervento rapido anche in emergenza, niente abbonamenti
            vincolanti.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity"
              style={{ background: "#171412", color: "#fff", borderRadius: "2px" }}
            >
              Richiedi un check gratuito
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#servizi"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}
            >
              Cosa includono i servizi
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "var(--muted)" }}>
            {[
              "Risposta entro 24h",
              "Backup giornalieri",
              "Sicurezza avanzata",
              "Ottimizzazione PageSpeed",
              "Esperto WooCommerce",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: "var(--accent)" }} />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Servizi */}
        <div className="section-dark">
          <section id="servizi" className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-4" style={{ color: "var(--text)" }}>
              Cosa includono i miei servizi WordPress
            </h2>
            <p className="text-base mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
              Sei aree di intervento per tenere il tuo sito sicuro, veloce e sempre online.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVIZI.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="flex flex-col gap-3 p-6"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10"
                    style={{ background: "var(--accent-dim)", borderRadius: "2px" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* FAQ */}
        <section className="px-6 py-16 md:py-20 max-w-3xl mx-auto">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-10" style={{ color: "var(--text)" }}>
            Domande frequenti
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group p-5 cursor-pointer"
                style={{ background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: "2px" }}
              >
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="text-base font-semibold" style={{ color: "var(--text)" }}>{q}</h3>
                  <MessageSquare className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: "var(--accent)" }} />
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <Contact />
      </div>
    </main>
  );
}
