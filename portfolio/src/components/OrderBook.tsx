"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Level = { price: number; size: number; total: number };

const BASE_MID = 42150;
const MAX_LEVELS = 8;
const INTERVAL_MS = 380;

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
function fmtQty(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(2) + "k" : n.toFixed(2);
}
function buildLevels(raw: { price: number; size: number }[]): Level[] {
  let running = 0;
  return raw.map((l) => { running += l.size; return { ...l, total: running }; });
}

export default function OrderBook() {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);
  const [flashBid, setFlashBid] = useState<number | null>(null);
  const [flashAsk, setFlashAsk] = useState<number | null>(null);
  const [lastMid, setLastMid] = useState(BASE_MID);
  const [midDir, setMidDir] = useState<"up" | "down" | null>(null);
  const prevMid = useRef(BASE_MID);

  // Stable ref-based interval — never recreated, never stops
  useEffect(() => {
    function tick() {
      const spread = 18 + Math.random() * 12;
      const mid = BASE_MID + (Math.random() - 0.5) * 120;
      setMidDir(mid > prevMid.current ? "up" : "down");
      prevMid.current = mid;
      setLastMid(mid);
      const bestBid = mid - spread / 2;
      const bestAsk = mid + spread / 2;

      setBids((prev) => {
        const price = bestBid - Math.random() * 80;
        const size = Math.random() * 3 + 0.05;
        const idx = prev.findIndex((l) => Math.abs(l.price - price) < 1);
        let next: { price: number; size: number }[];
        if (idx >= 0) {
          next = prev.map((l, i) => (i === idx ? { price: l.price, size } : l));
          setFlashBid(prev[idx].price);
          setTimeout(() => setFlashBid(null), 600);
        } else {
          next = [...prev, { price, size }];
        }
        return buildLevels(next.sort((a, b) => b.price - a.price).slice(0, MAX_LEVELS));
      });

      setAsks((prev) => {
        const price = bestAsk + Math.random() * 80;
        const size = Math.random() * 3 + 0.05;
        const idx = prev.findIndex((l) => Math.abs(l.price - price) < 1);
        let next: { price: number; size: number }[];
        if (idx >= 0) {
          next = prev.map((l, i) => (i === idx ? { price: l.price, size } : l));
          setFlashAsk(prev[idx].price);
          setTimeout(() => setFlashAsk(null), 600);
        } else {
          next = [...prev, { price, size }];
        }
        return buildLevels(next.sort((a, b) => a.price - b.price).slice(0, MAX_LEVELS));
      });
    }

    tick();
    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, []); // empty deps → runs once, never recreated

  const maxBidTotal = bids[bids.length - 1]?.total ?? 1;
  const maxAskTotal = asks[asks.length - 1]?.total ?? 1;
  const spread = asks[0] && bids[0] ? asks[0].price - bids[0].price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden border w-full lg:max-w-sm shrink-0"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <span className="font-semibold" style={{ color: "var(--muted)" }}>Order Book</span>
        <span style={{ color: "var(--muted-2)" }}>ETH/USDT</span>
      </div>

      {/* Bids | Asks side by side */}
      <div className="grid grid-cols-2" style={{ borderBottom: `1px solid var(--border)` }}>

        {/* ── BIDS (left) ── */}
        <div className="border-r" style={{ borderColor: "var(--border)" }}>
          {/* Column header */}
          <div className="grid grid-cols-2 px-2 py-1.5 border-b"
            style={{ borderColor: "var(--border)", color: "var(--muted-2)" }}>
            <span>Bid</span>
            <span className="text-right">Qty</span>
          </div>
          {/* Rows */}
          <div className="h-45 overflow-hidden">
            <AnimatePresence initial={false}>
            {bids.map((l) => {
              const pct = (l.total / maxBidTotal) * 100;
              const isFlash = flashBid !== null && Math.abs(l.price - flashBid) < 1;
              return (
                <motion.div
                  key={`b-${l.price.toFixed(1)}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1, x: 0,
                    backgroundColor: isFlash ? "rgba(34,197,94,0.35)" : "rgba(0,0,0,0)",
                  }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{
                    opacity: { duration: 0.18 },
                    x: { duration: 0.18 },
                    backgroundColor: { duration: isFlash ? 0.05 : 0.55 },
                  }}
                  className="relative grid grid-cols-2 px-2 py-0.75 overflow-hidden"
                >
                  <span className="absolute inset-y-0 right-0 pointer-events-none"
                    style={{ width: `${pct}%`, background: "rgba(34,197,94,0.09)", transition: "width 0.3s" }} />
                  <span style={{ color: "#22c55e", position: "relative" }}>{fmt(l.price)}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`bq-${l.price.toFixed(1)}-${l.size.toFixed(3)}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.14 }}
                      className="text-right"
                      style={{ color: "var(--muted)", position: "relative" }}
                    >
                      {fmtQty(l.size)}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── ASKS (right) ── */}
        <div>
          {/* Column header */}
          <div className="grid grid-cols-2 px-2 py-1.5 border-b"
            style={{ borderColor: "var(--border)", color: "var(--muted-2)" }}>
            <span>Ask</span>
            <span className="text-right">Qty</span>
          </div>
          {/* Rows */}
          <div className="h-45 overflow-hidden">
            <AnimatePresence initial={false}>
            {asks.map((l) => {
              const pct = (l.total / maxAskTotal) * 100;
              const isFlash = flashAsk !== null && Math.abs(l.price - flashAsk) < 1;
              return (
                <motion.div
                  key={`a-${l.price.toFixed(1)}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{
                    opacity: 1, x: 0,
                    backgroundColor: isFlash ? "rgba(239,68,68,0.35)" : "rgba(0,0,0,0)",
                  }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{
                    opacity: { duration: 0.18 },
                    x: { duration: 0.18 },
                    backgroundColor: { duration: isFlash ? 0.05 : 0.55 },
                  }}
                  className="relative grid grid-cols-2 px-2 py-0.75 overflow-hidden"
                >
                  <span className="absolute inset-y-0 right-0 pointer-events-none"
                    style={{ width: `${pct}%`, background: "rgba(239,68,68,0.09)", transition: "width 0.3s" }} />
                  <span style={{ color: "#ef4444", position: "relative" }}>{fmt(l.price)}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`aq-${l.price.toFixed(1)}-${l.size.toFixed(3)}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.14 }}
                      className="text-right"
                      style={{ color: "var(--muted)", position: "relative" }}
                    >
                      {fmtQty(l.size)}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mid price footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ background: "var(--surface-2)" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={lastMid.toFixed(1)}
            initial={{ opacity: 0, y: midDir === "up" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="font-bold text-sm"
            style={{ color: midDir === "up" ? "#22c55e" : "#ef4444" }}
          >
            {fmt(lastMid)}
          </motion.span>
        </AnimatePresence>
        <span style={{ color: "var(--muted-2)" }}>spread {fmt(spread)}</span>
      </div>
    </motion.div>
  );
}
