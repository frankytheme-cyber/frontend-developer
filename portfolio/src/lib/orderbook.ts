export const LEVELS = 8;
export const INTERVAL_MS = 320;
export const BASE_MID = 42_150;

export type Level = { price: number; size: number };

export const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const fmtQty = (n: number) => (n >= 1000 ? (n / 1000).toFixed(2) + "k" : n.toFixed(2));
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function initSide(base: number, dir: 1 | -1): Level[] {
  return Array.from({ length: LEVELS }, (_, i) => ({
    price: +(base + dir * (i * (1.2 + Math.random() * 2.8))).toFixed(1),
    size: +(Math.random() * 3.5 + 0.15).toFixed(3),
  }));
}

export function mutateSide(rows: Level[], base: number, dir: 1 | -1): Level[] {
  if (rows.length < LEVELS) rows = initSide(base, dir);
  if (rows.length > 0) {
    const shift = base - rows[0].price;
    if (Math.abs(shift) > 0.3) rows.forEach((r) => (r.price = +(r.price + shift * 0.4).toFixed(1)));
  }
  const mutations = 2 + Math.floor(Math.random() * 3);
  for (let m = 0; m < mutations; m++) {
    const idx = Math.floor(Math.random() * rows.length);
    rows[idx].size = +clamp(rows[idx].size + (Math.random() - 0.4) * 1.5, 0.02, 12).toFixed(3);
  }
  if (Math.random() < 0.12 && rows.length === LEVELS) {
    const last = rows.length - 1;
    rows[last] = {
      price: +(rows[last - 1].price + dir * (1 + Math.random() * 3)).toFixed(1),
      size: +(Math.random() * 3 + 0.1).toFixed(3),
    };
  }
  return rows;
}

export function rowsHtml(rows: Level[], side: "bid" | "ask"): string {
  let running = 0;
  const max = rows.reduce((acc, r) => acc + r.size, 0) || 1;
  const color = side === "bid" ? "#22c55e" : "#ef4444";
  const tint = side === "bid" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)";
  return rows
    .map((r) => {
      running += r.size;
      const pct = (running / max) * 100;
      return `<div class="relative grid grid-cols-2 px-2 overflow-hidden" style="height:22px;line-height:22px">
        <span class="absolute inset-y-0 right-0 pointer-events-none" style="width:${pct}%;background:${tint}"></span>
        <span style="color:${color};position:relative">${fmt(r.price)}</span>
        <span class="text-right" style="color:var(--muted);position:relative">${fmtQty(r.size)}</span>
      </div>`;
    })
    .join("");
}

/** Un tick deterministico lato server per il primo render (no-JS incluso). */
export function initialSnapshot() {
  const gap = 8 + Math.random() * 10;
  const bids = mutateSide(initSide(BASE_MID - gap / 2, -1), BASE_MID - gap / 2, -1)
    .sort((a, b) => b.price - a.price)
    .slice(0, LEVELS);
  const asks = mutateSide(initSide(BASE_MID + gap / 2, 1), BASE_MID + gap / 2, 1)
    .sort((a, b) => a.price - b.price)
    .slice(0, LEVELS);
  return { bids, asks, mid: BASE_MID, gap };
}
