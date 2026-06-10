import React from "react";
import { LOGOS } from "../data/siteData.jsx";

function LogoTile({ name, src }) {
  return (
    <div className="int-logo" title={name}>
      <img src={src} alt={name} loading="lazy" />
    </div>
  );
}

export default function Integrations() {
  // split into two rows for the dual-direction marquee
  const half = Math.ceil(LOGOS.length / 2);
  const rowA = LOGOS.slice(0, half);
  const rowB = LOGOS.slice(half);

  return (
    <section className="sec wrap" style={{ textAlign: "center" }} id="integrations">
      <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Integrations</span>
        <h2 style={{ margin: "0 auto" }}>Connected to the Tools You Already Use</h2>
        <p className="lead" style={{ maxWidth: 560, margin: "14px auto 0" }}>We plug into the platforms your team already works in, so data flows automatically across your whole stack.</p>
      </div>

      <div className="int-marquee mq-rtl reveal">
        <div className="int-track">{[...rowA, ...rowA].map((l, i) => <LogoTile key={"a" + i} {...l} />)}</div>
      </div>
      <div className="int-marquee mq-ltr reveal">
        <div className="int-track">{[...rowB, ...rowB].map((l, i) => <LogoTile key={"b" + i} {...l} />)}</div>
      </div>

      <style>{INT_CSS}</style>
    </section>
  );
}

const INT_CSS = `
  .int-marquee{position:relative;overflow:hidden;margin-top:30px;
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
    mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
  .int-track{display:flex;gap:16px;width:max-content;animation:int-scroll 42s linear infinite}
  .int-marquee.mq-ltr .int-track{animation-direction:reverse}
  .int-marquee:hover .int-track{animation-play-state:paused}
  @keyframes int-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  .int-logo{flex-shrink:0;width:148px;height:84px;display:grid;place-items:center;
    border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(14px);
    transition:.4s var(--ease)}
  .int-logo:hover{border-color:rgba(255,43,43,.4);transform:translateY(-4px);box-shadow:0 18px 40px -22px rgba(255,43,43,.4)}
  .int-logo img{max-width:96px;max-height:44px;width:auto;height:auto;object-fit:contain;
    opacity:.85;transition:.4s var(--ease)}
  .int-logo:hover img{opacity:1}

  @media(max-width:560px){
    .int-logo{width:120px;height:72px}
    .int-logo img{max-width:78px;max-height:36px}
    .int-track{gap:12px}
  }
`;
