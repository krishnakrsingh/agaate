import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/components/common/motion";
import { CONTACT_FAQS } from "./data";
import { track } from "@/lib/analytics";

gsap.registerPlugin(useGSAP);

export default function ContactFaq() {
  const containerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          if (reduceMotion) return;

          gsap.fromTo(
            ".faq-header-fade",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="contact-faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5] text-[#143d31] border-b border-[#143d31]/10"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <div className="faq-header-fade space-y-3 text-left mb-10">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              06 · Frequently Asked Agronomy Questions
            </p>
          </div>

          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            Common Inquiry &amp; Field Protocol Answers
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4f624f] leading-relaxed">
            Everything you need to know about our response SLAs, visiting protocols, and diagnostic support.
          </p>
        </div>

        {/* Hairline Accordion */}
        <div className="divide-y divide-[#143d31]/10 border-y border-[#143d31]/10">
          {CONTACT_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    const next = isOpen ? null : i;
                    setOpen(next);
                    if (next !== null) track("faq_opened", { index: i });
                  }}
                  className="cursor-pointer flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/30 transition-colors hover:text-[#5d7d37]"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#143d31]">
                    {f.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#143d31]/10 text-[#5d7d37] shrink-0 shadow-2xs"
                  >
                    <CaretDown className="h-4 w-4" weight="bold" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-8 font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
