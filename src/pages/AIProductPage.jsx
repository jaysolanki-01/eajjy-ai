import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — AI Product Development service
 * ------------------------------------------------------------------ */
const WHAT_WE_BUILD = [
  ["Custom AI Models", "Models trained on your own data to fit how your business actually works."],
  ["Intelligent Chatbots", "Client-facing assistants and self-service portals that answer instantly, around the clock."],
  ["Predictive Analytics", "Forecasting systems that surface trends and risks before they hit your bottom line."],
  ["Document Intelligence", "NLP that reads, extracts, and analyzes contracts, forms, and reports automatically."],
  ["Decision Support Tools", "AI that scores, ranks, and recommends so your team decides faster and better."],
  ["Recommendation Engines", "Personalized suggestions that lift engagement, retention, and revenue."],
];

const USE_CASES = [
  {
    id: "chatbot",
    title: "Client-Facing AI Assistant",
    summary:
      "A branded assistant trained on your services, docs, and policies that handles routine client questions instantly and escalates only what needs a human.",
    points: [
      "Answers FAQs, status requests, and onboarding questions 24/7",
      "Trained on your knowledge base, not generic web data",
      "Hands off to your team with full context when needed",
    ],
    impact: "Deflect 60–70% of routine inbound and free your team for high-value work.",
  },
  {
    id: "predictive",
    title: "Predictive Analytics Engine",
    summary:
      "A forecasting system that turns your historical data into forward-looking signals — churn risk, revenue projections, capacity planning, and more.",
    points: [
      "Forecasts demand, churn, and revenue from your own data",
      "Flags at-risk accounts before they leave",
      "Feeds dashboards your leadership already uses",
    ],
    impact: "Make resourcing and retention decisions on data, not gut feel.",
  },
  {
    id: "docai",
    title: "Document Analysis & NLP",
    summary:
      "Natural-language processing that reads contracts, proposals, and reports — extracting key terms, summarizing, and routing them to the right place.",
    points: [
      "Extracts dates, values, clauses, and obligations automatically",
      "Summarizes long documents into actionable briefs",
      "Routes and tags content across your systems",
    ],
    impact: "Cut document review time from hours to minutes with consistent accuracy.",
  },
  {
    id: "decision",
    title: "AI Decision Support",
    summary:
      "Scoring and recommendation tools that rank leads, prioritize work, and suggest next-best actions — so your team moves faster with more confidence.",
    points: [
      "Scores and prioritizes leads, tickets, or opportunities",
      "Recommends next-best actions in context",
      "Learns and improves from outcomes over time",
    ],
    impact: "Faster, more consistent decisions across the whole team.",
  },
];

const PROCESS = [
  { n: "01", t: "Discovery & Feasibility", time: "1–2 weeks", out: "We pinpoint the highest-value AI opportunity, validate the data you have, and define clear success metrics." },
  { n: "02", t: "Data & Model Design", time: "1–2 weeks", out: "We design the model approach, prepare and structure your data, and map exactly how it plugs into your stack." },
  { n: "03", t: "Build & Train", time: "3–6 weeks", out: "We build, train, and evaluate the model against your metrics, iterating until it performs in the real world." },
  { n: "04", t: "Integrate & Deploy", time: "1–2 weeks", out: "We ship it into your product or workflow with monitoring, documentation, and team training." },
  { n: "05", t: "Monitor & Improve", time: "Ongoing", out: "We track performance, retrain on fresh data, and expand capabilities as your needs grow." },
];

const BEST_FOR = [
  "Firms ready to differentiate with proprietary AI capabilities competitors can't match",
  "Teams that want to launch new, revenue-generating AI products",
  "Businesses sitting on data they aren't yet turning into insight",
  "Leaders who want premium, AI-enhanced service offerings",
];

const FAQS = [
  ["Do we need a huge amount of data to start?", "Not always. We assess what you have during discovery — and we can use pre-trained models, augmentation, and proven frameworks to deliver strong results even without massive datasets."],
  ["How is this different from just using ChatGPT?", "Off-the-shelf tools are generic. We build solutions trained on your data, integrated into your systems, and tuned to your business logic — capabilities a general chatbot can't provide."],
  ["Who owns the AI model and the data?", "You do. We build it for your business, and your data stays within your authorized systems with enterprise-grade security throughout."],
  ["How long until we see something working?", "Most projects produce a working prototype within the first few weeks, with a production-ready system following shortly after, depending on scope."],
  ["What does it cost?", "It depends on complexity and scope. We give you a clear quote after discovery, along with a projected ROI based on your specific opportunity — so you know what to expect before committing."],
];

/* ------------------------------------------------------------------ *
 * Use-case accordion card
 * ------------------------------------------------------------------ */
function UseCaseCard({ uc, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className={"aipd-uc" + (open ? " open" : "")}>
      <button className="aipd-uc-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="aipd-uc-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="aipd-uc-title">{uc.title}</h3>
        <span className="aipd-uc-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="aipd-uc-body">
        <div className="aipd-uc-body-inner">
          <p className="aipd-uc-summary">{uc.summary}</p>
          <ul className="aipd-uc-points">
            {uc.points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="aipd-uc-impact"><b>Impact:</b> {uc.impact}</div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function AIProductPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Product Development"
        title="Custom AI, Built for Your Business Model"
        lead="From intelligent chatbots and recommendation engines to predictive analytics, we build proprietary AI capabilities that differentiate your services and create new revenue streams."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Get Your Free AI Audit <Arrow /></Link>
          <a href="#use-cases" className="btn btn-ghost">See What We Build</a>
        </div>
      </section>

      {/* What we build */}
      <section className="sec wrap" id="build">
        <div className="reveal">
          <span className="eyebrow">What We Build</span>
          <h2>Proprietary AI, Tailored to How You Work</h2>
          <p className="lead">We don't bolt on a generic chatbot and call it a day. We build custom AI solutions trained on your data and wired into your existing systems.</p>
        </div>
        <div className="aipd-grid stagger">
          {WHAT_WE_BUILD.map(([t, d]) => (
            <div className="aipd-card" key={t}>
              <div className="aipd-card-t">{t}</div>
              <div className="aipd-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Use cases */}
      <section className="sec wrap" id="use-cases">
        <div className="reveal">
          <span className="eyebrow">Use Cases</span>
          <h2>AI Products We Build Every Day</h2>
          <p className="lead">Tap any to see how it works and the impact it delivers for professional services firms.</p>
        </div>
        <div className="aipd-uc-list stagger">
          {USE_CASES.map((uc, i) => <UseCaseCard key={uc.id} uc={uc} index={i} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Best for */}
      <section className="sec wrap" id="best-for">
        <div className="glow-spot" style={{ width: 460, height: 460, background: "rgba(255,43,43,.08)", top: 0, left: -150 }} />
        <div className="aipd-bestfor reveal">
          <div>
            <span className="eyebrow">Best For</span>
            <h2>Is AI Product Development Right for You?</h2>
            <p className="lead">This service is built for forward-thinking firms ready to turn AI into a genuine competitive advantage.</p>
          </div>
          <ul className="aipd-bestfor-list">
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

      {/* Process */}
      <section className="sec wrap" id="process">
        <div className="reveal">
          <span className="eyebrow">How We Build It</span>
          <h2>From Idea to Deployed AI Product</h2>
          <p className="lead">A disciplined process that de-risks AI development and gets you to a working, integrated product fast.</p>
        </div>
        <div className="aipd-phases stagger">
          {PROCESS.map((p) => (
            <div className="aipd-phase" key={p.n}>
              <div className="aipd-phase-n">{p.n}</div>
              <div className="aipd-phase-body">
                <h3>{p.t}</h3>
                <div className="aipd-phase-time">{p.time}</div>
                <p>{p.out}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="sec wrap" id="faq">
        <div className="reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions About AI Product Development</h2>
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

      <style>{AIPD_CSS}</style>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Scoped styles (use the global design tokens)
 * ------------------------------------------------------------------ */
const AIPD_CSS = `
  .aipd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .aipd-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .aipd-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .aipd-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .aipd-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .aipd-uc-list{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .aipd-uc{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .aipd-uc.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .aipd-uc-head{display:flex;align-items:center;gap:18px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 26px}
  .aipd-uc-index{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:40px;height:40px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:11px;display:grid;place-items:center}
  .aipd-uc-title{flex:1;font-family:"Space Grotesk";font-weight:600;font-size:clamp(16px,1.8vw,21px);letter-spacing:-.01em}
  .aipd-uc-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .aipd-uc.open .aipd-uc-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .aipd-uc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .aipd-uc.open .aipd-uc-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .aipd-uc-body-inner{overflow:hidden;padding:0 26px}
  .aipd-uc-summary{font-size:14px;color:var(--gray);line-height:1.6;padding-top:22px}
  .aipd-uc-points{list-style:none;display:flex;flex-direction:column;gap:10px;padding:16px 0 0}
  .aipd-uc-points li{display:flex;gap:11px;font-size:13.5px;color:#e4e4e7;line-height:1.5}
  .aipd-uc-points li svg{flex-shrink:0;width:17px;height:17px;margin-top:2px}
  .aipd-uc-impact{font-size:13px;color:var(--gray);padding:16px 0 24px;line-height:1.55}
  .aipd-uc-impact b{color:var(--red-hover);font-weight:600}

  .aipd-bestfor{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,64px);align-items:start;margin-top:6px}
  .aipd-bestfor-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:8px}
  .aipd-bestfor-list li{display:flex;gap:13px;font-size:15px;color:#e4e4e7;line-height:1.5;
    border:1px solid var(--border);border-radius:12px;background:var(--glass);backdrop-filter:blur(18px);padding:16px 18px;transition:.4s var(--ease)}
  .aipd-bestfor-list li:hover{border-color:rgba(255,43,43,.3)}
  .aipd-bestfor-list li svg{flex-shrink:0;width:19px;height:19px;margin-top:2px}

  .aipd-phases{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .aipd-phase{display:flex;gap:20px;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px 26px;transition:.4s var(--ease)}
  .aipd-phase:hover{border-color:rgba(255,43,43,.3)}
  .aipd-phase-n{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:44px;height:44px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center}
  .aipd-phase-body h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:4px}
  .aipd-phase-time{font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--red-hover);margin-bottom:8px}
  .aipd-phase-body p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .aipd-grid{grid-template-columns:1fr 1fr}
    .aipd-bestfor{grid-template-columns:1fr;gap:28px}
  }
  @media(max-width:560px){
    .aipd-grid{grid-template-columns:1fr}
    .aipd-uc-head{gap:14px;padding:20px 18px}
    .aipd-uc-body-inner{padding:0 18px}
  }
`;
