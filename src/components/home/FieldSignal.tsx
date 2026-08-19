import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_EN = "Just real science on the ground.";
const HEADLINE_HI = "जमीन पर सच्चा कृषि विज्ञान।";

function getGraphemes(text: string, isHindi: boolean): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(isHindi ? "hi" : "en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return text.split("");
}

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

    // 1. Build character elements & cursor
    h2.innerHTML = "";
    const chars: HTMLSpanElement[] = [];
    const words = headline.split(" ");

    // Blinking typewriter cursor element
    const cursor = document.createElement("span");
    cursor.className =
      "inline-block w-[3px] sm:w-[4px] md:w-[5px] lg:w-[6px] h-[0.82em] bg-[#174436] ml-1.5 align-middle rounded-xs animate-typewriter-cursor";
    cursor.setAttribute("aria-hidden", "true");

    words.forEach((word, wi) => {
      const wordWrapper = document.createElement("span");
      wordWrapper.className = "inline-block whitespace-nowrap";
      wordWrapper.setAttribute("aria-hidden", "true");

      const graphemes = getGraphemes(word, isHindi);
      graphemes.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        wordWrapper.appendChild(charSpan);
        chars.push(charSpan);
      });

      h2.appendChild(wordWrapper);

      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        space.style.opacity = "0";
        space.setAttribute("aria-hidden", "true");
        h2.appendChild(space);
        chars.push(space);
      }
    });

    // Place initial cursor at start
    const firstChar = chars[0];
    if (firstChar && firstChar.parentNode) {
      firstChar.parentNode.insertBefore(cursor, firstChar);
    } else {
      h2.appendChild(cursor);
    }

    gsap.set(slide, {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: "filter",
    });

    const ctx = gsap.context(() => {
      // 2. Discrete Letter-by-Letter Typewriter Timeline
      const typeTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "restart none none reverse",
        },
      });

      chars.forEach((charSpan, i) => {
        typeTl.to(
          charSpan,
          {
            opacity: 1,
            duration: 0.001,
            ease: "none",
            onStart: () => {
              charSpan.after(cursor);
            },
            onReverseComplete: () => {
              if (i === 0) {
                const first = chars[0];
                if (first && first.parentNode) {
                  first.parentNode.insertBefore(cursor, first);
                }
              } else {
                const prev = chars[i - 1];
                if (prev) {
                  prev.after(cursor);
                }
              }
            },
          },
          i * 0.045
        );
      });

      // 3. Pin section strictly at the top of the viewport
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
  }, [headline, isHindi]);

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
