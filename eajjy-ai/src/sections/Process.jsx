import React from "react";
import { STEPS } from "../data/siteData.jsx";

export default function Process() {
  return (
    <section className="sec wrap" id="process">
      <div className="reveal">
        <span className="eyebrow">Our Process</span>
        <h2>How Do We Get You From Chaos to Automated in 90 Days?</h2>
        <p className="lead">We don't believe in one-size-fits-all solutions. Our proven methodology ensures every automation system we build directly addresses your specific revenue and operational challenges.</p>
      </div>
      <div className="steps stagger">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="num">{s.n}</div><h3>{s.t}</h3><p className="w">{s.w}</p>
            <div className="meta"><b>{s.meta}</b>{s.out}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
