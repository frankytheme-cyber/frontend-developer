import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://simonepuliti.dev";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let meta;
  try {
    ({ meta } = getPostBySlug(slug));
  } catch {
    return {};
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: {
      "@type": "Person",
      name: "Simone Puliti",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Simone Puliti",
      url: siteUrl,
    },
    url: `${siteUrl}/blog/${slug}`,
  };

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-6 py-24">
        {/* Back link */}
        <a href="/blog" className="back-link">
          ← Blog
        </a>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: "var(--badge-bg)",
                color: "var(--badge-text)",
                border: "1px solid var(--badge-border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-[clamp(2rem,5vw,3rem)] font-black tracking-[-0.02em] leading-tight mb-4"
          style={{ color: "var(--text)" }}
        >
          {meta.title}
        </h1>

        {/* Date */}
        <time
          dateTime={meta.date}
          className="block text-sm mb-12"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          {formatDate(meta.date)}
        </time>

        <div className="w-full h-px mb-12" style={{ background: "var(--border)" }} />

        {/* MDX Content */}
        <div className="prose-blog">
          <MDXRemote source={content} />
        </div>

        <div className="w-full h-px mt-16 mb-12" style={{ background: "var(--border)" }} />

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <a href="/blog" className="back-link">
            ← Tutti gli articoli
          </a>
          <a href="/#contatti" className="article-cta">
            Parliamo del tuo progetto →
          </a>
        </div>
      </div>
    </main>
  );
}
