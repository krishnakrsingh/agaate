import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Compass,
  MapPin,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { CountUp, EASE } from "@/components/common/motion";
import { AgriParkVisitModal } from "@/components/agri-park/AgriParkVisitModal";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export default function AgriParkChapter() {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");
  const sectionRef = useHomeChapterReveal("fade-up");

  const checklistItems = isHindi
    ? [
      "वातानुकूलित बायो-बूस्टेड प्लग नर्सरी",
      "स्मार्ट ड्रिप व ऑटोमैटिक फर्टीगेशन",
      "शून्य-केमिकल अवशेष जैविक सुरक्षा",
      "किसानों के लिए निःशुल्क व्यावहारिक प्रशिक्षण",
    ]
    : [
      "Bio-boosted high-immunity nursery plugs",
      "Automated drip & precision fertigation",
      "Residue-free biological plant protection",
      "Hands-on farmer training & masterclasses",
    ];

  return (
    <>
      <section
        ref={sectionRef}
        id="agri-park"
        className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
      >
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline, Narrative, Metrics Strip & Actions */}
            <motion.div
              className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pr-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Division Tag */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                  {isHindi ? "03 · 6-एकड़ एग्री पार्क" : "03 · 6-Acre Agri Park"}
                </p>
              </div>

              {/* Display Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.1]">
                {isHindi
                  ? "6 एकड़ का जीवित फार्म — हर समाधान जमीन पर प्रमाणित"
                  : "6-Acre Living Proving Ground for Modern Farming"}
              </h2>

              {/* Subtext Description */}
              <p className="font-sans mt-3 text-sm sm:text-base text-[#4f624f] leading-relaxed font-normal">
                {isHindi
                  ? "गुरुग्राम में 6 एकड़ का खुला अनुसंधान केंद्र। हाई-इम्यूनिटी नर्सरी, ऑटोमैटिक ड्रिप फर्टीगेशन और लाइव फसल परीक्षण — आपके खेत तक पहुंचने से पहले हर तकनीक यहां परखी जाती है।"
                  : "Our 6-acre proving ground in Gurugram tests and proves every seed variety, bio-nutrient, and automated drip protocol in live field conditions before recommending it to growers."}
              </p>

              {/* Metrics Strip (Line-Type Design) */}
              <div className="my-6 border-y border-[#143d31]/10 py-4 grid grid-cols-3 gap-2">
                <div className="text-left first:border-l-0 first:pl-0">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={6} suffix=" Acres" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "जीवित रिसर्च फार्म" : "Live Farm Proving"}
                  </p>
                </div>
                <div className="text-left border-l border-[#143d31]/10 pl-3">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={98} suffix="%" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "नर्सरी जमाव दर" : "Sapling Survival"}
                  </p>
                </div>
                <div className="text-left border-l border-[#143d31]/10 pl-3">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] tracking-tight">
                    <CountUp to={2000} suffix="+" />
                  </p>
                  <p className="font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider mt-0.5">
                    {isHindi ? "प्रशिक्षित किसान" : "Farmers Trained"}
                  </p>
                </div>
              </div>

              {/* Feature Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {checklistItems.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#143d31]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#143d31] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <SlideUpPillButton
                  onClick={() => setIsVisitModalOpen(true)}
                  variant="dark"
                  size="md"
                  label={isHindi ? "विजिट शेड्यूल करें" : "Book VIP Farm Visit"}
                  icon={<Calendar className="h-4 w-4" />}
                  iconPosition="left"
                />

                <SlideUpPillButton
                  to={getLocalizedPath("/agri-park", currentLang)}
                  variant="outline"
                  size="md"
                  label={isHindi ? "पूरा 8-ज़ोन मॉडल देखें" : "Explore Agri Park"}
                  icon={<Compass className="h-4 w-4" />}
                  iconPosition="left"
                />
              </div>
            </motion.div>

            {/* Right Column: Clean, High-Impact Master Visual */}
            <motion.div
              className="lg:col-span-6 relative flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#143d31]/15 shadow-md group aspect-[16/11]">
                <img
                  src="/farm.jpg"
                  alt="Agaate 6-Acre Agri Park Demonstration Farm"
                  className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#143d31]/85 via-[#143d31]/20 to-transparent" />

                {/* Top Location Chip */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-mono font-bold text-[#143d31] backdrop-blur-md shadow-xs border border-[#143d31]/10">
                  <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                  <span>
                    {isHindi ? "कुकरोला, गुरुग्राम (NH-8)" : "Kukrola, Gurugram (NH-8)"}
                  </span>
                </div>

                {/* Bottom Card Overlay Content */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="font-mono text-[10px] uppercase font-bold text-[#a3e635] tracking-widest">
                    {isHindi ? "ओपन आर एंड डी फार्म" : "OPEN R&D PROVING GROUND"}
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                    {isHindi
                      ? "6-एकड़ स्मार्ट नर्सरी व फील्ड लैब"
                      : "6-Acre Smart Nursery & Field Lab"}
                  </h3>
                  <p className="font-sans text-xs text-white/80 mt-1 max-w-md line-clamp-2">
                    {isHindi
                      ? "हाइब्रिड बीज परीक्षण, ड्रिप ऑटोमेशन, ड्रोन स्कैनिंग और किसान प्रशिक्षण।"
                      : "Real-world seed trials, automated drip fertigation, drone scouting & farmer masterclasses."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive VIP Farm Visit Booking Modal */}
      <AgriParkVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </>
  );
}
