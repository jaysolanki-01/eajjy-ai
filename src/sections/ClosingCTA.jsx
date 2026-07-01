import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import BookButton from "../components/BookButton.jsx";

const ORBIT_ICONS = [
  { cls: "ob-1", path: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /> }, // bolt
  { cls: "ob-2", path: (<><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M9 8V6a3 3 0 0 1 6 0v2M9 13h.01M15 13h.01" /></>) }, // robot
  { cls: "ob-3", path: (<><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></>) }, // chart
  { cls: "ob-4", path: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>) }, // clock
];

export default function ClosingCTA() {
  const sectionRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    const update = () => {
      raf = null;
      const el = sectionRef.current;
      const layer = layerRef.current;
      if (!el || !layer) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh;
      const offset = Math.max(-1, Math.min(1, progress)) * 70;
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="sec wrap" id="cta" ref={sectionRef}>
      <div className="cta-box cta-orbit reveal">
        <div className="cta-parallax" ref={layerRef} aria-hidden="true" />

        {ORBIT_ICONS.map((o) => (
          <span key={o.cls} className={"ob-badge " + o.cls} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{o.path}</svg>
          </span>
        ))}

        <Logo size="md" link={false} className="closing-logo" />
        <span className="eyebrow" style={{ justifyContent: "center" }}>Why EAJJY AI</span>
        <h2>Every Week Without an AI Agency, Competitors Get Ahead.</h2>
        <p>Another week your best people waste on work AI should handle. Another week of missed revenue. EAJJY AI turns operational challenges into competitive advantages, helping firms save thousands of hours, scale without proportional hiring, and launch new revenue-generating capabilities.</p>
        <div className="ctas">
          <BookButton>Book a Free Consultation</BookButton>
          <Link to="/services" className="btn btn-ghost">Explore Services</Link>
        </div>
      </div>

      <style>{ORBIT_CSS}</style>
    </section>
  );
}

const ORBIT_CSS = `
  .cta-orbit{overflow:visible}
  .ob-badge{position:absolute;z-index:3;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;
    border:1px solid rgba(255,43,43,.35);background:rgba(13,13,13,.85);backdrop-filter:blur(10px);
    box-shadow:0 10px 26px -10px rgba(255,43,43,.5),inset 0 1px 0 rgba(255,255,255,.05)}
  .ob-badge svg{width:20px;height:20px;stroke:var(--red-hover)}

  .ob-1{top:6%;left:14%;animation:ob-float-a 7s ease-in-out infinite}
  .ob-2{top:10%;right:12%;width:38px;height:38px;animation:ob-float-b 8.5s ease-in-out infinite .6s}
  .ob-3{bottom:9%;left:9%;width:38px;height:38px;animation:ob-float-b 7.8s ease-in-out infinite 1.1s}
  .ob-4{bottom:7%;right:16%;animation:ob-float-a 9s ease-in-out infinite .3s}
  .ob-2 svg,.ob-3 svg{width:17px;height:17px}

  @keyframes ob-float-a{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(6deg)}}
  @keyframes ob-float-b{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(12px) rotate(-7deg)}}

  @media(max-width:760px){
    .ob-badge{width:36px;height:36px}
    .ob-badge svg{width:16px;height:16px}
    .ob-1{top:2%;left:4%}
    .ob-2{top:4%;right:4%;width:30px;height:30px}
    .ob-3{bottom:3%;left:3%;width:30px;height:30px}
    .ob-4{bottom:1%;right:6%}
    .ob-2 svg,.ob-3 svg{width:14px;height:14px}
  }
  @media(max-width:480px){.ob-badge{display:none}}
  @media(prefers-reduced-motion:reduce){.ob-badge{animation:none}}
`;

