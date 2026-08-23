import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, WhatsappLogo } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { HOMEPAGE_CMS_FALLBACK } from "@/data/homepage-fallback";
import type { HomeCmsLogo } from "@/lib/cms-types";
import { EASE } from "@/components/common/motion";

interface MarketAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyers?: HomeCmsLogo[];
}

export function MarketAccessModal({
  isOpen,
  onClose,
  buyers,
}: MarketAccessModalProps) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");

  const partnerList =
    buyers && buyers.length > 0
      ? buyers
      : HOMEPAGE_CMS_FALLBACK.logos.buyers;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#071d15]/75 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl sm:rounded-[2rem] border border-[#143d31]/15 bg-[#fbfdfa] shadow-[0_25px_70px_rgba(7,29,21,0.35)] z-10 overflow-hidden text-[#143d31]"
          >
            {/* Modal Header */}
            <div className="relative shrink-0 border-b border-[#143d31]/10 bg-white/80 backdrop-blur-sm px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#a3e635] ring-2 ring-[#a3e635]/30 animate-pulse" />
                    <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                      {isHindi ? "संस्थागत खरीदार नेटवर्क" : "Institutional Offtake Network"}
                    </p>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#143d31]">
                    {isHindi
                      ? "मार्केट एक्सेस व खरीदार पार्टनर्स"
                      : "Market Access & Offtake Partners"}
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#143d31]/5 hover:bg-[#143d31]/10 text-[#143d31] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" weight="bold" />
                </button>
              </div>

              <p className="font-sans mt-2 text-xs sm:text-sm text-[#4f624f] max-w-2xl leading-relaxed">
                {isHindi
                  ? "अगाते से जुड़े शीर्ष क्विक-कॉमर्स, संगठित रिटेल और सीधे मंडी खरीदार — जो किसानों को पारदर्शी तौल और तुरंत भुगतान की गारंटी देते हैं।"
                  : "Leading quick-commerce platforms, organized retail chains, and direct mandi channels linked with Agaate farm-gate aggregation."}
              </p>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8">
              {/* Partner Logos Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "सक्रिय खरीदार ब्रांड्स" : "Active Procurement Partners"} ({partnerList.length})
                  </span>
                  <span className="text-[11px] font-medium text-[#4f624f]">
                    {isHindi ? "प्रमाणित ऑफटेक साझेदार" : "Verified Offtake Channels"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  {partnerList.map((partner, index) => (
                    <motion.div
                      key={partner.name + index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05, ease: EASE }}
                      className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#143d31]/10 bg-white p-4 sm:p-5 text-center shadow-xs transition-all duration-300 hover:border-[#143d31]/25 hover:shadow-md"
                    >
                      <div className="flex h-16 sm:h-20 w-full items-center justify-center overflow-hidden">
                        <img
                          src={partner.src}
                          alt={partner.name}
                          loading="lazy"
                          className="max-h-12 sm:max-h-14 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-108"
                        />
                      </div>
                      <div className="mt-2 w-full border-t border-[#143d31]/6 pt-2">
                        <p className="font-display text-xs sm:text-sm font-bold text-[#143d31] truncate">
                          {partner.name}
                        </p>
                        <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#5d7d37] uppercase tracking-wider">
                          {isHindi ? "ऑफटेक चैनल" : "Direct Offtake"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / WhatsApp CTA */}
            <div className="shrink-0 border-t border-[#143d31]/10 bg-white px-5 py-4 sm:px-8 sm:py-4 flex items-center justify-between gap-3">
              <p className="font-sans text-xs sm:text-sm font-medium text-[#143d31]">
                {isHindi
                  ? "फसल बिक्री के लिए संपर्क करें"
                  : "Ready to sell your harvest?"}
              </p>

              <a
                href="https://wa.me/919999176878?text=Hello%20Agaate%20Team%2C%20I%20want%20to%20know%20more%20about%20Market%20Linkage%20and%20Buyback"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                <WhatsappLogo className="h-4 w-4" weight="fill" />
                <span>{isHindi ? "व्हाट्सएप चैट" : "Chat on WhatsApp"}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
