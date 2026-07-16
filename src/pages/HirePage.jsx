import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — Hire an AI and Automation Expert
 * ------------------------------------------------------------------ */
const MODELS = [
  {
    id: "project",
    tag: "Fixed Scope",
    title: "Project-Based",
    price: "Per project",
    line: "A defined build with a clear scope, timeline, and deliverable.",
    points: [
      "Best for a specific workflow or tool you need built",
      "Fixed quote after a short scoping call",
      "Clear milestones and a defined end date",
    ],
    featured: false,
  },
  {
    id: "retainer",
    tag: "Most Popular",
    title: "Monthly Retainer",
    price: "Monthly",
    line: "Ongoing senior automation capacity embedded in your team.",
    points: [
      "A set block of hours every month",
      "Priority turnaround and continuous improvements",
      "Scale up or down as your needs change",
    ],
    featured: true,
  },
  {
    id: "dedicated",
    tag: "Full-Time Focus",
    title: "Dedicated Expert",
    price: "Full or part-time",
    line: "An expert working as an extension of your team.",
    points: [
      "Deeply embedded in your tools and processes",
      "Joins your standups and communication channels",
      "Long-term ownership of your automation roadmap",
    ],
    featured: false,
  },
];

const SKILLS = [
  ["Workflow Automation", "n8n, Make, Zapier, and custom orchestration across your stack."],
  ["AI & LLM Integration", "OpenAI and other models, plus RAG pipelines grounded in your data."],
  ["API & System Integration", "Connecting CRMs, databases, and SaaS tools through their APIs."],
  ["Custom Development", "Web apps, dashboards, client portals, and internal tools."],
  ["Data & Scraping", "Structured data collection, enrichment, and transformation."],
  ["Voice & Agent Systems", "AI calling, chat agents, and multi-step autonomous workflows."],
];

const WHAT_YOU_GET = [
  ["Senior-Level Talent", "Experienced automation experts, not juniors learning on your dime."],
  ["No Hiring Overhead", "Skip recruiting, onboarding, payroll, and benefits. Start in days, not months."],
  ["Flexible Commitment", "Scale hours up or down, or pause between projects. No long lock-ins."],
  ["Direct Communication", "Work directly with the person building, through your own Slack or email."],
  ["Documented Work", "Every automation comes documented so you're never dependent on one person."],
  ["Fast Turnaround", "Tight feedback loops and weekly progress, so momentum never stalls."],
];

const STEPS = [
  { n: "01", t: "Discovery Call", out: "We talk through your needs, goals, and the kind of help you're looking for." },
  { n: "02", t: "Match & Scope", out: "We match you with the right expert and agree on scope, model, and timeline." },
  { n: "03", t: "Kickoff", out: "Your expert plugs into your tools and communication channels and starts fast." },
  { n: "04", t: "Build & Iterate", out: "Work ships in tight loops with regular check-ins, so you see progress continuously." },
];

const FAQS = [
  ["How quickly can an expert start?", "Usually within a few days of our discovery call. Because there's no recruiting or onboarding overhead, we move from conversation to building far faster than traditional hiring."],
  ["What if I only need a small amount of work?", "That's fine. The project-based and retainer models are built for exactly that. We scope to what you actually need rather than pushing a large fixed contract."],
  ["Can I scale up or down later?", "Yes. You can increase hours during busy periods, scale back when things are quiet, or move between engagement models as your needs evolve."],
  ["Who owns the work that's built?", "You do. Everything built for you is yours, and it's delivered documented so you're never locked into depending on a single person."],
  ["How do we communicate?", "Directly with the expert doing the work, through your own Slack, email, or preferred channel, with regular check-ins and visible progress."],
  ["What does it cost?", "It depends on the model and scope. Project work is quoted up front; retainers and dedicated arrangements are priced by capacity. You'll always have a clear number before committing."],
];

function ModelCard({ m }) {
  return (
    <article className={"hire-model" + (m.featured ? " featured" : "")}>
      <div className="hire-model-tag">{m.tag}</div>
      <h3 className="hire-model-title">{m.title}</h3>
      <div className="hire-model-price">{m.price}</div>
      <p className="hire-model-line">{m.line}</p>
      <ul className="hire-model-points">
        {m.points.map((p) => (
          <li key={p}>
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
            {p}
          </li>
        ))}
      </ul>
      <Link to="/contact" className={"btn " + (m.featured ? "btn-primary" : "btn-ghost")} style={{ width: "100%", justifyContent: "center" }}>
        Get Started{m.featured && <Arrow />}
      </Link>
    </article>
  );
}

export default function HirePage() {
  useSEO({ title: "Hire an AI & Automation Expert", description: "Engage EAJJY AI on a project, retainer, or dedicated basis. Full automation expertise on demand without the overhead of a full-time hire.", canonical: "https://www.eajjy.com/hire-ai-automation-expert" });
  return (
    <>
      <PageHero
        eyebrow="Hire an Expert"
        title="Hire an AI and Automation Expert"
        lead="Get an experienced AI and automation expert working as an extension of your team, on flexible terms, without the cost and delay of traditional hiring."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Book a Discovery Call <Arrow /></Link>
          <a href="#models" className="btn btn-ghost">See Engagement Models</a>
        </div>
      </section>

      {/* Engagement models */}
      <section className="sec wrap" id="models">
        <div className="glow-spot" style={{ width: 480, height: 480, background: "rgba(255,43,43,.08)", top: 0, right: -160 }} />
        <div className="reveal">
          <span className="eyebrow">Engagement Models</span>
          <h2>Work With Us the Way That Fits</h2>
          <p className="lead">Whether you need one build or ongoing capacity, there's a model that matches how you want to work.</p>
        </div>
        <div className="hire-models stagger">
          {MODELS.map((m) => <ModelCard key={m.id} m={m} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Skills */}
      <section className="sec wrap" id="skills">
        <div className="reveal">
          <span className="eyebrow">Capabilities</span>
          <h2>What Our Experts Build</h2>
          <p className="lead">Deep, hands-on experience across the full automation and AI stack.</p>
        </div>
        <div className="hire-grid stagger">
          {SKILLS.map(([t, d]) => (
            <div className="hire-card" key={t}>
              <div className="hire-card-t">{t}</div>
              <div className="hire-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Why / what you get */}
      <section className="sec wrap" id="why">
        <div className="reveal">
          <span className="eyebrow">Why Hire This Way</span>
          <h2>The Talent Without the Overhead</h2>
        </div>
        <div className="hire-grid stagger">
          {WHAT_YOU_GET.map(([t, d]) => (
            <div className="hire-card" key={t}>
              <div className="hire-card-t">{t}</div>
              <div className="hire-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* How it works */}
      <section className="sec wrap" id="process">
        <div className="reveal">
          <span className="eyebrow">How It Works</span>
          <h2>From First Call to Shipping Fast</h2>
          <p className="lead">A simple path from conversation to an expert building inside your team.</p>
        </div>
        <div className="hire-phases stagger">
          {STEPS.map((p) => (
            <div className="hire-phase" key={p.n}>
              <div className="hire-phase-n">{p.n}</div>
              <div className="hire-phase-body">
                <h3>{p.t}</h3>
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
          <h2>Questions About Hiring an Expert</h2>
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

      <style>{HIRE_CSS}</style>
    </>
  );
}

const HIRE_CSS = `
  .hire-models{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:42px;align-items:start}
  .hire-model{display:flex;flex-direction:column;gap:12px;border:1px solid var(--border);border-radius:18px;background:var(--glass);backdrop-filter:blur(20px);padding:28px 24px;transition:.4s var(--ease)}
  .hire-model:hover{border-color:rgba(255,43,43,.3);transform:translateY(-4px)}
  .hire-model.featured{border-color:rgba(255,43,43,.45);box-shadow:0 30px 70px -30px rgba(255,43,43,.5)}
  .hire-model-tag{align-self:flex-start;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--red-hover);border:1px solid rgba(255,43,43,.3);border-radius:999px;padding:5px 12px}
  .hire-model-title{font-family:"Space Grotesk";font-weight:600;font-size:21px;letter-spacing:-.01em}
  .hire-model-price{font-size:13px;color:var(--gray);font-weight:500;margin-top:-6px}
  .hire-model-line{font-size:14px;color:var(--gray);line-height:1.55}
  .hire-model-points{list-style:none;display:flex;flex-direction:column;gap:10px;margin:4px 0 8px}
  .hire-model-points li{display:flex;gap:10px;font-size:13.5px;color:#e4e4e7;line-height:1.5}
  .hire-model-points li svg{flex-shrink:0;width:17px;height:17px;margin-top:2px}

  .hire-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .hire-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .hire-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .hire-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .hire-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .hire-phases{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .hire-phase{display:flex;gap:20px;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:22px 26px;transition:.4s var(--ease)}
  .hire-phase:hover{border-color:rgba(255,43,43,.3)}
  .hire-phase-n{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:44px;height:44px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center}
  .hire-phase-body h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:4px}
  .hire-phase-body p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .hire-models{grid-template-columns:1fr}
    .hire-grid{grid-template-columns:1fr 1fr}
  }
  @media(max-width:560px){
    .hire-grid{grid-template-columns:1fr}
  }
`;
