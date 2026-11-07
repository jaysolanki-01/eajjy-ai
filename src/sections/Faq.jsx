import React from "react";
import useTranslation from "../hooks/useTranslation.js";

export default function Faq() {
  const t = useTranslation();
  const f = t.faqSection;
  const items = t.faq.items;
  return (
    <section className="sec wrap" id="faq">
      <div className="reveal">
        <span className="eyebrow">{f.eyebrow}</span>
        <h2>{f.headline}</h2>
      </div>
      <div className="faq stagger">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}<span className="pm">+</span></summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
