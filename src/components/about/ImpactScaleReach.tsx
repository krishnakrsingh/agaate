import {
  ArrowRight,
  Building2,
  Droplets,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Users,
} from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import farmerAdvisorImg from "@/assets/about-farmer-advisor.png";
import { getLocalizedPath } from "@/lib/i18n";

const impactMetrics = [
  {
    value: "15,000+",
    label: "Under Association",
    icon: Sprout,
    bgColor: "bg-[#eab308]",
    textColor: "text-[#0d2a20]",
  },
  {
    value: "2,000+",
    label: "Agaate Parivaar",
    icon: Users,
    bgColor: "bg-[#38bdf8]",
    textColor: "text-[#0d2a20]",
  },
  {
    value: "500+",
    label: "QC-Verified SKUs",
    icon: ShoppingBag,
    bgColor: "bg-[#fb923c]",
    textColor: "text-white",
  },
  {
    value: "25+",
    label: "Direct Manufacturers",
    icon: Building2,
    bgColor: "bg-[#c084fc]",
    textColor: "text-white",
  },
  {
    value: "200+",
    label: "Precision Drip Kits",
    icon: Droplets,
    bgColor: "bg-[#34d399]",
    textColor: "text-[#0d2a20]",
  },
  {
    value: "20+",
    label: "On-Ground Kisan Sathis",
    icon: ShieldCheck,
    bgColor: "bg-[#a3e635]",
    textColor: "text-[#0d2a20]",
  },
];

export default function ImpactScaleReach() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative scroll-mt-28 overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] px-5 py-16 text-[#143d31] md:px-10 md:py-24"
    >
      <div className="relative mx-auto max-w-7xl pt-2">
        <div className="pointer-events-none absolute -left-10 -top-6 z-0 hidden opacity-25 md:block">
          <svg width="240" height="300" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M120 10C120 10 30 75 30 160C30 245 120 290 120 290C120 290 210 245 210 160C210 75 120 10 120 10Z"
              fill="#5d7d37"
              fillOpacity="0.12"
              stroke="#5d7d37"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <path d="M120 30V270" stroke="#5d7d37" strokeWidth="2.5" />
            <path d="M120 90L65 135" stroke="#5d7d37" strokeWidth="2" />
            <path d="M120 155L175 200" stroke="#5d7d37" strokeWidth="2" />
            <path d="M120 200L75 235" stroke="#5d7d37" strokeWidth="2" />
          </svg>
        </div>

        <div className="mb-6 flex items-center gap-2.5">
          <span className="h-[2px] w-6 bg-[#5d7d37]" aria-hidden="true" />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5d7d37]">
            Impact Scale &amp; Reach
          </p>
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative lg:col-span-5"
          >
            <div className="relative aspect-[4/4.5] max-h-[380px] w-full overflow-hidden rounded-[2.5rem] rounded-tl-[4rem] rounded-bl-[4rem] border-4 border-[#5d7d37]/40 bg-[#0d2a20] sm:aspect-[4/4] sm:max-h-[420px] lg:aspect-[4/4.8]">
              <img
                src={farmerAdvisorImg}
                alt="Agaate farmer and agronomist in the field"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 lg:col-span-7"
          >
            <div>
              <h2
                id="impact-heading"
                className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#143d31] sm:text-3xl lg:text-4xl"
              >
                <span className="font-extrabold text-[#5d7d37]">2,000+ Farmers</span> trust Agaate
                across{" "}
                <span className="font-serif text-[#5d7d37] italic font-normal">15,000+ acres</span> of
                real farmland
              </h2>
              <p className="mt-2 font-sans text-xs font-normal leading-relaxed text-[#4f624f] sm:text-sm">
                Concentrated operational scale delivering direct-from-brand inputs, doorstep
                logistics, and Senior Agronomist guidance to maximize yield and farmer income.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-3">
              {impactMetrics.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + idx * 0.05, duration: 0.35 }}
                    className="group flex items-center gap-3 rounded-full border border-[#143d31]/12 bg-white px-3.5 py-2.5 transition-all hover:border-[#5d7d37] hover:shadow-xs"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${m.bgColor} ${m.textColor}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-display text-base font-extrabold leading-none text-[#143d31] sm:text-lg">
                        {m.value}
                      </p>
                      <p className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#5d7d37]">
                        {m.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                to={getLocalizedPath("/services/farm-tech", currentLang) as any}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#143d31] px-6 py-3 text-xs font-extrabold text-white shadow-xs transition-all duration-300 hover:bg-[#5d7d37] active:scale-95"
              >
                <span>Explore Agaate Impact</span>
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
