import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  "Every farmer faces moments where guesswork costs money.",
  "Wrong spray. Weak seeds. Zero guidance.",
  "One bad call costs an entire season.",
  "We replace guesswork with proof.",
];

export default function FieldSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const setSlideRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      slideRefs.current[i] = el;
    },
    [],
  );
  const setHeadlineRef = useCallback(
    (el: HTMLHeadingElement | null, i: number) => {
      headlineRefs.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Split every headline into individual letter/character <span>s
    // Wrap each word in a whitespace-nowrap span so words never wrap mid-word
    const allCharSpans: HTMLSpanElement[][] = [];

    headlineRefs.current.forEach((h2, idx) => {
      if (!h2) return;
      const text = headlines[idx] || "";
      h2.innerHTML = ""; // Clear text

      const slideChars: HTMLSpanElement[] = [];
      const words = text.split(" ");

      words.forEach((word, wi) => {
        const wordWrapper = document.createElement("span");
        wordWrapper.className = "inline-block whitespace-nowrap";

        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.style.display = "inline-block";
          charSpan.style.opacity = "0";
          charSpan.style.transform = "translateY(6px)";
          wordWrapper.appendChild(charSpan);
          slideChars.push(charSpan);
        });

        h2.appendChild(wordWrapper);

        if (wi < words.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.className = "inline-block";
          h2.appendChild(space);
        }
      });

      allCharSpans[idx] = slideChars;
    });

    // 2. Set all slides initially hidden with soft displacement
    slideRefs.current.forEach((slide) => {
      if (slide) {
        gsap.set(slide, { opacity: 0, y: 35, filter: "blur(6px)" });
      }
    });

    // 3. Construct smooth, fluid ScrollTrigger timeline with natural crossfading
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    headlines.forEach((_, i) => {
      const slide = slideRefs.current[i];
      const chars = allCharSpans[i];
      if (!slide || !chars) return;

      const isFirst = i === 0;
      const isLast = i === headlines.length - 1;
      const prevSlide = i > 0 ? slideRefs.current[i - 1] : null;

      // If not first slide, smoothly fade out previous slide with overlap
      if (prevSlide) {
        tl.to(
          prevSlide,
          {
            opacity: 0,
            y: -35,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power2.inOut",
          },
          ">",
        );
      }

      // STEP A: Incoming slide container becomes visible and gently settles
      tl.to(
        slide,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.25,
          ease: "power2.out",
        },
        isFirst ? ">" : "<+=0.1",
      );

      // STEP B: Deliberate, clear typewriter typing letter-by-letter
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          stagger: 0.045,
          ease: "none",
        },
        ">",
      );

      // STEP C: Comfortable hold duration to read the full sentence
      tl.to({}, { duration: 0.65 });

      // If this is the last headline, let it settle gracefully
      if (isLast) {
        tl.to(slide, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 });
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="start-here" className="relative bg-[#fafbf7]">
      <div className="h-[450vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {headlines.map((text, i) => (
            <div
              key={i}
              ref={(el) => setSlideRef(el, i)}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 pointer-events-none will-change-transform"
              style={{ opacity: 0 }}
            >
              <div className="max-w-5xl mx-auto">
                <h2
                  ref={(el) => setHeadlineRef(el, i)}
                  className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-[#143d31] leading-[1.08] [text-wrap:balance]"
                >
                  {text}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
