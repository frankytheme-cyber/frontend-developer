import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
      <div className="w-full h-px mb-16" style={{ background: "var(--border)" }} />

      <div className="flex items-end justify-between mb-12 pb-10 pt-10 md:pt-20">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >
            Articoli
          </p>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] leading-none"
            style={{ color: "var(--text)" }}
          >
            Dal Blog<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </div>

        <Link href="/blog" className="back-link hidden sm:inline-flex mb-2">
          Tutti gli articoli →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/blog" className="back-link">
          Tutti gli articoli →
        </Link>
      </div>
    </section>
  );
}
