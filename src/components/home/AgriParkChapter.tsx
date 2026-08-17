import {
  ArrowRight,
  Brain,
  CheckCircle,
  Drop,
  Flask,
  GraduationCap,
  MapPin,
  Microscope,
  Plant,
  ShieldCheck,
  ShoppingCart,
} from "@phosphor-icons/react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import agroParkImage from "@/assets/agro-park.jpg";

const nurseryComparisonEn = [
  {
    label: "Survival rate",
    traditional: "50 – 70%",
    bioBoosted: "90 – 98%",
  },
  {
    label: "Seed waste",
    traditional: "30 – 50%",
    bioBoosted: "Near zero",
  },
  {
    label: "Chemical usage",
    traditional: "Heavy dependency",
    bioBoosted: "50 – 70% reduction",
  },
  {
    label: "Yield improvement",
    traditional: "Baseline",
    bioBoosted: "15 – 30% higher",
  },
];

const nurseryComparisonHi = [
  {
    label: "पौध जमाव व बचाव दर",
    traditional: "50 – 70%",
    bioBoosted: "90 – 98%",
  },
  {
    label: "बीज की बर्बादी",
    traditional: "30 – 50%",
    bioBoosted: "लगभग शून्य",
  },
  {
    label: "केमिकल स्प्रे निर्भरता",
    traditional: "अत्यधिक",
    bioBoosted: "50 – 70% तक कमी",
  },
  {
    label: "पैदावार क्षमता",
    traditional: "सामान्य",
    bioBoosted: "15 – 30% अधिक",
  },
];

const zonesEn = [
  { number: "01", icon: Plant, label: "Seed Zone", sub: "Variety selection" },
  { number: "02", icon: Microscope, label: "Nursery Zone", sub: "Plug trials" },
  { number: "03", icon: Drop, label: "Irrigation Zone", sub: "Live fertigation" },
  { number: "04", icon: Flask, label: "Nutrition Zone", sub: "Input trials" },
  { number: "05", icon: Brain, label: "Tech & Drone", sub: "AI monitoring" },
  { number: "06", icon: GraduationCap, label: "Training Hub", sub: "Workshops" },
  { number: "07", icon: ShieldCheck, label: "Protection Zone", sub: "Bio-cure" },
  { number: "08", icon: ShoppingCart, label: "Market Zone", sub: "Direct linkage" },
];

const zonesHi = [
  { number: "01", icon: Plant, label: "बीज ज़ोन", sub: "उन्नत किस्म चयन" },
  { number: "02", icon: Microscope, label: "नर्सरी ज़ोन", sub: "प्लग ट्रायल" },
  { number: "03", icon: Drop, label: "सिंचाई ज़ोन", sub: "लाइव ड्रिप फर्टीगेशन" },
  { number: "04", icon: Flask, label: "पोषण ज़ोन", sub: "सटीक इनपुट ट्रायल" },
  { number: "05", icon: Brain, label: "ड्रोन व टेक", sub: "एआई फील्ड निगरानी" },
  { number: "06", icon: GraduationCap, label: "प्रशिक्षण केंद्र", sub: "किसान वर्कशॉप" },
  { number: "07", icon: ShieldCheck, label: "सुरक्षा ज़ोन", sub: "जैविक सुरक्षा चक्र" },
  { number: "08", icon: ShoppingCart, label: "मार्केट ज़ोन", sub: "सीधा बाजार लिंकेज" },
];

export default function AgriParkChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [activeTab, setActiveTab] = useState<"nursery" | "park">("nursery");

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");

  const nurseryComparison = isHindi ? nurseryComparisonHi : nurseryComparisonEn;
  const zones = isHindi ? zonesHi : zonesEn;

  return (
    <section
      ref={sectionRef}
      id="agri-park"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        {/* ── 1. Top Section Header ── */}
        <div
          data-home-reveal
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1.5px] bg-[#5d7d37]" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "17-एकड़ स्मार्ट नर्सरी व एग्री पार्क" : "17-Acre Smart Nursery & Agri Park"}
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              {isHindi ? (
                <>
                  17 एकड़ का एक फार्म।{" "}
                  <span className="font-serif italic font-normal text-[#5d7d37]">
                    हर आधुनिक समाधान लाइव देखें।
                  </span>
                </>
              ) : (
                <>
                  One 17-acre farm.{" "}
                  <span className="font-serif italic font-normal text-[#5d7d37]">
                    Every solution demonstrated live.
                  </span>
                </>
              )}
            </h2>

            <p className="font-sans mt-4 text-sm sm:text-base leading-relaxed text-[#4f624f]">
              {isHindi
                ? "98% जमाव वाली बायो-बूस्टेड पौध से लेकर एआई ड्रोन मॉनिटरिंग और 8 फसल यात्रा ज़ोन तक — अपने खेत में लगाने से पहले वास्तविक जमीन पर काम करते देखें।"
                : "From Bio-Boosted seedlings with 98% survival to AI drone monitoring and 8 crop journey zones — see it work on real land before applying it to yours."}
            </p>
          </div>

          {/* Action CTA — Clean Single Button */}
          <div className="shrink-0">
            <Link
              to={getLocalizedPath("/agri-park", currentLang) as any}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#1a4d3e] transition-all cursor-pointer"
            >
              <span>{isHindi ? "एग्री पार्क विजिट प्लान करें" : "Plan Agri Park Visit"}</span>
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </Link>
          </div>
        </div>

        {/* ── 2. Side-by-Side Content Grid ── */}
        <div data-home-reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Spec Table (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#143d31]/10">
              <div>
                <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                  {isHindi ? "पौध विकास क्षमता" : "Seedling Performance"}
                </p>
                <h3 className="font-display text-xl font-bold text-[#143d31] mt-0.5">
                  {isHindi ? "उन्नत नर्सरी बनाम सीधी बुवाई" : "Nursery vs. Direct Sowing"}
                </h3>
              </div>
              <span className="rounded-full bg-[#5d7d37]/10 px-3 py-1 text-xs font-semibold text-[#5d7d37] border border-[#5d7d37]/20">
                {isHindi ? "98% जमाव दर" : "98% Survival"}
              </span>
            </div>

            <div className="divide-y divide-[#143d31]/10">
              <div className="grid grid-cols-3 py-2 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#143d31]/60">
                <span>{isHindi ? "मापदंड" : "Metric"}</span>
                <span className="text-[#143d31]/50">{isHindi ? "पारंपरिक बुवाई" : "Traditional"}</span>
                <span className="text-[#143d31]">{isHindi ? "बायो-बूस्टेड नर्सरी" : "Bio-Boosted"}</span>
              </div>
              {nurseryComparison.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 py-3 text-xs sm:text-sm items-center font-sans"
                >
                  <span className="font-medium text-[#143d31]">{row.label}</span>
                  <span className="text-[#4f624f]/70">{row.traditional}</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#143d31]">
                    <span>{row.bioBoosted}</span>
                    <CheckCircle className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#4f624f]">
              <span className="font-medium">
                {isHindi ? "17-एकड़ वातानुकूलित केंद्र" : "17-Acre Climate-Controlled Facility"}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase">
                {isHindi ? "शून्य मृत्यु दर प्रोटोकॉल" : "Zero Mortality Protocol"}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#143d31]/10">
              <span className="font-mono text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" />
                {isHindi ? "कुकरोला, गुरुग्राम" : "Kukrola, Gurugram"}
              </span>

              {/* Segmented Tab Switcher */}
              <div className="inline-flex rounded-full bg-[#143d31]/5 p-0.5 border border-[#143d31]/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("nursery")}
                  className={`rounded-full px-3.5 py-1 text-xs font-sans font-medium transition-all cursor-pointer ${
                    activeTab === "nursery"
                      ? "bg-[#143d31] text-white shadow-xs font-semibold"
                      : "text-[#4f624f] hover:text-[#143d31]"
                  }`}
                >
                  {isHindi ? "स्मार्ट नर्सरी केंद्र" : "Nursery Facility"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("park")}
                  className={`rounded-full px-3.5 py-1 text-xs font-sans font-medium transition-all cursor-pointer ${
                    activeTab === "park"
                      ? "bg-[#143d31] text-white shadow-xs font-semibold"
                      : "text-[#4f624f] hover:text-[#143d31]"
                  }`}
                >
                  {isHindi ? "एग्री पार्क फार्म" : "Agri Park Farm"}
                </button>
              </div>
            </div>

            {/* Showcase Visual */}
            <div className="relative aspect-[16/10] w-full flex items-center justify-center">
              {activeTab === "nursery" ? (
                <div className="relative h-full w-full flex items-center justify-center">
                  <img
                    src="/nursery.png"
                    alt={isHindi ? "बायो-बूस्टेड नर्सरी केंद्र" : "Bio-Boosted Nursery Facility"}
                    className="max-h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(20,61,49,0.12)] transition-transform duration-500 hover:scale-[1.01]"
                  />
                </div>
              ) : (
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#143d31]/10 shadow-sm">
                  <img
                    src={agroParkImage}
                    alt="Agri Park Kukrola"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#143d31]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="font-display text-base font-bold">
                      {isHindi ? "17-एकड़ लाइव प्रदर्शन फार्म" : "17-Acre Demonstration Farm"}
                    </p>
                    <p className="text-xs text-white/80 font-sans">
                      {isHindi
                        ? "एआई निगरानी, ड्रोन स्प्रे व लाइव फसल ट्रायल"
                        : "AI monitoring, drone spraying & live crop trials"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 3. 8-Zone Clean Minimal Strip ── */}
        <div data-home-reveal className="pt-6 border-t border-[#143d31]/10">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              {isHindi ? "फसल यात्रा · 8 फील्ड ज़ोन" : "WALK THE CROP JOURNEY · 8 FIELD ZONES"}
            </span>
            <span className="font-mono text-[10px] text-[#4f624f]">
              {isHindi ? "01 – 08 लाइव स्टेशन" : "01 – 08 Demonstration Stations"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {zones.map((z) => {
              const Icon = z.icon;
              return (
                <div
                  key={z.number}
                  className="group flex flex-col justify-between p-2.5 rounded-xl border border-[#143d31]/5 bg-white/50 hover:border-[#5d7d37]/25 hover:bg-white transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#5d7d37]">
                      {z.number}
                    </span>
                    <Icon className="h-3.5 w-3.5 text-[#143d31]/70 group-hover:text-[#143d31] transition-colors" />
                  </div>
                  <p className="font-display text-xs font-bold text-[#143d31] leading-tight">
                    {z.label}
                  </p>
                  <p className="text-[10px] text-[#4f624f] truncate mt-0.5 font-sans">{z.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
