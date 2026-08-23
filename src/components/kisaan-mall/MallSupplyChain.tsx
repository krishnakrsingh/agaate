import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/common/motion";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { getMallIcon } from "./mall-icon-map";

export default function MallSupplyChain() {
  const { i18n } = useTranslation();
  const page = useKisaanMallPage();
  const isHindi = i18n.language?.startsWith("hi");
  const section = page.supplyChain;

  return (
    <section
      id="supply-chain"
      aria-labelledby="supply-chain-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? section.badgeHi : section.badgeEn}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="supply-chain-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1] max-w-xl"
            >
              {isHindi ? section.titleHi : section.titleEn}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4f624f] max-w-md leading-relaxed">
              {isHindi ? section.descriptionHi : section.descriptionEn}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.supplySteps.map((step, idx) => {
            const Icon = getMallIcon(step.iconKey);
            const title = isHindi ? step.titleHi : step.titleEn;
            const desc = isHindi ? step.descHi : step.descEn;

            return (
              <Reveal key={step.step} variant="fade-up" delay={idx * 0.08}>
                <div className="relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-2xl font-black text-[#5d7d37]/40 tracking-wider">{step.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-5 w-5" weight="fill" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#143d31]">{title}</h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f] mt-2">{desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#143d31]/10 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {isHindi ? `चरण ${step.step} पूर्ण` : `Phase ${step.step} Verified`}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
