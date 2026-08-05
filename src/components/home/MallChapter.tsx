import { MapPin } from "lucide-react";
import seedsImage from "@/assets/product-seeds.jpg";
import { Eyebrow, TextAction } from "./HomeShared";

import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

export default function MallChapter() {
  const { t } = useTranslation("mall");
  const sectionRef = useHomeChapterReveal();
  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="scroll-mt-20 bg-card px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-home-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Eyebrow>{t("mall.eyebrow1")}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.06em] text-[#143D31]">
              {t("mall.title1_1")}{" "}
              <span className="italic text-[#5D8D53]">{t("mall.title1_2")}</span>
            </h2>
          </div>
        </div>

        <div data-home-reveal className="mt-16 grid lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative min-h-[460px] overflow-hidden bg-[#DDEBCF] p-7 md:p-10">
              <p className="font-jet text-[10px] uppercase tracking-[0.18em] text-[#477253]">
                {t("mall.placeholderLabel")}
              </p>
              <p className="mt-5 max-w-xs font-serif text-[clamp(2rem,3.4vw,3.6rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
                {t("mall.placeholderDetail")}
              </p>
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-px border-t border-[#174735]/15 bg-[#174735]/15">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-28 bg-[#CBE0AF]" />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <p className="max-w-md text-[17px] leading-8 text-[#566C5D]">{t("mall.desc")}</p>
            <div className="mt-12 border-y border-[#174735]/15">
              {[0, 1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="flex items-baseline justify-between gap-6 border-b border-[#174735]/15 py-5 last:border-b-0"
                >
                  <span className="font-serif text-[1.65rem] leading-none tracking-[-0.035em] text-[#143D31]">
                    {t(`mall.items.${index}` as any)}
                  </span>
                  <span className="font-jet text-[10px] text-[#5D8D53]">0{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextAction href="/services/kisaan-mall">{t("mall.cta")}</TextAction>
              <span className="flex items-center gap-2 text-sm text-[#566C5D]">
                <MapPin className="h-4 w-4 text-[#4F8553]" /> Bhora Kalan, Gurugram
              </span>
            </div>
          </div>
        </div>

        <div
          data-home-reveal
          className="mt-16 grid overflow-hidden bg-[#DDEBCF] md:grid-cols-[1fr_1.65fr]"
        >
          <div className="p-7 md:p-10">
            <Eyebrow>{t("mall.eyebrow2")}</Eyebrow>
            <p className="mt-12 font-serif text-[clamp(2rem,3.5vw,3.4rem)] leading-[0.98] tracking-[-0.045em] text-[#143D31]">
              {t("mall.title2")}
            </p>
          </div>
          <img
            src={seedsImage}
            alt="Agaate agricultural input products"
            className="h-full min-h-64 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
