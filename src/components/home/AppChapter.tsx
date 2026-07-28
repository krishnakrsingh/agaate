import { Check } from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import { Eyebrow, ImagePlaceholder, TextAction } from "./HomeShared";

import { useTranslation } from "react-i18next";

export default function AppChapter() {
  const { t } = useTranslation("app-chapter");
  return (
    <section
      id="agaate-app"
      className="scroll-mt-20 bg-[#F2F5EE] px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Integrated Lead Statement Banner */}
        <div className="mb-20 grid gap-8 border-b border-[#143D31]/15 pb-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Eyebrow>{t("app.eyebrow1")}</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,4.8vw,5.2rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              {t("app.title1_1")}{" "}
              <span className="italic text-[#5D8D53]">{t("app.title1_2")}</span>{t("app.title1_3")}
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#566C5D]">
              {t("app.desc1")}
            </p>
          </div>
        </div>

        {/* App & Agronomist Advisory Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{t("app.eyebrow2")}</Eyebrow>
            <h3 className="mt-6 font-serif text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">{t("app.title2")}</h3>
            <p className="mt-6 max-w-sm text-[16px] leading-7 text-[#566C5D]">{t("app.desc2")}</p>
            <div className="mt-8">
              <TextAction href="#start-journey">{t("app.cta")}</TextAction>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ImagePlaceholder
              label={t("app.placeholderLabel")}
              detail={t("app.placeholderDetail")}
              className="min-h-[510px]"
            />
            <p className="mt-4 font-jet text-[9px] uppercase tracking-[0.14em] text-[#718171]">
              {t("app.placeholderCaption")}
            </p>
          </div>

          <div className="lg:col-span-3 lg:pt-32">
            <img
              src={advisorImage}
              alt="Farmer using Agaate advisory"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="mt-7 space-y-5">
              {[0, 1, 2].map((idx) => (
                <p key={idx} className="flex gap-3 text-sm leading-6 text-[#465F4E]">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#4F8553]" />
                  {t(`app.list.${idx}` as any)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
