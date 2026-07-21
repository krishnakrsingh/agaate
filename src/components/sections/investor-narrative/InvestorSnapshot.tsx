import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Factory,
  Handshake,
  Tractor,
  Users,
} from "lucide-react";
import { Eyebrow, InlineCta } from "./Shared";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const proofMetrics: Array<{
  value: string;
  label: string;
  note: string;
  icon: IconType;
}> = [
  {
    value: "15,000+",
    label: "Acres under association",
    note: "Field network depth for input, advisory, and market programs.",
    icon: BarChart3,
  },
  {
    value: "2,000+",
    label: "Agaate Parivaar farmers",
    note: "A growing farmer base for repeat seasonal engagement.",
    icon: Users,
  },
  {
    value: "25+",
    label: "Direct supply partners",
    note: "Manufacturer-led access across seeds, nutrition, irrigation, and crop protection.",
    icon: Handshake,
  },
  {
    value: "500+",
    label: "Agri-input SKUs",
    note: "Retail depth through Kisan Mall and advisory-led procurement.",
    icon: Boxes,
  },
  {
    value: "200+",
    label: "Irrigation installations",
    note: "Proof of field hardware execution, not only software intent.",
    icon: Tractor,
  },
  {
    value: "17-acre",
    label: "Smart nursery facility",
    note: "Controlled production, trials, quality testing, and distribution infrastructure.",
    icon: Factory,
  },
];

export function InvestorSnapshot() {
  return (
    <section id="investor-snapshot" className="bg-white px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Investor snapshot</Eyebrow>
            <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.04] text-forest-deep">
              A farmer network, a supply chain, and a field operating system in one company.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              Agaate is not a single-product agriculture site. It is a connected agri-ecosystem:
              nursery production, input retail, agronomic advisory, farm technology, turnkey farm
              setup, market linkage, and carbon-credit enablement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <InlineCta href="/contact">Request investor brief</InlineCta>
              <InlineCta href="#operating-model" variant="light">
                See the business model
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-[#DDE7E1] bg-[#DDE7E1] sm:grid-cols-2 lg:grid-cols-3">
          {proofMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-[#F9FBF8] p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <Icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
                  <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-ink/35">
                    Proof point
                  </span>
                </div>
                <div className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-none text-forest-deep">
                  {metric.value}
                </div>
                <h3 className="mt-3 text-[15px] font-bold text-ink md:text-[16px]">
                  {metric.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#667069]">{metric.note}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-forest/15 bg-forest/[0.03] p-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-relaxed text-[#59635D]">
            Revenue and platform-scale numbers should be shared with investors as a diligence pack,
            with GMV, ARR, and statutory revenue clearly separated. The public story stays focused
            on operating proof and business-model clarity.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest-deep ring-1 ring-forest/20 transition-colors hover:bg-forest hover:text-cream"
          >
            Ask for diligence data
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
