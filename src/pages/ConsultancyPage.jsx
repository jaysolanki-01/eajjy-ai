import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — AI Automation Consultancy service
 * ------------------------------------------------------------------ */
const WHAT_YOU_GET = [
  ["Comprehensive Operations Audit", "A deep look at how work actually flows through your business today."],
  ["Opportunity & ROI Analysis", "Every automation opportunity identified and ranked by real business impact."],
  ["Automation Roadmap", "A clear, prioritized implementation plan with timelines and milestones."],
  ["Tech Stack Recommendations", "Guidance on the right tools so you avoid costly mistakes and vendor lock-in."],
  ["Change Management Strategy", "A plan for rolling automation out so your team adopts it, not resists it."],
  ["Team Training Strategy", "Building internal capability so the value compounds long after we're done."],
];

const DELIVERABLES = [
  {
    id: "audit",
    title: "Operations Audit Report",
    summary:
      "A complete map of your current operations showing exactly where time, money, and opportunities are leaking, backed by evidence rather than guesswork.",
    points: [
      "End-to-end map of your real workflows",
      "Bottlenecks and manual hotspots clearly flagged",
      "The true cost of the status quo, quantified",
    ],
  },
  {
    id: "roadmap",
    title: "Prioritized Automation Roadmap",
    summary:
      "A sequenced plan that tells you what to automate first, why, and what return to expect, so every dollar goes to the highest-impact move.",
    points: [
      "Opportunities ranked by ROI and effort",
      "Clear phases, timelines, and success metrics",
      "Quick wins identified to build early momentum",
    ],
  },
  {
    id: "stack",
    title: "Technology & Capability Plan",
    summary:
      "Recommendations on the tools and internal skills you'll need, designed to keep you flexible and free of lock-in.",
    points: [
      "Right-sized tech stack recommendations",
      "Change management and adoption strategy",
      "Team training plan to build lasting capability",
    ],
  },
];

const BEST_FOR = [
  "Leadership teams who know they need automation but aren't sure where to start",
  "Firms unsure what's actually possible or worth doing first",
  "Businesses that want to prioritize initiatives for maximum ROI",
  "Teams who want to build internal capability while leveraging outside expertise",
];

const WHY = [
  ["Informed Decisions", "Know exactly where to invest in automation, backed by data and ROI analysis."],
  ["Avoid Costly Mistakes", "Sidestep the wrong tools and vendor lock-in before they cost you time and money."],
  ["Build Internal Capability", "Grow your team's skills so the value keeps compounding after the engagement."],
  ["Results in 90 Days", "A roadmap designed to deliver measurable results in 90 days or less."],
];

const FAQS = [
  ["What if we're not sure automation is even right for us?", "That's exactly what the audit answers. We assess your operations objectively and tell you honestly where automation will pay off and where it won't, so you make the call with real data instead of hype."],
  ["Do we have to implement everything you recommend?", "No. You own the roadmap. We prioritize by impact so you can start with the highest-ROI moves and decide your own pace. You're never locked into a fixed scope."],
  ["Will you push us toward specific tools?", "We're tool-agnostic. Our recommendations are based on what fits your business and keeps you flexible, specifically to help you avoid vendor lock-in and costly mistakes."],
  ["Can you also build what you recommend?", "Yes. Many clients move from consultancy into our build services, but there's no obligation. The roadmap is yours to execute however you choose, with us or independently."],
  ["How quickly will we see value?", "The audit and roadmap deliver clarity immediately, and the plan is designed to produce measurable results within 90 days or less of starting implementation."],
];

/* ------------------------------------------------------------------ *
 * Deliverable accordion card
 * ------------------------------------------------------------------ */
function DeliverableCard({ d, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className={"cons-d" + (open ? " open" : "")}>
      <button className="cons-d-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="cons-d-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="cons-d-title">{d.title}</h3>
        <span className="cons-d-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="cons-d-body">
        <div className="cons-d-body-inner">
          <p className="cons-d-summary">{d.summary}</p>
          <ul className="cons-d-points">
            {d.points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function ConsultancyPage() {
  useSEO({ title: "AI Automation Consultancy", description: "Strategic automation audits, ROI analysis, and roadmaps for professional services firms. Get measurable results in 90 days without costly mistakes or vendor lock-in.", canonical: "https://www.eajjy.com/services/ai-automation-consultancy" });
  return (
    <>
      <PageHero
        eyebrow="AI Automation Consultancy"
        title="Know Exactly Where to Automate and Why"
        lead="Strategic guidance to identify your highest-impact automation opportunities, design your roadmap, and ensure successful implementation aligned with your business goals."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Book a Strategy Call <Arrow /></Link>
          <a href="#deliverables" className="btn btn-ghost">See What You Get</a>
        </div>
      </section>

      {/* What you get */}
      <section className="sec wrap" id="get">
        <div className="reveal">
          <span className="eyebrow">What You Get</span>
          <h2>Strategy Before You Spend a Rupee on Building</h2>
          <p className="lead">We help leadership teams who know they need automation but aren't sure where to start, what's possible, or how to prioritize for maximum ROI.</p>
        </div>
        <div className="cons-grid stagger">
          {WHAT_YOU_GET.map(([t, d]) => (
            <div className="cons-card" key={t}>
              <div className="cons-card-t">{t}</div>
              <div className="cons-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Deliverables */}
      <section className="sec wrap" id="deliverables">
        <div className="reveal">
          <span className="eyebrow">Deliverables</span>
          <h2>What You Walk Away With</h2>
          <p className="lead">Tap any deliverable to see exactly what's inside it.</p>
        </div>
        <div className="cons-d-list stagger">
          {DELIVERABLES.map((d, i) => <DeliverableCard key={d.id} d={d} index={i} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Best for */}
      <section className="sec wrap" id="best-for">
        <div className="glow-spot" style={{ width: 460, height: 460, background: "rgba(255,43,43,.08)", top: 0, left: -150 }} />
        <div className="cons-bestfor reveal">
          <div>
            <span className="eyebrow">Best For</span>
            <h2>Is Consultancy the Right Starting Point?</h2>
            <p className="lead">If you know automation matters but don't know where to begin, this is where to start.</p>
          </div>
          <ul className="cons-bestfor-list">
            {BEST_FOR.map((b) => (
              <li key={b}>
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Why */}
      <section className="sec wrap" id="why">
        <div className="reveal">
          <span className="eyebrow">The Payoff</span>
          <h2>What Strategic Guidance Delivers</h2>
        </div>
        <div className="cons-why stagger">
          {WHY.map(([t, d]) => (
            <div className="cons-why-card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="sec wrap" id="faq">
        <div className="reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions About AI Automation Consultancy</h2>
        </div>
        <div className="faq stagger">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<span className="pm">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCTA />

      <style>{CONS_CSS}</style>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Scoped styles (use the global design tokens)
 * ------------------------------------------------------------------ */
const CONS_CSS = `
  .cons-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .cons-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .cons-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .cons-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .cons-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .cons-d-list{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .cons-d{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .cons-d.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .cons-d-head{display:flex;align-items:center;gap:18px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 26px}
  .cons-d-index{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:40px;height:40px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:11px;display:grid;place-items:center}
  .cons-d-title{flex:1;font-family:"Space Grotesk";font-weight:600;font-size:clamp(16px,1.8vw,21px);letter-spacing:-.01em}
  .cons-d-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .cons-d.open .cons-d-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .cons-d-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .cons-d.open .cons-d-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .cons-d-body-inner{overflow:hidden;padding:0 26px}
  .cons-d-summary{font-size:14px;color:var(--gray);line-height:1.6;padding-top:22px}
  .cons-d-points{list-style:none;display:flex;flex-direction:column;gap:10px;padding:16px 0 24px}
  .cons-d-points li{display:flex;gap:11px;font-size:13.5px;color:#e4e4e7;line-height:1.5}
  .cons-d-points li svg{flex-shrink:0;width:17px;height:17px;margin-top:2px}

  .cons-bestfor{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,64px);align-items:start;margin-top:6px}
  .cons-bestfor-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:8px}
  .cons-bestfor-list li{display:flex;gap:13px;font-size:15px;color:#e4e4e7;line-height:1.5;
    border:1px solid var(--border);border-radius:12px;background:var(--glass);backdrop-filter:blur(18px);padding:16px 18px;transition:.4s var(--ease)}
  .cons-bestfor-list li:hover{border-color:rgba(255,43,43,.3)}
  .cons-bestfor-list li svg{flex-shrink:0;width:19px;height:19px;margin-top:2px}

  .cons-why{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:42px}
  .cons-why-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px;transition:.4s var(--ease)}
  .cons-why-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-3px)}
  .cons-why-card h3{font-family:"Space Grotesk";font-weight:600;font-size:16px;margin-bottom:8px}
  .cons-why-card p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .cons-grid{grid-template-columns:1fr 1fr}
    .cons-bestfor,.cons-why{grid-template-columns:1fr}
    .cons-bestfor{gap:28px}
  }
  @media(max-width:560px){
    .cons-grid{grid-template-columns:1fr}
    .cons-d-head{gap:14px;padding:20px 18px}
    .cons-d-body-inner{padding:0 18px}
  }
`;
