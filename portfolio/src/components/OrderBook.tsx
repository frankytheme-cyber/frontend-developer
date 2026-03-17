"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

type Level = { price: number; size: number };

const BASE_MID = 42150;
const SPREAD_BASE = 25;
const MAX_LEVELS = 10;
const INTERVAL_MS = 320;

function formatPrice(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatQty(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toFixed(2);
}

export default function OrderBook() {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);

  const tick = useCallback(() => {
    const spread = SPREAD_BASE + Math.random() * 15;
    const mid = BASE_MID + (Math.random() - 0.5) * 80;
    const bestBid = mid - spread / 2;
    const bestAsk = mid + spread / 2;

    setBids((prev) => {
      const price = bestBid - Math.random() * 100;
      const size = Math.random() * 2.5 + 0.1;
      const rest = prev.filter((l) => Math.abs(l.price - price) > 0.5);
      return [...rest, { price, size }]
        .sort((a, b) => b.price - a.price)
        .slice(0, MAX_LEVELS);
    });
    setAsks((prev) => {
      const price = bestAsk + Math.random() * 100;
      const size = Math.random() * 2.5 + 0.1;
      const rest = prev.filter((l) => Math.abs(l.price - price) > 0.5);
      return [...rest, { price, size }]
        .sort((a, b) => a.price - b.price)
        .slice(0, MAX_LEVELS);
    });
  }, []);

  useEffect(() => {
    tick();
    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, [tick]);

  const bestBid = bids[0]?.price;
  const bestAsk = asks[0]?.price;
  const mid = bestBid != null && bestAsk != null ? (bestBid + bestAsk) / 2 : BASE_MID;
  const spread = bestBid != null && bestAsk != null ? bestAsk - bestBid : SPREAD_BASE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden border w-full max-w-sm"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b text-xs"
        style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted-2)" }}
      >
        <span>Order book</span>
        <span>Spread {formatPrice(spread)} — Mid {formatPrice(mid)}</span>
      </div>
      <div className="grid grid-cols-2 text-xs h-[200px]">
        <div className="border-r flex flex-col min-h-0" style={{ borderColor: "var(--border)" }}>
          <div className="flex justify-between px-2 py-1.5 shrink-0" style={{ color: "var(--muted-2)" }}>
            <span>Bids</span>
            <span>Qty</span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {bids.length === 0 ? (
              <div className="px-2 py-4" style={{ color: "var(--muted-2)" }}>No bids</div>
            ) : (
              bids.map((l) => (
                <div
                  key={`b-${l.price}`}
                  className="flex justify-between px-2 py-0.5"
                  style={{ color: "#22c55e" }}
                >
                  <span>{formatPrice(l.price)}</span>
                  <span>{formatQty(l.size)}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col min-h-0">
          <div className="flex justify-between px-2 py-1.5 shrink-0" style={{ color: "var(--muted-2)" }}>
            <span>Asks</span>
            <span>Qty</span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {asks.length === 0 ? (
              <div className="px-2 py-4" style={{ color: "var(--muted-2)" }}>No asks</div>
            ) : (
              asks.map((l) => (
                <div
                  key={`a-${l.price}`}
                  className="flex justify-between px-2 py-0.5"
                  style={{ color: "#ef4444" }}
                >
                  <span>{formatPrice(l.price)}</span>
                  <span>{formatQty(l.size)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
