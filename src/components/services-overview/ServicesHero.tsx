import {
  ArrowDown,
  ArrowRight,
  CheckCircle,
  Drop,
  Hammer,
  Leaf,
  MapPin,
  Plant,
  ShieldCheck,
  Stethoscope,
  Storefront,
  Truck,
} from "@phosphor-icons/react";
import { Marquee } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { Hero07 } from "@/components/ui/hero-07";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export function ServicesHero({ currentLang }: { currentLang: string }) {
  const isHindi = currentLang.startsWith("hi");

  const telemetryBadgesEn = [
    { label: "+40% Seedling Survival", icon: Plant },
    { label: "17-Acre Smart Nursery", icon: Leaf },
    { label: "15,000+ Monitored Acres", icon: Stethoscope },
    { label: "Guaranteed 48h Buyback", icon: Truck },
  ];

  const telemetryBadgesHi = [
    { label: "+40% अधिक पौध जमाव", icon: Plant },
    { label: "17-एकड़ स्मार्ट नर्सरी", icon: Leaf },
    { label: "15,000+ एकड़ निगरानी", icon: Stethoscope },
    { label: "पक्का 48 घंटे में बायबैक", icon: Truck },
  ];

  const marqueeChipsEn = [
    { icon: Plant, stat: "98% Field Survival", text: "Bio-Plug Nursery Chambers" },
    { icon: Stethoscope, stat: "< 15 Min", text: "WhatsApp AI Disease Diagnosis" },
    { icon: Storefront, stat: "500+ SKUs", text: "Direct Manufacturer Tested Inputs" },
    { icon: Drop, stat: "50% Input Savings", text: "Precision Drip Fertigation Dosing" },
    { icon: Hammer, stat: "15,000+ Acres", text: "Turnkey Big Farm Engineering" },
    { icon: Truck, stat: "0% Commission", text: "48h Direct Supermarket Buyback" },
    { icon: ShieldCheck, stat: "100% Certified", text: "Residue-Free Organic Formulations" },
    { icon: MapPin, stat: "17-Acre Facility", text: "Living Farm & Demo Park (Kukrola, NH8)" },
  ];

  const marqueeChipsHi = [
    { icon: Plant, stat: "98% जमाव दर", text: "बायो-बूस्टेड प्लग नर्सरी पौध" },
    { icon: Stethoscope, stat: "< 15 मिनट", text: "व्हाट्सएप फोटो से सटीक रोग पहचान" },
    { icon: Storefront, stat: "500+ इनपुट्स", text: "सीधे फैक्ट्रियों से प्रामाणिक सामग्री" },
    { icon: Drop, stat: "50% खाद बचत", text: "स्मार्ट ड्रिप फर्टीगेशन पोषण शेड्यूल" },
    { icon: Hammer, stat: "15,000+ एकड़", text: "टर्नकी कमर्शियल बिग-फार्म स्थापना" },
    { icon: Truck, stat: "0% बिचौलिया आढ़त", text: "48 घंटे में सीधा बैंक बायबैक भुगतान" },
    { icon: ShieldCheck, stat: "100% शुद्धता", text: "अवशेष-मुक्त जैविक फसल सुरक्षा" },
    { icon: MapPin, stat: "17-एकड़ परिसर", text: "स्मार्ट नर्सरी व जीवंत फार्म (कुकरोला)" },
  ];

  const badges = isHindi ? telemetryBadgesHi : telemetryBadgesEn;
  const marqueeChips = isHindi ? marqueeChipsHi : marqueeChipsEn;

  return (
    <div className="relative bg-[#f4f8f5]">
      {/* Hero07 Component */}
      <Hero07
        tagline={
          isHindi
            ? "अगाते एकीकृत कृषि एवं तकनीकी सेवाएं"
            : "AGAATE INTEGRATED AGTECH PLATFORM"
        }
        title={
          isHindi ? (
            <>
              बीज से लेकर बिक्री तक। <br />
              <span className="text-[#5d7d37]">वैज्ञानिक एवं आधुनिक खेती।</span>
            </>
          ) : (
            <>
              From Seed to Sale. <br />
              <span className="text-[#5d7d37]">Science-Backed Farming.</span>
            </>
          )
        }
        description={
          isHindi
            ? "दुकानदार के अनुमान की जगह वैज्ञानिक समाधान — 17-एकड़ बायो-बूस्टेड नर्सरी, 500+ प्रमाणित इनपुट्स, रियल-टाइम फसल डॉक्टर, सोलर फील्ड आईओटी और पक्का सुपरमार्केट बायबैक।"
            : "Empowering Indian agriculture by replacing dealer guesswork with precision farming — 17-acre smart bio-nursery, 500+ certified inputs, AI crop doctor, solar telemetry, and direct supermarket buyback."
        }
        landscapeImage="/services/hero-precision-farm.jpg"
        landscapeAlt="Agaate Precision Agriculture Farm"
        animation="subtle"
        variant="standard"
        mediaPosition="bottom"
      >
        {/* Telemetry live badges in left column */}
        <div className="flex flex-col gap-2 pt-2 w-full">
          {badges.map((badge) => {
            const BIcon = badge.icon;
            return (
              <div
                key={badge.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#143d31]/10 bg-white/90 p-1.5 pr-4 font-mono text-xs font-semibold text-[#143d31] shadow-xs backdrop-blur-sm"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#143d31]/10 text-[#5d7d37]">
                  <BIcon className="h-3.5 w-3.5" weight="bold" />
                </div>
                <span>{badge.label}</span>
              </div>
            );
          })}

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <SlideUpPillButton
              href="#services-grid"
              variant="dark"
              size="md"
              label={isHindi ? "सभी 6 सेवाएं देखें" : "Explore 6 Core Services"}
              icon={<ArrowDown className="h-4 w-4" />}
              iconPosition="right"
            />
            <SlideUpPillButton
              to={getLocalizedPath("/contact", currentLang)}
              variant="outline"
              size="md"
              label={isHindi ? "मुफ्त फार्म ऑडिट" : "Book Farm Audit"}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            />
          </div>
        </div>
      </Hero07>

      {/* Clean Seamless Marquee Ticker with Concentric Radii (Inner Radius + Padding = Outer Radius) */}
      <div className="relative py-2 pb-8 overflow-hidden">
        <Marquee duration={38}>
          {marqueeChips.map((chip, i) => {
            const ChipIcon = chip.icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-3 rounded-full bg-white border border-[#143d31]/12 p-1.5 pr-4.5 shadow-xs hover:border-[#143d31]/30 transition-all duration-200 mr-3 shrink-0"
              >
                {/* Concentric Icon Badge: h-7 (radius 14px) + p-1.5 (6px padding) = outer radius (20px) */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31] text-[#a3e635] shrink-0">
                  <ChipIcon className="h-3.5 w-3.5" weight="bold" />
                </div>

                <span className="font-mono text-xs font-bold text-[#143d31] tracking-tight">
                  {chip.stat}
                </span>

                <span className="h-3.5 w-px bg-[#143d31]/15" />

                <span className="font-sans text-xs font-medium text-[#4f624f] tracking-normal">
                  {chip.text}
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
