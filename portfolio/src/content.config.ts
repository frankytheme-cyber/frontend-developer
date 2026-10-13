import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const guide = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guide" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const projectSchema = z.object({
  name: z.string(),
  order: z.number().default(0),
  description: z.string(),
  tech: z.array(z.string()).default([]),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  image: z.string().optional(),
});

const projectsWeb = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects-web" }),
  schema: projectSchema,
});

const projectsCrypto = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects-crypto" }),
  schema: projectSchema,
});

const service = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/service" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().default("Servizi"),
    metaDescription: z.string(),
    heroDot: z.string().default("#b3a8ff"),
  }),
});

export const collections = {
  guide,
  "projects-web": projectsWeb,
  "projects-crypto": projectsCrypto,
  service,
};
