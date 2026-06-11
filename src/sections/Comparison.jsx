import React from "react";
import { CMP } from "../data/siteData.jsx";

export default function Comparison() {
  return (
    <section className="sec wrap" id="cmp">
      <div className="reveal">
        <span className="eyebrow">Before / After</span>
        <h2>What Changes When You Actually Automate Your Operations?</h2>
      </div>
      <div className="cmp stagger">
        <div className="cmp-col without">
          <div className="cmp-head">Without AI &amp; Automation</div>
          {CMP.map(([k, v]) => (<div className="cmp-row" key={k}><div className="k">{k}</div><div className="v">{v}</div></div>))}
        </div>
        <div className="cmp-col with">
          <div className="cmp-head">With EAJJY AI Automation</div>
          {CMP.map(([k, , v]) => (<div className="cmp-row" key={k}><div className="k">{k}</div><div className="v">{v}</div></div>))}
        </div>
      </div>
    </section>
  );
}
