import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trees, Microscope, Handshake, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Eyebrow } from "@/components/home/HomeShared";

gsap.registerPlugin(ScrollTrigger);

const pillarIcons = [Trees, Microscope, Handshake];

export default function SectionValueProp() {
  const { t } = useTranslation("value-prop");
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const accentIndices = new Set<number>(
    (t("valueProp.accentIndices", { returnObjects: true }) as number[]) || [],
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word", sectionRef.current);
      gsap.fromTo(
        words,
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        pillarsRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: pillarsRef.current, start: "top 85%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value-prop-section"
      className="bg-cream text-ink py-20 md:py-28 lg:py-36 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center justify-between gap-6 border-t border-ink/10 pt-5 mb-14 md:mb-20">
          <Eyebrow hairline={false}>{t("valueProp.kicker")}</Eyebrow>
          <span className="hidden md:block font-jet text-[12px] uppercase tracking-[0.1em] text-ink/40">
            {t("valueProp.kickerTag")}
          </span>
        </div>

        <p
          ref={manifestoRef}
          className="font-display font-light text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.15] tracking-[-0.035em] text-forest-deep max-w-[1200px] mb-20 md:mb-28"
        >
          {t("valueProp.manifesto")
            .split(" ")
            .map((word: string, i: number) => (
              <span
                key={i}
                className={`manifesto-word inline-block mr-[0.28em] ${
                  accentIndices.has(i) ? "italic font-normal text-forest" : ""
                }`}
              >
                {word}
              </span>
            ))}
        </p>

        <div ref={pillarsRef} className="border-t border-ink/10">
          {pillarIcons.map((Icon, i) => (
            <div
              key={i}
              className="group grid grid-cols-12 items-start gap-4 md:gap-8 py-7 md:py-9 border-b border-ink/10 hover:bg-forest/[0.03] transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4"
            >
              <div className="col-span-2 md:col-span-1 pt-1.5">
                <Icon className="w-5 h-5 text-forest" strokeWidth={1.5} />
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display font-medium text-[22px] md:text-[28px] text-forest-deep leading-tight tracking-[-0.03em]">
                  {t(`valueProp.pillars.${i}.title` as any)}
                </h3>
              </div>
              <p className="col-span-10 col-start-3 md:col-span-6 md:col-start-6 text-ink/60 text-[15px] md:text-[17px] leading-[1.65]">
                {t(`valueProp.pillars.${i}.desc` as any)}
              </p>
              <div className="hidden md:flex col-span-1 justify-end pt-1">
                <ArrowUpRight className="w-5 h-5 text-ink/25 group-hover:text-forest group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
