import { BellRing, Check, CloudSun, Sprout } from "lucide-react";
import advisorImage from "@/assets/about-farmer-advisor.png";
import { Eyebrow, TextAction } from "./HomeShared";

import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

export default function AppChapter() {
  const { t } = useTranslation("app-chapter");
  const sectionRef = useHomeChapterReveal();
  return (
    <section
      ref={sectionRef}
      id="agaate-app"
      className="scroll-mt-20 bg-[#F2F5EE] px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Integrated Lead Statement Banner */}
        <div
          data-home-reveal
          className="mb-20 grid gap-8 border-b border-[#143D31]/15 pb-16 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-3">
            <Eyebrow>{t("app.eyebrow1")}</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 className="max-w-4xl font-serif text-[clamp(2.5rem,4.8vw,5.2rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              {t("app.title1_1")} <span className="italic text-[#5D8D53]">{t("app.title1_2")}</span>
              {t("app.title1_3")}
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#566C5D]">{t("app.desc1")}</p>
          </div>
        </div>

        {/* App & Agronomist Advisory Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div data-home-reveal className="lg:col-span-4">
            <Eyebrow>{t("app.eyebrow2")}</Eyebrow>
            <h3 className="mt-6 font-serif text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.95] tracking-[-0.05em] text-[#143D31]">
              {t("app.title2")}
            </h3>
            <p className="mt-6 max-w-sm text-[16px] leading-7 text-[#566C5D]">{t("app.desc2")}</p>
            <div className="mt-8">
              <TextAction href="#start-journey">{t("app.cta")}</TextAction>
            </div>
          </div>

          <div data-home-reveal className="lg:col-span-5">
            <div className="min-h-[510px] overflow-hidden bg-[#173F32] p-5 text-cream md:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <span className="font-jet text-[9px] font-semibold uppercase tracking-[0.18em] text-[#B7D891]">
                  {t("app.dashboardLabel")}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#A9D274] shadow-[0_0_0_5px_rgba(169,210,116,0.12)]" />
              </div>
              <div className="mt-12 rounded-sm bg-[#F1F5EB] p-5 text-[#143D31] shadow-2xl md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-jet text-[9px] uppercase tracking-[0.15em] text-[#66816B]">
                      {t("app.dashboardField")}
                    </p>
                    <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.04em]">
                      {t("app.dashboardCrop")}
                    </p>
                  </div>
                  <div className="rounded-full bg-[#DCECCB] p-2.5 text-[#4D7D51]">
                    <Sprout className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-8 border-y border-[#143D31]/12 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5A705F]">{t("app.dashboardStage")}</span>
                    <strong>{t("app.dashboardStageValue")}</strong>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden bg-[#DCE6D9]">
                    <div className="h-full w-[58%] bg-[#63925D]" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="border border-[#143D31]/12 p-3">
                    <CloudSun className="h-4 w-4 text-[#5E8B67]" />
                    <p className="mt-4 font-jet text-[8px] uppercase tracking-[0.13em] text-[#708474]">
                      {t("app.dashboardWeather")}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t("app.dashboardWeatherValue")}</p>
                  </div>
                  <div className="border border-[#143D31]/12 p-3">
                    <BellRing className="h-4 w-4 text-[#5E8B67]" />
                    <p className="mt-4 font-jet text-[8px] uppercase tracking-[0.13em] text-[#708474]">
                      {t("app.dashboardAction")}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t("app.dashboardActionValue")}</p>
                  </div>
                </div>
              </div>
              <p className="mt-7 max-w-xs text-sm leading-6 text-cream/70">
                {t("app.dashboardNote")}
              </p>
            </div>
          </div>

          <div data-home-reveal className="lg:col-span-3 lg:pt-32">
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
