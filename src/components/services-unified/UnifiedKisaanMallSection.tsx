import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  MagnifyingGlass,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkle,
  Storefront,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { CountUp, MagneticButton, TiltCard } from "@/components/common/motion";
import { catalogItems, kisaanMallCategories, type ExtendedCatalogItem } from "@/data/services-data";
import type { CartItem } from "@/types";

export function UnifiedKisaanMallSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("Watermelon");
  const [acres, setAcres] = useState(5);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = catalogItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: ExtendedCatalogItem) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) => (x.id === item.id ? { ...x, qtyNeeded: x.qtyNeeded + 1 } : x));
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          pricePerAc: item.pricePerAc,
          qtyNeeded: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((x) => x.id !== id));
      return;
    }
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qtyNeeded: newQty } : x)));
  };

  const totalCartAmount = cart.reduce((acc, item) => acc + item.pricePerAc * item.qtyNeeded, 0);

  const handleWhatsAppOrder = () => {
    const orderLines = cart.map(
      (c) => `• ${c.name} (Qty: ${c.qtyNeeded}) - ₹${c.pricePerAc * c.qtyNeeded}`,
    );
    const message = encodeURIComponent(
      `Hello Agaate Team! I want to order inputs from Kisaan Mall:\n\n${orderLines.join("\n")}\n\nTotal Estimated: ₹${totalCartAmount.toLocaleString("en-IN")}\nCrop / Acreage: ${acres} Acres (${selectedCrop})\n\nPlease confirm availability and delivery schedule.`,
    );
    window.open(`https://wa.me/918350085005?text=${message}`, "_blank");
  };

  return (
    <section
      id="kisaan-mall"
      className="relative scroll-mt-24 overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 lg:py-28 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-16">
        {/* ── 2-Column Hero Spotlight ── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Visual Column (Left) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <TiltCard maxTilt={6} glare={false} className="w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full overflow-hidden rounded-3xl bg-white p-6 sm:p-8 flex items-center justify-center border border-[#143d31]/10 shadow-lg"
              >
                <img
                  src="/kisaan-mall-gen.png"
                  alt="Agaate Kisaan Mall"
                  className="w-full max-h-[420px] object-contain transition-transform duration-500 drop-shadow-2xl"
                />

                <div className="absolute top-4 left-4 rounded-full bg-[#143d31] px-3.5 py-1 font-mono text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-pulse" />
                  <span>500+ SKUs · 25+ Direct Partners</span>
                </div>
              </motion.div>
            </TiltCard>
          </div>

          {/* Text Column (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-xl lg:pl-4 space-y-4">
            {/* Division Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-base sm:text-lg font-extrabold text-[#5d7d37]">
                02
              </span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#143d31]">
                Agaate Kisaan Mall
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#143d31] leading-[1.12]">
              Direct-from-brand inputs.{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                Zero counterfeit guarantee.
              </span>
            </h2>

            {/* Subtext Description */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#4f624f]">
              Verified seeds, biological protection (Biocure F, Pseudomonas), micro-nutrients, and
              pressure-compensating drip hardware delivered straight to your field at transparent
              manufacturer rates.
            </p>

            {/* Metrics Strip */}
            <div className="my-6 border-y border-[#143d31]/12 py-4 grid grid-cols-3 gap-2">
              <div className="text-left first:border-l-0 first:pl-0">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={500} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Verified SKUs
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={25} suffix="+" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Brand Partners
                </p>
              </div>
              <div className="text-left border-l border-[#5d7d37]/30 pl-3">
                <p className="font-display text-2xl font-extrabold text-[#143d31]">
                  <CountUp to={48} prefix="24-" suffix="h" />
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mt-0.5">
                  Farm Gate Delivery
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "100% manufacturer invoice guarantee",
                "Soil EC/pH prescribed application doses",
                "Organic bio-fungicides & antifeedants",
                "Bulk discounts for Farmer Producer Orgs",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#143d31]"
                >
                  <CheckCircle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Interactive Mall Storefront & Dosage Tool ── */}
        <div className="rounded-[2.5rem] border border-[#143d31]/10 bg-white p-6 sm:p-10 shadow-sm space-y-10">
          {/* Sowing Dosage Estimator */}
          <div className="rounded-3xl border border-[#143d31]/15 bg-[#f4f8f5] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="space-y-3 lg:col-span-6">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                  CROP DOSAGE ESTIMATOR
                </span>
                <h3 className="font-display text-2xl font-bold text-[#143d31]">
                  Calculate Bio-Inputs for Your Acreage
                </h3>
                <p className="text-xs leading-relaxed text-[#4f624f]">
                  Select your crop and plot size to compute biological protection, seaweed root
                  booster, and organic pest shield requirements.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="mb-1 block font-mono text-[10px] font-bold text-[#143d31]">
                      Target Crop:
                    </label>
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full rounded-xl border border-[#143d31]/20 bg-white p-3 font-display text-xs font-bold text-[#143d31] focus:border-[#143d31] focus:outline-none"
                    >
                      <option>Watermelon</option>
                      <option>Chilli</option>
                      <option>Tomato</option>
                      <option>Cauliflower</option>
                      <option>Cucumber</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[10px] font-bold text-[#143d31]">
                      Plot Size ({acres} Acres):
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={acres}
                      onChange={(e) => setAcres(Number(e.target.value))}
                      className="mt-3 w-full accent-[#143d31]"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#143d31]/15 bg-white p-6 shadow-sm lg:col-span-6">
                <div className="flex items-center justify-between border-b border-[#143d31]/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#143d31]">
                    {selectedCrop} Bio-Shield Bundle ({acres} Ac)
                  </span>
                  <span className="rounded-full bg-[#5d7d37]/15 px-3 py-1 font-mono text-[10px] font-bold text-[#5d7d37]">
                    Residue-Free
                  </span>
                </div>

                <div className="my-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#4f624f]">
                    <span>Biocure F Bio-Fungicide (2.5kg/ac)</span>
                    <span className="font-mono font-bold text-[#143d31]">
                      ₹{(2200 * acres).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#4f624f]">
                    <span>Seaweed Root Booster (500ml/ac)</span>
                    <span className="font-mono font-bold text-[#143d31]">
                      ₹{(1950 * acres).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#4f624f]">
                    <span>Bio Nimaton Pest Shield (1.5L/ac)</span>
                    <span className="font-mono font-bold text-[#143d31]">
                      ₹{(1800 * acres).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#143d31]/10 pt-2 text-sm font-bold text-[#143d31]">
                    <span>Total Estimated Package:</span>
                    <span className="font-mono text-[#5d7d37]">
                      ₹{(5950 * acres).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const bundle = catalogItems.slice(0, 3);
                    bundle.forEach((b) => addToCart(b));
                  }}
                  className="w-full cursor-pointer rounded-xl bg-[#143d31] py-3 text-xs font-bold text-white transition-colors hover:bg-[#5d7d37]"
                >
                  Add {selectedCrop} Bundle to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Shelves Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#143d31]/10 pb-5">
            <div className="flex flex-wrap gap-2">
              {kisaanMallCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer rounded-full px-4 py-2 font-mono text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-[#143d31] text-white shadow-sm"
                      : "border border-[#143d31]/15 bg-[#f4f8f5] text-[#4f624f] hover:border-[#143d31]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#143d31]/40" />
              <input
                type="text"
                placeholder="Search SKUs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#143d31]/20 bg-[#f4f8f5] py-2 pl-9 pr-4 text-xs text-[#143d31] focus:border-[#143d31] focus:outline-none"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <TiltCard key={item.id} maxTilt={6} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-[#143d31]/10 bg-[#f4f8f5] p-6 shadow-xs transition-all hover:border-[#143d31]/30 hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase text-[#5d7d37] shadow-xs">
                        {item.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#143d31]/50">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-lg font-bold text-[#143d31]">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#4f624f]">{item.desc}</p>

                    <div className="mt-4 rounded-xl border border-[#143d31]/10 bg-white p-3 font-mono text-[10px] space-y-1">
                      <p className="text-[#4f624f]">
                        <strong className="text-[#143d31]">Dosage:</strong> {item.dosage}
                      </p>
                      <p className="text-[#5d7d37]">
                        <strong>Impact:</strong> {item.chemicalReduction}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#143d31]/10 pt-4">
                    <div>
                      <span className="block font-mono text-[9px] text-[#4f624f]">Brand Rate</span>
                      <span className="font-display text-lg font-extrabold text-[#143d31]">
                        ₹{item.pricePerAc.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(item)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#143d31] px-4 py-2 font-mono text-xs font-bold text-white shadow-xs hover:bg-[#5d7d37] transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#143d31]/50 p-0 backdrop-blur-sm sm:p-6">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative h-full max-h-screen w-full max-w-md overflow-y-auto border-l border-[#143d31]/20 bg-white p-6 shadow-2xl sm:rounded-[2rem] sm:border"
            >
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="absolute right-5 top-5 cursor-pointer text-[#143d31]/40 hover:text-[#143d31]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-[#143d31]" />
                  <h3 className="font-display text-2xl font-bold text-[#143d31]">
                    Kisaan Mall Cart
                  </h3>
                </div>

                {cart.length === 0 ? (
                  <p className="py-12 text-center text-xs text-[#4f624f]">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-2xl border border-[#143d31]/10 bg-[#f4f8f5] p-4 text-xs"
                      >
                        <div className="max-w-[60%]">
                          <p className="font-bold text-[#143d31] truncate">{c.name}</p>
                          <span className="font-mono text-[10px] text-[#4f624f]">
                            ₹{c.pricePerAc.toLocaleString("en-IN")} / unit
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(c.id, c.qtyNeeded - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-[#143d31]/20 bg-white text-[#143d31] hover:bg-[#143d31]/10"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono font-bold text-[#143d31]">{c.qtyNeeded}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(c.id, c.qtyNeeded + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md border border-[#143d31]/20 bg-white text-[#143d31] hover:bg-[#143d31]/10"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-[#143d31]/10 pt-4">
                      <div className="flex justify-between font-display text-lg font-bold text-[#143d31]">
                        <span>Total Estimated:</span>
                        <span className="font-mono text-[#5d7d37]">
                          ₹{totalCartAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3.5 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-800"
                      >
                        <WhatsappLogo className="h-4 w-4" weight="fill" />
                        <span>Send Order via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
