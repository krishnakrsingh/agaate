import React, { useState } from "react";
import { ArrowRight, ChatCircleText, CheckCircle, Phone, Sparkle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Reveal, CountUp } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import KisaanMallShowcase from "@/components/home/KisaanMallShowcase";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { track } from "@/lib/analytics";

export default function KisaanMallHero() {
  const { i18n } = useTranslation();
  const { contact, telPrimaryHref, whatsappUrl } = useSiteContact();
  const mallWhatsAppUrl = whatsappUrl("mall");
  const isHindi = i18n.language?.startsWith("hi");
  const [notifyInput, setNotifyInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyInput.trim()) return;
    track("kisaan_mall_notify_submitted", { contact: notifyInput.trim() });
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 text-[#143d31]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Quick Action */}
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? "अगाते किसान मॉल · डायरेक्ट कृषि इनपुट स्टोर" : "Agaate Kisaan Mall · Direct Agri-Input Retail"}
              </p>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-[#143d31] tracking-tight leading-[1.08]">
              {isHindi ? (
                <>
                  किसानों के लिए भारत का{" "}
                  <span className="text-[#5d7d37]">पहला आधुनिक कृषि मॉल</span>
                </>
              ) : (
                <>
                  India's First Modern{" "}
                  <span className="text-[#5d7d37]">Input Store for Farmers.</span>
                </>
              )}
            </h1>

            <p className="font-sans text-[#4f624f] text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              {isHindi
                ? "100% प्रमाणित हाइब्रिड बीज, जैविक पोषण, बायो-प्रोटेक्शन और ड्रिप किट — सीधे प्रतिष्ठित विनिर्माता कंपनियों से आपके खेत तक किफायती दरों पर।"
                : "A single certified destination for high-germination seeds, biological soil nutrition, drip irrigation hardware, and root-boosted saplings directly sourced from 50+ authorized manufacturers."}
            </p>

            {/* Quick Notify / Inquire Box */}
            <div className="pt-1 max-w-xl">
              {isSubmitted ? (
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#143d31]/15 bg-white p-4 shadow-2xs">
                  <CheckCircle className="h-5 w-5 text-[#5d7d37] shrink-0" weight="fill" />
                  <span className="font-sans text-xs sm:text-sm font-semibold text-[#143d31]">
                    {isHindi
                      ? "धन्यवाद! हम आपको नए इनपुट्स और सीजनल ऑफर्स की जानकारी तुरंत भेजेंगे।"
                      : "Thank you! Our agronomy team will notify you about early access & seasonal bundles."}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    required
                    value={notifyInput}
                    onChange={(e) => setNotifyInput(e.target.value)}
                    placeholder={
                      isHindi
                        ? "अपना मोबाइल नंबर या ईमेल दर्ज करें"
                        : "Enter mobile or email for catalog"
                    }
                    className="flex-1 rounded-full border border-[#143d31]/20 bg-white px-5 py-3 font-sans text-xs sm:text-sm text-[#143d31] placeholder-[#143d31]/40 shadow-2xs focus:border-[#143d31] focus:outline-none focus:ring-2 focus:ring-[#143d31]/10"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 font-sans text-xs sm:text-sm font-bold text-[#0d2820] shadow-sm transition-all duration-300 hover:bg-[#91d820] hover:shadow-md"
                  >
                    <span>{isHindi ? "कैटलॉग पाएं" : "Get Catalog"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" weight="bold" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <SlideUpPillButton
                href={mallWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "kisaan_mall_hero" })}
                variant="dark"
                size="md"
                label={isHindi ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}
                icon={<ChatCircleText className="h-4 w-4" weight="fill" />}
                iconPosition="left"
              />
              <SlideUpPillButton
                href={telPrimaryHref}
                onClick={() => track("phone_clicked", { source: "kisaan_mall_hero" })}
                variant="outline"
                size="md"
                label={`Call ${contact.primaryPhoneDisplay}`}
                icon={<Phone className="h-4 w-4" weight="fill" />}
                iconPosition="left"
              />
            </div>

            {/* Metrics Strip */}
            <div className="pt-6 border-t border-[#143d31]/10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  <CountUp to={1000} suffix="+" />
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "प्रमाणित उत्पाद" : "Verified Products"}
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  <CountUp to={50} suffix="+" />
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "पार्टनर ब्रांड्स" : "Brand Partners"}
                </p>
              </div>
              <div className="border-l border-[#143d31]/10 pl-3 sm:pl-4">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                  100%
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                  {isHindi ? "असली व प्रमाणित" : "Genuine Guaranteed"}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: 3D Interactive Kisaan Mall Showcase */}
          <Reveal variant="fade-up" delay={0.12} className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full">
              <KisaanMallShowcase />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
