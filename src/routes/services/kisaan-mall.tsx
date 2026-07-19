import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Store,
  ShieldCheck,
  Package,
  ArrowRight,
  ShoppingBag,
  Search,
  Filter,
  Check,
  Info,
  Sparkles,
  Plus,
  Minus,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/services/kisaan-mall")({
  component: KisaanMall,
});

function KisaanMall() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [acres, setAcres] = useState(2);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ id: string; name: string; category: string; pricePerAc: number; qtyNeeded: number }[]>([]);
  const [ordered, setOrdered] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);

  const categories = ["All", "Seeds", "Nutrients", "Protection", "Irrigation"];

  // Catalog item index
  const catalogItems = [
    {
      id: "IN-S01",
      name: "Sakata Tomato Hybrid F1 Seeds",
      category: "Seeds",
      pricePerAc: 4500,
      crop: "Tomato",
      desc: "High germination vigor seeds, pre-treated with anti-fungal biological film.",
    },
    {
      id: "IN-N01",
      name: "Mycorrhiza Organic Granules Booster",
      category: "Nutrients",
      pricePerAc: 2800,
      crop: "All",
      desc: "Fosters early symbiotic root-fungus colonization to accelerate phosphorus absorption.",
    },
    {
      id: "IN-N02",
      name: "Slow-Release SSP (Super Phosphate)",
      category: "Nutrients",
      pricePerAc: 3100,
      crop: "Tomato",
      desc: "Granular phosphate stage-released over 60 days to prevent leaching waste.",
    },
    {
      id: "IN-P01",
      name: "Bio-Fungicide Trichoderma Viride",
      category: "Protection",
      pricePerAc: 2200,
      crop: "All",
      desc: "Wipes out root rot, damping-off spores, and early blight vectors in root zones.",
    },
    {
      id: "IN-I01",
      name: "Netafim Drip loop pressure emitters",
      category: "Irrigation",
      pricePerAc: 5500,
      crop: "All",
      desc: "Self-cleaning pressure compensating loops for direct-to-root hydration.",
    },
    {
      id: "IN-S02",
      name: "Sakata Chilli Tejaswini Seeds",
      category: "Seeds",
      pricePerAc: 3800,
      crop: "Chilli",
      desc: "High heat index hybrid plugs with built-in viral leaf curl tolerances.",
    },
    {
      id: "IN-N03",
      name: "High-Potassium Soluble Foliar Spray",
      category: "Nutrients",
      pricePerAc: 2400,
      crop: "Chilli",
      desc: "Foliar nutrient supplement boosting vegetable coloring, size uniformities.",
    },
    {
      id: "IN-P02",
      name: "Botanical Leaf Extract Repellent",
      category: "Protection",
      pricePerAc: 1800,
      crop: "All",
      desc: "Repels whiteflies, thrips, and sucking pests without toxic chemical residues.",
    },
  ];

  // Sync preset crop package to cart when crop changes
  const loadPresetPackage = () => {
    const preset = catalogItems.filter(
      (item) => item.crop === "All" || item.crop === selectedCrop
    );
    const cartItems = preset.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      pricePerAc: item.pricePerAc,
      qtyNeeded: acres,
    }));
    setCart(cartItems);
  };

  // Run initial sync
  if (cart.length === 0 && !ordered) {
    loadPresetPackage();
  }

  // Handle quantity changes
  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qtyNeeded: newQty } : item))
    );
  };

  // Add item to cart from catalog browser
  const addItemToCart = (item: typeof catalogItems[0]) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) => (x.id === item.id ? { ...x, qtyNeeded: x.qtyNeeded + 1 } : x));
      }
      return [...prev, { id: item.id, name: item.name, category: item.category, pricePerAc: item.pricePerAc, qtyNeeded: acres }];
    });
  };

  const syncCartToAcres = (newAcres: number) => {
    setAcres(newAcres);
    setCart((prev) => prev.map((item) => ({ ...item, qtyNeeded: newAcres })));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.pricePerAc * item.qtyNeeded, 0);

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      setCart([]);
    }, 4000);
  };

  // QR Code Trace simulator
  const handleVerifyCode = (code: string) => {
    setVerifyingCode(code);
    setVerifiedData(null);
    setTimeout(() => {
      setVerifyingCode(null);
      setVerifiedData({
        batch: code,
        producer: "Bayer CropScience Technical Plant",
        verifiedAt: "July 12, 2026",
        composition: "Trichoderma viride active spore loop 2.5% w/w",
        distribution: "Agaate Jhajjar Central Input Warehouse",
        purity: "99.8% Certified Authentic",
      });
    }, 1500);
  };

  const filteredCatalog = catalogItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 02
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Kisaan <span className="italic text-terracotta">Mall.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            A comprehensive agricultural input store containing verified fertilizers,
            seeds, biological boosters, and drip line accessories.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Detail text & Shopping Bag sync */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
              100% Genuine inputs. Prescribed correctly.
            </h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">
              Input duplicate counterfeiting and incorrect dosing calculations waste farmer
              resources and damage soil structures. At Agaate Kisaan Malls, every seed package, chemical
              protection pouch, or organic conditioner is tracked directly from factory source to
              your billing receipt, verifying dosage safety.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E7ECE8]">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">Verified Source</h4>
                  <p className="text-xs text-forest/65 mt-1 leading-relaxed">
                    Direct partner logistics loops with Bayer, Yara, Sakata, and Netafim.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Calibrated Delivery
                  </h4>
                  <p className="text-xs text-forest/65 mt-1 leading-relaxed">
                    Input packages staged to your crop schedule, delivered straight to your field.
                  </p>
                </div>
              </div>
            </div>

            {/* QR Tracing Simulator */}
            <div className="bg-[#eef3f0]/50 rounded-[2rem] border border-forest/10 p-8 space-y-6 text-left">
              <div>
                <span className="font-jet text-[9px] tracking-widest text-forest font-bold uppercase block mb-1">Authenticity audit</span>
                <h3 className="font-serif text-2xl text-forest-deep font-bold">Input Batch Verification Hub</h3>
                <p className="text-xs text-forest/70 mt-1 leading-relaxed">
                  Enter a batch verification serial code to simulate tracking the packet's origin logistics journey.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. TR-9482-B"
                  className="bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-xs font-mono font-bold text-forest-deep focus:outline-none focus:border-forest flex-grow"
                  id="trace-input"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById("trace-input") as HTMLInputElement;
                    if (el && el.value) handleVerifyCode(el.value);
                  }}
                  className="bg-forest-deep hover:bg-forest text-cream font-bold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Verify Code
                </button>
              </div>

              {verifyingCode && (
                <div className="p-4 bg-white border border-[#E7ECE8] rounded-xl flex items-center justify-center gap-3 text-xs text-forest/70 font-mono">
                  <RefreshCw className="w-4 h-4 text-forest animate-spin" />
                  <span>Verifying batch {verifyingCode} signatures...</span>
                </div>
              )}

              {verifiedData && (
                <div className="p-5 bg-white border border-forest/20 rounded-xl space-y-3 text-xs font-mono animate-in fade-in">
                  <div className="flex justify-between text-[10px] text-emerald-600 font-bold border-b border-[#E7ECE8] pb-2">
                    <span>STATUS: {verifiedData.purity}</span>
                    <span>TIMESTAMP: {verifiedData.verifiedAt}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-forest/70">
                    <div>
                      <span className="text-forest/40 block text-[9px]">ORIGIN PLANT</span>
                      <span className="font-bold text-forest-deep">{verifiedData.producer}</span>
                    </div>
                    <div>
                      <span className="text-forest/40 block text-[9px]">CHEMICAL FORMULATION</span>
                      <span className="font-bold text-forest-deep">{verifiedData.composition}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-[#E7ECE8]/50">
                      <span className="text-forest/40 block text-[9px]">DISTRIBUTION STORAGE PATH</span>
                      <span className="font-bold text-forest-deep">{verifiedData.distribution}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Calculator/Shopping Bag */}
          <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 text-left space-y-8 shadow-sm">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Acreage Synced Basket
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">Input Package Planner</h3>
            </div>

            {ordered ? (
              <div className="p-8 text-center bg-white border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[380px] animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                  Inputs Reserved
                </h4>
                <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                  Your custom input package order has been successfully queued. An agronomist will review your crop-block details and call to dispatch trays.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePreorder} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Select Target Crop Package
                  </label>
                  <div className="flex gap-2">
                    {["Tomato", "Chilli", "Capsicum"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setSelectedCrop(c);
                          loadPresetPackage();
                        }}
                        className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedCrop === c
                            ? "bg-forest text-cream border border-forest"
                            : "bg-white border border-[#E7ECE8] text-forest/70 hover:border-forest"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                    Set Crop Acreage ({acres} Acres)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={acres}
                    onChange={(e) => syncCartToAcres(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                </div>

                {/* Shopping list inside form */}
                <div className="space-y-3 bg-white p-5 border border-[#E7ECE8] rounded-2xl max-h-[220px] overflow-y-auto">
                  <span className="text-[10px] font-mono text-forest/40 uppercase block border-b border-[#E7ECE8]/50 pb-2">Shopping Bag List ({cart.length} items)</span>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-mono py-1">
                      <div className="max-w-[70%] text-left">
                        <span className="font-bold text-forest-deep block truncate">{item.name}</span>
                        <span className="text-[9px] text-forest/40">₹{item.pricePerAc.toLocaleString()}/ac</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qtyNeeded - 1)}
                          className="w-5 h-5 rounded bg-bone flex items-center justify-center hover:bg-forest/15 transition-all text-forest-deep"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-forest-deep">{item.qtyNeeded}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qtyNeeded + 1)}
                          className="w-5 h-5 rounded bg-bone flex items-center justify-center hover:bg-forest/15 transition-all text-forest-deep"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <span className="text-xs text-forest/35 block py-4 text-center">Cart is empty. Select products below.</span>
                  )}
                </div>

                <div className="p-4 bg-white border border-[#E7ECE8] rounded-2xl flex justify-between items-center text-xs font-mono shadow-sm">
                  <span className="text-forest/40">EST. TOTAL SYSTEM COST</span>
                  <span className="text-terracotta font-bold text-lg">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`w-full rounded-xl font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    cart.length > 0
                      ? "bg-forest-deep hover:bg-forest text-cream"
                      : "bg-forest/35 text-cream/70 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reserve Input Package</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Input Catalog Browser */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                KISAAN MALL CATALOG
              </span>
              <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
                Browse Certified Products
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-forest text-cream border border-forest"
                      : "bg-white border border-[#E7ECE8] text-forest/70 hover:border-forest"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCatalog.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E7ECE8] rounded-2xl p-6 flex flex-col justify-between min-h-[260px] hover:shadow-md transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono font-bold bg-[#eef3f0] text-forest border border-forest/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-forest/40 uppercase">
                      ID: {item.id}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep mb-2">{item.name}</h4>
                  <p className="text-forest/65 text-xs leading-relaxed mb-4">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-[#E7ECE8]/50 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-forest/40 font-mono block">PRICE / ACRE</span>
                    <span className="font-mono text-sm font-bold text-terracotta">₹{item.pricePerAc.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    onClick={() => addItemToCart(item)}
                    className="p-2 bg-forest/5 hover:bg-forest hover:text-cream rounded-lg text-forest transition-all duration-300 cursor-pointer border border-forest/5"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
