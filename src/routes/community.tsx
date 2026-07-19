import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Users, Calendar, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/community")({
  component: Community,
});

function Community() {
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const stories = [
    {
      name: "Ramesh Yadav",
      region: "Haryana Cluster",
      metric: "+150% Yield Growth",
      desc: "Ramesh switched from direct seed sowing to bio-boosted containerized chillies, resulting in a three-fold harvest increase with zero root mortality.",
      tag: "Crop Science",
    },
    {
      name: "Preeti Dahiya",
      region: "Jhajjar District",
      metric: "₹18,200 Carbon Earnings",
      desc: "By adopting zero-tillage and residue preservation methods, Preeti qualified for direct satellite carbon verification payouts.",
      tag: "Carbon Program",
    },
    {
      name: "Gurmukh Singh",
      region: "Panipat Region",
      metric: "-35% Input Expense",
      desc: "Using drone diagnostic flight maps and smart Kisaan Mall basal input packages, Gurmukh targeted fertilizer application to need pools.",
      tag: "IoT & Tech",
    },
  ];

  const events = [
    {
      title: "Bio-Inoculant Field Trial Demo",
      date: "Aug 12, 2026",
      time: "10:00 AM - 1:00 PM",
      loc: "Agaate Agri Park, Block B",
      desc: "Live comparative inspection of lateral root density on tomato trial varieties.",
    },
    {
      title: "Satellite Carbon Audit Workshop",
      date: "Aug 18, 2026",
      time: "11:00 AM - 3:00 PM",
      loc: "Bhora Kalan Community Hall",
      desc: "Step-by-step registration tutorial and practice ledger calculator training.",
    },
    {
      title: "Pre-Harvest Buyback Planning",
      date: "Sep 02, 2026",
      time: "2:00 PM - 5:00 PM",
      loc: "Agaate Kisan Mall, Jhajjar",
      desc: "Briefing on size grading requirements and price guarantee index lockups.",
    },
  ];

  const handleRegister = (title: string) => {
    setRegisteredEvent(title);
    setTimeout(() => setRegisteredEvent(null), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            COMMUNITY & TRUST
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            The Agaate <span className="italic text-terracotta">Parivaar.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            We are more than an agrotech provider. We are a network of 2,000+ growers, agronomy
            researchers, and logistics experts collaborating to secure regional agricultural
            commerce.
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow">
        <div className="mb-12">
          <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
            Grower Stories
          </span>
          <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
            Success in the soil
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stories.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] bg-bone/35 border border-[#E7ECE8] flex flex-col justify-between min-h-[300px] hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-forest bg-forest/5 px-2.5 py-1 rounded border border-forest/10">
                    {s.tag}
                  </span>
                  <Heart className="w-4 h-4 text-terracotta/40" />
                </div>
                <h3 className="font-serif text-2xl text-forest-deep font-bold mb-1">{s.name}</h3>
                <span className="text-xs text-forest font-semibold block mb-4">{s.region}</span>
                <p className="text-[#59635D] text-sm leading-relaxed mb-6">"{s.desc}"</p>
              </div>
              <div className="text-lg font-serif font-bold text-terracotta border-t border-[#E7ECE8] pt-4 mt-2">
                {s.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Events list */}
        <div className="border-t border-[#E7ECE8] pt-20">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Field Schedules
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Upcoming field events
            </h2>
          </div>

          <div className="space-y-6">
            {events.map((e, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[2rem] border border-[#E7ECE8] bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-all"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] font-bold text-forest bg-forest/5 px-2.5 py-0.5 rounded border border-forest/10 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {e.date}
                    </span>
                    <span className="text-xs text-forest/50 font-semibold">{e.time}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep font-bold mb-2">{e.title}</h3>
                  <p className="text-[#59635D] text-sm leading-relaxed mb-2">{e.desc}</p>
                  <span className="text-xs text-forest/60 font-semibold block">📍 {e.loc}</span>
                </div>

                <button
                  onClick={() => handleRegister(e.title)}
                  className="rounded-full bg-forest-deep hover:bg-forest text-cream font-semibold text-xs md:text-sm px-6 py-3.5 transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center flex-shrink-0"
                >
                  {registeredEvent === e.title ? (
                    <>
                      <span>Registered</span>
                      <ShieldCheck className="w-4 h-4 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span>Register for Event</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
