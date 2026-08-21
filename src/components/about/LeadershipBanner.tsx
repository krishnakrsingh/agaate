import { Quotes } from "@phosphor-icons/react";
import type { TeamCmsMember } from "@/lib/cms-types";

type BannerLeader = Pick<TeamCmsMember, "quote" | "name" | "role" | "image" | "bannerBadge">;

export function LeadershipBanner({
  leaders,
  eyebrow = "Founders Vision",
  subtitle = "Agaate Leadership",
}: {
  leaders: BannerLeader[];
  eyebrow?: string;
  subtitle?: string;
}) {
  if (!leaders.length) return null;

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#143d31] via-[#0f3429] to-[#0a231b] p-7 sm:p-10 lg:p-12 text-white shadow-xl border border-white/10 overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#a3e635]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#5d7d37]/15 blur-3xl" />

      <div className="relative flex items-center justify-between pb-5 sm:pb-6 mb-7 sm:mb-9 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse shrink-0" />
          <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#a3e635]">
            {eyebrow}
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest hidden sm:inline-block">
          {subtitle}
        </span>
      </div>

      <div
        className={`relative grid grid-cols-1 ${
          leaders.length > 1 ? "lg:grid-cols-2 lg:divide-x divide-white/10" : ""
        } divide-y lg:divide-y-0 divide-white/10`}
      >
        {leaders.map((leader, index) => (
          <div
            key={`${leader.name}-${index}`}
            className={`flex flex-col justify-between h-full ${
              index === 0 ? "pb-8 lg:pb-0 lg:pr-10 xl:pr-12" : "pt-8 lg:pt-0 lg:pl-10 xl:pl-12"
            }`}
          >
            <div className="space-y-3">
              <Quotes className="h-7 w-7 text-[#a3e635]/60 shrink-0" weight="duotone" />
              <blockquote className="font-serif text-base sm:text-[17px] lg:text-[19px] font-normal italic text-white/95 leading-relaxed tracking-normal">
                “{leader.quote}”
              </blockquote>
            </div>

            <div className="flex items-center gap-4 pt-6 mt-6 sm:mt-8 border-t border-white/10">
              <img
                src={leader.image}
                alt={leader.name}
                className="h-12 w-12 sm:h-13 sm:w-13 rounded-full object-cover ring-2 ring-[#a3e635]/60 shadow-md shrink-0"
              />
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <p className="font-display text-base font-bold text-white tracking-tight">{leader.name}</p>
                  {leader.bannerBadge ? (
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#a3e635] bg-[#a3e635]/15 px-2 py-0.5 rounded-full border border-[#a3e635]/25">
                      {leader.bannerBadge}
                    </span>
                  ) : null}
                </div>
                <p className="font-sans text-xs text-white/70 mt-0.5 truncate">{leader.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
