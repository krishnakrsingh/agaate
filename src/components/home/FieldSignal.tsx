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

    // Split every headline into word <span>s
    const wordSpans: HTMLSpanElement[][] = [];

    headlineRefs.current.forEach((h2, idx) => {
      if (!h2) return;
      const text = h2.textContent || "";
      h2.textContent = ""; // clear

      const spans: HTMLSpanElement[] = [];
      text.split(" ").forEach((word, wi) => {
        if (wi > 0) {
          // Add a space text node between words
          h2.appendChild(document.createTextNode(" "));
        }
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(8px)";
        span.style.filter = "blur(3px)";
        h2.appendChild(span);
        spans.push(span);
      });
      wordSpans[idx] = spans;
    });

    // Set initial visibility: only first slide visible
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, { opacity: i === 0 ? 1 : 0 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    headlines.forEach((_, i) => {
      const slide = slideRefs.current[i];
      const words = wordSpans[i];
      if (!slide || !words) return;

      if (i === 0) {
        // First slide: just type words in
        tl.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.12,
          stagger: 0.06,
          ease: "power2.out",
        });
        // Hold, then fade out
        tl.to(slide, {
          opacity: 0,
          duration: 0.4,
          ease: "sine.inOut",
        }, "+=0.2");
      } else {
        // Subsequent slides: fade in container, type words, then fade out
        tl.to(slide, {
          opacity: 1,
          duration: 0.25,
          ease: "sine.inOut",
        }, "-=0.15");

        tl.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.12,
          stagger: 0.06,
          ease: "power2.out",
        }, "-=0.05");

        // If not last slide, fade out
        if (i < headlines.length - 1) {
          tl.to(slide, {
            opacity: 0,
            duration: 0.4,
            ease: "sine.inOut",
          }, "+=0.2");
        } else {
          // Last slide: hold it visible
          tl.to(slide, { opacity: 1, duration: 0.3 });
        }
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
      <div className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {headlines.map((text, i) => (
            <div
              key={i}
              ref={(el) => setSlideRef(el, i)}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 will-change-transform"
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
