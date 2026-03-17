"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "dark") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute aurora-blob-1"
        style={{
          width: "100vw",
          height: "100vh",
          top: "-10%",
          left: "0%",
          background: "radial-gradient(ellipse at center, rgba(0,255,180,0.08) 0%, rgba(0,200,150,0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute aurora-blob-2"
        style={{
          width: "100vw",
          height: "100vh",
          top: "-5%",
          right: "0%",
          background: "radial-gradient(ellipse at center, rgba(0,82,255,0.08) 0%, rgba(60,120,255,0.03) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute aurora-blob-3"
        style={{
          width: "100vw",
          height: "100vh",
          top: "0%",
          left: "0%",
          background: "radial-gradient(ellipse at center, rgba(140,80,255,0.08) 0%, rgba(180,100,255,0.03) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
