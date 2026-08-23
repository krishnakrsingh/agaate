import { Reveal } from "@/components/common/motion";
import { getCmsIcon } from "@/components/careers/icon-map";
import { useAboutPage } from "@/contexts/AboutPageContext";

export default function ValuesTriptych({ isHi = false }: { isHi?: boolean }) {
  const { guarantees } = useAboutPage();

  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Our Three Non-Negotiable Pillars
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="values-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl"
            >
              Practical research, quality inputs, and farmer-first thinking
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              These three pillars define every decision at Agaate — from the seeds we source to the
              advisories we deliver and the buyback agreements we honour.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-2">
            {guarantees.map((g) => {
              const Icon = getCmsIcon(g.iconKey);
              return (
                <div
                  key={g.titleEn}
                  className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-white/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-5 w-5 text-[#143d31]" weight="duotone" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                      {isHi ? g.titleHi : g.titleEn}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f]">
                      {isHi ? g.descHi : g.descEn}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#143d31]/10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {isHi ? g.badgeHi : g.badgeEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
