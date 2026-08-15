import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  "Every farmer faces moments where guesswork costs money.",
  "Something is wrong with the crop.",
  "Which input is actually right?",
  "Planning alone, without a guide.",
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

    // 2. Set all slides initially hidden except the first slide container
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, { opacity: i === 0 ? 1 : 0, y: 0 });
      }
    });

    // 3. Construct clean, perfectly scalable ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    headlines.forEach((_, i) => {
      const slide = slideRefs.current[i];
      const chars = allCharSpans[i];
      if (!slide || !chars) return;

      const isFirst = i === 0;
      const isLast = i === headlines.length - 1;

      // STEP A: Make this slide visible
      if (isFirst) {
        tl.set(slide, { opacity: 1, y: 0 });
      } else {
        tl.to(
          slide,
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          ">",
        );
      }

      // STEP B: Type each character in letter-by-letter
      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.04,
          stagger: 0.02,
          ease: "none",
        },
        ">",
      );

      // STEP C: Hold the completed sentence so the user can read it clearly
      tl.to({}, { duration: 0.35 });

      // STEP D: Exit animation (for all except the last headline)
      if (!isLast) {
        tl.to(
          slide,
          {
            opacity: 0,
            y: -25,
            duration: 0.2,
            ease: "power2.in",
          },
          ">",
        );
      } else {
        // Last headline stays fully visible and settled
        tl.to(slide, { opacity: 1, duration: 0.2 });
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
                  className="font-sans text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#143d31] leading-[1.05]"
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
