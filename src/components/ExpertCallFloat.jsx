import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const WA_NUMBER = "919265503415";
const INFO = {
  meta: "90 min · Paid",
  desc: "A paid 1:1 session to map your automation roadmap and answer your toughest questions.",
};

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
      className="ef-wrap"
      title="Paid 1:1 expert consultation — 90 minutes"
      data-cal-namespace="expert-call"
      data-cal-link="jay-solanki/expert-call"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      {/* floating PAID tag above the top edge */}
      <span className="ef-paid">PAID</span>

      {/* main capsule body */}
      <span className="ef-body">
        <span className="ef-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
          </svg>
        </span>
        <span className="ef-label">Expert<br />Consult</span>
        <span className="ef-time">90 min</span>
      </span>

      {/* hover tooltip */}
      <span className="ef-tip" role="tooltip">
        <span className="ef-tip-title">Expert Consultation</span>
        <span className="ef-tip-desc">{INFO.desc}</span>
        <span className="ef-tip-meta">
          <span className="ef-tip-dot" />
          {INFO.meta}
        </span>
      </span>

      <style>{EF_CSS}</style>
    </button>
  );
}

const EF_CSS = `
  .ef-wrap{position:fixed;left:18px;top:50%;transform:translateY(-50%);z-index:45;
    background:none;border:none;padding:0;cursor:pointer;display:flex;flex-direction:column;
    align-items:center;gap:0}

  /* floating PAID pill above the capsule */
  .ef-paid{display:inline-block;background:#FF2B2B;color:#fff;font-family:"Space Grotesk";
    font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    padding:4px 10px;border-radius:999px;margin-bottom:-8px;position:relative;z-index:2;
    box-shadow:0 4px 14px rgba(255,43,43,.55)}

  /* main capsule */
  .ef-body{display:flex;flex-direction:column;align-items:center;gap:10px;
    padding:20px 12px 18px;border-radius:999px;
    background:#050505;
    border:2px solid #FF2B2B;
    box-shadow:0 0 0 4px rgba(255,43,43,.12),0 16px 40px -12px rgba(255,43,43,.5);
    transition:.4s var(--ease,cubic-bezier(.16,.84,.44,1));position:relative;overflow:hidden}
  .ef-body::before{content:"";position:absolute;inset:0;border-radius:999px;
    background:radial-gradient(ellipse at 50% 0%,rgba(255,43,43,.18),transparent 70%);
    pointer-events:none}

  .ef-wrap:hover .ef-body{border-color:#FF4D4D;
    box-shadow:0 0 0 6px rgba(255,43,43,.18),0 20px 50px -10px rgba(255,43,43,.7);
    transform:translateX(3px)}
  .ef-wrap:hover .ef-paid{box-shadow:0 6px 18px rgba(255,43,43,.7)}

  /* icon */
  .ef-icon{width:38px;height:38px;border-radius:50%;background:rgba(255,43,43,.12);
    border:1.5px solid rgba(255,43,43,.4);display:grid;place-items:center;flex-shrink:0;
    transition:.4s var(--ease,cubic-bezier(.16,.84,.44,1))}
  .ef-icon svg{width:20px;height:20px;stroke:#FF4D4D}
  .ef-wrap:hover .ef-icon{background:rgba(255,43,43,.22);border-color:#FF2B2B}

  /* label */
  .ef-label{writing-mode:vertical-rl;transform:rotate(180deg);font-family:"Space Grotesk";
    font-weight:600;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
    color:#fff;line-height:1.1;text-align:center}

  /* time */
  .ef-time{font-size:10px;font-weight:600;color:rgba(255,43,43,.8);letter-spacing:.04em;
    font-family:"Space Grotesk";writing-mode:vertical-rl;transform:rotate(180deg)}

  /* hover tooltip */
  .ef-tip{position:absolute;left:calc(100% + 14px);top:50%;
    transform:translateY(-50%) translateX(-8px);
    display:flex;flex-direction:column;width:max-content;max-width:230px;
    background:rgba(10,10,10,.97);backdrop-filter:blur(16px);
    border:1px solid rgba(255,43,43,.3);border-radius:14px;
    padding:14px 16px;box-shadow:0 20px 50px -20px rgba(0,0,0,.9);
    opacity:0;visibility:hidden;pointer-events:none;z-index:3;
    transition:opacity .35s,transform .35s,visibility .35s}
  .ef-tip::before{content:"";position:absolute;right:100%;top:50%;
    transform:translateY(-50%);border:7px solid transparent;
    border-right-color:rgba(255,43,43,.3)}
  .ef-wrap:hover .ef-tip{opacity:1;visibility:visible;transform:translateY(-50%) translateX(0)}
  .ef-tip-title{font-family:"Space Grotesk";font-weight:600;font-size:13.5px;color:#fff;margin-bottom:5px}
  .ef-tip-desc{font-size:12px;color:var(--gray,#A1A1AA);line-height:1.5;margin-bottom:10px}
  .ef-tip-meta{display:inline-flex;align-items:center;gap:7px;font-family:"Space Grotesk";
    font-weight:600;font-size:11.5px;color:#FF4D4D}
  .ef-tip-dot{width:6px;height:6px;border-radius:50%;background:#FF2B2B;
    box-shadow:0 0 8px #FF2B2B;flex-shrink:0}

  /* mobile — bottom center horizontal */
  @media(max-width:768px){
    .ef-wrap{left:50%;right:auto;top:auto;bottom:80px;
      transform:translateX(-50%);flex-direction:row}
    .ef-paid{margin-bottom:0;margin-right:-10px;z-index:2}
    .ef-body{flex-direction:row;gap:10px;padding:12px 18px 12px 20px;border-radius:999px}
    .ef-label{writing-mode:horizontal-tb;transform:none;font-size:10px}
    .ef-time{writing-mode:horizontal-tb;transform:none}
    .ef-tip{display:none}
  }

  @media(prefers-reduced-motion:reduce){
    .ef-body,.ef-icon,.ef-tip{transition:none}
  }
`;
