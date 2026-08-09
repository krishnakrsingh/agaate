import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant = "fade-up" | "slide-right" | "slide-left" | "scale-up" | "3d-flip";

export function useHomeChapterReveal(variant: RevealVariant = "fade-up") {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-home-reveal]");
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let fromVars: gsap.TweenVars = { autoAlpha: 0 };
      
      switch (variant) {
        case "fade-up":
          fromVars = { autoAlpha: 0, y: 40, scale: 0.96 };
          break;
        case "slide-right":
          fromVars = { autoAlpha: 0, x: -50 };
          break;
        case "slide-left":
          fromVars = { autoAlpha: 0, x: 50 };
          break;
        case "scale-up":
          fromVars = { autoAlpha: 0, scale: 0.8 };
          break;
        case "3d-flip":
          fromVars = { autoAlpha: 0, rotationX: -30, y: 30, transformPerspective: 1000 };
          break;
      }

      gsap.fromTo(
        targets,
        fromVars,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
          clearProps: "transform",
        },
      );
    });

    return () => mm.revert();
  }, [variant]);

  return sectionRef;
}
