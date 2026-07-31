import { useRef } from "react";
import { Eyebrow, SecondaryCta } from "./HomeShared";
import { useTranslation } from "react-i18next";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export default function BeyondChapter() {
  const { t } = useTranslation("beyond");
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-bone px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow>{t("beyond.eyebrow")}</Eyebrow>
        <h2 className="mt-6 max-w-4xl font-display font-light text-[clamp(3rem,5.5vw,5.9rem)] leading-[1.02] tracking-[-0.035em] text-forest-deep">
          {t("beyond.title")}
        </h2>
        <div className="mt-16">
          {[
            "/services/farm-tech",
            "/services/carbon-credits",
            "/services/big-farm-setup",
          ].map((href, index) => (
            <article
              key={href}
              className="grid gap-5 border-t border-ink/10 py-8 md:grid-cols-[7rem_1.2fr_.8fr] md:items-end md:gap-10"
            >
              <span className="font-jet text-[12px] text-forest">0{index + 1}</span>
              <div>
                <h3 className="font-display font-medium text-[clamp(2rem,3.5vw,3.6rem)] leading-[1.05] tracking-[-0.035em] text-forest-deep">
                  {t(`beyond.items.${index}.title` as any)}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/60">
                  {t(`beyond.items.${index}.desc` as any)}
                </p>
              </div>
              <SecondaryCta href={href}>{t("beyond.cta")}</SecondaryCta>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
