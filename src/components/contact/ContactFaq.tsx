import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { EASE, Reveal } from "@/components/common/motion";
import { useContactPage } from "@/contexts/ContactPageContext";
import { track } from "@/lib/analytics";

export default function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const location = useLocation();
  const isHi = location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const page = useContactPage();
  const faqs = page.faqs.map((f) => ({
    q: isHi ? f.qHi : f.qEn,
    a: isHi ? f.aHi : f.aEn,
  }));

  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 space-y-8 sm:space-y-10">
        {/* Header */}
        <Reveal variant="fade-up" className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHi ? page.faqBadgeHi : page.faqBadgeEn}
            </p>
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            {isHi ? page.faqTitleHi : page.faqTitleEn}
          </h2>
        </Reveal>

        {/* Wider Clean Card Accordion */}
        <Reveal variant="fade-up" delay={0.1}>
          <div className="divide-y divide-[#143d31]/10 rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-8 md:p-10 shadow-xs">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="py-5 sm:py-6 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      const next = isOpen ? null : i;
                      setOpen(next);
                      if (next !== null) track("faq_opened", { index: i });
                    }}
                    className="flex w-full items-center justify-between gap-6 text-left focus-visible:outline-none cursor-pointer group"
                  >
                    <h3 className="flex-1 font-display text-base sm:text-lg md:text-xl font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                      {f.q}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#143d31] text-[#a3e635]"
                          : "bg-[#143d31]/5 text-[#143d31] group-hover:bg-[#143d31]/10"
                      }`}
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
                        <p className="pt-3.5 pr-8 font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
