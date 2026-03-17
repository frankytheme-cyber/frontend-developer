"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

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
    value: "linkedin.com/in/simone-puliti-23071898",
    href: "https://linkedin.com/in/simone-puliti-23071898",
  },
];

export default function Contact() {
  return (
    <section id="contatti" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

     

      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 pb-10 pt-10 md:pt-20">
        {/* Left */}
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
            className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] leading-none mb-6"
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
            Costruisco siti WordPress, e-commerce e interfacce in React. 
            Sviluppo soluzioni AI su misura — chatbot, tool interni e workflow automatizzati — facilmente integrabili in qualsiasi contesto web. 
            <br/>Freelance da Verona, disponibile da remoto.
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
        </div>

        {/* Right — links */}
        <div className="flex flex-col gap-5 lg:pt-2">
          {/* Email */}
          <motion.a
            href={`mailto:${EMAIL_PARTS.join("")}`}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
            className="group flex items-center gap-4 transition-colors duration-150"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </span>
            <div className="text-left">
              <p className="text-base" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}>Email</p>
              <p className="text-base font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                simowebdesigner<span aria-hidden>&#8203;</span>@<span aria-hidden>&#8203;</span>gmail.com
              </p>
            </div>
          </motion.a>

          {socialLinks.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.29 + i * 0.07 }}
              className="flex items-center gap-4 transition-colors duration-150"
              style={{ color: "var(--muted)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </span>
              <div>
                <p className="text-base" style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}>{label}</p>
                <p className="text-base font-medium" style={{ fontFamily: "var(--font-mono)" }}>{value}</p>
              </div>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-2"
            style={{ color: "var(--muted-2)" }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="text-base" style={{ fontFamily: "var(--font-mono)" }}>Verona, Italia</span>
          </motion.div>
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
          Next.js · Tailwind · Framer Motion
        </p>
      </motion.div>
    </section>
  );
}
