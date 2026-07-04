import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV, SERVICES } from "../data/siteData.jsx";
import Logo from "./Logo.jsx";
import Arrow from "./Arrow.jsx";

// Language switcher — swaps between /en and /de URL prefixes
function LangSwitch() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDE = pathname.startsWith("/de");

  const toggle = () => {
    if (isDE) {
      navigate(pathname.replace(/^\/de/, "") || "/");
    } else {
      navigate("/de" + pathname);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="lang-switch"
      title={isDE ? "Switch to English" : "Auf Deutsch wechseln"}
      aria-label={isDE ? "Switch to English" : "Switch to German"}
    >
      <span className={!isDE ? "ls-active" : ""}>EN</span>
      <span className="ls-div" />
      <span className={isDE ? "ls-active" : ""}>DE</span>
    </button>
  );
}

export default function Navbar({ onMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const servicesActive = pathname.startsWith("/services");

  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <nav className="nav-shell">
        {/* Left zone — logo */}
        <Logo size="lg" className="nav-logo" />

        {/* Center zone — island nav */}
        <ul className="nav-links nav-island">
          <li className={"has-drop" + (servicesActive ? " active" : "")}>
            <Link to="/services" className="nav-link">
              <span>Services</span>
              <svg className="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
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

          {NAV.map((n) => (
            <li key={n.to} className={isActive(n.to) ? "active" : ""}>
              <Link to={n.to} className="nav-link"><span>{n.label}</span></Link>
            </li>
          ))}
        </ul>

        {/* Right zone — actions */}
        <div className="nav-actions">
          <Link to="/hire-ai-automation-expert" className="nav-cta">Hire an Expert</Link>
          <LangSwitch />
          <Link to="/contact" className="btn btn-primary nav-cta-primary">Free Audit <Arrow /></Link>
        </div>

        <button className="menu-btn" aria-label="Open menu" onClick={onMenu}>
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
