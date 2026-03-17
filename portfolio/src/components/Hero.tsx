"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, ShoppingCart, Wrench, Code2, BarChart2, Bot } from "lucide-react";

const DOTS = [
  { r: 28, angle: 0, speed: 35, size: 1.2, delay: 1.2 },
  { r: 28, angle: 180, speed: 35, size: 0.9, delay: 1.5 },
  { r: 18, angle: 90, speed: 28, size: 1.1, delay: 1.8 },
  { r: 38, angle: 270, speed: 42, size: 0.8, delay: 2.0 },
  { r: 38, angle: 60, speed: 42, size: 1.0, delay: 2.3 },
];

function ConnectionLines() {
  const cx = 55;
  const cy = 45;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
      className="absolute -right-[15%] top-1/2 -translate-y-1/2 w-[90%] aspect-square pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
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

        {/* Official crypto & tech logos orbiting subtly */}
        {[
          {
            name: "eth",
            // Ethereum — Simple Icons (viewBox 0 0 24 24)
            path: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z",
            r: 32, angle: 130, speed: 38, delay: 2.5, direction: 1, scale: 0.09,
          },
          {
            name: "btc",
            // Bitcoin — Simple Icons (viewBox 0 0 24 24)
            path: "M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z",
            r: 22, angle: 45, speed: 32, delay: 3.5, direction: -1, scale: 0.09,
          },
          {
            name: "uni",
            // Uniswap — simplified U mark
            path: "M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm3.5 16.5c0 1.38-1.12 2.5-2.5 2.5h-2c-1.38 0-2.5-1.12-2.5-2.5v-5c0-1.38 1.12-2.5 2.5-2.5h2c1.38 0 2.5 1.12 2.5 2.5v5zM11 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S13.33 9 12.5 9 11 8.33 11 7.5z",
            r: 40, angle: 220, speed: 45, delay: 4.0, direction: 1, scale: 0.09,
          },
          {
            name: "js",
            // JavaScript — Simple Icons (viewBox 0 0 24 24)
            path: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z",
            r: 35, angle: 300, speed: 40, delay: 5.0, direction: -1, scale: 0.09,
          },
          {
            name: "wp",
            // WordPress — Simple Icons (viewBox 0 0 24 24)
            path: "M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0",
            r: 26, angle: 170, speed: 34, delay: 3.0, direction: 1, scale: 0.09,
          },
        ].map((logo) => {
          const startAngle = (logo.angle * Math.PI) / 180;
          const points = 8;
          const xKeys: number[] = [];
          const yKeys: number[] = [];
          for (let p = 0; p <= points; p++) {
            const a = startAngle + logo.direction * (p / points) * Math.PI * 2;
            xKeys.push(cx + logo.r * Math.cos(a));
            yKeys.push(cy + logo.r * Math.sin(a));
          }
          // Offset to center the 24x24 icon at origin before scaling
          const s = logo.scale;
          const off = -12 * s;
          return (
            <motion.g
              key={logo.name}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.18, 0.08, 0.18, 0.1, 0.18, 0.08, 0.18, 0],
              }}
              transition={{
                delay: logo.delay,
                duration: logo.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.g
                initial={{ x: xKeys[0], y: yKeys[0] }}
                animate={{ x: xKeys, y: yKeys }}
                transition={{
                  delay: logo.delay,
                  duration: logo.speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <g transform={`translate(${off}, ${off}) scale(${s})`}>
                  <path
                    d={logo.path}
                    fill="var(--accent)"
                    fillRule="evenodd"
                  />
                </g>
              </motion.g>
            </motion.g>
          );
        })}

        {/* Soft cloud blobs expanding from center */}
        <defs>
          {[0, 1, 2, 3].map((i) => (
            <radialGradient key={`cloud-grad-${i}`} id={`cloud-grad-${i}`}>
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {[
          { dx: -8, dy: -6, size: 30, delay: 1.5, duration: 12 },
          { dx: 10, dy: 4, size: 25, delay: 3.0, duration: 14 },
          { dx: -4, dy: 10, size: 22, delay: 5.0, duration: 10 },
          { dx: 12, dy: -8, size: 28, delay: 7.0, duration: 13 },
        ].map((cloud, i) => (
          <motion.ellipse
            key={`cloud-${i}`}
            cx={cx + cloud.dx}
            cy={cy + cloud.dy}
            fill={`url(#cloud-grad-${i})`}
            initial={{ rx: 3, ry: 2, opacity: 0 }}
            animate={{
              rx: [3, cloud.size, cloud.size * 1.2],
              ry: [2, cloud.size * 0.7, cloud.size * 0.85],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              delay: cloud.delay,
              duration: cloud.duration,
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
    <section className="min-h-screen flex flex-col justify-center px-6 pt-12 pb-10 md:pt-24 md:pb-20 max-w-6xl mx-auto">

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
