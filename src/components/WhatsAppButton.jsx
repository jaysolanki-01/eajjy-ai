import React from "react";

/* ---- Edit your WhatsApp details here ---- */
const WA_NUMBER = "919265503415"; // +91 92655 03415 (international format, no + or spaces)
const WA_MESSAGE =
  "Hi EAJJY AI, I found your website and I'm interested in automating some of our workflows. Could you share more about how you can help?";

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.12.55 4.18 1.6 6L4 28l6.1-1.6a12 12 0 0 0 5.94 1.52h.01C22.7 27.92 28 22.52 28 15.96 28 9.4 22.68 4 16.04 4zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.62.95.97-3.53-.24-.36a9.86 9.86 0 0 1-1.51-5.28c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.9a9.82 9.82 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.92 9.9zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
      <span className="wa-tip">Chat with us</span>

      <style>{WA_CSS}</style>
    </a>
  );
}

const WA_CSS = `
  .wa-float{position:fixed;right:18px;bottom:18px;z-index:45;width:56px;height:56px;border-radius:50%;
    display:grid;place-items:center;color:#fff;background:linear-gradient(145deg,#25D366,#1ebe5b);
    box-shadow:0 12px 30px -8px rgba(37,211,102,.6);animation:wa-pulse 2.8s ease-in-out infinite;
    transition:transform .35s var(--ease),box-shadow .35s var(--ease)}
  .wa-float:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 18px 42px -8px rgba(37,211,102,.85)}
  .wa-float svg{width:30px;height:30px}
  .wa-tip{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%) translateX(8px);
    white-space:nowrap;background:rgba(13,13,13,.97);border:1px solid var(--border);border-radius:10px;
    padding:8px 12px;font-size:13px;font-weight:500;color:#fff;opacity:0;visibility:hidden;pointer-events:none;
    box-shadow:0 14px 34px -16px rgba(0,0,0,.85);transition:opacity .3s var(--ease),transform .3s var(--ease),visibility .3s}
  .wa-float:hover .wa-tip{opacity:1;visibility:visible;transform:translateY(-50%) translateX(0)}
  @keyframes wa-pulse{0%,100%{box-shadow:0 12px 30px -8px rgba(37,211,102,.5)}50%{box-shadow:0 14px 38px -6px rgba(37,211,102,.88)}}
  @media(max-width:768px){.wa-float{width:50px;height:50px;right:14px;bottom:14px}.wa-float svg{width:27px;height:27px}.wa-tip{display:none}}
  @media(prefers-reduced-motion:reduce){.wa-float{animation:none}}
`;
