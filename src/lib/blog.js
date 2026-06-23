// Blog loader — auto-discovers every .md file in src/content/blog/
// New posts (e.g. dropped in by n8n) appear automatically on rebuild.

// Vite glob import: grab each markdown file as a raw string.
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal, browser-safe frontmatter parser (no gray-matter / Buffer needed).
// Handles multi-line values like n8n's faq: [ { ... } ] blocks.
function parseFrontmatter(raw) {
  // Find the opening --- at the very start
  if (!raw.startsWith("---")) return { data: {}, content: raw };

  // Find the CLOSING --- by scanning line by line, skipping multi-line blocks
  const lines = raw.split("\n");
  let inBlock = false; // inside a multi-line [ ] or { } value
  let depth = 0;
  let closingLine = -1;

  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    // Track bracket depth to skip multi-line JSON arrays/objects
    for (const ch of l) {
      if (ch === "[" || ch === "{") { depth++; inBlock = true; }
      else if (ch === "]" || ch === "}") { depth = Math.max(0, depth - 1); if (depth === 0) inBlock = false; }
    }
    // Only treat a line as the closing --- when we're not inside a block
    if (!inBlock && depth === 0 && l.trimEnd() === "---") {
      closingLine = i;
      break;
    }
  }

  if (closingLine === -1) return { data: {}, content: raw };

  const yamlLines = lines.slice(1, closingLine);
  const content = lines.slice(closingLine + 1).join("\n");

  // Parse the YAML lines into a data object
  const data = {};
  let i = 0;
  while (i < yamlLines.length) {
    const line = yamlLines[i];
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) { i++; continue; }
    const key = line.slice(0, colonIdx).trim();
    if (!key) { i++; continue; }
    const rest = line.slice(colonIdx + 1).trim();

    // Multi-line array/object value
    if (rest.startsWith("[") || rest.startsWith("{")) {
      let block = rest;
      let d = 0;
      for (const ch of block) { if (ch === "[" || ch === "{") d++; else if (ch === "]" || ch === "}") d--; }
      i++;
      while (d > 0 && i < yamlLines.length) {
        block += "\n" + yamlLines[i];
        for (const ch of yamlLines[i]) { if (ch === "[" || ch === "{") d++; else if (ch === "]" || ch === "}") d--; }
        i++;
      }
      // Try to parse as JSON
      try { data[key] = JSON.parse(block); } catch { data[key] = block; }
      continue;
    }

    // Simple single-line value
    let val = rest.replace(/^["']|["']$/g, "");
    data[key] = val;
    i++;
  }

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
    const { body, faq: bodyFaq } = extractFaq(content);

    // Also support frontmatter FAQ arrays (n8n format: [{question, answer}])
    let frontmatterFaq = [];
    if (Array.isArray(data.faq)) {
      frontmatterFaq = data.faq
        .filter((f) => f && f.question && f.answer)
        .map((f) => ({ q: f.question, a: f.answer }));
    }

    // Body FAQ takes priority; fall back to frontmatter FAQ
    const faq = bodyFaq.length > 0 ? bodyFaq : frontmatterFaq;
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || "Untitled",
      date: data.date || data.publishedAt || "",
      author: data.author || "Divyesh Solanki",
      authorTitle: data.authorTitle || "",
      authorImage: data.authorImage || "",
      excerpt: data.excerpt || data.description || "",
      cover: data.cover || data.image || "",
      // handle both array tags AND comma-separated string tags (from n8n)
      tags: Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === "string" && data.tags.trim()
        ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      // handle both "read" and "time" (n8n uses time: 9 instead of read: "9 min read")
      read: data.read || (data.time ? `${data.time} min read` : ""),
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
