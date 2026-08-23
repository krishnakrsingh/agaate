import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ChatCircleDots,
  Storefront,
  Compass,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

const pathwaysEn = [
  {
    number: "01",
    icon: ChatCircleDots,
    tag: "Field Advisory",
    title: "Talk to an Agronomist",
    subtitle: "Photo diagnosis & dosage charts",
    description:
      "Send a photo of diseased leaves or ask soil planning questions. Real agronomy scientists diagnose the issue and share exact stage-wise spray and fertigation doses.",
    actionLabel: "Chat on WhatsApp",
    actionSub: "< 15 min direct response",
    type: "whatsapp",
    href: "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20am%20reaching%20out%20for%20assistance%20and%20would%20appreciate%20a%20response%20at%20your%20earliest%20convenience.",
    perks: ["Photo pest & disease identification", "No automated bots · Real senior scientists"],
  },
  {
    number: "02",
    icon: Storefront,
    tag: "Input Commerce",
    title: "Visit Kisaan Mall",
    subtitle: "500+ genuine tested inputs",
    description:
      "Source 100% genuine hybrid seeds, biologicals, and custom drip kits straight from 50+ manufacturer partners at honest, transparent rates with zero duplicate risk.",
    actionLabel: "Get Store Directions",
    actionSub: "Bhora Kalan, Gurugram",
    type: "link",
    href: "/contact",
    perks: ["Direct manufacturer pricing", "100% genuine quality guarantee"],
  },
  {
    number: "03",
    icon: Compass,
    tag: "Living Farm",
    title: "Tour the Agri Park",
    subtitle: "8 demonstration zones on living soil",
    description:
      "Walk through live crop trial plots, high-immunity plug nurseries, automated drip systems, and AI drone scouting before implementing any technology on your own land.",
    actionLabel: "Book Field Visit",
    actionSub: "Kukrola, Gurugram (NH8)",
    type: "modal",
    href: "/agri-park",
    perks: ["Walk all 8 crop journey zones live", "One-on-one agronomist field briefing"],
  },
];

const pathwaysHi = [
  {
    number: "01",
    icon: ChatCircleDots,
    tag: "फील्ड एडवाइजरी",
    title: "कृषि डॉक्टर से सलाह लें",
    subtitle: "फोटो से तुरंत रोग पहचान व सही मात्रा",
    description:
      "फसल में बीमारी या कीट का फोटो भेजें। हमारे वरिष्ठ कृषि वैज्ञानिक तुरंत सटीक रोग पहचान कर सही दवा और खाद का चरण अनुसार स्प्रे शेड्यूल भेजते हैं।",
    actionLabel: "व्हाट्सएप चैट शुरू करें",
    actionSub: "15 मिनट में त्वरित जवाब",
    type: "whatsapp",
    href: "https://wa.me/918350085005?text=Namaste%20Agaate%20Team%2C%20mujhe%20apni%20fasal%20ke%20liye%20krishi%20salah%20chahiye.",
    perks: ["व्हाट्सएप फोटो से सटीक रोग पहचान", "सीधे अनुभवी कृषि वैज्ञानिकों से सलाह"],
  },
  {
    number: "02",
    icon: Storefront,
    tag: "कृषि इनपुट मॉल",
    title: "किसान मॉल से मंगवाएं",
    subtitle: "500+ प्रामाणिक बीज, खाद व जैविक इनपुट्स",
    description:
      "सीधे 50+ शीर्ष निर्माता कंपनियों से 100% शुद्ध और जांचे-परखे बीज, जैविक पोषण और ड्रिप पैकेज किफायती दरों पर प्राप्त करें — बिना किसी मिलावट व नकली के डर के।",
    actionLabel: "मॉल लोकेशन व संपर्क",
    actionSub: "भोड़ा कलां, गुरुग्राम",
    type: "link",
    href: "/contact",
    perks: ["सीधे फैक्ट्रियों से किफायती दाम", "100% प्रमाणित गुणवत्ता की गारंटी"],
  },
  {
    number: "03",
    icon: Compass,
    tag: "जीवंत फार्म",
    title: "अगाते एग्री पार्क देखें",
    subtitle: "8 फसल यात्रा ज़ोन व लाइव ट्रायल",
    description:
      "अपने खेत में अपनाने से पहले लाइव फसल प्लॉट, बायो-बूस्टेड नर्सरी, आधुनिक ड्रिप फर्टीगेशन और एआई ड्रोन तकनीक को वास्तविक जमीन पर काम करते देखें।",
    actionLabel: "विजिट शेड्यूल करें",
    actionSub: "कुकरोला, गुरुग्राम (NH8)",
    type: "modal",
    href: "/agri-park",
    perks: ["8 फसल ज़ोन का लाइव टूर", "कृषि वैज्ञानिकों से आमने-सामने चर्चा"],
  },
];

export default function ClosingChapter() {
  const sectionRef = useHomeChapterReveal("fade-up");
  const [hoveredLane, setHoveredLane] = useState<number | null>(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");

  const pathways = isHindi ? pathwaysHi : pathwaysEn;

  return (
    <>
      <section
        ref={sectionRef}
        id="get-started"
        className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
          {/* ── 1. Header (Exact Font & Color Style from Success Stories) ── */}
          <div data-home-reveal className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                {isHindi ? "अपनी यात्रा शुरू करें" : "Start Your Journey"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
                {isHindi
                  ? "आपके खेत की अगली सफलता का कदम यहीं से शुरू होता है"
                  : "Your farm's next step starts here"}
              </h2>

              <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
                {isHindi
                  ? "चाहे आपको फसल सलाह चाहिए, 100% असली इनपुट्स, या 6-एकड़ फार्म देखना हो — अपनी जरूरत के अनुसार रास्ता चुनें।"
                  : "Whether you need immediate crop diagnosis, certified inputs, or want to walk our 6-acre living farm — choose your path."}
              </p>
            </div>
          </div>

          {/* ── 2. Card-Less Seamless Pathways (Clean Hairline Corridor) ── */}
          <div
            data-home-reveal
            className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10"
          >
            {pathways.map((pathway, idx) => {
              const Icon = pathway.icon;
              const isHovered = hoveredLane === idx;

              return (
                <div
                  key={pathway.number}
                  onMouseEnter={() => setHoveredLane(idx)}
                  onMouseLeave={() => setHoveredLane(null)}
                  className="group relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-200 hover:bg-white/50"
                >
                  <div className="space-y-6">
                    {/* Number & Tag */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#5d7d37] uppercase tracking-wider">
                        {pathway.number}
                      </span>
                      <span className="rounded-full bg-[#143d31]/5 border border-[#143d31]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#143d31]">
                        {pathway.tag}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143d31] text-[#a3e635] shadow-xs group-hover:scale-105 group-hover:bg-[#1a4d3e] group-hover:shadow-md transition-all duration-300 mb-4">
                        <Icon className="h-6 w-6 text-[#a3e635]" weight="duotone" />
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight">
                        {pathway.title}
                      </h3>

                      <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-1">
                        {pathway.subtitle}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed mt-3">
                        {pathway.description}
                      </p>
                    </div>

                    {/* Perks List */}
                    <div className="space-y-2 pt-3 border-t border-[#143d31]/10 font-sans">
                      {pathway.perks.map((perk) => (
                        <div
                          key={perk}
                          className="flex items-center gap-2 text-xs font-medium text-[#143d31]"
                        >
                          <CheckCircle weight="fill" className="h-4 w-4 text-[#5d7d37] shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-8 space-y-2">
                    {pathway.type === "modal" ? (
                      <SlideUpPillButton
                        onClick={() => setIsVisitModalOpen(true)}
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    ) : pathway.type === "link" ? (
                      <SlideUpPillButton
                        to={getLocalizedPath(pathway.href, currentLang)}
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    ) : (
                      <SlideUpPillButton
                        href={pathway.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="dark"
                        size="md"
                        fullWidth
                        label={pathway.actionLabel}
                        icon={<ArrowUpRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    )}

                    <p className="font-mono text-[10px] font-semibold text-center text-[#4f624f]/70 uppercase tracking-wider pt-0.5">
                      {pathway.actionSub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIP Visit Schedule Modal */}
      <AgriParkVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  );
}
