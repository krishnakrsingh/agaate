import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Light opacity + y reveal for section headers / marked nodes.
 * Respects prefers-reduced-motion. Hero / CropWorld stay the motion heroes.
 */
export function useSectionReveal(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const marked = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);
      const targets =
        marked.length > 0
          ? marked
          : gsap.utils.toArray<HTMLElement>("h2, h3", section).slice(0, 2);

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount; sectionRef is stable
  }, []);
}
