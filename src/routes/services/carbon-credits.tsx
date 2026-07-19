import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import {
  Coins,
  Check,
  ShieldCheck,
  ArrowRight,
  Activity,
  TrendingUp,
  Calendar,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/services/carbon-credits")({
  component: CarbonCredits,
});

function CarbonCredits() {
  const [selected, setSelected] = useState<string[]>(["drip", "tillage"]);
  const [ha, setHa] = useState(4); // total hectares
  const [joined, setJoined] = useState(false);
  const [forecastData, setForecastData] = useState<any[]>([]);

  const practices = [
    {
      id: "drip",
      name: "Drip Irrigation Setup",
      desc: "Reduces pumping energy emissions and water runoff waste.",
      value: 1.5,
    },
    {
      id: "tillage",
      name: "Zero Tillage Method",
      desc: "Preserves soil structure, locking atmospheric carbon in the organic layer.",
      value: 2.0,
    },
    {
      id: "bio",
      name: "Organic Bio-Inputs Dosing",
      desc: "Replaces chemical ammonia synthetic nitrogen emissions.",
      value: 1.8,
    },
    {
      id: "burning",
      name: "Zero Residue Burning",
      desc: "Incorporates organic biomass waste back into the field layer.",
      value: 1.2,
    },
    {
      id: "cover",
      name: "Cover Cropping Cycle",
      desc: "Fixes biological nitrogen and builds organic matter year-round.",
      value: 2.2,
    },
  ];

  const RATE = 1200; // ₹ per tCO2 credit

  const creditsPerHa = practices
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0);

  const totalCredits = creditsPerHa * ha;
  const annualPayout = totalCredits * RATE;

  useEffect(() => {
    // Generate 5-year carbon projection
    const data = Array.from({ length: 5 }, (_, i) => {
      const year = 2026 + i;
      const accumulationFactor = 1 + i * 0.15; // compound growth of soil organic matter
      const carbonLocked = totalCredits * accumulationFactor;
      return {
        year: `Year 0${i + 1}`,
        "CO2 Locked (Tons)": parseFloat(carbonLocked.toFixed(1)),
        "Estimated Payout (₹)": Math.round(carbonLocked * RATE),
      };
    });
    setForecastData(data);
  }, [selected, ha]);

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => setJoined(false), 4000);
  };

  // Satellite Audit Widget Data
  const auditsList = [
    {
      date: "Jun 15, 2026",
      type: "Sentinel-2 Orbit Scan",
      status: "Verified",
      desc: "Zero crop burning detected. Cover biomass canopy coverage confirmed at 84%.",
    },
    {
      date: "Jul 02, 2026",
      type: "Soil Core Verification",
      status: "Verified",
      desc: "Soil Organic Carbon baseline verified at 1.45% density (Jhajjar Block C).",
    },
    {
      date: "Sep 15, 2026",
      type: "Payout Settlement Schedule",
      status: "Pending Check",
      desc: "Next seasonal bank credit batch processing cycle triggers post-harvest verification.",
    },
  ];

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 04
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Carbon Credits <span className="italic text-terracotta">Program.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Mitigate climate risk and earn annual bank transfer payouts by practicing
            satellite-verified sustainable soil cultivation methods.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Core details & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
              Turn carbon savings into cash-flow
            </h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">
              Every ton of carbon dioxide equivalents (tCO2e) you lock into your soil or prevent
              from entering the atmosphere through zero residue burning generates one carbon credit.
              Agaate coordinates Sentinel satellite orbit checks and on-field core audits, distributing payouts
              directly to grower bank accounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E7ECE8]">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    No Extra Land Needed
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Monetise existing acreage operations. Simply implement baseline soil conservation practices.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    End-to-End Auditing
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Agaate coordinates soil organic matter (SOM) lab checks and Sentinel-2 satellite canopy audits.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance guidelines checklist */}
            <div className="bg-[#eef3f0]/50 rounded-[2rem] border border-forest/10 p-8 space-y-4">
              <span className="font-jet text-[9px] tracking-widest text-forest font-bold uppercase block">Verification rules guidelines</span>
              <h3 className="font-serif text-2xl text-forest-deep font-bold">Mandatory Credit Auditing Criteria</h3>
              <ul className="space-y-3 pt-2 text-xs">
                {[
                  "No straw residue burning: Stubble must be shredded and mixed into topsoil layers using rota-seeders.",
                  "Mandatory winter cover crop: Fields must hold live plant coverage (e.g. mustards/pulses) for at least 75 days post-harvest.",
                  "Zero till restriction: Deep plow inversion tillage is restricted; only shallow seeding passes are permitted.",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-forest-deep">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 text-left space-y-8 shadow-sm">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Indicative Estimator
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                Payout Calculator
              </h3>
            </div>

            {joined ? (
              <div className="p-8 text-center bg-white border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[380px] animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                  Audit Registered
                </h4>
                <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                  Your carbon registration has been logged. An agronomist will schedule a soil mapping visit to check baseline values and set up Sentinel coordinates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-3 uppercase font-semibold">
                    Select Current Practices
                  </label>
                  <div className="space-y-2.5">
                    {practices.map((p) => {
                      const isOn = selected.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleToggle(p.id)}
                          className={`w-full flex items-center gap-3 py-3 border-b border-[#E7ECE8]/50 text-left px-2 -mx-2 transition-colors cursor-pointer ${
                            isOn
                              ? "bg-white rounded-xl border border-[#E7ECE8] shadow-sm"
                              : "hover:bg-white/40"
                          }`}
                        >
                          <span
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isOn
                                ? "bg-terracotta border-terracotta text-cream"
                                : "border-[#E7ECE8]"
                            }`}
                          >
                            {isOn && <Check className="w-3 h-3" strokeWidth={3} />}
                          </span>
                          <span className="flex-1 min-w-0 text-xs">
                            <span className="block font-bold text-forest-deep">{p.name}</span>
                            <span className="block text-forest/50 text-[10px] truncate mt-0.5">
                              {p.desc}
                            </span>
                          </span>
                          <span
                            className={`font-mono text-xs ${isOn ? "text-forest font-bold" : "text-forest/30"}`}
                          >
                            +{p.value.toFixed(1)} tCO₂
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Total Farming Hectares ({ha} ha)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={ha}
                    onChange={(e) => setHa(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-forest/40 mt-1">
                    <span>1 Hectare</span>
                    <span>15 Hectares</span>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7ECE8] rounded-2xl grid grid-cols-2 gap-4 text-xs font-mono shadow-sm">
                  <div>
                    <span className="text-forest/40 block">TOTAL CREDITS / YR</span>
                    <span className="text-forest-deep font-bold text-sm">
                      {totalCredits.toFixed(1)} tCO₂
                    </span>
                  </div>
                  <div>
                    <span className="text-forest/40 block">EST. ANNUAL PAYOUT</span>
                    <span className="text-terracotta font-bold text-sm">
                      ₹{Math.round(annualPayout).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Coins className="w-4 h-4" />
                  <span>Register for Carbon Auditing</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Year Carbon Forecast Chart */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white border border-[#E7ECE8] rounded-[2.5rem] p-6 shadow-sm">
              <span className="text-[10px] font-mono text-forest/45 uppercase block mb-4 font-semibold">5-Year Carbon Sequestration Forecast (tCO2e locked)</span>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" />
                    <XAxis dataKey="year" stroke="#59635D" fontSize={9} fontFamily="var(--font-mono)" />
                    <YAxis stroke="#59635D" fontSize={9} fontFamily="var(--font-mono)" />
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #E7ECE8" }} />
                    <Bar dataKey="CO2 Locked (Tons)" fill="var(--color-moss)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block">LONG-TERM VALUE</span>
              <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                Accumulate organic soil health
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                As conservation methods (zero-tillage, bio-inputs) continue over several years, the organic humus layer compounds, trapping higher densities of carbon molecules annually. Your crop yield baseline improves in sync, reducing crop chemical fertilizer dependence.
              </p>
            </div>
          </div>
        </div>

        {/* Satellite Audit timeline widget */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              SATELLITE COMPLIANCE LEDGER
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Live Satellite Audit Logs
            </h2>
            <p className="text-forest/70 text-sm mt-2 leading-relaxed">
              Tracking automated Sentinel satellite passes, soil sample verification tests, and disbursement schedules.
            </p>
          </div>

          <div className="space-y-4">
            {auditsList.map((audit, idx) => (
              <div key={idx} className="bg-white border border-[#E7ECE8] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition-all duration-300">
                <div className="space-y-1 max-w-2xl text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[9px] font-bold text-forest bg-forest/5 border border-forest/10 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {audit.date}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-forest-deep">{audit.type}</span>
                  </div>
                  <p className="text-forest/65 text-xs mt-1.5 leading-relaxed">{audit.desc}</p>
                </div>
                <span className={`text-[9px] uppercase tracking-wider font-mono px-3 py-1 rounded-full font-bold flex-shrink-0 ${
                  audit.status === "Verified"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}>
                  {audit.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
