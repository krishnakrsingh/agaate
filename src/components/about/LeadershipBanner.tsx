import type { TeamCmsMember } from "@/lib/cms-types";
import { Quotes } from "@phosphor-icons/react";

export type BannerLeader = Partial<TeamCmsMember> & {
  name: string;
  role: string;
  image: string;
  quote?: string;
  bannerBadge?: string;
};

export function LeadershipBanner({
  leaders,
  eyebrow,
  subtitle,
}: {
  leaders: BannerLeader[];
  eyebrow?: string;
  subtitle?: string;
}) {
  if (!leaders || !leaders.length) return null;

  const isMulti = leaders.length > 1;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-[#fcfdfc] to-[#f4f8f5]/60 border border-[#143d31]/10 p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
      {/* Decorative ambient corner blur */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#5d7d37]/[0.04] blur-2xl"
        aria-hidden="true"
      />

      {/* Optional Eyebrow / Subtitle Header */}
      {(eyebrow || subtitle) && (
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#143d31]/10 pb-4">
          {eyebrow && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
              <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {eyebrow}
              </p>
            </div>
          )}
          {subtitle && (
            <p className="font-sans text-xs sm:text-sm text-[#4f624f]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Side-by-side quotes grid */}
      <div
        className={
          isMulti
            ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x divide-[#143d31]/10"
            : "max-w-3xl mx-auto"
        }
      >
        {leaders.map((leader, index) => (
          <div
            key={`${leader.name}-${index}`}
            className={`flex flex-col justify-between ${
              isMulti
                ? index === 0
                  ? "md:pr-8 lg:pr-10"
                  : "pt-8 border-t border-[#143d31]/10 md:pt-0 md:border-t-0 md:pl-8 lg:pl-10"
                : ""
            }`}
          >
            {/* Top: Decorative Quote Icon & Badge */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5d7d37]/10 text-[#5d7d37] border border-[#5d7d37]/15">
                  <Quotes weight="fill" className="h-4.5 w-4.5" />
                </div>
                {leader.bannerBadge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#5d7d37]/10 text-[#5d7d37] border border-[#5d7d37]/20">
                    {leader.bannerBadge}
                  </span>
                )}
              </div>

              {/* Quote Body */}
              {leader.quote ? (
                <blockquote className="font-display italic text-base sm:text-lg lg:text-[19px] xl:text-[20px] font-normal text-[#143d31] leading-relaxed tracking-tight">
                  “{leader.quote}”
                </blockquote>
              ) : null}
            </div>

            {/* Bottom: Profile / Author */}
            <div className="mt-6 sm:mt-8 pt-5 border-t border-[#143d31]/10 flex items-center gap-3.5 shrink-0">
              <img
                src={leader.image}
                alt={leader.name}
                className="h-12 w-12 sm:h-13 sm:w-13 rounded-full object-cover border border-[#143d31]/15 shadow-2xs shrink-0 ring-2 ring-white"
              />
              <div className="min-w-0">
                <p className="font-display text-base sm:text-[17px] font-bold text-[#143d31] leading-tight">
                  {leader.name}
                </p>
                <p className="font-sans text-xs sm:text-sm font-semibold text-[#5d7d37] mt-0.5">
                  {leader.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
