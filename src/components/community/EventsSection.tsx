import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ticket } from "lucide-react";
import { Reveal, SectionHeader, Stagger, StaggerItem } from "@/components/common/motion";
import { events, type CommunityEvent } from "./community-data";

function PassModal({ event, onClose }: { event: CommunityEvent; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/40 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm space-y-4 rounded-[2rem] border border-border bg-card p-6 text-center shadow-2xl"
      >
        <Ticket className="mx-auto h-10 w-10 text-terracotta" />
        <h4 className="font-serif text-xl font-bold text-forest-deep">Digital Seminar Pass</h4>
        <div className="space-y-1.5 rounded-xl border border-border bg-bone/40 p-4 text-left font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-forest/40">PASS CODE:</span>
            <span className="font-bold text-forest-deep">AG-EVENT-{event.id.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-forest/40">DATE:</span>
            <span className="font-bold text-forest-deep">{event.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-forest/40">VENUE:</span>
            <span className="truncate font-bold text-forest-deep" style={{ maxWidth: 150 }}>
              {event.venue}
            </span>
          </div>
        </div>
        <div className="h-10 w-full border-t border-border/50 bg-[repeating-linear-gradient(90deg,var(--color-forest),var(--color-forest)_2px,transparent_2px,transparent_6px)] pt-2 opacity-65" />
        <span className="block text-[9px] font-bold uppercase tracking-wider text-forest/40">
          Present pass barcode at regional registration desk
        </span>
        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-xl bg-forest-deep py-2.5 text-xs font-semibold tracking-wide text-cream transition-all hover:bg-forest"
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function EventsSection() {
  const [rsvpEvent, setRsvpEvent] = useState<string | null>(null);

  return (
    <section id="hub-events" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Field Seminars"
            title="Hub Events"
            description="Secure seminar passes, walk through live demos, and meet the agronomists at Agaate regional hubs."
          />
          <Reveal variant="fade-left" delay={0.1}>
            <span className="label-mono">August — September 2026</span>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.16}>
          {events.map((ev) => (
            <StaggerItem key={ev.id} className="h-full">
              <motion.div
                whileHover={{ y: -6, rotate: -0.5 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-card p-7 text-left shadow-sm"
              >
                <motion.div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle, var(--color-terracotta) 0%, transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-terracotta">
                    Seminar Pass
                  </span>
                  <span className="font-mono text-[9px] text-forest/50">
                    {ev.date.split(",")[0]}
                  </span>
                </div>
                <h4 className="relative mt-3 font-serif text-lg font-bold leading-tight text-forest-deep">
                  {ev.title}
                </h4>
                <p className="relative mt-2 text-xs leading-relaxed text-forest/70">{ev.desc}</p>

                <div className="relative mt-4 grid grid-cols-2 gap-2 pt-2 font-mono text-[10px] text-forest/50">
                  <div>
                    <span className="block text-[8px] text-forest/40">TIME</span>
                    <span className="font-bold text-forest-deep">
                      {ev.time.split(" ")[0]} {ev.time.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-forest/40">VENUE</span>
                    <span className="block truncate font-bold text-forest-deep">
                      {ev.venue.split(" ")[2]}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRsvpEvent(rsvpEvent === ev.id ? null : ev.id)}
                  className={`relative mt-5 w-full cursor-pointer rounded-xl py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    rsvpEvent === ev.id
                      ? "bg-forest-deep text-moss shadow-sm"
                      : "border border-border bg-card text-forest hover:border-forest"
                  }`}
                >
                  {rsvpEvent === ev.id ? "Ticket Secured ✓" : "RSVP & Claim Pass"}
                </button>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {rsvpEvent && (
          <PassModal
            event={events.find((e) => e.id === rsvpEvent)!}
            onClose={() => setRsvpEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
