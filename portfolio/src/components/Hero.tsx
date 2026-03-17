"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, ShoppingCart, Wrench, Code2, BarChart2, Bot } from "lucide-react";

const NODES = [
  { label: "WordPress", x: 20, y: 8 },
  { label: "React", x: 75, y: 15 },
  { label: "Next.js", x: 50, y: 38 },
  { label: "TypeScript", x: 85, y: 52 },
  { label: "Tailwind", x: 25, y: 60 },
  { label: "DeFi", x: 65, y: 78 },
  { label: "Node.js", x: 15, y: 35 },
  { label: "AI", x: 90, y: 88 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 6], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6], [5, 7], [1, 3], [4, 5],
];

function ConnectionLines() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.2 }}
      className="absolute -right-[5%] top-1/2 -translate-y-1/2 w-[55%] aspect-square pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <motion.line
            key={`line-${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--accent)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.35, 0.15, 0.35] }}
            transition={{
              pathLength: { delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" },
              opacity: { delay: 0.7 + i * 0.1, duration: 4, repeat: Infinity, repeatType: "reverse" },
            }}
          />
        ))}

        {/* Traveling pulses along lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <motion.circle
            key={`pulse-${a}-${b}`}
            r="0.8"
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [NODES[a].x, NODES[b].x],
              cy: [NODES[a].y, NODES[b].y],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              delay: 1.5 + i * 0.3,
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Node dots */}
        {NODES.map((node, i) => (
          <motion.circle
            key={`dot-${node.label}`}
            cx={node.x}
            cy={node.y}
            r="1.8"
            fill="var(--accent)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              delay: 0.8 + i * 0.12,
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer glow rings */}
        {NODES.map((node, i) => (
          <motion.circle
            key={`ring-${node.label}`}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.15"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              delay: 1 + i * 0.15,
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Labels */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -220%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs font-semibold whitespace-nowrap px-2 py-0.5 rounded"
            style={{
              color: "var(--accent)",
              background: "var(--accent-dim)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {node.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

const TAGLINE = "14 anni di esperienza in WordPress, JavaScript e interfacce web. Dai siti aziendali alle dashboard crypto.";

const SERVICES = [
  { icon: Globe,        label: "Siti WordPress" },
  { icon: ShoppingCart, label: "E-commerce WooCommerce" },
  { icon: Wrench,       label: "Assistenza WordPress" },
  { icon: Code2,        label: "Interfacce React / Next.js" },
  { icon: BarChart2,    label: "Dashboard crypto & fintech" },
  { icon: Bot,          label: "Assistenti AI personalizzati" },
];

function ServiceCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {SERVICES.map(({ icon: Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.06, duration: 0.3, ease: "easeOut" }}
          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-default"
          style={{ background: "var(--surface)", border: "0px solid var(--border)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface)";
          }}
        >
          <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--accent)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 max-w-6xl mx-auto">

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-8"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Frontend Developer · Verona, Italy
      </motion.p>

      {/* Heading + Connection lines */}
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.03em] mb-8"
          style={{ color: "var(--text)" }}
        >
          Simone
          <br />
          Puliti
          <span style={{ color: "var(--accent)" }}>.</span>
        </motion.h1>
        <ConnectionLines />
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-lg font-normal max-w-xl mb-10 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {TAGLINE}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-3 mb-16"
      >
        <a
          href="#progetti-web"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{ background: "var(--accent)", color: "#fff" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Vedi progetti
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <a
          href="#contatti"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          Contattami
        </a>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="max-w-lg"
      >
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          Cosa faccio
        </p>
        <ServiceCards />
      </motion.div>
    </section>
  );
}
