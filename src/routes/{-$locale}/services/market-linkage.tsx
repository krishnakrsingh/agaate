import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Buildings,
  CaretDown,
  CheckCircle,
  Clock,
  CurrencyDollar,
  Handshake,
  Medal,
  PhoneCall,
  Scales,
  ShieldCheck,
  Sparkle,
  TrendUp,
  Truck,
  Users,
  X
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  PageHero,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import { useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/services/market-linkage")({
  component: MarketLinkagePage,
});

type CommodityItem = {
  crop: string;
  mandiPrice: number; // ₹ per kg
  agaateFloorPrice: number; // ₹ per kg
  retailPrice: number; // ₹ per kg
  gainPct: string;
  gradeAStd: string;
};

const COMMODITIES: CommodityItem[] = [
  {
    crop: "Tomato (Hybrid F1)",
    mandiPrice: 14,
    agaateFloorPrice: 19,
    retailPrice: 28,
    gainPct: "+35.7%",
    gradeAStd: "Firm red skin, 55-65mm diameter, zero physical blemishes",
  },
  {
    crop: "Watermelon (Black Boy)",
    mandiPrice: 9,
    agaateFloorPrice: 13,
    retailPrice: 20,
    gainPct: "+44.4%",
    gradeAStd: "TSS > 11.5° Brix sweetness, deep red flesh, 3-5kg size",
  },
  {
    crop: "Chilli (Green Pungent)",
    mandiPrice: 32,
    agaateFloorPrice: 42,
    retailPrice: 65,
    gainPct: "+31.2%",
    gradeAStd: "8-10cm length, uniform deep green, crisp firm skin",
  },
  {
    crop: "Cauliflower (Snowball)",
    mandiPrice: 16,
    agaateFloorPrice: 22,
    retailPrice: 35,
    gainPct: "+37.5%",
    gradeAStd: "Pure white compact curd, 800g-1.2kg weight, zero yellowing",
  },
  {
    crop: "Cucumber (Polyhouse)",
    mandiPrice: 12,
    agaateFloorPrice: 17,
    retailPrice: 26,
    gainPct: "+41.6%",
    gradeAStd: "Straight cylindrical shape, uniform dark green, seedless core",
  },
];

const GRADING_STEPS = [
  {
    grade: "Grade A",
    badge: "Premium Export / Supermarket",
    priceMultiplier: "100% Top Buyback Floor Price",
    desc: "Blemish-free, uniform sizing, peak ripeness. Directly packed for quick-commerce apps (Blinkit/Zepto) and supermarket chains.",
    icon: Medal,
  },
  {
    grade: "Grade B",
    badge: "Regional Retail & Mandi Premium",
    priceMultiplier: "85% Floor Price",
    desc: "Slight size variation but excellent nutritional quality. Supplied to regional retail hubs and hotel chains.",
    icon: Buildings,
  },
  {
    grade: "Grade C",
    badge: "Processing & Food Industry",
    priceMultiplier: "70% Industrial Price",
    desc: "Cosmetically imperfect crops purchased by puree, sauce, and food processing partners so zero harvest goes to waste.",
    icon: Scales,
  },
];

function MarketLinkagePage() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  // Comparison ROI Widget State
  const [harvestQuintals, setHarvestQuintals] = useState<number>(100);
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("");
  const [expectedYieldQuintals, setExpectedYieldQuintals] = useState("100");

  const crop = COMMODITIES[selectedCropIndex];
  const harvestKg = harvestQuintals * 100;

  // Financial Calculations
  const mandiRevenue = harvestKg * crop.mandiPrice;
  const mandiMiddlemanCommission = mandiRevenue * 0.1; // 10% commission
  const mandiTransportDeduction = harvestQuintals * 80; // ₹80 per quintal transport
  const mandiWeightLoss = mandiRevenue * 0.05; // 5% shrinkage loss
  const mandiNetIncome = mandiRevenue - mandiMiddlemanCommission - mandiTransportDeduction - mandiWeightLoss;

  const agaateRevenue = harvestKg * crop.agaateFloorPrice;
  const agaateMiddlemanCommission = 0; // 0%
  const agaateTransportDeduction = 0; // Farmgate pickup
  const agaateNetIncome = agaateRevenue;

  const netExtraProfit = agaateNetIncome - mandiNetIncome;

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      setIsModalOpen(false);
      setFarmerName("");
      setFarmerPhone("");
      setFarmerLocation("");
    }, 3500);
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
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
        {/* Live Hero Stats */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { to: 2000, suffix: "+", label: "Parivaar Farmers Connected" },
            { to: 15000, suffix: "+", label: "Acres Under Buyback" },
            { to: 25, suffix: "+", label: "Direct Buyer Tie-Ups" },
            { to: 0, suffix: "%", label: "Middleman Commission" },
          ].map((stat) => (
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

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={() => setIsModalOpen(true)} strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 font-bold text-sm text-cream shadow-xl hover:bg-forest transition-colors cursor-pointer">
              Enroll in Buyback Program <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>

          <MagneticButton as="a" href="#roi-calculator" strength={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-card px-7 py-3.5 font-bold text-sm text-forest-deep shadow-sm hover:bg-cream">
              Calculate Direct Profit Gain
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Marquee Strip */}
      <div className="border-b border-border bg-card/70 py-4 overflow-hidden">
        <Marquee duration={32}>
          {[
            "Handpick Buyer Integration",
            "Guaranteed Minimum Buyback Price",
            "Zero Middleman Commissions",
            "24-48 Hour Direct Bank Payouts",
            "Grade A/B/C Transparent Sorting",
            "Farmgate Doorstep Pickup",
          ].map((item) => (
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

      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        {/* Section 1: Live Commodity Price Board / Rate Ticker */}
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
                  <th className="p-5 text-emerald-700 bg-emerald-50/50">Agaate Buyback Floor Rate</th>
                  <th className="p-5 text-forest-deep">Supermarket Grade A Retail</th>
                  <th className="p-5 text-terracotta">Net Price Boost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMMODITIES.map((c, idx) => (
                  <tr
                    key={c.crop}
                    onClick={() => setSelectedCropIndex(idx)}
                    className={`cursor-pointer transition-colors ${
                      selectedCropIndex === idx ? "bg-forest/5 font-semibold" : "hover:bg-bone/40"
                    }`}
                  >
                    <td className="p-5 font-serif text-lg font-bold text-forest-deep">
                      {c.crop}
                    </td>
                    <td className="p-5 font-mono text-destructive">
                      ₹{c.mandiPrice} / kg
                    </td>
                    <td className="p-5 font-mono text-emerald-800 font-bold bg-emerald-50/30">
                      ₹{c.agaateFloorPrice} / kg
                    </td>
                    <td className="p-5 font-mono text-forest/70">
                      ₹{c.retailPrice} / kg
                    </td>
                    <td className="p-5 font-mono font-bold text-terracotta">
                      {c.gainPct}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Interactive Middlemen vs Agaate Direct Market ROI Comparison Widget */}
        <section id="roi-calculator" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="FINANCIAL COMPARISON CALCULATOR"
            title="Middlemen Auctions vs Agaate Direct Buyback."
            description="Adjust harvest volume below to compare net payouts between local mandi agents and Agaate guaranteed buyback."
          />

          <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-sm space-y-10">
            {/* Controls */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-forest/60 mb-2">
                  Select Crop Variety:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMODITIES.map((c, idx) => (
                    <button
                      key={c.crop}
                      onClick={() => setSelectedCropIndex(idx)}
                      className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                        selectedCropIndex === idx
                          ? "bg-forest-deep text-cream shadow-sm"
                          : "border border-border bg-bone text-forest/80 hover:border-forest/40"
                      }`}
                    >
                      {c.crop.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline font-mono text-xs font-bold mb-2">
                  <span className="text-forest/60">HARVEST VOLUME:</span>
                  <span className="rounded-md bg-forest/10 px-3 py-1 font-serif text-xl text-forest-deep">
                    {harvestQuintals} Quintals ({harvestKg.toLocaleString("en-IN")} kg)
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={harvestQuintals}
                  onChange={(e) => setHarvestQuintals(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
              </div>
            </div>

            {/* Side-by-Side Breakdown Cards */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Mandi Card */}
              <div className="rounded-3xl border border-destructive/20 bg-red-50/30 p-8 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-destructive/10 pb-3">
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Local Mandi Auction
                  </h4>
                  <span className="font-mono text-xs font-bold text-destructive">10%+ Deductions</span>
                </div>

                <div className="space-y-2 font-mono text-xs text-forest/80">
                  <div className="flex justify-between">
                    <span>Gross Sales (₹{crop.mandiPrice}/kg):</span>
                    <span>₹{mandiRevenue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Middleman Commission (10%):</span>
                    <span>-₹{mandiMiddlemanCommission.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Transport Fee (₹80/Qtl):</span>
                    <span>-₹{mandiTransportDeduction.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Weight Shrinkage (5%):</span>
                    <span>-₹{mandiWeightLoss.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-destructive/20 pt-2 flex justify-between font-bold text-sm text-forest-deep">
                    <span>Net Farmer Payout:</span>
                    <span>₹{mandiNetIncome.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-destructive/20 bg-card p-3 font-sans text-xs text-forest/70">
                  Payout delayed 15-30 days with arbitrary price drops upon truck arrival.
                </div>
              </div>

              {/* Agaate Direct Card */}
              <div className="rounded-3xl border border-forest/30 bg-emerald-50/40 p-8 space-y-4 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-forest/15 pb-3">
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Agaate Direct Buyback
                  </h4>
                  <span className="font-mono text-xs font-bold text-emerald-800">0% Commission</span>
                </div>

                <div className="space-y-2 font-mono text-xs text-forest/80">
                  <div className="flex justify-between">
                    <span>Gross Sales (₹{crop.agaateFloorPrice}/kg Floor):</span>
                    <span>₹{agaateRevenue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Middleman Commission:</span>
                    <span>₹0 (Direct Contract)</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Transport Fee:</span>
                    <span>₹0 (Farmgate Pickup)</span>
                  </div>
                  <div className="border-t border-forest/20 pt-2 flex justify-between font-bold text-sm text-emerald-800">
                    <span>Net Farmer Payout:</span>
                    <span>₹{agaateNetIncome.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-forest-deep p-4 text-cream font-sans space-y-1">
                  <span className="font-mono text-[10px] font-bold text-terracotta uppercase">
                    NET EXTRA PROFIT FOR GROWER
                  </span>
                  <p className="font-serif text-2xl font-bold">
                    +₹{netExtraProfit.toLocaleString("en-IN")} Additional Income
                  </p>
                  <p className="text-xs text-cream/70">
                    Guaranteed contract floor price with direct bank transfer in 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Transparent Grading Standards */}
        <section id="grading" className="scroll-mt-28">
          <SectionHeader
            align="center"
            eyebrow="QUALITY & CLASSIFICATION"
            title="Handpick & Buyer Grading Standards."
            description="Transparent grade sorting ensuring even non-export crops earn fair industrial value."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {GRADING_STEPS.map((gr) => {
              const GIcon = gr.icon;
              return (
                <TiltCard key={gr.grade} maxTilt={8} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:border-forest/40 hover:shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-forest-deep px-3 py-1 font-mono text-xs font-bold text-cream">
                          {gr.grade}
                        </span>
                        <GIcon className="h-6 w-6 text-moss" />
                      </div>
                      <span className="block font-mono text-[10px] font-bold uppercase text-terracotta">
                        {gr.badge}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-forest-deep">
                        {gr.priceMultiplier}
                      </h4>
                      <p className="text-xs text-forest/75 leading-relaxed">{gr.desc}</p>
                    </div>

                    <div className="mt-6 border-t border-border pt-4 font-mono text-[10px] font-bold text-forest/60 uppercase">
                      Transparent Weighing at Farmgate
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Section 4: Final CTA */}
        <section id="buyback-cta" className="scroll-mt-28">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-10 md:p-16 text-center text-cream shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-jet text-xs font-bold uppercase tracking-[0.2em] text-moss">
                GUARANTEED MARKET BUYBACK
              </span>
              <h2 className="font-serif text-4xl font-bold md:text-6xl text-cream">
                Lock Your Floor Price Before Planting.
              </h2>
              <p className="text-base text-cream/80 max-w-xl mx-auto leading-relaxed">
                Never gamble with mandi auctions again. Sign a buyback contract with Agaate today.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <MagneticButton onClick={() => setIsModalOpen(true)} strength={0.35}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 font-bold text-sm text-cream shadow-xl hover:bg-terracotta/90 transition-colors cursor-pointer">
                    Enroll in Buyback Program <ArrowRight className="h-4 w-4" />
                  </span>
                </MagneticButton>

                <a
                  href="tel:9487263498"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-4 font-bold text-sm text-cream hover:bg-cream/20 transition-colors"
                >
                  <PhoneCall className="h-4 w-4" /> Call Buyback Desk: 9487263498
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Buyback Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl space-y-6 text-left"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-forest/40 hover:text-forest cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {modalSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle className="h-8 w-8 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Buyback Registration Received!
                  </h4>
                  <p className="text-xs text-forest/70 max-w-xs mx-auto">
                    We have registered your {crop.crop} crop ({expectedYieldQuintals} Quintals) for guaranteed buyback. A procurement officer will contact {farmerPhone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-terracotta uppercase">
                      DIRECT MARKET CONTRACT
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-forest-deep">
                      Enroll Harvest in Buyback
                    </h4>
                    <p className="text-xs text-forest/60">
                      Lock floor price of ₹{crop.agaateFloorPrice}/kg for {crop.crop}.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="block text-forest/60 mb-1">Full Name:</label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="e.g. Balwan Singh"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-forest/60 mb-1">WhatsApp Phone Number:</label>
                      <input
                        type="tel"
                        required
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        placeholder="e.g. 9812345678"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-forest/60 mb-1">Tehsil / District Location:</label>
                      <input
                        type="text"
                        required
                        value={farmerLocation}
                        onChange={(e) => setFarmerLocation(e.target.value)}
                        placeholder="e.g. Kukrola, Gurugram"
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-forest/60 mb-1">Expected Harvest Volume (Quintals):</label>
                      <input
                        type="number"
                        required
                        value={expectedYieldQuintals}
                        onChange={(e) => setExpectedYieldQuintals(e.target.value)}
                        className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep py-3.5 font-bold text-xs text-cream hover:bg-forest transition-colors cursor-pointer mt-4"
                  >
                    Submit Buyback Application
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default MarketLinkagePage;
