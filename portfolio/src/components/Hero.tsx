"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, ShoppingCart, Wrench, Code2, BarChart2, Bot } from "lucide-react";

// Orbital rings — minimal geometric animation
const RINGS = [
  { cx: 55, cy: 45, r: 28, duration: 35, delay: 0.6 },
  { cx: 55, cy: 45, r: 18, duration: 28, delay: 0.8 },
  { cx: 55, cy: 45, r: 38, duration: 42, delay: 1.0 },
];

const DOTS = [
  { r: 28, angle: 0, speed: 35, size: 2, delay: 1.2 },
  { r: 28, angle: 180, speed: 35, size: 1.5, delay: 1.5 },
  { r: 18, angle: 90, speed: 28, size: 1.8, delay: 1.8 },
  { r: 38, angle: 270, speed: 42, size: 1.3, delay: 2.0 },
  { r: 38, angle: 60, speed: 42, size: 1.6, delay: 2.3 },
];

function ConnectionLines() {
  const cx = 55;
  const cy = 45;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
      className="absolute -right-[5%] top-1/2 -translate-y-1/2 w-[55%] aspect-square pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Orbital rings */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={ring.cx}
            cy={ring.cy}
            r={ring.r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.12"
            strokeDasharray="2 4"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: [0, 0.2, 0.1, 0.2], rotate: 360 }}
            transition={{
              opacity: { delay: ring.delay, duration: 6, repeat: Infinity, repeatType: "reverse" },
              rotate: { delay: ring.delay, duration: ring.duration, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformOrigin: `${ring.cx}px ${ring.cy}px` }}
          />
        ))}

        {/* Center point */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="1.5"
          fill="var(--accent)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
          transition={{ delay: 0.8, duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting dots */}
        {DOTS.map((dot, i) => {
          const startAngle = (dot.angle * Math.PI) / 180;
          const startX = cx + dot.r * Math.cos(startAngle);
          const startY = cy + dot.r * Math.sin(startAngle);

          // Generate smooth circular path with 8 points
          const points = 8;
          const xKeys = [];
          const yKeys = [];
          for (let p = 0; p <= points; p++) {
            const a = startAngle + (p / points) * Math.PI * 2;
            xKeys.push(cx + dot.r * Math.cos(a));
            yKeys.push(cy + dot.r * Math.sin(a));
          }

          return (
            <motion.circle
              key={`dot-${i}`}
              r={dot.size}
              fill="var(--accent)"
              initial={{ cx: startX, cy: startY, opacity: 0 }}
              animate={{
                cx: xKeys,
                cy: yKeys,
                opacity: [0, 0.4, 0.2, 0.4, 0.3, 0.4, 0.2, 0.4, 0],
              }}
              transition={{
                delay: dot.delay,
                duration: dot.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Pulse rings expanding from center */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={cx}
            cy={cy}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.15"
            initial={{ r: 2, opacity: 0 }}
            animate={{ r: 70, opacity: [0, 0.18, 0.06, 0] }}
            transition={{
              delay: 2 + i * 3.5,
              duration: 8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Faint radial lines from center */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = cx + 42 * Math.cos(rad);
          const y2 = cy + 42 * Math.sin(rad);
          return (
            <motion.line
              key={`ray-${i}`}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="var(--accent)"
              strokeWidth="0.06"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.05, 0.12] }}
              transition={{
                delay: 1.5 + i * 0.2,
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
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
