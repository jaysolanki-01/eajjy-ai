import React from "react";
import { STEPS } from "../data/siteData.jsx";
import useTranslation from "../hooks/useTranslation.js";

export default function Process() {
  const t = useTranslation();
  const p = t.process;
  const steps = p.steps;
  return (
    <section className="sec wrap" id="process">
      <div className="reveal">
        <span className="eyebrow">{p.eyebrow}</span>
        <h2>{p.headline}</h2>
        <p className="lead">{p.lead}</p>
      </div>
      <div className="steps stagger">
        {STEPS.map((s) => {
          const ts = steps[s.n] || {};
          return (
            <div className="step" key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{ts.title || s.t}</h3>
              <p className="w">{ts.desc || s.w}</p>
              <div className="meta"><b>{ts.meta || s.meta}</b>{ts.out || s.out}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
