import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../data/siteData.jsx";
import Arrow from "../components/Arrow.jsx";

export default function Services() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section className="sec wrap" id="services">
      <div className="glow-spot" style={{ width: 500, height: 500, background: "rgba(255,43,43,.08)", top: 120, right: -150 }} />

      <div className="svc-scroll">
        {/* Sticky left column */}
        <div className="svc-sticky">
          <span className="eyebrow">Services</span>
          <h2>How We Help You Automate and Scale</h2>
          <p className="lead">Whether you need end-to-end process redesign or targeted automation for specific pain points, EAJJY AI delivers solutions that integrate seamlessly with your existing operations.</p>

          <ul className="svc-index">
            {SERVICES.map((s, i) => (
              <li key={s.title} className={i === active ? "on" : ""}>
                <button type="button" onClick={() => goTo(i)}>
                  <span className="si-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="si-title">{s.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Scrolling right column */}
        <div className="svc-panels">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              ref={(el) => (refs.current[i] = el)}
              data-idx={i}
              className={"svc-panel" + (i === active ? " on" : "")}
            >
              <div className="svc-panel-glow" />
              <span className="svp-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="pico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="chips">{s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
              <div className="impact"><b>Impact:</b> {s.impact}</div>
              <Link to={s.to || "/services"} className="svp-link">Learn more <Arrow /></Link>
            </article>
          ))}
        </div>
      </div>

      <style>{SVC_CSS}</style>
    </section>
  );
}

const SVC_CSS = `
  .svc-scroll{display:grid;grid-template-columns:0.92fr 1.08fr;gap:clamp(36px,6vw,88px);
    margin-top:48px;align-items:start}

  .svc-sticky{position:sticky;top:120px;align-self:start}
  .svc-index{list-style:none;margin-top:30px;border-left:1px solid var(--border);padding-left:2px}
  .svc-index li{position:relative}
  .svc-index li::before{content:"";position:absolute;left:-2px;top:10%;bottom:10%;width:2px;border-radius:2px;
    background:var(--red);transform:scaleY(0);transform-origin:top;transition:transform .4s var(--ease)}
  .svc-index li.on::before{transform:scaleY(1)}
  .svc-index button{display:flex;align-items:center;gap:14px;width:100%;text-align:left;cursor:pointer;
    background:none;border:none;font-family:inherit;color:var(--gray);padding:13px 16px;transition:.35s var(--ease)}
  .svc-index button:hover{color:#fff}
  .svc-index .si-num{font-family:"Space Grotesk";font-weight:600;font-size:13px;color:#52525b;transition:.35s var(--ease)}
  .svc-index .si-title{font-family:"Space Grotesk";font-weight:500;font-size:15px;letter-spacing:-.01em;transition:.35s var(--ease)}
  .svc-index li.on .si-num{color:var(--red-hover)}
  .svc-index li.on .si-title{color:#fff}

  .svc-panels{display:flex;flex-direction:column;gap:clamp(18px,3vw,32px)}
  .svc-panel{position:relative;overflow:hidden;border:1px solid var(--border);border-radius:22px;
    background:var(--glass);backdrop-filter:blur(20px);padding:clamp(28px,3.5vw,44px);
    min-height:clamp(330px,50vh,440px);display:flex;flex-direction:column;justify-content:center;
    opacity:.45;transform:translateY(0);transition:opacity .55s var(--ease),border-color .55s var(--ease),transform .55s var(--ease)}
  .svc-panel.on{opacity:1;border-color:rgba(255,43,43,.4)}
  .svc-panel-glow{position:absolute;top:-50px;right:-50px;width:200px;height:200px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,43,43,.22),transparent 70%);filter:blur(22px);opacity:0;transition:.55s var(--ease)}
  .svc-panel.on .svc-panel-glow{opacity:1}
  .svp-num{position:absolute;top:22px;right:26px;font-family:"Space Grotesk";font-weight:600;
    font-size:13px;color:#3f3f46}
  .svc-panel.on .svp-num{color:var(--red-hover)}
  .pico{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;
    background:rgba(255,43,43,.1);border:1px solid rgba(255,43,43,.25);margin-bottom:20px}
  .pico svg{width:23px;height:23px;stroke:var(--red-hover)}
  .svc-panel h3{font-family:"Space Grotesk";font-weight:600;font-size:clamp(21px,2.4vw,27px);letter-spacing:-.015em;margin-bottom:12px}
  .svc-panel > p{font-size:15px;color:var(--gray);line-height:1.6;margin-bottom:20px;max-width:52ch}
  .svp-link{display:inline-flex;align-items:center;gap:8px;margin-top:20px;font-family:"Space Grotesk";
    font-weight:600;font-size:14px;color:var(--red-hover);transition:.35s var(--ease)}
  .svp-link svg{transition:transform .35s var(--ease)}
  .svp-link:hover svg{transform:translateX(4px)}

  @media(max-width:920px){
    .svc-scroll{grid-template-columns:1fr;gap:8px}
    .svc-sticky{position:static}
    .svc-index{display:none}
    .svc-panel{opacity:1;min-height:0}
    .svc-panel.on{border-color:var(--border)}
    .svc-panel-glow{display:none}
  }
`;
