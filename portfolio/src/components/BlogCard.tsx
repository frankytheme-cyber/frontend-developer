"use client";

import Link from "next/link";
import { PostMeta } from "@/lib/blog";

type Props = {
  post: PostMeta;
  index: number;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4 p-6 rounded-xl transition-colors duration-200"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
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
      <h2
        className="text-xl font-bold leading-snug"
        style={{ color: "var(--text)" }}
      >
        {post.title}
      </h2>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--muted)" }}
      >
        {post.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <time
          className="text-xs"
          dateTime={post.date}
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          {formatDate(post.date)}
        </time>
        <span
          className="text-xs font-semibold transition-colors duration-200"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-mono)" }}
        >
          Leggi →
        </span>
      </div>
    </Link>
  );
}
