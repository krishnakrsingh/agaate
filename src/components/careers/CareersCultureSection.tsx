import { motion } from "framer-motion";
import { getCmsIcon } from "@/components/careers/icon-map";
import type { CmsIconKey } from "@/lib/cms-types";

export type LocalizedCultureCard = {
  tag: string;
  title: string;
  desc: string;
  iconKey: CmsIconKey;
};

export function CareersCultureSection({ cards }: { cards: LocalizedCultureCard[] }) {
  return (
    <section className="relative bg-[#f4f8f5] text-[#143d31]">
      <div className="space-y-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              Life & Culture
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#143d31] max-w-xl leading-[1.15]">
              Where Agronomic Science Meets Operational Rigour.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4f624f] max-w-md leading-relaxed">
              We believe lasting agricultural transformation happens by testing systems under open
              sun and aligning every metric directly with farmer prosperity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10">
          {cards.map((card, idx) => {
            const Icon = getCmsIcon(card.iconKey);

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-200 hover:bg-white/60"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                      {card.tag}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635] shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-[#a3e635]" weight="duotone" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
