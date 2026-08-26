"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

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

const socialLinks = [
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/simone-puliti-23071898",
  },
];

export default function Contact() {
  return (
    <section id="contatti" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] gap-14 lg:gap-16 items-start pb-10 pt-10 md:pt-20">
        {/* Left — pitch e contatti diretti */}
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >Contatti
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(1.65rem,4vw,2.75rem)] font-black tracking-[-0.02em] leading-none mb-6"
            style={{ color: "var(--text)" }}
          >
            Lavoriamo
            <br />
            insieme<span style={{ color: "var(--accent)" }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--muted)" }}
          >
            Sviluppo <strong style={{ color: "var(--text)" }}>tool AI personalizzati</strong>, <strong style={{ color: "var(--text)" }}>siti WordPress</strong> e <strong style={{ color: "var(--text)" }}>app React/Next.js</strong> pensate per convertire e crescere nel tempo.
            {" "}Dalle <strong style={{ color: "var(--text)" }}>automazioni AI</strong> agli e-commerce: soluzioni su misura per la tua azienda.
            <br/>Freelance da <strong style={{ color: "var(--text)" }}>Verona</strong>, disponibile da remoto in tutta Italia.
          </motion.p>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--accent)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent)" }} />
            </span>
            <span className="text-base font-medium" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
              Disponibile · Verona / Remote
            </span>
          </motion.div>

          {/* Contatti diretti — solo icone, l'indirizzo sta nel link */}
          <div className="flex flex-col gap-6 mt-10 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              <motion.a
                href={`mailto:${EMAIL_PARTS.join("")}`}
                aria-label="Scrivimi un'email"
                title="Scrivimi un'email"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22 }}
                className="flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-150"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <Mail className="w-[18px] h-[18px]" style={{ color: "var(--accent)" }} />
              </motion.a>

              {socialLinks.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Profilo ${label}`}
                  title={`Profilo ${label}`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.29 + i * 0.07 }}
                  className="flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-150"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <Icon className="w-[18px] h-[18px]" style={{ color: "var(--accent)" }} />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
              style={{ color: "var(--muted-2)" }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="text-base" style={{ fontFamily: "var(--font-mono)" }}>Verona, Italia</span>
            </motion.div>
          </div>
        </div>

        {/* Right — form */}
        <div className="w-full lg:sticky lg:top-24">
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between mt-24 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} Simone Puliti
        </p>
        <p className="text-xs" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}>
          {/* Next.js · Tailwind · Framer Motion */}
        </p>
      </motion.div>
    </section>
  );
}
