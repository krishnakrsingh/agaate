import { ArrowRight, PhoneCall } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/common/motion";

export function MarketLinkageCta({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="buyback-cta" className="scroll-mt-28">
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-10 text-center text-cream shadow-2xl md:p-16">
        <div className="relative z-10 mx-auto max-w-3xl space-y-6">
          <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
            GUARANTEED MARKET BUYBACK
          </span>
          <h2 className="font-serif text-4xl font-bold text-cream md:text-6xl">
            Lock Your Floor Price Before Planting.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/80">
            Never gamble with mandi auctions again. Sign a buyback contract with Agaate today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton onClick={onOpenModal} strength={0.35}>
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-bold text-cream shadow-xl transition-colors hover:bg-terracotta/90">
                Enroll in Buyback Program <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <a
              href="tel:8350085005"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 text-sm font-bold text-cream transition-colors hover:bg-cream/20"
            >
              <PhoneCall className="h-4 w-4" /> Call Buyback Desk: 8350085005
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
