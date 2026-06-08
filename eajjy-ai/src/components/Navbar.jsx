import React from "react";
import { Link } from "react-router-dom";
import { NAV, SERVICES } from "../data/siteData.jsx";
import Logo from "./Logo.jsx";

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
            <div className="drop">
              {SERVICES.map((s) => (<Link key={s.title} to="/services">{s.title}</Link>))}
            </div>
          </li>
          {NAV.map((n) => (<li key={n.to}><Link to={n.to}>{n.label}</Link></li>))}
        </ul>
        <div className="nav-actions">
          <Link to="/hire" className="nav-cta">Hire a Developer</Link>
          <Link to="/contact" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>Free Audit</Link>
        </div>
        <button className="menu-btn" aria-label="Open menu" onClick={onMenu}>
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </nav>
    </header>
  );
}
