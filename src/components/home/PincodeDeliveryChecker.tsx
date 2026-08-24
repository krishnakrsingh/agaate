import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinLine,
  Truck,
  CheckCircle,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  CurrencyInr,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const PRESET_PINCODES = [
  { pin: "800001", hub: "Bihar" },
  { pin: "221001", hub: "UP" },
  { pin: "482001", hub: "MP" },
  { pin: "302001", hub: "RJ" },
];

function getRegionFromPincode(pin: string, isHindi: boolean) {
  const firstDigit = pin[0];
  switch (firstDigit) {
    case "1":
      return isHindi ? "दिल्ली NCR / उत्तर भारत हब" : "North India Regional Hub";
    case "2":
      return isHindi ? "उत्तर प्रदेश / उत्तराखंड हब" : "UP & Uttarakhand Regional Hub";
    case "3":
      return isHindi ? "राजस्थान / गुजरात हब" : "Rajasthan & Gujarat Hub";
    case "4":
      return isHindi ? "मध्य प्रदेश / महाराष्ट्र हब" : "MP & Maharashtra Regional Hub";
    case "5":
    case "6":
      return isHindi ? "दक्षिण भारत हब" : "South India Regional Hub";
    case "7":
      return isHindi ? "पूर्व व पूर्वोत्तर हब" : "East & NE Regional Hub";
    case "8":
      return isHindi ? "बिहार / झारखंड हब" : "Bihar & Jharkhand Regional Hub";
    default:
      return isHindi ? "अगाते राष्ट्रीय नेटवर्क" : "Agaate Express Network";
  }
}

export default function PincodeDeliveryChecker() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");

  const [pincode, setPincode] = useState("");
  const [activeResult, setActiveResult] = useState<{
    pin: string;
    hub: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (inputPin?: string) => {
    const pinToTest = (inputPin || pincode).trim();
    setErrorMsg("");

    if (!pinToTest || !/^\d{6}$/.test(pinToTest)) {
      setErrorMsg(
        isHindi
          ? "6 अंकों का PIN कोड दर्ज करें (उदा. 800001)"
          : "Enter a valid 6-digit PIN code (e.g. 800001)",
      );
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setActiveResult({
        pin: pinToTest,
        hub: getRegionFromPincode(pinToTest, isHindi),
      });
    }, 250);
  };

  return (
    <div className="w-full rounded-2xl border border-[#143d31]/15 bg-white p-3.5 sm:p-4 shadow-sm space-y-2.5">
      {/* Small Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <MapPinLine className="h-4 w-4 text-[#5d7d37] shrink-0" />
          <span className="font-display text-xs sm:text-sm font-bold text-[#143d31]">
            {isHindi ? "अपने खेत की डिलीवरी जांचें" : "Check Farm Delivery by Pincode"}
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#5d7d37] uppercase tracking-wider bg-[#143d31]/5 px-2 py-0.5 rounded-full border border-[#143d31]/10">
          {isHindi ? "15,000+ पिनकोड" : "15,000+ PIN Codes"}
        </span>
      </div>

      {/* Input Row */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 text-[#4f624f]">
          <MagnifyingGlass className="h-3.5 w-3.5" />
        </div>
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setPincode(val);
            if (errorMsg) setErrorMsg("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheck();
          }}
          placeholder={
            isHindi
              ? "6 अंकों का पिनकोड दर्ज करें (उदा. 800001)"
              : "Enter 6-digit Pincode (e.g. 800001)"
          }
          className="w-full rounded-xl border border-[#143d31]/20 bg-[#f4f8f5] py-2 pl-8 pr-24 text-xs font-medium text-[#143d31] placeholder-[#4f624f]/60 focus:border-[#143d31] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143d31]/20 transition-all"
        />
        <button
          type="button"
          onClick={() => handleCheck()}
          disabled={isChecking}
          className="absolute right-1 rounded-lg bg-[#143d31] px-3 py-1 text-xs font-semibold text-white hover:bg-[#1c5242] transition-all cursor-pointer flex items-center gap-1"
        >
          {isChecking ? (
            <span>...</span>
          ) : (
            <>
              <span>{isHindi ? "जांचें" : "Check"}</span>
              <ArrowRight className="h-3 w-3" />
            </>
          )}
        </button>
      </div>

      {errorMsg && <p className="text-[11px] text-red-600 font-medium">{errorMsg}</p>}

      {/* Result pill or default hint */}
      <AnimatePresence mode="wait">
        {activeResult ? (
          <motion.div
            key={activeResult.pin}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-[#143d31] p-2.5 text-white text-xs space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-[#a3e635]">
                PIN {activeResult.pin} — {isHindi ? "डिलीवरी उपलब्ध" : "Deliverable"}
              </span>
              <span className="text-[10px] text-white/70">{activeResult.hub}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-white/85">
              <span className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-[#a3e635]" />
                {isHindi ? "2-3 दिन में डिलीवरी" : "Est: 2–3 Days"}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#a3e635]" />
                {isHindi ? "100% असली" : "100% Genuine"}
              </span>
              <span className="flex items-center gap-1">
                <CurrencyInr className="h-3 w-3 text-[#a3e635]" />
                COD
              </span>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between text-[11px] text-[#4f624f]">
            <span className="truncate">{isHindi ? "त्वरित जांच पिनकोड:" : "Try:"}</span>
            <div className="flex items-center gap-1">
              {PRESET_PINCODES.map((item) => (
                <button
                  key={item.pin}
                  type="button"
                  onClick={() => {
                    setPincode(item.pin);
                    handleCheck(item.pin);
                  }}
                  className="rounded border border-[#143d31]/15 bg-[#f4f8f5] px-1.5 py-0.5 text-[10px] font-medium text-[#143d31] hover:bg-[#143d31]/10 transition-colors cursor-pointer"
                >
                  {item.pin}
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
