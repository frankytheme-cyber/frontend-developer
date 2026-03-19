"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LightMeshBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "light") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden opacity-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Blob 1 — Blue */}
      <div
        className="absolute light-blob-1"
        style={{
          width: "80vw",
          height: "80vh",
          top: "-25%",
          left: "-10%",
          background: "radial-gradient(ellipse at center, rgba(0,82,255,0.08) 0%, rgba(0,82,255,0.02) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob 2 — Cyan/Teal */}
      <div
        className="absolute light-blob-2"
        style={{
          width: "70vw",
          height: "70vh",
          top: "5%",
          right: "-15%",
          background: "radial-gradient(ellipse at center, rgba(0,210,190,0.06) 0%, rgba(0,180,170,0.02) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob 3 — Violet */}
      <div
        className="absolute light-blob-3"
        style={{
          width: "70vw",
          height: "70vh",
          bottom: "-15%",
          left: "0%",
          background: "radial-gradient(ellipse at center, rgba(130,80,230,0.06) 0%, rgba(130,80,230,0.02) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Blob 4 — Peach */}
      <div
        className="absolute light-blob-4"
        style={{
          width: "60vw",
          height: "60vh",
          bottom: "-5%",
          right: "-10%",
          background: "radial-gradient(ellipse at center, rgba(255,140,100,0.05) 0%, rgba(255,120,80,0.015) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
