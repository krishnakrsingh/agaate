import { Eyebrow, TextAction } from "./HomeShared";

import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

export default function BeyondChapter() {
  const { t } = useTranslation("beyond");
  const sectionRef = useHomeChapterReveal();
  return (
    <section
      ref={sectionRef}
      id="services"
      className="scroll-mt-20 bg-[#DDEBCF] px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-home-reveal>
          <Eyebrow>{t("beyond.eyebrow")}</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,5.5vw,5.9rem)] leading-[0.91] tracking-[-0.06em] text-[#143D31]">
            {t("beyond.title")}
          </h2>
        </div>
        <div data-home-reveal className="mt-16">
          {["/services/farm-tech", "/services/carbon-credits", "/services/big-farm-setup"].map(
            (href, index) => (
              <article
                key={href}
                className="grid gap-5 border-t border-[#174735]/18 py-8 md:grid-cols-[7rem_1.2fr_.8fr] md:items-end md:gap-10"
              >
                <span className="font-jet text-[10px] text-[#5D8D53]">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-[clamp(2rem,3.5vw,3.6rem)] leading-none tracking-[-0.045em] text-[#143D31]">
                    {t(`beyond.items.${index}.title` as any)}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#52685A]">
                    {t(`beyond.items.${index}.desc` as any)}
                  </p>
                </div>
                <TextAction href={href}>{t("beyond.cta")}</TextAction>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
