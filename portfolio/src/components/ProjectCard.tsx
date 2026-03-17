"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 rounded-xl transition-all duration-200 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Image */}
      {project.image && (
        <div className="overflow-hidden rounded-lg rounded-b-none -mx-1 -mt-1">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="w-full h-60 object-cover object-top transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--surface-2)" }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 ">
        <h3 className="font-semibold text-xl leading-snug pt-2 px-5" style={{ color: "var(--text)" }}>
          {project.name}
        </h3>
        <div className="flex gap-2 shrink-0">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-150"
              style={{ color: "var(--muted-2)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted-2)")}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri sito"
              className="transition-colors duration-150"
              style={{ color: "var(--muted-2)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted-2)")}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 p-5" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 p-5 pt-0">
        {project.tech.map((t) => (
          <span
            key={t} 
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: "var(--badge-bg)",
              color: "var(--badge-text)",
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--badge-border)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
