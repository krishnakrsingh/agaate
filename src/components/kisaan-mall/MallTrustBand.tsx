import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/common/motion";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { getMallIcon } from "./mall-icon-map";

export default function MallTrustBand() {
  const { i18n } = useTranslation();
  const page = useKisaanMallPage();
  const isHindi = i18n.language?.startsWith("hi");
  const section = page.trust;

  return (
    <section
      aria-labelledby="trust-mall-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        <Reveal variant="fade-up" className="max-w-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? section.badgeHi : section.badgeEn}
            </p>
          </div>
          <h2
            id="trust-mall-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            {isHindi ? section.titleHi : section.titleEn}
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.trustItems.map((item) => {
              const Icon = getMallIcon(item.iconKey);
              const label = isHindi ? item.labelHi : item.labelEn;
              const value = isHindi ? item.valueHi : item.valueEn;
              const hint = isHindi ? item.hintHi : item.hintEn;

              return (
                <div
                  key={item.labelEn}
                  className="rounded-2xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {label}
                    </p>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-4 w-4 text-[#5d7d37]" weight="fill" />
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#143d31] tracking-tight">
                    {value}
                  </p>
                  <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#4f624f]">{hint}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
