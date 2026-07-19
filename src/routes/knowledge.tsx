import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Article } from "@/types";
import { articles, knowledgeCategories as categories } from "@/data/knowledge-data";
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  Calculator,
  Printer,
  X,
} from "lucide-react";

export const Route = createFileRoute("/knowledge")({
  component: Knowledge,
});

function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // NPK Calculator state
  const [calcCrop, setCalcCrop] = useState("Tomato");
  const [calcStage, setCalcStage] = useState("Vegetative");
  const [calcAcres, setCalcAcres] = useState(2);
  const [showDosage, setShowDosage] = useState(false);

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "All" || art.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  const getDosingData = () => {
    const isTomato = calcCrop === "Tomato";
    const factor = calcAcres;
    if (calcStage === "Vegetative") {
      return {
        nitrogen: isTomato ? 45 * factor : 35 * factor,
        phosphate: isTomato ? 20 * factor : 15 * factor,
        potassium: isTomato ? 30 * factor : 25 * factor,
        urea: isTomato ? 98 * factor : 76 * factor,
        ssp: isTomato ? 125 * factor : 94 * factor,
        mop: isTomato ? 50 * factor : 42 * factor,
      };
    } else if (calcStage === "Flowering") {
      return {
        nitrogen: isTomato ? 20 * factor : 15 * factor,
        phosphate: isTomato ? 40 * factor : 30 * factor,
        potassium: isTomato ? 40 * factor : 35 * factor,
        urea: isTomato ? 43 * factor : 32 * factor,
        ssp: isTomato ? 250 * factor : 188 * factor,
        mop: isTomato ? 66 * factor : 58 * factor,
      };
    } else {
      return {
        nitrogen: isTomato ? 15 * factor : 10 * factor,
        phosphate: isTomato ? 15 * factor : 10 * factor,
        potassium: isTomato ? 60 * factor : 50 * factor,
        urea: isTomato ? 32 * factor : 21 * factor,
        ssp: isTomato ? 94 * factor : 62 * factor,
        mop: isTomato ? 100 * factor : 83 * factor,
      };
    }
  };

  const dosage = getDosingData();

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            KNOWLEDGE HUB
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Scientific field <span className="italic text-terracotta">intelligence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Guides, spreadsheet calculators, and field trial logs written by our senior agronomists
            to help you optimize input costs and yields.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* N-P-K Dosing Worksheet */}
        <div className="bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 md:p-12 text-left space-y-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Agronomic Tool
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                N-P-K Fertilizer Dosing Worksheet
              </h3>
              <p className="text-xs text-forest/70 max-w-2xl leading-relaxed font-sans">
                Set crop, target growth stage, and farming acreage to calculate exact bags of Urea, Single Super Phosphate, and Muriate of Potash required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Crop Type</label>
              <select
                value={calcCrop}
                onChange={(e) => {
                  setCalcCrop(e.target.value);
                  setShowDosage(true);
                }}
                className="w-full bg-white border border-[#E7ECE8] rounded-xl px-3 py-3.5 text-xs focus:border-forest focus:outline-none font-bold text-forest-deep"
              >
                <option>Tomato</option>
                <option>Chilli</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Growth Stage</label>
              <select
                value={calcStage}
                onChange={(e) => {
                  setCalcStage(e.target.value);
                  setShowDosage(true);
                }}
                className="w-full bg-white border border-[#E7ECE8] rounded-xl px-3 py-3.5 text-xs focus:border-forest focus:outline-none font-bold text-forest-deep"
              >
                <option>Vegetative</option>
                <option>Flowering</option>
                <option>Fruiting</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Total Farming Acres ({calcAcres} acres)</label>
              <input
                type="range"
                min={1}
                max={20}
                value={calcAcres}
                onChange={(e) => {
                  setCalcAcres(parseInt(e.target.value) || 1);
                  setShowDosage(true);
                }}
                className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
              />
            </div>
          </div>

          {showDosage && (
            <div className="space-y-6 pt-4 border-t border-[#E7ECE8]/50 animate-in slide-in-from-top duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-[#E7ECE8] rounded-2xl text-xs font-mono shadow-sm text-left">
                  <span className="text-[9px] text-forest/40 block border-b border-[#E7ECE8]/50 pb-2 uppercase font-bold tracking-wider mb-3">Target Nutrients Ratios</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-forest-deep">
                    <div>
                      <span className="text-forest/40 block text-[9px]">NITROGEN (N)</span>
                      <span className="font-bold text-sm">{dosage.nitrogen} kg</span>
                    </div>
                    <div>
                      <span className="text-forest/40 block text-[9px]">PHOSPHATE (P)</span>
                      <span className="font-bold text-sm">{dosage.phosphate} kg</span>
                    </div>
                    <div>
                      <span className="text-forest/40 block text-[9px]">POTASSIUM (K)</span>
                      <span className="font-bold text-sm">{dosage.potassium} kg</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#E7ECE8] rounded-2xl text-xs font-mono shadow-sm text-left">
                  <span className="text-[9px] text-forest/40 block border-b border-[#E7ECE8]/50 pb-2 uppercase font-bold tracking-wider mb-2">Required Input bag quantities</span>
                  <div className="space-y-1.5 text-xs text-forest-deep/80 leading-relaxed font-sans">
                    <p>• Urea Bag: <strong>{dosage.urea} kg</strong></p>
                    <p>• Single Super Phosphate (SSP): <strong>{dosage.ssp} kg</strong></p>
                    <p>• Muriate of Potash (MOP): <strong>{dosage.mop} kg</strong></p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-forest-deep hover:bg-forest text-cream font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Recommendation Sheet</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Category filter */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#E7ECE8]">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E7ECE8] rounded-xl pl-11 pr-4 py-3.5 text-xs focus:border-forest focus:outline-none font-semibold text-forest-deep"
                placeholder="Search guides (e.g. Tomato, Drip...)"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                    selectedCat === cat
                      ? "bg-forest border-forest text-cream"
                      : "bg-white border-[#E7ECE8] text-forest/70 hover:border-forest"
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
                onClick={() => setSelectedArticle(art)}
                className="p-8 rounded-[2rem] border border-[#E7ECE8] bg-white hover:shadow-lg hover:border-forest/20 transition-all duration-300 flex flex-col justify-between min-h-[250px] text-left cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded">
                      {art.cat}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-forest/40">
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Clock className="w-3.5 h-3.5" />
                        {art.time}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Calendar className="w-3.5 h-3.5" />
                        {art.date}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep font-bold mb-3 hover:text-forest transition-colors">{art.title}</h3>
                  <p className="text-[#59635D] text-xs md:text-sm leading-relaxed mb-6">{art.desc}</p>
                </div>

                <div className="font-semibold text-xs md:text-sm text-forest group-hover:text-forest-deep flex items-center gap-1.5 transition-colors pt-4 border-t border-[#E7ECE8]/50">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-2 p-12 text-center text-forest/40 font-mono text-sm bg-bone/35 rounded-2xl border border-[#E7ECE8]">
                No matching articles found. Try another search keyword!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reading Article Overlay Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-forest-deep/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-cream p-8 md:p-12 shadow-2xl rounded-[3rem] overflow-y-auto border border-[#E7ECE8] relative max-h-[90vh] animate-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-6 top-6 w-8 h-8 rounded-full bg-white border border-[#E7ECE8] flex items-center justify-center text-forest/65 hover:text-forest cursor-pointer shadow-sm animate-in fade-in"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                  AGRONOMY FIELD GUIDE
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-forest-deep font-bold leading-tight">
                  {selectedArticle.title}
                </h3>
                <span className="font-mono text-[10px] text-forest/50 block mt-1">
                  {selectedArticle.time} · Date: {selectedArticle.date}
                </span>
              </div>

              <div className="text-sm text-forest-deep/80 leading-relaxed font-sans border-t border-[#E7ECE8]/50 pt-6 whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-xs py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6 animate-in slide-in-from-bottom"
              >
                <span>Return to Knowledge Hub</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
