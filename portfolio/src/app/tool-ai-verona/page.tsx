import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Workflow, Plug, LayoutDashboard, Check, MessageSquare } from "lucide-react";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tuosito.it";
const PAGE_URL = `${SITE_URL}/tool-ai-verona`;

export const metadata: Metadata = {
  title: "Sviluppo Tool AI a Verona — Assistenti, Chatbot e Automazioni Custom",
  description:
    "Sviluppatore Tool AI a Verona: assistenti virtuali, chatbot custom, automazioni con Claude e OpenAI API. Soluzioni su misura per aziende del Veneto. Preventivo gratuito.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "tool AI Verona",
    "sviluppo AI Verona",
    "sviluppatore AI Verona",
    "assistenti AI Verona",
    "chatbot personalizzato Verona",
    "automazione AI Verona",
    "Claude API Italia",
    "OpenAI API Italia",
    "intelligenza artificiale aziendale Verona",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: PAGE_URL,
    title: "Sviluppo Tool AI a Verona — Assistenti, Chatbot e Automazioni",
    description:
      "Tool AI personalizzati per aziende a Verona: chatbot, assistenti e automazioni con Claude e OpenAI. Preventivo gratuito.",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sviluppo Tool AI a Verona — Simone Puliti",
    description:
      "Sviluppatore Tool AI freelance a Verona. Chatbot, assistenti, automazioni con Claude e OpenAI API.",
  },
};

const SERVIZI = [
  {
    icon: BrainCircuit,
    title: "Assistenti virtuali e chatbot",
    description:
      "Bot conversazionali addestrati sui dati della tua azienda. Rispondono ai clienti, qualificano i lead e gestiscono FAQ 24/7 in italiano.",
  },
  {
    icon: Workflow,
    title: "Automazione di processi",
    description:
      "Pipeline AI che eliminano attività ripetitive: classificazione email, generazione documenti, riassunti automatici di report o trascrizioni.",
  },
  {
    icon: Plug,
    title: "Integrazione AI in sistemi esistenti",
    description:
      "Collego Claude, OpenAI e altri modelli a CRM, gestionali, e-commerce e database interni. Niente lock-in, tutto via API.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard e analisi intelligenti",
    description:
      "Trasformo i dati che già produci in pannelli decisionali aggiornati in tempo reale, con sintesi generate da modelli linguistici.",
  },
];

const CASI_USO = [
  {
    titolo: "Studio professionale a Verona",
    problema: "Centinaia di email di prima richiesta da smistare ogni settimana.",
    soluzione: "Assistente AI che classifica, riassume e risponde alle richieste standard, lasciando ai professionisti solo le pratiche complesse.",
  },
  {
    titolo: "E-commerce nel Veneto",
    problema: "Customer care subissato da domande ripetitive su spedizioni e resi.",
    soluzione: "Chatbot integrato in WooCommerce che legge gli ordini in tempo reale e risolve l'80% delle richieste senza intervento umano.",
  },
  {
    titolo: "PMI manifatturiera in provincia",
    problema: "Documentazione tecnica sparsa in PDF, Word e drive di rete.",
    soluzione: "Knowledge base AI interna: i dipendenti chiedono in linguaggio naturale e il sistema cita fonti dai documenti reali.",
  },
];

const PROCESSO = [
  {
    step: "01",
    titolo: "Discovery",
    description: "Call gratuita per capire il problema, i dati disponibili e dove l'AI può creare valore reale (non hype).",
  },
  {
    step: "02",
    titolo: "Prototipo rapido",
    description: "In 1-2 settimane realizzo un prototipo funzionante che testi sul campo prima di investire nel prodotto finale.",
  },
  {
    step: "03",
    titolo: "Sviluppo e integrazione",
    description: "Costruisco il tool su misura, lo collego ai tuoi sistemi e lo metto in produzione con monitoraggio dei costi API.",
  },
  {
    step: "04",
    titolo: "Manutenzione e ottimizzazione",
    description: "Aggiornamento prompt, switch a modelli più efficienti quando escono, ottimizzazione costi e qualità delle risposte.",
  },
];

const FAQ = [
  {
    q: "Quali modelli AI usi?",
    a: "Principalmente Claude (Anthropic) e GPT (OpenAI), scegliendo il modello migliore per qualità/costo del caso d'uso. Per casi specifici uso anche Gemini, Mistral o modelli open source self-hosted quando i dati non possono uscire dall'azienda.",
  },
  {
    q: "I dati della mia azienda sono al sicuro?",
    a: "Sì. Uso provider con clausole no-training (Claude e OpenAI API enterprise non usano i tuoi dati per addestrare i modelli) e per dati sensibili posso implementare soluzioni on-premise o cloud privato in Europa.",
  },
  {
    q: "Lavori solo a Verona o anche da remoto?",
    a: "Sono freelance a Verona ma lavoro in tutta Italia da remoto. Per progetti nel Veneto (Verona, Vicenza, Padova, Treviso, Venezia) posso fare incontri di persona quando serve.",
  },
  {
    q: "Quanto tempo serve per avere un tool AI funzionante?",
    a: "Un prototipo è pronto in 1-2 settimane. Un tool in produzione richiede tipicamente 4-8 settimane in base a integrazioni e test richiesti.",
  },
  {
    q: "Posso integrare l'AI nel mio gestionale o CRM esistente?",
    a: "Sì. Integro AI con WordPress, WooCommerce, HubSpot, Salesforce, gestionali custom e qualsiasi sistema con API. Se non c'è un'API documentata, costruisco un layer di integrazione.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sviluppo Tool AI personalizzati a Verona",
    serviceType: "Sviluppo Intelligenza Artificiale",
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
      "Sviluppo tool AI personalizzati per aziende a Verona e in tutto il Veneto: chatbot, assistenti virtuali, automazioni di processo e integrazioni con Claude API e OpenAI API.",
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
      { "@type": "ListItem", position: 2, name: "Tool AI Verona", item: PAGE_URL },
    ],
  },
];

export default function ToolAIVeronaPage() {
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
            <span style={{ color: "var(--text)" }}>Tool AI Verona</span>
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
            AI Development · Verona
          </span>

          <h1
            className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ color: "var(--text)" }}
          >
            Sviluppo Tool AI <br />
            a Verona<span style={{ color: "var(--accent-2)" }}>.</span>
          </h1>

          <p className="text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
            Costruisco <strong style={{ color: "var(--text)" }}>assistenti virtuali, chatbot e automazioni AI</strong> su misura
            per aziende a Verona e in tutto il Veneto. Soluzioni concrete con Claude e OpenAI API,
            integrate nei tuoi sistemi esistenti — non demo da slide.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity"
              style={{ background: "#171412", color: "#fff", borderRadius: "2px" }}
            >
              Richiedi una consulenza gratuita
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#casi-uso"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}
            >
              Vedi casi d&apos;uso reali
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "var(--muted)" }}>
            {["Claude API", "OpenAI API", "Vercel AI SDK", "Next.js", "TypeScript", "n8n"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: "var(--accent)" }} />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Servizi */}
        <div className="section-dark">
          <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-4" style={{ color: "var(--text)" }}>
              Cosa posso costruire per te
            </h2>
            <p className="text-base mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
              Quattro categorie di tool AI che generano valore misurabile per le aziende del territorio veronese.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
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

        {/* Casi uso */}
        <section id="casi-uso" className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-4" style={{ color: "var(--text)" }}>
            Esempi concreti di Tool AI per aziende a Verona
          </h2>
          <p className="text-base mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
            Scenari ispirati a progetti reali con clienti del Veneto, anonimizzati.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {CASI_USO.map(({ titolo, problema, soluzione }) => (
              <article
                key={titolo}
                className="p-6 flex flex-col gap-4"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                }}
              >
                <h3 className="text-base font-semibold" style={{ color: "var(--text)" }}>{titolo}</h3>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}>Problema</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{problema}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>Soluzione AI</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{soluzione}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Processo */}
        <div className="section-dark">
          <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-10" style={{ color: "var(--text)" }}>
              Come lavoro
            </h2>
            <ol className="grid md:grid-cols-4 gap-6">
              {PROCESSO.map(({ step, titolo, description }) => (
                <li key={step} className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{step}</span>
                  <h3 className="text-base font-semibold" style={{ color: "var(--text)" }}>{titolo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p>
                </li>
              ))}
            </ol>
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
