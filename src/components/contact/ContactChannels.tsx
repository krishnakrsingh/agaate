import { useState, useRef } from "react";
import {
  ChatCircleDots,
  PhoneCall,
  Compass,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRIMARY_PHONE, TEL_PRIMARY, WHATSAPP_URL } from "./data";
import { track } from "@/lib/analytics";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

gsap.registerPlugin(useGSAP);

interface ChannelPathway {
  number: string;
  icon: typeof ChatCircleDots;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  actionLabel: string;
  actionSub: string;
  type: "whatsapp" | "phone" | "anchor";
  href: string;
  perks: string[];
}

const pathways: ChannelPathway[] = [
  {
    number: "01",
    icon: ChatCircleDots,
    tag: "Field Advisory",
    title: "Instant WhatsApp Advisory",
    subtitle: "< 15 min leaf photo diagnosis",
    description:
      "Send clear photos of diseased leaves, pest symptoms, or soil reports. Senior agronomy scientists identify the issue and send exact stage-wise spray and fertigation dosage charts.",
    actionLabel: "WhatsApp Agronomist",
    actionSub: "Typical reply < 15 mins",
    type: "whatsapp",
    href: WHATSAPP_URL,
    perks: [
      "Photo pest & disease identification",
      "Exact spray & fertigation doses",
      "No automated bots · Real senior scientists",
    ],
  },
  {
    number: "02",
    icon: PhoneCall,
    tag: "Central Hotline",
    title: "Direct Agronomy Desk",
    subtitle: "Real-time voice consultation",
    description:
      "Speak directly with our Gurugram central desk for nursery sapling pre-orders, bulk input pricing, customized drip packages, or emergency crop guidance.",
    actionLabel: `Call ${PRIMARY_PHONE}`,
    actionSub: "Mon–Sat · 7:30 AM – 8:00 PM IST",
    type: "phone",
    href: `tel:${TEL_PRIMARY}`,
    perks: [
      "Immediate voice consultation",
      "Nursery pre-orders & dispatch dates",
      "Verified factory-direct pricing",
    ],
  },
  {
    number: "03",
    icon: Compass,
    tag: "Living Farm",
    title: "Tour 17-Acre Agri Park",
    subtitle: "Living demonstration plots in Kukrola",
    description:
      "Walk through automated plug nurseries, high-immunity seedling germinators, automated drip fertigation, and AI drone scouting before implementing any technology on your land.",
    actionLabel: "Explore Proving Grounds",
    actionSub: "NH8 Kukrola / Pachgaon, Gurugram",
    type: "anchor",
    href: "#facilities",
    perks: [
      "Walk living seedling labs & crop plots",
      "One-on-one field scientist briefing",
      "100% free grower masterclasses",
    ],
  },
];

export default function ContactChannels() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredLane, setHoveredLane] = useState<number | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          if (reduceMotion) return;

          gsap.fromTo(
            ".channel-lane",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="contact-channels"
      aria-label="Direct contact channels"
      className="relative bg-[#f4f8f5] py-12 sm:py-16 md:py-20 text-[#143d31] border-b border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl text-left">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5d7d37]">
              02 · Three Direct Action Corridors
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#143d31] tracking-tight leading-[1.12]">
              Choose Your Direct Connection Pathway
            </h2>
            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              Whether you need instant WhatsApp photo diagnosis, direct phone guidance, or want to walk our living 17-acre proving ground — select your path.
            </p>
          </div>
        </div>

        {/* 3-Corridor Hairline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10">
          {pathways.map((pathway, idx) => {
            const Icon = pathway.icon;
            const isHovered = hoveredLane === idx;

            return (
              <div
                key={pathway.number}
                onMouseEnter={() => setHoveredLane(idx)}
                onMouseLeave={() => setHoveredLane(null)}
                className="channel-lane group relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:bg-white/60"
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
                  {pathway.type === "whatsapp" ? (
                    <SlideUpPillButton
                      href={pathway.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_clicked", { source: "channel_card" })}
                      variant="dark"
                      size="md"
                      fullWidth
                      label={pathway.actionLabel}
                      icon={<ArrowUpRight className="h-4 w-4" />}
                      iconPosition="right"
                    />
                  ) : pathway.type === "phone" ? (
                    <SlideUpPillButton
                      href={pathway.href}
                      onClick={() => track("phone_clicked", { source: "channel_card" })}
                      variant="dark"
                      size="md"
                      fullWidth
                      label={pathway.actionLabel}
                      icon={<PhoneCall className="h-4 w-4" />}
                      iconPosition="right"
                    />
                  ) : (
                    <SlideUpPillButton
                      href={pathway.href}
                      variant="dark"
                      size="md"
                      fullWidth
                      label={pathway.actionLabel}
                      icon={<ArrowRight className="h-4 w-4" />}
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
  );
}
