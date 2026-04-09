"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, ShoppingCart, Wrench, Code2, BarChart2, Bot } from "lucide-react";

// Orbiting dots
const DOTS = [
  { r: 38, angle: 0,   speed: 35, size: 1.1, delay: 1.2 },
  { r: 38, angle: 180, speed: 35, size: 0.8, delay: 1.5 },
  { r: 52, angle: 270, speed: 42, size: 0.7, delay: 2.0 },
  { r: 30, angle: 320, speed: 32, size: 1.3, delay: 2.9 },
];

// Official Simple Icons SVG paths (viewBox 0 0 24 24)
const ETH_PATH =
  "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z";

const BTC_PATH =
  "M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z";

const JS_PATH =
  "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z";

const WP_PATH =
  "M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0";

// Uniswap — simplified U/exchange mark
const UNI_PATH =
  "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v5.25l3.75-3.75v3L12 15.75 6.75 10.5v-3L10.5 11.25V6z";

// PHP — Simple Icons (viewBox 0 0 24 24)
const PHP_PATH =
  "M7.014 0h9.972C20.889 0 24 3.11 24 7.014v9.972C24 20.889 20.889 24 16.986 24H7.014C3.11 24 0 20.889 0 16.986V7.014C0 3.11 3.11 0 7.014 0zm-.748 9.28H4.42l-1.08 6h1.8l.348-1.992h1.26c1.284 0 2.052-.66 2.052-1.872 0-1.08-.68-2.136-2.532-2.136zm7.092 0h-1.836l-1.08 6h1.8l.348-1.992h1.26c1.284 0 2.052-.66 2.052-1.872 0-1.08-.68-2.136-2.544-2.136zm1.404 0-.72 3.948.72 2.052h1.512l.516-2.88-.516-3.12H14.76zm-8.556 1.512h.9c.504 0 .744.3.744.612 0 .432-.3.66-.804.66H6.72l.252-1.272zm7.092 0h.9c.504 0 .744.3.744.612 0 .432-.3.66-.804.66h-.744l.252-1.272h-.348z";

// Tech logos orbiting at different radii/speeds than dots
const LOGOS = [
  { name: "eth", path: ETH_PATH,  r: 45, angle: 130, speed: 58, delay: 2.5, dir:  1 },
  { name: "btc", path: BTC_PATH,  r: 30, angle: 45,  speed: 50, delay: 3.5, dir: -1 },
  { name: "uni", path: UNI_PATH,  r: 60, angle: 220, speed: 68, delay: 4.0, dir:  1 },
  { name: "js",  path: JS_PATH,   r: 46, angle: 300, speed: 60, delay: 5.0, dir: -1 },
  { name: "wp",  path: WP_PATH,   r: 34, angle: 170, speed: 54, delay: 3.0, dir:  1 },
  { name: "php", path: PHP_PATH,  r: 53, angle: 250, speed: 64, delay: 3.8, dir: -1 },
];

// Floating geometric shapes — different orbits from dots and logos
const SHAPES = [
  { type: "tri",  r: 42, angle: 20,  speed: 46, delay: 1.8, dir:  1, size: 3.5, spin: 12 },
  { type: "dia",  r: 57, angle: 100, speed: 55, delay: 2.2, dir: -1, size: 3.2, spin: 20 },
  { type: "hex",  r: 29, angle: 240, speed: 40, delay: 3.0, dir:  1, size: 3.0, spin: 30 },
  { type: "plus", r: 49, angle: 330, speed: 63, delay: 4.5, dir: -1, size: 2.8, spin: 8  },
  { type: "circ", r: 36, angle: 155, speed: 48, delay: 1.5, dir:  1, size: 2.4, spin: 0  },
  { type: "pent", r: 64, angle: 75,  speed: 72, delay: 5.0, dir: -1, size: 3.2, spin: 15 },
];

function shapePath(type: string, s: number): string {
  const f = (n: number) => +n.toFixed(3);
  switch (type) {
    case "tri":
      return `M0,${-s} L${f(s*0.866)},${f(s*0.5)} L${f(-s*0.866)},${f(s*0.5)} Z`;
    case "dia":
      return `M0,${-s} L${s},0 L0,${s} L${-s},0 Z`;
    case "hex": {
      const h = f(s*0.866), hs = f(s*0.5);
      return `M0,${-s} L${h},${-hs} L${h},${hs} L0,${s} L${-h},${hs} L${-h},${-hs} Z`;
    }
    case "plus": {
      const w = f(s*0.28);
      return `M${-w},${-s} L${w},${-s} L${w},${-w} L${s},${-w} L${s},${w} L${w},${w} L${w},${s} L${-w},${s} L${-w},${w} L${-s},${w} L${-s},${-w} L${-w},${-w} Z`;
    }
    case "pent": {
      return Array.from({ length: 5 }, (_, i) => {
        const a = (i * 72 - 90) * Math.PI / 180;
        return `${i === 0 ? "M" : "L"}${f(s*Math.cos(a))},${f(s*Math.sin(a))}`;
      }).join(" ") + " Z";
    }
    default: return "";
  }
}

// Logo-to-logo connection pairs (6 logos now)
const LOGO_PAIRS: [number, number][] = [[0,3],[1,4],[0,2],[2,3],[1,0],[5,0],[5,3]];
// Dot chord pairs (same orbit)
const DOT_PAIRS: [number, number][] = [[0,1]];

function OrbitAnimation() {
  const CX = 50, CY = 50;
  const SCALE = 0.18;
  const ICON_OFF = -12 * SCALE; // centers 24px icon at (0,0)

  // Refs for SVG elements — direct DOM updates keep everything in SVG user units
  const dotRefs   = useRef<(SVGCircleElement | null)[]>(Array(4).fill(null));
  const logoRefs  = useRef<(SVGGElement    | null)[]>(Array(LOGOS.length).fill(null));
  const ldotRefs  = useRef<(SVGLineElement  | null)[]>(Array(4).fill(null));   // center→dot
  const llogoRefs = useRef<(SVGLineElement  | null)[]>(Array(LOGOS.length).fill(null));  // center→logo
  const lpairRefs = useRef<(SVGLineElement  | null)[]>(Array(LOGO_PAIRS.length).fill(null)); // logo↔logo
  const chordRefs = useRef<(SVGLineElement  | null)[]>(Array(DOT_PAIRS.length).fill(null));  // dot↔dot

  useEffect(() => {
    let t0: number | null = null;
    let raf: number;

    // Position helpers — compute SVG user-unit coordinates from elapsed time
    const dotPos  = (d: typeof DOTS[0],  e: number) => {
      const prog = e < d.delay ? 0 : ((e - d.delay) % d.speed) / d.speed;
      const a = (d.angle * Math.PI / 180) + prog * Math.PI * 2;
      return { x: CX + d.r * Math.cos(a), y: CY + d.r * Math.sin(a), prog };
    };
    const logoPos = (l: typeof LOGOS[0], e: number) => {
      const prog = e < l.delay ? 0 : ((e - l.delay) % l.speed) / l.speed;
      const a = (l.angle * Math.PI / 180) + l.dir * prog * Math.PI * 2;
      return { x: CX + l.r * Math.cos(a), y: CY + l.r * Math.sin(a), prog };
    };
    // Opacity curves
    const dotOp  = (p: number) => p < 0.05 ? p/0.05*0.55 : p > 0.95 ? (1-p)/0.05*0.55 : 0.3 + 0.2*Math.sin(p*Math.PI*8);
    const logoOp = (p: number) => p < 0.06 ? p/0.06*0.22 : p > 0.94 ? (1-p)/0.06*0.22 : 0.1 + 0.1*Math.sin(p*Math.PI*6);

    const s = (n: number) => n.toFixed(3);

    const tick = (ts: number) => {
      if (t0 === null) t0 = ts;
      const e = (ts - t0) / 1000; // elapsed seconds

      // Compute all positions this frame
      const dp = DOTS.map((d, i) => {
        const p = dotPos(d, e);
        const op = e < d.delay ? 0 : dotOp(p.prog);
        const el = dotRefs.current[i];
        if (el) { el.setAttribute("cx", s(p.x)); el.setAttribute("cy", s(p.y)); el.setAttribute("opacity", s(op)); }
        const ln = ldotRefs.current[i];
        if (ln) { ln.setAttribute("x2", s(p.x)); ln.setAttribute("y2", s(p.y)); ln.setAttribute("opacity", s(op * 0.35)); }
        return p;
      });

      const lp = LOGOS.map((l, i) => {
        const p = logoPos(l, e);
        const op = e < l.delay ? 0 : logoOp(p.prog);
        const el = logoRefs.current[i];
        if (el) { el.setAttribute("transform", `translate(${s(p.x)},${s(p.y)})`); el.setAttribute("opacity", s(op)); }
        const ln = llogoRefs.current[i];
        if (ln) { ln.setAttribute("x2", s(p.x)); ln.setAttribute("y2", s(p.y)); ln.setAttribute("opacity", s(op * 0.5)); }
        return p;
      });

      // Dot chord lines
      DOT_PAIRS.forEach(([ai, bi], i) => {
        const ln = chordRefs.current[i];
        if (!ln) return;
        const a = dp[ai], b = dp[bi];
        const op = Math.min(dotOp(a.prog), dotOp(b.prog)) * 0.25;
        ln.setAttribute("x1", s(a.x)); ln.setAttribute("y1", s(a.y));
        ln.setAttribute("x2", s(b.x)); ln.setAttribute("y2", s(b.y));
        ln.setAttribute("opacity", s(op));
      });

      // Logo↔logo lines
      LOGO_PAIRS.forEach(([ai, bi], i) => {
        const ln = lpairRefs.current[i];
        if (!ln) return;
        const a = lp[ai], b = lp[bi];
        const op = Math.min(logoOp(a.prog), logoOp(b.prog)) * 0.65;
        ln.setAttribute("x1", s(a.x)); ln.setAttribute("y1", s(a.y));
        ln.setAttribute("x2", s(b.x)); ln.setAttribute("y2", s(b.y));
        ln.setAttribute("opacity", s(op));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Initial SVG user-unit positions
  const dotInit  = (d: typeof DOTS[0])  => ({ x: CX + d.r * Math.cos(d.angle * Math.PI / 180), y: CY + d.r * Math.sin(d.angle * Math.PI / 180) });
  const logoInit = (l: typeof LOGOS[0]) => ({ x: CX + l.r * Math.cos(l.angle * Math.PI / 180), y: CY + l.r * Math.sin(l.angle * Math.PI / 180) });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
      className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[65%] aspect-square pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" style={{ overflow: "visible" }}>

        {/* Hub */}
        <circle cx={CX} cy={CY} r="0.6" fill="var(--accent)" opacity="0.15" />

        {/* Center-to-dot lines */}
        {DOTS.map((d, i) => {
          const p = dotInit(d);
          return <line key={`ld${i}`} ref={el => { ldotRefs.current[i] = el; }}
            x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke="var(--accent)" strokeWidth="0.08" opacity="0" />;
        })}

        {/* Center-to-logo lines (dashed) */}
        {LOGOS.map((l, i) => {
          const p = logoInit(l);
          return <line key={`ll${i}`} ref={el => { llogoRefs.current[i] = el; }}
            x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke="var(--accent)" strokeWidth="0.06" strokeDasharray="1.2 2" opacity="0" />;
        })}

        {/* Dot chord lines */}
        {DOT_PAIRS.map(([ai, bi], i) => {
          const a = dotInit(DOTS[ai]), b = dotInit(DOTS[bi]);
          return <line key={`dc${i}`} ref={el => { chordRefs.current[i] = el; }}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="var(--accent)" strokeWidth="0.07" opacity="0" />;
        })}

        {/* Logo-to-logo lines (dashed fine) */}
        {LOGO_PAIRS.map(([ai, bi], i) => {
          const a = logoInit(LOGOS[ai]), b = logoInit(LOGOS[bi]);
          return <line key={`lp${i}`} ref={el => { lpairRefs.current[i] = el; }}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="var(--accent)" strokeWidth="0.06" strokeDasharray="0.8 2.5" opacity="0" />;
        })}

        {/* Dots */}
        {DOTS.map((d, i) => {
          const p = dotInit(d);
          return <circle key={`dot${i}`} ref={el => { dotRefs.current[i] = el; }}
            cx={p.x} cy={p.y} r={d.size} fill="var(--accent)" opacity="0" />;
        })}

        {/* Logo groups — positioned via SVG transform attribute in RAF loop */}
        {LOGOS.map((l, i) => {
          const p = logoInit(l);
          return (
            <g key={l.name} ref={el => { logoRefs.current[i] = el; }}
              transform={`translate(${p.x.toFixed(3)},${p.y.toFixed(3)})`} opacity="0">
              <g transform={`translate(${ICON_OFF},${ICON_OFF}) scale(${SCALE})`}>
                <path d={l.path} fill="var(--accent)" fillRule="evenodd" />
              </g>
            </g>
          );
        })}

        {/* Geometric shapes — Framer Motion (no line connections needed) */}
        {SHAPES.map((shape, i) => {
          const a0 = (shape.angle * Math.PI) / 180;
          const pts = 12;
          const xs: number[] = [], ys: number[] = [];
          for (let p = 0; p <= pts; p++) {
            const a = a0 + shape.dir * (p / pts) * Math.PI * 2;
            xs.push(CX + shape.r * Math.cos(a));
            ys.push(CY + shape.r * Math.sin(a));
          }
          const spinKeys = shape.spin > 0
            ? Array.from({ length: pts + 1 }, (_, p) => p * (360 / pts) * shape.dir)
            : [0];
          return (
            <motion.g key={`sh${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.16, 0.06, 0.16, 0.09, 0.16, 0.06, 0.16, 0.09, 0.16, 0.06, 0.16, 0] }}
              transition={{ delay: shape.delay, duration: shape.speed, repeat: Infinity, ease: "linear" }}>
              <motion.g
                initial={{ x: xs[0], y: ys[0] }}
                animate={{ x: xs, y: ys }}
                transition={{ delay: shape.delay, duration: shape.speed, repeat: Infinity, ease: "linear" }}>
                <motion.g
                  animate={shape.spin > 0 ? { rotate: spinKeys } : {}}
                  transition={shape.spin > 0 ? { delay: shape.delay, duration: shape.speed, repeat: Infinity, ease: "linear" } : {}}
                  style={{ transformOrigin: "0px 0px" }}>
                  {shape.type === "circ"
                    ? <circle r={shape.size} fill="none" stroke="var(--accent)" strokeWidth="0.25" />
                    : <path d={shapePath(shape.type, shape.size)} fill="none" stroke="var(--accent)" strokeWidth="0.25" />}
                </motion.g>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

const TAGLINE = "Trasformo le tue idee in prodotti digitali ad alte prestazioni. Specializzato in Web Development e Soluzioni Custom basate su Intelligenza Artificiale.";

const SERVICES = [
  { icon: Globe,     label: "Siti WordPress" },
  { icon: ShoppingCart, label: "E-commerce WooCommerce" },
  { icon: Wrench,    label: "Assistenza WordPress" },
  { icon: Code2,     label: "Interfacce React / Next.js" },
  { icon: BarChart2, label: "Dashboard crypto & fintech" },
  { icon: Bot,       label: "Assistenti AI personalizzati" },
];

function ServiceCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {SERVICES.map(({ icon: Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.06, duration: 0.3, ease: "easeOut" }}
          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-default"
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
    <section className="min-h-screen flex flex-col justify-center px-6 pb-10 pt-20 md:pb-20 max-w-6xl mx-auto">

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

      {/* Heading + Orbit animation */}
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
        {/* Cloud overlay — behind the orbit animation */}
        <div
          className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[65%] aspect-square pointer-events-none hidden lg:block"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        >
          {/* Primary blue #0052ff */}
          <div className="absolute inset-0 cloud-drift-1"
            style={{
              background: "radial-gradient(ellipse at 40% 35%, rgba(0,82,255,0.13) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
          {/* Complementary warm — amber/orange (opposite of blue on wheel) */}
          <div className="absolute inset-0 cloud-drift-2"
            style={{
              background: "radial-gradient(ellipse at 70% 55%, rgba(255,160,40,0.06) 0%, transparent 50%)",
              filter: "blur(55px)",
            }}
          />
          {/* Split-complementary — soft violet */}
          <div className="absolute inset-0 cloud-drift-3"
            style={{
              background: "radial-gradient(ellipse at 30% 65%, rgba(120,70,220,0.08) 0%, transparent 55%)",
              filter: "blur(50px)",
            }}
          />
          {/* Analogous — cyan/teal */}
          <div className="absolute inset-0 cloud-drift-1"
            style={{
              background: "radial-gradient(ellipse at 60% 75%, rgba(0,180,210,0.07) 0%, transparent 50%)",
              filter: "blur(45px)",
              animationDelay: "-8s",
            }}
          />
        </div>
        <OrbitAnimation />
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
