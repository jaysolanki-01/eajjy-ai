import React from "react";
import { FAQS } from "../data/siteData.jsx";

export default function Faq() {
  return (
    <section className="sec wrap" id="faq">
      <div className="reveal">
        <span className="eyebrow">FAQ</span>
        <h2>Will This Actually Work for Your Agency?</h2>
      </div>
      <div className="faq stagger">
        {FAQS.map(([q, a]) => (
          <details key={q}>
            <summary>{q}<span className="pm">+</span></summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
