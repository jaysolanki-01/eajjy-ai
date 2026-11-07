import React from "react";
import { LOGOS } from "../data/siteData.jsx";
import useTranslation from "../hooks/useTranslation.js";

// Logos that were processed as WHITE silhouettes (for the old dark tiles).
// On white tiles we invert them back to dark so they're visible.
const INVERT = new Set(["OpenAI", "Notion", "Klaviyo", "GitHub", "Parrot", "Abstract"]);

function LogoTile({ name, src }) {
  return (
    <div className="int-logo" title={name}>
      <img src={src} alt={name} loading="lazy" className={INVERT.has(name) ? "inv" : ""} />
    </div>
  );
}

export default function Integrations() {
  const t = useTranslation();
  const i = t.integrations;
  const half = Math.ceil(LOGOS.length / 2);
  const rowA = LOGOS.slice(0, half);
  const rowB = LOGOS.slice(half);

  return (
    <section className="sec wrap" style={{ textAlign: "center" }} id="integrations">
      <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>{i.eyebrow}</span>
        <h2 style={{ margin: "0 auto" }}>{i.headline}</h2>
        <p className="lead" style={{ maxWidth: 560, margin: "14px auto 0" }}>{i.lead}</p>
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

  .int-logo{flex-shrink:0;width:148px;height:84px;display:grid;place-items:center;padding:14px;
    border:1px solid rgba(255,255,255,.12);border-radius:18px;
    background:radial-gradient(120% 120% at 50% 0%,#ffffff 0%,#f4f4f5 60%,#e7e7ea 100%);
    box-shadow:0 10px 30px -16px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.9);
    transition:.4s var(--ease)}
  .int-logo:hover{transform:translateY(-4px);
    box-shadow:0 22px 46px -20px rgba(255,43,43,.5),inset 0 1px 0 rgba(255,255,255,.9);
    border-color:rgba(255,43,43,.4)}
  .int-logo img{max-width:104px;max-height:46px;width:auto;height:auto;object-fit:contain;display:block}
  /* white-silhouette logos -> render dark on the white tile */
  .int-logo img.inv{filter:invert(1) brightness(.18)}

  @media(max-width:560px){
    .int-logo{width:120px;height:72px;padding:12px}
    .int-logo img{max-width:84px;max-height:38px}
    .int-track{gap:12px}
  }
`;
