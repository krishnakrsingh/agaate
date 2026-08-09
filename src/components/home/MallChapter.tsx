import React, { useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  PhoneCall,
  Plus,
  Minus,
  QrCode,
  Building2,
  Microscope,
  Package,
} from "lucide-react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { TiltCard, MagneticButton } from "@/components/common/motion";
import { motion, AnimatePresence } from "framer-motion";

import seedsImage from "@/assets/product-seeds.jpg";
import fertiliserImage from "@/assets/product-fertiliser.jpg";
import irrigationImage from "@/assets/product-irrigation.jpg";
import toolsImage from "@/assets/product-tools.jpg";

const CATEGORIES = [
  {
    id: "seeds",
    number: "01",
    label: "Bio-Boosted Seeds",
    category: "SEEDS & GERMINATION",
    title: "High-Germination Bio-Treated Seed Packs",
    subtitle: "Pathogen-free hybrid & open-pollinated vegetable seeds with sterile bio-coatings.",
    image: seedsImage,
    price: "₹450 / pack",
    origPrice: "₹600",
    badge: "98% Germination",
    qrCode: "AG-SEED-8891",
    specs: [
      { label: "Purity Test", val: "99.8%" },
      { label: "Bio Coating", val: "Trichoderma" },
      { label: "Dispatch", val: "⚡ 24h Express" },
    ],
    highlights: [
      "Treated with Trichoderma & root promoters",
      "Vacuum-sealed moisture barrier foil pack",
      "Batch-tested for zero weed seed contamination",
    ],
  },
  {
    id: "bio",
    number: "02",
    label: "Biological Nutrition",
    category: "BIO-INPUTS & SOIL CARE",
    title: "Trichoderma & Mycorrhiza Bio-Cures",
    subtitle: "Organic soil enhancers that eliminate root rot, wilt, and fungal attacks naturally.",
    image: fertiliserImage,
    price: "₹380 / 1L",
    origPrice: "₹500",
    badge: "100% Organic",
    qrCode: "AG-BIO-4412",
    specs: [
      { label: "CFU Count", val: "2x10^8 / g" },
      { label: "Residue Free", val: "100% Safe" },
      { label: "Dispatch", val: "⚡ 24h Express" },
    ],
    highlights: [
      "Stops Fusarium wilt & Phytophthora root rot",
      "Promotes massive lateral root development",
      "Zero chemical shock to beneficial soil fauna",
    ],
  },
  {
    id: "irrigation",
    number: "03",
    label: "Precision Drip Kits",
    category: "DRIP & WATER PLANNING",
    title: "Heavy-Duty Venturi Drip Fertigation Sets",
    subtitle: "Save 40% water and deliver exact fertilizer doses directly to plant root zones.",
    image: irrigationImage,
    price: "₹1,250 / set",
    origPrice: "₹1,600",
    badge: "Precision Flow",
    qrCode: "AG-DRIP-9903",
    specs: [
      { label: "UV Warranty", val: "5 Years" },
      { label: "Drip Uniformity", val: "95% Emitter" },
      { label: "Dispatch", val: "⚡ Same Day" },
    ],
    highlights: [
      "Precision suction valve for uniform liquid fertilizer",
      "High-grade virgin polypropylene construction",
      "Anti-clogging internal mesh filtration",
    ],
  },
  {
    id: "support",
    number: "04",
    label: "Mulching & Crop Support",
    category: "FIELD PROTECTION",
    title: "Silver-Black UV Mulch Film & Staking",
    subtitle: "Prevents weed growth, retains soil moisture, and maintains ideal root temperature.",
    image: toolsImage,
    price: "₹1,890 / roll",
    origPrice: "₹2,300",
    badge: "Field Tested",
    qrCode: "AG-MULCH-7721",
    specs: [
      { label: "Thickness", val: "25 Micron" },
      { label: "Roll Length", val: "300 Meters" },
      { label: "Dispatch", val: "⚡ Same Day" },
    ],
    highlights: [
      "Silver side reflects pests; black side suppresses weeds",
      "Reduces irrigation frequency by up to 50%",
      "Tear-resistant virgin polymer blend",
    ],
  },
];

const SUPPLY_CHAIN_STEPS = [
  {
    step: "01",
    title: "Direct Partner Sourcing",
    desc: "Sourced directly from 25+ certified seed & input manufacturers.",
    icon: Building2,
  },
  {
    step: "02",
    title: "QC Batch Verification",
    desc: "Every batch tested for germination, purity, and zero counterfeits.",
    icon: Microscope,
  },
  {
    step: "03",
    title: "Agaate Regional Hub",
    desc: "Stored in humidity-controlled warehouses until your order.",
    icon: Package,
  },
  {
    step: "04",
    title: "24-48h Farm Delivery",
    desc: "Delivered straight to your field gate across 15+ districts.",
    icon: Truck,
  },
];

export default function MallChapter() {
  const sectionRef = useHomeChapterReveal();
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const activeProduct = CATEGORIES[activeCatIndex];

  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleAddToCart = () => {
    setCartItemsCount((prev) => prev + quantity);
    setToastMessage(`Added ${quantity}x ${activeProduct.label} to Farm Cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="kisaan-mall"
      className="relative scroll-mt-20 overflow-hidden bg-[#fafbf7] px-5 py-16 md:px-10 md:py-24"
    >
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 inset-x-0 z-50 mx-auto w-max rounded-full bg-[#143d31] px-5 py-2.5 text-xs font-bold text-[#a3e635] shadow-2xl border border-[#a3e635]/30 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-[#a3e635]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        <div data-home-reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-extrabold text-[#5d7d37]">03</span>
              <span className="h-3.5 w-[1.5px] bg-[#143d31]/20" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#143d31]">
                AGAATE MALL
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              Once you know what your crop needs,{" "}
              <span className="font-serif italic font-normal text-[#5d7d37]">
                getting the right input matters just as much.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans border-l-2 border-[#5d7d37] pl-5 text-sm sm:text-base leading-relaxed text-[#4f624f]">
              Farmers should not have to guess between ten similar packets on a shelf. Agaate Mall
              connects expert guidance with genuine seeds, biologicals, drip systems, mulching,
              and harvest tools — all sourced directly from verified partners.
            </p>
          </div>
        </div>

        <div data-home-reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            {CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeCatIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCatIndex(idx);
                    setQuantity(1);
                  }}
                  className={`w-full text-left rounded-2xl p-4.5 transition-all duration-300 border flex items-center justify-between group ${
                    isActive
                      ? "bg-[#143d31] text-white border-[#143d31] shadow-lg translate-x-1"
                      : "bg-white text-[#143d31] border-[#143d31]/12 hover:border-[#5d7d37] hover:bg-[#f9faf6]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-mono text-sm font-extrabold ${
                        isActive ? "text-[#a3e635]" : "text-[#5d7d37]"
                      }`}
                    >
                      {cat.number}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold leading-tight">
                        {cat.label}
                      </p>
                      <p
                        className={`text-[10px] font-mono mt-0.5 ${
                          isActive ? "text-white/70" : "text-[#536253]"
                        }`}
                      >
                        {cat.badge}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isActive
                        ? "text-[#a3e635] translate-x-1"
                        : "text-[#143d31]/40 group-hover:translate-x-1 group-hover:text-[#143d31]"
                    }`}
                  />
                </button>
              );
            })}

            <div className="mt-4 rounded-2xl bg-white p-4 border border-[#143d31]/12 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635]">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#143d31]">Farm Cart</p>
                  <p className="text-[10px] text-[#536253]">
                    {cartItemsCount === 0 ? "No items added yet" : `${cartItemsCount} Items Selected`}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#5d7d37] px-3 py-1 text-xs font-mono font-extrabold text-white">
                {cartItemsCount}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <TiltCard maxTilt={5} glare={false} className="h-full">
                  <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-[#143d31]/15 shadow-xl flex flex-col justify-between h-full">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#143d31]/10">
                      <span className="font-mono text-xs font-extrabold text-[#5d7d37] uppercase tracking-wider">
                        {activeProduct.category}
                      </span>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#143d31] px-3 py-1 text-[10px] font-mono font-bold text-[#a3e635]">
                        <QrCode className="h-3 w-3 text-[#a3e635]" />
                        <span>Batch {activeProduct.qrCode} · QC Verified</span>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-12 items-center my-6">
                      <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#143d31]/12 bg-[#f9faf6]">
                        <img
                          src={activeProduct.image}
                          alt={activeProduct.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-md bg-[#143d31] px-2.5 py-1 text-[10px] font-extrabold text-[#a3e635] shadow-xs">
                          {activeProduct.badge}
                        </span>
                      </div>

                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">
                            {activeProduct.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed mt-1.5">
                            {activeProduct.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2">
                          {activeProduct.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="rounded-xl bg-[#f4f7ef] p-2.5 border border-[#143d31]/8 text-center"
                            >
                              <p className="text-[9px] font-mono font-bold text-[#536253] uppercase">
                                {spec.label}
                              </p>
                              <p className="text-xs font-extrabold text-[#143d31] mt-0.5">
                                {spec.val}
                              </p>
                            </div>
                          ))}
                        </div>

                        <ul className="space-y-1.5">
                          {activeProduct.highlights.map((point) => (
                            <li key={point} className="flex items-center gap-2 text-xs text-[#143d31] font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#143d31]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-extrabold text-[#143d31]">
                            {activeProduct.price}
                          </span>
                          <span className="text-xs text-[#143d31]/40 line-through font-mono">
                            {activeProduct.origPrice}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#5d7d37] font-semibold">
                          ✓ Direct Brand Sourced · Zero Middlemen
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full bg-[#f4f7ef] p-1 border border-[#143d31]/15">
                          <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#143d31] shadow-xs hover:bg-[#143d31] hover:text-white transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-extrabold text-[#143d31]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#143d31] shadow-xs hover:bg-[#143d31] hover:text-white transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={handleAddToCart}
                          className="flex items-center gap-2 rounded-full bg-[#143d31] px-5 py-3 text-xs font-extrabold text-[#a3e635] shadow-md hover:bg-[#1a4a3c] transition-all active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span>Add to Farm Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div data-home-reveal className="mt-16 rounded-3xl bg-white p-6 sm:p-10 border border-[#143d31]/12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs font-bold text-[#5d7d37] uppercase tracking-widest">
              ZERO COUNTERFEITS GUARANTEE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] mt-1">
              How Agaate Direct Supply Works
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4f624f] mt-1.5">
              From certified brand factories to your field gate — every step is tracked and quality-verified.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPLY_CHAIN_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="group relative rounded-2xl bg-[#fafbf7] p-5 border border-[#143d31]/10 hover:border-[#5d7d37] transition-all hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-[#5d7d37]">
                      STEP {s.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] group-hover:scale-110 transition-transform">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#143d31]">
                    {s.title}
                  </h4>
                  <p className="font-sans text-xs text-[#4f624f] leading-relaxed mt-1.5 font-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div data-home-reveal className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-[#143d31] p-8 text-white shadow-xl">
          <div>
            <span className="font-mono text-xs font-bold text-[#a3e635] uppercase tracking-widest">
              DIRECT AGRONOMIST RECOMMENDATION
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Unsure which seed or bio-input matches your soil?
            </h3>
            <p className="font-sans text-xs text-white/75 mt-1">
              Talk directly with senior field experts to get exact dose calculations before buying.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <MagneticButton strength={0.2} as="a" href="/services/kisaan-mall">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-7 py-3.5 text-xs font-extrabold text-[#143d31] hover:bg-[#b5f247] transition-colors cursor-pointer">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Full Store</span>
              </span>
            </MagneticButton>
            <a
              href="tel:9487263498"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#a3e635]" />
              <span>Call Agronomist</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
