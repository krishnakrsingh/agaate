import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  ArrowUpRight,
  Building2,
  Coins,
  Cpu,
  Sprout,
  Store,
  Truck,
} from "lucide-react";
import { Eyebrow, InlineCta } from "./Shared";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

const operatingModel: Array<{
  title: string;
  tag: string;
  desc: string;
  investorRead: string;
  link: string;
  icon: IconType;
}> = [
  {
    title: "Bio-Boosted Nursery",
    tag: "Production engine",
    desc: "Controlled-environment vegetable seedlings built for stronger roots, higher survival, and predictable crop starts.",
    investorRead: "Repeatable supply and quality differentiation.",
    link: "/services/nursery",
    icon: Sprout,
  },
  {
    title: "Kisan Mall",
    tag: "Input commerce",
    desc: "A physical and digital agri-input hub for seeds, nutrients, protection, irrigation, tools, and crop-stage prescriptions.",
    investorRead: "SKU breadth, farmer footfall, and manufacturer relationships.",
    link: "/services/kisaan-mall",
    icon: Store,
  },
  {
    title: "Advisory + Farm Tech",
    tag: "Decision layer",
    desc: "WhatsApp crop tracking, farm logs, sensors, drones, and image-based crop health detection connected to agronomists.",
    investorRead: "Data moat through recurring crop-cycle touchpoints.",
    link: "/services/farm-tech",
    icon: Cpu,
  },
  {
    title: "Big Farm Setup",
    tag: "Turnkey projects",
    desc: "Land planning, drip and fertigation layout, polyhouse setup, SOPs, manpower planning, and first-harvest management.",
    investorRead: "Higher-ticket B2B and commercial farm expansion.",
    link: "/services/big-farm-setup",
    icon: Building2,
  },
  {
    title: "Market Linkage",
    tag: "Demand access",
    desc: "Buyer connections, harvest planning, grading support, and direct-market routes that reduce middleman leakage.",
    investorRead: "Creates the closed loop from crop planning to sale.",
    link: "/services/market-linkage",
    icon: Truck,
  },
  {
    title: "Carbon Credits",
    tag: "Climate revenue",
    desc: "Practice tracking, MRV support, verification coordination, and farmer payouts for eligible sustainable practices.",
    investorRead: "Optional upside layer on top of core crop economics.",
    link: "/services/carbon-credits",
    icon: Coins,
  },
];

export function OperatingModel() {
  return (
    <section id="operating-model" className="bg-bone px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Operating model</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.06] text-forest-deep">
              Six verticals, one closed-loop crop economy.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-3xl text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              The sequence matters. A farmer does not need random products; they need the right
              seedling, the right input, the right advice, the right infrastructure, the right
              buyer, and then additional income from sustainable practices.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {operatingModel.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.link}
                className="group flex min-h-[300px] flex-col justify-between rounded-lg border border-[#DDE7E1] bg-white p-6 transition-colors hover:border-forest/50 md:p-8"
              >
                <div>
                  <div className="mb-7 flex items-start justify-between gap-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-forest/[0.06] text-forest ring-1 ring-forest/10 transition-colors group-hover:bg-forest group-hover:text-cream">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-terracotta">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-[28px] leading-tight text-forest-deep">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#59635D]">{item.desc}</p>
                </div>
                <div className="mt-8 border-t border-ink/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                    Investor read
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-4 text-sm font-semibold text-ink">
                    <span>{item.investorRead}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <InlineCta href="/services">Explore every service</InlineCta>
          <InlineCta href="tel:8350085005" variant="light">
            Call partnership desk
          </InlineCta>
        </div>
      </div>
    </section>
  );
}
