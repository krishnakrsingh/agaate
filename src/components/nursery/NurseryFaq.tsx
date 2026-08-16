import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { FAQS } from "./nursery-data";

export function NurseryFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="nursery-faq" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know."
        description="Clear, transparent answers about plug seedling dispatch, germination guarantees, and facility tours."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
              >
                <span className="font-serif text-lg font-bold text-forest-deep">{faq.q}</span>
                <CaretDown
                  className={`h-5 w-5 shrink-0 text-forest transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/60 bg-bone/50 px-6 pb-6 pt-4 text-sm leading-relaxed text-forest/80">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
