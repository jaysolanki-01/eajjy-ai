import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

/* ---- Edit the tooltip wording here ---- */
const INFO = {
  title: "Expert Consultation",
  desc: "A paid 1:1 session to map your automation roadmap and answer your toughest questions.",
  meta: "90 min · Paid", // e.g. "90 min · $199"
};

/* Custom mid-left floating CTA -> opens the Cal popup for the paid expert call. */
export default function ExpertCallFloat() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "expert-call" });
      cal("ui", {
        cssVarsPerTheme: { dark: { "cal-brand": "#FF2B2B" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      className="expert-float"
      title="Paid 1:1 expert consultation & automation discussion"
      data-cal-namespace="expert-call"
      data-cal-link="jay-solanki/expert-call"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      <span className="ef-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      </span>
      <span className="ef-text">Expert Consultation</span>
      <span className="ef-tag">Paid</span>

      {/* hover tooltip */}
      <span className="ef-tip" role="tooltip">
        <span className="ef-tip-title">{INFO.title}</span>
        <span className="ef-tip-desc">{INFO.desc}</span>
        <span className="ef-tip-meta"><span className="ef-tip-dot" />{INFO.meta}</span>
      </span>

      <style>{EF_CSS}</style>
    </button>
  );
}

const EF_CSS = `
  .expert-float{position:fixed;left:14px;top:50%;transform:translateY(-50%);z-index:45;
    display:flex;flex-direction:column;align-items:center;gap:12px;
    padding:16px 11px;border:1px solid rgba(255,43,43,.4);border-radius:999px;cursor:pointer;
    background:linear-gradient(180deg,rgba(22,22,22,.9),rgba(8,8,8,.92));
    backdrop-filter:blur(16px) saturate(140%);
    box-shadow:0 14px 38px -12px rgba(255,43,43,.55),inset 0 1px 0 rgba(255,255,255,.06);
    animation:ef-breathe 2.8s ease-in-out infinite;transition:transform .4s var(--ease),border-color .4s var(--ease),box-shadow .4s var(--ease)}
  .expert-float:hover{transform:translateY(-50%) translateX(4px);border-color:var(--red);
    box-shadow:0 20px 50px -12px rgba(255,43,43,.8),inset 0 1px 0 rgba(255,255,255,.08)}

  .ef-icon{position:relative;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;
    background:var(--red);box-shadow:0 0 18px rgba(255,43,43,.7)}
  .ef-icon svg{width:19px;height:19px;stroke:#fff}
  .ef-icon::after{content:"";position:absolute;inset:-6px;border-radius:50%;
    border:1px solid rgba(255,43,43,.55);animation:ef-ring 2.8s ease-out infinite}

  .ef-text{writing-mode:vertical-rl;transform:rotate(180deg);font-family:"Space Grotesk";font-weight:600;
    font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#fff;line-height:1}
  .ef-tag{font-family:"Space Grotesk";font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    color:#fff;background:var(--red);border-radius:999px;padding:6px 7px;writing-mode:vertical-rl;transform:rotate(180deg)}

  /* hover tooltip */
  .ef-tip{position:absolute;left:calc(100% + 16px);top:50%;
    transform:translateY(-50%) translateX(-10px);
    display:flex;flex-direction:column;width:max-content;max-width:240px;text-align:left;
    background:rgba(13,13,13,.97);backdrop-filter:blur(18px);border:1px solid var(--border);border-radius:14px;
    padding:14px 16px;box-shadow:0 22px 54px -22px rgba(0,0,0,.85);
    opacity:0;visibility:hidden;pointer-events:none;z-index:3;
    transition:opacity .35s var(--ease),transform .35s var(--ease),visibility .35s}
  .expert-float:hover .ef-tip{opacity:1;visibility:visible;transform:translateY(-50%) translateX(0)}
  .ef-tip::before{content:"";position:absolute;right:100%;top:50%;transform:translateY(-50%);
    border:7px solid transparent;border-right-color:var(--border)}
  .ef-tip-title{font-family:"Space Grotesk";font-weight:600;font-size:14px;color:#fff;margin-bottom:5px}
  .ef-tip-desc{font-size:12.5px;color:var(--gray);line-height:1.5;margin-bottom:10px}
  .ef-tip-meta{display:inline-flex;align-items:center;gap:7px;font-family:"Space Grotesk";font-weight:600;
    font-size:12px;color:var(--red-hover)}
  .ef-tip-dot{width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 8px var(--red)}

  @keyframes ef-breathe{0%,100%{box-shadow:0 14px 38px -12px rgba(255,43,43,.45),inset 0 1px 0 rgba(255,255,255,.06)}
    50%{box-shadow:0 16px 46px -10px rgba(255,43,43,.8),inset 0 1px 0 rgba(255,255,255,.08)}}
  @keyframes ef-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}

  @media(max-width:768px){
    /* Bottom horizontal capsule on mobile */
    .expert-float{left:50%;right:auto;top:auto;bottom:16px;transform:translateX(-50%);
      flex-direction:row;gap:9px;padding:9px 16px 9px 10px;border-radius:999px}
    .expert-float:hover{transform:translateX(-50%)}
    .ef-icon{width:30px;height:30px}
    .ef-icon svg{width:16px;height:16px}
    .ef-text{writing-mode:horizontal-tb;transform:none;font-size:12.5px;letter-spacing:.06em}
    .ef-tag{writing-mode:horizontal-tb;transform:none;font-size:9px;padding:4px 8px}
    .ef-tip{display:none}
  }
  @media(prefers-reduced-motion:reduce){.expert-float{animation:none}.ef-icon::after{animation:none;opacity:0}}
`;
