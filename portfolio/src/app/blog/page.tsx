import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — AI, Web Development e Next.js",
  description:
    "Articoli pratici su sviluppo AI, integrazione Claude API, Next.js e web development professionale. Guide tecniche per developer e aziende.",
  openGraph: {
    title: "Blog — Simone Puliti",
    description:
      "Articoli pratici su AI, Claude API, Next.js e web development. Guide per developer e aziende.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Back link */}
        <a href="/" className="back-link">
          ← simonepuliti.dev
        </a>

        {/* Header */}
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Articoli
        </p>
        <h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-[-0.03em] leading-none mb-6"
          style={{ color: "var(--text)" }}
        >
          Blog<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          className="text-lg max-w-xl mb-16 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Guide pratiche su AI, Claude API, Next.js e web development
          professionale.
        </p>

        <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

        {/* Posts */}
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Nessun articolo pubblicato.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
