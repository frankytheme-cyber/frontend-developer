"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { webProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import TerminalCode from "./TerminalCode";

function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.9;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {webProjects.map((project, i) => (
          <div
            key={project.id}
            data-carousel-item
            className="snap-start shrink-0 basis-[85%] sm:basis-[calc((100%-2rem)/2)] lg:basis-[calc((100%-4rem)/3)]"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <p
          className="text-xs font-medium tracking-wide"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          {webProjects.length} progetti — scorri per esplorare
        </p>
        <div className="flex items-center" style={{ gap: "8px" }}>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="flex items-center justify-center w-10 h-10 transition-all duration-150"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              color: canPrev ? "var(--text)" : "var(--muted-2)",
              opacity: canPrev ? 1 : 0.4,
              cursor: canPrev ? "pointer" : "not-allowed",
            }}
            aria-label="Progetto precedente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="flex items-center justify-center w-10 h-10 transition-all duration-150"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              color: canNext ? "var(--text)" : "var(--muted-2)",
              opacity: canNext ? 1 : 0.4,
              cursor: canNext ? "pointer" : "not-allowed",
            }}
            aria-label="Progetto successivo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsWeb() {
  return (
    <section id="progetti-web" className="py-10 md:py-20 pt-20 px-6 max-w-6xl mx-auto">
      {/* Top border */}
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

    

      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-12 pb-10 pt-10 md:pt-20">
       
        <div className="min-w-0 flex-1">
            <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Progetti Web
      </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(1.65rem,4vw,2.75rem)] font-black tracking-[-0.02em] leading-none mb-4"
            style={{ color: "var(--text)" }}
          >
            Siti Web
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg max-w-md mb-4"
            style={{ color: "var(--muted)" }}
          >
            WordPress, React e Next.js. Dal sito vetrina all&apos;e-commerce complesso.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
          >
            Sviluppo frontend presso Fornace Srl
          </motion.p>
        </div>
        <TerminalCode className="shrink-0 w-full lg:max-w-md lg:w-[420px]" />
      </div>

      <ProjectsCarousel />
    </section>
  );
}
