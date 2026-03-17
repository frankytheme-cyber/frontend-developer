"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  speedMultiplier: number;
  colorType: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  alpha: number;
};

const STAR_COUNT = 350;

function createStar(w: number, h: number): Star {
  const isBand = Math.random() > 0.35;
  let x = 0;
  let y = 0;

  if (isBand) {
    const pos = Math.random();
    const basePathX = pos * w;
    const basePathY = (1 - pos) * h;
    const r = Math.random();
    const spread = Math.pow(r, 1.5) * (Math.random() > 0.5 ? 1 : -1) * (Math.min(w, h) * 0.45);
    x = basePathX + spread;
    y = basePathY + spread;
  } else {
    x = Math.random() * w;
    y = Math.random() * h;
  }

  x = (x + w * 2) % w || 0;
  y = (y + h * 2) % h || 0;

  return {
    x,
    y,
    radius: Math.pow(Math.random(), 3) * 1.5 + 0.2,
    alpha: Math.random() * 0.8 + 0.1,
    alphaDir: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.005 + 0.001),
    speedMultiplier: Math.random() * 0.3 + 0.05,
    colorType: Math.floor(Math.random() * 3),
  };
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let frameCount = 0;
    const isDark = theme === "dark" || resolvedTheme === "dark";

    function spawnShootingStar() {
      if (!canvas) return;
      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.2; // 25°–45° downward
      const speed = 6 + Math.random() * 8;
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        length: 60 + Math.random() * 80,
        alpha: 0.7 + Math.random() * 0.3,
      });
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (stars.length === 0) init();
    }

    function init() {
      if (!canvas) return;
      stars = Array.from({ length: STAR_COUNT }, () =>
        createStar(canvas.width, canvas.height)
      );
    }

    function tick() {
      if (!canvas || !ctx) return;

      const colors = isDark
        ? ["255, 255, 255", "180, 210, 255", "255, 230, 180"]
        : ["10, 15, 25", "0, 40, 100", "50, 40, 10"];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Static stars only in dark mode
      if (isDark) {
        for (const s of stars) {
          s.x -= 0.15 * s.speedMultiplier;
          s.y -= 0.05 * s.speedMultiplier;

          if (s.x < 0) s.x = canvas.width;
          if (s.y < 0) s.y = canvas.height;
          if (s.x > canvas.width) s.x = 0;
          if (s.y > canvas.height) s.y = 0;

          s.alpha += s.alphaDir;
          if (s.alpha >= 1) { s.alpha = 1; s.alphaDir *= -1; }
          else if (s.alpha <= 0.05) { s.alpha = 0.05; s.alphaDir *= -1; }

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors[s.colorType]}, ${s.alpha})`;
          ctx.fill();
        }
      }

      // Shooting stars — spawn randomly every ~3-6 seconds
      frameCount++;
      if (frameCount % (180 + Math.floor(Math.random() * 180)) === 0) {
        spawnShootingStar();
      }

      // Draw shooting stars
      const shootColor = isDark ? "255,255,255" : "10,15,25";
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;

        // Fade in then out
        const progress = ss.life / ss.maxLife;
        const fade = progress < 0.1
          ? progress / 0.1
          : 1 - ((progress - 0.1) / 0.9);
        const a = Math.max(0, fade * ss.alpha);

        // Trail line with gradient
        const tailX = ss.x - (ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * fade;
        const tailY = ss.y - (ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * fade;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(${shootColor},0)`);
        grad.addColorStop(1, `rgba(${shootColor},${a})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${shootColor},${a})`;
        ctx.fill();

        // Remove dead ones
        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [theme, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
