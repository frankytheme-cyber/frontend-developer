"use client";

import { motion } from "framer-motion";
import { cryptoProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import OrderBook from "./OrderBook";

const PROTOCOLS = ["Uniswap V3", "wagmi", "Viem", "The Graph", "LayerZero"];

export default function ProjectsCrypto() {
  return (
    <section id="progetti-crypto" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

      

      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 mb-8 pb-10 pt-10 md:pt-20">
        <div className="min-w-0 flex-1">
          <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
      >
        Crypto & Fintech
      </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] leading-none mb-4"
            style={{ color: "var(--text)" }}
          >
            Dashboard & Tool
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg max-w-md"
            style={{ color: "var(--muted)" }}
          >
            Interfacce per la finanza digitale: analisi DeFi, simulatori e tool di portafoglio.
          </motion.p>
        </div>
        <OrderBook />
      </div>

      {/* Protocol badges */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {PROTOCOLS.map((p) => (
          <span
            key={p}
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: "rgba(147,197,253,0.05)",
              border: "1px solid rgba(147,197,253,0.2)",
              color: "#0d68fb",
              fontFamily: "var(--font-mono)",
            }}
          >
            {p}
          </span>
        ))}
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cryptoProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
