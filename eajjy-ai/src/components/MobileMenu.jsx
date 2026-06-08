import React from "react";
import { Link } from "react-router-dom";
import { NAV, SERVICES } from "../data/siteData.jsx";
import Logo from "./Logo.jsx";

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={"m-menu" + (open ? " open" : "")}>
      <button className="m-close" aria-label="Close menu" onClick={onClose}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <div className="m-brand">
        <Logo size="xl" onClick={onClose} />
      </div>
      <Link to="/" onClick={onClose}>Home</Link>
      <div className="m-sub">Services</div>
      {SERVICES.map((s) => (<Link key={s.title} to="/services" className="m-svc" onClick={onClose}>{s.title}</Link>))}
      {NAV.map((n) => (<Link key={n.to} to={n.to} onClick={onClose}>{n.label}</Link>))}
      <div className="m-actions">
        <Link to="/hire" className="btn btn-ghost" onClick={onClose}>Hire a Developer</Link>
        <Link to="/contact" className="btn btn-primary" onClick={onClose}>Get Your Free Audit</Link>
      </div>
    </div>
  );
}
