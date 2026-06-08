import React from "react";
import { TOOLS } from "../data/siteData.jsx";

function Pill({ name, bc, letter }) {
  return (
    <div className="int-pill" style={{ "--bc": bc }}>
      <div className="mark" style={bc === "#000000" ? { border: "1px solid #333" } : undefined}><span>{letter}</span></div>
      <p>{name}</p>
    </div>
  );
}

export default function Integrations() {
  const reversed = [...TOOLS].reverse();
  return (
    <section className="sec wrap" style={{ textAlign: "center" }} id="integrations">
      <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Integrations</span>
        <h2 style={{ margin: "0 auto" }}>Connected to the Tools You Already Use</h2>
      </div>
      <div className="marquee mq-rtl reveal">
        <div className="mq-track">{[...TOOLS, ...TOOLS].map(([n, c, l], i) => <Pill key={"t" + i} name={n} bc={c} letter={l} />)}</div>
      </div>
      <div className="marquee mq-ltr reveal">
        <div className="mq-track">{[...reversed, ...reversed].map(([n, c, l], i) => <Pill key={"b" + i} name={n} bc={c} letter={l} />)}</div>
      </div>
    </section>
  );
}
