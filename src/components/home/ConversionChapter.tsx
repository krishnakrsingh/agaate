import { useEffect, useRef } from "react";
import { ArrowRight, MapPin, MessageCircle, ShoppingBasket } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLocalizedPath } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const paths = [
  { icon: MessageCircle, href: "/contact", tone: "bg-[#1D4B3B] text-[#F4F6EE]" },
  { icon: ShoppingBasket, href: "/services/kisaan-mall", tone: "bg-[#EAD7A7] text-[#173F32]" },
  { icon: MapPin, href: "/agri-park", tone: "bg-[#D8E9C6] text-[#173F32]" },
];

export default function ConversionChapter() {
  const { t, i18n } = useTranslation("conversion");
  const { locale } = useParams({ strict: false }) as any;
  const sectionRef = useRef<HTMLElement>(null);
  const currentLang = locale ?? i18n.language ?? "en";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const intro = section.querySelectorAll<HTMLElement>("[data-conversion-intro]");
    const cards = section.querySelectorAll<HTMLElement>("[data-conversion-card]");
    const pulse = section.querySelector<HTMLElement>("[data-field-pulse]");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      timeline
        .from(intro, { autoAlpha: 0, y: 32, duration: 0.75, stagger: 0.12 })
        .from(cards, { autoAlpha: 0, y: 44, duration: 0.8, stagger: 0.13 }, "<0.2");

      if (pulse) {
        gsap.to(pulse, {
          xPercent: 3100,
          duration: 5,
          ease: "none",
          repeat: -1,
          repeatDelay: 1.2,
          delay: 0.8,
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="start-here"
      className="scroll-mt-20 overflow-hidden bg-[#173F32] px-6 py-20 text-[#F4F6EE] md:px-10 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 border-t border-white/15 pt-5 lg:grid-cols-12 lg:items-end lg:gap-16">
          <p
            data-conversion-intro
            className="font-jet text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B9D896] lg:col-span-3"
          >
            {t("conversion.eyebrow")}
          </p>
          <div className="lg:col-span-8">
            <h2
              data-conversion-intro
              className="max-w-5xl font-serif text-[clamp(3rem,5.5vw,6rem)] leading-[0.9] tracking-[-0.06em]"
            >
              {t("conversion.titleStart")}{" "}
              <span className="italic text-[#B9D896]">{t("conversion.titleEmphasis")}</span>
            </h2>
            <p
              data-conversion-intro
              className="mt-6 max-w-2xl text-[16px] leading-7 text-[#F4F6EE]/70 md:text-[18px] md:leading-8"
            >
              {t("conversion.description")}
            </p>
          </div>
        </div>

        <div className="relative mt-12 h-px overflow-hidden bg-white/15 md:mt-16">
          <span
            data-field-pulse
            className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#B9D896] shadow-[0_0_0_7px_rgba(185,216,150,0.12)]"
          />
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3 lg:gap-5">
          {paths.map(({ icon: Icon, href, tone }, index) => (
            <Link
              key={href}
              data-conversion-card
              to={getLocalizedPath(href, currentLang) as any}
              className={`group relative min-h-[280px] overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-2 md:min-h-[340px] md:p-9 ${tone}`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-jet text-[10px] uppercase tracking-[0.16em] opacity-60">
                  0{index + 1}
                </span>
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <div className="absolute inset-x-7 bottom-7 md:inset-x-9 md:bottom-9">
                <h3 className="max-w-xs font-serif text-[clamp(2rem,3vw,3rem)] leading-[0.94] tracking-[-0.045em]">
                  {t(`conversion.paths.${index}.title`)}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-6 opacity-75">
                  {t(`conversion.paths.${index}.description`)}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-semibold">
                  {t(`conversion.paths.${index}.cta`)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <span className="absolute -right-12 -top-16 font-serif text-[13rem] leading-none opacity-[0.08]">
                0{index + 1}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
