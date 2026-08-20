import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { CONTACT_FAQS } from "./data";
import { track } from "@/lib/analytics";

export default function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-neutral-200 bg-white py-20 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-forest">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep"
          >
            Common questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
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
                  className="flex w-full items-center gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest/40"
                >
                  <h3 className="flex-1 text-base font-semibold text-forest-deep md:text-lg">
                    {f.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="shrink-0 text-neutral-400"
                  >
                    <CaretDown className="h-4 w-4" />
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
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-neutral-600">{f.a}</p>
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
