import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  Drop,
  Leaf,
  Plant,
  ShoppingBag,
  Tree,
  Wrench
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  EASE,
  MagneticButton,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";

const shelves = [
  {
    icon: Leaf,
    label: "Biological Inputs",
    kicker: "Biocures & growth promoters",
    desc: "Organic and pure, naturally grown without harmful chemicals — living inputs that cut chemical dependency.",
    chips: [
      "Biocure F",
      "Biocure B",
      "Biovita",
      "Bio Nimaton",
      "Plantex",
      "Stanes Symbion Vam Plus",
    ],
  },
  {
    icon: Plant,
    label: "Premium Seeds",
    kicker: "Vegetables & staples",
    desc: "High-yield, disease-resistant varieties tailored to local conditions from best-in-class seed partners.",
    chips: ["Hybrid Cauliflower", "Wheat", "Corn", "Rice"],
  },
  {
    icon: Tree,
    label: "Nursery Saplings",
    kicker: "Bio-boosted seedlings",
    desc: "Strong root development and healthy early-stage growth — 90–98% survival versus 50–70% direct sowing.",
    chips: ["Tomato plugs", "Chilli plugs", "Capsicum plugs", "Pre-order trays"],
  },
  {
    icon: Wrench,
    label: "Farming Infrastructure",
    kicker: "Hardware & installation",
    desc: "Precision water and crop-support systems designed to your crop specs and installed in your field.",
    chips: ["Drip irrigation", "Mulching", "Staking", "Fertigation"],
  },
];

export function CategoryShelves() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          eyebrow="Four aisles · 500+ SKUs"
          title={
            <>
              Four categories, <span className="italic text-terracotta">every input</span> a farm
              needs
            </>
          }
          description="Biologicals, seeds, saplings, and infrastructure — each aisle stocked direct from 25+ verified manufacturer partners."
        />

        <Stagger
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          amount={0.1}
        >
          {shelves.map((shelf) => (
            <StaggerItem key={shelf.label} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/5 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream">
                  <shelf.icon className="h-5 w-5" />
                </div>
                <p className="mb-1 font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-moss">
                  {shelf.kicker}
                </p>
                <h3 className="mb-3 font-serif text-2xl font-bold text-forest-deep">
                  {shelf.label}
                </h3>
                <p className="mb-6 text-xs leading-relaxed text-forest/65">{shelf.desc}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {shelf.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-forest/10 bg-[#eef3f0] px-2.5 py-1 font-mono text-[9px] font-bold text-forest"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal variant="clip-up" className="mt-12">
          <figure className="rounded-3xl border border-forest-deep bg-forest-deep px-8 py-12 text-center text-cream md:px-16">
            <p className="font-serif text-2xl italic leading-relaxed md:text-3xl">
              "Staking एक सस्ती लागत तकनीक है, जो नुकसान कमकर, फलों की गुणवत्ता बढ़ाती है। छोटे
              किसान भी आसानी से अपना सकते हैं।"
            </p>
            <figcaption className="mt-5 font-jet text-[10px] uppercase tracking-[0.22em] text-moss">
              Staking — a low-cost technique that cuts losses and lifts fruit quality, adoptable by
              every small farmer
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Farm Starter",
    range: "1 – 5 acres",
    tag: "Walk-in & call",
    discount: "Standard pricing",
    highlight: false,
    features: [
      "500+ SKUs across all four aisles",
      "Expert-matched input plans",
      "Field-staged delivery",
      "QR-verified, traceable batches",
    ],
  },
  {
    name: "Grower",
    range: "5 – 20 acres",
    tag: "Bulk tier",
    discount: "Flat 8% off",
    highlight: true,
    features: [
      "8% bulk discount across categories",
      "Dedicated agronomist on your block",
      "Staged delivery synced to crop schedule",
      "Sourced direct from 25+ verified partners",
    ],
  },
  {
    name: "Estate",
    range: "20+ acres",
    tag: "Turnkey",
    discount: "Custom contract",
    highlight: false,
    features: [
      "Big-farm setup from bare land to harvest",
      "Drip, fertigation & mulching line build-out",
      "Bulk seed & bio-boosted nursery supply",
      "Assured market linkage for your produce",
    ],
  },
];

export function BulkPricing() {
  return (
    <section className="border-t border-border py-24 bg-bone/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          align="center"
          eyebrow="Bulk-buy tiers"
          title={
            <>
              Volume pricing for <span className="italic text-terracotta">large holdings</span>
            </>
          }
          description="Direct from 25+ manufacturer partners — no middlemen. Indicative tiers; final pricing is quoted against your farm plan and sowing calendar."
        />

        <Stagger
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
          amount={0.1}
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                  tier.highlight
                    ? "border-forest-deep bg-forest-deep text-cream shadow-xl shadow-forest-deep/25"
                    : "border-border bg-card text-ink shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 right-6 rounded-full bg-terracotta px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-cream"
                  >
                    Most popular
                  </motion.span>
                )}
                <p className="font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-moss">
                  {tier.tag}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-bold">{tier.name}</h3>
                <p
                  className={`mt-1 font-mono text-xs ${tier.highlight ? "text-cream/70" : "text-forest/50"}`}
                >
                  {tier.range}
                </p>
                <p
                  className={`mt-6 inline-block w-max rounded-full px-4 py-1.5 font-mono text-xs font-bold ${
                    tier.highlight
                      ? "bg-cream/15 text-moss"
                      : "bg-forest/5 text-forest-deep border border-forest/15"
                  }`}
                >
                  {tier.discount}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <Check
                        className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${tier.highlight ? "text-moss" : "text-moss"}`}
                        strokeWidth={3}
                      />
                      <span className={tier.highlight ? "text-cream/85" : "text-forest/75"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <MagneticButton strength={0.25} as="a" href="tel:8350085005" className="w-full">
                    <span
                      className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold transition-colors ${
                        tier.highlight
                          ? "bg-terracotta text-cream hover:bg-[color-mix(in_oklch,var(--color-terracotta)_85%,black)]"
                          : "bg-forest-deep text-cream hover:bg-forest"
                      }`}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Request bulk quote
                    </span>
                  </MagneticButton>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const sowingCrops = [
  {
    name: "Tomato",
    window: "Aug – Sep",
    unit: "7,000 plugs / acre",
    note: "Rabi transplanting window for hybrid cultivars — reserve trays a month ahead.",
  },
  {
    name: "Chilli",
    window: "Jun – Aug",
    unit: "9,000 plugs / acre",
    note: "Kharif window for Tejaswini and long-fruited types.",
  },
  {
    name: "Cauliflower",
    window: "Aug – Oct",
    unit: "8,500 plugs / acre",
    note: "Curd-initiation timing governs head quality — window is short, book early.",
  },
  {
    name: "Wheat",
    window: "Oct – Nov",
    unit: "40 kg seed / acre",
    note: "Timely sowing protects tillering and grain fill.",
  },
  {
    name: "Corn",
    window: "Jun – Jul",
    unit: "30 kg seed / acre",
    note: "Early-monsoon planting maximizes cob yield.",
  },
  {
    name: "Rice",
    window: "Jun – Jul",
    unit: "35 kg seed / acre",
    note: "Nursery-raised seedlings transplant best before August.",
  },
];

export function SowingPreorder() {
  const [cropName, setCropName] = useState("Tomato");
  const [preordered, setPreordered] = useState(false);
  const active = sowingCrops.find((c) => c.name === cropName) ?? sowingCrops[0];

  useEffect(() => {
    if (!preordered) return;
    const t = setTimeout(() => setPreordered(false), 4000);
    return () => clearTimeout(t);
  }, [preordered]);

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Regional sowing calendars"
              title={
                <>
                  Pre-order against your{" "}
                  <span className="italic text-terracotta">sowing window</span>
                </>
              }
              description="Nursery saplings and seeds are reserved months in advance, so trays are ready the week your region's sowing window opens — no last-minute scrambling."
            />
            <Stagger className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3" amount={0.1}>
              {sowingCrops.map((crop) => (
                <StaggerItem key={crop.name}>
                  <button
                    type="button"
                    onClick={() => setCropName(crop.name)}
                    className="relative w-full cursor-pointer rounded-full px-4 py-2.5 font-mono text-xs font-bold transition-colors"
                  >
                    {cropName === crop.name && (
                      <motion.span
                        layoutId="sowingPill"
                        className="absolute inset-0 rounded-full bg-forest"
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${cropName === crop.name ? "text-cream" : "text-forest/70 hover:text-forest"}`}
                    >
                      {crop.name}
                    </span>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal variant="fade-left">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-moss)_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-10" />
              <div className="relative">
                <AnimatePresence mode="wait">
                  {preordered ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 16 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/15 text-moss"
                      >
                        <Check className="h-8 w-8" strokeWidth={3} />
                      </motion.div>
                      <h3 className="font-serif text-3xl font-bold text-forest-deep">
                        Reserved for {active.name}
                      </h3>
                      <p className="max-w-xs text-xs leading-relaxed text-forest/70">
                        Your bio-boosted trays are queued for the {active.window} window. An
                        agronomist will confirm dispatch before sowing week.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/5 text-forest">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-terracotta">
                            Sowing window
                          </p>
                          <h3 className="font-serif text-3xl font-bold text-forest-deep">
                            {active.window}
                          </h3>
                        </div>
                      </div>
                      <div className="space-y-3 border-t border-border pt-6">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-forest/40">CROP</span>
                          <span className="font-bold text-forest-deep">{active.name}</span>
                        </div>
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-forest/40">INPUT DENSITY</span>
                          <span className="font-bold text-forest-deep">{active.unit}</span>
                        </div>
                        <p className="pt-2 text-xs leading-relaxed text-forest/70">{active.note}</p>
                      </div>
                      <MagneticButton
                        strength={0.25}
                        onClick={() => setPreordered(true)}
                        className="mt-8 w-full"
                      >
                        <span className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-deep py-4 text-sm font-bold text-cream shadow-md transition-colors hover:bg-forest">
                          <ShoppingBag className="h-4 w-4" />
                          Pre-order {active.name} input trays
                        </span>
                      </MagneticButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
