import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, BookOpen, Clock, Calendar, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/knowledge/")({
  component: Knowledge,
});

function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Seed Planning", "Crop Protection", "Nutrition", "Carbon Farming"];

  const articles = [
    {
      title: "Tomato Drip Irrigation Scheduling Chart",
      cat: "Seed Planning",
      time: "5 min read",
      date: "July 12, 2026",
      desc: "An hour-by-hour drip calibration spreadsheet mapped to regional weather forecasts and transplant stage growth levels.",
    },
    {
      title: "Identifying Downy Mildew Early Symptoms",
      cat: "Crop Protection",
      time: "8 min read",
      date: "June 28, 2026",
      desc: "Spot early leaf lesions using AI diagnostics. Learn organic bio-fungicide protection schedules before crop damage spreads.",
    },
    {
      title: "Optimal N-P-K Soil Ratios for Capsicum",
      cat: "Nutrition",
      time: "6 min read",
      date: "June 15, 2026",
      desc: "Dosing calculator for greenhouse bell peppers based on chemical soil assays and organic matter saturation indexes.",
    },
    {
      title: "Satellite Audit Guide for Soil Carbon Credits",
      cat: "Carbon Farming",
      time: "12 min read",
      date: "May 20, 2026",
      desc: "Learn how radar satellites check zero-tillage residue coverage to verify your seasonal carbon credit bank payouts.",
    },
    {
      title: "Basal Fertilizer Application Guidelines",
      cat: "Nutrition",
      time: "4 min read",
      date: "May 08, 2026",
      desc: "Step-by-step methods for slow-release phosphate integration in block planting layouts before transplanting.",
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "All" || art.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            KNOWLEDGE HUB
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Scientific field <span className="italic text-terracotta">intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Guides, spreadsheet calculators, and field trial logs written by our senior agronomists
            to help you optimize input costs and yields.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow">
        {/* Search & Category filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#E7ECE8]">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bone/35 border border-[#E7ECE8] rounded-xl pl-11 pr-4 py-3.5 text-sm focus:border-forest focus:outline-none"
              placeholder="Search guides (e.g. Tomato, Drip...)"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-forest text-cream border border-forest"
                    : "bg-bone/50 border border-[#E7ECE8] text-forest/70 hover:border-forest"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] border border-[#E7ECE8] bg-white hover:shadow-lg hover:border-forest/20 transition-all duration-300 flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded">
                    {art.cat}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-forest/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {art.date}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-forest-deep font-bold mb-3">{art.title}</h3>
                <p className="text-[#59635D] text-sm leading-relaxed mb-6">{art.desc}</p>
              </div>

              <div className="font-semibold text-xs md:text-sm text-forest group-hover:text-forest-deep flex items-center gap-1.5 transition-colors pt-4 border-t border-[#E7ECE8]/50 cursor-pointer">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="col-span-2 p-12 text-center text-forest/40 font-mono text-sm bg-bone/35 rounded-2xl">
              No matching articles found. Try another search keyword!
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
