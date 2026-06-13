import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import BookButton from "../components/BookButton.jsx";

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
      // how far the section's center is from the viewport center, normalized
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / vh; // ~ -1 .. 1
      const offset = Math.max(-1, Math.min(1, progress)) * 70; // px of drift
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
      <div className="cta-box reveal">
        <div className="cta-parallax" ref={layerRef} aria-hidden="true" />
        <Logo size="md" link={false} className="closing-logo" />
        <span className="eyebrow" style={{ justifyContent: "center" }}>Why EAJJY AI</span>
        <h2>Every Week You Delay Automation, Competitors Get Ahead.</h2>
        <p>Another week your best people waste on work AI should handle. Another week of missed revenue. EAJJY AI turns operational challenges into competitive advantages, helping firms save thousands of hours, scale without proportional hiring, and launch new revenue-generating capabilities.</p>
        <div className="ctas">
          <BookButton>Book a Free Consultation</BookButton>
          <Link to="/services" className="btn btn-ghost">Explore Services</Link>
        </div>
      </div>
    </section>
  );
}
