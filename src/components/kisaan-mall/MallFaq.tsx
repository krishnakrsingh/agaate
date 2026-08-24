import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { EASE, Reveal } from "@/components/common/motion";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { track } from "@/lib/analytics";

export default function MallFaq() {
  const { i18n } = useTranslation();
  const page = useKisaanMallPage();
  const isHindi = i18n.language?.startsWith("hi");
  const section = page.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-mall-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 space-y-10">
        <Reveal variant="fade-up" className="max-w-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? section.badgeHi : section.badgeEn}
            </p>
          </div>
          <h2
            id="faq-mall-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            {isHindi ? section.titleHi : section.titleEn}
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="divide-y divide-[#143d31]/10 rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-8 shadow-xs">
            {page.faqs.map((f, i) => {
              const isOpen = open === i;
              const q = isHindi ? f.qHi : f.qEn;
              const a = isHindi ? f.aHi : f.aEn;

              return (
                <div key={f.qEn} className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      const next = isOpen ? null : i;
                      setOpen(next);
                      if (next !== null) track("kisaan_mall_faq_opened", { index: i });
                    }}
                    className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none"
                  >
                    <h3 className="flex-1 font-display text-base sm:text-lg font-bold text-[#143d31]">{q}</h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#143d31]/5 text-[#143d31]"
                    >
                      <CaretDown className="h-3.5 w-3.5" weight="bold" />
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
                      >
                        <p className="pt-3 font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">{a}</p>
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
