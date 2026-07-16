import React, { useState } from "react";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import Comparison from "../sections/Comparison.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";

/* ------------------------------------------------------------------ *
 * Industry-specific use cases
 * ------------------------------------------------------------------ */
const INDUSTRIES = [
  {
    id: "agencies",
    name: "Marketing & Creative Agencies",
    icon: (<><path d="M4 5h16v14H4z" /><path d="M4 9h16M8 5v4" /></>),
    line: "Win back billable hours lost to admin and reporting.",
    cases: [
      ["Automated client reporting", "Pull live data from ad platforms and analytics into branded reports, generated and sent on schedule."],
      ["Content production pipelines", "Turn briefs into drafts, route for approval, and publish across channels automatically."],
      ["Client onboarding", "Spin up project spaces, folders, and access the moment a contract is signed."],
      ["Lead capture & qualification", "Score and route inbound leads instantly so no opportunity goes cold."],
    ],
  },
  {
    id: "consulting",
    name: "Consulting & Professional Services",
    icon: (<><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></>),
    line: "Scale expertise without scaling headcount.",
    cases: [
      ["Proposal & SOW generation", "Assemble tailored proposals from a knowledge base in minutes, not hours."],
      ["Research & data enrichment", "Automatically gather and structure company and contact intelligence for engagements."],
      ["Engagement reporting", "Real-time dashboards keep clients informed without manual status updates."],
      ["Knowledge copilots", "Let consultants query past projects and frameworks instantly with grounded AI."],
    ],
  },
  {
    id: "legal",
    name: "Legal & Compliance",
    icon: (<><path d="M12 3v18M5 7h14M7 7l-3 7h6zM17 7l3 7h-6z" /></>),
    line: "Cut document review from hours to minutes, safely.",
    cases: [
      ["Contract analysis", "Extract clauses, dates, and obligations from contracts automatically with citations."],
      ["Document Q&A", "Ask plain-language questions across large document sets and get sourced answers."],
      ["Deadline & renewal tracking", "Auto-capture key dates and trigger reminders well before they lapse."],
      ["Intake automation", "Structure new-matter intake and route to the right team without manual entry."],
    ],
  },
  {
    id: "finance",
    name: "Accounting & Finance",
    icon: (<><path d="M3 6h18v12H3z" /><path d="M3 10h18M7 14h4" /></>),
    line: "Near-zero errors on the work that has to be exact.",
    cases: [
      ["Invoice & payment processing", "Generate, send, and reconcile invoices automatically across your tools."],
      ["Data sync across systems", "Keep accounting, CRM, and project tools in agreement with no manual copying."],
      ["Automated reporting", "Compile financial summaries from live data on a set schedule."],
      ["Document extraction", "Read receipts, invoices, and forms and route the data where it belongs."],
    ],
  },
  {
    id: "realestate",
    name: "Real Estate & Property",
    icon: (<><path d="M3 11l9-7 9 7" /><path d="M5 10v9h14v-9" /></>),
    line: "Respond to every lead instantly, day or night.",
    cases: [
      ["Instant lead response", "AI engages and qualifies inbound leads the moment they arrive."],
      ["Listing & document workflows", "Automate paperwork, disclosures, and status updates end to end."],
      ["Appointment scheduling", "Coordinate viewings and calls automatically across calendars."],
      ["Follow-up sequences", "Keep prospects warm with timely, personalized automated follow-ups."],
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    icon: (<><path d="M12 5v14M5 12h14" /><circle cx="12" cy="12" r="9" /></>),
    line: "Free clinical time from administrative load.",
    cases: [
      ["Patient intake automation", "Collect and structure intake information before the first appointment."],
      ["Appointment & reminder flows", "Automate scheduling, confirmations, and reminders to cut no-shows."],
      ["Records & document handling", "Extract and route information from forms securely and consistently."],
      ["Support assistants", "Answer common patient questions from your own approved materials."],
    ],
  },
];

function IndustryCard({ ind, open, onToggle }) {
  return (
    <article className={"ind-card" + (open ? " open" : "")}>
      <button className="ind-head" onClick={onToggle} aria-expanded={open}>
        <span className="ind-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ind.icon}</svg>
        </span>
        <span className="ind-head-text">
          <h3 className="ind-name">{ind.name}</h3>
          <span className="ind-line">{ind.line}</span>
        </span>
        <span className="ind-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="ind-body">
        <div className="ind-body-inner">
          <ul className="ind-cases">
            {ind.cases.map(([t, d]) => (
              <li key={t}>
                <span className="ind-case-t">{t}</span>
                <span className="ind-case-d">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function UseCasesPage() {
  useSEO({ title: "Automation Use Cases by Industry", description: "Before-and-after automation examples for consulting, legal, accounting, real estate, marketing agencies, and healthcare practices.", canonical: "https://www.eajjy.com/use-cases" });
  const [openId, setOpenId] = useState(null);
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="What Changes When Operations Run Themselves"
        lead="A side-by-side look at the everyday tasks we automate for professional services firms."
      />

      <Comparison />

      <div className="divider" />

      {/* Industry-specific use cases */}
      <section className="sec wrap" id="industries">
        <div className="glow-spot" style={{ width: 480, height: 480, background: "rgba(255,43,43,.08)", top: 0, right: -160 }} />
        <div className="reveal">
          <span className="eyebrow">By Industry</span>
          <h2>Automation, Tailored to Your Field</h2>
          <p className="lead">Every industry has its own bottlenecks. Here's where automation and AI make the biggest difference across the sectors we work with. Tap any to expand.</p>
        </div>
        <div className="ind-grid stagger">
          {INDUSTRIES.map((ind) => (
            <IndustryCard
              key={ind.id}
              ind={ind}
              open={openId === ind.id}
              onToggle={() => setOpenId((cur) => (cur === ind.id ? null : ind.id))}
            />
          ))}
        </div>
      </section>

      <ClosingCTA />

      <style>{INDUSTRY_CSS}</style>
    </>
  );
}

const INDUSTRY_CSS = `
  .ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:42px;align-items:start}
  .ind-card{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .ind-card.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .ind-head{display:flex;align-items:center;gap:16px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 24px}
  .ind-icon{flex-shrink:0;width:46px;height:46px;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center;color:var(--red-hover)}
  .ind-icon svg{width:22px;height:22px}
  .ind-head-text{flex:1;display:flex;flex-direction:column;gap:3px}
  .ind-name{font-family:"Space Grotesk";font-weight:600;font-size:clamp(15px,1.6vw,18px);letter-spacing:-.01em}
  .ind-line{font-size:13px;color:var(--gray);line-height:1.4}
  .ind-toggle{flex-shrink:0;width:34px;height:34px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .ind-card.open .ind-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .ind-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .ind-card.open .ind-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .ind-body-inner{overflow:hidden}
  .ind-cases{list-style:none;display:flex;flex-direction:column;gap:14px;padding:22px 24px}
  .ind-cases li{display:flex;flex-direction:column;gap:3px;padding-left:16px;position:relative}
  .ind-cases li::before{content:"";position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:var(--red)}
  .ind-case-t{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:#e4e4e7}
  .ind-case-d{font-size:13px;color:var(--gray);line-height:1.5}

  @media(max-width:760px){
    .ind-grid{grid-template-columns:1fr}
  }
`;
