import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://simonepuliti.dev",
  output: "static",
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  image: {
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
