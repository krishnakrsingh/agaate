import { ChatCircleText, Sparkle, UserCheck } from "@phosphor-icons/react";
import {
  CountUp,
  MagneticButton,
  Marquee,
  PageHero,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";
import { STATS } from "./community-data";

export const WHATSAPP_COMMUNITY_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%2C%20I%20want%20to%20join%20the%20Agaate%20Parivaar%20Farmer%20Community.";

export function CommunityHero({ onOpenModal }: { onOpenModal: () => void }) {
  const marqueeItems = [
    "2,000+ PARIVAAR GROWERS",
    "DAILY WHATSAPP STAGE GUIDANCE",
    "PHOTO DISEASE DIAGNOSIS",
    "30-MIN RESPONSE PROTOCOL",
    "GUARANTEED CONTRACT BUYBACK",
    "NO MIDDLEMAN COMMISSIONS",
    "17-ACRE SMART NURSERY PLUGS",
  ];

  return (
    <>
      <PageHero
        eyebrow="AGAATE PARIVAAR FARMER NETWORK"
        title={
          <>
            2,000+ Farmers Growing Together with <br />
            <span className="italic text-terracotta">Zero Guesswork.</span>
          </>
        }
        description="Join India's premier agronomist-led farmer community. Get daily WhatsApp stage guidance, photo disease diagnosis, verified staking methods, and direct market buyback."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream/90 px-4 py-2">
            <Sparkle className="h-4 w-4 animate-pulse text-moss" />
            <span className="font-jet text-[11px] font-bold uppercase tracking-wider text-forest-deep">
              2,000+ Verified Parivaar Members
            </span>
          </div>

          <MagneticButton
            as="button"
            onClick={onOpenModal}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest-deep px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream shadow-lg shadow-forest-deep/20 transition-all hover:bg-forest"
          >
            <UserCheck className="h-4 w-4 text-terracotta" />
            <span>Join the Parivaar Now</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href={WHATSAPP_COMMUNITY_URL}
            className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-cream/80 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-forest hover:bg-bone"
          >
            <ChatCircleText className="h-4 w-4 text-moss" />
            <span>Join WhatsApp Group</span>
          </MagneticButton>
        </div>
      </PageHero>

      <div className="border-y border-border bg-forest-deep py-3 text-cream">
        <Marquee duration={32}>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-4 inline-flex items-center gap-8 font-jet text-[11px] font-bold uppercase tracking-[0.22em] text-cream/90"
            >
              {item}
              <span className="text-moss">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-12 w-full max-w-7xl px-6 lg:px-12">
        <Stagger
          className="grid grid-cols-1 gap-6 rounded-3xl border border-forest/10 bg-bone px-8 py-8 shadow-sm sm:grid-cols-3"
          stagger={0.1}
        >
          {STATS.map((s) => (
            <StaggerItem key={s.label} variant="fade-up" className="text-center">
              <p className="font-serif text-4xl font-bold text-forest-deep md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 font-jet text-xs font-bold uppercase tracking-wider text-forest-deep">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
