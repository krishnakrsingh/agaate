import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EASE, SectionHeader } from "@/components/common/motion";
import {
  CROP_JOURNEY_STAGES_EN,
  CROP_JOURNEY_STAGES_HI,
} from "./services-overview-data";

export function CropJourneyStepper() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const CROP_JOURNEY_STAGES = isHindi ? CROP_JOURNEY_STAGES_HI : CROP_JOURNEY_STAGES_EN;

  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStage =
    CROP_JOURNEY_STAGES.find((s) => s.id === activeStageId) || CROP_JOURNEY_STAGES[0];

  return (
    <section id="crop-journey" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow={isHindi ? "बीज से बिक्री तक का संपूर्ण फसल चक्र" : "CLOSED-LOOP CROPPING LIFECYCLE"}
        title={isHindi ? "फसल यात्रा के 8 महत्वपूर्ण चरण।" : "Interactive 8-Stage Crop Journey."}
        description={
          isHindi
            ? "अगाते के वैज्ञानिक प्रोटोकॉल, इनपुट फॉर्मूलेशन और साझेदार नेटवर्क को समझने के लिए किसी भी चरण पर क्लिक करें।"
            : "Click on any stage below to inspect Agaate's exact scientific protocol, input formulations, and partner integrations."
        }
      />

      <div className="mt-14 rounded-[2.5rem] border border-border bg-bone p-6 shadow-sm md:p-10">
        {/* Stage Selector Pills */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {CROP_JOURNEY_STAGES.map((st) => {
            const isActive = activeStageId === st.id;
            const StageIcon = st.icon;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStageId(st.id)}
                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl p-3 text-center transition-all ${
                  isActive
                    ? "bg-forest-deep text-cream shadow-md"
                    : "border border-border bg-card text-forest/80 hover:border-forest/40"
                }`}
              >
                <span
                  className={`mb-1 font-mono text-[9px] font-bold ${
                    isActive ? "text-terracotta" : "text-forest/40"
                  }`}
                >
                  {isHindi ? `चरण 0${st.id}` : `STAGE 0${st.id}`}
                </span>
                <StageIcon className="mb-1 h-5 w-5" />
                <span className="font-serif text-xs font-bold leading-tight">{st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 rounded-3xl border border-forest/15 bg-card p-6 shadow-sm md:p-8"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-xs font-bold text-cream">
                    {isHindi ? `चरण 0${activeStage.id} (कुल 08)` : `Stage 0${activeStage.id} of 08`}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-terracotta">
                    {activeStage.benefit}
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-forest-deep">
                  {activeStage.title}
                </h3>
                <p className="text-base leading-relaxed text-forest/80">{activeStage.desc}</p>

                <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-bone p-4">
                    <span className="block font-mono text-[10px] font-bold uppercase text-forest/50">
                      {isHindi ? "जरूरी इनपुट्स व उपकरण" : "INPUTS & HARDWARE"}
                    </span>
                    <p className="mt-1 font-sans text-sm font-semibold text-forest-deep">
                      {activeStage.inputs}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-bone p-4">
                    <span className="block font-mono text-[10px] font-bold uppercase text-forest/50">
                      {isHindi ? "साझेदार नेटवर्क" : "PARTNER ECOSYSTEM"}
                    </span>
                    <p className="mt-1 font-sans text-sm font-semibold text-forest-deep">
                      {activeStage.partners}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-forest/10 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 text-center lg:col-span-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-deep text-cream">
                  {(() => {
                    const IconComponent = activeStage.icon;
                    return <IconComponent className="h-8 w-8" />;
                  })()}
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-moss">
                    STAGE OUTCOME GUARANTEE
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    {activeStage.benefit}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-forest/70">
                  "Managing farming outcome from seed selection to buyer collection."
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
