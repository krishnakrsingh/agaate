import { useRef } from "react";
import agroParkImage from "@/assets/agro-park.jpg";
import { Eyebrow, PrimaryCta } from "./HomeShared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export default function AgriParkChapter() {
  const { t } = useTranslation("agri-park");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const zones = t("agriPark.zones", { returnObjects: true }) as string[];
  return (
    <section
      ref={sectionRef}
      id="agri-park"
      className="scroll-mt-20 bg-card px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Eyebrow>{t("agriPark.eyebrow")}</Eyebrow>
              <h2 className="mt-6 font-display font-light text-[clamp(3rem,5.2vw,5.6rem)] leading-[1.02] tracking-[-0.035em] text-forest-deep">
                {t("agriPark.title")}
              </h2>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 border-t border-ink/10 pt-6">
                {Array.isArray(zones) &&
                  zones.map((zone, index) => (
                    <div
                      key={index}
                      className="border-b border-ink/10 pb-2.5"
                    >
                      <span className="font-display font-medium text-[1.15rem] tracking-[-0.02em] text-forest-deep">
                        {zone}
                      </span>
                    </div>
                  ))}
              </div>
              <PrimaryCta href="/agri-park">{t("agriPark.cta")}</PrimaryCta>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <img
              src={agroParkImage}
              alt={t("agriPark.eyebrow")}
              className="aspect-[16/9] w-full object-cover"
            />
            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-ink/60">{t("agriPark.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
