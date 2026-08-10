import { ArrowRight, MapPin, Phone, Smartphone } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

const trustFacts = [
  "2,000+ Parivaar farmers",
  "15,000+ acres under association",
  "17-acre smart nursery",
];

const actions = [
  {
    icon: Smartphone,
    number: "01",
    title: "Talk to an Agronomist",
    text: "Describe your crop problem or planning question — a real agronomy expert responds directly. Crop diseases, pest issues, fertilizer, soil, or anything in the field.",
    cta: "Download the App",
    subCta: null,
    href: "tel:9487263498",
    accent: "#143d31",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Visit Kisaan Mall",
    text: "500+ genuine agri inputs in one place. Expert-matched for your crop and stage, sourced from 25+ verified manufacturer partners. No guesswork, no duplicates.",
    cta: "Get Directions",
    subCta: "Bhora Kalan, Gurugram",
    href: "/contact",
    accent: "#9a5a2c",
  },
  {
    icon: Phone,
    number: "03",
    title: "See the Agri Park",
    text: "India's first agri park — live demo plots, Bio-Boosted nursery, drone technology, and farmer training. One visit changes how you understand farming. See it before you use it.",
    cta: "Plan Your Visit",
    subCta: "Kukrola, Gurugram",
    href: "/agri-park",
    accent: "#476f2d",
  },
];

export default function ClosingChapter() {
  const sectionRef = useHomeChapterReveal();
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] px-5 py-16 md:px-10 md:py-24"
    >

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div data-home-reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#9a5a2c]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a5a2c]">
                Start your journey
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Your farm's next step{" "}
              <span className="font-serif italic font-normal text-[#9a5a2c]">starts here.</span>
            </h2>
          </div>
          <div data-home-reveal>
            <p className="font-sans max-w-3xl text-sm md:text-base leading-relaxed text-[#536253] font-normal">
              Whether you need crop advice, the right inputs, nursery plants, or want to visit the
              farm and see Agaate's ecosystem in person — choose the path that fits where you are
              right now.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div
          data-home-reveal
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-[#143d31]/15"
        >
          {trustFacts.map((fact) => (
            <span
              key={fact}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#143d31]/55 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              {fact}
            </span>
          ))}
        </div>

        {/* Three action cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${action.accent}15` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.8}
                        style={{ color: action.accent }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#143d31]/30 tracking-wider">
                      {action.number}
                    </span>
                  </div>
                  <h3
                    className="font-display mt-6 text-xl md:text-2xl font-bold tracking-tight"
                    style={{ color: "#143d31" }}
                  >
                    {action.title}
                  </h3>
                  <p className="font-sans mt-3 max-w-sm text-sm leading-relaxed text-[#536253]">
                    {action.text}
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1"
                    style={{ color: action.accent }}
                  >
                    {action.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  {action.subCta && (
                    <span className="font-jet text-[10px] font-bold uppercase tracking-[0.14em] text-[#143d31]/35">
                      {action.subCta}
                    </span>
                  )}
                </div>
              </>
            );

            const cardClass =
              "group flex min-h-80 flex-col justify-between rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-[#143d31]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#143d31]/5";

            if (action.href.startsWith("/")) {
              return (
                <Link
                  key={action.title}
                  to={getLocalizedPath(action.href, currentLang) as any}
                  className={cardClass}
                  data-home-reveal
                >
                  {content}
                </Link>
              );
            }

            return (
              <a key={action.title} href={action.href} className={cardClass} data-home-reveal>
                {content}
              </a>
            );
          })}
        </div>

        {/* Final tagline */}
        <p
          data-home-reveal
          className="mt-14 font-serif text-center text-xl italic leading-relaxed text-[#143d31]/60 md:text-2xl"
        >
          "Agaate stands with the farmer at every step — from seed to sale."
        </p>
      </div>
    </section>
  );
}
