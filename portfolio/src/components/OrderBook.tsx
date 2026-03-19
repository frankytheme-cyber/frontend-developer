"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── Config ────────────────────────────────────────────────────────── */
const LEVELS = 8;
const INTERVAL_MS = 320;
const BASE_MID = 42_150;

type Row = { price: number; size: number; total: number };

/* ─── Helpers ───────────────────────────────────────────────────────── */
function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
function fmtQty(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(2) + "k" : n.toFixed(2);
}
function totals(rows: { price: number; size: number }[]): Row[] {
  let run = 0;
  return rows.map((r) => { run += r.size; return { ...r, total: run }; });
}
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

/* ─── Initialise a full book ────────────────────────────────────────── */
function initSide(base: number, dir: 1 | -1): { price: number; size: number }[] {
  return Array.from({ length: LEVELS }, (_, i) => ({
    price: +(base + dir * (i * (1.2 + Math.random() * 2.8))).toFixed(1),
    size: +(Math.random() * 3.5 + 0.15).toFixed(3),
  }));
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function OrderBook() {
  const midRef = useRef(BASE_MID);
  const bidsRef = useRef<{ price: number; size: number }[]>([]);
  const asksRef = useRef<{ price: number; size: number }[]>([]);

  const [bids, setBids] = useState<Row[]>([]);
  const [asks, setAsks] = useState<Row[]>([]);
  const [mid, setMid] = useState(BASE_MID);
  const [midDir, setMidDir] = useState<"up" | "down">("up");
  const [spread, setSpread] = useState(0);
  const [flashB, setFlashB] = useState<Set<number>>(new Set());
  const [flashA, setFlashA] = useState<Set<number>>(new Set());

  useEffect(() => {
    function mutateSide(
      rows: { price: number; size: number }[],
      base: number,
      dir: 1 | -1,
    ): { rows: { price: number; size: number }[]; changed: Set<number> } {
      // Seed on first tick
      if (rows.length < LEVELS) rows = initSide(base, dir);

      const changed = new Set<number>();

      // Shift prices toward new best price
      if (rows.length > 0) {
        const shift = base - rows[0].price;
        if (Math.abs(shift) > 0.3) {
          rows.forEach((r) => { r.price = +(r.price + shift * 0.4).toFixed(1); });
        }
      }

      // Mutate 2-4 random levels
      const mutations = 2 + Math.floor(Math.random() * 3);
      for (let m = 0; m < mutations; m++) {
        const idx = Math.floor(Math.random() * rows.length);
        const delta = (Math.random() - 0.4) * 1.5;
        rows[idx].size = +clamp(rows[idx].size + delta, 0.02, 12).toFixed(3);
        changed.add(rows[idx].price);
      }

      // Occasionally replace worst level
      if (Math.random() < 0.12 && rows.length === LEVELS) {
        const last = rows.length - 1;
        rows[last] = {
          price: +(rows[last - 1].price + dir * (1 + Math.random() * 3)).toFixed(1),
          size: +(Math.random() * 3 + 0.1).toFixed(3),
        };
        changed.add(rows[last].price);
      }

      return { rows, changed };
    }

    function tick() {
      // Random-walk mid price
      const step = (Math.random() - 0.48) * 5;
      const newMid = clamp(midRef.current + step, BASE_MID - 200, BASE_MID + 200);
      const dir = newMid >= midRef.current ? "up" : "down";
      midRef.current = newMid;

      const gap = 8 + Math.random() * 10;
      const bestBid = newMid - gap / 2;
      const bestAsk = newMid + gap / 2;

      // Mutate both sides
      const bidResult = mutateSide(
        bidsRef.current.map((r) => ({ ...r })),
        bestBid, -1,
      );
      const askResult = mutateSide(
        asksRef.current.map((r) => ({ ...r })),
        bestAsk, 1,
      );

      // Sort and store
      const sortedBids = bidResult.rows.sort((a, b) => b.price - a.price).slice(0, LEVELS);
      const sortedAsks = askResult.rows.sort((a, b) => a.price - b.price).slice(0, LEVELS);
      bidsRef.current = sortedBids;
      asksRef.current = sortedAsks;

      // Batch all state updates
      setMid(newMid);
      setMidDir(dir as "up" | "down");
      setSpread(gap);
      setBids(totals(sortedBids));
      setAsks(totals(sortedAsks));
      setFlashB(bidResult.changed);
      setFlashA(askResult.changed);
    }

    tick();
    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Clear flash highlights
  useEffect(() => {
    if (flashB.size === 0 && flashA.size === 0) return;
    const t = setTimeout(() => { setFlashB(new Set()); setFlashA(new Set()); }, INTERVAL_MS * 0.65);
    return () => clearTimeout(t);
  }, [flashB, flashA]);

  const maxBid = bids[bids.length - 1]?.total ?? 1;
  const maxAsk = asks[asks.length - 1]?.total ?? 1;

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
      <div className="grid grid-cols-2" style={{ borderBottom: "1px solid var(--border)" }}>

        {/* ── BIDS ── */}
        <div className="border-r" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 px-2 py-1.5 border-b"
            style={{ borderColor: "var(--border)", color: "var(--muted-2)" }}>
            <span>Bid</span>
            <span className="text-right">Qty</span>
          </div>
          <div className="overflow-hidden" style={{ height: LEVELS * 22 }}>
            {bids.map((l) => {
              const pct = (l.total / maxBid) * 100;
              const flash = flashB.has(l.price);
              return (
                <div
                  key={l.price.toFixed(1)}
                  className="relative grid grid-cols-2 px-2 overflow-hidden"
                  style={{
                    height: 22,
                    lineHeight: "22px",
                    backgroundColor: flash ? "rgba(34,197,94,0.22)" : "transparent",
                    transition: "background-color 0.25s ease-out",
                  }}
                >
                  <span
                    className="absolute inset-y-0 right-0 pointer-events-none"
                    style={{
                      width: `${pct}%`,
                      background: "rgba(34,197,94,0.08)",
                      transition: "width 0.4s ease-out",
                    }}
                  />
                  <span style={{ color: "#22c55e", position: "relative" }}>{fmt(l.price)}</span>
                  <span
                    className="text-right"
                    style={{
                      color: "var(--muted)",
                      position: "relative",
                      transition: "color 0.15s",
                    }}
                  >
                    {fmtQty(l.size)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ASKS ── */}
        <div>
          <div className="grid grid-cols-2 px-2 py-1.5 border-b"
            style={{ borderColor: "var(--border)", color: "var(--muted-2)" }}>
            <span>Ask</span>
            <span className="text-right">Qty</span>
          </div>
          <div className="overflow-hidden" style={{ height: LEVELS * 22 }}>
            {asks.map((l) => {
              const pct = (l.total / maxAsk) * 100;
              const flash = flashA.has(l.price);
              return (
                <div
                  key={l.price.toFixed(1)}
                  className="relative grid grid-cols-2 px-2 overflow-hidden"
                  style={{
                    height: 22,
                    lineHeight: "22px",
                    backgroundColor: flash ? "rgba(239,68,68,0.22)" : "transparent",
                    transition: "background-color 0.25s ease-out",
                  }}
                >
                  <span
                    className="absolute inset-y-0 right-0 pointer-events-none"
                    style={{
                      width: `${pct}%`,
                      background: "rgba(239,68,68,0.08)",
                      transition: "width 0.4s ease-out",
                    }}
                  />
                  <span style={{ color: "#ef4444", position: "relative" }}>{fmt(l.price)}</span>
                  <span
                    className="text-right"
                    style={{
                      color: "var(--muted)",
                      position: "relative",
                      transition: "color 0.15s",
                    }}
                  >
                    {fmtQty(l.size)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mid price footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ background: "var(--surface-2)" }}>
        <span
          className="font-bold text-sm"
          style={{
            color: midDir === "up" ? "#22c55e" : "#ef4444",
            transition: "color 0.15s",
          }}
        >
          {fmt(mid)}
        </span>
        <span style={{ color: "var(--muted-2)" }}>spread {fmt(spread)}</span>
      </div>
    </motion.div>
  );
}
