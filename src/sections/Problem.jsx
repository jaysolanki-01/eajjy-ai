import React from "react";
import useTranslation from "../hooks/useTranslation.js";

export default function Problem() {
  const t = useTranslation();
  const p = t.problem;
  return (
    <section className="sec wrap" id="problem">
      <div className="glow-spot" style={{ width: 400, height: 400, background: "rgba(255,43,43,.1)", top: "10%", left: -120 }} />
      <div className="reveal">
        <span className="eyebrow">{p.eyebrow}</span>
        <h2>{p.headline}</h2>
        <p className="lead">{p.lead}</p>
      </div>
      <div className="prob-grid">
        <ul className="prob-list reveal-l">
          {p.pain.map((t) => (
            <li key={t}><svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>{t}</li>
          ))}
        </ul>
        <div className="prob-card reveal-r">
          <h3>{p.gainHeadline}</h3>
          <ul className="prob-list">
            {p.gain.map((t) => (
              <li key={t}><svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="closer reveal">{p.closer}</p>
    </section>
  );
}
