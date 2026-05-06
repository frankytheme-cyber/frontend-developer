"use client";

import { motion } from "framer-motion";
import { cryptoProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsCrypto() {
  return (
    <section
      id="progetti-crypto"
      className="px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-warm)" }}
    >
      <div className="max-w-7xl mx-auto w-full py-24 md:py-32">
        {/* Section divider */}
        <div className="w-full h-px mb-20" style={{ background: "var(--border)" }} />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
          style={{ color: "var(--muted)" }}
        >
          Crypto &amp; Fintech
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading-display text-[clamp(2.5rem,7vw,6rem)] mb-8"
        >
          Dashboard
          <br />
          &amp; Tool
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
          Interfacce per la finanza digitale: analisi DeFi, simulatori e tool di portafoglio.
        </motion.p>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {cryptoProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
