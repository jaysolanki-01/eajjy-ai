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
            <div className="foot-office">
              <h4>Office — India</h4>
              <address>
                C-1102, PNTC, Times Of India Press Road,<br />
                Vejalpur, Ahmedabad 380015
              </address>
            </div>
          </div>
          <div><h4>Services</h4><ul>
            <li><Link to="/services/business-process-automation">Business Process Automation</Link></li>
            <li><Link to="/services/ai-product-development">AI Product Development</Link></li>
            <li><Link to="/services/vibe-coding">Vibe Coding</Link></li>
            <li><Link to="/services/n8n-automation">N8n Automation</Link></li>
            <li><Link to="/services/ai-automation-consultancy">AI Consultancy</Link></li>
            <li><Link to="/services/llm-rag-solutions">LLM &amp; RAG Solutions</Link></li>
          </ul></div>
          <div><h4>Company</h4><ul>
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/use-cases">Use Cases</Link></li>
            <li><Link to="/process">Our Process</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul></div>
          <div><h4>Get Started</h4><ul>
            <li><Link to="/hire-ai-automation-expert">Hire an Expert</Link></li>
            <li><Link to="/contact">Free Audit</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul></div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 EAJJY AI. All rights reserved.</span>
          <span>Built by <a href="https://sarvopaya.com" target="_blank" rel="noopener noreferrer" className="foot-credit">Sarvopaya</a></span>
        </div>
      </div>
    </footer>
  );
}
