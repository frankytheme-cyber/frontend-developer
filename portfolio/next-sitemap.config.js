const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://simonepuliti.dev";

// Build a slug -> lastmod map from MDX frontmatter so the sitemap reflects
// real publish/update dates instead of "everything changed at build time".
function loadBlogLastmod() {
  const dir = path.join(process.cwd(), "content/blog");
  const map = new Map();
  let latest = null;
  if (!fs.existsSync(dir)) return { map, latest };

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    if (data.published === false) continue;
    const dateStr = data.updated || data.date;
    if (!dateStr) continue;
    const iso = new Date(dateStr).toISOString();
    map.set(slug, iso);
    if (!latest || iso > latest) latest = iso;
  }
  return { map, latest };
}

const { map: BLOG_LASTMOD, latest: BLOG_LATEST } = loadBlogLastmod();

// Per-route lastmod: max(git last-commit, fs mtime) so working-tree edits
// don't show as stale, but committed-only content still gets a stable date.
function routeMtime(relPath) {
  const abs = path.join(process.cwd(), relPath);
  let gitIso = null;
  let fsIso = null;
  try {
    const { execSync } = require("child_process");
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) gitIso = new Date(out).toISOString();
  } catch {}
  try {
    fsIso = fs.statSync(abs).mtime.toISOString();
  } catch {}
  if (gitIso && fsIso) return gitIso > fsIso ? gitIso : fsIso;
  return gitIso || fsIso || null;
}

const ROUTE_FILE = {
  "/": "src/app/page.tsx",
  "/blog": "src/app/blog/page.tsx",
  "/assistenza-wordpress-verona": "src/app/assistenza-wordpress-verona/page.tsx",
  "/tool-ai-verona": "src/app/tool-ai-verona/page.tsx",
};

const BUILD_TIME = new Date().toISOString();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: false,
  transform: async (config, urlPath) => {
    let priority = 0.6;
    let changefreq = "monthly";
    let lastmod = BUILD_TIME;

    if (urlPath === "/") {
      priority = 1.0;
      changefreq = "weekly";
      lastmod = routeMtime(ROUTE_FILE["/"]) || BLOG_LATEST || BUILD_TIME;
    } else if (urlPath === "/assistenza-wordpress-verona" || urlPath === "/tool-ai-verona") {
      priority = 0.9;
      changefreq = "monthly";
      lastmod = routeMtime(ROUTE_FILE[urlPath]) || BUILD_TIME;
    } else if (urlPath === "/blog") {
      priority = 0.7;
      changefreq = "weekly";
      // blog index "changes" whenever the latest post does
      lastmod = BLOG_LATEST || routeMtime(ROUTE_FILE["/blog"]) || BUILD_TIME;
    } else if (urlPath.startsWith("/blog/")) {
      priority = 0.7;
      changefreq = "monthly";
      const slug = urlPath.replace(/^\/blog\//, "");
      lastmod = BLOG_LASTMOD.get(slug) || BUILD_TIME;
    }

    return {
      loc: urlPath,
      changefreq,
      priority,
      lastmod,
    };
  },
};
