import { Cpu, Leaf, ShieldCheck, ShoppingBasket } from "lucide-react";
import agroPark from "@/assets/agro-park.jpg";
import heroPlant from "@/assets/hero-plant.jpg";
import irrigationImg from "@/assets/zones/irrigation_drip.png";
import droneImg from "@/assets/zones/drone_scan.png";
import marketImg from "@/assets/journey-09-market.png";
import { Eyebrow, InlineCta } from "./Shared";
import { useTranslation } from "react-i18next";

const techIcons = [ShieldCheck, Leaf, Cpu];
const techImages = [heroPlant, irrigationImg, droneImg];

export function MarketEcosystem() {
  const { t } = useTranslation("investor");
  const parkZones = t("market.parkZones", { returnObjects: true }) as string[];
  const techCards = t("market.techCards", { returnObjects: true }) as Array<{ title: string }>;

  return (
    <section className="bg-card px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="sticky top-24 border-t border-ink/10 pt-6">
            <Eyebrow>{t("market.eyebrow")}</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              {t("market.title")}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              {t("market.desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InlineCta href="/agri-park">{t("market.cta1")}</InlineCta>
              <InlineCta href="/services" variant="light">
                {t("market.cta2")}
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[#DDE7E1] bg-bone p-6 md:p-8">
              <ShoppingBasket className="mb-8 h-6 w-6 text-forest" />
              <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                {t("market.kisanMallTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#59635D]">
                {t("market.kisanMallDesc")}
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
              <img
                src={marketImg}
                alt={t("market.eyebrow")}
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
            <img
              src={agroPark}
              alt={t("market.agriParkTitle")}
              className="h-[340px] w-full object-cover"
            />
            <div className="p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                  {t("market.agriParkTitle")}
                </h3>
                <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-terracotta">
                  {t("market.agriParkTag")}
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-[#59635D]">
                {t("market.agriParkDesc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {Array.isArray(parkZones) &&
                  parkZones.map((zone, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-forest/20 bg-card px-3 py-1.5 text-xs font-semibold text-forest-deep"
                    >
                      {zone}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {Array.isArray(techCards) &&
              techCards.map((item, idx) => {
                const Icon = techIcons[idx];
                const img = techImages[idx];
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-card"
                  >
                    <img src={img} alt={item.title} className="h-40 w-full object-cover" />
                    <div className="flex items-center gap-3 p-4">
                      <Icon className="h-4 w-4 text-forest" />
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
