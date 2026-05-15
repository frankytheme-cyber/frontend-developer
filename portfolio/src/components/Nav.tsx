"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { isDarkTheme } from "@/lib/theme";

const LINKS = [
  { hash: "tool-ai",         label: "Tool AI" },
  { hash: "progetti-crypto", label: "Progetti Crypto" },
  { hash: "progetti-web",    label: "Progetti Web" },
  { hash: "contatti",        label: "Contatti" },
];

export default function Nav() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const linkHref = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);
  const logoHref = isHome ? "#top" : "/";
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && isDarkTheme(resolvedTheme);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-200"
        style={{
          background: scrolled ? "color-mix(in oklab, var(--bg) 80%, transparent)" : "transparent",
          backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex items-center justify-between px-6 h-14" style={{ maxWidth: "1200px" }}>
          <a
            href={logoHref}
            className="text-sm font-bold tracking-tight"
            style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
          >
            Simone Puliti<span style={{ color: "var(--accent-2)" }}>.</span>
          </a>

          <ul className="hidden md:flex items-center" style={{ gap: "28px" }}>
            {LINKS.map(({ hash, label }) => (
              <li key={hash}>
                <a
                  href={linkHref(hash)}
                  className="text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center" style={{ gap: "8px" }}>
            {mounted ? (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "sage-light" : "sage-dark")}
                className="flex items-center justify-center w-9 h-9 transition-colors duration-200 cursor-pointer"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
                aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            ) : (
              <div
                className="w-9 h-9"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "2px" }}
                aria-hidden
              />
            )}

            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 cursor-pointer"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            className="md:hidden border-t"
            style={{
              background: "color-mix(in oklab, var(--bg) 92%, transparent)",
              backdropFilter: "saturate(140%) blur(10px)",
              WebkitBackdropFilter: "saturate(140%) blur(10px)",
              borderColor: "var(--border-soft)",
            }}
          >
            <ul className="flex flex-col px-6 py-3">
              {LINKS.map(({ hash, label }) => (
                <li key={hash}>
                  <a
                    href={linkHref(hash)}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <div id="top" />
    </>
  );
}
