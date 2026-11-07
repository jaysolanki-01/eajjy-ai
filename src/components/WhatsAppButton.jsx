import React, { useState } from "react";

/* ---- Edit your WhatsApp details here ---- */
const WA_NUMBER = "919265503415"; // +91 92655 03415
const WA_MESSAGE =
  "Hi EAJJY AI, I found your website and I'm interested in automating some of our workflows. Could you share more about how you can help?";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="wa-wrap">
      {/* Expanded chat card */}
      <div className={"wa-card" + (open ? " open" : "")}>
        <div className="wa-card-head">
          <span className="wa-avatar">
            <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.12.55 4.18 1.6 6L4 28l6.1-1.6a12 12 0 0 0 5.94 1.52h.01C22.7 27.92 28 22.52 28 15.96 28 9.4 22.68 4 16.04 4zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.62.95.97-3.53-.24-.36a9.86 9.86 0 0 1-1.51-5.28c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.9a9.82 9.82 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.92 9.9zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
            </svg>
          </span>
          <div className="wa-card-id">
            <span className="wa-card-name">Maya from EAJJY AI</span>
            <span className="wa-card-status"><i /> Typically replies within an hour</span>
          </div>
          <button type="button" className="wa-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="wa-bubble">
          Hi, I'm Maya from EAJJY AI 👋 Got a question about automating your workflows? Message me on WhatsApp and I'll get right back to you.
        </div>

        <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="wa-start">
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.12.55 4.18 1.6 6L4 28l6.1-1.6a12 12 0 0 0 5.94 1.52h.01C22.7 27.92 28 22.52 28 15.96 28 9.4 22.68 4 16.04 4z" /></svg>
          Start chat on WhatsApp
        </a>
      </div>

      {/* Collapsed launcher */}
      <button
        type="button"
        className={"wa-launcher" + (open ? " hide" : "")}
        onClick={() => setOpen(true)}
        aria-label="Open WhatsApp chat"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.12.55 4.18 1.6 6L4 28l6.1-1.6a12 12 0 0 0 5.94 1.52h.01C22.7 27.92 28 22.52 28 15.96 28 9.4 22.68 4 16.04 4zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.62.95.97-3.53-.24-.36a9.86 9.86 0 0 1-1.51-5.28c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.9a9.82 9.82 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.92 9.9zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
        <span className="wa-badge" />
      </button>

      <style>{WA_CSS}</style>
    </div>
  );
}

const WA_CSS = `
  .wa-wrap{position:fixed;right:18px;bottom:18px;z-index:45;display:flex;flex-direction:column;align-items:flex-end}

  .wa-launcher{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;
    background:linear-gradient(145deg,#25D366,#1ebe5b);border:none;cursor:pointer;position:relative;
    box-shadow:0 12px 30px -8px rgba(37,211,102,.6);animation:wa-pulse 2.8s ease-in-out infinite;
    transition:transform .35s var(--ease),box-shadow .35s var(--ease),opacity .25s,visibility .25s}
  .wa-launcher svg{width:30px;height:30px}
  .wa-launcher:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 18px 42px -8px rgba(37,211,102,.85)}
  .wa-launcher.hide{opacity:0;visibility:hidden;pointer-events:none;transform:scale(.7)}
  .wa-badge{position:absolute;top:2px;right:2px;width:13px;height:13px;border-radius:50%;
    background:var(--red);border:2px solid #0a0a0a;box-shadow:0 0 8px var(--red)}
  @keyframes wa-pulse{0%,100%{box-shadow:0 12px 30px -8px rgba(37,211,102,.5)}50%{box-shadow:0 14px 38px -6px rgba(37,211,102,.88)}}

  .wa-card{width:300px;max-width:calc(100vw - 36px);border:1px solid var(--border);border-radius:20px;
    background:rgba(13,13,13,.97);backdrop-filter:blur(20px);box-shadow:0 30px 70px -20px rgba(0,0,0,.85);
    overflow:hidden;position:absolute;bottom:0;right:0;
    opacity:0;visibility:hidden;transform:translateY(16px) scale(.96);transform-origin:bottom right;
    transition:opacity .35s var(--ease),transform .35s var(--ease),visibility .35s}
  .wa-card.open{opacity:1;visibility:visible;transform:translateY(0) scale(1);position:relative}

  .wa-card-head{display:flex;align-items:center;gap:11px;padding:16px;background:linear-gradient(145deg,#1ebe5b,#179e4a)}
  .wa-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center;flex-shrink:0}
  .wa-avatar svg{width:21px;height:21px;color:#fff}
  .wa-card-id{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
  .wa-card-name{font-family:"Space Grotesk";font-weight:600;font-size:14.5px;color:#fff}
  .wa-card-status{display:flex;align-items:center;gap:6px;font-size:11.5px;color:rgba(255,255,255,.85)}
  .wa-card-status i{width:6px;height:6px;border-radius:50%;background:#baffc9;display:inline-block}
  .wa-close{background:rgba(255,255,255,.15);border:none;border-radius:8px;width:26px;height:26px;
    display:grid;place-items:center;color:#fff;cursor:pointer;flex-shrink:0;transition:.25s}
  .wa-close:hover{background:rgba(255,255,255,.28)}
  .wa-close svg{width:14px;height:14px}

  .wa-bubble{margin:16px;padding:13px 15px;background:rgba(255,255,255,.04);border:1px solid var(--border);
    border-radius:14px 14px 14px 4px;font-size:13.5px;line-height:1.55;color:#d4d4d8}

  .wa-start{display:flex;align-items:center;justify-content:center;gap:9px;margin:0 16px 16px;
    padding:13px;border-radius:12px;background:linear-gradient(145deg,#25D366,#1ebe5b);
    color:#fff;font-family:"Space Grotesk";font-weight:600;font-size:14px;text-decoration:none;
    transition:.3s var(--ease)}
  .wa-start svg{width:18px;height:18px}
  .wa-start:hover{filter:brightness(1.08);transform:translateY(-2px)}

  @media(max-width:768px){
    .wa-wrap{right:14px;bottom:14px}
    .wa-launcher{width:52px;height:52px}
    .wa-launcher svg{width:27px;height:27px}
    .wa-card{width:min(86vw,320px)}
  }
  @media(prefers-reduced-motion:reduce){.wa-launcher{animation:none}}
`;
