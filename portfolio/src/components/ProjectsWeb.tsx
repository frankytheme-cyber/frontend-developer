"use client";

import { motion } from "framer-motion";
import { webProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsWeb() {
  return (
    <section id="progetti-web" className="px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full py-24 md:py-32">
        {/* Section divider */}
        <div className="w-full h-px mb-20" style={{ background: "var(--border)" }} />

        {/* Eyebrow + attribution */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            Progetti Web
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--muted-2)" }}
          >
            Sviluppo frontend presso Fornace Srl
          </motion.p>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading-display text-[clamp(2.5rem,7vw,6rem)] mb-8"
        >
          Siti Web
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-lg md:text-xl max-w-lg leading-relaxed mb-16"
          style={{ color: "var(--muted)" }}
        >
          WordPress, React e Next.js. Dal sito vetrina all&apos;e-commerce complesso.
        </motion.p>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {webProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
