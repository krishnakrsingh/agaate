import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";
import { EASE, Reveal } from "@/components/common/motion";
import { Orb, PulseRing } from "./deco";

export function ContractGenerator() {
  const [contractCrop, setContractCrop] = useState("Tomato");
  const [contractAcres, setContractAcres] = useState(3);
  const [showContractDraft, setShowContractDraft] = useState(false);

  const rate = contractCrop === "Tomato" ? 23 : contractCrop === "Chilli" ? 50 : 38;
  const estYieldKg = contractAcres * 12000;
  const minPayout = estYieldKg * rate;

  return (
    <section id="contract" className="relative scroll-mt-28">
      <Orb from="moss" className="-left-28 top-1/3 h-80 w-80 opacity-10" />
      <div className="grid grid-cols-1 items-center gap-16 border-t border-border pt-24 text-left lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <Reveal variant="fade-up">
            <span className="block font-jet text-[10px] font-bold uppercase tracking-widest text-forest/40">
              Buyback Preview Generator
            </span>
            <h3 className="mt-3 font-serif text-4xl font-bold leading-tight text-forest-deep md:text-5xl">
              Preview Purchase Agreements
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-forest/75">
              Input your target crop and acreage scale to compile an instant draft minimum guarantee
              schedule detailing floor payout models and collection logistics intervals.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-forest/60">
                  Crop Type
                </label>
                <select
                  value={contractCrop}
                  onChange={(e) => {
                    setContractCrop(e.target.value);
                    setShowContractDraft(true);
                  }}
                  className="w-full rounded-xl border border-border bg-card px-3 py-3 text-xs font-bold text-forest-deep focus:border-forest focus:outline-none"
                >
                  <option>Tomato</option>
                  <option>Chilli</option>
                  <option>Capsicum</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-forest/60">
                  Acreage
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={contractAcres}
                  onChange={(e) => {
                    setContractAcres(parseInt(e.target.value) || 1);
                    setShowContractDraft(true);
                  }}
                  className="w-full rounded-xl border border-border bg-card px-3 py-3 text-xs font-bold text-forest-deep focus:border-forest focus:outline-none"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal variant="fade-left" delay={0.1}>
            <AnimatePresence mode="wait" initial={false}>
              {showContractDraft ? (
                <motion.div
                  key="draft"
                  className="relative space-y-6 overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 text-left font-mono text-xs shadow-sm"
                  initial={{ opacity: 0, x: 60, rotate: 1.5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -40, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                >
                  <PulseRing className="-right-8 -top-8 h-28 w-28" />
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="flex items-center gap-1.5 font-bold text-forest">
                      <FileText className="h-4 w-4" /> DRAFT AGREEMENT SCHEDULING
                    </span>
                    <span className="text-forest/40">CODE: AG-ML-DRAFT</span>
                  </div>
                  <div className="space-y-4 font-sans leading-relaxed text-forest-deep/80">
                    <p>
                      <strong>1. GUARANTEED RATE FLOOR:</strong> Agaate agrees to purchase certified
                      A-Grade {contractCrop} from the grower at a minimum floor rate of{" "}
                      <strong>₹{rate} / kg</strong>.
                    </p>
                    <p>
                      <strong>2. ESTIMATED DELIVERY CAPACITY:</strong> The contract block covering{" "}
                      {contractAcres} acres targets a seasonal harvest of{" "}
                      <strong>{estYieldKg.toLocaleString()} kg</strong>.
                    </p>
                    <p>
                      <strong>3. LOGISTICS DISPATCH SCHEDULE:</strong> Agaate vehicles will run
                      collection sweeps directly from the Jhajjar Regional Hub every{" "}
                      <strong>48 hours</strong> during peak picking.
                    </p>
                    <p className="border-t border-border/50 pt-4 font-mono text-xs font-bold text-forest">
                      ESTIMATED FLOOR REVENUE: ₹{minPayout.toLocaleString("en-IN")}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="standby"
                  className="flex min-h-[240px] flex-col items-center justify-center rounded-[2.5rem] border border-border bg-bone p-12 text-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FileText className="mx-auto mb-4 h-10 w-10 text-forest/30" />
                  </motion.div>
                  <h4 className="mb-1 font-serif text-2xl font-bold text-forest-deep">
                    Contract Draft Standby
                  </h4>
                  <p className="mx-auto max-w-xs text-xs text-forest/65">
                    Select crop and acreage in the inputs generator to compile purchase baseline
                    floor clauses.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
