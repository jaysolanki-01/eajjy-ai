import React, { useEffect, useRef } from "react";

/* Animated neural-network canvas + ambient glow / noise / vignette layers. */
export default function Background() {
  const nnRef = useRef(null);

  useEffect(() => {
    const canvas = nnRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let w = 0, h = 0, nodes = [], raf, mouse = { x: -9999, y: -9999 };
    const MAXD = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      const n = Math.max(28, Math.min(72, Math.floor((w * h) / 24000)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 1,
      }));
    };
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < MAXD) {
            ctx.strokeStyle = `rgba(255,43,43,${(1 - d / MAXD) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 180) {
          ctx.strokeStyle = `rgba(255,90,90,${(1 - d / 180) * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const p of nodes) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,100,100,.8)"; ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onResize = () => { resize(); init(); };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize(); init(); frame();
    window.addEventListener("resize", onResize);
    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div className="bg bg-glow" />
      <canvas className="bg bg-nn" ref={nnRef} />
      <div className="bg bg-noise" />
      <div className="bg bg-vig" />
    </>
  );
}
