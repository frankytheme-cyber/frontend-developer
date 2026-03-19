"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_CODE = `$ claude

> Build portfolio with Next.js,
  Tailwind and Framer Motion

✓ Layout scaffolded
✓ Components generated
✓ Animations tuned
✓ Deployed to Vercel

Done in 4.2s`;

type TerminalCodeProps = {
  code?: string;
  title?: string;
  delayMs?: number;
  loop?: boolean;
  className?: string;
};

export default function TerminalCode({
  code = DEFAULT_CODE,
  title = "terminal",
  delayMs = 40,
  loop = true,
  className,
}: TerminalCodeProps) {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const cursorInterval = setInterval(() => setCursor((c) => !c), 530);
    const type = () => {
      if (i <= code.length) {
        setDisplay(code.slice(0, i));
        i++;
        setTimeout(type, delayMs);
      } else if (loop) {
        setTimeout(() => {
          setDisplay("");
          i = 0;
          type();
        }, 2000);
      }
    };
    const start = setTimeout(type, 600);
    return () => {
      clearTimeout(start);
      clearInterval(cursorInterval);
    };
  }, [code, delayMs, loop]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className={["rounded-xl overflow-hidden border max-w-xl", className].filter(Boolean).join(" ")}
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <span className="flex gap-1.5">
          {["#e74c3c", "#f1c40f", "#2ecc71"].map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </span>
        <span
          className="text-xs font-medium ml-2"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          {title}
        </span>
      </div>
      {/* Code area — fixed height so box doesn't resize while typing */}
      <div
        className="p-4 h-[180px] overflow-auto"
        style={{ fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.65 }}
      >
        <pre className="m-0 whitespace-pre" style={{ color: "var(--muted)" }}>
          {display}
          <span
            className="inline-block w-2 h-4 align-middle ml-0.5"
            style={{
              background: cursor ? "var(--accent)" : "transparent",
              opacity: cursor ? 1 : 0.3,
            }}
          />
        </pre>
      </div>
    </motion.div>
  );
}
