// Blog loader — auto-discovers every .md file in src/content/blog/
// New posts (e.g. dropped in by n8n) appear automatically on rebuild.

// Vite glob import: grab each markdown file as a raw string.
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal, browser-safe frontmatter parser.
// Handles n8n's multi-line faq: [...] blocks robustly.
function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, content: raw };

  // Find second --- that closes frontmatter.
  // Strategy: remove the faq:[...] block first (it's multi-line JSON and
  // confuses any line-based or bracket-depth scanner due to brackets in strings).
  // Then find closing --- safely.
  const afterOpen = raw.slice(3); // skip opening ---
  // Extract faq block if present (faq: [ ... ] spanning multiple lines)
  let faqJson = null;
  const faqBlockMatch = afterOpen.match(/\nfaq:\s*(\[[\s\S]*?\])/m);
  const sanitized = faqBlockMatch
    ? afterOpen.replace(faqBlockMatch[0], "\nfaq_extracted: true")
    : afterOpen;
  if (faqBlockMatch) {
    try { faqJson = JSON.parse(faqBlockMatch[1]); } catch { faqJson = null; }
  }

  // Now find closing --- safely in sanitized string
  const closeIdx = sanitized.indexOf("\n---");
  if (closeIdx === -1) return { data: {}, content: raw };

  const yamlBlock = sanitized.slice(0, closeIdx);
  const content = sanitized.slice(closeIdx + 4); // skip \n---

  // Parse simple key: value lines
  const data = {};
  for (const line of yamlBlock.split("\n")) {
    const ci = line.indexOf(":");
    if (ci === -1) continue;
    const key = line.slice(0, ci).trim();
    if (!key || key.startsWith("#")) continue;
    const val = line.slice(ci + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = val;
  }

  // Restore faq as parsed array
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
