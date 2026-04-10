"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="flex flex-col gap-4 rounded-xl overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Image */}
      {project.image && (
        <a
          href={project.liveUrl || project.repoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block overflow-hidden rounded-lg rounded-b-none -mx-1 -mt-1 h-60 cursor-pointer"
        >
          <Image
            src={project.image}
            alt={`${project.name} — ${project.tech.slice(0, 2).join(', ')} | Simone Puliti`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--surface-2)" }}
          />
        </a>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 ">
        <h3 className="font-semibold text-2xl leading-snug pt-2 px-5 mb-0" style={{ color: "var(--text)" }}>
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
      <p className="text-base leading-relaxed flex-1 px-5 py-4" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 p-5 pt-0">
        {project.tech.map((t) => (
          <span
            key={t} 
            className="text-sm px-2 py-0.5 rounded"
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
