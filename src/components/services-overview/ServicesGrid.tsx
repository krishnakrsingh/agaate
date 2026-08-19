import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { getLocalizedPath } from "@/lib/i18n";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { SERVICES_EN, SERVICES_HI, type ServiceCategory } from "./services-overview-data";

export function ServicesGrid({ currentLang }: { currentLang: string }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const isHindi = currentLang.startsWith("hi");
  const SERVICES = isHindi ? SERVICES_HI : SERVICES_EN;

  const categoriesEn = [
    { id: "all" as const, label: "All 6 Verticals" },
    { id: "nursery-inputs" as const, label: "Nursery & Inputs" },
    { id: "advisory-tech" as const, label: "Agronomy & AI" },
    { id: "scale-infra" as const, label: "Farm Projects & Scale" },
    { id: "buyback" as const, label: "Buyback Linkage" },
  ];

  const categoriesHi = [
    { id: "all" as const, label: "सभी 6 मुख्य सेवाएं" },
    { id: "nursery-inputs" as const, label: "नर्सरी एवं इनपुट्स" },
    { id: "advisory-tech" as const, label: "फसल सलाह व एआई" },
    { id: "scale-infra" as const, label: "फार्म प्रोजेक्ट्स व इंफ्रा" },
    { id: "buyback" as const, label: "बायबैक व खरीद" },
  ];

  const categories = isHindi ? categoriesHi : categoriesEn;

  const filteredServices =
    activeCategory === "all" ? SERVICES : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-grid" className="scroll-mt-24 py-16 sm:py-20 md:py-24 bg-[#f4f8f5]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              {isHindi ? "हमारे 6 मुख्य सेवा स्तंभ" : "Our 6 Core Verticals"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
              {isHindi
                ? "आधुनिक वैज्ञानिक खेती के 6 मजबूत स्तंभ"
                : "Six Pillars of Agricultural Mastery"}
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              {isHindi
                ? "बीज, इनपुट्स, सलाह, तकनीक, फार्म निर्माण से लेकर पक्की बिक्री तक — हर चरण पर वैज्ञानिक सटीकता।"
                : "From sterile plug nursery germination to guaranteed supermarket buyback — unmatched technical precision at every step."}
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative cursor-pointer rounded-full px-5 py-2 font-mono text-xs font-bold transition-all duration-200 select-none ${
                  isActive
                    ? "bg-[#143d31] text-[#a3e635] shadow-xs"
                    : "border border-[#143d31]/15 bg-white/60 text-[#143d31] hover:bg-white hover:border-[#143d31]/30"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Seamless Hairline Architectural Grid (Zero Floating Cards) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#143d31]/12 border border-[#143d31]/12 rounded-3xl overflow-hidden shadow-xs"
          >
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between bg-[#f4f8f5] hover:bg-white transition-colors duration-300"
                >
                  {/* Real Photograph Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#143d31]/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="rounded-full bg-[#143d31]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#a3e635] border border-white/10 shadow-xs">
                        {service.tag}
                      </span>
                      <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold text-[#143d31] shadow-xs">
                        {service.badgeStat}
                      </span>
                    </div>

                    {/* Icon Floating Badge */}
                    <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] shadow-md border border-white/15">
                      <Icon className="h-5 w-5" weight="duotone" />
                    </div>
                  </div>

                  {/* Body Content with Clean Hairline List */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31] tracking-tight leading-snug group-hover:text-[#1a4d3e] transition-colors">
                        {service.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed">
                        {service.desc}
                      </p>

                      {/* Highlights Checklist */}
                      <div className="space-y-2 pt-4 border-t border-[#143d31]/10">
                        {service.highlights.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-xs font-medium text-[#143d31]"
                          >
                            <CheckCircle
                              weight="fill"
                              className="h-4 w-4 text-[#5d7d37] shrink-0"
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-[#143d31]/10">
                      <SlideUpPillButton
                        href={getLocalizedPath(service.href, currentLang)}
                        variant="dark"
                        size="md"
                        fullWidth
                        label={isHindi ? "विस्तार से समझें" : "Explore Vertical"}
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="right"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
