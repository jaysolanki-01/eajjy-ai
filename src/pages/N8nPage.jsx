import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — N8n Automation service
 * ------------------------------------------------------------------ */
const WHAT_WE_BUILD = [
  ["Custom Workflow Design", "Workflows designed and implemented around how your business actually runs."],
  ["Multi-Platform Integration", "Slack, HubSpot, Notion, Google Workspace, and anything else with an API."],
  ["Automated Data Sync", "Information moves between your systems automatically, with no manual copying."],
  ["Rule-Based Triggers", "Actions fire automatically based on the business rules you define."],
  ["Error Handling", "Built-in monitoring and notifications so nothing fails silently."],
  ["Notification Systems", "The right people get alerted at the right moment, automatically."],
];

const WORKFLOWS = [
  {
    id: "crm-sync",
    title: "CRM ↔ Tools Sync",
    summary:
      "Keep your CRM and every connected tool in perfect agreement, automatically. A change in one place updates everywhere it matters.",
    points: [
      "New leads flow into your CRM the moment they arrive",
      "Deal stage changes propagate to project and finance tools",
      "No more stale records or double data entry",
    ],
    connects: "Website / Ads → HubSpot → Project tool → Slack",
  },
  {
    id: "ops",
    title: "Cross-Tool Operations",
    summary:
      "Connect the tools your team works in every day so work moves itself between them instead of being shuttled by hand.",
    points: [
      "Tasks and updates sync across project and comms tools",
      "Triggered actions kick off the next step automatically",
      "Status stays current everywhere without check-ins",
    ],
    connects: "Airtable → Slack → Notion → Email",
  },
  {
    id: "finance",
    title: "Finance & Reporting Flows",
    summary:
      "Move financial and reporting data between systems automatically, with error handling that catches problems before they spread.",
    points: [
      "Invoices, payments, and records reconcile automatically",
      "Reports compile from live data across platforms",
      "Exceptions are flagged and routed for review",
    ],
    connects: "Project tool → Accounting → Google Sheets → Slack",
  },
];

const STEPS = [
  { n: "01", t: "Map the Workflow", time: "Discovery", out: "We map the tools you use and exactly how data should move between them." },
  { n: "02", t: "Design & Build", time: "Implementation", out: "We design the n8n workflow, build the integrations, and configure your business rules." },
  { n: "03", t: "Add Safeguards", time: "Hardening", out: "We add error handling and notifications so failures surface instantly, not silently." },
  { n: "04", t: "Deploy & Monitor", time: "Live", out: "We deploy, monitor, and keep your automations running reliably as you scale." },
];

const BEST_FOR = [
  "Firms with complex, multi-tool workflows that need seamless integration",
  "Teams whose data lives across CRM, project, communication, and financial systems",
  "Businesses tired of manually copying information between platforms",
  "Operations that need reliable, intelligent automation without heavy coding",
];

const FAQS = [
  ["Why n8n instead of Zapier or Make?", "n8n is enterprise-grade and far more flexible for complex, multi-step workflows. It handles sophisticated logic, custom integrations, and error handling that lighter tools struggle with, and it scales as your needs grow."],
  ["What can you connect?", "Anything with an API. Common ones include Slack, HubSpot, Notion, and Google Workspace, plus your accounting, project, and communication systems. If it exposes an API, we can wire it in."],
  ["What happens if a workflow fails?", "We build error handling and notification systems into every workflow, so failures are caught and the right people are alerted immediately, rather than data quietly going missing."],
  ["Will my team need to learn n8n?", "No. We design, build, and maintain the workflows. Your team simply keeps working in the tools they already know while data flows automatically behind the scenes."],
  ["How much does it cost?", "It depends on the number and complexity of workflows. We scope it during discovery and give you a clear quote, with most clients recovering the cost quickly through the time saved."],
];

/* ------------------------------------------------------------------ *
 * Workflow accordion card
 * ------------------------------------------------------------------ */
function WorkflowCard({ wf, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className={"n8n-wf" + (open ? " open" : "")}>
      <button className="n8n-wf-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="n8n-wf-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="n8n-wf-title">{wf.title}</h3>
        <span className="n8n-wf-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="n8n-wf-body">
        <div className="n8n-wf-body-inner">
          <p className="n8n-wf-summary">{wf.summary}</p>
          <ul className="n8n-wf-points">
            {wf.points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="n8n-wf-connects"><b>Connects:</b> {wf.connects}</div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function N8nPage() {
  useSEO({ title: "N8n Automation Services", description: "Enterprise-grade workflow automation built on n8n. Connect your existing tools, move data automatically, and eliminate repetitive tasks without code.", canonical: "https://www.eajjy.com/services/n8n-automation" });
  return (
    <>
      <PageHero
        eyebrow="N8n Automation"
        title="Connect Every Tool. Move Every Piece of Data Automatically."
        lead="Enterprise-grade workflow automation with n8n. We connect your tools, move data between them automatically, and eliminate repetitive tasks without your team writing a line of code."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Automate Your Workflows <Arrow /></Link>
          <a href="#workflows" className="btn btn-ghost">See Example Workflows</a>
        </div>
      </section>

      {/* What we build */}
      <section className="sec wrap" id="build">
        <div className="reveal">
          <span className="eyebrow">What We Build</span>
          <h2>Workflow Automation That Just Runs</h2>
          <p className="lead">We design and implement custom n8n workflows that connect your stack, sync your data, and handle the repetitive work your team shouldn't be touching.</p>
        </div>
        <div className="n8n-grid stagger">
          {WHAT_WE_BUILD.map(([t, d]) => (
            <div className="n8n-card" key={t}>
              <div className="n8n-card-t">{t}</div>
              <div className="n8n-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Workflows */}
      <section className="sec wrap" id="workflows">
        <div className="reveal">
          <span className="eyebrow">Example Workflows</span>
          <h2>Automations We Build with n8n</h2>
          <p className="lead">Tap any to see how the workflow runs and which tools it connects.</p>
        </div>
        <div className="n8n-wf-list stagger">
          {WORKFLOWS.map((wf, i) => <WorkflowCard key={wf.id} wf={wf} index={i} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Best for */}
      <section className="sec wrap" id="best-for">
        <div className="glow-spot" style={{ width: 460, height: 460, background: "rgba(255,43,43,.08)", top: 0, left: -150 }} />
        <div className="n8n-bestfor reveal">
          <div>
            <span className="eyebrow">Best For</span>
            <h2>Is N8n Automation Right for You?</h2>
            <p className="lead">Built for firms with real workflow complexity that lighter automation tools can't handle.</p>
          </div>
          <ul className="n8n-bestfor-list">
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
          <h2>From Disconnected Tools to One Flowing System</h2>
          <p className="lead">A clear path from mapping your workflow to a reliable, monitored automation running in production.</p>
        </div>
        <div className="n8n-phases stagger">
          {STEPS.map((p) => (
            <div className="n8n-phase" key={p.n}>
              <div className="n8n-phase-n">{p.n}</div>
              <div className="n8n-phase-body">
                <h3>{p.t}</h3>
                <div className="n8n-phase-time">{p.time}</div>
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
          <h2>Questions About N8n Automation</h2>
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

      <style>{N8N_CSS}</style>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Scoped styles (use the global design tokens)
 * ------------------------------------------------------------------ */
const N8N_CSS = `
  .n8n-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .n8n-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .n8n-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .n8n-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .n8n-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .n8n-wf-list{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .n8n-wf{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .n8n-wf.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .n8n-wf-head{display:flex;align-items:center;gap:18px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 26px}
  .n8n-wf-index{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:40px;height:40px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:11px;display:grid;place-items:center}
  .n8n-wf-title{flex:1;font-family:"Space Grotesk";font-weight:600;font-size:clamp(16px,1.8vw,21px);letter-spacing:-.01em}
  .n8n-wf-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .n8n-wf.open .n8n-wf-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .n8n-wf-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .n8n-wf.open .n8n-wf-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .n8n-wf-body-inner{overflow:hidden;padding:0 26px}
  .n8n-wf-summary{font-size:14px;color:var(--gray);line-height:1.6;padding-top:22px}
  .n8n-wf-points{list-style:none;display:flex;flex-direction:column;gap:10px;padding:16px 0 0}
  .n8n-wf-points li{display:flex;gap:11px;font-size:13.5px;color:#e4e4e7;line-height:1.5}
  .n8n-wf-points li svg{flex-shrink:0;width:17px;height:17px;margin-top:2px}
  .n8n-wf-connects{font-size:13px;color:var(--gray);padding:16px 0 24px;line-height:1.55}
  .n8n-wf-connects b{color:var(--red-hover);font-weight:600}

  .n8n-bestfor{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,64px);align-items:start;margin-top:6px}
  .n8n-bestfor-list{list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:8px}
  .n8n-bestfor-list li{display:flex;gap:13px;font-size:15px;color:#e4e4e7;line-height:1.5;
    border:1px solid var(--border);border-radius:12px;background:var(--glass);backdrop-filter:blur(18px);padding:16px 18px;transition:.4s var(--ease)}
  .n8n-bestfor-list li:hover{border-color:rgba(255,43,43,.3)}
  .n8n-bestfor-list li svg{flex-shrink:0;width:19px;height:19px;margin-top:2px}

  .n8n-phases{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .n8n-phase{display:flex;gap:20px;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px 26px;transition:.4s var(--ease)}
  .n8n-phase:hover{border-color:rgba(255,43,43,.3)}
  .n8n-phase-n{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:44px;height:44px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center}
  .n8n-phase-body h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:4px}
  .n8n-phase-time{font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--red-hover);margin-bottom:8px}
  .n8n-phase-body p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .n8n-grid{grid-template-columns:1fr 1fr}
    .n8n-bestfor{grid-template-columns:1fr;gap:28px}
  }
  @media(max-width:560px){
    .n8n-grid{grid-template-columns:1fr}
    .n8n-wf-head{gap:14px;padding:20px 18px}
    .n8n-wf-body-inner{padding:0 18px}
  }
`;
