import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinLine,
  Truck,
  CheckCircle,
  Lightning,
  Clock,
  ShieldCheck,
  CurrencyInr,
  MagnifyingGlass,
  ArrowRight,
  Package,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const PRESET_PINCODES = [
  { pin: "800001", label: "Patna (Bihar)" },
  { pin: "221001", label: "Varanasi (UP)" },
  { pin: "482001", label: "Jabalpur (MP)" },
  { pin: "302001", label: "Jaipur (RJ)" },
  { pin: "411001", label: "Pune (MH)" },
];

function getRegionFromPincode(pin: string, isHindi: boolean) {
  const firstDigit = pin[0];
  switch (firstDigit) {
    case "1":
      return isHindi ? "दिल्ली NCR / हरियाणा / पंजाब हब" : "Delhi NCR / Haryana / Punjab Hub";
    case "2":
      return isHindi ? "उत्तर प्रदेश / उत्तराखंड हब" : "UP & Uttarakhand Regional Hub";
    case "3":
      return isHindi ? "राजस्थान / गुजरात हब" : "Rajasthan & Gujarat Regional Hub";
    case "4":
      return isHindi ? "मध्य प्रदेश / महाराष्ट्र हब" : "Madhya Pradesh & Maharashtra Hub";
    case "5":
    case "6":
      return isHindi ? "दक्षिण भारत क्षेत्रीय हब" : "South India Regional Hub";
    case "7":
      return isHindi ? "पश्चिम बंगाल / पूर्वोत्तर हब" : "West Bengal & East Hub";
    case "8":
      return isHindi ? "बिहार / झारखंड हब" : "Bihar & Jharkhand Regional Hub";
    default:
      return isHindi ? "अगाते राष्ट्रीय लॉजिस्टिक्स नेटवर्क" : "Agaate National Express Network";
  }
}

export default function PincodeDeliveryChecker() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");

  const [pincode, setPincode] = useState("");
  const [activeResult, setActiveResult] = useState<{
    pin: string;
    hub: string;
    isExpress: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (inputPin?: string) => {
    const pinToTest = (inputPin || pincode).trim();
    setErrorMsg("");

    if (!pinToTest) {
      setErrorMsg(
        isHindi
          ? "कृपया 6 अंकों का PIN कोड दर्ज करें"
          : "Please enter a valid 6-digit PIN code"
      );
      return;
    }

    if (!/^\d{6}$/.test(pinToTest)) {
      setErrorMsg(
        isHindi
          ? "कृपया 6 अंकों का सही भारतीय PIN कोड दर्ज करें"
          : "PIN code must be exactly 6 numeric digits"
      );
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setActiveResult({
        pin: pinToTest,
        hub: getRegionFromPincode(pinToTest, isHindi),
        isExpress: true,
      });
    }, 350);
  };

  return (
    <div className="rounded-2xl border border-[#143d31]/15 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31]">
              <MapPinLine className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5d7d37]">
              {isHindi ? "डिलीवरी व पिनकोड सेवा क्षेत्र" : "Delivery & Pincode Serviceability"}
            </span>
          </div>
          <h4 className="font-display text-base sm:text-lg font-bold text-[#143d31]">
            {isHindi
              ? "अपने खेत तक डिलीवरी और समय जांचें"
              : "Check Delivery & Serviceability to Your Farm"}
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#a3e635]/20 px-2.5 py-1 text-[11px] font-semibold text-[#143d31] border border-[#a3e635]/40 shrink-0">
          <Truck className="h-3.5 w-3.5 text-[#143d31]" />
          {isHindi ? "15,000+ पिनकोड" : "15,000+ PIN Codes"}
        </span>
      </div>

      {/* Input Box */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-3.5 text-[#4f624f]">
            <MagnifyingGlass className="h-4 w-4" />
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
              if (e.key === "Enter") {
                handleCheck();
              }
            }}
            placeholder={
              isHindi
                ? "6 अंकों का पिनकोड (उदा. 800001)"
                : "Enter 6-digit Pincode (e.g. 800001)"
            }
            className="w-full rounded-xl border border-[#143d31]/20 bg-[#f4f8f5] py-2.5 pl-10 pr-28 text-sm font-medium text-[#143d31] placeholder-[#4f624f]/60 focus:border-[#143d31] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143d31]/10 transition-all"
          />
          <button
            type="button"
            onClick={() => handleCheck()}
            disabled={isChecking}
            className="absolute right-1.5 rounded-lg bg-[#143d31] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1c5242] active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1"
          >
            {isChecking ? (
              <span>{isHindi ? "जांच हो रही..." : "Checking..."}</span>
            ) : (
              <>
                <span>{isHindi ? "जांचें" : "Check"}</span>
                <ArrowRight className="h-3 w-3" />
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 font-medium pl-1">{errorMsg}</p>
        )}

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-[#4f624f] mr-1">
            {isHindi ? "त्वरित जांच:" : "Try Pincodes:"}
          </span>
          {PRESET_PINCODES.map((item) => (
            <button
              key={item.pin}
              type="button"
              onClick={() => {
                setPincode(item.pin);
                handleCheck(item.pin);
              }}
              className="rounded-md border border-[#143d31]/15 bg-[#f4f8f5] px-2 py-0.5 text-[11px] font-medium text-[#143d31] hover:border-[#143d31] hover:bg-[#143d31]/5 transition-colors cursor-pointer"
            >
              {item.pin} <span className="text-[#4f624f]/70">({item.label.split(" ")[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      <AnimatePresence mode="wait">
        {activeResult ? (
          <motion.div
            key={activeResult.pin}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl bg-[#143d31] p-4 text-white space-y-3 shadow-inner"
          >
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a3e635] text-[#143d31] shrink-0 font-bold">
                  <Lightning className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#a3e635]">
                      PIN {activeResult.pin}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="text-xs font-semibold text-white/90">
                      {isHindi ? "सेवा उपलब्ध है" : "Deliverable"}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    {activeResult.hub}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-[#a3e635] tracking-wide uppercase">
                {isHindi ? "खेत डिलीवरी" : "Express Dispatch"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85 pt-0.5">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#a3e635] shrink-0" />
                <span>
                  {isHindi
                    ? "अनुमानित डिलीवरी: 2-3 कार्यदिवस"
                    : "Est. Gate Delivery: 2–3 Days"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-[#a3e635] shrink-0" />
                <span>
                  {isHindi
                    ? "₹499 से ऊपर मुफ्त डोरस्टेप डिलीवरी"
                    : "Free Doorstep Delivery on orders ₹499+"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#a3e635] shrink-0" />
                <span>
                  {isHindi
                    ? "100% क्यूआर-सील असली उत्पाद की गारंटी"
                    : "100% Direct QR-Verified Sealed Batch"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyInr className="h-3.5 w-3.5 text-[#a3e635] shrink-0" />
                <span>
                  {isHindi
                    ? "कैश ऑन डिलीवरी (COD) की सुविधा"
                    : "Cash on Delivery Available"}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#143d31]/20 bg-[#f4f8f5]/60 p-3.5 text-center">
            <p className="text-xs text-[#4f624f] leading-relaxed">
              {isHindi
                ? "📍 अगाते मॉल नेटवर्क 15,000+ पिनकोड में सीधे आपके खेत के गेट तक खाद, बीज व ड्रिप किट सुरक्षित पहुंचाता है।"
                : "📍 Agaate Mall delivers seeds, biologicals, & drip kits straight to field gates across 15,000+ PIN codes with live tracking."}
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* Feature Highlights Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <div className="flex items-center gap-1.5 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-[11px] font-medium text-[#143d31]">
          <Truck className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
          <span className="truncate">{isHindi ? "खेत के गेट तक" : "Field Gate Express"}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-[11px] font-medium text-[#143d31]">
          <Package className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
          <span className="truncate">{isHindi ? "सुरक्षित पैकिंग" : "Sealed Batch"}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-[11px] font-medium text-[#143d31]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
          <span className="truncate">{isHindi ? "100% असली" : "QR Authentic"}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-[11px] font-medium text-[#143d31]">
          <CurrencyInr className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
          <span className="truncate">{isHindi ? "COD सुविधा" : "COD Available"}</span>
        </div>
      </div>
    </div>
  );
}
