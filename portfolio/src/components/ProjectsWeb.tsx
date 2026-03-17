"use client";

import { motion } from "framer-motion";
import { webProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsWeb() {
  return (
    <section id="progetti-web" className="py-28 px-6 max-w-6xl mx-auto">
      {/* Top border */}
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Progetti Web
      </motion.p>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] leading-none"
          style={{ color: "var(--text)" }}
        >
          Siti & App
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-lg max-w-md"
          style={{ color: "var(--muted)" }}
        >
          WordPress, React e Next.js. Dal sito vetrina all&apos;e-commerce complesso.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {webProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
