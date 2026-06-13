import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import BookButton from "../components/BookButton.jsx";

export default function Hero() {
  return (
    <section className="wrap">
      <div className="hero">
        <div className="reveal">
          <div className="badge"><span className="live" />Trusted by <b>professional services firms</b></div>
          <h1 className="head">What Happens When Business Processes <span className="accent">Actually Automate?</span></h1>
          <p className="sub">We build AI and automation systems that <b>eliminate repetitive work</b> in professional services firms. Your team focuses on strategic client work, so you scale revenue without scaling headcount.</p>
          <div className="ctas">
            <BookButton>Book a Free Consultation</BookButton>
            <Link to="/process" className="btn btn-ghost">See How It Works</Link>
          </div>
          <div className="trust">
            <div><div className="ti">30-40%</div><div className="tl">More clients<br />without hiring</div></div>
            <div className="div" />
            <div><div className="ti">90 days</div><div className="tl">To measurable<br />ROI</div></div>
          </div>
        </div>
        <div className="stage reveal-r">
          <svg className="wires" viewBox="0 0 600 540" preserveAspectRatio="none">
            <path d="M150 350 C 250 350, 320 240, 470 240" />
            <path d="M150 280 C 300 280, 380 420, 500 420" />
            <circle cx="470" cy="240" r="3.5" /><circle cx="500" cy="420" r="3.5" />
          </svg>
          <div className="panel p-main">
            <div className="ch"><div><div className="ct">AI Orchestration Engine</div><div className="cs">Real-time throughput · last 24h</div></div><span className="tag">● LIVE</span></div>
            <div className="metric"><span className="big">847K</span><span className="delta">▲ 18.2%</span></div>
            <svg className="chart" viewBox="0 0 320 84" preserveAspectRatio="none">
              <defs><linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,43,43,.35)" /><stop offset="1" stopColor="rgba(255,43,43,0)" /></linearGradient></defs>
              <path d="M0,66 C40,52 70,58 100,38 C130,20 160,46 200,28 C240,12 270,36 320,16 L320,84 L0,84 Z" fill="url(#rf)" opacity=".9" />
              <path className="line" d="M0,66 C40,52 70,58 100,38 C130,20 160,46 200,28 C240,12 270,36 320,16" />
            </svg>
          </div>
          <div className="panel p-pipe">
            <div className="ch"><div className="ct">Automation Pipeline</div><div className="cs">3 nodes</div></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16v6H4zM4 14h10v6H4" /></svg></div><div><div className="nt">Ingest &amp; Parse</div><div className="ns">12ms latency</div></div><span className="st" /></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg></div><div><div className="nt">Reason Engine</div><div className="ns">AI model</div></div><span className="st" /></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 11V3l-9 9 9 8z" /></svg></div><div><div className="nt">Dispatch Action</div><div className="ns">routing now</div></div><span className="st" /></div>
          </div>
          <div className="panel p-stat a"><div className="sl">Hours Saved / wk</div><div className="sb">142h</div>
            <div className="bars">{[60,80,45,95,70,88].map((hgt,i)=><i key={i} style={{height:hgt+"%"}} />)}</div></div>
          <div className="panel p-stat b"><div className="ch"><div className="ct" style={{fontSize:12}}>Data Accuracy</div><span className="tag">+2.1%</span></div><div className="sb">99%</div><div className="sl">Across document processing</div></div>
        </div>
      </div>
    </section>
  );
}
