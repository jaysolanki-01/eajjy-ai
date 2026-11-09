import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — Vibe Coding service
 * ------------------------------------------------------------------ */
const WHAT_WE_BUILD = [
  ["Custom Web Apps", "Purpose-built applications shaped around your exact workflow, not a template."],
  ["Client Portals", "Branded spaces where clients track progress, share files, and self-serve."],
  ["Internal Dashboards", "Live views of the metrics and operations your team actually needs."],
  ["Project Management Tools", "Custom tracking systems that fit how your team really works."],
  ["Integration Hubs", "The connective tissue that ties your existing tech stack together."],
  ["Rapid Prototypes", "Working proof-of-concepts in days so you can validate before you invest."],
];

const HOW_WE_WORK = [
  ["No-Code / Low-Code", "We use modern platforms to ship the obvious parts fast, without reinventing the wheel."],
  ["Traditional Development", "Where you need real control, performance, or custom logic, we write proper code."],
  ["The Right Mix", "We combine both so you get speed where it's safe and depth where it matters."],
];

const STEPS = [
  { n: "01", t: "Scope & Prototype", time: "Days, not weeks", out: "We turn your idea into a clickable prototype fast, so you can see and feel it before committing." },
  { n: "02", t: "Build in Sprints", time: "Weekly drops", out: "We build in tight iterations, shipping working pieces you can use and react to each week." },
  { n: "03", t: "Integrate & Connect", time: "Mid-build", out: "We wire it into your existing tools so it fits your stack instead of adding another silo." },
  { n: "04", t: "Launch & Iterate", time: "2–4 weeks total", out: "We deploy, train your team, and keep refining based on how it performs in the real world." },
];

const BEST_FOR = [
  "Agencies that need custom tools to solve specific operational challenges",
  "Teams stuck forcing their process into off-the-shelf software",
  "Firms that want to enhance client service delivery with bespoke tools",
  "Businesses that need to move on a market opportunity quickly",
];

const WHY = [
  ["Weeks, Not Months", "Rapid prototyping and deployment means you launch in 2–4 weeks, not a quarter."],
  ["Exactly What You Need", "No bending your process to fit someone else's software. The tool fits you."],
  ["Grows With You", "We build scalable solutions designed to expand as your business does."],
  ["Move on Opportunities", "Launch new capabilities quickly to respond to what the market is doing right now."],
];

const TOOLS = [
  ["Bubble", "Visual full-stack app builder for custom web apps without writing backend code."],
  ["Webflow", "Production-grade websites and client portals with full design control."],
  ["Retool", "Internal dashboards and admin tools connected to any database or API."],
  ["Make / n8n", "Workflow automation that powers the logic behind the tools we ship."],
  ["Supabase / Airtable", "Scalable databases that store and serve your product's data."],
  ["Custom Code", "React, Node, Python — where full engineering control is the right call."],
];

const FAQS = [
  ["What exactly are vibe coding experts?", "Vibe coding experts are developers and builders who combine traditional software engineering with modern no-code/low-code platforms to ship custom tools significantly faster than conventional development. They pick the right tool for each part of the build — moving fast where speed is safe and using real code where depth matters."],
  ["How do I hire vibe coding experts for my firm?", "The fastest path is to work with an agency that specialises in this approach, like EAJJY AI. We assess your specific operational problem, scope a solution, and build it in 2–4 weeks — with full transparency on what runs where and what tools are used throughout."],
  ["How is this different from hiring a traditional dev agency?", "Speed and pragmatism. We blend no-code/low-code with traditional development to ship in weeks, not months, and we focus on solving your specific operational problem rather than building from scratch where we don't have to."],
  ["What tools do vibe coding experts use?", "The most common tools include Bubble (web apps), Webflow (client portals and sites), Retool (internal dashboards), Make and n8n (automation), Supabase and Airtable (databases), and traditional code (React, Node, Python) for anything needing real engineering depth. The best vibe coding experts know when to use which."],
  ["Are vibe coding experts in demand in 2026?", "Yes — significantly. As ecommerce brands compete on speed and operational efficiency, demand for teams that can ship custom tools fast has surged. Finding reliable vibe coding experts with real domain experience (not just tool knowledge) is the key differentiator."],
  ["What can you realistically build in 2–4 weeks?", "Custom web apps, client portals, internal dashboards, project trackers, and integration hubs. For larger systems we ship a working core first, then expand in iterations."],
  ["Will I get locked into a no-code platform?", "Only where it genuinely serves you. We choose the right tool for each part of the build, and we're transparent about what runs where so you keep control and avoid dead ends."],
  ["Do you maintain it after launch?", "Yes. We deploy, train your team, and stay available to refine and extend the tool as your needs evolve."],
  ["How much does it cost?", "It depends on scope, but rapid builds are far more affordable than traditional custom software. You get a clear quote up front after we scope the prototype."],
];

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function VibeCodingPage() {
  useSEO({
    title: "Hire Vibe Coding Experts – Custom Tools in 2–4 Weeks",
    description: "EAJJY AI is one of the best places to hire vibe coding experts for ecommerce brands. We ship custom integrations, dashboards, and internal tools in 2–4 weeks. Get a free audit.",
    canonical: "https://www.eajjy.com/services/vibe-coding",
  });

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Vibe Coding",
          "description": "EAJJY AI provides vibe coding expert services for ecommerce brands — building custom integrations, dashboards, and internal tools in 2–4 weeks using a blend of no-code, low-code, and traditional development.",
          "provider": { "@type": "Organization", "name": "EAJJY AI", "url": "https://www.eajjy.com" },
          "serviceType": "Vibe Coding / Rapid Custom Software Development",
          "areaServed": "Worldwide",
          "url": "https://www.eajjy.com/services/vibe-coding",
        },
        {
          "@type": "FAQPage",
          "mainEntity": FAQS.map(([q, a]) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a },
          })),
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "vc-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => document.getElementById("vc-schema")?.remove();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Hire Vibe Coding Experts"
        title="Reliable Vibe Coding Experts Who Ship in Weeks, Not Months"
        lead="Finding reliable vibe coding experts for ecommerce-specific work is hard. EAJJY AI combines no-code, low-code, and traditional development to deliver exactly the custom tool you need — fast."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Start Your Build <Arrow /></Link>
          <a href="#hire" className="btn btn-ghost">How to Hire Vibe Coding Experts</a>
        </div>
      </section>

      {/* What we build */}
      <section className="sec wrap" id="build">
        <div className="reveal">
          <span className="eyebrow">What We Build</span>
          <h2>Custom Tools Built for Domain Experts</h2>
          <p className="lead">Stop forcing your processes into off-the-shelf software. Our vibe coding experts build exactly what your team needs and connect it to everything you already use.</p>
        </div>
        <div className="vc-grid stagger">
          {WHAT_WE_BUILD.map(([t, d]) => (
            <div className="vc-card" key={t}>
              <div className="vc-card-t">{t}</div>
              <div className="vc-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Tools vibe coding experts use */}
      <section className="sec wrap" id="tools">
        <div className="reveal">
          <span className="eyebrow">Tools We Use</span>
          <h2>What Tools Do Vibe Coding Experts Use?</h2>
          <p className="lead">The best vibe coding experts don't have a single tool — they have a full toolkit. We match the right platform to each part of your build so you get speed, control, and scalability in the right places.</p>
        </div>
        <div className="vc-grid stagger">
          {TOOLS.map(([t, d]) => (
            <div className="vc-card" key={t}>
              <div className="vc-card-t">{t}</div>
              <div className="vc-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* How we work */}
      <section className="sec wrap" id="approach">
        <div className="glow-spot" style={{ width: 460, height: 460, background: "rgba(255,43,43,.08)", top: 0, right: -150 }} />
        <div className="reveal">
          <span className="eyebrow">Our Approach</span>
          <h2>The Fast Path Without the Shortcuts</h2>
          <p className="lead">Our vibe coding experts pick the right tool for each part of the job, so you get speed where it's safe and real engineering where it counts.</p>
        </div>
        <div className="vc-approach stagger">
          {HOW_WE_WORK.map(([t, d], i) => (
            <div className="vc-approach-card" key={t}>
              <div className="vc-approach-n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* How to hire vibe coding experts */}
      <section className="sec wrap" id="hire">
        <div className="reveal">
          <span className="eyebrow">How to Hire</span>
          <h2>How to Hire Vibe Coding Experts for Your Firm</h2>
          <p className="lead">Most firms looking to hire vibe coding experts make the same mistake: they hire for tool knowledge instead of domain understanding. Here's what to look for — and what makes EAJJY AI different.</p>
        </div>
        <div className="vc-hire stagger">
          {[
            ["Look for domain experience, not just tool fluency", "The best vibe coding experts for ecommerce brands understand Shopify, WooCommerce, fulfilment operations, and marketplace integrations — not just how to use Bubble or Webflow. Tool knowledge without business context produces tools nobody actually uses."],
            ["Ask for a working prototype before committing", "Any reliable vibe coding expert should be able to produce a clickable prototype in days. If they can't show you something working within the first week, the build timeline will run the same way."],
            ["Understand what's no-code vs. custom code in your build", "Top-rated vibe coding experts are transparent about what runs where. Ask specifically: which parts use no-code platforms, which use custom code, and what happens to your data and access if the relationship ends."],
            ["Prioritise agencies over freelancers for production tools", "A freelance vibe coder may be affordable, but production tools need monitoring, maintenance, and iteration. Agencies like EAJJY AI provide ongoing support and accountability that solo operators can't match."],
          ].map(([t, d]) => (
            <div className="vc-hire-card" key={t}>
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
          <span className="eyebrow">How It Works</span>
          <h2>From Idea to Live Tool in 2–4 Weeks</h2>
          <p className="lead">A tight, iterative process that gets a working tool into your hands fast and keeps improving it.</p>
        </div>
        <div className="vc-phases stagger">
          {STEPS.map((p) => (
            <div className="vc-phase" key={p.n}>
              <div className="vc-phase-n">{p.n}</div>
              <div className="vc-phase-body">
                <h3>{p.t}</h3>
                <div className="vc-phase-time">{p.time}</div>
                <p>{p.out}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Why + Best for */}
      <section className="sec wrap" id="why">
        <div className="reveal">
          <span className="eyebrow">Why EAJJY AI</span>
          <h2>Why Teams Choose Our Vibe Coding Experts</h2>
        </div>
        <div className="vc-why stagger">
          {WHY.map(([t, d]) => (
            <div className="vc-why-card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>

        <div className="vc-bestfor reveal">
          <div className="vc-bestfor-label">Best for firms looking to hire vibe coding experts</div>
          <ul className="vc-bestfor-list">
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

      {/* FAQ */}
      <section className="sec wrap" id="faq">
        <div className="reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions About Hiring Vibe Coding Experts</h2>
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

      <style>{VC_CSS}</style>
    </>
  );
}

const VC_CSS = `
  .vc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .vc-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .vc-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .vc-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .vc-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .vc-approach{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:42px}
  .vc-approach-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:26px;transition:.4s var(--ease)}
  .vc-approach-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-4px)}
  .vc-approach-n{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:var(--red);width:36px;height:36px;border:1px solid rgba(255,43,43,.3);border-radius:10px;display:grid;place-items:center;margin-bottom:16px}
  .vc-approach-card h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:8px}
  .vc-approach-card p{font-size:13.5px;color:var(--gray);line-height:1.55}

  .vc-hire{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .vc-hire-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:26px 28px;transition:.4s var(--ease)}
  .vc-hire-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-3px)}
  .vc-hire-card h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:8px;color:#fff}
  .vc-hire-card p{font-size:14px;color:var(--gray);line-height:1.6}

  .vc-phases{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .vc-phase{display:flex;gap:20px;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px 26px;transition:.4s var(--ease)}
  .vc-phase:hover{border-color:rgba(255,43,43,.3)}
  .vc-phase-n{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:44px;height:44px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;display:grid;place-items:center}
  .vc-phase-body h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:4px}
  .vc-phase-time{font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--red-hover);margin-bottom:8px}
  .vc-phase-body p{font-size:14px;color:var(--gray);line-height:1.55}

  .vc-why{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:42px}
  .vc-why-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px;transition:.4s var(--ease)}
  .vc-why-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-3px)}
  .vc-why-card h3{font-family:"Space Grotesk";font-weight:600;font-size:16px;margin-bottom:8px}
  .vc-why-card p{font-size:14px;color:var(--gray);line-height:1.55}

  .vc-bestfor{margin-top:24px;border:1px solid var(--border);border-radius:18px;background:var(--glass);backdrop-filter:blur(18px);padding:28px}
  .vc-bestfor-label{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--red-hover);margin-bottom:16px}
  .vc-bestfor-list{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .vc-bestfor-list li{display:flex;gap:12px;font-size:14.5px;color:#e4e4e7;line-height:1.5}
  .vc-bestfor-list li svg{flex-shrink:0;width:18px;height:18px;margin-top:2px}

  @media(max-width:860px){
    .vc-grid,.vc-approach{grid-template-columns:1fr 1fr}
    .vc-why,.vc-bestfor-list{grid-template-columns:1fr}
  }
  @media(max-width:560px){
    .vc-grid,.vc-approach{grid-template-columns:1fr}
  }
`;
