import { useEffect } from "react";
import gsap from "gsap";

export default function useHeroEntrance() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = document.querySelectorAll(".stage .panel");
    if (!panels.length || reduce) return;

    gsap.fromTo(panels, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);
}
