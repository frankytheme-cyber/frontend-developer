"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TAGLINE = "Progetto e sviluppo prodotti digitali ad alte prestazioni. Lavoro con aziende, professionisti e startup — da Verona e in remoto.";

const SERVICES = [
  {
    label: "Web Design & UI/UX",
    description: "Interfacce custom orientate a conversione e brand identity.",
    dot: "#ff5722",
  },
  {
    label: "Siti WordPress & E-commerce",
    description: "Siti vetrina, portali su misura e shop WooCommerce performanti.",
    dot: "#171412",
  },
  {
    label: "Assistenza WordPress",
    description: "Manutenzione, ottimizzazione e supporto continuativo per il tuo sito.",
    dot: "#f59e0b",
    href: "/assistenza-wordpress-verona",
  },
  {
    label: "App React / Next.js",
    description: "Interfacce moderne, dashboard fintech e tool web ad alte prestazioni.",
    dot: "#0ea5e9",
  },
  {
    label: "Assistenti AI Personalizzati",
    description: "Chatbot e automazioni AI integrate nei tuoi flussi aziendali.",
    dot: "#ec4899",
    href: "/tool-ai-verona",
  },
  {
    label: "SEO & Performance",
    description: "Ottimizzazione tecnica per ranking, velocità e Core Web Vitals.",
    dot: "#10b981",
  },
];

function ServiceCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {SERVICES.map(({ label, description, dot, href }, i) => {
        const cardClass = `group flex flex-col p-5 text-left ${href ? "cursor-pointer" : "cursor-default"}`;
        const cardStyle: React.CSSProperties = {
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "2px",
          transition: "border-color 0.15s",
        };
        const handlers = {
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          },
        };
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
                >
                  {i + 1}.
                </span>
                <h3
                  className="text-base font-bold leading-tight mt-1 tracking-tight"
                  style={{ color: "var(--text)" }}
                >
                  {label}
                </h3>
              </div>
              <span
                className="rounded-full shrink-0"
                style={{ width: 12, height: 12, background: dot, marginTop: 4 }}
                aria-hidden
              />
            </div>
            <div className="h-px my-4" style={{ background: "var(--border)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </>
        );
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.06, duration: 0.3, ease: "easeOut" }}
          >
            {href ? (
              <Link href={href} className={cardClass} style={cardStyle} {...handlers}>
                {inner}
              </Link>
            ) : (
              <div className={cardClass} style={cardStyle} {...handlers}>
                {inner}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pb-10 pt-20 md:pb-20 overflow-hidden">

      {/* Texture animata: nuvole bianche + grain */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0" style={{ opacity: "var(--cloud-opacity)" }}>
          <div
            className="cloud-drift-1 absolute"
            style={{
              top: "-20%",
              left: "-15%",
              width: "65vw",
              height: "55vw",
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 70%)",
              filter: "blur(40px)",
              willChange: "transform, opacity",
            }}
          />
          <div
            className="cloud-drift-2 absolute"
            style={{
              top: "10%",
              right: "-20%",
              width: "60vw",
              height: "50vw",
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 75%)",
              filter: "blur(50px)",
              willChange: "transform, opacity",
            }}
          />
          <div
            className="cloud-drift-3 absolute"
            style={{
              bottom: "-25%",
              left: "10%",
              width: "70vw",
              height: "55vw",
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 75%)",
              filter: "blur(45px)",
              willChange: "transform, opacity",
            }}
          />
        </div>

        <div
          className="hero-grain absolute inset-0"
          style={{ opacity: 0.04, mixBlendMode: "multiply" }}
        />
      </div>

      {/* Contenuto centrato */}
      <div className="relative z-10 w-full mx-auto text-center" style={{ maxWidth: "1080px" }}>

        {/* Eyebrow pill con dot oro */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center mb-8"
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
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "999px",
              background: "var(--accent-2)",
              display: "inline-block",
            }}
          />
           Disponibile · Verona / Remote
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
          style={{ color: "var(--text)" }}
        >
          <span className="block text-[clamp(2rem,5.2vw,4rem)] font-black leading-[0.95] tracking-[-0.03em]">
            Web Designer
            <br />
            & Sviluppatore Tool AI
            <br />
            a Verona<span style={{ color: "var(--accent-2)" }}>.</span>
          </span>
          <span className="block mt-5 text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-tight" style={{ color: "var(--muted)" }}>
            Simone Puliti
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base font-semibold tracking-[0.12em] uppercase mb-8"
          style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
        >
          Siti WordPress · E-commerce WooCommerce · App React/Next.js · Tool AI personalizzati
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-lg font-normal leading-relaxed"
          style={{ color: "var(--muted)", margin: "0 auto 32px", maxWidth: "640px" }}
        >
          {TAGLINE}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center mb-16"
          style={{ gap: "14px" }}
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{ background: "#171412", color: "#fff", borderRadius: "2px", border: "1px solid #2a2724" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Parliamo del tuo progetto
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#progetti-web"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            Scopri i miei progetti
          </a>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ServiceCards />
        </motion.div>
      </div>
    </section>
  );
}
