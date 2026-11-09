import React, { useEffect, useState } from "react";

const COOKIE_KEY = "eajjy_cookie_consent";

function setCookie(name, value) {
  const exp = new Date(Date.now() + 365 * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  return match ? match.split("=")[1] : null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie(COOKIE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { setCookie(COOKIE_KEY, "accepted"); setVisible(false); };
  const decline = () => { setCookie(COOKIE_KEY, "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <>
      <div className="cb-bar" role="region" aria-label="Cookie consent">
        <div className="cb-inner">
          <div className="cb-text">
            <span className="cb-icon">🍪</span>
            <p>
              We use cookies to improve your experience and analyse site traffic.
              By clicking <strong>Accept</strong>, you consent to our use of cookies.{" "}
              <a href="/privacy" className="cb-link">Learn more</a>
            </p>
          </div>
          <div className="cb-btns">
            <button className="cb-btn cb-decline" onClick={decline}>Decline</button>
            <button className="cb-btn cb-accept" onClick={accept}>Accept</button>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </>
  );
}

const CSS = `
  .cb-bar{position:fixed;bottom:0;left:0;right:0;z-index:800;
    background:rgba(13,13,13,.96);border-top:1px solid var(--border);
    backdrop-filter:blur(18px);animation:cbSlide .4s var(--ease)}
  .cb-inner{max-width:var(--maxw);margin:0 auto;padding:16px clamp(16px,3vw,40px);
    display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .cb-text{display:flex;align-items:center;gap:12px;flex:1;min-width:220px}
  .cb-icon{font-size:22px;flex-shrink:0}
  .cb-text p{font-size:13.5px;color:#a1a1aa;line-height:1.5}
  .cb-text p strong{color:#fff}
  .cb-link{color:var(--red-hover);text-decoration:underline}
  .cb-btns{display:flex;gap:10px;flex-shrink:0}
  .cb-btn{font-family:inherit;font-size:13.5px;font-weight:600;border-radius:10px;
    padding:9px 20px;cursor:pointer;border:1px solid var(--border);transition:.25s}
  .cb-decline{background:transparent;color:#a1a1aa}
  .cb-decline:hover{border-color:#52525b;color:#fff}
  .cb-accept{background:var(--red);color:#fff;border-color:var(--red)}
  .cb-accept:hover{background:var(--red-hover);border-color:var(--red-hover)}
  @keyframes cbSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @media(max-width:560px){.cb-inner{flex-direction:column;align-items:flex-start}}
`;
