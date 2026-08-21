import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle, X, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/common/motion";
import { LeadershipBanner } from "@/components/about/LeadershipBanner";
import { team, type TeamMember } from "./data";
import type { TeamCmsMember } from "@/lib/cms-types";
import { getLeadershipBanner, toDisplayTeamMember, type DisplayTeamMember } from "@/lib/team-cms";

function LeaderBioModal({ leader, onClose }: { leader: DisplayTeamMember | null; onClose: () => void }) {
  useEffect(() => {
    if (!leader) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [leader, onClose]);

  if (!leader) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leader-bio-title"
      >
        <motion.div
          className="absolute inset-0 bg-[#143d31]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#143d31]/10 bg-white p-6 shadow-2xl md:p-8 text-[#143d31]"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-[#143d31]/10 text-[#4f624f] transition-colors hover:bg-[#f4f8f5] hover:text-[#143d31] focus-visible:outline-none"
            aria-label="Close biography"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            <img
              src={leader.image}
              alt={leader.name}
              className="h-16 w-16 rounded-xl object-cover border border-[#143d31]/10 shadow-xs"
            />
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                {leader.tag}
              </p>
              <h3
                id="leader-bio-title"
                className="mt-0.5 font-display text-2xl font-bold text-[#143d31]"
              >
                {leader.name}
              </h3>
              <p className="font-sans text-xs font-semibold text-[#4f624f]">{leader.role}</p>
            </div>
          </div>

          <p className="mt-6 font-sans text-sm leading-relaxed text-[#4f624f]">{leader.bio}</p>

          <div className="mt-6 space-y-2.5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
              Key Accomplishments
            </p>
            <ul className="space-y-2">
              {leader.keyAch.map((ach) => (
                <li key={ach} className="flex items-start gap-2 text-xs font-medium text-[#143d31]">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#5d7d37]" weight="fill" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {leader.pub && (
            <div className="mt-6 rounded-xl border border-[#143d31]/10 bg-[#f4f8f5] p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                <BookOpen className="h-3.5 w-3.5" weight="duotone" />
                Publication / Focus Area
              </div>
              <p className="mt-1.5 font-sans text-xs font-medium text-[#143d31]">"{leader.pub}"</p>
            </div>
          )}

          {leader.quote && (
            <blockquote className="mt-4 border-l-2 border-[#5d7d37] pl-3.5 font-sans text-xs font-medium text-[#4f624f]">
              “{leader.quote}”
            </blockquote>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function fallbackMembers(): DisplayTeamMember[] {
  return team.map((m: TeamMember) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    focus: m.focus,
    tag: m.tag,
    iconKey: "users",
    icon: m.icon,
    image: m.image,
    bio: m.bio,
    keyAch: m.keyAch,
    pub: m.pub,
    quote: m.quote,
    showInBanner: m.id === "ankit-rawat" || m.id === "chanchala-shukla",
    bannerBadge: m.id === "ankit-rawat" ? "Founder" : m.id === "chanchala-shukla" ? "Co-Founder" : "",
  }));
}

export default function LeadershipRoster({ members }: { members?: TeamCmsMember[] }) {
  const [activeLeader, setActiveLeader] = useState<DisplayTeamMember | null>(null);
  const rawRoster = members?.length ? members.map(toDisplayTeamMember) : fallbackMembers();

  // Ensure founders are positioned first in executive hierarchy
  const roster = [...rawRoster].sort((a, b) => {
    const roleA = (a.role || "").toLowerCase();
    const roleB = (b.role || "").toLowerCase();
    const isFounderA = a.id === "ankit-rawat" || (roleA.includes("founder") && !roleA.includes("co-founder"));
    const isFounderB = b.id === "ankit-rawat" || (roleB.includes("founder") && !roleB.includes("co-founder"));
    const isCoFounderA = a.id === "chanchala-shukla" || roleA.includes("co-founder");
    const isCoFounderB = b.id === "chanchala-shukla" || roleB.includes("co-founder");

    if (isFounderA) return -1;
    if (isFounderB) return 1;
    if (isCoFounderA) return -1;
    if (isCoFounderB) return 1;
    return 0;
  });

  const bannerLeaders = members?.length
    ? getLeadershipBanner(members)
    : roster.filter((m) => m.showInBanner).slice(0, 2);

  const gridClass =
    roster.length === 4
      ? "grid-cols-2 md:grid-cols-4"
      : roster.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : roster.length <= 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Leadership &amp; Field Specialists
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="leadership-heading"
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl"
            >
              The team building the future of Indian agriculture
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              Bringing together agronomists, supply chain leaders, nursery architects, and data
              scientists dedicated to farmer profitability.
            </p>
          </div>
        </Reveal>

        {bannerLeaders.length > 0 && (
          <Reveal variant="fade-up" delay={0.1}>
            <LeadershipBanner leaders={bannerLeaders} />
          </Reveal>
        )}

        <Reveal variant="fade-up" delay={0.15}>
          <div className={`grid ${gridClass} gap-4 sm:gap-6`}>
            {roster.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setActiveLeader(member)}
                className="group flex flex-col justify-between text-left rounded-2xl border border-[#143d31]/10 bg-white p-4 sm:p-4.5 transition-all hover:border-[#5d7d37]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7d37] cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#143d31]/5 mb-3.5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <ArrowUpRight className="h-3 w-3 text-[#143d31]" />
                    </div>
                  </div>

                  <p className="font-display text-base font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors line-clamp-1">
                    {member.name}
                  </p>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5d7d37] line-clamp-1 mt-0.5">
                    {member.role}
                  </p>
                  <p className="font-sans text-xs text-[#4f624f] line-clamp-2 mt-1.5 leading-relaxed">
                    {member.focus}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <LeaderBioModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
    </section>
  );
}
