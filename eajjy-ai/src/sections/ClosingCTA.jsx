import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import BookButton from "../components/BookButton.jsx";

export default function ClosingCTA() {
  return (
    <section className="sec wrap" id="cta">
      <div className="cta-box reveal">
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
