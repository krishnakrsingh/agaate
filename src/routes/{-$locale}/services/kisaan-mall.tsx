import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  Minus,
  Package,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartDrawer } from "@/components/kisaan-mall/CartDrawer";
import {
  CategoryShelves,
  BulkPricing,
  SowingPreorder,
} from "@/components/kisaan-mall/MallShowcase";
import {
  StatsBand,
  Testimonials,
  StoreLocator,
  StoreCta,
} from "@/components/kisaan-mall/MallProof";
import { ProductCatalog } from "@/components/kisaan-mall/ProductCatalog";
import {
  EASE,
  MagneticButton,
  Marquee,
  PageHero,
  Reveal,
  SectionHeader,
  TiltCard,
} from "@/components/common/motion";
import { catalogItems, kisaanMallCategories as categories, ExtendedCatalogItem } from "@/data/services-data";
import { CartItem, VerifiedProductInfo } from "@/types";

export const Route = createFileRoute("/{-$locale}/services/kisaan-mall")({
  component: KisaanMall,
});

const popSpring = { type: "spring", stiffness: 520, damping: 16 } as const;

function KisaanMall() {
  const [selectedCrop, setSelectedCrop] = useState("Watermelon");
  const [acres, setAcres] = useState(5);
  const [selectedProductForCalc, setSelectedProductForCalc] = useState<ExtendedCatalogItem>(catalogItems[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ordered, setOrdered] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<VerifiedProductInfo | null>(null);

  const loadPresetPackage = () => {
    const preset = catalogItems.filter((item) => item.crop === "All" || item.crop === selectedCrop);
    const cartItems = preset.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      pricePerAc: item.pricePerAc,
      qtyNeeded: acres,
    }));
    setCart(cartItems);
  };

  if (cart.length === 0 && !ordered) {
    loadPresetPackage();
  }

  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qtyNeeded: newQty } : item)));
  };

  const addItemToCart = (item: ExtendedCatalogItem) => {
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
          qtyNeeded: acres,
        },
      ];
    });
  };

  const syncCartToAcres = (newAcres: number) => {
    setAcres(newAcres);
    setCart((prev) => prev.map((item) => ({ ...item, qtyNeeded: newAcres })));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.pricePerAc * item.qtyNeeded, 0);

  const handlePreorder = (e?: React.FormEvent) => {
    e?.preventDefault();
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      setCart([]);
    }, 4000);
  };

  const handleVerifyCode = (code: string) => {
    setVerifyingCode(code);
    setVerifiedData(null);
    setTimeout(() => {
      setVerifyingCode(null);
      setVerifiedData({
        batch: code,
        producer: "Bayer CropScience Technical Plant / Stanes Agri",
        verifiedAt: "July 12, 2026",
        composition: "Trichoderma viride / Mycorrhizae active spore loop",
        distribution: "Agaate Bhorakalan Central Input Warehouse",
        purity: "99.8% Certified Authentic",
      });
    }, 1200);
  };

  const filteredCatalog = catalogItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="Service Vertical · 02 · Agaate Kisan Mall"
        title={
          <>
            Agaate Kisan Mall —{" "}
            <span className="italic text-terracotta">One-Stop Store for 500+ Certified Agri Inputs.</span>
          </>
        }
        description="A comprehensive physical & digital agricultural experience hub containing verified biological inputs, premium hybrid seeds, crop protection, mulching films, and drip irrigation hardware."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <MagneticButton as="a" href="#catalog">
            <span className="flex items-center gap-2 rounded-full bg-forest-deep px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-forest shadow-lg">
              Browse 500+ SKUs
              <ArrowRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="tel:8350085005">
            <span className="flex items-center gap-2 rounded-full border border-forest/25 bg-cream px-7 py-3.5 text-sm font-bold text-forest-deep">
              <Phone className="h-4 w-4" />
              Call Store: 8350085005
            </span>
          </MagneticButton>
        </div>
      </PageHero>

      {/* Category Marquee Banner */}
      <div className="border-b border-border bg-forest-deep py-3 text-cream">
        <Marquee duration={34}>
          {[
            "Biological Inputs (Biocure F, Biocure B, Biovita, Bio Nimaton, Plantex, Stanes Symbion Vam Plus)",
            "Premium Seeds (Hybrid Cauliflower, Wheat, Corn, Watermelon)",
            "Hardware & Irrigation (Drip lines, Mulching film, Bamboo poles, Ties)",
            "500+ SKUs Under One Roof",
            "25+ Direct Manufacturer Partners",
            "Flawless 5.0 Star Google Rating",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-6 font-jet text-[11px] font-bold uppercase tracking-[0.22em]"
            >
              {item}
              <span className="text-moss">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Stats Band */}
      <StatsBand />

      {/* Interactive Acreage & Input Dosage Calculator Section */}
      <section id="dosage-calculator" className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Precision Input Dosing"
            title="Interactive Acreage & Input Dosage Calculator"
            description="Select any certified product and set your exact farm acreage — generating total required dosage quantity, basal schedule, and exact spacing guidelines."
            align="center"
            className="mx-auto"
          />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start text-left">
            {/* Calculator Inputs Card */}
            <Reveal variant="fade-right" className="lg:col-span-6">
              <div className="rounded-[2.5rem] border border-border bg-bone p-8 shadow-lg space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-deep text-cream">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                      Dosage & Basal Schedule Generator
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep">
                      Select Input & Acreage
                    </h3>
                  </div>
                </div>

                {/* Product Dropdown Selector */}
                <div>
                  <label className="block text-xs font-jet font-semibold uppercase text-forest/70 mb-2">
                    Select Target Product
                  </label>
                  <select
                    value={selectedProductForCalc.id}
                    onChange={(e) => {
                      const found = catalogItems.find((x) => x.id === e.target.value);
                      if (found) setSelectedProductForCalc(found);
                    }}
                    className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-xs font-mono font-bold text-forest-deep focus:border-forest focus:outline-none cursor-pointer"
                  >
                    {catalogItems.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Acreage Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-jet font-semibold uppercase text-forest/70">
                      Enter Farm Acreage
                    </label>
                    <span className="font-mono text-base font-extrabold text-forest-deep">
                      {acres} Acres
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={acres}
                    onChange={(e) => syncCartToAcres(parseInt(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-forest"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-forest/40 mt-1">
                    <span>1 Acre</span>
                    <span>25 Acres</span>
                    <span>50 Acres</span>
                  </div>
                </div>

                {/* Target Crop Selector */}
                <div>
                  <label className="block text-xs font-jet font-semibold uppercase text-forest/70 mb-2">
                    Select Crop Type
                  </label>
                  <div className="flex gap-2">
                    {["Watermelon", "Chili", "Tomato", "Cauliflower"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedCrop(c)}
                        className={`flex-1 rounded-xl py-2.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedCrop === c
                            ? "bg-forest-deep text-cream shadow-sm"
                            : "border border-border bg-card text-forest/70 hover:border-forest"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Calculated Output Card */}
            <Reveal variant="fade-left" className="lg:col-span-6">
              <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-lg text-left space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                      Calculated Recipe Output
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-forest-deep mt-0.5">
                      {selectedProductForCalc.name}
                    </h3>
                  </div>
                  <span className="rounded-full bg-terracotta/10 px-3 py-1 font-jet text-[10px] font-bold text-terracotta">
                    {selectedProductForCalc.badge}
                  </span>
                </div>

                {/* Quantitative Calculation Display */}
                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-forest/15 bg-forest/5 p-5 text-xs font-mono">
                  <div>
                    <span className="block text-[9px] text-forest/50 uppercase font-bold">REQUIRED DOSAGE / ACRE</span>
                    <span className="font-extrabold text-forest-deep text-sm">{selectedProductForCalc.dosage}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-forest/50 uppercase font-bold">TOTAL QUANTITY FOR {acres} ACRES</span>
                    <span className="font-extrabold text-terracotta text-sm">
                      {selectedProductForCalc.dosage.replace(/(\d+(\.\d+)?)/, (m) => (parseFloat(m) * acres).toString())} Total
                    </span>
                  </div>
                </div>

                {/* Basal Dose & Spacing Guidelines */}
                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-border bg-bone p-4">
                    <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/50 block mb-1">
                      Basal Dose Schedule
                    </span>
                    <p className="text-forest-deep font-semibold leading-relaxed">
                      {selectedProductForCalc.application}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-bone p-4">
                    <span className="font-jet text-[9px] font-bold uppercase tracking-wider text-forest/50 block mb-1">
                      Field Spacing & Layout Instruction ({selectedCrop})
                    </span>
                    <p className="text-forest-deep font-semibold leading-relaxed">
                      {selectedCrop === "Watermelon" && "Bed planting with central line 1 ft mulching film hole spacing. Watermelon lateral run 5 ft."}
                      {selectedCrop === "Chili" && "18 x 12 inch staggered plant hole spacing under silver-black mulching film."}
                      {selectedCrop === "Tomato" && "Bamboo staking poles (6 ft) spaced 10 ft apart along rows; stem clips applied at 2 ft intervals."}
                      {selectedCrop === "Cauliflower" && "Transplant 45 cm x 45 cm grid spacing with mycorrhizal root drench before planting."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addItemToCart(selectedProductForCalc)}
                  className="w-full rounded-2xl bg-forest-deep py-4 text-xs font-bold font-mono text-cream shadow-md transition-colors hover:bg-forest cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Prescribed Quantity ({acres} Acres) to Bag</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Catalog Browser */}
      <ProductCatalog
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        items={filteredCatalog}
        onAdd={addItemToCart}
      />

      {/* Category Shelves */}
      <CategoryShelves />

      {/* Bulk Pricing */}
      <BulkPricing />

      {/* Sowing Pre-Order */}
      <SowingPreorder />

      {/* Customer Validation Showcase: 5.0 Star Google Reviews from Bilaspur/Bhorakalan */}
      <Testimonials />

      {/* Store Locator & Contact */}
      <StoreLocator />

      <StoreCta />

      {/* Cart Drawer */}
      <CartDrawer
        cart={cart}
        updateQty={updateQty}
        total={cartTotal}
        ordered={ordered}
        onReserve={() => handlePreorder()}
      />

      <Footer />
    </main>
  );
}
