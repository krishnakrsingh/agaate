import { useRef } from "react";
import nurseryImage from "@/assets/hero-plant.jpg";
import { Eyebrow, PrimaryCta } from "./HomeShared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export default function NurseryChapter() {
  const { t } = useTranslation("nursery");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="smart-nursery"
      className="scroll-mt-20 bg-forest-deep px-6 py-20 text-cream md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Eyebrow inverse>{t("nursery.eyebrow")}</Eyebrow>
              <h2 className="mt-6 max-w-xl font-display font-light text-[clamp(3rem,5.2vw,5.6rem)] leading-[1.02] tracking-[-0.035em]">
                {t("nursery.title")}
              </h2>
              <p className="mt-7 max-w-md text-[16px] leading-7 text-cream/65">{t("nursery.desc")}</p>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-8 border-t border-cream/15 pt-8 mt-12 lg:mt-16">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx}>
                    <h3 className="font-display font-medium text-[1.1rem] leading-tight tracking-[-0.02em]">
                      {t(`nursery.items.${idx}.title` as any)}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-cream/60">
                      {t(`nursery.items.${idx}.desc` as any)}
                    </p>
                  </div>
                ))}
              </div>
              <PrimaryCta href="/services/nursery">{t("nursery.cta")}</PrimaryCta>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <img
              src={nurseryImage}
              alt="Young plants growing in a nursery"
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="mt-4 font-jet text-[10px] uppercase tracking-[0.1em] text-cream/45">
              {t("nursery.caption")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
