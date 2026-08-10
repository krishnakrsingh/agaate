import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle2, Quote, X } from "lucide-react";
import { founderNote, team, type TeamMember } from "./data";

function LeaderBioModal({
  leader,
  onClose,
}: {
  leader: TeamMember | null;
  onClose: () => void;
}) {
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
          className="absolute inset-0 bg-forest-deep/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl md:p-8"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
            aria-label="Close biography"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            <img
              src={leader.image}
              alt={leader.name}
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div>
              <p className="text-xs font-medium text-forest">{leader.tag}</p>
              <h3 id="leader-bio-title" className="mt-0.5 font-display text-2xl font-semibold text-forest-deep">
                {leader.name}
              </h3>
              <p className="text-sm text-neutral-600">{leader.role}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-600">{leader.bio}</p>

          <ul className="mt-6 space-y-2">
            {leader.keyAch.map((ach) => (
              <li key={ach} className="flex items-start gap-2.5 text-sm text-forest-deep">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.75} />
                <span>{ach}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <BookOpen className="h-3.5 w-3.5" />
              Publication
            </div>
            <p className="mt-2 font-serif text-sm italic text-forest-deep">"{leader.pub}"</p>
          </div>

          <blockquote className="mt-4 border-l-2 border-terracotta pl-4 text-sm italic text-neutral-600">
            "{leader.quote}"
          </blockquote>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function LeadershipRoster() {
  const [activeLeader, setActiveLeader] = useState<TeamMember | null>(null);

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="border-b border-neutral-200 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Founder note */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-forest">Leadership</p>
          <h2
            id="leadership-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-4xl"
          >
            Meet the team behind Agaate.
          </h2>
          <div className="mt-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6 md:p-8">
            <Quote className="h-5 w-5 text-terracotta" strokeWidth={1.75} />
            <blockquote className="mt-3 font-serif text-xl italic leading-relaxed text-forest-deep md:text-2xl">
              "{founderNote.quote}"
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={founderNote.image}
                alt={founderNote.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-forest-deep">{founderNote.name}</p>
                <p className="text-xs text-neutral-500">{founderNote.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team — list on phone, photo grid on desktop */}
        <div className="mt-12 md:hidden">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest">
            Leadership team
          </p>
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {team.map((member) => (
              <li key={member.id}>
                <button
                  type="button"
                  onClick={() => setActiveLeader(member)}
                  className="flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest/40"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-neutral-200"
                  />
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-forest-deep">{member.name}</p>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-forest">
                      {member.role}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setActiveLeader(member)}
              className="group rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-forest-deep group-hover:text-forest">
                {member.name}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">{member.role}</p>
            </button>
          ))}
        </div>
      </div>

      <LeaderBioModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
    </section>
  );
}
