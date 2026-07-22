import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  ArrowRight,
  CircuitBoard,
  ClipboardCheck,
  Network,
  PhoneCall,
  ScanLine,
  WalletCards,
} from "lucide-react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const technologyModules: Array<{ title: string; desc: string; icon: IconType }> = [
  {
    title: "WhatsApp crop tracking",
    desc: "Daily and stage-wise guidance, image issue detection, and direct expert connection.",
    icon: PhoneCall,
  },
  {
    title: "Farm management app",
    desc: "Crop stages, input logs, activity records, alerts, planning tools, and farmer dashboards.",
    icon: ClipboardCheck,
  },
  {
    title: "Sensors, drones, and AI",
    desc: "Moisture, weather, scouting, crop-health detection, spraying support, and data-driven advisories.",
    icon: CircuitBoard,
  },
  {
    title: "Traceable quality",
    desc: "Nursery protocols, batch tracking, partner-backed inputs, and quality checks before field deployment.",
    icon: ScanLine,
  },
];

export function DataAdvisoryLayer() {
  return (
    <section className="bg-cream px-6 py-10 text-ink lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 grid gap-4 border-t border-ink/10 pt-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="font-jet text-[10px] md:text-xs uppercase tracking-[0.22em] text-forest font-semibold">
              Data and advisory layer
            </span>
            <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] text-forest-deep">
              The software opportunity is hidden inside every crop cycle.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[14px] leading-[1.6] text-ink/75 md:text-[15px]">
              Every image a farmer sends, every soil report, every fertigation log, every buyer
              requirement, and every carbon practice can compound into a smarter operating system
              for Indian vegetable farming.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 lg:grid-cols-12">
          {technologyModules.map((module) => {
            const Icon = module.icon;
            return (
              <div key={module.title} className="group lg:col-span-3 rounded-2xl border border-ink/5 bg-white p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-forest/20 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bone group-hover:bg-forest/10 transition-colors duration-300">
                  <Icon className="h-4.5 w-4.5 text-forest" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-[1.2rem] md:text-[1.3rem] leading-tight text-forest-deep">{module.title}</h3>
                <p className="mt-2 text-[12px] md:text-[13px] leading-relaxed text-ink/70">{module.desc}</p>
              </div>
            );
          })}

          <div className="lg:col-span-7 rounded-2xl border border-ink/5 bg-white p-5 lg:p-6 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Subtle decorative background element */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-64 w-64 rounded-full bg-forest/[0.03] blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10">
                  <Network className="h-4 w-4 text-terracotta" />
                </div>
                <span className="font-jet text-[10px] md:text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                  Farmer enablement platform
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-3 mt-auto">
                {["Training", "Inputs", "Buyback ecosystem"].map((pillar) => (
                  <div key={pillar} className="border-t border-ink/10 pt-3">
                    <h4 className="font-serif text-[1.1rem] md:text-[1.2rem] text-forest-deep">{pillar}</h4>
                    <p className="mt-1.5 text-[12px] md:text-[13px] leading-relaxed text-ink/70">
                      A repeatable touchpoint that keeps Agaate engaged before, during, and after
                      harvest.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-forest/15 bg-forest/[0.02] p-5 lg:p-6 shadow-sm group hover:bg-forest/[0.04] transition-colors duration-300 flex flex-col">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest/15">
              <WalletCards className="h-4.5 w-4.5" strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-[1.5rem] md:text-[1.8rem] leading-tight text-forest-deep">Carbon credit upside</h3>
            <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-ink/80 flex-grow">
              Drip irrigation, reduced tillage, bio-inputs, no residue burning, cover cropping, and
              better input efficiency can become verified climate income when MRV is handled well.
            </p>
            <div className="mt-5">
              <Link
                to="/services/carbon-credits"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[12px] md:text-[13px] font-semibold text-cream transition-all duration-300 hover:bg-forest-deep hover:shadow-lg hover:shadow-forest/20 group-hover:-translate-y-0.5"
              >
                See carbon program
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
