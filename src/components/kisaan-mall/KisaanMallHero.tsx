import { useState } from "react";
import { ArrowRight, ChatCircleText, CheckCircle, Phone } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Reveal, CountUp } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import KisaanMallShowcase from "@/components/home/KisaanMallShowcase";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { useKisaanMallPage } from "@/contexts/KisaanMallPageContext";
import { track } from "@/lib/analytics";

export default function KisaanMallHero() {
  const { i18n } = useTranslation();
  const page = useKisaanMallPage();
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
          <Reveal variant="fade-up" className="space-y-6 lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
              <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                {isHindi ? page.heroEyebrowHi : page.heroEyebrowEn}
              </p>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-[#143d31] tracking-tight leading-[1.08]">
              {isHindi ? (
                <>
                  {page.heroTitleHi}{" "}
                  <span className="text-[#5d7d37]">{page.heroTitleAccentHi}</span>
                </>
              ) : (
                <>
                  {page.heroTitleEn}{" "}
                  <span className="text-[#5d7d37]">{page.heroTitleAccentEn}</span>
                </>
              )}
            </h1>

            <p className="font-sans text-[#4f624f] text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              {isHindi ? page.heroDescriptionHi : page.heroDescriptionEn}
            </p>

            <div className="pt-1 max-w-xl">
              {isSubmitted ? (
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#143d31]/15 bg-white p-4 shadow-2xs">
                  <CheckCircle className="h-5 w-5 text-[#5d7d37] shrink-0" weight="fill" />
                  <span className="font-sans text-xs sm:text-sm font-semibold text-[#143d31]">
                    {isHindi ? page.heroNotifySuccessHi : page.heroNotifySuccessEn}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    required
                    value={notifyInput}
                    onChange={(e) => setNotifyInput(e.target.value)}
                    placeholder={isHindi ? page.heroNotifyPlaceholderHi : page.heroNotifyPlaceholderEn}
                    className="flex-1 rounded-full border border-[#143d31]/20 bg-white px-5 py-3 font-sans text-xs sm:text-sm text-[#143d31] placeholder-[#143d31]/40 shadow-2xs focus:border-[#143d31] focus:outline-none focus:ring-2 focus:ring-[#143d31]/10"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 font-sans text-xs sm:text-sm font-bold text-[#0d2820] shadow-sm transition-all duration-300 hover:bg-[#91d820] hover:shadow-md"
                  >
                    <span>{isHindi ? page.heroNotifyButtonHi : page.heroNotifyButtonEn}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" weight="bold" />
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <SlideUpPillButton
                href={mallWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "kisaan_mall_hero" })}
                variant="dark"
                size="md"
                label={isHindi ? page.heroWhatsappLabelHi : page.heroWhatsappLabelEn}
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

            <div className="pt-6 border-t border-[#143d31]/10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {page.heroStats.map((stat, idx) => {
                const label = isHindi ? stat.labelHi : stat.labelEn;
                const valueText = isHindi ? stat.valueTextHi : stat.valueTextEn;
                return (
                  <div key={label} className={idx > 0 ? "border-l border-[#143d31]/10 pl-3 sm:pl-4" : ""}>
                    <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#143d31] tracking-tight">
                      {valueText ? valueText : <CountUp to={stat.numValue} suffix={isHindi ? stat.suffixHi : stat.suffixEn} />}
                    </p>
                    <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#5d7d37] uppercase tracking-wider mt-1">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

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
