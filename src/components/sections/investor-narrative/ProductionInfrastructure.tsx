import nurseryImg from "@/assets/zones/polyhouse_nursery.png";
import { Eyebrow, InlineCta } from "./Shared";
import { useTranslation } from "react-i18next";

export function ProductionInfrastructure() {
  const { t } = useTranslation("investor");
  const phases = t("production.phases", { returnObjects: true }) as string[];
  const stats = t("production.stats", { returnObjects: true }) as Array<{ value: string; desc: string }>;

  return (
    <section className="bg-card px-6 pt-10 pb-20 text-ink md:pt-12 md:pb-24 lg:px-12 lg:pt-14 lg:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col pt-1">
          <div>
            <Eyebrow>{t("production.eyebrow")}</Eyebrow>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-forest-deep">
              {t("production.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#59635D] md:text-[17px]">
              {t("production.desc")}
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 mb-8 border-t border-ink/10 pt-6">
              {Array.isArray(phases) && phases.map((phase, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <span className="font-jet text-[10px] text-terracotta">0{index + 1}</span>
                  </div>
                  <span className="font-semibold text-forest-deep text-[15px] leading-snug">
                    {phase}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <InlineCta href="/services/nursery">{t("production.cta1")}</InlineCta>
              <InlineCta href="/contact" variant="light">
                {t("production.cta2")}
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-[#DDE7E1] h-[400px] md:h-[500px] lg:h-full">
            <img
              src={nurseryImg}
              alt={t("production.eyebrow")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10261F]/95 via-[#10261F]/70 to-transparent p-6 text-cream md:p-8 lg:p-10">
              <div className="grid gap-6 sm:grid-cols-3">
                {Array.isArray(stats) && stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="font-serif text-[2rem] text-cream leading-none">{stat.value}</div>
                    <p className="mt-3 text-[13px] leading-relaxed text-cream/70">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
