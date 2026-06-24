// Blog loader — auto-discovers every .md file in src/content/blog/
// New posts (e.g. dropped in by n8n) appear automatically on rebuild.

// Vite glob import: grab each markdown file as a raw string.
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal, browser-safe frontmatter parser.
// Handles multi-line YAML arrays/objects and the closing --- divider in the body.
function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, content: raw };

  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== "---") return { data: {}, content: raw };

  const data = {};
  let content = raw;
  let inFrontmatter = true;
  let faqJson = null;

  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];

    if (inFrontmatter && line.trim() === "---") {
      content = lines.slice(i + 1).join("\n").replace(/^\n/, "");
      inFrontmatter = false;
      break;
    }

    if (!inFrontmatter) break;

    if (line.startsWith("faq:")) {
      const blockLines = [];
      let j = i + 1;
      let depth = 0;
      let found = false;

      while (j < lines.length) {
        const current = lines[j];
        if (current.includes("[")) depth += (current.match(/\[/g) || []).length;
        if (current.includes("]")) depth -= (current.match(/\]/g) || []).length;
        blockLines.push(current);
        if (depth <= 0 && current.includes("]")) {
          found = true;
          break;
        }
        j += 1;
      }

      if (found) {
        const faqBlock = blockLines.join("\n");
        try {
          faqJson = JSON.parse(faqBlock.replace(/^faq:\s*/, ""));
        } catch {
          faqJson = null;
        }
        i = j;
        continue;
      }
    }

    const ci = line.indexOf(":");
    if (ci === -1) continue;
    const key = line.slice(0, ci).trim();
    if (!key || key.startsWith("#")) continue;

    const rawValue = line.slice(ci + 1).trim();
    if (rawValue === "") {
      data[key] = "";
      continue;
    }

    const value = rawValue.replace(/^['\"]|['\"]$/g, "");
    data[key] = value;
  }

  if (faqJson) data.faq = faqJson;
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
