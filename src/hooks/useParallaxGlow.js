import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useParallaxGlow(dep) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.querySelectorAll(".glow-spot").forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.15;
      gsap.to(el, {
        y: () => el.offsetHeight * speed * 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [dep]);
}
