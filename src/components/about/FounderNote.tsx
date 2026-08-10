import { Quote } from "lucide-react";
import { Reveal, motion, EASE } from "@/components/common/motion";
import { founderNote } from "./data";

export default function FounderNote() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden border-y border-border bg-bone py-20 px-6 md:py-28 lg:px-12"
      aria-labelledby="founder-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5" />

      <Reveal variant="blur-in" className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="rounded-[2.5rem] border border-border bg-[#eaf0df] p-8 md:p-12"
        >
          <p className="font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-forest">
            Founder's Note
          </p>
          <Quote className="mt-6 h-8 w-8 text-terracotta/70" />
          <blockquote
            id="founder-heading"
            className="mt-4 font-serif text-2xl font-normal italic leading-relaxed text-forest-deep md:text-3xl"
          >
            "{founderNote.quote}"
          </blockquote>

          <div className="mt-10 flex items-center gap-4 border-t border-forest/15 pt-6">
            <img
              src={founderNote.image}
              alt={founderNote.name}
              className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div>
              <p className="font-display text-base font-extrabold text-forest-deep">
                {founderNote.name}
              </p>
              <p className="font-sans text-xs font-semibold text-moss">{founderNote.role}</p>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
