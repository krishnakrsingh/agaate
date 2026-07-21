import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  CircuitBoard,
  ClipboardCheck,
  Coins,
  Cpu,
  Factory,
  Handshake,
  Leaf,
  MapPin,
  Network,
  PhoneCall,
  ScanLine,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Tractor,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import aboutFarmerAdvisor from "@/assets/about-farmer-advisor.png";
import agroPark from "@/assets/agro-park.jpg";
import heroPlant from "@/assets/hero-plant.jpg";
import nurseryImg from "@/assets/zones/polyhouse_nursery.png";
import irrigationImg from "@/assets/zones/irrigation_drip.png";
import droneImg from "@/assets/zones/drone_scan.png";
import marketImg from "@/assets/journey-09-market.png";

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

const nurseryPhases = [
  "Research and crop planning",
  "Controlled cultivation",
  "Quality testing and traceability",
  "Distribution and transplant support",
];

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

const parkZones = [
  "Seed",
  "Nursery",
  "Irrigation",
  "Nutrition",
  "Protection",
  "Tech and drone",
  "Training",
  "Market",
];

const leadership = [
  {
    name: "Ankit Rawat",
    role: "Founder & CEO",
    focus: "Company vision, sustainability, partner strategy, and capital narrative.",
    image: "/team/ankit.png",
  },
  {
    name: "Kuldeep Singh Singhar",
    role: "Head of Operations",
    focus: "Farm execution, crop sales, supply chain reliability, and operating discipline.",
    image: "/team/kuldeep.png",
  },
  {
    name: "Abhay Ranjan",
    role: "Chief of Staff",
    focus: "Nursery operations, Kisan Mall execution, and cross-functional infrastructure.",
    image: "/team/abhay.png",
  },
  {
    name: "Chanchala Shukla",
    role: "Agronomist",
    focus: "Crop viability, product development, nutrition, and integrated pest management.",
    image: "/team/chanchala.png",
  },
  {
    name: "Ravi Kumar",
    role: "Data & Strategy",
    focus: "Analytics, smart crop cycles, reporting, and strategic operating intelligence.",
    image: "/team/ravi.png",
  },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest font-semibold">
      {children}
    </span>
  );
}

function InlineCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: string;
  variant?: "dark" | "light";
}) {
  const className =
    variant === "dark"
      ? "bg-forest-deep text-cream hover:bg-forest"
      : "border border-forest/25 text-forest-deep hover:border-forest hover:bg-forest/5";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export default function SectionInvestorNarrative() {
  return (
    <>
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

      <section className="bg-white px-6 py-20 text-ink lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="border-t border-ink/10 pt-6">
              <Eyebrow>Production infrastructure</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
                The 17-acre smart nursery is the quality-control center of the company.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
                Agaate's nursery model replaces risky direct sowing with controlled germination,
                bio-boosted roots, standardized protocols, in-house trials, and traceability before
                seedlings ever reach a farmer's field.
              </p>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-[#DDE7E1] bg-[#DDE7E1]">
              {nurseryPhases.map((phase, index) => (
                <div key={phase} className="grid grid-cols-[72px_1fr] bg-[#F9FBF8]">
                  <div className="flex items-center justify-center border-r border-[#DDE7E1] font-jet text-xs text-terracotta">
                    0{index + 1}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <span className="font-semibold text-forest-deep">{phase}</span>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <InlineCta href="/services/nursery">Inspect nursery model</InlineCta>
              <InlineCta href="/contact" variant="light">
                Book facility visit
              </InlineCta>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
              <img
                src={nurseryImg}
                alt="Agaate controlled nursery infrastructure"
                className="h-[360px] w-full object-cover md:h-[560px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10261F]/90 to-transparent p-6 text-cream md:p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="font-serif text-3xl text-white">90-98%</div>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Target germination and survival range from the Bio-Boosted model.
                    </p>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-white">30-50%</div>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Seed waste reduction versus traditional direct sowing.
                    </p>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-white">15-30%</div>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Yield improvement potential when the full system is followed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-white px-6 py-20 text-ink lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-24 border-t border-ink/10 pt-6">
              <Eyebrow>Market and ecosystem</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
                Kisan Mall, market linkage, and Agri Park should feel connected, not random.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
                Kisan Mall is the retail gateway. Market linkage is the farmer's revenue gateway.
                Agri Park is the trust gateway where partners, farmers, and buyers can see the full
                crop journey on real land.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <InlineCta href="/agri-park">Visit Agri Park</InlineCta>
                <InlineCta href="/services/market-linkage" variant="light">
                  Review market linkage
                </InlineCta>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-[#DDE7E1] bg-bone p-6 md:p-8">
                <ShoppingBasket className="mb-8 h-6 w-6 text-forest" />
                <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                  Kisan Mall as a trust and distribution node.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#59635D]">
                  Instead of throwing a mall section into the homepage, the landing page now explains
                  why it exists: verified inputs, prescriptions, farmer education, and manufacturer
                  access under one roof.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
                <img src={marketImg} alt="Harvest and market linkage" className="h-full min-h-[320px] w-full object-cover" />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
              <img src={agroPark} alt="Agaate integrated Agri Park" className="h-[340px] w-full object-cover" />
              <div className="p-6 md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                    India's first integrated Agri Park concept.
                  </h3>
                  <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-terracotta">
                    Live demonstration farm
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-[#59635D]">
                  One Agaate farm where seed, nursery, irrigation, nutrition, protection, technology,
                  training, and market partners can be demonstrated on real crops through one walk.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {parkZones.map((zone) => (
                    <span
                      key={zone}
                      className="rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-semibold text-forest-deep"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { img: heroPlant, title: "Preventive crop care", icon: ShieldCheck },
                { img: irrigationImg, title: "Precision irrigation", icon: Leaf },
                { img: droneImg, title: "Drone and field intelligence", icon: Cpu },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-white">
                    <img src={item.img} alt={item.title} className="h-40 w-full object-cover" />
                    <div className="flex items-center gap-3 p-4">
                      <Icon className="h-4 w-4 text-forest" />
                      <span className="text-sm font-semibold text-forest-deep">{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone px-6 py-20 text-ink lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Eyebrow>People and governance</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
                Investors need to see who runs the field engine.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
                The leadership story is operational: founder vision, supply execution, nursery and
                retail infrastructure, agronomy, and data strategy. Corporate materials can then go
                deeper into Anzix Farm Technologies Private Limited diligence details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {leadership.map((person) => (
              <Link
                key={person.name}
                to="/about"
                className="group overflow-hidden rounded-lg border border-[#DDE7E1] bg-white transition-colors hover:border-forest/50"
              >
                <div className="relative h-56 overflow-hidden bg-[#EDF3EF]">
                  <img
                    src={person.image}
                    alt={`${person.name}, ${person.role}`}
                    className="absolute bottom-0 left-1/2 h-56 w-auto -translate-x-1/2 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl leading-tight text-forest-deep">{person.name}</h3>
                  <p className="mt-1 font-jet text-[10px] uppercase tracking-[0.16em] text-terracotta">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#59635D]">{person.focus}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
              <MapPin className="mb-6 h-5 w-5 text-forest" />
              <h3 className="font-semibold text-forest-deep">Farm and production facility</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
                NH8, opposite Bikanervala, Kukrola, Gurugram, Haryana 122413.
              </p>
            </div>
            <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
              <Store className="mb-6 h-5 w-5 text-forest" />
              <h3 className="font-semibold text-forest-deep">Retail and experience center</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
                Agaate Kisan Mall, Bilaspur Road, Bhora Kalan, Gurugram.
              </p>
            </div>
            <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
              <ShieldCheck className="mb-6 h-5 w-5 text-forest" />
              <h3 className="font-semibold text-forest-deep">Corporate entity</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
                Anzix Farm Technologies Private Limited. Investor diligence available on request.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <InlineCta href="/about">Meet the leadership team</InlineCta>
            <InlineCta href="/contact" variant="light">
              Contact investor desk
            </InlineCta>
          </div>
        </div>
      </section>
    </>
  );
}
