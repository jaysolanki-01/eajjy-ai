import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content (from the EAJJY AI BPA service brief)
 * ------------------------------------------------------------------ */
const WHAT_GETS_AUTOMATED = [
  ["Data Entry & Transfer", "Moving information from one system to another."],
  ["Email Management", "Sorting, reading, and responding to routine emails."],
  ["Approval Processes", "Waiting for sign-offs before work can move forward."],
  ["Report Generation", "Pulling data from multiple places into client reports."],
  ["Follow-Up Tasks", "Reminding people about deadlines and next steps."],
  ["Document Processing", "Handling invoices, contracts, forms, and applications."],
  ["Status Updates", "Manually updating teams and clients on progress."],
];

const WORKFLOWS = [
  {
    id: "onboarding",
    title: "Client Onboarding Automation",
    manualTime: "4–6 hours per client",
    autoTime: "20 minutes (review only)",
    manual:
      "Client signs contract. Your team manually creates project folders, sets up the project tool, sends a welcome email, adds them to the CRM, shares credentials, gathers info through email and forms, enters everything, schedules the kickoff, and trades calendar invites.",
    auto:
      "The moment the contract is signed, the workflow creates the project, generates Drive folders with access, adds the client to HubSpot, sends a welcome email with credentials, collects info via an automated form, syncs data instantly, and schedules the kickoff. Client is confirmed within minutes.",
    connects: "HubSpot CRM → Google Workspace → Airtable → Project tool → Notion",
    impact: "Save 3.5 hours per client and take on 8–10 more clients per month — 100+ extra clients a year without hiring.",
  },
  {
    id: "invoice",
    title: "Invoice & Payment Processing",
    manualTime: "45–60 min per invoice",
    autoTime: "5 minutes (review only)",
    manual:
      "Project finishes. The team logs hours, finance manually creates and reviews the invoice, sends it, chases late payments, reconciles in the accounting system, and updates project records by hand.",
    auto:
      "Project is marked complete. The workflow pulls hours and cost data, generates the invoice, emails it on schedule, recognizes incoming payment, updates all records, notifies finance, and reconciles automatically.",
    connects: "Project tool → Google Workspace → HubSpot → Accounting → Client comms",
    impact: "Faster cash flow, near-zero accounting errors, and 30–40 hours/month freed in finance work.",
  },
  {
    id: "leads",
    title: "Lead Follow-Up & Qualification",
    manualTime: "30–45 min per lead",
    autoTime: "5–10 minutes per lead",
    manual:
      "A lead arrives. Sales manually adds it to the CRM, reviews fit, sends a follow-up if interested, waits, sends reminders, follows up again a week later, qualifies on budget and timeline, then books a meeting or marks it dead.",
    auto:
      "The workflow captures the lead in HubSpot instantly. AI scores it on fit, prioritizes and routes high-value leads to sales immediately, sends relevant emails, tracks opens and clicks, schedules meetings via calendar integration, and drops low-fit leads into a nurture sequence.",
    connects: "Website form → HubSpot CRM → AI scoring → Google Calendar → Email",
    impact: "Qualify 3× more leads with the same team and cut response times from hours to minutes.",
  },
  {
    id: "status",
    title: "Daily Team Status & Project Updates",
    manualTime: "1–2 hours per day",
    autoTime: "0 hours — fully automatic",
    manual:
      "The PM sends a daily status request, team members reply, the PM compiles everything into a dashboard or report, updates the client portal or sends email, and people still ask for updates in meetings. Nothing is real time.",
    auto:
      "Team members log work in the project tool. The workflow checks for updates, compiles a daily summary, posts it to Slack, updates the client dashboard live, and alerts the manager only when something is blocked.",
    connects: "Airtable / project tool → Slack → Client portal → Notion",
    impact: "Eliminate status meetings and give clients real-time progress with less management overhead.",
  },
  {
    id: "contracts",
    title: "Contract & Document Processing",
    manualTime: "20–30 min per contract",
    autoTime: "2 minutes (upload + review)",
    manual:
      "A contract arrives. The team reads it, extracts key information, enters it into the CRM and project system, adds dates to the calendar, sets renewal reminders, and tracks status manually.",
    auto:
      "The contract is uploaded. AI extracts value, dates, deliverables, and renewal dates, adds them to HubSpot, the project system, and the calendar, schedules renewal reminders 30 days out, and keeps a searchable, organized archive.",
    connects: "Google Drive → AI doc processing → HubSpot CRM → Calendar → Project tool",
    impact: "Never miss a renewal, handle 10× more contracts with the same team, and improve audit readiness.",
  },
];

const BENEFITS = [
  {
    title: "Time Savings That Matter",
    body: "Professional services firms automate an average of 40–60 hours per week across their team. That's one person getting back 8–12 hours weekly, or a 10-person team recovering the equivalent of a full-time hire — without the cost.",
    stat: "40–60 hrs",
    statLabel: "Saved weekly per team",
  },
  {
    title: "Cost Reduction & ROI",
    body: "At a $70k salary, 10 hours of manual work weekly costs ~$16,825 per person per year — $168k+ for a 10-person team. A typical build pays for itself in 2–3 months through time savings alone.",
    stat: "400–600%",
    statLabel: "Typical annual ROI",
  },
  {
    title: "Scaling Without Hiring",
    body: "Increase capacity by 30–50% without adding headcount. A 20-person firm can serve 90 clients instead of 60 — roughly $240k more revenue per year with zero additional salary expense.",
    stat: "30–50%",
    statLabel: "More capacity, no hires",
  },
  {
    title: "Better Quality, Fewer Errors",
    body: "Once a workflow is built correctly, it runs the same way every time. Contract processing error rates drop from 3–5% to around 0.1% — fewer client complaints, higher margins, and far less firefighting.",
    stat: "0.1%",
    statLabel: "Error rate after automation",
  },
  {
    title: "Visibility & Control",
    body: "Everything flows through your systems automatically. Real-time dashboards show exactly what's happening, surface bottlenecks immediately, and let you catch problems before they become crises.",
    stat: "Real-time",
    statLabel: "Operational visibility",
  },
];

const INTEGRATIONS = [
  ["HubSpot CRM", "Every lead, client, and deal stays updated across all your systems automatically."],
  ["Google Workspace", "Gmail, Drive, Sheets, and Docs connected so documents and workflows trigger themselves."],
  ["Airtable", "Custom databases that create records, update statuses, and generate reports on their own."],
  ["Notion", "Your knowledge base stays synced, populated automatically from other systems."],
  ["ChatGPT & AI Tools", "AI handles lead scoring, document analysis, and drafting while automations handle logistics."],
  ["Anything with an API", "Slack, Zapier, Make, Asana, Monday.com, accounting and email systems — if it has an API, we connect it."],
];

const PHASES = [
  { n: "01", t: "Process Discovery & Analysis", time: "2–3 weeks · 4–6 hrs of your time", out: "A complete map of your processes, bottlenecks, and ROI-ranked automation opportunities." },
  { n: "02", t: "Strategy & Design", time: "1–2 weeks · 3–4 hrs review", out: "A complete blueprint: step-by-step workflow design, tech recommendations, and milestones." },
  { n: "03", t: "Build & Configure", time: "3–6 weeks", out: "A fully built, tested system with documentation and training materials. You do nothing here." },
  { n: "04", t: "Implementation & Training", time: "1 week + ongoing support", out: "Your team confidently using new workflows, with immediate time savings." },
  { n: "05", t: "Ongoing Optimization", time: "Quarterly · 1–2 hrs", out: "A continuously improving system that evolves with your business." },
];

const FAQS = [
  ["How long does it take to see results?", "Most teams see immediate time savings on day one. Within the first month you'll see measurable differences in productivity and capacity, and full ROI typically lands within 3–6 months depending on scope."],
  ["What if our process is unique? Will this still work?", "That's actually an advantage. Cookie-cutter tools fail precisely because your process is unique — which is why we build custom automation designed specifically for how your business works."],
  ["Do we have to change how our team works?", "Some processes change, but the goal is to make work easier, not harder. We remove the frustrating parts so your team spends less time on repetitive work and more on strategic work."],
  ["What about security? Are our systems safe?", "Yes. We use enterprise-grade security standards — data is encrypted, access is controlled, and your data never leaves your authorized systems. We work within any specific compliance requirements you have."],
  ["What if the automation breaks?", "We build monitoring into every automation. If something breaks we're alerted immediately and fix it before you notice, and you have direct access to support whenever needed."],
  ["Can we adjust it later if things change?", "Absolutely. Your business will evolve and your automation should too — we can add steps, adjust logic, and connect new tools as you grow."],
  ["How much does this cost?", "Custom projects range from $5,000 to $50,000 depending on complexity, with most in the $10,000–$25,000 range. You get a clear quote after discovery, and most clients recover the investment in 3–6 months."],
];

/* ------------------------------------------------------------------ *
 * Workflow accordion card
 * ------------------------------------------------------------------ */
function WorkflowCard({ wf, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className={"wf" + (open ? " open" : "")}>
      <button className="wf-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="wf-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="wf-title">{wf.title}</h3>
        <span className="wf-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="wf-body">
        <div className="wf-body-inner">
          <div className="wf-cols">
            <div className="wf-col without">
              <div className="wf-label">Manual <span>{wf.manualTime}</span></div>
              <p>{wf.manual}</p>
            </div>
            <div className="wf-col with">
              <div className="wf-label">With EAJJY AI <span>{wf.autoTime}</span></div>
              <p>{wf.auto}</p>
            </div>
          </div>
          <div className="wf-connects"><b>Connects:</b> {wf.connects}</div>
          <div className="wf-impact"><b>Impact:</b> {wf.impact}</div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function BPAPage() {
  useSEO({ title: "Business Process Automation", description: "End-to-end workflow automation for professional services firms. Automate onboarding, reporting, document processing, and routing. Take on 30-40% more clients without hiring." });
  return (
    <>
      <PageHero
        eyebrow="Business Process Automation"
        title="Stop Wasting Hours on Work That Machines Should Do"
        lead="Business Process Automation removes the repetitive, manual tasks that slow your team and drain your budget. We design custom workflows that connect your tools, eliminate bottlenecks, and let your people focus on what actually moves the needle."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Book Your 30-Minute Free Call <Arrow /></Link>
          <a href="#workflows" className="btn btn-ghost">See Workflow Examples</a>
        </div>
      </section>

      {/* What is BPA */}
      <section className="sec wrap" id="what">
        <div className="reveal">
          <span className="eyebrow">What It Is</span>
          <h2>What Exactly Is Business Process Automation?</h2>
          <p className="lead">Right now, your team is the middle person passing information back and forth. With BPA, the tools talk to each other directly. Work flows automatically. Nothing gets stuck. Nothing gets forgotten.</p>
        </div>
        <div className="bpa-auto stagger">
          {WHAT_GETS_AUTOMATED.map(([t, d]) => (
            <div className="bpa-auto-card" key={t}>
              <div className="bpa-auto-t">{t}</div>
              <div className="bpa-auto-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Real workflows */}
      <section className="sec wrap" id="workflows">
        <div className="reveal">
          <span className="eyebrow">Real Workflows</span>
          <h2>Real Workflows We Build Every Day</h2>
          <p className="lead">Actual automations we've built for professional services firms. Tap any to compare the manual way with the automated way.</p>
        </div>
        <div className="wf-list stagger">
          {WORKFLOWS.map((wf, i) => <WorkflowCard key={wf.id} wf={wf} index={i} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Benefits */}
      <section className="sec wrap" id="benefits">
        <div className="glow-spot" style={{ width: 480, height: 480, background: "rgba(255,43,43,.08)", top: 0, right: -160 }} />
        <div className="reveal">
          <span className="eyebrow">The Payoff</span>
          <h2>What Business Process Automation Actually Delivers</h2>
        </div>
        <div className="bpa-benefits stagger">
          {BENEFITS.map((b) => (
            <div className="bpa-benefit" key={b.title}>
              <div className="bpa-benefit-stat">{b.stat}<span>{b.statLabel}</span></div>
              <div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Integrations */}
      <section className="sec wrap" id="integrations">
        <div className="reveal">
          <span className="eyebrow">Integrations</span>
          <h2>We Connect the Tools You Already Use</h2>
          <p className="lead">You don't need new software — you need your existing tools to work together. We build the bridges so data flows automatically, and your team never has to learn a new platform.</p>
        </div>
        <div className="bpa-int stagger">
          {INTEGRATIONS.map(([t, d]) => (
            <div className="bpa-int-card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Process */}
      <section className="sec wrap" id="process">
        <div className="reveal">
          <span className="eyebrow">How We Build It</span>
          <h2>How We Build Your Business Process Automation</h2>
          <p className="lead">BPA isn't a one-and-done project — it's a system that evolves with your business. Here's how we build it.</p>
        </div>
        <div className="bpa-phases stagger">
          {PHASES.map((p) => (
            <div className="bpa-phase" key={p.n}>
              <div className="bpa-phase-n">{p.n}</div>
              <div className="bpa-phase-body">
                <h3>{p.t}</h3>
                <div className="bpa-phase-time">{p.time}</div>
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
          <h2>Questions About Business Process Automation</h2>
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

      <style>{BPA_CSS}</style>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Scoped styles (use the global design tokens)
 * ------------------------------------------------------------------ */
const BPA_CSS = `
  .bpa-auto{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .bpa-auto-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:20px;transition:.4s var(--ease)}
  .bpa-auto-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .bpa-auto-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .bpa-auto-d{font-size:13px;color:var(--gray);line-height:1.5}

  .wf-list{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .wf{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .wf.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .wf-head{display:flex;align-items:center;gap:18px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 26px}
  .wf-index{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:40px;height:40px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:11px;display:grid;place-items:center}
  .wf-title{flex:1;font-family:"Space Grotesk";font-weight:600;font-size:clamp(16px,1.8vw,21px);letter-spacing:-.01em}
  .wf-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .wf.open .wf-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .wf-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .wf.open .wf-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .wf-body-inner{overflow:hidden}
  .wf-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:24px 26px 0}
  .wf-col{border:1px solid var(--border);border-radius:14px;padding:18px}
  .wf-col.with{border-color:rgba(255,43,43,.3);background:rgba(255,43,43,.05)}
  .wf-col p{font-size:13.5px;color:var(--gray);line-height:1.55}
  .wf-label{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#6b6b70;margin-bottom:10px;display:flex;justify-content:space-between;gap:10px}
  .wf-col.with .wf-label{color:var(--red-hover)}
  .wf-label span{color:var(--gray);font-weight:500;text-transform:none;letter-spacing:0}
  .wf-connects,.wf-impact{font-size:13px;color:var(--gray);padding:14px 26px 0;line-height:1.55}
  .wf-impact{padding-bottom:24px}
  .wf-connects b,.wf-impact b{color:var(--red-hover);font-weight:600}

  .bpa-benefits{display:flex;flex-direction:column;gap:14px;margin-top:44px}
  .bpa-benefit{display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:center;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:26px;transition:.4s var(--ease)}
  .bpa-benefit:hover{border-color:rgba(255,43,43,.3);transform:translateY(-3px)}
  .bpa-benefit-stat{font-family:"Space Grotesk";font-weight:600;font-size:clamp(26px,3vw,40px);letter-spacing:-.02em;color:var(--red-hover);line-height:1}
  .bpa-benefit-stat span{display:block;font-family:"Inter";font-weight:500;font-size:12px;color:var(--gray);letter-spacing:0;margin-top:8px}
  .bpa-benefit h3{font-family:"Space Grotesk";font-weight:600;font-size:18px;margin-bottom:8px}
  .bpa-benefit p{font-size:14px;color:var(--gray);line-height:1.6}

  .bpa-int{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:42px}
  .bpa-int-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px;transition:.4s var(--ease)}
  .bpa-int-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-4px)}
  .bpa-int-card h3{font-family:"Space Grotesk";font-weight:600;font-size:16px;margin-bottom:8px}
  .bpa-int-card p{font-size:13.5px;color:var(--gray);line-height:1.55}

  .bpa-phases{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .bpa-phase{display:flex;gap:20px;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px 26px;transition:.4s var(--ease)}
  .bpa-phase:hover{border-color:rgba(255,43,43,.3)}
  .bpa-phase-n{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:44px;height:44px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center}
  .bpa-phase-body h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:4px}
  .bpa-phase-time{font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--red-hover);margin-bottom:8px}
  .bpa-phase-body p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .bpa-auto,.bpa-int{grid-template-columns:1fr 1fr}
    .wf-cols{grid-template-columns:1fr;padding:22px 20px 0}
    .bpa-benefit{grid-template-columns:1fr;gap:16px;text-align:left}
  }
  @media(max-width:560px){
    .bpa-auto,.bpa-int{grid-template-columns:1fr}
    .wf-head{gap:14px;padding:20px 18px}
  }
`;
