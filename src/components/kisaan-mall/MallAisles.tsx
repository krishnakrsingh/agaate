import { Check, ArrowUpRight } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/common/motion";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { getMallIcon } from "./mall-icon-map";
import { track } from "@/lib/analytics";

export default function MallAisles() {
  const { i18n } = useTranslation();
  const page = useKisaanMallPage();
  const { whatsappUrlWithText } = useSiteContact();
  const isHindi = i18n.language?.startsWith("hi");
  const section = page.aisles;

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="border-t border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        <Reveal variant="fade-up" className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? section.badgeHi : section.badgeEn}
            </p>
          </div>
          <h2
            id="categories-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]"
          >
            {isHindi ? section.titleHi : section.titleEn}
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
            {isHindi ? section.descriptionHi : section.descriptionEn}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {page.categories.map((cat, idx) => {
            const Icon = getMallIcon(cat.iconKey);
            const title = isHindi ? cat.titleHi : cat.titleEn;
            const tag = isHindi ? cat.tagHi : cat.tagEn;
            const desc = isHindi ? cat.descHi : cat.descEn;
            const examples = isHindi ? cat.examplesHi : cat.examplesEn;
            const badge = isHindi ? cat.badgeHi : cat.badgeEn;

            return (
              <Reveal key={cat.id} variant="fade-up" delay={idx * 0.06}>
                <div className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-[#143d31]/10 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31] group-hover:bg-[#143d31] group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" weight="fill" />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] bg-[#143d31]/5 px-3 py-1 rounded-full border border-[#143d31]/10">
                        {badge}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {tag}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#143d31] mt-1">
                      {title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#4f624f] mt-2">
                      {desc}
                    </p>

                    <div className="mt-5 border-t border-[#143d31]/10 pt-4 space-y-2">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]/70">
                        {isHindi ? "प्रमुख उत्पाद / किस्में:" : "Key Formulations / SKUs:"}
                      </p>
                      <ul className="space-y-1.5">
                        {examples.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 font-sans text-xs text-[#143d31]"
                          >
                            <Check className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" weight="bold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#143d31]/10 pt-4">
                    <a
                      href={whatsappUrlWithText(
                        `Hi Agaate, I am looking for details and pricing for ${title}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("kisaan_mall_category_clicked", { category: cat.id })}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#143d31] hover:text-[#5d7d37] transition-colors"
                    >
                      <span>{isHindi ? "दरें व उपलब्धता जानें" : "Inquire Stock & Rates"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                    </a>
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
