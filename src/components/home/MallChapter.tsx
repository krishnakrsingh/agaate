import { useRef } from "react";
import { MapPin } from "lucide-react";
import seedsImage from "@/assets/product-seeds.jpg";
import { Eyebrow, PrimaryCta } from "./HomeShared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export default function MallChapter() {
  const { t } = useTranslation("mall");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="scroll-mt-20 bg-card px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Eyebrow>{t("mall.eyebrow1")}</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-5xl font-display font-light text-[clamp(3rem,6vw,6.5rem)] leading-[1.02] tracking-[-0.035em] text-forest-deep">
              {t("mall.title1_1")}{" "}
              <span className="italic font-normal text-forest">{t("mall.title1_2")}</span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6">
            <img
              src={seedsImage}
              alt={t("mall.placeholderLabel")}
              className="min-h-[460px] w-full object-cover"
            />
          </div>
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <p className="max-w-md text-[17px] leading-8 text-ink/60">{t("mall.desc")}</p>
            <div className="mt-12 border-y border-ink/10">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5 last:border-b-0"
                >
                  <span className="font-display font-medium text-[1.65rem] leading-none tracking-[-0.035em] text-forest-deep">
                    {t(`mall.items.${index}` as any)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <PrimaryCta href="/services/kisaan-mall">{t("mall.cta")}</PrimaryCta>
              <span className="flex items-center gap-2 text-sm text-ink/55">
                <MapPin className="h-4 w-4 text-forest" /> Bhora Kalan, Gurugram
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid overflow-hidden bg-bone md:grid-cols-[1fr_1.65fr]">
          <div className="p-7 md:p-10">
            <Eyebrow>{t("mall.eyebrow2")}</Eyebrow>
            <p className="mt-12 font-display font-light text-[clamp(2rem,3.5vw,3.4rem)] leading-[1.05] tracking-[-0.035em] text-forest-deep">
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
