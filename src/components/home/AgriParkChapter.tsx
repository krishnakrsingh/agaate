import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle,
  Compass,
  Drop,
  Flask,
  GraduationCap,
  MapPin,
  Microscope,
  Plant,
  Pulse,
  ShieldCheck,
  ShoppingCart,
  Sparkle,
} from "@phosphor-icons/react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import agroParkImage from "@/assets/agro-park.jpg";
import { EASE } from "@/components/common/motion";

/* ── Nursery Performance Comparison Data ── */
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

/* ── 8 Innovation Zones Comprehensive Data ── */
interface ZoneDetail {
  number: string;
  id: string;
  icon: any;
  label: string;
  sub: string;
  badge: string;
  desc: string;
  stat: string;
  statLabel: string;
  crops: string;
  partners: string[];
}

const zonesEn: ZoneDetail[] = [
  {
    number: "01",
    id: "seed",
    icon: Plant,
    label: "Seed Zone",
    sub: "Variety selection",
    badge: "Zone 01 · Germination Vigor",
    desc: "Live open test beds evaluating germination rate, early root vigor, and disease tolerance across 15+ high-yielding vegetable hybrids before field sowing.",
    stat: "99.2%",
    statLabel: "Germination Vigor",
    crops: "Hybrid Tomato (Abhinav), Chilli (Tejaswini), Cauliflower",
    partners: ["Seminis", "Sakata Seeds", "Namdhari Seeds"],
  },
  {
    number: "02",
    id: "nursery",
    icon: Microscope,
    label: "Nursery Zone",
    sub: "Bio plug trials",
    badge: "Zone 02 · Root Architecture",
    desc: "Controlled climate chambers raising high-immunity plug saplings inoculated with organic bio-boosters for zero transplant shock and vigorous rooting.",
    stat: "98%",
    statLabel: "Survival Rate",
    crops: "Bio-Boosted Chillies, Brinjal, Tomato Plugs",
    partners: ["Agaate BioLabs", "Stanes Symbion"],
  },
  {
    number: "03",
    id: "irrigation",
    icon: Drop,
    label: "Irrigation Zone",
    sub: "Live fertigation",
    badge: "Zone 03 · Water & Drip Tech",
    desc: "Pressure-compensating inline drip network demonstrating automated venturi dosing, sand filtration, and precise nutrient delivery directly to the root zone.",
    stat: "-40%",
    statLabel: "Water Consumption",
    crops: "Cucumber, Watermelon, Capsicum",
    partners: ["Netafim Israel", "Jain Irrigation"],
  },
  {
    number: "04",
    id: "nutrition",
    icon: Flask,
    label: "Nutrition Zone",
    sub: "Input trials",
    badge: "Zone 04 · Soil Bio-Nutrition",
    desc: "Comparative plots evaluating soil organic carbon accumulation, staged macronutrient dosing, and chelated foliar micronutrient applications.",
    stat: "+1.2%",
    statLabel: "Organic Carbon Gain",
    crops: "Spinach, Lettuce, Cabbage, Gourds",
    partners: ["Yara Fertilizers", "Biovita", "Plantex"],
  },
  {
    number: "05",
    id: "tech",
    icon: Brain,
    label: "Tech & Drone",
    sub: "AI field telemetry",
    badge: "Zone 05 · Precision AgTech",
    desc: "Command hub demonstrating solar IoT soil probes, autonomous drone multispectral scouting flights, and real-time NDVI vegetation stress heatmaps.",
    stat: "4G LoRa",
    statLabel: "Mesh Telemetry Live",
    crops: "17-Acre Master Open Field",
    partners: ["Anzix Farm Tech", "AWS Agri", "DJI Agri Drones"],
  },
  {
    number: "06",
    id: "training",
    icon: GraduationCap,
    label: "Training Hub",
    sub: "Hands-on workshops",
    badge: "Zone 06 · Practical Education",
    desc: "Open-air masterclass auditorium and practice field where farmers learn modern bamboo trellis staking, fertigation calibration, and photo diagnosis.",
    stat: "2,000+",
    statLabel: "Farmers Trained",
    crops: "Demonstration & Practice Beds",
    partners: ["CSAUT Kanpur", "Agaate Kisan Sathi"],
  },
  {
    number: "07",
    id: "protection",
    icon: ShieldCheck,
    label: "Protection Zone",
    sub: "Bio-cure protocol",
    badge: "Zone 07 · Zero-Residue Bio-Cure",
    desc: "Residue-free plant protection beds demonstrating biological fungicides, botanical repellents, and micro-weather disease forecasting protocols.",
    stat: "0.00 ppm",
    statLabel: "Residue-Free Certified",
    crops: "Capsicum, Tomato, Cauliflower",
    partners: ["Bayer CropScience Bio", "Biocure F", "Bio Nimaton"],
  },
  {
    number: "08",
    id: "market",
    icon: ShoppingCart,
    label: "Market Zone",
    sub: "Direct buyback",
    badge: "Zone 08 · Guaranteed Buyback",
    desc: "Post-harvest quality grading, cold staging, and direct buyback aggregation connecting farm harvest to institutional buyers like Blinkit and Flipkart.",
    stat: "100%",
    statLabel: "Assured Buyback",
    crops: "Export & Retail Grade Produce",
    partners: ["Agaate Buyback", "Kisaan Mall", "Blinkit"],
  },
];

const zonesHi: ZoneDetail[] = [
  {
    number: "01",
    id: "seed",
    icon: Plant,
    label: "बीज ज़ोन",
    sub: "उन्नत किस्म चयन",
    badge: "ज़ोन 01 · बीज अंकुरण व शक्ति",
    desc: "खेत में बुवाई से पहले 15+ उन्नत हाइब्रिड किस्मों के अंकुरण, शुरुआती जड़ विकास और रोग प्रतिरोधक क्षमता का खुली जमीन पर लाइव परीक्षण।",
    stat: "99.2%",
    statLabel: "अंकुरण क्षमता",
    crops: "हाइब्रिड टमाटर (अभिनव), मिर्च (तेजस्विनी), फूलगोभी",
    partners: ["सेमिनिस", "साकाटा सीड्स", "नामधारी सीड्स"],
  },
  {
    number: "02",
    id: "nursery",
    icon: Microscope,
    label: "नर्सरी ज़ोन",
    sub: "प्लग ट्रायल",
    badge: "ज़ोन 02 · मजबूत जड़ संरचना",
    desc: "वातानुकूलित जर्मिनेशन चैंबर में तैयार 100% निरोगी बायो-बूस्टेड प्लग पौध, जो देती है बिना किसी रोपाई झटके के तेज बढ़वार।",
    stat: "98%",
    statLabel: "पौध जमाव दर",
    crops: "बायो-बूस्टेड मिर्च, बैंगन, टमाटर प्लग",
    partners: ["अगाते बायोलैब्स", "स्टेन्स सिम्बायोन"],
  },
  {
    number: "03",
    id: "irrigation",
    icon: Drop,
    label: "सिंचाई ज़ोन",
    sub: "लाइव ड्रिप फर्टीगेशन",
    badge: "ज़ोन 03 · ड्रिप व जल तकनीक",
    desc: "प्रेशर-कंपनसेटिंग ड्रिप नेटवर्क, ऑटोमैटिक वेंचुरी फर्टीगेशन और सीधे जड़ों तक पानी व खाद पहुंचाने की लाइव व्यवस्था।",
    stat: "-40%",
    statLabel: "पानी की बचत",
    crops: "खीरा, तरबूज, शिमला मिर्च",
    partners: ["नेटाफिम इज़राइल", "जैन इरिगेशन"],
  },
  {
    number: "04",
    id: "nutrition",
    icon: Flask,
    label: "पोषण ज़ोन",
    sub: "सटीक इनपुट ट्रायल",
    badge: "ज़ोन 04 · मिट्टी व जैविक पोषण",
    desc: "मिट्टी में ऑर्गेनिक कार्बन वृद्धि, चरणबद्ध संतुलित पोषण और सूक्ष्म पोषक तत्वों के लाइव स्प्रे ट्रायल प्लॉट।",
    stat: "+1.2%",
    statLabel: "ऑर्गेनिक कार्बन वृद्धि",
    crops: "पालक, पत्तागोभी, लौकी, तोरी",
    partners: ["यारा फर्टिलाइजर्स", "बायोविटा", "प्लान्टेक्स"],
  },
  {
    number: "05",
    id: "tech",
    icon: Brain,
    label: "ड्रोन व टेक",
    sub: "एआई फील्ड निगरानी",
    badge: "ज़ोन 05 · आधुनिक एग्री-टेक",
    desc: "सोलर पावर्ड IoT सॉइल सेंसर, ऑटोमैटिक ड्रोन स्कैनिंग और एनडीवीआई इंफ्रारेड फसल तनाव हीटमैप का लाइव कंट्रोल रूम।",
    stat: "4G LoRa",
    statLabel: "लाइव फील्ड सेंसर्स",
    crops: "17-एकड़ मास्टर ओपन फार्म",
    partners: ["एंजिक्स फार्म टेक", "एडब्ल्यूएस एग्री", "डीजेआई ड्रोन"],
  },
  {
    number: "06",
    id: "training",
    icon: GraduationCap,
    label: "प्रशिक्षण केंद्र",
    sub: "किसान वर्कशॉप",
    badge: "ज़ोन 06 · व्यावहारिक प्रशिक्षण",
    desc: "खुला सभागार व प्रायोगिक फार्म जहां किसान बांस-स्टेकिंग, फर्टीगेशन पंप कैलिब्रेशन और बीमारी पहचान का प्रैक्टिकल प्रशिक्षण लेते हैं।",
    stat: "2,000+",
    statLabel: "प्रशिक्षित किसान",
    crops: "डेमोस्ट्रेशन व ट्रेनिंग प्लॉट्स",
    partners: ["सीएसएयूटी कानपुर", "अगाते किसान साथी"],
  },
  {
    number: "07",
    id: "protection",
    icon: ShieldCheck,
    label: "सुरक्षा ज़ोन",
    sub: "जैविक सुरक्षा चक्र",
    badge: "ज़ोन 07 · शून्य-केमिकल सुरक्षा",
    desc: "बिना हानिकारक केमिकल के जैविक फफूंदनाशक, नीम-आधारित कीटनाशक और मौसम-आधारित बीमारी पूर्व-चेतावनी प्रणाली।",
    stat: "0.00 ppm",
    statLabel: "अवशेष-मुक्त प्रमाणित",
    crops: "शिमला मिर्च, टमाटर, फूलगोभी",
    partners: ["बायर बायो", "बायोक्योर एफ", "बायो निमैटन"],
  },
  {
    number: "08",
    id: "market",
    icon: ShoppingCart,
    label: "मार्केट ज़ोन",
    sub: "सीधा बाजार लिंकेज",
    badge: "ज़ोन 08 · पक्का बायबैक",
    desc: "फसल तुड़ाई के बाद डिजिटल ग्रेडिंग, कोल्ड स्टेजिंग और ब्लिंकिट व फ्लिपकार्ट जैसे बड़े खरीदारों को सीधे बायबैक की पारदर्शी व्यवस्था।",
    stat: "100%",
    statLabel: "पक्का बायबैक अनुबंध",
    crops: "मार्केट-रेडी ए-ग्रेड फसलें",
    partners: ["अगाते बायबैक", "किसान मॉल", "ब्लिंकिट"],
  },
];

export default function AgriParkChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [activeTab, setActiveTab] = useState<"zones" | "nursery">("zones");
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");

  const nurseryComparison = isHindi ? nurseryComparisonHi : nurseryComparisonEn;
  const zones = isHindi ? zonesHi : zonesEn;
  const activeZone = zones[selectedZoneIndex] || zones[0];
  const ActiveZoneIcon = activeZone.icon;

  return (
    <>
      <section
        ref={sectionRef}
        id="agri-park"
        className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
          {/* ── 1. Header (Exact Font & Color Style from Success Stories) ── */}
          <div data-home-reveal className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi
                  ? "17-एकड़ स्मार्ट नर्सरी व एग्री पार्क"
                  : "17-Acre Smart Nursery & Agri Park"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
                {isHindi
                  ? "17 एकड़ का एक फार्म, हर समाधान वास्तविक जमीन पर लाइव देखें"
                  : "One 17-acre living farm, every solution demonstrated live"}
              </h2>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#143d31] px-6 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a4d3e] transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4 text-[#a3e635]" />
                  <span>{isHindi ? "विजिट शेड्यूल करें" : "Book VIP Farm Visit"}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </button>

                <Link
                  to={getLocalizedPath("/agri-park", currentLang) as any}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#143d31]/20 bg-white/70 px-5 py-3.5 text-xs font-bold text-[#143d31] hover:bg-white transition-all cursor-pointer"
                >
                  <Compass className="h-4 w-4 text-[#5d7d37]" />
                  <span>{isHindi ? "पूरा 8-ज़ोन मॉडल" : "Explore Masterplan"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── 2. Core Interactive Feature Grid (Clean Layout) ── */}
          <div data-home-reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Interactive Tabbed Detail Card (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Segmented View Switcher Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#143d31]/10">
                <span className="font-mono text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider">
                  {activeTab === "zones"
                    ? isHindi
                      ? "8-ज़ोन लाइव फील्ड स्टेशन"
                      : "8 Living Innovation Zones"
                    : isHindi
                      ? "पौध विकास क्षमता व तकनीक"
                      : "High-Immunity Nursery Tech"}
                </span>

                <div className="inline-flex rounded-full bg-[#143d31]/5 p-0.5 border border-[#143d31]/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab("zones")}
                    className={`rounded-full px-3.5 py-1 text-xs font-sans font-medium transition-all cursor-pointer ${
                      activeTab === "zones"
                        ? "bg-[#143d31] text-white shadow-xs font-semibold"
                        : "text-[#4f624f] hover:text-[#143d31]"
                    }`}
                  >
                    {isHindi ? "8 फसल ज़ोन" : "8 Crop Zones"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("nursery")}
                    className={`rounded-full px-3.5 py-1 text-xs font-sans font-medium transition-all cursor-pointer ${
                      activeTab === "nursery"
                        ? "bg-[#143d31] text-white shadow-xs font-semibold"
                        : "text-[#4f624f] hover:text-[#143d31]"
                    }`}
                  >
                    {isHindi ? "नर्सरी तुलना" : "Nursery Benchmarks"}
                  </button>
                </div>
              </div>

              {/* View Content */}
              <AnimatePresence mode="wait">
                {activeTab === "zones" ? (
                  <motion.div
                    key={`zone-tab-${activeZone.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="p-1 space-y-5"
                  >
                    {/* Zone Badge + Telemetry */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5d7d37]/10 px-3 py-1 font-mono text-[10px] font-bold text-[#5d7d37]">
                        {activeZone.badge}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#5d7d37] flex items-center gap-1">
                        <Pulse className="h-3 w-3 animate-pulse text-[#5d7d37]" />
                        {isHindi ? "लाइव फील्ड ट्रायल" : "Live Field Trial"}
                      </span>
                    </div>

                    {/* Zone Header */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                        <ActiveZoneIcon className="h-5 w-5 text-[#143d31]" weight="duotone" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] leading-tight">
                          {activeZone.label} — {activeZone.sub}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed mt-1 font-normal">
                          {activeZone.desc}
                        </p>
                      </div>
                    </div>

                    {/* Metrics & Crop Parameters Strip */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#143d31]/10 font-sans">
                      <div className="p-3">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-[#4f624f]">
                          {isHindi ? "परीक्षण फसलें" : "Tested Crops"}
                        </span>
                        <span className="font-display text-xs sm:text-sm font-bold text-[#143d31] mt-0.5 block truncate">
                          {activeZone.crops}
                        </span>
                      </div>
                      <div className="p-3 border-l border-[#143d31]/10">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-[#4f624f]">
                          {activeZone.statLabel}
                        </span>
                        <span className="font-display text-xs sm:text-sm font-bold text-[#143d31] mt-0.5 block">
                          {activeZone.stat}
                        </span>
                      </div>
                    </div>

                    {/* Co-developed Partner Brands Strip */}
                    <div className="pt-2 border-t border-[#143d31]/10">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-[#4f624f] font-bold mb-2">
                        {isHindi ? "लाइव ट्रायल साझेदार ब्रांड्स" : "Collaborative Brand Partners"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeZone.partners.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#143d31]/10 bg-white/70 px-2.5 py-1 font-mono text-[10px] font-bold text-[#143d31]"
                          >
                            <Sparkle className="h-2.5 w-2.5 text-[#5d7d37]" />
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="nursery-benchmark-table"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="p-1 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#143d31]/10">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider">
                          {isHindi ? "प्रमाणित आंकड़े" : "Benchmarked Data"}
                        </p>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#143d31]">
                          {isHindi
                            ? "उन्नत नर्सरी बनाम सीधी बुवाई"
                            : "Bio Nursery vs. Direct Sowing"}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#5d7d37]/10 px-3 py-1 text-xs font-semibold text-[#5d7d37]">
                        {isHindi ? "98% जमाव दर" : "98% Survival"}
                      </span>
                    </div>

                    <div className="divide-y divide-[#143d31]/10">
                      <div className="grid grid-cols-3 py-2 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#143d31]/60">
                        <span>{isHindi ? "मापदंड" : "Metric"}</span>
                        <span className="text-[#143d31]/50">
                          {isHindi ? "पारंपरिक बुवाई" : "Traditional"}
                        </span>
                        <span className="text-[#143d31]">
                          {isHindi ? "बायो-बूस्टेड नर्सरी" : "Bio-Boosted"}
                        </span>
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
                            <CheckCircle className="h-3.5 w-3.5 text-[#143d31] shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-[#4f624f]">
                      <span className="font-medium">
                        {isHindi ? "17-एकड़ वातानुकूलित केंद्र" : "17-Acre Controlled Chambers"}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase">
                        {isHindi ? "शून्य मृत्यु दर प्रोटोकॉल" : "Zero Mortality Protocol"}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Visual Showcase (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#143d31]/10">
                <span className="font-mono text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" />
                  {isHindi ? "कुकरोला, गुरुग्राम (NH8)" : "Kukrola, Gurugram (NH8)"}
                </span>

                <span className="font-mono text-[10px] font-semibold text-[#4f624f] uppercase tracking-wider">
                  {isHindi ? "17 एकड़ खुला फार्म" : "17-Acre Living Proving Ground"}
                </span>
              </div>

              {/* Showcase Visual Container */}
              <div className="relative aspect-[16/10] w-full flex items-center justify-center">
                {activeTab === "nursery" ? (
                  <div className="relative h-full w-full flex items-center justify-center rounded-2xl bg-white p-4 border border-[#143d31]/10 shadow-sm">
                    <img
                      src="/nursery.png"
                      alt={isHindi ? "बायो-बूस्टेड नर्सरी केंद्र" : "Bio-Boosted Nursery Facility"}
                      className="max-h-full w-full object-contain drop-shadow-md"
                    />
                    <div className="absolute bottom-3 left-3 rounded-lg border border-[#143d31]/10 bg-white/90 px-2.5 py-1 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-[#143d31]">
                      {isHindi ? "100% निरोगी प्लग पौध" : "Immunity-Boosted Seedling Plugs"}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#143d31]/10 shadow-sm group">
                    <img
                      src={agroParkImage}
                      alt="Agri Park Kukrola Living Demonstration Farm"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#143d31]/80 via-transparent to-transparent" />

                    {/* Bottom caption */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="font-display text-base font-bold">
                        {isHindi
                          ? "17-एकड़ एकीकृत प्रदर्शन फार्म"
                          : "17-Acre Master Demonstration Farm"}
                      </p>
                      <p className="text-xs text-white/80 font-sans mt-0.5">
                        {isHindi
                          ? "एआई ड्रोन निगरानी, ऑटोमैटिक फर्टीगेशन व 8 फसल यात्रा ज़ोन"
                          : "AI drone scouting, precision fertigation & 8 crop journey zones"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fast Stats Ticker Strip */}
              <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-center">
                <div className="p-2 border border-[#143d31]/10 rounded-xl bg-white/40">
                  <p className="font-display text-sm sm:text-base font-bold text-[#143d31]">17</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "एकड़ फार्म" : "Acres Farm"}
                  </p>
                </div>
                <div className="p-2 border border-[#143d31]/10 rounded-xl bg-white/40">
                  <p className="font-display text-sm sm:text-base font-bold text-[#143d31]">08</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "फसल ज़ोन" : "Crop Zones"}
                  </p>
                </div>
                <div className="p-2 border border-[#143d31]/10 rounded-xl bg-white/40">
                  <p className="font-display text-sm sm:text-base font-bold text-[#143d31]">25+</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "पार्टनर ब्रांड्स" : "Agri Brands"}
                  </p>
                </div>
                <div className="p-2 border border-[#143d31]/10 rounded-xl bg-white/40">
                  <p className="font-display text-sm sm:text-base font-bold text-[#143d31]">
                    2,000+
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[#5d7d37]">
                    {isHindi ? "किसान विजिट" : "Farmers"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Interactive 8-Zone Navigator Strip ── */}
          <div data-home-reveal className="pt-6 border-t border-[#143d31]/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi
                  ? "फसल यात्रा · 8 फील्ड ज़ोन"
                  : "WALK THE CROP JOURNEY · 8 FIELD DEMONSTRATION ZONES"}
              </span>
              <span className="font-mono text-[10px] text-[#4f624f]">
                {isHindi ? "01 – 08 लाइव स्टेशन" : "Click to inspect parameters"}
              </span>
            </div>

            {/* 8-Zone Interactive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {zones.map((z, idx) => {
                const Icon = z.icon;
                const isSelected = selectedZoneIndex === idx && activeTab === "zones";
                return (
                  <button
                    key={z.number}
                    type="button"
                    onClick={() => {
                      setSelectedZoneIndex(idx);
                      setActiveTab("zones");
                    }}
                    className={`flex flex-col justify-between p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#143d31] text-white border-[#143d31] shadow-xs"
                        : "bg-white/50 border-[#143d31]/10 hover:border-[#5d7d37]/40 hover:bg-white text-[#143d31]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 w-full">
                      <span
                        className={`font-mono text-[10px] font-extrabold ${
                          isSelected ? "text-[#a3e635]" : "text-[#5d7d37]"
                        }`}
                      >
                        {z.number}
                      </span>
                      <Icon
                        className={`h-4 w-4 ${isSelected ? "text-[#a3e635]" : "text-[#143d31]/70"}`}
                        weight={isSelected ? "fill" : "duotone"}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-display text-xs font-bold leading-tight ${
                          isSelected ? "text-white" : "text-[#143d31]"
                        }`}
                      >
                        {z.label}
                      </p>
                      <p
                        className={`text-[10px] truncate mt-0.5 font-sans ${
                          isSelected ? "text-white/80" : "text-[#4f624f]"
                        }`}
                      >
                        {z.sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive VIP Farm Visit Booking Modal */}
      <AgriParkVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </>
  );
}
