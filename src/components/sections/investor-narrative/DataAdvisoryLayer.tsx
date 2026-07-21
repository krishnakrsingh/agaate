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
    <section className="bg-[#10261F] px-6 py-20 text-cream lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-semibold">
              Data and advisory layer
            </span>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-white">
              The software opportunity is hidden inside every crop cycle.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.75] text-white/70 md:text-[18px]">
              Every image a farmer sends, every soil report, every fertigation log, every buyer
              requirement, and every carbon practice can compound into a smarter operating system
              for Indian vegetable farming.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {technologyModules.map((module) => {
            const Icon = module.icon;
            return (
              <div key={module.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <Icon className="mb-8 h-6 w-6 text-emerald-300" strokeWidth={1.6} />
                <h3 className="font-serif text-2xl leading-tight text-white">{module.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{module.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <Network className="h-5 w-5 text-emerald-300" />
              <span className="font-jet text-[10px] uppercase tracking-[0.2em] text-white/45">
                Farmer enablement platform
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {["Training", "Inputs", "Buyback ecosystem"].map((pillar) => (
                <div key={pillar} className="border-t border-white/10 pt-4">
                  <h4 className="font-semibold text-white">{pillar}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    A repeatable touchpoint that keeps Agaate engaged before, during, and after
                    harvest.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-6 md:p-8">
            <WalletCards className="mb-8 h-6 w-6 text-emerald-300" strokeWidth={1.6} />
            <h3 className="font-serif text-3xl leading-tight text-white">Carbon credit upside</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Drip irrigation, reduced tillage, bio-inputs, no residue burning, cover cropping, and
              better input efficiency can become verified climate income when MRV is handled well.
            </p>
            <Link
              to="/services/carbon-credits"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#10261F] transition-colors hover:bg-white"
            >
              See carbon program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
