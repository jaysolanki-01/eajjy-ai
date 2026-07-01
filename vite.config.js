import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import { readdirSync } from "fs";
import { join } from "path";

// Auto-discover blog slugs from markdown files
function getBlogSlugs() {
  try {
    const dir = join(process.cwd(), "src/content/blog");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => `/blog/${f.replace(/\.md$/, "")}`);
  } catch {
    return [];
  }
}

const staticRoutes = [
  "/",
  "/services",
  "/services/business-process-automation",
  "/services/ai-product-development",
  "/services/vibe-coding",
  "/services/n8n-automation",
  "/services/ai-automation-consultancy",
  "/services/llm-rag-solutions",
  "/product",
  "/work",
  "/use-cases",
  "/process",
  "/faq",
  "/blog",
  "/contact",
  "/book",
  "/hire-ai-automation-expert",
  "/thank-you",
];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.eajjy.com",
      dynamicRoutes: [...staticRoutes, ...getBlogSlugs()],
      exclude: ["/thank-you"], // no need to index thank-you in search
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString().slice(0, 10),
    }),
  ],
});
