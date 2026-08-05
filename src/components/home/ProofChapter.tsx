import testimonialImage from "@/assets/testimonial-1.jpg";
import { Eyebrow } from "./HomeShared";

import { useTranslation } from "react-i18next";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

export default function ProofChapter() {
  const { t } = useTranslation("proof");
  const sectionRef = useHomeChapterReveal();
  return (
    <section
      ref={sectionRef}
      id="impact"
      className="scroll-mt-20 bg-[#0B211A] px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column: Big Numbers + Testimonial */}
          <div data-home-reveal className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <Eyebrow inverse>{t("proof.eyebrow")}</Eyebrow>
              <p className="mt-8 font-serif text-[clamp(5.5rem,13vw,13rem)] leading-[0.72] tracking-[-0.085em] text-moss">
                15,000+
              </p>
              <p className="mt-4 lg:mt-8 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.05em] text-cream">
                {t("proof.stat1_desc")}
              </p>
            </div>

            {/* Testimonial nested in left column */}
            <div className="mt-16 lg:mt-24 flex items-start gap-6 border-t border-white/10 pt-10">
              <img
                src={testimonialImage}
                alt="Agaate farmer community member"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 object-cover rounded-full"
              />
              <blockquote>
                <p className="font-serif text-[clamp(1.4rem,2vw,2rem)] leading-[1.2] tracking-[-0.02em] text-moss">
                  {t("proof.quote")}
                </p>
                <footer className="mt-4 text-[13px] font-semibold text-[#8DAA96]">
                  {t("proof.author")}{" "}
                  <span className="font-normal text-cream/40">· {t("proof.authorDesc")}</span>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Right Column: Text and Stats */}
          <div
            data-home-reveal
            className="lg:col-span-5 lg:col-start-8 flex flex-col pt-2 lg:pt-16"
          >
            <p className="text-[17px] leading-8 text-cream/70 max-w-md">{t("proof.desc")}</p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-14 lg:mt-auto border-t border-white/10 pt-10">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>
                  <p className="font-serif text-[2.4rem] leading-none tracking-[-0.05em] text-moss">
                    {t(`proof.items.${idx}.val` as any)}
                  </p>
                  <p className="mt-3 font-jet text-[9px] uppercase tracking-[0.14em] text-[#8DAA96]">
                    {t(`proof.items.${idx}.label` as any)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
