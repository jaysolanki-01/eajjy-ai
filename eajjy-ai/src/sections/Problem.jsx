import React from "react";

const PAIN = [
  "Manual data entry and report generation",
  "Repetitive client communications",
  "Administrative tasks that don't require human intelligence",
  "Context-switching between multiple tools and platforms",
];
const GAIN = [
  "Take on more high-value clients",
  "Launch new service offerings",
  "Scale without proportionally increasing headcount",
  "Compete with larger firms who've already automated",
];

export default function Problem() {
  return (
    <section className="sec wrap" id="problem">
      <div className="glow-spot" style={{ width: 400, height: 400, background: "rgba(255,43,43,.1)", top: "10%", left: -120 }} />
      <div className="reveal">
        <span className="eyebrow">The Problem</span>
        <h2>Where Are Your Billable Hours Actually Going?</h2>
        <p className="lead">Your agency is growing. Client demands are increasing. But your team is maxed out. Every day, your highest-paid professionals spend hours on work that doesn't require human intelligence.</p>
      </div>
      <div className="prob-grid">
        <ul className="prob-list reveal-l">
          {PAIN.map((t) => (
            <li key={t}><svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>{t}</li>
          ))}
        </ul>
        <div className="prob-card reveal-r">
          <h3>The real problem? <b>While your team is buried in busywork, you're missing opportunities to:</b></h3>
          <ul className="prob-list">
            {GAIN.map((t) => (
              <li key={t}><svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="closer reveal">This isn't just an efficiency problem. It's a <b>revenue problem</b>. And it's costing you more than you think.</p>
    </section>
  );
}
