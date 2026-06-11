import React from "react";
import { Link } from "react-router-dom";
import { NAV, SERVICES } from "../data/siteData.jsx";
import Logo from "./Logo.jsx";
import Arrow from "./Arrow.jsx";

export default function Navbar({ onMenu }) {
  return (
    <header>
      <nav>
        <Logo size="lg" className="nav-logo" />
        <ul className="nav-links">
          <li className="has-drop">
            <Link to="/services">Services
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
            </Link>

            <div className="mega">
              <div className="mega-inner">
                <div className="mega-head">
                  <span className="eyebrow" style={{ marginBottom: 0 }}>Services</span>
                  <p>End-to-end AI &amp; automation for professional services firms.</p>
                </div>
                <div className="mega-grid">
                  {SERVICES.map((s) => (
                    <Link key={s.title} to={s.to || "/services"} className="mega-card">
                      <span className="mega-ico">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                      </span>
                      <span className="mega-text">
                        <span className="mega-title">{s.title}</span>
                        <span className="mega-desc">{s.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mega-foot">
                  <div>
                    <span className="mega-foot-t">Not sure where to start?</span>
                    <span className="mega-foot-s">Get a free automation audit and we'll map your highest-ROI opportunities.</span>
                  </div>
                  <Link to="/contact" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}>Free Audit <Arrow /></Link>
                </div>
              </div>
            </div>
          </li>
          {NAV.map((n) => (<li key={n.to}><Link to={n.to}>{n.label}</Link></li>))}
        </ul>
        <div className="nav-actions">
          <Link to="/hire-ai-automation-expert" className="nav-cta">Hire an Expert</Link>
          <Link to="/contact" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>Free Audit</Link>
        </div>
        <button className="menu-btn" aria-label="Open menu" onClick={onMenu}>
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </nav>
    </header>
  );
}
