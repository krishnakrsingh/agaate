import { ArrowRight, Handshake, Sparkle } from "@phosphor-icons/react";
import { CountUp, MagneticButton, Marquee, PageHero } from "@/components/common/motion";

export function MarketLinkageHero({ onOpenModal }: { onOpenModal: () => void }) {
  const stats = [
    { to: 2000, suffix: "+", label: "Parivaar Farmers Connected" },
    { to: 15000, suffix: "+", label: "Acres Under Buyback" },
    { to: 25, suffix: "+", label: "Direct Buyer Tie-Ups" },
    { to: 0, suffix: "%", label: "Middleman Commission" },
  ];

  const marqueeItems = [
    "Handpick Buyer Integration",
    "Guaranteed Minimum Buyback Price",
    "Zero Middleman Commissions",
    "24-48 Hour Direct Bank Payouts",
    "Grade A/B/C Transparent Sorting",
    "Farmgate Doorstep Pickup",
  ];

  return (
    <>
      <PageHero
        eyebrow="DIRECT SALES & BUYBACK ECOSYSTEM"
        title={
          <>
            Direct Market Access. <br />
            <span className="italic text-terracotta">Guaranteed Buyback Floor Prices.</span>
          </>
        }
        description="Bypass local mandi middleman commissions (10%+). Trade directly with supermarket chains, Handpick buyer networks, and food processors with guaranteed contract prices and 24-48 hour payouts."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-full border border-forest/15 bg-card/90 px-5 py-3 shadow-sm backdrop-blur"
            >
              <Handshake className="h-4 w-4 shrink-0 text-moss" />
              <div>
                <span className="font-serif text-xl font-bold leading-none text-forest-deep">
                  <CountUp to={stat.to} suffix={stat.suffix} duration={2} />
                </span>
                <span className="ml-2 font-jet text-[9px] font-bold uppercase tracking-wider text-forest/60">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={onOpenModal} strength={0.3}>
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-forest">
              Enroll in Buyback Program <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="#roi-calculator" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 text-sm font-bold text-forest-deep shadow-sm hover:bg-cream">
              Calculate Direct Profit Gain
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      <div className="overflow-hidden border-b border-border bg-card/70 py-4">
        <Marquee duration={32}>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-3 font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70"
            >
              <span>{item}</span>
              <Sparkle className="h-3.5 w-3.5 text-terracotta" />
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}
