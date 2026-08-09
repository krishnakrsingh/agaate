import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown } from "lucide-react";
import { EASE, Reveal, SectionHeader, motion } from "@/components/common/motion";
import { FAQS } from "./data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl text-left">
      <SectionHeader
        align="center"
        eyebrow="Frequent questions"
        title={
          <>
            Seedling <span className="italic text-terracotta">Nursery Guide.</span>
          </>
        }
      />
      <div className="mt-10 space-y-4">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} variant="fade-up" delay={i * 0.08}>
              <div
                className={`overflow-hidden rounded-2xl border bg-card transition-colors duration-300 ${
                  isOpen ? "border-forest/30" : "border-border hover:border-forest/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center gap-3 p-6 text-left"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-forest/40" />
                  <h4 className="flex-1 font-serif text-xl font-bold text-forest-deep">{f.q}</h4>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="shrink-0 text-forest/50"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="mx-6 mb-6 border-l border-forest/10 pl-5 text-sm leading-relaxed text-forest/70">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
