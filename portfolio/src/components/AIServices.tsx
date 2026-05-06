"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    title: "Chatbot & Assistenti",
    description:
      "Assistenti conversazionali addestrati sui tuoi dati aziendali. Rispondono ai clienti, gestiscono FAQ e qualificano i lead 24/7.",
  },
  {
    title: "Automazione Workflow",
    description:
      "Pipeline AI che eliminano le attività manuali e ripetitive: classificazione documenti, generazione testi, riassunti automatici.",
  },
  {
    title: "Integrazione API AI",
    description:
      "Connetto Claude, OpenAI e altri modelli ai tuoi sistemi esistenti: CRM, e-commerce, gestionali, database interni.",
  },
  {
    title: "Dashboard Intelligenti",
    description:
      "Hai i dati ma non riesci a leggerli? Costruisco pannelli di controllo che li trasformano in numeri chiari, aggiornati in tempo reale.",
  },
];

const AI_STACK = ["Claude API", "OpenAI API", "Vercel AI SDK", "Next.js", "TypeScript", "LangChain"];

export default function AIServices() {
  return (
    <section id="tool-ai" className="px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full py-24 md:py-32">
        {/* Section divider */}
        <div className="w-full h-px mb-20" style={{ background: "var(--border)" }} />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--muted)" }}
        >
          Intelligenza Artificiale
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading-display text-[clamp(2.5rem,7vw,6rem)] mb-12"
        >
          Tool AI
          <br />
          su Misura
        </motion.h2>

        {/* Description + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--muted)" }}
            >
              Integro <strong style={{ color: "var(--text)" }}>Claude</strong>,{" "}
              <strong style={{ color: "var(--text)" }}>OpenAI</strong> e altri modelli nei tuoi
              flussi aziendali. Dall&apos;assistente virtuale all&apos;automazione di processo —
              ogni soluzione è costruita per andare in produzione.
            </p>
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ background: "var(--text)", color: "var(--text-light)" }}
            >
              Richiedi una consulenza gratuita
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-wrap gap-3 content-start"
          >
            {AI_STACK.map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium px-4 py-2"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Feature cards */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "var(--border)" }}
        >
          {FEATURES.map(({ title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className="flex flex-col gap-4 p-8"
              style={{ background: "var(--bg)" }}
            >
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: "var(--muted-2)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
