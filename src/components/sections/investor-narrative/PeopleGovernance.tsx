import { useRef } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Eyebrow, PrimaryCta, SecondaryCta } from "./Shared";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const teamImages = [
  "/team/ankit.png",
  "/team/kuldeep.png",
  "/team/abhay.png",
  "/team/chanchala.png",
  "/team/ravi.png",
];

export function PeopleGovernance() {
  const { t, i18n } = useTranslation("investor");
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? i18n.language ?? "en";
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  const team = t("people.team", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    focus: string;
  }>;

  if (!Array.isArray(team) || team.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-bone px-6 py-16 text-ink lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>{t("people.eyebrow")}</Eyebrow>
            <h2 className="mt-5 font-display font-light text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] tracking-[-0.035em] text-forest-deep">
              {t("people.title")}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.75] text-ink/60 md:text-[18px]">
              {t("people.desc")}
            </p>
          </div>
        </div>

        {/* Featured lead */}
        <Link
          to={getLocalizedPath("/about", currentLang) as any}
          className="group grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-5 bg-forest-deep p-8 md:p-10 text-cream min-h-[320px] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-light text-[clamp(1.75rem,3vw,2.4rem)] tracking-[-0.03em]">
                {team[0]?.name}
              </h3>
              <p className="mt-2 font-jet text-[11px] uppercase tracking-[0.1em] text-moss">
                {team[0]?.role}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-cream/70">{team[0]?.focus}</p>
            </div>
          </div>
          <div className="lg:col-span-7 flex items-end justify-center bg-card overflow-hidden min-h-[280px]">
            <img
              src={teamImages[0]}
              alt={team[0]?.name}
              className="h-[280px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* Remaining team as simple rows */}
        <div className="mt-2 border-t border-ink/10">
          {team.slice(1).map((person, idx) => (
            <Link
              key={person?.name ?? idx}
              to={getLocalizedPath("/about", currentLang) as any}
              className="group grid grid-cols-12 items-center gap-4 border-b border-ink/10 py-5 transition-colors hover:bg-forest/[0.03]"
            >
              <div className="col-span-3 sm:col-span-2">
                <img
                  src={teamImages[idx + 1]}
                  alt={person?.name}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="col-span-9 sm:col-span-4">
                <h3 className="font-display font-medium text-lg tracking-[-0.02em] text-forest-deep">
                  {person?.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-ink/55">{person?.role}</p>
              </div>
              <p className="hidden sm:block sm:col-span-6 text-sm leading-relaxed text-ink/55">
                {person?.focus}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <PrimaryCta href="/about">{t("people.cta1")}</PrimaryCta>
          <SecondaryCta href="/contact">{t("people.cta2")}</SecondaryCta>
        </div>
      </div>
    </section>
  );
}
