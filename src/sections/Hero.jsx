import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../components/Arrow.jsx";
import BookButton from "../components/BookButton.jsx";
import useTranslation from "../hooks/useTranslation.js";

export default function Hero() {
  const t = useTranslation();
  const h = t.hero;

  return (
    <section className="wrap">
      <div className="hero">
        <div className="reveal">
          <div className="badge"><span className="live" />{h.badge}</div>
          <h1 className="head"><span className="accent">{h.headline}</span></h1>
          <p className="sub">{h.sub}</p>
          <div className="ctas">
            <BookButton>{h.cta1}</BookButton>
            <Link to="/process" className="btn btn-ghost">{h.cta2}</Link>
          </div>
          <div className="trust">
            <div><div className="ti">{h.stat1Value}</div><div className="tl">{h.stat1Label}</div></div>
            <div className="div" />
            <div><div className="ti">{h.stat2Value}</div><div className="tl">{h.stat2Label}</div></div>
          </div>
        </div>
        <div className="stage reveal-r">
          <svg className="wires" viewBox="0 0 600 540" preserveAspectRatio="none">
            <path d="M150 350 C 250 350, 320 240, 470 240" />
            <path d="M150 280 C 300 280, 380 420, 500 420" />
            <circle cx="470" cy="240" r="3.5" /><circle cx="500" cy="420" r="3.5" />
          </svg>
          <div className="panel p-main">
            <div className="ch"><div><div className="ct">Order Automation Engine</div><div className="cs">Orders processed · last 24h</div></div><span className="tag">● LIVE</span></div>
            <div className="metric"><span className="big">2,341</span><span className="delta">▲ 34%</span></div>
            <svg className="chart" viewBox="0 0 320 84" preserveAspectRatio="none">
              <defs><linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,43,43,.35)" /><stop offset="1" stopColor="rgba(255,43,43,0)" /></linearGradient></defs>
              <path d="M0,66 C40,52 70,58 100,38 C130,20 160,46 200,28 C240,12 270,36 320,16 L320,84 L0,84 Z" fill="url(#rf)" opacity=".9" />
              <path className="line" d="M0,66 C40,52 70,58 100,38 C130,20 160,46 200,28 C240,12 270,36 320,16" />
            </svg>
          </div>
          <div className="panel p-pipe">
            <div className="ch"><div className="ct">Fulfilment Pipeline</div><div className="cs">3 nodes · auto-running</div></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 3H8l-2 4h12z" /></svg></div><div><div className="nt">Order Received</div><div className="ns">verified in 2s</div></div><span className="st" /></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg></div><div><div className="nt">Inventory Check</div><div className="ns">all channels synced</div></div><span className="st" /></div>
            <div className="node"><div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 11V3l-9 9 9 8z" /></svg></div><div><div className="nt">Dispatched to 3PL</div><div className="ns">routing now</div></div><span className="st" /></div>
          </div>
          <div className="panel p-stat a"><div className="sl">Orders / day</div><div className="sb">+40%</div>
            <div className="bars">{[45,60,52,80,70,95].map((hgt,i)=><i key={i} style={{height:hgt+"%"}} />)}</div></div>
          <div className="panel p-stat b"><div className="ch"><div className="ct" style={{fontSize:12}}>Fulfilment Accuracy</div><span className="tag">+1.8%</span></div><div className="sb">99.6%</div><div className="sl">Across all channels &amp; 3PLs</div></div>
        </div>
      </div>
    </section>
  );
}
