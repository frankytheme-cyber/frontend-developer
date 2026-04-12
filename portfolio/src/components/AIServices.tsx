"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Workflow, Plug, LayoutDashboard } from "lucide-react";

const AI_STACK = ["Claude API", "OpenAI API", "Vercel AI SDK", "Next.js", "TypeScript", "LangChain"];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Chatbot & Assistenti",
    description:
      "Assistenti conversazionali addestrati sui tuoi dati aziendali. Rispondono ai clienti, gestiscono FAQ e qualificano i lead 24/7.",
  },
  {
    icon: Workflow,
    title: "Automazione Workflow",
    description:
      "Pipeline AI che eliminano le attività manuali e ripetitive: classificazione documenti, generazione testi, riassunti automatici.",
  },
  {
    icon: Plug,
    title: "Integrazione API AI",
    description:
      "Connetto Claude, OpenAI e altri modelli ai tuoi sistemi esistenti: CRM, e-commerce, gestionali, database interni.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Intelligenti",
    description:
      "Hai i dati ma non riesci a leggerli? Costruisco pannelli di controllo che li trasformano in numeri chiari, aggiornati in tempo reale.",
  },
];

function AiTerminal() {
  const lines = [
    { delay: 0.6,  text: "$ POST /v1/messages", color: "var(--accent)" },
    { delay: 0.9,  text: '  model: "claude-opus-4-6"', color: "var(--muted)" },
    { delay: 1.1,  text: '  system: "Sei un assistente', color: "var(--muted)" },
    { delay: 1.2,  text: '    del servizio clienti di {brand}"', color: "var(--muted)" },
    { delay: 1.4,  text: '  message: userInput', color: "var(--muted)" },
    { delay: 1.8,  text: "", color: "var(--muted)" },
    { delay: 2.0,  text: "← 200 OK", color: "#22c55e" },
    { delay: 2.2,  text: '  "Certo! Il tuo ordine #4821', color: "var(--text)" },
    { delay: 2.35, text: '   è in spedizione. Arrivo previsto', color: "var(--text)" },
    { delay: 2.5,  text: '   domani entro le 18:00."', color: "var(--text)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="shrink-0 w-full lg:max-w-md lg:w-[420px] rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Terminal bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f56" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#27c93f" }} />
        <span
          className="ml-3 text-xs"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          ai-integration.ts
        </span>
      </div>

      {/* Code */}
      <div className="p-4 space-y-0.5" style={{ fontFamily: "var(--font-mono)" }}>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: line.delay, duration: 0.2 }}
            className="text-xs leading-5 whitespace-pre"
            style={{ color: line.color }}
          >
            {line.text}
          </motion.p>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ delay: 2.8, duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
          style={{ background: "var(--accent)" }}
        />
      </div>
    </motion.div>
  );
}

export default function AIServices() {
  return (
    <section id="tool-ai" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-12 pb-10 pt-10 md:pt-20">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >
            Intelligenza Artificiale
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] leading-none mb-4"
            style={{ color: "var(--text)" }}
          >
            Tool AI
            <br />
            su Misura<span style={{ color: "var(--accent)" }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg max-w-md mb-8 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Integro <strong style={{ color: "var(--text)" }}>Claude</strong>,{" "}
            <strong style={{ color: "var(--text)" }}>OpenAI</strong> e altri modelli nei tuoi
            flussi aziendali. Dall&apos;assistente virtuale all&apos;automazione di processo —
            ogni soluzione è costruita per andare in produzione.
          </motion.p>

          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity duration-200"
            style={{ background: "var(--accent)", color: "#fff" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Richiedi una consulenza gratuita
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <AiTerminal />
      </div>

      {/* AI stack badges */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {AI_STACK.map((tech) => (
          <span
            key={tech}
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,82,255,0.06)",
              border: "1px solid rgba(0,82,255,0.18)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className="flex flex-col gap-3 p-5 rounded-xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "rgba(0,82,255,0.08)" }}
            >
              <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
