import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Sprout,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Activity,
  ShoppingCart,
  Clock,
  Check,
  AlertCircle,
  Thermometer,
  Droplets,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/services/nursery")({
  component: Nursery,
});

function Nursery() {
  const [crop, setCrop] = useState("Tomato");
  const [acres, setAcres] = useState(2);
  const [booked, setBooked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Recommendations: seedlings per acre
  const recommendations: Record<
    string,
    { qty: number; cost: number; desc: string; mortalityTrad: string; mortalityAgaate: string }
  > = {
    Tomato: {
      qty: 7000,
      cost: 2.5,
      desc: "Containerized hybrid tomato seedlings with double root density.",
      mortalityTrad: "28% field loss",
      mortalityAgaate: "3.5% field loss",
    },
    Chilli: {
      qty: 9000,
      cost: 1.8,
      desc: "Fungal-resistant organic bio-boosted chilli plugs.",
      mortalityTrad: "35% field loss",
      mortalityAgaate: "4.8% field loss",
    },
    Capsicum: {
      qty: 11000,
      cost: 3.2,
      desc: "Sturdy greenhouse-grade bell pepper seedlings.",
      mortalityTrad: "22% field loss",
      mortalityAgaate: "2.1% field loss",
    },
  };

  const currentRec = recommendations[crop] || recommendations.Tomato;
  const totalSeedlings = currentRec.qty * acres;
  const estimatedCost = totalSeedlings * currentRec.cost;

  // Batch Tracer Mock Data
  const activeBatches = [
    {
      id: "BT-2041",
      crop: "Tomato (Abhinav)",
      stage: "Radicle Germination",
      temp: "24.2°C",
      humidity: "82%",
      progress: 35,
      health: "Excellent",
      daysLeft: 12,
    },
    {
      id: "BT-1988",
      crop: "Chilli (Tejaswini)",
      stage: "Secondary Leafing",
      temp: "22.8°C",
      humidity: "75%",
      progress: 72,
      health: "Vigorous",
      daysLeft: 5,
    },
    {
      id: "BT-2015",
      crop: "Capsicum (Green Gold)",
      stage: "Hardening Block",
      temp: "21.5°C",
      humidity: "68%",
      progress: 94,
      health: "Hardy (Ready)",
      daysLeft: 1,
    },
  ];

  // Delivery calendar slots
  const slots = [
    { date: "Jul 28, 2026", status: "Available", desc: "Batch BT-2015 hardening complete" },
    { date: "Aug 02, 2026", status: "Available", desc: "Batch BT-1988 hardening complete" },
    { date: "Aug 09, 2026", status: "Few Trays Left", desc: "Mid-August dispatch block" },
    { date: "Aug 16, 2026", status: "Fully Booked", desc: "Late-August dispatch block" },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedSlot(null);
    }, 4000);
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 01
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Bio-Boosted <span className="italic text-terracotta">Nursery.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Replace risky direct field seeding with premium, containerized plug seedlings raised
            inside our 17-acre smart climate-controlled chambers.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Core details & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
              Why seedling quality dictates final yield
            </h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">
              Direct seed sowing has high mortality due to unpredictable heat, uneven moisture, and
              soil-borne fungal spores. Agaate's seedlings are germinated in sterile cocopeat plugs
              inoculated with biological beneficials (Trichoderma, Pseudomonas) inside automated
              climate vaults.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Organic Bio-Inoculation
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Accelerates early root colonization, protecting against damping-off and soil
                    fungi attacks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Double Root Density
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Chamber temperature rhythms stimulate dense lateral root branching for immediate
                    transplant establishment.
                  </p>
                </div>
              </div>
            </div>

            {/* Yield Benefits Summary Box */}
            <div className="bg-[#eef3f0]/50 rounded-2xl border border-forest/10 p-6 space-y-4">
              <span className="font-jet text-[9px] tracking-widest text-forest font-bold uppercase block">
                Yield metrics contrast
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-border text-xs">
                  <span className="text-forest/50 block font-mono">TRADITIONAL SOWING</span>
                  <span className="text-destructive font-serif text-2xl font-bold block mt-1">
                    {currentRec.mortalityTrad}
                  </span>
                  <span className="text-forest/60 text-[10px] mt-1 block">
                    Due to weak radicles & weather shock
                  </span>
                </div>
                <div className="bg-card p-4 rounded-xl border border-forest/20 text-xs">
                  <span className="text-forest block font-bold font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} /> AGAATE SMART
                    PLUGS
                  </span>
                  <span className="text-forest font-serif text-2xl font-bold block mt-1">
                    {currentRec.mortalityAgaate}
                  </span>
                  <span className="text-forest/60 text-[10px] mt-1 block">
                    Inoculated roots anchor instantly
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Box */}
          <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-border p-8 text-left space-y-8 shadow-sm">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Interactive Planner
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                Seedling Calculator
              </h3>
            </div>

            {booked ? (
              <div className="p-8 text-center bg-card border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[380px] animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                  Booking Registered
                </h4>
                <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                  We have reserved your seedling trays for{" "}
                  <span className="font-semibold text-forest">
                    {selectedSlot || "the next available slot"}
                  </span>
                  . An agronomy coordinator will contact you to finalize delivery logistics.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Select Vegetable Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-forest-deep"
                  >
                    <option>Tomato</option>
                    <option>Chilli</option>
                    <option>Capsicum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Total Acreage ({acres} Acres)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={acres}
                    onChange={(e) => setAcres(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-forest/40 mt-1">
                    <span>1 Acre</span>
                    <span>25 Acres</span>
                  </div>
                </div>

                {/* Slots selection */}
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Select Delivery Slot
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {slots.map((s, idx) => {
                      const isFullyBooked = s.status === "Fully Booked";
                      const isSelected = selectedSlot === s.date;
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isFullyBooked}
                          onClick={() => setSelectedSlot(s.date)}
                          className={`w-full text-left p-3 border rounded-xl flex items-center justify-between transition-all text-xs font-mono cursor-pointer ${
                            isFullyBooked
                              ? "bg-bone/40 border-border/50 text-forest/30 cursor-not-allowed opacity-50"
                              : isSelected
                                ? "bg-forest border-forest text-cream font-bold"
                                : "bg-card border-border text-forest-deep hover:border-forest"
                          }`}
                        >
                          <span>
                            {s.date}{" "}
                            <span className="text-[10px] block opacity-75 font-sans mt-0.5">
                              {s.desc}
                            </span>
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                              isFullyBooked
                                ? "bg-[#eef3f0]/10"
                                : isSelected
                                  ? "bg-cream/20 text-cream"
                                  : s.status === "Available"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 bg-card border border-border rounded-2xl grid grid-cols-2 gap-4 text-xs font-mono shadow-sm">
                  <div>
                    <span className="text-forest/40 block">SEEDLINGS REQUIRED</span>
                    <span className="text-forest-deep font-bold text-sm">
                      {totalSeedlings.toLocaleString()} Plugs
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">EST. ACCELERATOR COST</span>
                    <span className="text-terracotta font-bold text-sm">
                      ₹{estimatedCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="col-span-2 pt-3 border-t border-border/50">
                    <span className="text-forest/40 block">DESCRIPTION</span>
                    <span className="text-forest/70 font-sans text-xs mt-1 block leading-relaxed">
                      {currentRec.desc}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedSlot}
                  className={`w-full rounded-xl font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    selectedSlot
                      ? "bg-forest-deep hover:bg-forest text-cream"
                      : "bg-forest/35 text-cream/70 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Reserve Seedling Trays</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Seedling Batch Tracer Dashboard */}
        <div className="border-t border-border pt-24 text-left space-y-12">
          <div>
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              REAL-TIME CHAMBER SYSTEM
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Active Seedling Batch Telemetry
            </h2>
            <p className="text-forest/70 text-sm mt-2 max-w-2xl leading-relaxed">
              Every germinated batch is tracked by automated ambient sensor clusters inside our
              smart greenhouses. Review active readings below before placing orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeBatches.map((b, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual glow indicator */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono font-bold bg-[#eef3f0] text-forest border border-forest/10 px-2 py-0.5 rounded">
                    Batch {b.id}
                  </span>
                  <span className="text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 animate-pulse" /> {b.health}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-forest/40 text-[10px] font-mono block">CROP VARIETY</span>
                    <h4 className="font-bold text-forest-deep text-base">{b.crop}</h4>
                  </div>
                  <div>
                    <span className="text-forest/40 text-[10px] font-mono block">
                      GERMINATION STAGE
                    </span>
                    <span className="text-sm font-semibold text-forest">{b.stage}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-forest/50">
                      <span>CHAMBER GROWTH PROGRESS</span>
                      <span>{b.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-bone rounded-full overflow-hidden">
                      <div
                        className="h-full bg-forest rounded-full"
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-terracotta" />
                      <div>
                        <span className="text-forest/40 text-[9px] block">TEMP</span>
                        <span className="font-bold text-forest-deep">{b.temp}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <div>
                        <span className="text-forest/40 text-[9px] block">HUMIDITY</span>
                        <span className="font-bold text-forest-deep">{b.humidity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center gap-1.5 text-xs text-forest/70">
                    <Clock className="w-4 h-4 text-forest/45" />
                    <span>
                      Hardening finishes in{" "}
                      <span className="font-bold text-forest-deep">{b.daysLeft} days</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nursery FAQ accordions */}
        <div className="border-t border-border pt-24 text-left max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              FREQUENT QUESTIONS
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Seedling Nursery Guide
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What bio-inoculants do you treat the seedling plugs with?",
                a: "Every tray is treated with a combination of Trichoderma harzianum and Pseudomonas fluorescens cultures. These beneficial microbes colonize the root surfaces, creating a protective shield against soil pathogens like Pythium and Fusarium.",
              },
              {
                q: "Can I bring my own hybrid seeds for custom raising?",
                a: "Yes. For batches over 25,000 plugs (approx 3.5 acres), we accept clean hybrid seed deposits. Our agronomy team will check seed viability baseline numbers and program a dedicated growth batch for you.",
              },
              {
                q: "How are the seedlings transported to avoid root shock?",
                a: "Plugs are delivered inside structural plastic tray crates loaded into ventilated, shock-absorbing logistics trucks. Deliveries are scheduled for early morning or evening to ensure seedlings do not face temperature stress during transit.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h4 className="font-serif text-xl font-bold text-forest-deep flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-forest/40 flex-shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-forest/70 text-sm mt-3 leading-relaxed pl-6 border-l border-forest/10">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
