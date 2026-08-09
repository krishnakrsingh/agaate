import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Check, Eye, Plus, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ExtendedCatalogItem } from "@/data/services-data";
import { EASE, Reveal, TiltCard } from "@/components/common/motion";

type ProductCatalogProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  items: ExtendedCatalogItem[];
  onAdd: (item: ExtendedCatalogItem) => void;
};

export function ProductCatalog({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  items,
  onAdd,
}: ProductCatalogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [flashId, setFlashId] = useState<string | null>(null);

  // Quick View Modal state
  const [quickViewItem, setQuickViewItem] = useState<ExtendedCatalogItem | null>(null);

  useEffect(() => {
    if (!flashId) return;
    const t = setTimeout(() => setFlashId(null), 900);
    return () => clearTimeout(t);
  }, [flashId]);

  return (
    <section id="catalog" ref={sectionRef} className="relative scroll-mt-24">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 border-y border-border bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-jet text-[10px] font-bold uppercase tracking-[0.22em] text-forest/40">
                Catalog Filter
              </span>
              <span className="hidden rounded-full border border-forest/15 bg-forest/5 px-3 py-1 font-mono text-[10px] font-bold text-forest md:inline">
                {items.length} Certified SKUs
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-forest/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, SKUs…"
                className="w-48 rounded-full border border-border bg-card py-2 pl-9 pr-3 font-mono text-xs text-forest-deep placeholder:text-forest/40 focus:border-forest focus:outline-none md:w-64"
              />
            </div>
          </div>

          {/* Animated LayoutId Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className="relative cursor-pointer rounded-full px-4 py-2 font-mono text-xs font-bold transition-colors"
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="catPill"
                    className="absolute inset-0 rounded-full bg-forest-deep shadow-md"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeCategory === cat ? "text-cream" : "text-forest/70 hover:text-forest"
                  }`}
                >
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-gradient-to-r from-moss via-forest to-terracotta"
        />
      </div>

      <Reveal variant="fade-up" className="mx-auto max-w-7xl px-6 pt-16 lg:px-12">
        <div className="max-w-2xl text-left">
          <p className="mb-3 font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-moss">
            Agaate Kisan Mall Catalog
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
            Browse 500+ Certified Agri Inputs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-forest/75 md:text-base">
            Traceable from direct partner manufacturing plants (Bayer, Yara, Sakata, Netafim, Stanes) straight to your billing receipt.
          </p>
        </div>
      </Reveal>

      {/* Product Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 lg:px-12">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: 18 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: Math.min(i, 7) * 0.04,
                }}
                whileHover={{ y: -8 }}
                className="will-change-transform text-left"
              >
                <TiltCard
                  maxTilt={6}
                  className="h-full rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex h-full min-h-[320px] flex-col justify-between p-6">
                    <div>
                      {/* Top Badges */}
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="rounded-md border border-forest/10 bg-[#eef3f0] px-2.5 py-0.5 font-jet text-[9px] font-bold text-forest">
                          {item.category}
                        </span>
                        <span className="rounded-md bg-terracotta/10 px-2 py-0.5 font-jet text-[9px] font-bold text-terracotta">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="mb-1.5 font-serif text-xl font-bold text-forest-deep leading-snug">
                        {item.name}
                      </h4>
                      <p className="mb-3 text-xs leading-relaxed text-forest/70">{item.desc}</p>

                      {/* Dosage info & Chemical Reduction Badge */}
                      <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px] font-mono">
                        <div className="flex justify-between text-forest/60">
                          <span>Dosage:</span>
                          <span className="font-bold text-forest-deep">{item.dosage}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-moss font-bold">
                          <Sparkles className="h-3 w-3" />
                          <span>{item.chemicalReduction}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                      <div>
                        <span className="block font-mono text-[9px] text-forest/40 font-bold uppercase">
                          PRICE / ACRE
                        </span>
                        <span className="font-mono text-base font-extrabold text-terracotta">
                          ₹{item.pricePerAc.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick View Button */}
                        <button
                          type="button"
                          onClick={() => setQuickViewItem(item)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-border bg-bone text-forest/70 hover:border-forest hover:text-forest transition-colors"
                          title="Quick View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Add to Bag Button */}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          onClick={() => {
                            onAdd(item);
                            setFlashId(item.id);
                          }}
                          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition-colors ${
                            flashId === item.id
                              ? "border-moss bg-moss text-cream"
                              : "border-forest-deep bg-forest-deep text-cream hover:bg-forest"
                          }`}
                        >
                          {flashId === item.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-border py-20 text-center"
          >
            <p className="font-mono text-sm text-forest/50">
              No products match "{searchQuery}". Try another search term.
            </p>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 shadow-2xl text-left z-10 space-y-6"
            >
              <button
                onClick={() => setQuickViewItem(null)}
                className="absolute right-6 top-6 rounded-full border border-border p-2 text-forest/60 hover:bg-card hover:text-forest cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="rounded-md bg-forest-deep px-3 py-1 font-jet text-[10px] font-bold text-cream">
                  {quickViewItem.category}
                </span>
                <span className="rounded-md bg-terracotta/10 px-3 py-1 font-jet text-[10px] font-bold text-terracotta">
                  {quickViewItem.badge}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-forest-deep leading-tight">
                  {quickViewItem.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-forest/75">{quickViewItem.desc}</p>
              </div>

              <div className="space-y-3 rounded-2xl border border-border bg-card p-5 text-xs font-mono">
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase font-bold">Active Formulation</span>
                  <span className="font-bold text-forest-deep">{quickViewItem.activeIngredient}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase font-bold">Prescribed Dosage</span>
                  <span className="font-bold text-terracotta">{quickViewItem.dosage}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase font-bold">Application Protocol</span>
                  <span className="text-forest/80 leading-relaxed block mt-0.5">{quickViewItem.application}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-forest/40 uppercase font-bold">Suitable Crops</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {quickViewItem.suitableCrops.map((c) => (
                      <span key={c} className="rounded bg-bone px-2 py-0.5 text-[10px] font-bold text-forest-deep">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <span className="block font-mono text-[9px] text-forest/40 uppercase font-bold">PRICE PER ACRE</span>
                  <span className="font-mono text-xl font-extrabold text-terracotta">
                    ₹{quickViewItem.pricePerAc.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAdd(quickViewItem);
                    setQuickViewItem(null);
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-forest-deep px-6 py-3 text-xs font-bold text-cream hover:bg-forest cursor-pointer shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Input Package</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
