import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Real client case studies (from the EAJJY AI brief)
 * ------------------------------------------------------------------ */
const CASES = [
  {
    id: "geo-seo",
    title: "GEO-Specific SEO Content Automation",
    client: "Content & SEO",
    category: "Content Automation",
    challenge:
      "The client wanted GEO-specific SEO strategies while automating content creation from Upwork job notifications. Manually converting job alerts into optimized blog posts was slow, repetitive, and impossible to scale.",
    steps: [
      { title: "Automated Upwork Job Monitoring", detail: "Captured and monitored Upwork job notification emails automatically through workflow automation." },
      { title: "SEO Metadata Generation", detail: "Extracted key job details to generate SEO-optimized meta titles, keywords, and descriptions." },
      { title: "AI-Powered Content Optimization", detail: "Used AI to optimize content and auto-determine publishing status from predefined criteria." },
      { title: "Automated Blog Creation & Publishing", detail: "Generated human-like, SEO-friendly posts and published them to the site with zero manual input." },
    ],
    tech: ["n8n Workflow Automation", "AI Agents", "Email API", "WordPress/CMS API", "SEO Tools"],
    results: [
      { value: "3-5 hrs", label: "Saved per day" },
      { value: "24/7", label: "Autonomous workflow" },
      { value: "100%", label: "GEO-targeted SEO" },
      { value: "Full-stack", label: "Content automation" },
    ],
  },
  {
    id: "voice-ai",
    title: "Voice AI Agent",
    client: "Kapiraj Ayurveda",
    category: "Voice AI · Lead Gen",
    challenge:
      "Kapiraj Ayurveda generated high lead volume through Meta Ads, but manually calling every lead wasn't scalable. The sales team couldn't reach prospects while interest was high, losing conversions and burning time on unqualified leads.",
    steps: [
      { title: "Automated Lead Capture", detail: "Integrated Meta Ads directly with Google Sheets to capture and organize leads in real time." },
      { title: "AI Calling Automation with VAPI", detail: "Implemented VAPI AI to automate intelligent voice calling for incoming leads." },
      { title: "Two-Phase AI Agent Workflow", detail: "A pre-call agent qualified leads; a post-call agent handled follow-ups and engagement." },
      { title: "Automated Response Collection", detail: "Built a tracking system to capture customer feedback, responses, and interest levels." },
    ],
    tech: ["VAPI AI", "Meta Ads API", "Google Sheets API", "Voice AI", "Lead Qualification"],
    results: [
      { value: "Instant", label: "Response time" },
      { value: "Auto", label: "Lead qualification" },
      { value: "80%", label: "Less sales workload" },
      { value: "3x", label: "Conversion rate" },
    ],
  },
  {
    id: "linkedin",
    title: "LinkedIn Automation Agent",
    client: "Personal Brand",
    category: "Social Automation",
    challenge:
      "The client wanted a consistent LinkedIn presence but struggled to create engaging content and post regularly. Manual content management ate into core business time, leading to inconsistent posting and lost visibility.",
    steps: [
      { title: "Automated Posting Workflow", detail: "Built an n8n LinkedIn automation with scheduled daily or weekly triggers." },
      { title: "Google Sheets Integration", detail: "Pulled draft topics, ideas, and content inputs automatically from Sheets." },
      { title: "AI-Powered Content Generation", detail: "Used the OpenAI API to turn raw ideas into well-structured, engaging posts." },
      { title: "Publishing & Content Logging", detail: "Auto-published with an optional approval queue for manual review before posting." },
    ],
    tech: ["n8n Workflow Automation", "OpenAI API", "Google Sheets API", "LinkedIn API", "Scheduling"],
    results: [
      { value: "5+ hrs", label: "Saved weekly" },
      { value: "100%", label: "Content consistency" },
      { value: "Higher", label: "Engagement" },
      { value: "Stronger", label: "Brand visibility" },
    ],
  },
  {
    id: "yc-scraping",
    title: "Y Combinator Data Scraping Agent",
    client: "IT Consultant",
    category: "Data Enrichment",
    challenge:
      "An IT consultant wanted to connect with high-potential YC startups but had no streamlined way to gather enriched company and founder data. Manual research took hours per prospect and outreach stayed generic.",
    steps: [
      { title: "Automated YC Data Scraping", detail: "Built a scraping workflow with Apify, HTTP requests, and custom parsers to collect startup data." },
      { title: "Structured Data Storage", detail: "Stored and organized raw startup data in Google Sheets for easy tracking." },
      { title: "URL Extraction & Structuring", detail: "Extracted company URLs and generated structured links via custom JavaScript." },
      { title: "Founder Profile Retrieval", detail: "Used OpenAI workflows to identify and retrieve founder LinkedIn profiles automatically." },
      { title: "AI Company Data Enrichment", detail: "Enriched data with services, funding stage, ideal tech stack, and business positioning." },
    ],
    tech: ["n8n Workflow Automation", "Apify Scraping", "OpenAI API", "Google Sheets API", "Custom JS"],
    results: [
      { value: "10+ hrs", label: "Saved per week" },
      { value: "100+", label: "Startups enriched" },
      { value: "AI", label: "Enhanced accuracy" },
      { value: "Targeted", label: "Outreach precision" },
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter Automation Agent",
    client: "Lightson (US)",
    category: "Content Distribution",
    challenge:
      "Lightson manually created and distributed their newsletter across email, LinkedIn, and internal playbooks. The CEO spent nearly four hours weekly on research and content, and the strategy lacked proper ICP targeting.",
    steps: [
      { title: "Workflow Analysis & Planning", detail: "Analyzed the existing manual process to map requirements and automation opportunities." },
      { title: "Ideal Customer Profile Research", detail: "Documented the ICP to sharpen content targeting, messaging, and relevance." },
      { title: "AI-Powered Newsletter Automation", detail: "Built AI-driven content creation for faster, more consistent publishing." },
      { title: "Multi-Channel Distribution", detail: "Automated delivery across email, LinkedIn posts, and internal playbook generation." },
    ],
    tech: ["n8n Workflow Automation", "AI Content Generation", "Email Marketing APIs", "LinkedIn API", "CMS"],
    results: [
      { value: "4 hrs", label: "Saved weekly" },
      { value: "Auto", label: "Newsletter delivery" },
      { value: "Multi", label: "Channel publishing" },
      { value: "ICP", label: "Targeted content" },
    ],
  },
];

const STATS = [
  { value: "5", label: "Shipped projects" },
  { value: "30+ hrs", label: "Saved weekly, combined" },
  { value: "3x", label: "Peak conversion lift" },
  { value: "100%", label: "Autonomous workflows" },
];

/* ------------------------------------------------------------------ *
 * Sub-components
 * ------------------------------------------------------------------ */
function CaseCard({ c, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <article className={"case" + (open ? " open" : "")}>
      <div className="case-glow" />

      {/* Header — always visible, toggles the body */}
      <button className="case-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="case-headings">
          <div className="case-cat">{c.category}</div>
          <h3 className="case-title">{c.title}</h3>
          <div className="case-client">
            <span className="case-check">&#10003;</span> {c.client} &middot; Completed Project
          </div>
        </div>
        <span className="case-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Results — always visible strip */}
      <div className="case-results">
        {c.results.map((r) => (
          <div className="case-result" key={r.label}>
            <div className="cr-value">{r.value}</div>
            <div className="cr-label">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Expandable body */}
      <div className="case-body">
        <div className="case-body-inner">
          <div className="case-cols">
            <div className="case-col">
              <div className="case-sub">The Challenge</div>
              <p className="case-text">{c.challenge}</p>

              <div className="case-sub" style={{ marginTop: 22 }}>Technologies Used</div>
              <div className="chips">
                {c.tech.map((t) => (<span className="chip" key={t}>{t}</span>))}
              </div>
            </div>

            <div className="case-col">
              <div className="case-sub">How We Solved It</div>
              <ol className="case-steps">
                {c.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="cs-num">{i + 1}</span>
                    <div>
                      <div className="cs-title">{s.title}</div>
                      <div className="cs-detail">{s.detail}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function Work() {
  useSEO({ title: "Our Work – AI Automation Case Studies", description: "Real automation systems we have shipped: voice AI agents, GEO-SEO content pipelines, LinkedIn automation, YC scraping agents, and newsletter systems." });
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="AI Automation Success Stories"
        lead="Real systems we've built for real firms. Each project replaced hours of manual work with autonomous, measurable automation."
      />

      {/* Stats band */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <div className="work-stats stagger">
          {STATS.map((s) => (
            <div className="work-stat" key={s.label}>
              <div className="ws-value">{s.value}</div>
              <div className="ws-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="sec wrap" id="cases" style={{ paddingTop: 0 }}>
        <div className="reveal">
          <span className="eyebrow">Case Studies</span>
          <h2>Selected Client Work</h2>
          <p className="lead">Tap any project to explore the challenge, our implementation, and the technologies behind it.</p>
        </div>

        <div className="case-list stagger">
          {CASES.map((c, i) => (<CaseCard key={c.id} c={c} index={i} />))}
        </div>

        <div className="reveal" style={{ marginTop: 44 }}>
          <Link to="/contact" className="btn btn-primary">Start Your Project <Arrow /></Link>
        </div>
      </section>

      {/* Page-scoped styles */}
      <style>{CASE_CSS}</style>

      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Styles (scoped to the Work page; uses global design tokens)
 * ------------------------------------------------------------------ */
const CASE_CSS = `
  .work-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .work-stat{border:1px solid var(--border);border-radius:16px;background:var(--glass);
    backdrop-filter:blur(20px);padding:24px 18px;text-align:center;transition:.4s var(--ease)}
  .work-stat:hover{border-color:rgba(255,43,43,.4);transform:translateY(-4px)}
  .ws-value{font-family:"Space Grotesk";font-weight:600;font-size:clamp(24px,2.8vw,38px);letter-spacing:-.02em}
  .ws-label{font-size:12.5px;color:var(--gray);margin-top:6px}

  .case-list{display:flex;flex-direction:column;gap:16px;margin-top:46px}
  .case{position:relative;border:1px solid var(--border);border-radius:20px;overflow:hidden;
    background:var(--glass);backdrop-filter:blur(22px);transition:.45s var(--ease)}
  .case::before{content:"";position:absolute;inset:0;border-radius:20px;padding:1px;
    background:linear-gradient(160deg,rgba(255,255,255,.09),transparent 42%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
    -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
  .case.open{border-color:rgba(255,43,43,.35);box-shadow:0 30px 70px -30px rgba(255,43,43,.4)}
  .case-glow{position:absolute;top:-50px;right:-30px;width:200px;height:200px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,43,43,.22),transparent 70%);filter:blur(24px);
    opacity:0;transition:.5s}
  .case.open .case-glow,.case:hover .case-glow{opacity:1}

  .case-head{display:flex;align-items:center;gap:20px;width:100%;text-align:left;cursor:pointer;
    background:none;border:none;color:inherit;font-family:inherit;padding:26px 28px}
  .case-index{font-family:"Space Grotesk";font-weight:600;font-size:18px;color:var(--red);
    width:46px;height:46px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:12px;
    display:grid;place-items:center}
  .case-headings{flex:1;min-width:0}
  .case-cat{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--red-hover);margin-bottom:6px}
  .case-title{font-family:"Space Grotesk";font-weight:600;font-size:clamp(18px,2vw,24px);letter-spacing:-.01em;line-height:1.15}
  .case-client{font-size:12.5px;color:var(--gray);margin-top:7px}
  .case-check{color:#2ee27a}
  .case-toggle{flex-shrink:0;width:38px;height:38px;border:1px solid var(--border);border-radius:10px;
    display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .case.open .case-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1);border-color:rgba(255,43,43,.3)}

  .case-results{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);
    border-top:1px solid var(--border)}
  .case-result{background:var(--charcoal);padding:16px 18px;transition:.35s}
  .case:hover .case-result{background:#141414}
  .cr-value{font-family:"Space Grotesk";font-weight:600;font-size:clamp(17px,1.7vw,22px);letter-spacing:-.01em;color:#fff}
  .cr-label{font-size:11.5px;color:var(--gray);margin-top:3px}

  .case-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s var(--ease)}
  .case.open .case-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .case-body-inner{overflow:hidden}
  .case-cols{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:30px 28px 32px}
  .case-sub{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--red-hover);margin-bottom:12px}
  .case-text{font-size:14.5px;color:var(--gray);line-height:1.65}

  .case-steps{list-style:none;display:flex;flex-direction:column;gap:14px}
  .case-steps li{display:flex;gap:13px}
  .cs-num{flex-shrink:0;width:26px;height:26px;border-radius:8px;display:grid;place-items:center;
    font-family:"Space Grotesk";font-weight:600;font-size:12.5px;color:var(--red-hover);
    background:rgba(255,43,43,.1);border:1px solid rgba(255,43,43,.2)}
  .cs-title{font-size:14px;font-weight:600;margin-bottom:3px}
  .cs-detail{font-size:13px;color:var(--gray);line-height:1.5}

  @media(max-width:820px){
    .work-stats{grid-template-columns:repeat(2,1fr)}
    .case-cols{grid-template-columns:1fr;gap:26px;padding:26px 22px 28px}
  }
  @media(max-width:560px){
    .case-results{grid-template-columns:repeat(2,1fr)}
    .case-head{gap:14px;padding:22px 18px}
    .case-index{width:40px;height:40px;font-size:15px}
  }
`;
