import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHomeChapterReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-home-reveal]");
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        targets,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return sectionRef;
}
