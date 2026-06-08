import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo size="lg" />
            <p className="foot-about">Advanced AI &amp; automation systems built for modern professional services firms. Scale revenue without scaling headcount.</p>
          </div>
          <div><h4>Services</h4><ul>
            <li><Link to="/services">Business Process Automation</Link></li>
            <li><Link to="/services">AI Product Development</Link></li>
            <li><Link to="/services">Vibe Coding</Link></li>
            <li><Link to="/services">N8n Automation</Link></li>
            <li><Link to="/services">AI Consultancy</Link></li>
          </ul></div>
          <div><h4>Company</h4><ul>
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/use-cases">Use Cases</Link></li>
            <li><Link to="/process">Our Process</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul></div>
          <div><h4>Get Started</h4><ul>
            <li><Link to="/hire">Hire AI Developer</Link></li>
            <li><Link to="/contact">Free Audit</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul></div>
        </div>
        <div className="foot-bottom"><span>© 2026 EAJJY AI. All rights reserved.</span><span>Advanced AI systems built for modern businesses.</span></div>
      </div>
    </footer>
  );
}
