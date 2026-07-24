import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Sprout,
  Activity,
  ShieldCheck,
  ArrowRight,
  Check,
  Search,
  Filter,
  Compass,
} from "lucide-react";

export const Route = createFileRoute("/agri-park")({
  component: AgriPark,
});

function AgriPark() {
  const [activeZone, setActiveZone] = useState("Seed");
  const [visitBooked, setVisitBooked] = useState(false);
  const [trialSearch, setTrialSearch] = useState("");
  const [trialStatus, setTrialStatus] = useState("All");

  const zones = [
    {
      name: "Seed",
      desc: "Live comparative test beds demonstrating germination percentages, early vigor, and pest resistance across 12 crop varieties.",
      crop: "Hybrid Tomatoes & Peppers",
      stat: "99.2% Germination vigor",
      sensor: "EC & Temperature Online",
      partner: "Sakata Seeds & Seminis",
      svgCoords: { cx: 45, cy: 35 },
    },
    {
      name: "Nursery",
      desc: "Smart polyhouse chamber verifying root-growth density using organic bio-inoculants in sterile cocopeat plugs.",
      crop: "Bio-Boosted Chillies",
      stat: "2.4x Lateral root density",
      sensor: "Humidity Dome Connected",
      partner: "Agaate BioLabs",
      svgCoords: { cx: 85, cy: 35 },
    },
    {
      name: "Irrigation",
      desc: "Pressure-compensating drip layout showing real-time flow monitoring, sand filtration, and automated venturi fertigation loops.",
      crop: "Cucumbers & Melons",
      stat: "-40% Water consumption",
      sensor: "Flowmeter telemetric active",
      partner: "Netafim Israel",
      svgCoords: { cx: 125, cy: 35 },
    },
    {
      name: "Nutrition",
      desc: "Trial plots demonstrating organic carbon accumulation under staged macronutrient dosing and custom mineral supplements.",
      crop: "Leafy Greens (Spinach/Lettuce)",
      stat: "+1.2% Soil Organic Carbon",
      sensor: "N-P-K optical spectrometer",
      partner: "Yara Fertilizers",
      svgCoords: { cx: 45, cy: 75 },
    },
    {
      name: "Crop Protection",
      desc: "Residue-free protection demo beds using botanical repellents and targeted bio-fungicides under dynamic weather advisories.",
      crop: "Cabbage & Broccoli",
      stat: "Zero chemical residues detected",
      sensor: "Spore trap telemetry live",
      partner: "Bayer CropScience Bio",
      svgCoords: { cx: 85, cy: 75 },
    },
    {
      name: "Technology",
      desc: "Command hub showing IoT solar node arrays, precision agricultural drone tracks, and micro-climate weather metrics.",
      crop: "Multi-Crop Field A",
      stat: "4G LoRa Mesh coverage active",
      sensor: "Drone multispectral scan complete",
      partner: "AWS & DJI Agriculture",
      svgCoords: { cx: 125, cy: 75 },
    },
  ];

  const currentZone = zones.find((z) => z.name === activeZone) || zones[0];

  const trials = [
    {
      id: "AG-T21",
      crop: "Tomato (Abhinav)",
      partner: "Sakata",
      result: "98.6% Germination",
      status: "Verified",
    },
    {
      id: "AG-I08",
      crop: "Cucumber (Nishant)",
      partner: "Netafim",
      result: "-42% Water Usage",
      status: "Verified",
    },
    {
      id: "AG-N15",
      crop: "Chilli (Tejaswini)",
      partner: "Agaate Bio",
      result: "2.4x Root Density",
      status: "Verified",
    },
    {
      id: "AG-C03",
      crop: "Spinach (All Green)",
      partner: "Yara",
      result: "+1.1% Soil Carbon",
      status: "Audit",
    },
  ];

  const filteredTrials = trials.filter((t) => {
    const matchesSearch =
      t.crop.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(trialSearch.toLowerCase()) ||
      t.partner.toLowerCase().includes(trialSearch.toLowerCase());
    const matchesStatus = trialStatus === "All" || t.status === trialStatus;
    return matchesSearch && matchesStatus;
  });

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitBooked(true);
    setTimeout(() => setVisitBooked(false), 4000);
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            THE INTEGRATED AGRI PARK
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            India's first collaborative <span className="italic text-terracotta">field.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            A single living farm where research institutes, global hardware manufacturers, and
            regional grower clusters evaluate farm inputs live on real crops.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Interactive Zone Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Live Demonstration
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold tracking-tight">
                Agri Park Zones
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {zones.map((z, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveZone(z.name)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeZone === z.name
                      ? "bg-forest text-cream border border-forest"
                      : "bg-card border border-border text-forest/70 hover:border-forest"
                  }`}
                >
                  {z.name} Zone
                </button>
              ))}
            </div>

            {/* Zone Telemetry Block */}
            <div className="bg-bone rounded-[2rem] p-8 border border-border space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-terracotta font-bold block mb-2">
                  Active block: {currentZone.name}
                </span>
                <p className="text-sm md:text-base text-forest-deep font-semibold leading-relaxed">
                  {currentZone.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-border/50">
                <div>
                  <span className="text-forest/40 block text-[9px]">TRIAL VARIETY</span>
                  <span className="text-forest font-bold">{currentZone.crop}</span>
                </div>
                <div>
                  <span className="text-forest/40 block text-[9px]">PARTNER LAB</span>
                  <span className="text-forest font-bold">{currentZone.partner}</span>
                </div>
                <div>
                  <span className="text-forest/40 block text-[9px]">VERIFIED METRIC</span>
                  <span className="text-terracotta font-bold">{currentZone.stat}</span>
                </div>
                <div>
                  <span className="text-forest/40 block text-[9px]">TELEMETRY SYSTEM</span>
                  <span className="text-forest-deep font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    {currentZone.sensor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Map */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-[2.5rem] border border-border p-8 md:p-12 text-center flex flex-col justify-between min-h-[400px] shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-mono text-forest/40 uppercase block mb-4 text-left font-semibold">
                Interactive Field Layout Sweeps
              </span>
              <div className="relative border border-forest/10 rounded-2xl p-6 bg-bone/25 flex flex-col items-center justify-center min-h-[250px] overflow-hidden">
                <svg
                  className="w-full max-w-md h-56 text-forest"
                  viewBox="0 0 170 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid lines */}
                  <rect
                    x="15"
                    y="15"
                    width="140"
                    height="80"
                    rx="8"
                    stroke="var(--color-border)"
                    strokeWidth="1"
                  />

                  {/* Render interactive map node pins */}
                  {zones.map((z, idx) => {
                    const isSelected = activeZone === z.name;
                    return (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onClick={() => setActiveZone(z.name)}
                      >
                        <circle
                          cx={z.svgCoords.cx}
                          cy={z.svgCoords.cy}
                          r={isSelected ? 10 : 6}
                          fill={isSelected ? "var(--color-terracotta)" : "var(--color-forest)"}
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                        {isSelected && (
                          <circle
                            cx={z.svgCoords.cx}
                            cy={z.svgCoords.cy}
                            r={16}
                            stroke="var(--color-terracotta)"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                            className="animate-spin duration-[10s]"
                          />
                        )}
                        <text
                          x={z.svgCoords.cx - 15}
                          y={z.svgCoords.cy - 12}
                          fill="var(--color-forest-deep)"
                          fontSize="5.5"
                          fontFamily="var(--font-mono)"
                          fontWeight="bold"
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                          {z.name.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="text-center pt-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold bg-border/50 text-forest px-3.5 py-1.5 rounded-full border border-forest/10 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                  Click on pins to shift telemetry view
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Results Table with Filter Controls */}
        <div className="border-t border-border pt-24 text-left space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Scientific Verification
              </span>
              <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
                Trial Logs Registry
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl justify-end">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                <input
                  type="text"
                  value={trialSearch}
                  onChange={(e) => setTrialSearch(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:border-forest focus:outline-none font-semibold text-forest-deep"
                  placeholder="Search crop or lab..."
                />
              </div>

              <div className="flex gap-2">
                {["All", "Verified", "Audit"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTrialStatus(st)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      trialStatus === st
                        ? "bg-forest border-forest text-cream"
                        : "bg-card border-border text-forest/70 hover:border-forest"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-border rounded-[2rem] bg-card shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-bone/40 border-b border-border font-mono text-[10px] tracking-wider text-forest/50 uppercase">
                  <th className="px-6 py-4 font-bold">Trial ID</th>
                  <th className="px-6 py-4 font-bold">Crop & Variety</th>
                  <th className="px-6 py-4 font-bold">Partner Labs</th>
                  <th className="px-6 py-4 font-bold">Verified Result</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7ECE8] font-sans">
                {filteredTrials.map((t) => (
                  <tr key={t.id} className="hover:bg-bone/10 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-forest">{t.id}</td>
                    <td className="px-6 py-4 font-bold text-forest-deep">{t.crop}</td>
                    <td className="px-6 py-4 text-[#59635D]">{t.partner}</td>
                    <td className="px-6 py-4 font-mono font-bold text-terracotta">{t.result}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider uppercase bg-forest/5 text-forest px-2 py-0.5 rounded border border-forest/10">
                        <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredTrials.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-forest/40 font-mono text-xs bg-bone/10"
                    >
                      No matching trial entries discovered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visit Booking Form */}
        <div className="border-t border-border pt-24 text-left">
          <div className="bg-bone rounded-[2.5rem] border border-border p-8 md:p-12 max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Field Consult
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                Schedule an Agri Park tour
              </h3>
              <p className="text-forest/70 text-sm mt-2">
                Visit our demo beds in Gurugram District. Meet our agronomists, review trial results
                in the soil, and plan your input schedule.
              </p>
            </div>

            {visitBooked ? (
              <div className="p-6 text-center bg-card border border-forest/10 rounded-xl flex items-center justify-center gap-3 animate-in fade-in">
                <ShieldCheck className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span className="font-sans font-bold text-forest-deep text-sm">
                  Tour request registered! We will call to confirm.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleBookVisit}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end"
              >
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                    placeholder="Ramesh Yadav"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book Visit Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
