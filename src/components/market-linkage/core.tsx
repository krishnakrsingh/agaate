import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  Check,
  Handshake,
  ShieldCheck,
  Truck,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { EASE, Reveal, Stagger, StaggerItem, TiltCard } from "@/components/common/motion";
import { Orb, PulseRing } from "./deco";
import { BUYER_NETWORKS, PRICING } from "./data";

const FILTERS = ["All", "Tomato", "Chilli", "Capsicum"] as const;

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Guaranteed Price Baselines",
    desc: "We establish floor rates in contracts, guarding against sudden mandi auction crashes.",
  },
  {
    icon: TrendingUp,
    title: "Integrated Logistics",
    desc: "Agaate coordinates direct collection runs from regional hubs to minimize transit waste.",
  },
  {
    icon: Handshake,
    title: "Buyback Ecosystem",
    desc: "Market linkage plus purchasing output from farmers — guaranteeing ROI and securing the supply chain.",
  },
  {
    icon: Check,
    title: "Market-Ready Standards",
    desc: "Timely harvest best practices and quality produce standards for optimal buyer value.",
  },
];

function PriceRows() {
  const [cropFilter, setCropFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = PRICING.filter((p) => cropFilter === "All" || p.crop.startsWith(cropFilter));
  const maxBar = Math.max(...PRICING.map((p) => p.bar));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCropFilter(f)}
            className={`relative cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold transition-colors ${
              cropFilter === f
                ? "text-cream"
                : "border border-border bg-card text-forest/70 hover:border-forest"
            }`}
          >
            {cropFilter === f ? (
              <motion.span
                layoutId="buyer-filter-pill"
                className="absolute inset-0 rounded-full bg-forest"
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card text-xs shadow-sm">
        <div className="grid grid-cols-4 gap-2 border-b border-border bg-[#F9FAF9] p-3 font-mono text-[9px] font-semibold uppercase tracking-wider text-forest/40">
          <span>COMMODITY</span>
          <span>MANDI</span>
          <span>AGAATE</span>
          <span>BUYER</span>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((p) => (
            <motion.div
              key={p.crop}
              layout
              className="grid grid-cols-4 items-center gap-2 border-b border-border p-3 last:border-b-0"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <span className="font-bold text-forest-deep">{p.crop.split(" ")[0]}</span>
              <span className="text-forest/65 line-through">{p.local}</span>
              <span className="font-mono font-bold text-terracotta">{p.buyback}</span>
              <span className="truncate text-[10px] font-semibold text-forest/50">
                {p.buyer.split(" ")[0]}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-forest/50">
            Premium vs mandi race
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-terracotta">
            Buyback rate
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {PRICING.map((p, i) => (
            <div key={p.crop} className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full items-end overflow-hidden rounded-lg bg-bone">
                <motion.div
                  className="w-full origin-bottom rounded-lg bg-gradient-to-t from-forest to-moss"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.1, ease: EASE, delay: i * 0.18 }}
                  style={{ height: `${(p.bar / maxBar) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] font-bold text-forest/70">{p.premium}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InquiryCard() {
  const [inquired, setInquired] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquired(true);
    setTimeout(() => setInquired(false), 4000);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {inquired ? (
        <motion.div
          key="success"
          className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-forest/10 bg-card p-8 text-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <motion.div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
          >
            <UserCheck className="h-8 w-8" />
          </motion.div>
          <h4 className="mb-2 font-serif text-3xl font-bold text-forest-deep">
            Contract Requested
          </h4>
          <p className="max-w-xs text-xs leading-relaxed text-forest/70">
            We have logged your buyback inquiry. A market linkages advisor will review your acreage
            capacity and call with a draft agreement.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleInquiry}
          className="space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              required
              type="text"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs focus:border-forest focus:outline-none"
              placeholder="Name"
            />
            <input
              required
              type="tel"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs focus:border-forest focus:outline-none"
              placeholder="Phone"
            />
          </div>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest-deep py-4 text-xs font-semibold text-cream shadow-md transition-all hover:bg-forest"
          >
            <Truck className="h-4 w-4" />
            <span>Inquire for Buyback Contract</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function CoreGrid() {
  return (
    <section className="relative grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
      <Orb from="moss" className="-left-28 -top-24 h-72 w-72 opacity-10" />
      <div className="space-y-8 text-left lg:col-span-7">
        <Reveal variant="fade-up">
          <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl">
            Contract security before the seed lands
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.1}>
          <p className="text-sm leading-relaxed text-forest/75 md:text-base">
            Price collapses during harvest peaks wipe out grower margins. Agaate establishes buyer
            demand loops, signing minimum buyback commitments with farmers based on size and weight
            parameters to ensure stable returns.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 border-t border-border pt-6 md:grid-cols-2">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title} variant={i % 2 === 0 ? "fade-up" : "blur-in"}>
                <TiltCard
                  maxTilt={8}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-moss/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-forest/5 text-forest">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-forest-deep md:text-base">{f.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-forest/65">{f.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal variant="fade-left" delay={0.15}>
          <div className="relative space-y-4 overflow-hidden rounded-[2rem] border border-forest/10 bg-[#eef3f0]/50 p-8">
            <PulseRing className="-right-6 -top-6 h-24 w-24" />
            <span className="block font-jet text-[9px] font-bold uppercase tracking-widest text-forest">
              Partner buyer networks
            </span>
            <h3 className="font-serif text-2xl font-bold text-forest-deep">
              Institutional Purchasing Chains
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
              {BUYER_NETWORKS.map((buyer, idx) => (
                <motion.div
                  key={buyer.name}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-border bg-card p-4 text-center text-xs"
                >
                  <Building className="mx-auto mb-2 h-5 w-5 text-forest/40" />
                  <span className="block font-bold text-forest-deep">{buyer.name}</span>
                  <span className="mt-0.5 block text-[9px] text-forest/50">{buyer.tags}</span>
                  {idx === 3 ? (
                    <span className="mt-1.5 block font-jet text-[8px] font-bold uppercase tracking-widest text-terracotta">
                      Direct integration
                    </span>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-5">
        <Reveal variant="fade-right" delay={0.1}>
          <div className="space-y-8 rounded-[2.5rem] border border-border bg-bone p-8 text-left shadow-sm">
            <div>
              <span className="mb-1 block font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta">
                Contract Telemetry
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-deep">Buyer Index</h3>
            </div>
            <PriceRows />
            <InquiryCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
