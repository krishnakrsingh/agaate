import { Link, useParams } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Store } from "lucide-react";
import { Eyebrow, InlineCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";

const teamImages = [
  "/team/ankit.png?v=2",
  "/team/kuldeep.png",
  "/team/abhay.png",
  "/team/chanchala.png",
  "/team/ravi.png",
];

export function PeopleGovernance() {
  const { t, i18n } = useTranslation("investor");
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";

  const team = t("people.team", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    focus: string;
  }>;

  if (!Array.isArray(team) || team.length === 0) return null;

  return (
    <section className="bg-bone px-6 py-16 text-ink lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>{t("people.eyebrow")}</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              {t("people.title")}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              {t("people.desc")}
            </p>
          </div>
        </div>

        {/* Redesigned Masonry Leadership Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {[team[1], team[2]].map((person, colIdx) => (
              <Link
                key={person?.name ?? colIdx}
                to={getLocalizedPath("/about", currentLang) as any}
                className="group relative flex h-[260px] flex-col overflow-hidden rounded-[1.25rem] bg-[#F4F5F4] p-6 transition-colors hover:bg-[#EAECEA]"
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-medium text-forest-deep">
                    {person?.name}
                  </h3>
                  <p className="mt-1 font-sans text-[13px] text-[#59635D]">{person?.role}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <img
                    src={teamImages[colIdx === 0 ? 1 : 2]}
                    alt={person?.name}
                    className="h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Center Column (Featured) */}
          <div className="flex flex-col gap-6">
            <Link
              to={getLocalizedPath("/about", currentLang) as any}
              className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.25rem] bg-[#1E1915] p-8 transition-colors hover:bg-[#15110E]"
            >
              {/* Radial glow */}
              <div className="absolute bottom-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#B25D34] opacity-[0.35] blur-[80px] transition-opacity duration-500 group-hover:opacity-50" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-cream">{team[0]?.name}</h3>
                <p className="mt-1 font-sans text-[13px] text-cream/70">{team[0]?.role}</p>
                <p className="mt-6 text-[15px] leading-relaxed text-cream/80">{team[0]?.focus}</p>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <img
                  src={teamImages[0]}
                  alt={team[0]?.name}
                  className="h-[260px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {[team[3], team[4]].map((person, colIdx) => (
              <Link
                key={person?.name ?? colIdx}
                to={getLocalizedPath("/about", currentLang) as any}
                className="group relative flex h-[260px] flex-col overflow-hidden rounded-[1.25rem] bg-[#F4F5F4] p-6 transition-colors hover:bg-[#EAECEA]"
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-medium text-forest-deep">
                    {person?.name}
                  </h3>
                  <p className="mt-1 font-sans text-[13px] text-[#59635D]">{person?.role}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <img
                    src={teamImages[colIdx === 0 ? 3 : 4]}
                    alt={person?.name}
                    className="h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <InlineCta href="/about">{t("people.cta1")}</InlineCta>
          <InlineCta href="/contact" variant="light">
            {t("people.cta2")}
          </InlineCta>
        </div>
      </div>
    </section>
  );
}
