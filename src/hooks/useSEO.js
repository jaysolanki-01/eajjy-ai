import { useEffect } from "react";

export default function useSEO({ title, description, canonical } = {}) {
  useEffect(() => {
    document.title = title
      ? `${title} | EAJJY AI`
      : "EAJJY AI | AI Agency for Professional Services";
    setMeta("name", "description", description || "EAJJY AI is a specialist AI agency helping professional services firms eliminate manual work and scale through intelligent automation.");
    setMeta("name", "robots", "index, follow");
    let can = document.querySelector("link[rel='canonical']");
    if (!can) { can = document.createElement("link"); can.setAttribute("rel", "canonical"); document.head.appendChild(can); }
    can.setAttribute("href", canonical || `https://www.eajjy.com${window.location.pathname}`);
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", description || "");
    setMeta("property", "og:url", canonical || `https://www.eajjy.com${window.location.pathname}`);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", "https://www.eajjy.com/logo.png");
    setMeta("property", "og:site_name", "EAJJY AI");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", document.title);
    setMeta("name", "twitter:description", description || "");
    setMeta("name", "twitter:image", "https://www.eajjy.com/logo.png");
  }, [title, description, canonical]);
}

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", value);
}
