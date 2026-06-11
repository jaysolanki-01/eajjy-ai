import { useEffect } from "react";

/* Adds the "in" class to .reveal* / .stagger elements as they enter the viewport.
   Re-scans whenever the dependency (e.g. route path) changes. */
export default function useScrollReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-l,.reveal-r,.reveal-scale,.stagger");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
