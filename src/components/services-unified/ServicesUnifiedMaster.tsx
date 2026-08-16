import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, WhatsappLogo, X } from "@phosphor-icons/react";

import { UnifiedServicesHero } from "./UnifiedServicesHero";
import { ServicesNavDock } from "./ServicesNavDock";
import { UnifiedNurserySection } from "./UnifiedNurserySection";
import { UnifiedKisaanMallSection } from "./UnifiedKisaanMallSection";
import { UnifiedFarmTechSection } from "./UnifiedFarmTechSection";
import { UnifiedCarbonCreditsSection } from "./UnifiedCarbonCreditsSection";
import { UnifiedBigFarmSection } from "./UnifiedBigFarmSection";
import { UnifiedMarketLinkageSection } from "./UnifiedMarketLinkageSection";
import { UnifiedCropJourneySection } from "./UnifiedCropJourneySection";

import { CarbonEnrolModal } from "@/components/carbon-credits";
import { TurnkeyModal } from "@/components/big-farm-setup/TurnkeyModal";
import { BuybackEnrollmentModal } from "@/components/market-linkage";
import { UNIFIED_SERVICES_NAV } from "./services-unified-data";
import { WHATSAPP_CONSULTATION_URL } from "@/components/header/header-data";

export function ServicesUnifiedMaster() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isCarbonModalOpen, setIsCarbonModalOpen] = useState(false);
  const [isBuybackModalOpen, setIsBuybackModalOpen] = useState(false);
  const [isTurnkeyModalOpen, setIsTurnkeyModalOpen] = useState(false);

  // Market linkage crop & volume state
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [harvestQuintals, setHarvestQuintals] = useState(120);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Listen to hash changes on initial mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 300);
    }
  }, []);

  // IntersectionObserver to dynamically highlight visible section in nav dock
  useEffect(() => {
    const sectionIds = ["overview", ...UNIFIED_SERVICES_NAV.map((s) => s.id)];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* 00 · Hero Overview & Interactive Blueprint */}
      <UnifiedServicesHero
        onSectionClick={scrollToSection}
        onOpenConsultation={() => setIsConsultModalOpen(true)}
      />

      {/* Floating Sticky Quick-Nav Dock */}
      <ServicesNavDock
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onOpenConsultation={() => setIsConsultModalOpen(true)}
      />

      {/* 01 · Bio-Boosted Nursery */}
      <UnifiedNurserySection />

      {/* 02 · Agaate Kisaan Mall */}
      <UnifiedKisaanMallSection />

      {/* 03 · Farm Tech & IoT Intelligence */}
      <UnifiedFarmTechSection />

      {/* 04 · Carbon Credits & Soil Health */}
      <UnifiedCarbonCreditsSection onOpenEnrolModal={() => setIsCarbonModalOpen(true)} />

      {/* 05 · Big Farm Setup & Turnkey Estates */}
      <UnifiedBigFarmSection onOpenTurnkeyModal={() => setIsTurnkeyModalOpen(true)} />

      {/* 06 · Market Linkage & Guaranteed Buyback */}
      <UnifiedMarketLinkageSection
        selectedCropIndex={selectedCropIndex}
        onSelectCropIndex={setSelectedCropIndex}
        harvestQuintals={harvestQuintals}
        onChangeHarvestQuintals={setHarvestQuintals}
        onOpenBuybackModal={() => setIsBuybackModalOpen(true)}
      />

      {/* 07 · Integrated 8-Stage Crop Workflow */}
      <UnifiedCropJourneySection />

      {/* Global Enrolment Modals */}
      <CarbonEnrolModal isOpen={isCarbonModalOpen} onClose={() => setIsCarbonModalOpen(false)} />

      <BuybackEnrollmentModal
        isOpen={isBuybackModalOpen}
        onClose={() => setIsBuybackModalOpen(false)}
        selectedCropIndex={selectedCropIndex}
      />

      <TurnkeyModal isOpen={isTurnkeyModalOpen} onClose={() => setIsTurnkeyModalOpen(false)} />

      {/* Master Consultation Modal */}
      <AnimatePresence>
        {isConsultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#143d31]/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-[#143d31]/15 bg-white p-8 text-left shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsConsultModalOpen(false)}
                className="absolute right-5 top-5 cursor-pointer text-[#143d31]/40 hover:text-[#143d31]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#5d7d37]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    DIRECT SCIENTIFIC ADVISORY
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#143d31]">
                  Book Agronomist Consultation
                </h3>

                <p className="font-sans text-xs leading-relaxed text-[#4f624f]">
                  Connect directly with Agaate field specialists for soil reports, turnkey farm
                  setup, or Kisaan Mall bulk procurement.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={WHATSAPP_CONSULTATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-800"
                  >
                    <WhatsappLogo className="h-4 w-4" weight="fill" />
                    <span>Chat on WhatsApp (+91 83500 85005)</span>
                  </a>

                  <a
                    href="tel:8350085005"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#143d31]/20 bg-[#f4f8f5] py-3.5 font-mono text-xs font-bold text-[#143d31] hover:bg-[#143d31]/10"
                  >
                    <span>Direct Phone Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
