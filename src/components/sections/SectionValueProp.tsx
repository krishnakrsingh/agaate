import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Check, Sprout, X } from "lucide-react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const comparisonRows = ["survival", "waste", "chemicals", "yield"] as const;

export default function SectionValueProp() {
  const { t } = useTranslation("value-prop");
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rowsRef.current, start: "top 78%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-agaate"
      className="relative overflow-hidden bg-[#E8F0E4] px-6 py-20 text-[#143D31] md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="absolute -right-24 top-0 h-[30rem] w-[30rem] rounded-full bg-[#B8D29D]/35 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-10 border-t border-[#143D31]/15 pt-5 lg:grid-cols-12 lg:items-end lg:gap-16">
          <p className="font-jet text-[10px] font-semibold uppercase tracking-[0.2em] text-[#527B58] lg:col-span-3">
            {t("valueProp.kicker")}
          </p>
          <div className="lg:col-span-8">
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,5.6vw,6rem)] leading-[0.9] tracking-[-0.06em]">
              {t("valueProp.titleStart")}{" "}
              <span className="italic text-[#5D8D53]">{t("valueProp.titleEmphasis")}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-[#4F6757] md:text-[18px] md:leading-8">
              {t("valueProp.intro")}
            </p>
          </div>
        </div>

        <div className="mt-14 overflow-hidden border border-[#143D31]/15 bg-[#F7F9F4] shadow-[0_24px_70px_rgba(20,61,49,0.08)] md:mt-20">
          <div className="grid border-b border-[#143D31]/15 md:grid-cols-[1.05fr_1fr_1fr]">
            <div className="hidden p-6 md:block" />
            <div className="border-l border-[#143D31]/15 bg-[#F0E5CF] p-5 md:p-6">
              <div className="flex items-center gap-3 text-[#76573A]">
                <X className="h-4 w-4" strokeWidth={1.8} />
                <span className="font-jet text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {t("valueProp.directLabel")}
                </span>
              </div>
              <p className="mt-3 font-serif text-2xl tracking-[-0.04em]">
                {t("valueProp.directTitle")}
              </p>
            </div>
            <div className="border-l border-[#143D31]/15 bg-[#1D4B3B] p-5 text-[#F4F6EE] md:p-6">
              <div className="flex items-center gap-3 text-[#B9D896]">
                <Sprout className="h-4 w-4" strokeWidth={1.8} />
                <span className="font-jet text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {t("valueProp.agaateLabel")}
                </span>
              </div>
              <p className="mt-3 font-serif text-2xl tracking-[-0.04em]">
                {t("valueProp.agaateTitle")}
              </p>
            </div>
          </div>

          <div ref={rowsRef}>
            {comparisonRows.map((row) => (
              <div
                key={row}
                className="grid border-b border-[#143D31]/12 last:border-b-0 md:grid-cols-[1.05fr_1fr_1fr]"
              >
                <div className="p-5 md:p-6">
                  <p className="font-serif text-xl tracking-[-0.03em] md:text-[1.4rem]">
                    {t(`valueProp.comparison.${row}.label`)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#647266]">
                    {t(`valueProp.comparison.${row}.note`)}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-[#143D31]/12 bg-[#FBF5E9] p-5 text-[#76573A] md:border-l md:border-t-0 md:p-6">
                  <ArrowDown className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                  <p className="text-sm leading-6 md:text-[15px]">
                    {t(`valueProp.comparison.${row}.direct`)}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-[#143D31]/12 bg-[#EFF6E9] p-5 text-[#234E3D] md:border-l md:border-t-0 md:p-6">
                  <Check className="h-4 w-4 shrink-0 text-[#5E9B5D]" strokeWidth={2} />
                  <p className="text-sm font-medium leading-6 md:text-[15px]">
                    {t(`valueProp.comparison.${row}.agaate`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-6 text-[#58705E]">{t("valueProp.footnote")}</p>
      </div>
    </section>
  );
}
