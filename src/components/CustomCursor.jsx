import React, { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const dot = document.getElementById("cdot");
    const ring = document.getElementById("cring");
    let mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my, rx = mx, ry = my, raf;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move, { passive: true });

    const sel = "a,button,summary,.svc,.step,.node,.int-pill,.cmp-col";
    const on = () => document.body.classList.add("cursor-hover");
    const off = () => document.body.classList.remove("cursor-hover");
    const hovers = Array.from(document.querySelectorAll(sel));
    hovers.forEach((el) => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });

    const loop = () => {
      dx += (mx - dx) * 0.35; dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (dot) dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      hovers.forEach((el) => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" id="cring" />
      <div className="cursor-dot" id="cdot" />
    </>
  );
}
