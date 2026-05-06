"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col group"
    >
      {/* Image */}
      {project.image && (
        <a
          href={project.liveUrl || project.repoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block overflow-hidden h-64 md:h-72 mb-6"
        >
          <Image
            src={project.image}
            alt={`${project.name} — ${project.tech.slice(0, 2).join(", ")} | Simone Puliti`}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            style={{ background: "var(--bg-warm)" }}
          />
        </a>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-xl font-bold leading-snug"
          style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
        >
          {project.name}
        </h3>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apri sito"
            className="shrink-0 mt-1 transition-opacity duration-150 hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Tech */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-medium px-2.5 py-1"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
