import { SectionHeader } from "@/components/common/motion";
import { COMMODITIES } from "./market-linkage-data";

interface CommodityPriceBoardProps {
  selectedCropIndex: number;
  onSelectCropIndex: (index: number) => void;
}

export function CommodityPriceBoard({
  selectedCropIndex,
  onSelectCropIndex,
}: CommodityPriceBoardProps) {
  return (
    <section id="live-prices" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="TRANSPARENT COMMODITY PRICING"
        title="Live Commodity Rate Board."
        description="Comparing traditional Mandi auction prices against Agaate Buyback Floor Prices."
      />

      <div className="mt-12 overflow-x-auto rounded-[2.5rem] border border-border bg-card shadow-sm">
        <table className="w-full text-left font-sans text-xs md:text-sm">
          <thead>
            <tr className="border-b border-border bg-bone font-mono text-[10px] font-bold uppercase tracking-wider text-forest/60">
              <th className="p-5">Vegetable Commodity</th>
              <th className="p-5 text-destructive">Traditional Mandi Rate</th>
              <th className="bg-emerald-50/50 p-5 text-emerald-700">Agaate Buyback Floor Rate</th>
              <th className="p-5 text-forest-deep">Supermarket Grade A Retail</th>
              <th className="p-5 text-terracotta">Net Price Boost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMMODITIES.map((c, idx) => (
              <tr
                key={c.crop}
                onClick={() => onSelectCropIndex(idx)}
                className={`cursor-pointer transition-colors ${
                  selectedCropIndex === idx ? "bg-forest/5 font-semibold" : "hover:bg-bone/40"
                }`}
              >
                <td className="p-5 font-serif text-lg font-bold text-forest-deep">{c.crop}</td>
                <td className="p-5 font-mono text-destructive">₹{c.mandiPrice} / kg</td>
                <td className="bg-emerald-50/30 p-5 font-mono font-bold text-emerald-800">
                  ₹{c.agaateFloorPrice} / kg
                </td>
                <td className="p-5 font-mono text-forest/70">₹{c.retailPrice} / kg</td>
                <td className="p-5 font-mono font-bold text-terracotta">{c.gainPct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
