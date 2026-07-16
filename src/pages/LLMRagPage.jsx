import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO.js";
import PageHero from "../components/PageHero.jsx";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import Arrow from "../components/Arrow.jsx";

/* ------------------------------------------------------------------ *
 * Content — LLM & RAG Solutions service
 * ------------------------------------------------------------------ */
const WHAT_WE_BUILD = [
  ["Knowledge Assistants", "Chat assistants that answer from your documents, policies, and data, not the open web."],
  ["RAG Pipelines", "Retrieval systems that ground every answer in your real, current source material."],
  ["Document Q&A", "Ask plain-language questions across contracts, reports, and wikis and get cited answers."],
  ["Custom LLM Integration", "The right model wired into your product or workflow, hosted how you need it."],
  ["Semantic Search", "Search that understands meaning, not just keywords, across everything you know."],
  ["Internal Copilots", "Assistants that help your team draft, summarize, and decide using your own knowledge base."],
];

const HOW_RAG_WORKS = [
  { n: "01", t: "Ingest Your Knowledge", out: "We connect your documents, wikis, and data, then chunk and index them into a searchable knowledge base." },
  { n: "02", t: "Retrieve What's Relevant", out: "When a question comes in, the system finds the most relevant passages from your own content." },
  { n: "03", t: "Generate a Grounded Answer", out: "The LLM answers using those retrieved passages, so responses stay accurate and on-source." },
  { n: "04", t: "Cite and Improve", out: "Answers come with citations back to the source, and the system improves as your knowledge grows." },
];

const USE_CASES = [
  {
    id: "support",
    title: "Customer & Client Support Assistant",
    summary:
      "A support assistant that answers from your help docs, policies, and past tickets, deflecting routine questions while citing its sources.",
    points: [
      "Answers grounded in your real documentation",
      "Cites sources so answers are trustworthy and checkable",
      "Escalates to a human with full context when needed",
    ],
    impact: "Faster, more accurate support without growing the team.",
  },
  {
    id: "internal",
    title: "Internal Knowledge Copilot",
    summary:
      "A copilot that lets your team instantly find answers buried across wikis, drives, and past projects, instead of asking around.",
    points: [
      "Searches across all your internal knowledge at once",
      "Summarizes long documents into clear answers",
      "Cuts onboarding and ramp-up time for new hires",
    ],
    impact: "Stop losing hours hunting for information that already exists.",
  },
  {
    id: "docs",
    title: "Document Intelligence & Q&A",
    summary:
      "Ask plain-language questions across large sets of contracts, reports, or filings and get precise, cited answers in seconds.",
    points: [
      "Query thousands of pages in natural language",
      "Extract clauses, figures, and obligations on demand",
      "Every answer linked back to the exact source",
    ],
    impact: "Turn document review from hours of reading into seconds of asking.",
  },
];

const WHY = [
  ["Grounded, Not Guessing", "RAG ties every answer to your real content, dramatically reducing hallucination."],
  ["Your Data Stays Yours", "We build on your knowledge within your authorized systems and security standards."],
  ["Always Current", "Update the source and the assistant updates too, no retraining required."],
  ["Answers You Can Trust", "Citations back to source mean your team can verify, not just believe."],
];

const FAQS = [
  ["What's the difference between an LLM and RAG?", "An LLM is the language model that generates answers. RAG (retrieval-augmented generation) feeds that model relevant passages from your own data first, so answers are grounded in your real content instead of the model's general training."],
  ["Will it make things up?", "RAG is specifically designed to reduce that. Because answers are built from retrieved passages of your actual documents, and cited back to source, the system stays grounded and verifiable rather than guessing."],
  ["Is our data safe and private?", "Yes. We build within your authorized systems using enterprise-grade security, and your knowledge base stays under your control. We work within any specific compliance requirements you have."],
  ["Do we need to retrain it when our docs change?", "No. That's a core advantage of RAG, update or add source documents and the assistant draws on the new material immediately, with no model retraining required."],
  ["Which model do you use?", "Whichever fits your needs best. We're model-agnostic and recommend the right option based on your accuracy, cost, privacy, and hosting requirements, then integrate it cleanly into your stack."],
];

/* ------------------------------------------------------------------ *
 * Use-case accordion card
 * ------------------------------------------------------------------ */
function UseCaseCard({ uc, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className={"rag-uc" + (open ? " open" : "")}>
      <button className="rag-uc-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="rag-uc-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="rag-uc-title">{uc.title}</h3>
        <span className="rag-uc-toggle" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
      <div className="rag-uc-body">
        <div className="rag-uc-body-inner">
          <p className="rag-uc-summary">{uc.summary}</p>
          <ul className="rag-uc-points">
            {uc.points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" style={{ stroke: "var(--red-hover)" }}><path d="M5 12l5 5L20 7" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="rag-uc-impact"><b>Impact:</b> {uc.impact}</div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function LLMRagPage() {
  useSEO({ title: "LLM & RAG Solutions", description: "AI knowledge assistants and RAG pipelines grounded in your own data. Get accurate, cited answers from the information your firm already has.", canonical: "https://www.eajjy.com/services/llm-rag-solutions" });
  return (
    <>
      <PageHero
        eyebrow="LLM & RAG Solutions"
        title="AI That Answers From Your Knowledge, Not the Open Web"
        lead="We build large language model solutions grounded in your own data using retrieval-augmented generation, so your team and clients get accurate, cited answers from the documents and knowledge you already have."
      />

      <section className="wrap" style={{ paddingBottom: 10 }}>
        <div className="ctas reveal">
          <Link to="/contact" className="btn btn-primary">Build Your AI Assistant <Arrow /></Link>
          <a href="#how" className="btn btn-ghost">How RAG Works</a>
        </div>
      </section>

      {/* What we build */}
      <section className="sec wrap" id="build">
        <div className="reveal">
          <span className="eyebrow">What We Build</span>
          <h2>Language AI, Grounded in Your Data</h2>
          <p className="lead">Generic chatbots guess from the open web. We build assistants that answer from your knowledge, with citations you can trust.</p>
        </div>
        <div className="rag-grid stagger">
          {WHAT_WE_BUILD.map(([t, d]) => (
            <div className="rag-card" key={t}>
              <div className="rag-card-t">{t}</div>
              <div className="rag-card-d">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* How RAG works */}
      <section className="sec wrap" id="how">
        <div className="glow-spot" style={{ width: 460, height: 460, background: "rgba(255,43,43,.08)", top: 0, right: -150 }} />
        <div className="reveal">
          <span className="eyebrow">How It Works</span>
          <h2>How Retrieval-Augmented Generation Works</h2>
          <p className="lead">RAG grounds every answer in your real content. Here's the flow, end to end.</p>
        </div>
        <div className="rag-flow stagger">
          {HOW_RAG_WORKS.map((s, i) => (
            <div className="rag-flow-card" key={s.n}>
              <div className="rag-flow-n">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.out}</p>
              {i < HOW_RAG_WORKS.length - 1 && <span className="rag-flow-arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Use cases */}
      <section className="sec wrap" id="use-cases">
        <div className="reveal">
          <span className="eyebrow">Use Cases</span>
          <h2>What You Can Build with LLM & RAG</h2>
          <p className="lead">Tap any to see how it works and the impact it delivers.</p>
        </div>
        <div className="rag-uc-list stagger">
          {USE_CASES.map((uc, i) => <UseCaseCard key={uc.id} uc={uc} index={i} />)}
        </div>
      </section>

      <div className="divider" />

      {/* Why */}
      <section className="sec wrap" id="why">
        <div className="reveal">
          <span className="eyebrow">Why RAG</span>
          <h2>Why Grounded AI Beats a Generic Chatbot</h2>
        </div>
        <div className="rag-why stagger">
          {WHY.map(([t, d]) => (
            <div className="rag-why-card" key={t}>
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
          <h2>Questions About LLM & RAG Solutions</h2>
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

      <style>{RAG_CSS}</style>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Scoped styles (use the global design tokens)
 * ------------------------------------------------------------------ */
const RAG_CSS = `
  .rag-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}
  .rag-card{border:1px solid var(--border);border-radius:14px;background:var(--glass);
    backdrop-filter:blur(18px);padding:22px;transition:.4s var(--ease)}
  .rag-card:hover{border-color:rgba(255,43,43,.35);transform:translateY(-3px)}
  .rag-card-t{font-family:"Space Grotesk";font-weight:600;font-size:15px;margin-bottom:6px}
  .rag-card-d{font-size:13px;color:var(--gray);line-height:1.5}

  .rag-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:42px}
  .rag-flow-card{position:relative;border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px;transition:.4s var(--ease)}
  .rag-flow-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-4px)}
  .rag-flow-n{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:var(--red);width:36px;height:36px;border:1px solid rgba(255,43,43,.3);border-radius:10px;display:grid;place-items:center;margin-bottom:16px}
  .rag-flow-card h3{font-family:"Space Grotesk";font-weight:600;font-size:15.5px;margin-bottom:8px}
  .rag-flow-card p{font-size:13px;color:var(--gray);line-height:1.55}
  .rag-flow-arrow{position:absolute;right:-12px;top:50%;transform:translateY(-50%);color:var(--red-hover);font-size:20px;z-index:2}

  .rag-uc-list{display:flex;flex-direction:column;gap:14px;margin-top:42px}
  .rag-uc{border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--glass);backdrop-filter:blur(22px);transition:.4s var(--ease)}
  .rag-uc.open{border-color:rgba(255,43,43,.35);box-shadow:0 26px 60px -28px rgba(255,43,43,.4)}
  .rag-uc-head{display:flex;align-items:center;gap:18px;width:100%;text-align:left;cursor:pointer;background:none;border:none;color:inherit;font-family:inherit;padding:22px 26px}
  .rag-uc-index{font-family:"Space Grotesk";font-weight:600;font-size:15px;color:var(--red);width:40px;height:40px;flex-shrink:0;border:1px solid rgba(255,43,43,.3);border-radius:11px;display:grid;place-items:center}
  .rag-uc-title{flex:1;font-family:"Space Grotesk";font-weight:600;font-size:clamp(16px,1.8vw,21px);letter-spacing:-.01em}
  .rag-uc-toggle{flex-shrink:0;width:36px;height:36px;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;color:var(--red-hover);transition:.4s var(--ease)}
  .rag-uc.open .rag-uc-toggle{transform:rotate(180deg);background:rgba(255,43,43,.1)}
  .rag-uc-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
  .rag-uc.open .rag-uc-body{grid-template-rows:1fr;border-top:1px solid var(--border)}
  .rag-uc-body-inner{overflow:hidden;padding:0 26px}
  .rag-uc-summary{font-size:14px;color:var(--gray);line-height:1.6;padding-top:22px}
  .rag-uc-points{list-style:none;display:flex;flex-direction:column;gap:10px;padding:16px 0 0}
  .rag-uc-points li{display:flex;gap:11px;font-size:13.5px;color:#e4e4e7;line-height:1.5}
  .rag-uc-points li svg{flex-shrink:0;width:17px;height:17px;margin-top:2px}
  .rag-uc-impact{font-size:13px;color:var(--gray);padding:16px 0 24px;line-height:1.55}
  .rag-uc-impact b{color:var(--red-hover);font-weight:600}

  .rag-why{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:42px}
  .rag-why-card{border:1px solid var(--border);border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);padding:24px;transition:.4s var(--ease)}
  .rag-why-card:hover{border-color:rgba(255,43,43,.3);transform:translateY(-3px)}
  .rag-why-card h3{font-family:"Space Grotesk";font-weight:600;font-size:16px;margin-bottom:8px}
  .rag-why-card p{font-size:14px;color:var(--gray);line-height:1.55}

  @media(max-width:860px){
    .rag-grid{grid-template-columns:1fr 1fr}
    .rag-flow{grid-template-columns:1fr 1fr}
    .rag-flow-arrow{display:none}
    .rag-why{grid-template-columns:1fr}
  }
  @media(max-width:560px){
    .rag-grid,.rag-flow{grid-template-columns:1fr}
    .rag-uc-head{gap:14px;padding:20px 18px}
    .rag-uc-body-inner{padding:0 18px}
  }
`;
