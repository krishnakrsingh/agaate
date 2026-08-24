"use client";

import { ArrowRight, PhoneCall, WhatsappLogo, CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { getLocalizedPath } from "@/lib/i18n";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export function ServicesImpactMetrics({ currentLang }: { currentLang: string }) {
  const isHindi = currentLang.startsWith("hi");
  const { contact, telPrimaryHref, whatsappUrl } = useSiteContact();
  const agronomistUrl = whatsappUrl("agronomist");

  const coreImpactStats = isHindi
    ? [
        { value: "15,000+", label: "एकड़ सक्रिय रकबा" },
        { value: "85 Lakh+", label: "बायो-प्लग पौध डिलीवर" },
        { value: "₹10 Cr+", label: "सीधा किसान भुगतान" },
        { value: "48 Hrs", label: "बायबैक बैंक सेटलमेंट" },
      ]
    : [
        { value: "15,000+", label: "Acres Monitored" },
        { value: "85 Lakh+", label: "Bio-Plugs Delivered" },
        { value: "₹10 Cr+", label: "Direct Farmer Payouts" },
        { value: "48 Hrs", label: "Buyback Turnaround" },
      ];

  const consultationPerks = isHindi
    ? [
        "व्हाट्सएप पर फोटो भेजकर त्वरित रोग व कीट निदान",
        "वरिष्ठ कृषि वैज्ञानिकों द्वारा चरण-वार पोषण शेड्यूल",
        "स्मार्ट नर्सरी व 6-एकड़ लाइव एग्री पार्क विजिट",
      ]
    : [
        "Rapid photo-based crop disease & pest diagnostics",
        "Customized crop-stage fertigation & nutrition schedules",
        "Guaranteed buyback & 6-acre living farm tour",
      ];

  return (
    <section id="services-consultation" className="bg-[#f4f8f5] text-[#143d31] border-t border-[#143d31]/10">
      {/* ── 1. Card-Less Quantifiable Scale Strip (4 Core Stats) ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-6">
          {coreImpactStats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`space-y-1 text-left ${
                idx === 0 ? "md:pr-6" : idx === 3 ? "md:pl-6 pt-3 md:pt-0" : "md:px-6 pt-3 md:pt-0"
              }`}
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#143d31] tracking-tight">
                {stat.value}
              </p>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#5d7d37]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Visual Agronomy Consultation Chapter (Photo + Actions) ── */}
      <div className="border-t border-[#143d31]/10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual Senior Agronomist Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#143d31]/10 bg-[#143d31]/5 shadow-xl">
                <img
                  src="/services/agronomy-advisory.jpg"
                  alt="Senior agronomist consulting in farm"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Live Scientist On-Duty Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#143d31]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono font-bold text-[#a3e635] border border-white/10 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span>{isHindi ? "वैज्ञानिक लाइव उपलब्ध" : "Agronomists On Duty"}</span>
                </div>

                {/* Bottom Photo Overlay Tag */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-display text-lg font-bold text-white">
                    {isHindi ? "वरिष्ठ कृषि वैज्ञानिक दल" : "Field Agronomy Advisory"}
                  </p>
                  <p className="font-sans text-xs text-white/80 mt-0.5">
                    {isHindi
                      ? "100% निःशुल्क सलाह · कोई ऑटोमेटेड बॉट नहीं"
                      : "100% Free Consultation · Real Senior Agronomists"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Content & Direct Action Triggers */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                  {isHindi ? "05 · प्रत्यक्ष कृषि वैज्ञानिक सहायता" : "05 · Direct Agronomist Advisory"}
                </p>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#143d31] tracking-tight leading-[1.1]">
                {isHindi
                  ? "हमारे वरिष्ठ कृषि वैज्ञानिकों से परामर्श लें"
                  : "Consult With Our Senior Agronomists"}
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#4f624f] leading-relaxed max-w-xl">
                {isHindi
                  ? "अपने आगामी फसल चक्र के लिए निःशुल्क खेत मिट्टी जांच, नर्सरी बुकिंग और कस्टमाइज्ड फर्टीगेशन शेड्यूल प्राप्त करें।"
                  : "Book a complimentary on-field soil assessment, pre-book bio-nursery plug trays, or request a customized stage-wise crop nutrition schedule."}
              </p>

              {/* Line-based Checklist */}
              <div className="space-y-3 pt-2 font-sans">
                {consultationPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#143d31]">
                    <CheckCircle weight="fill" className="h-5 w-5 text-[#5d7d37] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <SlideUpPillButton
                  to={getLocalizedPath("/contact", currentLang)}
                  variant="dark"
                  size="lg"
                  label={isHindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                />

                <SlideUpPillButton
                  href={agronomistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  label={isHindi ? "व्हाट्सएप चैट" : "Chat on WhatsApp"}
                  icon={<WhatsappLogo className="h-5 w-5 text-[#143d31]" weight="fill" />}
                  iconPosition="left"
                />

                <SlideUpPillButton
                  href={telPrimaryHref}
                  variant="outline"
                  size="lg"
                  label={isHindi ? `कॉल: ${contact.primaryPhoneDisplay}` : `Call: ${contact.primaryPhoneDisplay}`}
                  icon={<PhoneCall className="h-5 w-5 text-[#5d7d37]" weight="bold" />}
                  iconPosition="left"
                  className="border border-[#143d31]/15 text-[#143d31]"
                />
              </div>

              <div className="pt-4 border-t border-[#143d31]/10 flex items-center gap-2 font-mono text-[11px] text-[#4f624f]">
                <ShieldCheck className="h-4 w-4 text-[#5d7d37] shrink-0" weight="fill" />
                <span>
                  {isHindi ? "15 मिनट में त्वरित प्रतिक्रिया · 100% निःशुल्क सेवा" : "Direct Senior Scientist Response · Zero Consultation Fee"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
