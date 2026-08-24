import {
  Buildings,
  ChatCircleText,
  Download,
  IdentificationCard,
  MapPin,
  Phone,
} from "@phosphor-icons/react";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { Reveal } from "@/components/common/motion";
import { useSiteContact } from "@/contexts/SiteContactContext";
import { useAboutPage } from "@/contexts/AboutPageContext";

const fieldIcons: Record<string, typeof Buildings> = {
  Entity: Buildings,
  CIN: IdentificationCard,
  "Registered Office": MapPin,
};

export default function AboutCta({ isHi = false }: { isHi?: boolean }) {
  const { contact, telPrimaryHref, whatsappUrl } = useSiteContact();
  const { complianceHighlights, complianceFooterEn, complianceFooterHi, brochureHref } = useAboutPage();
  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal variant="fade-up">
          {/* Main Unified Minimal White Shell */}
          <div className="overflow-hidden rounded-3xl border border-[#143d31]/10 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative grid items-center lg:grid-cols-12">
              {/* Left Side: Call to Action */}
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 space-y-6 lg:col-span-7">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-6 bg-[#5d7d37]" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                    Start With Agaate
                  </p>
                </div>

                <h2
                  id="about-cta-heading"
                  className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#143d31] tracking-tight leading-[1.12] max-w-lg"
                >
                  From seed to sale, we stand with the farmer.
                </h2>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f] max-w-md font-normal">
                  Talk to an agronomist or reserve Bio-Boosted plug saplings directly with our team.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 max-w-xl">
                  <SlideUpPillButton
                    href={whatsappUrl("about")}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="dark"
                    size="md"
                    label="Chat on WhatsApp"
                    icon={<ChatCircleText className="h-4 w-4" />}
                    iconPosition="right"
                  />
                  <SlideUpPillButton
                    href={telPrimaryHref}
                    variant="outline"
                    size="md"
                    label={`Call ${contact.primaryPhoneDisplay}`}
                    icon={<Phone className="h-4 w-4" />}
                    iconPosition="right"
                  />
                </div>
              </div>

              {/* Right Side: Seamless Farm Illustration on White */}
              <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12 lg:col-span-5">
                <img
                  src="/farm.png"
                  alt="Agaate farmer and agronomy support"
                  className="relative z-10 mx-auto max-h-[280px] sm:max-h-[320px] lg:max-h-[340px] w-auto object-contain transition-transform duration-700 hover:scale-[1.03]"
                  width={800}
                  height={700}
                />
              </div>
            </div>

            {/* Bottom Corporate Transparency Band */}
            <div
              id="compliance"
              aria-labelledby="compliance-heading"
              className="border-t border-[#143d31]/8 bg-white px-8 sm:px-12 py-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x divide-[#143d31]/10">
                {complianceHighlights.map((item, idx) => {
                  const Icon = fieldIcons[item.labelEn as keyof typeof fieldIcons] ?? Buildings;
                  const label = isHi ? item.labelHi : item.labelEn;
                  const value = isHi ? item.valueHi : item.valueEn;
                  return (
                    <div key={item.labelEn} className={`min-w-0 ${idx > 0 ? "sm:pl-8" : ""}`}>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#5d7d37]" weight="duotone" />
                        <span>{label}</span>
                      </div>
                      <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-[#143d31] truncate">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 border-t border-[#143d31]/6 pt-4 text-center font-sans text-[11px] text-[#4f624f]/80">
                {isHi ? complianceFooterHi : complianceFooterEn}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
