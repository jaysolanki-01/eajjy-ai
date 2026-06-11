import React from "react";
import { SERVICES } from "../data/siteData.jsx";

export default function Services() {
  return (
    <section className="sec wrap" id="services">
      <div className="glow-spot" style={{ width: 500, height: 500, background: "rgba(255,43,43,.08)", top: 0, right: -150 }} />
      <div className="reveal">
        <span className="eyebrow">Services</span>
        <h2>How We Help You Automate and Scale</h2>
        <p className="lead">Whether you need end-to-end process redesign or targeted automation for specific pain points, EAJJY AI delivers solutions that integrate seamlessly with your existing operations.</p>
      </div>
      <div className="svc-grid stagger">
        {SERVICES.map((s) => (
          <div className="svc" key={s.title}>
            <div className="svc-glow" />
            <div className="ico"><svg viewBox="0 0 24 24">{s.icon}</svg></div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="chips">{s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            <div className="impact"><b>Impact:</b> {s.impact}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
