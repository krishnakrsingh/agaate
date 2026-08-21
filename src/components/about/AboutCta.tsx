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
import {
  brochureHref,
  complianceHighlights,
  PHONE_DISPLAY,
  TEL_ABOUT,
  WHATSAPP_ABOUT_URL,
} from "./data";

const fieldIcons = {
  Entity: Buildings,
  CIN: IdentificationCard,
  "Registered Office": MapPin,
} as const;

export default function AboutCta() {
  return (
    <section
      id="about-cta"
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal variant="fade-up">
          {/* Main Unified Shell */}
          <div className="overflow-hidden rounded-2xl border border-[#143d31]/10 bg-white shadow-xs">
            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Side: Call to Action */}
              <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
                    Start With Agaate
                  </p>
                </div>

                <h2
                  id="about-cta-heading"
                  className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-lg"
                >
                  From seed to sale, we stand with the farmer.
                </h2>

                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f] max-w-md">
                  Talk to an agronomist, reserve Bio-Boosted plug saplings, or download our corporate
                  profile brochure.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <SlideUpPillButton
                    href={WHATSAPP_ABOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="dark"
                    size="md"
                    label="Chat on WhatsApp"
                    icon={<ChatCircleText className="h-4 w-4" />}
                    iconPosition="right"
                  />
                  <SlideUpPillButton
                    href={TEL_ABOUT}
                    variant="outline"
                    size="md"
                    label={`Call ${PHONE_DISPLAY}`}
                    icon={<Phone className="h-4 w-4" />}
                    iconPosition="right"
                  />
                  <SlideUpPillButton
                    href={brochureHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    size="md"
                    label="Download Brochure"
                    icon={<Download className="h-4 w-4" />}
                    iconPosition="right"
                  />
                </div>
              </div>

              {/* Right Side: Farm Illustration on #f4f8f5 */}
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-t border-[#143d31]/10 bg-[#f4f8f5] p-6 lg:min-h-[340px] lg:border-l lg:border-t-0 lg:p-10">
                <img
                  src="/farm.png"
                  alt="Agaate farm and agronomy support"
                  className="relative z-10 mx-auto max-h-[280px] w-full object-contain drop-shadow-[0_12px_24px_rgba(20,61,49,0.12)] lg:max-h-[320px] transition-transform duration-700 hover:scale-105"
                  width={800}
                  height={700}
                />
              </div>
            </div>

            {/* Bottom Corporate Transparency Band */}
            <div
              id="compliance"
              aria-labelledby="compliance-heading"
              className="border-t border-[#143d31]/10 bg-[#f4f8f5]/60"
            >
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="max-w-xs shrink-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                    Registered Corporate Entity
                  </p>
                  <h3
                    id="compliance-heading"
                    className="mt-1 font-display text-base font-bold text-[#143d31]"
                  >
                    Anzix Farm Technologies Pvt Ltd
                  </h3>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                  {complianceHighlights.map((item) => {
                    const Icon = fieldIcons[item.label as keyof typeof fieldIcons] ?? Buildings;
                    return (
                      <div key={item.label} className="min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                          <Icon className="h-3.5 w-3.5 shrink-0 text-[#5d7d37]" weight="duotone" />
                          <span>{item.label}</span>
                        </div>
                        <p className="mt-1 font-sans text-xs font-semibold text-[#143d31] truncate">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="border-t border-[#143d31]/10 px-6 py-3 text-center font-sans text-[11px] text-[#4f624f]">
                Agaate is the registered brand of Anzix Farm Technologies Private Limited. All
                corporate records are verifiable on the Ministry of Corporate Affairs (MCA) portal.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
