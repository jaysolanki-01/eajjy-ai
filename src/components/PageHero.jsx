import React from "react";

/* Compact hero used on inner pages. */
export default function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="wrap" style={{ paddingTop: "clamp(60px,9vh,110px)", paddingBottom: "clamp(20px,3vh,40px)" }}>
      <div className="reveal" style={{ maxWidth: 820 }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="head" style={{ fontSize: "clamp(34px,4.4vw,62px)", maxWidth: "16ch" }}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
