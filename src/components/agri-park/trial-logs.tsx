import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Check, Search } from "lucide-react";
import { motion, Reveal } from "@/components/common/motion";
import { TRIALS, rowVariants } from "./data";

export function TrialLogs() {
  const [trialSearch, setTrialSearch] = useState("");
  const [trialStatus, setTrialStatus] = useState("All");

  const filteredTrials = TRIALS.filter((t) => {
    const matchesSearch =
      t.crop.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.partner.toLowerCase().includes(trialSearch.toLowerCase());
    const matchesStatus = trialStatus === "All" || t.status === trialStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="border-t border-border pt-24 text-left">
      <Reveal variant="fade-up">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block font-jet text-[10px] font-bold uppercase tracking-widest text-forest/40">
              Scientific Verification
            </span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep">
              Trial Logs Registry
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:max-w-xl md:justify-end">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40" />
              <input
                type="text"
                value={trialSearch}
                onChange={(e) => setTrialSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                placeholder="Search crop or lab..."
              />
            </div>
            <div className="flex gap-2">
              {["All", "Verified", "Audit"].map((st) => (
                <motion.button
                  key={st}
                  layout
                  onClick={() => setTrialStatus(st)}
                  className={`cursor-pointer rounded-xl border px-4 py-2 font-mono text-xs font-bold transition-colors ${
                    trialStatus === st
                      ? "border-forest bg-forest text-cream"
                      : "border-border bg-card text-forest/70 hover:border-forest"
                  }`}
                >
                  {st}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal variant="blur-in" delay={0.1} className="mt-8">
        <div className="overflow-x-auto rounded-[2rem] border border-border bg-card shadow-sm">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border bg-bone/40 font-mono text-[10px] uppercase tracking-wider text-forest/50">
                <th className="px-6 py-4 font-bold">Trial ID</th>
                <th className="px-6 py-4 font-bold">Crop & Variety</th>
                <th className="px-6 py-4 font-bold">Partner Labs</th>
                <th className="px-6 py-4 font-bold">Verified Result</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <motion.tbody
              className="divide-y divide-[#E7ECE8] font-sans"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              <AnimatePresence>
                {filteredTrials.map((t) => (
                  <motion.tr
                    key={t.id}
                    layout
                    variants={rowVariants}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.3 } }}
                    className="transition-colors hover:bg-bone/10"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-forest">{t.id}</td>
                    <td className="px-6 py-4 font-bold text-forest-deep">{t.crop}</td>
                    <td className="px-6 py-4 text-[#59635D]">{t.partner}</td>
                    <td className="px-6 py-4 font-mono font-bold text-terracotta">{t.result}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded border border-forest/10 bg-forest/5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-forest">
                        <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
                        {t.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
                {filteredTrials.length === 0 && (
                  <motion.tr
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td
                      colSpan={5}
                      className="bg-bone/10 px-6 py-12 text-center font-mono text-xs text-forest/40"
                    >
                      No matching trial entries discovered.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
