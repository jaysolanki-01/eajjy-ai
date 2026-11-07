import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ClosingCTA from "../sections/ClosingCTA.jsx";
import BookButton from "../components/BookButton.jsx";
import Arrow from "../components/Arrow.jsx";

const STEPS = [
  { t: "We review your answers", d: "Our team looks at the workflows you flagged and validates the time-and-cost estimates against what we've seen in similar firms." },
  { t: "We map your opportunities", d: "You'll get a prioritized view of the automations likely to deliver the fastest ROI for your specific operation." },
  { t: "We reach out", d: "Expect a reply within one business day to schedule your free consultation, no pressure, no obligation." },
];

export default function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank You | EAJJY AI";
    let can = document.querySelector("link[rel='canonical']");
    if (!can) { can = document.createElement("link"); can.setAttribute("rel", "canonical"); document.head.appendChild(can); }
    can.setAttribute("href", "https://www.eajjy.com/thank-you");
    let robots = document.querySelector("meta[name='robots']");
    if (!robots) { robots = document.createElement("meta"); robots.setAttribute("name", "robots"); document.head.appendChild(robots); }
    robots.setAttribute("content", "noindex, follow");
  }, []);

  return (
    <>
      <section className="wrap ty-hero">
        <div className="ty-check reveal" aria-hidden="true">
          <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M16 27l7 7 14-15" /></svg>
        </div>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Submission received</span>
        <h1 className="head">Thank You. Your Audit Is On Its Way.</h1>
        <p className="lead" style={{ margin: "16px auto 0", textAlign: "center" }}>
          We've got your details. If you downloaded your report, it's ready to open. We'll be in touch shortly with your personalized automation roadmap.
        </p>
        <div className="ctas" style={{ justifyContent: "center", marginTop: 32 }}>
          <BookButton>Book a Free Consultation</BookButton>
          <Link to="/blog" className="btn btn-ghost">Read the Blog <Arrow /></Link>
        </div>
      </section>

      <section className="sec wrap">
        <div className="ty-steps stagger">
          {STEPS.map((s, i) => (
            <div className="ty-step" key={s.t}>
              <span className="ty-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/" className="ty-back">← Back to home</Link>
        </div>
      </section>

      <ClosingCTA />
      <style>{TY_CSS}</style>
    </>
  );
}

const TY_CSS = `
  .ty-hero{padding-top:clamp(70px,12vh,140px);display:flex;flex-direction:column;align-items:center;text-align:center}
  .ty-hero h1.head{max-width:18ch;margin:0 auto}
  .ty-check{width:84px;height:84px;margin-bottom:26px}
  .ty-check svg{width:100%;height:100%;fill:none;stroke:var(--red);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
  .ty-check circle{stroke:rgba(255,43,43,.4);stroke-dasharray:151;stroke-dashoffset:151;animation:ty-circle .7s var(--ease) forwards}
  .ty-check path{stroke-dasharray:40;stroke-dashoffset:40;animation:ty-tick .5s var(--ease) forwards .55s}
  @keyframes ty-circle{to{stroke-dashoffset:0}}
  @keyframes ty-tick{to{stroke-dashoffset:0}}

  .ty-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .ty-step{border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(20px);
    border-radius:18px;padding:28px;transition:.4s var(--ease)}
  .ty-step:hover{border-color:rgba(255,43,43,.35);transform:translateY(-4px)}
  .ty-num{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:var(--red-hover);
    display:inline-grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,43,43,.3);
    border-radius:11px;margin-bottom:18px}
  .ty-step h3{font-family:"Space Grotesk";font-weight:600;font-size:17px;margin-bottom:10px}
  .ty-step p{font-size:14px;color:var(--gray);line-height:1.55}
  .ty-back{font-size:14px;color:var(--gray);transition:color .3s}
  .ty-back:hover{color:var(--red-hover)}

  @media(max-width:860px){.ty-steps{grid-template-columns:1fr}}
`;
