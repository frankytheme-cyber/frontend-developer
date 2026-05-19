import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://simonepuliti.dev";
const BLOG_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: "Blog — AI, Web Development e Next.js",
  description:
    "Articoli pratici su sviluppo AI, integrazione Claude API, Next.js e web development professionale. Guide tecniche per developer e aziende.",
  alternates: { canonical: BLOG_URL },
  keywords: [
    "blog sviluppo AI",
    "Claude API tutorial",
    "Next.js tutorial italiano",
    "web development blog",
    "guida AI per aziende",
  ],
  openGraph: {
    title: "Blog — Simone Puliti",
    description:
      "Articoli pratici su AI, Claude API, Next.js e web development. Guide per developer e aziende.",
    type: "website",
    url: BLOG_URL,
    siteName: "Simone Puliti — Web Design & Web Developer",
    locale: "it_IT",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Simone Puliti",
    description:
      "Articoli pratici su AI, Claude API, Next.js e web development.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog — Simone Puliti",
      description:
        "Articoli pratici su sviluppo AI, integrazione Claude API, Next.js e web development professionale.",
      url: BLOG_URL,
      inLanguage: "it-IT",
      author: { "@type": "Person", name: "Simone Puliti", url: SITE_URL },
      publisher: { "@type": "Person", name: "Simone Puliti", url: SITE_URL },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Person", name: "Simone Puliti", url: SITE_URL },
        keywords: post.tags?.join(", "),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_URL },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
