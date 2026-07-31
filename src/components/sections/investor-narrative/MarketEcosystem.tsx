import { useRef } from "react";
import { Cpu, Leaf, ShieldCheck, ShoppingBasket } from "lucide-react";
import agroPark from "@/assets/agro-park.jpg";
import heroPlant from "@/assets/hero-plant.jpg";
import irrigationImg from "@/assets/zones/irrigation_drip.png";
import droneImg from "@/assets/zones/drone_scan.png";
import marketImg from "@/assets/journey-09-market.png";
import { Eyebrow, PrimaryCta, SecondaryCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const techIcons = [ShieldCheck, Leaf, Cpu];
const techImages = [heroPlant, irrigationImg, droneImg];

export function MarketEcosystem() {
  const { t } = useTranslation("investor");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const parkZones = t("market.parkZones", { returnObjects: true }) as string[];
  const techCards = t("market.techCards", { returnObjects: true }) as Array<{ title: string }>;

  return (
    <section
      ref={sectionRef}
      className="bg-card px-6 py-20 text-ink lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="sticky top-24 border-t border-ink/10 pt-6">
            <Eyebrow>{t("market.eyebrow")}</Eyebrow>
            <h2 className="mt-5 font-display font-light text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] tracking-[-0.035em] text-forest-deep">
              {t("market.title")}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-ink/60 md:text-[18px]">
              {t("market.desc")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCta href="/agri-park">{t("market.cta1")}</PrimaryCta>
              <SecondaryCta href="/services/market-linkage">{t("market.cta2")}</SecondaryCta>
            </div>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-7">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-t border-ink/10 pt-6">
              <ShoppingBasket className="mb-6 h-5 w-5 text-forest" strokeWidth={1.5} />
              <h3 className="font-display font-light text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.03em] text-forest-deep">
                {t("market.kisanMallTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                {t("market.kisanMallDesc")}
              </p>
            </div>
            <img
              src={marketImg}
              alt={t("market.eyebrow")}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>

          <div>
            <img
              src={agroPark}
              alt={t("market.agriParkTitle")}
              className="h-[340px] w-full object-cover"
            />
            <div className="pt-6 border-t border-ink/10 mt-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display font-light text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.03em] text-forest-deep">
                  {t("market.agriParkTitle")}
                </h3>
                <span className="font-jet text-[10px] uppercase tracking-[0.1em] text-forest">
                  {t("market.agriParkTag")}
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-ink/60">
                {t("market.agriParkDesc")}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-ink/10 pt-4 sm:grid-cols-3">
                {Array.isArray(parkZones) &&
                  parkZones.map((zone, idx) => (
                    <span
                      key={idx}
                      className="text-sm font-medium text-forest-deep py-1.5 border-b border-ink/10"
                    >
                      {zone}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 border-t border-ink/10 pt-8 md:grid-cols-3">
            {Array.isArray(techCards) &&
              techCards.map((item, idx) => {
                const Icon = techIcons[idx];
                const img = techImages[idx];
                return (
                  <div key={idx}>
                    <img src={img} alt={item.title} className="h-40 w-full object-cover" />
                    <div className="flex items-center gap-3 pt-4">
                      <Icon className="h-4 w-4 text-forest" strokeWidth={1.5} />
                      <span className="text-sm font-semibold text-forest-deep">{item.title}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
