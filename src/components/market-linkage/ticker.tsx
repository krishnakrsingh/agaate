import { TrendingDown, TrendingUp } from "lucide-react";
import { Marquee } from "@/components/common/motion";
import { PRICING } from "./data";

export function LivePriceTicker() {
  return (
    <div className="border-b border-border bg-bone">
      <Marquee duration={36} reverse className="py-4">
        <div className="flex shrink-0 items-center gap-8">
          {PRICING.map((p) => (
            <div key={p.crop} className="flex shrink-0 items-center gap-3">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.16em] text-forest-deep">
                {p.crop}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-terracotta/25 bg-terracotta/10 px-3 py-1 font-mono text-[11px] font-bold text-terracotta">
                <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
                Mandi {p.local}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-700/25 bg-emerald-700/10 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                Agaate {p.buyback} {p.premium}
              </span>
              <span className="text-terracotta">✦</span>
            </div>
          ))}
          <span className="shrink-0 font-jet text-xs font-bold uppercase tracking-[0.18em] text-forest/60">
            Handpick tie-up
          </span>
          <span className="shrink-0 text-terracotta">✦</span>
          <span className="shrink-0 font-jet text-xs font-bold uppercase tracking-[0.18em] text-forest/60">
            Zero middlemen
          </span>
          <span className="shrink-0 text-terracotta">✦</span>
          <span className="shrink-0 font-jet text-xs font-bold uppercase tracking-[0.18em] text-forest/60">
            Guaranteed floor rates
          </span>
          <span className="shrink-0 text-terracotta">✦</span>
        </div>
      </Marquee>
    </div>
  );
}
