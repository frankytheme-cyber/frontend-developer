"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

function LinkedInIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const EMAIL_PARTS = ["simowebdesigner", "@", "gmail", ".", "com"];

export default function Contact() {
  return (
    <section
      id="contatti"
      className="px-6 md:px-12 lg:px-20"
      style={{ background: "var(--bg-warm)" }}
    >
      <div className="max-w-7xl mx-auto w-full py-24 md:py-32">
        {/* Section divider */}
        <div className="w-full h-px mb-20" style={{ background: "var(--border)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
              style={{ color: "var(--muted)" }}
            >
              Contatti
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="heading-display text-[clamp(2.5rem,7vw,6rem)] mb-10"
            >
              Lavoriamo
              <br />
              Insieme
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg leading-relaxed mb-10 max-w-md"
              style={{ color: "var(--muted)" }}
            >
              Sviluppo <strong style={{ color: "var(--text)" }}>tool AI personalizzati</strong>,{" "}
              <strong style={{ color: "var(--text)" }}>siti WordPress</strong> e{" "}
              <strong style={{ color: "var(--text)" }}>app React/Next.js</strong> pensate per
              convertire e crescere nel tempo. Freelance da{" "}
              <strong style={{ color: "var(--text)" }}>Verona</strong>, disponibile da remoto in
              tutta Italia.
            </motion.p>

            <motion.a
              href={`mailto:${EMAIL_PARTS.join("")}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
              style={{ background: "var(--text)", color: "var(--text-light)" }}
            >
              Scrivimi
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Right — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-8 lg:pt-16"
          >
            {/* Email */}
            <a
              href={`mailto:${EMAIL_PARTS.join("")}`}
              className="group flex items-center gap-5 transition-colors duration-150"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <Mail className="w-4 h-4" style={{ color: "#0052ff" }} />
              </span>
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-1" style={{ color: "var(--muted-2)" }}>
                  Email
                </p>
                <p
                  className="text-base font-medium group-hover:opacity-70 transition-opacity"
                  style={{ color: "var(--text)" }}
                >
                  simowebdesigner<span aria-hidden>&#8203;</span>@<span aria-hidden>&#8203;</span>gmail.com
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/simone-puliti-23071898"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 transition-colors duration-150"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <LinkedInIcon className="w-4 h-4" style={{ color: "#0052ff" }} />
              </span>
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-1" style={{ color: "var(--muted-2)" }}>
                  LinkedIn
                </p>
                <p
                  className="text-base font-medium group-hover:opacity-70 transition-opacity"
                  style={{ color: "var(--text)" }}
                >
                  linkedin.com/in/simone-puliti-23071898
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-5">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <MapPin className="w-4 h-4" style={{ color: "#0052ff" }} />
              </span>
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-1" style={{ color: "var(--muted-2)" }}>
                  Sede
                </p>
                <p className="text-base font-medium" style={{ color: "var(--text)" }}>
                  Verona, Italia
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mt-4">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--text)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                Disponibile per nuovi progetti
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-32 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs font-medium tracking-wide" style={{ color: "var(--muted-2)" }}>
            &copy; {new Date().getFullYear()} Simone Puliti
          </p>
        </motion.div>
      </div>
    </section>
  );
}
