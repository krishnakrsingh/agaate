import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { MagneticButton, motion, Reveal } from "@/components/common/motion";
import { Orb, PulseRing } from "./deco";

export function BookingForm() {
  const [visitBooked, setVisitBooked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleBookVisit = (e: FormEvent) => {
    e.preventDefault();
    setVisitBooked(true);
    setTimeout(() => setVisitBooked(false), 4000);
  };

  return (
    <section id="tour" className="border-t border-border pt-24 text-left">
      <Reveal variant="fade-right">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 md:p-12">
          <Orb from="moss" className="-top-24 -right-16 h-64 w-64 opacity-15" />
          <PulseRing className="bottom-10 left-10 h-24 w-24" />
          <div className="relative z-10 mb-8">
            <span className="mb-1 block font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta">
              Field Consult
            </span>
            <h3 className="font-serif text-3xl font-bold text-forest-deep">
              Schedule an Agri Park tour
            </h3>
            <p className="mt-2 text-sm text-forest/70">
              Visit our demo beds in Gurugram District. Meet our agronomists, review trial results
              in the soil, and plan your input schedule.
            </p>
          </div>
          <AnimatePresence mode="wait">
            {visitBooked ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex items-center justify-center gap-3 rounded-xl border border-forest/10 bg-card p-6 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.15 }}
                >
                  <ShieldCheck className="h-5 w-5 animate-pulse text-emerald-500" />
                </motion.span>
                <span className="text-sm font-bold text-forest-deep">
                  Tour request registered! We will call to confirm.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleBookVisit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="relative z-10 grid grid-cols-1 items-end gap-5 md:grid-cols-3"
              >
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-forest/60">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-forest focus:outline-none"
                    placeholder="Ramesh Yadav"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-wider text-forest/60">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-forest focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <MagneticButton strength={0.35} onClick={() => formRef.current?.requestSubmit()}>
                  <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-deep px-10 py-3.5 text-sm font-semibold text-cream shadow-md transition-colors hover:bg-forest">
                    Book Visit Tour
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
