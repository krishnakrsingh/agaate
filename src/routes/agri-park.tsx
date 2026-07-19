import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Sprout, Activity, Calendar, ShieldCheck, ArrowRight, Eye, Check } from "lucide-react";

export const Route = createFileRoute("/agri-park")({
  component: AgriPark,
});

function AgriPark() {
  const [activeZone, setActiveZone] = useState("Seed");
  const [visitBooked, setVisitBooked] = useState(false);

  const zones = [
    {
      name: "Seed",
      desc: "Live comparative test beds demonstrating germination percentages, early vigor, and pest resistance across 12 crop varieties.",
      crop: "Hybrid Tomatoes & Peppers",
      stat: "99.2% Germination vigor",
      sensor: "EC & Temperature Online",
      partner: "Sakata Seeds & Seminis",
    },
    {
      name: "Nursery",
      desc: "Smart polyhouse chamber verifying root-growth density using organic bio-inoculants in sterile cocopeat plugs.",
      crop: "Bio-Boosted Chillies",
      stat: "2.4x Lateral root density",
      sensor: "Humidity Dome Connected",
      partner: "Agaate BioLabs",
    },
    {
      name: "Irrigation",
      desc: "Pressure-compensating drip layout showing real-time flow monitoring, sand filtration, and automated venturi fertigation loops.",
      crop: "Cucumbers & Melons",
      stat: "-40% Water consumption",
      sensor: "Flowmeter telemetric active",
      partner: "Netafim Israel",
    },
    {
      name: "Nutrition",
      desc: "Trial plots demonstrating organic carbon accumulation under staged macronutrient dosing and custom mineral supplements.",
      crop: "Leafy Greens (Spinach/Lettuce)",
      stat: "+1.2% Soil Organic Carbon",
      sensor: "N-P-K optical spectrometer",
      partner: "Yara Fertilizers",
    },
    {
      name: "Crop Protection",
      desc: "Residue-free protection demo beds using botanical repellents and targeted bio-fungicides under dynamic weather advisories.",
      crop: "Cabbage & Broccoli",
      stat: "Zero chemical residues detected",
      sensor: "Spore trap telemetry live",
      partner: "Bayer CropScience Bio",
    },
    {
      name: "Technology",
      desc: "Command hub showing IoT solar node arrays, precision agricultural drone tracks, and micro-climate weather metrics.",
      crop: "Multi-Crop Field A",
      stat: "4G LoRa Mesh coverage active",
      sensor: "Drone multispectral scan complete",
      partner: "AWS & DJI Agriculture",
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

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitBooked(true);
    setTimeout(() => setVisitBooked(false), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            THE INTEGRATED AGRI PARK
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            India's first collaborative <span className="italic text-terracotta">field.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            A single living farm where research institutes, global hardware manufacturers, and
            regional grower clusters evaluate farm inputs live on real crops.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Interactive Zone Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 text-left">
            <div className="mb-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Live Demonstration
              </span>
              <h2 className="font-serif text-3xl text-forest-deep font-bold tracking-tight">
                Agri Park Zones
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {zones.map((z, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveZone(z.name)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeZone === z.name
                      ? "bg-forest text-cream border border-forest"
                      : "bg-bone/50 border border-[#E7ECE8] text-forest/70 hover:border-forest"
                  }`}
                >
                  {z.name} Zone
                </button>
              ))}
            </div>

            {/* Zone Telemetry Block */}
            <div className="bg-bone rounded-[2rem] p-8 border border-[#E7ECE8] space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-terracotta font-bold block mb-2">
                  Active block: {currentZone.name}
                </span>
                <p className="text-sm md:text-base text-forest-deep font-semibold leading-relaxed">
                  {currentZone.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-[#E7ECE8]">
                <div>
                  <span className="text-forest/40 block">TRIAL VARIETY</span>
                  <span className="text-forest font-bold">{currentZone.crop}</span>
                </div>
                <div>
                  <span className="text-forest/40 block">PARTNER LAB</span>
                  <span className="text-forest font-bold">{currentZone.partner}</span>
                </div>
                <div>
                  <span className="text-forest/40 block">VERIFIED METRIC</span>
                  <span className="text-terracotta font-bold">{currentZone.stat}</span>
                </div>
                <div>
                  <span className="text-forest/40 block">TELEMETRY SYSTEM</span>
                  <span className="text-forest-deep font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    {currentZone.sensor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Visual Zone Display Board */}
            <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 md:p-12 text-center flex flex-col justify-center min-h-[350px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(var(--forest)_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.03]" />
              <div className="relative z-10 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-forest/5 flex items-center justify-center text-forest mx-auto mb-6">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-forest-deep font-bold mb-4">
                  {currentZone.name} Demonstration Bed
                </h3>
                <p className="text-[#59635D] text-sm leading-relaxed mb-6">
                  This test bed evaluates crop health under controlled irrigation and fertilizer
                  dosing, cross-referenced with satellite indices.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-white text-forest px-4 py-2 rounded-full border border-forest/10 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Audit data logged to central registry
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trial Results Table */}
        <div className="border-t border-[#E7ECE8] pt-20">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Scientific Verification
            </span>
            <h2 className="font-serif text-3xl text-forest-deep font-bold tracking-tight">
              Recent trial logs
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#E7ECE8] rounded-[1.5rem] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-bone/40 border-b border-[#E7ECE8] font-mono text-[10px] tracking-wider text-forest/50 uppercase">
                  <th className="px-6 py-4 font-bold">Trial ID</th>
                  <th className="px-6 py-4 font-bold">Crop & Variety</th>
                  <th className="px-6 py-4 font-bold">Partner Labs</th>
                  <th className="px-6 py-4 font-bold">Verified Result</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7ECE8] font-sans">
                {trials.map((t) => (
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Visit Booking Form */}
        <div className="border-t border-[#E7ECE8] pt-20">
          <div className="bg-bone/30 rounded-[2rem] border border-[#E7ECE8] p-8 md:p-12 text-left max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Field Consult
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                Schedule an Agri Park tour
              </h3>
              <p className="text-[#59635D] text-sm mt-2">
                Visit our demo beds in Gurugram District. Meet our agronomists, review trial results
                in the soil, and plan your input schedule.
              </p>
            </div>

            {visitBooked ? (
              <div className="p-6 text-center bg-forest/5 border border-forest/10 rounded-xl flex items-center justify-center gap-3 animate-in fade-in">
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
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
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
                    className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
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
