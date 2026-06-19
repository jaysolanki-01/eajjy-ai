// Blog loader — auto-discovers every .md file in src/content/blog/
// New posts (e.g. dropped in by n8n) appear automatically on rebuild.

// Vite glob import: grab each markdown file as a raw string.
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal, browser-safe frontmatter parser (no gray-matter / Buffer needed).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, yaml, content] = match;
  const data = {};
  yaml.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    if (!key) return;
    let val = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    data[key] = val;
  });
  return { data, content };
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

// Auto-extracts an "## FAQ" section from the markdown body, if present.
// Inside it, each "### Question text" + the paragraph(s) below becomes one Q&A.
// The FAQ section is removed from the main body so it isn't shown twice;
// it's rendered separately as a styled accordion on the post page.
// This needs no frontmatter or special syntax -> n8n (or anyone) can just
// write plain markdown and the FAQ shows up automatically.
function extractFaq(content) {
  const faqMatch = content.match(/\n##\s+FAQ\s*\n([\s\S]*?)(?=\n##\s|\n---|\s*$)/i);
  if (!faqMatch) return { body: content, faq: [] };

  const [fullMatch, faqBlock] = faqMatch;
  const body = content.slice(0, faqMatch.index) + content.slice(faqMatch.index + fullMatch.length);

  const faq = [];
  const qParts = faqBlock.split(/\n###\s+/).slice(1); // first split chunk is empty/whitespace
  qParts.forEach((chunk) => {
    const lines = chunk.split("\n");
    const question = lines[0].trim();
    const answer = lines.slice(1).join("\n").trim();
    if (question && answer) faq.push({ q: question, a: answer });
  });

  return { body: body.trimEnd(), faq };
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const { body, faq } = extractFaq(content);
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || "Untitled",
      date: data.date || "",
      author: data.author || "EAJJY AI",
      excerpt: data.excerpt || "",
      cover: data.cover || "",
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      read: data.read || "",
      content: body,
      faq,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
