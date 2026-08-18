import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_EN = "Just real science on the ground.";
const HEADLINE_HI = "जमीन पर सच्चा कृषि विज्ञान।";

export default function FieldSignal() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const headline = isHindi ? HEADLINE_HI : HEADLINE_EN;

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const h2 = headlineRef.current;
    const slide = slideRef.current;
    if (!section || !h2 || !slide) return;

    // 1. Split headline into individual letter/character <span>s
    h2.innerHTML = ""; // Clear text
    const chars: HTMLSpanElement[] = [];
    const words = headline.split(" ");

    words.forEach((word, wi) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.className = "inline-block whitespace-nowrap";
      wordWrapper.setAttribute("aria-hidden", "true");

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(8px)";
        wordWrapper.appendChild(charSpan);
        chars.push(charSpan);
      });

      h2.appendChild(wordWrapper);

      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.className = "inline-block";
        space.setAttribute("aria-hidden", "true");
        h2.appendChild(space);
      }
    });

    // 2. Set initial slide container state
    gsap.set(slide, {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: "filter",
    });

    const ctx = gsap.context(() => {
      // 3. Typewriter animation: types out smoothly as section comes up to the top
      const typeTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 10%",
          scrub: 0.35,
        },
      });

      typeTl.to(chars, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power1.out",
      });

      // 4. Pin section strictly at the top of the viewport (pinSpacing: false)
      // The subsequent section will scroll directly UP OVER this pinned section
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: false,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.1}`,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [headline]);

  return (
    <section
      ref={sectionRef}
      id="start-here"
      className="relative z-0 h-screen w-full bg-[#fafbf7] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={slideRef}
        className="w-full flex flex-col items-center justify-center text-center px-6 md:px-16"
      >
        <div className="max-w-5xl mx-auto">
          <h2
            ref={headlineRef}
            aria-label={headline}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-medium tracking-[-0.035em] text-[#174436] leading-[1.08] [text-wrap:balance]"
          >
            {headline}
          </h2>
        </div>
      </div>
    </section>
  );
}
