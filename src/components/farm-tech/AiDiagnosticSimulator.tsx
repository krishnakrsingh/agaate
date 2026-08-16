import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Scan, Sparkle, Warning } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { AI_DIAGNOSES, type AiDiagnosisSample } from "./farm-tech-data";

export function AiDiagnosticSimulator() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<AiDiagnosisSample>(AI_DIAGNOSES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const handleSelectDiagnosis = (sample: AiDiagnosisSample) => {
    setSelectedDiagnosis(sample);
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  return (
    <section id="ai-diagnostics" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="AI COMPUTER VISION ENGINE"
        title="Instant Leaf Disease Diagnosis."
        description="Select any field leaf sample below to run Agaate's real-time diagnostic neural model and inspect the exact biological cure prescription."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Sample Selection Pills */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AI_DIAGNOSES.map((sample) => {
            const isSelected = selectedDiagnosis.id === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectDiagnosis(sample)}
                className={`relative flex cursor-pointer items-center gap-3 rounded-2xl p-3 text-left transition-all ${
                  isSelected
                    ? "border-2 border-forest-deep bg-bone shadow-md"
                    : "border border-border bg-card hover:border-forest/40"
                }`}
              >
                <img
                  src={sample.photoUrl}
                  alt={sample.crop}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <span className="block font-mono text-[9px] font-bold uppercase text-terracotta">
                    {sample.crop}
                  </span>
                  <span className="line-clamp-1 font-serif text-xs font-bold text-forest-deep">
                    {sample.disease.split(" (")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Simulator Workbench */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Photo Scanner Box */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-black lg:col-span-5">
            <img
              src={selectedDiagnosis.photoUrl}
              alt={selectedDiagnosis.crop}
              className="h-80 w-full object-cover opacity-90"
            />

            {/* Laser scanning beam overlay */}
            {isScanning && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981]"
              />
            )}

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl bg-black/70 px-4 py-2.5 text-white backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Scan className="h-4 w-4 text-emerald-400 animate-spin" />
                <span>{selectedDiagnosis.photoName}</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {isScanning
                  ? `Scanning ${scanProgress}%`
                  : `${selectedDiagnosis.confidence}% Match`}
              </span>
            </div>
          </div>

          {/* Diagnosis & Prescription Output */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-terracotta">
                  DETECTED PATHOGEN / DEFICIT
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-deep">
                  {selectedDiagnosis.disease}
                </h3>
              </div>
              <span className="rounded-full bg-red-100 px-3.5 py-1 font-mono text-xs font-bold text-red-800">
                {selectedDiagnosis.severity}
              </span>
            </div>

            <div className="space-y-3 font-sans text-sm">
              <div className="rounded-xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  OBSERVED SYMPTOMS
                </span>
                <p className="mt-1 text-forest-deep">{selectedDiagnosis.symptoms}</p>
              </div>

              <div className="rounded-xl border border-border bg-bone p-4">
                <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
                  ENVIRONMENTAL ROOT CAUSE
                </span>
                <p className="mt-1 text-forest-deep">{selectedDiagnosis.rootCause}</p>
              </div>
            </div>

            {/* Prescribed Solution Card */}
            <div className="space-y-3 rounded-2xl border border-forest/20 bg-emerald-50/50 p-5">
              <div className="flex items-center gap-2 text-emerald-800">
                <Sparkle className="h-4 w-4" />
                <span className="font-mono text-xs font-bold uppercase">
                  AGAATE PRESCRIBED BIOLOGICAL CURE
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-600/20 bg-white p-3">
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    PRIMARY TREATMENT
                  </span>
                  <p className="font-serif text-sm font-bold text-forest-deep">
                    {selectedDiagnosis.recommendation.primaryProduct}
                  </p>
                  <p className="mt-1 font-mono text-xs text-forest/70">
                    {selectedDiagnosis.recommendation.primaryDose}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-600/20 bg-white p-3">
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    FOLLOW-UP BOOSTER
                  </span>
                  <p className="font-serif text-sm font-bold text-forest-deep">
                    {selectedDiagnosis.recommendation.secondaryProduct}
                  </p>
                  <p className="mt-1 font-mono text-xs text-forest/70">
                    {selectedDiagnosis.recommendation.secondaryDose}
                  </p>
                </div>
              </div>

              <p className="pt-1 text-xs text-emerald-900">
                <span className="font-bold">Cultural Advice: </span>
                {selectedDiagnosis.recommendation.culturalAdvice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
