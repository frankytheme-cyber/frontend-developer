"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const TAGLINE =
  "Trasformo le tue idee in prodotti digitali ad alte prestazioni. Specializzato in Web Development e Soluzioni Custom basate su Intelligenza Artificiale.";

const SERVICES = [
  "Siti WordPress",
  "E-commerce WooCommerce",
  "Interfacce React / Next.js",
  "Dashboard crypto & fintech",
  "Tool AI personalizzati",
  "Automazione AI aziendale",
];

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-warm)" }}
    >
      <div className="max-w-7xl mx-auto w-full py-24 md:py-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xs font-medium tracking-[0.3em] uppercase mb-12"
          style={{ color: "var(--muted)" }}
        >
          Tool AI &middot; Siti Web &middot; Verona
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-[clamp(3.5rem,10vw,9rem)] mb-8"
        >
          Simone
          <br />
          Puliti
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-sm font-medium tracking-[0.2em] uppercase mb-16"
          style={{ color: "var(--muted)" }}
        >
          Frontend Developer &amp; AI Specialist
        </motion.p>

        {/* Two-column: tagline + services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left — tagline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--muted)" }}
            >
              {TAGLINE}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contatti"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ background: "var(--text)", color: "var(--text-light)" }}
              >
                Parliamo del tuo progetto
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#progetti-web"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-[var(--text)] hover:text-white"
                style={{ border: "1px solid var(--text)", color: "var(--text)" }}
              >
                Vedi i progetti
              </a>
            </div>
          </motion.div>

          {/* Right — services */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <p
              className="text-xs font-medium tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--muted-2)" }}
            >
              Cosa faccio
            </p>
            <ul className="space-y-4">
              {SERVICES.map((service, i) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
                  className="flex items-center gap-4 pb-4"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="text-xs font-medium tabular-nums"
                    style={{ color: "var(--muted-2)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
