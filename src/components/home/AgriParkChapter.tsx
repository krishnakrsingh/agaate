import agroParkImage from "@/assets/agro-park.jpg";
import { Eyebrow, TextAction } from "./HomeShared";
import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

export default function AgriParkChapter() {
  const { t } = useTranslation("agri-park");
  const sectionRef = useHomeChapterReveal();
  const zones = t("agriPark.zones", { returnObjects: true }) as string[];
  return (
    <section
      ref={sectionRef}
      id="agri-park"
      className="scroll-mt-20 bg-card px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div data-home-reveal className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Eyebrow>{t("agriPark.eyebrow")}</Eyebrow>
              <h2 className="mt-6 font-serif text-[clamp(3rem,5.2vw,5.6rem)] leading-[0.91] tracking-[-0.06em] text-[#143D31]">
                {t("agriPark.title")}
              </h2>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 border-t border-[#174735]/15 pt-6">
                {Array.isArray(zones) &&
                  zones.map((zone, index) => (
                    <div
                      key={index}
                      className="flex items-baseline justify-between border-b border-[#174735]/10 pb-2.5"
                    >
                      <span className="font-serif text-[1.15rem] tracking-[-0.02em] text-[#143D31]">
                        {zone}
                      </span>
                      <span className="font-jet text-[9px] text-[#5D8D53]">0{index + 1}</span>
                    </div>
                  ))}
              </div>
              <TextAction href="/agri-park">{t("agriPark.cta")}</TextAction>
            </div>
          </div>
          <div data-home-reveal className="lg:col-span-7 lg:col-start-6">
            <img
              src={agroParkImage}
              alt={t("agriPark.eyebrow")}
              className="aspect-[16/9] w-full object-cover"
            />
            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-[#566C5D]">
              {t("agriPark.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
