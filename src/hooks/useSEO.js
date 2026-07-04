import { useEffect } from "react";

const BASE_URL = "https://www.eajjy.com";

export default function useSEO({ title, description, canonical } = {}) {
  useEffect(() => {
    // Title
    document.title = title
      ? `${title} | EAJJY AI`
      : "EAJJY AI | AI Agency for Professional Services";

    // Core meta
    setMeta("name", "description", description || "EAJJY AI is a specialist AI agency helping professional services firms eliminate manual work and scale through intelligent automation.");
    setMeta("name", "robots", "index, follow");

    // Canonical
    const pageUrl = canonical || `${BASE_URL}${window.location.pathname}`;
    const isDE = window.location.pathname.startsWith("/de");
    const enUrl = isDE ? pageUrl.replace(`${BASE_URL}/de`, BASE_URL) : pageUrl;
    const deUrl = isDE ? pageUrl : pageUrl.replace(BASE_URL, `${BASE_URL}/de`);
    setLink("canonical", pageUrl);

    // OG + Twitter
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", description || "");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", `${BASE_URL}/logo.png`);
    setMeta("property", "og:site_name", "EAJJY AI");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", document.title);
    setMeta("name", "twitter:description", description || "");
    setMeta("name", "twitter:image", `${BASE_URL}/logo.png`);

    // ---- Hreflang tags ----
    setHreflang("x-default", enUrl);
    setHreflang("en", enUrl);
    setHreflang("de", deUrl);

    // Cleanup hreflang on unmount so stale tags don't persist across routes
    return () => {
      document
        .querySelectorAll("link[rel='alternate'][hreflang]")
        .forEach((el) => el.remove());
    };
  }, [title, description, canonical]);
}

// Upsert a <meta> tag
function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

// Upsert a <link rel="canonical"> tag
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Create a fresh <link rel="alternate" hreflang="..."> tag
// (always fresh — cleaned up on unmount above)
function setHreflang(lang, href) {
  const el = document.createElement("link");
  el.setAttribute("rel", "alternate");
  el.setAttribute("hreflang", lang);
  el.setAttribute("href", href);
  document.head.appendChild(el);
}
