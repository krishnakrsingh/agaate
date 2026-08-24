import { ArrowRight, Clock, MapPin, PhoneCall, Users, WhatsappLogo } from "@phosphor-icons/react";
import { useLocation } from "@tanstack/react-router";
import contactPhoto from "@/assets/contact-agronomist-hub.jpg";
import { Reveal } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { useSiteContact } from "@/contexts/SiteContactContext";

const TRUST_ICONS = [Clock, Users, MapPin, PhoneCall];

export default function TrustBand() {
  const location = useLocation();
  const isHindi = location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const lang = isHindi ? "hi" : "en";
  const { contact, whatsappUrl } = useSiteContact();

  const trustItems = contact.contactTrustStats.map((item, idx) => ({
    label: lang === "hi" ? item.labelHi : item.labelEn,
    value: lang === "hi" ? item.valueHi : item.valueEn,
    hint: lang === "hi" ? item.hintHi : item.hintEn,
    icon: TRUST_ICONS[idx % TRUST_ICONS.length] ?? Clock,
  }));

  const whatsappHref = whatsappUrl("agronomist");

  return (
    <section
      aria-labelledby="trust-heading"
      className="relative border-t border-[#143d31]/10 bg-[#f4f8f5] py-12 sm:py-16 md:py-20 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Heading, Editorial Narrative, & On-Ground Visual Frame */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal variant="fade-up" className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
                <p className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
                  {isHindi ? "विश्वसनीयता व गति" : "Why Reach Out"}
                </p>
              </div>

              <h2
                id="trust-heading"
                className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-[#143d31] leading-[1.14]"
              >
                {isHindi
                  ? "सटीक प्रतिक्रिया समय। सीधे मिलने के प्रामाणिक केंद्र।"
                  : "Clear response times. Real places to visit."}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed">
                {isHindi
                  ? "पारदर्शी संचार, फील्ड-स्तरीय तकनीकी सहायता और सीधा ऑन-ग्राउंड संपर्क ताकि हर किसान को मिले सही समाधान।"
                  : "Direct access to senior agronomists, guaranteed turnaround hours, and operational smart facilities you can visit anytime."}
              </p>
            </Reveal>

            {/* Visual Photo Anchor (Lines Framed) */}
            <Reveal variant="fade-up" delay={0.1}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#143d31]/15 bg-[#143d31]/5 shadow-xs group">
                <img
                  src={contactPhoto}
                  alt="Agaate agronomist advising farmer in field"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Meta Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                    <span className="font-sans text-xs font-semibold text-white/95">
                      {isHindi ? "फील्ड एग्रोनॉमिस्ट डेस्क सक्रिय" : "Agronomist Desk Active"}
                    </span>
                  </div>
                  <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-xs border border-white/10">
                    Gurugram Hub
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 2x2 Lines-Based Metrics & Capabilities Matrix */}
          <Reveal variant="fade-up" delay={0.15} className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-y border-[#143d31]/15">
              {trustItems.map((item, idx) => {
                const Icon = item.icon;
                const num = String(idx + 1).padStart(2, "0");
                const isLeft = idx % 2 === 0;
                const isTop = idx < 2;

                return (
                  <div
                    key={item.label}
                    className={`flex flex-col justify-between py-6 sm:py-7 transition-colors group ${
                      isLeft
                        ? "sm:border-r sm:border-[#143d31]/15 sm:pr-6 md:pr-8"
                        : "sm:pl-6 md:pl-8"
                    } ${
                      isTop
                        ? "border-b border-[#143d31]/15 sm:pb-7"
                        : "border-b sm:border-b-0 border-[#143d31]/15 pt-6 sm:pt-7"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Index, Icon & Eyebrow */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#5d7d37]">{num}</span>
                          <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5d7d37]/80">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#143d31]/5 text-[#5d7d37] group-hover:bg-[#143d31] group-hover:text-[#a3e635] transition-colors">
                          <Icon className="h-3.5 w-3.5" weight="duotone" />
                        </div>
                      </div>

                      {/* Display Stat */}
                      <p className="font-display text-2xl sm:text-[1.75rem] font-bold text-[#143d31] tracking-tight leading-snug group-hover:text-[#5d7d37] transition-colors">
                        {item.value}
                      </p>
                    </div>

                    {/* Supporting Description */}
                    <p className="mt-3 font-sans text-xs leading-relaxed text-[#4f624f]">
                      {item.hint}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <SlideUpPillButton
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                size="md"
                label={isHindi ? "व्हाट्सएप पर संपर्क करें" : "Chat on WhatsApp"}
                icon={<WhatsappLogo className="h-4 w-4 text-[#a3e635]" weight="bold" />}
                iconPosition="left"
              />
              <p className="font-mono text-[11px] text-[#4f624f]">
                {isHindi ? "● औसत रिप्लाई समय: 15–30 मिनट" : "● Average reply: 15–30 mins"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
