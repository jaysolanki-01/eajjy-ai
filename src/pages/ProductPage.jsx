import React from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import useTranslation from "../hooks/useTranslation.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import BookButton from "../components/BookButton.jsx";
import Arrow from "../components/Arrow.jsx";

const TEASERS = [
  { title: "Unified workflow dashboard", desc: "Every automation, agent, and integration running across your firm in one live view.", icon: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /> },
  { title: "Real-time ROI tracking", desc: "See hours saved and cost recovered as your automations run, not months later.", icon: (<><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></>) },
  { title: "One-click integrations", desc: "Connect the tools your team already uses without touching a line of code.", icon: (<><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" /></>) },
];

export default function ProductPage() {
  const t = useTranslation();
  const p = t.pages.product;
  useSEO({ title: p.metaTitle, description: p.metaDesc, canonical: "https://www.eajjy.com/product" });

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.headline} lead={p.lead} />

      <section className="sec wrap">
        <div className="ps-soon reveal">
          <span className="ps-badge"><span className="ps-dot" />{p.launchingSoon}</span>
          <h2>{p.buildingBig}</h2>
          <p>{p.buildingDesc}</p>
          <div className="ctas" style={{ justifyContent: "center" }}>
            <BookButton>{p.earlyAccess}</BookButton>
            <Link to="/services" className="btn btn-ghost">{p.exploreServices}</Link>
          </div>
        </div>

        <div className="ps-teasers stagger">
          {TEASERS.map((item) => (
            <div className="ps-teaser" key={item.title}>
              <div className="ps-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="ps-soon-tag">{p.launchingSoon}</span>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA />
      <style>{PS_CSS}</style>
    </>
  );
}

const PS_CSS = `
  .ps-soon{position:relative;border:1px solid rgba(255,43,43,.3);border-radius:24px;overflow:hidden;
    text-align:center;padding:clamp(40px,6vw,72px) clamp(24px,5vw,56px);background:var(--charcoal);
    display:flex;flex-direction:column;align-items:center}
  .ps-soon::before{content:"";position:absolute;inset:0;background:radial-gradient(600px 300px at 50% 0%,rgba(255,43,43,.18),transparent 70%)}
  .ps-soon>*{position:relative;z-index:2}
  .ps-badge{display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border:1px solid rgba(255,43,43,.3);
    border-radius:100px;background:rgba(255,43,43,.07);font-size:12.5px;font-weight:600;letter-spacing:.04em;
    text-transform:uppercase;color:var(--red-hover);margin-bottom:24px}
  .ps-dot{width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);animation:pulse 2s infinite}
  .ps-soon h2{margin:0 auto 18px;text-align:center}
  .ps-soon p{color:var(--gray);font-size:16px;line-height:1.65;max-width:600px;margin:0 auto 32px}
  .ps-teasers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}
  .ps-teaser{position:relative;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(20px);
    border-radius:18px;padding:28px;transition:.4s var(--ease)}
  .ps-teaser:hover{border-color:rgba(255,43,43,.35);transform:translateY(-4px)}
  .ps-ico{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;
    background:rgba(255,43,43,.1);border:1px solid rgba(255,43,43,.25);margin-bottom:18px}
  .ps-ico svg{width:21px;height:21px;stroke:var(--red-hover)}
  .ps-teaser h3{font-family:"Space Grotesk";font-weight:600;font-size:18px;margin-bottom:10px}
  .ps-teaser p{font-size:14px;color:var(--gray);line-height:1.55;margin-bottom:16px}
  .ps-soon-tag{display:inline-block;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
    color:var(--gray);border:1px solid var(--border);border-radius:7px;padding:4px 10px}
  @media(max-width:860px){.ps-teasers{grid-template-columns:1fr}}
`;
