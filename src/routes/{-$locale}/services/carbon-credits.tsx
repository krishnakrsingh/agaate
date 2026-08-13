import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { ForecastPoint } from "@/types";
import { carbonPractices as practices } from "@/data/services-data";
import {
  ArrowRight,
  Bank,
  Calendar,
  CaretRight,
  Check,
  CheckCircle,
  ClipboardText,
  Coins,
  DeviceMobile,
  Drop,
  Leaf,
  Money,
  Plant,
  Recycle,
  SealCheck,
  ShieldCheck,
  Stack,
  Target,
  TrendUp,
  UserCheck,
  Wallet,
  X
} from "@phosphor-icons/react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  AnimatedHeadline,
  CountUp,
  EASE,
  MagneticButton,
  Marquee,
  motion,
  PageHero,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/common/motion";
import {
  creditFacts,
  marqueeItems,
  qualifyingPractices,
  RATE,
} from "@/components/carbon-credits/data";
import { HeroCo2Visual } from "@/components/carbon-credits/hero-visual";
import { MrvTimeline } from "@/components/carbon-credits/mrv-timeline";

export const Route = createFileRoute("/{-$locale}/services/carbon-credits")({
  component: CarbonCredits,
});

const stats = [
  { to: 1, suffix: " tCO₂e", label: "= 1 Verified Carbon Credit" },
  { to: 5, suffix: "", label: "Qualifying Sustainable Practices" },
  { to: 4, suffix: " Steps", label: "End-to-End MRV Process" },
  { to: RATE, prefix: "₹", suffix: "", label: "Payout Rate Per Verified Credit" },
];

function CarbonCredits() {
  const [selected, setSelected] = useState<string[]>(["drip", "tillage", "bio"]);
  const [acres, setAcres] = useState(25); // slider 1-100 acres
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([]);

  // Form inputs inside modal
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("Gurugram, Haryana");

  const creditsPerAc = practices
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0);

  const totalCredits = creditsPerAc * acres;
  const annualPayout = totalCredits * RATE;

  useEffect(() => {
    const data: ForecastPoint[] = Array.from({ length: 5 }, (_, i) => {
      const accumulationFactor = 1 + i * 0.18; // compounding organic soil carbon
      const carbonLocked = totalCredits * accumulationFactor;
      return {
        year: `Year 0${i + 1}`,
        "CO2 Locked (Tons)": parseFloat(carbonLocked.toFixed(1)),
        "Estimated Payout (₹)": Math.round(carbonLocked * RATE),
      };
    });
    setForecastData(data);
  }, [totalCredits]);

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
  };

  const auditsList = [
    {
      date: "Jun 15, 2026",
      type: "Sentinel-2 Orbit Satellite Scan",
      status: "Verified",
      desc: "Zero crop residue burning detected across Jhajjar Block C. Cover biomass canopy coverage confirmed at 86%.",
    },
    {
      date: "Jul 02, 2026",
      type: "Soil Organic Carbon Lab Test",
      status: "Verified",
      desc: "Soil Organic Carbon (SOC) baseline verified at 1.45% density (Gurugram Kukrola Zone).",
    },
    {
      date: "Sep 15, 2026",
      type: "Payout Settlement Schedule",
      status: "Scheduled",
      desc: "Next seasonal bank direct credit batch processing cycle post-harvest audit verification.",
    },
  ];

  const sliderPct = ((acres - 1) / 99) * 100;

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <PageHero
          eyebrow="Service Vertical · 04 · Agaate Carbon Initiative"
          title={
            <>
              Earn Extra Payouts by Farming Sustainably —{" "}
              <span className="italic text-terracotta">1 Tonne CO₂ = 1 Verified Credit.</span>
            </>
          }
          description="Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a brand-new income stream, with no extra land required."
        >
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <MagneticButton onClick={() => setIsModalOpen(true)}>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-8 py-4 text-sm font-bold text-cream shadow-xl shadow-forest/20 hover:bg-forest transition-colors">
                Enrol Your Farm
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <span className="font-jet text-[11px] font-bold uppercase tracking-[0.2em] text-forest/70">
              1 tCO₂e = 1 Verified Credit (₹1,200/Credit)
            </span>
          </div>
        </PageHero>
        <HeroCo2Visual />
      </div>

      {/* Marquee Banner */}
      <div className="relative border-y border-border bg-forest-deep py-3 text-cream">
        <Marquee duration={34}>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-4 inline-flex items-center gap-8 font-jet text-[11px] font-bold uppercase tracking-[0.22em] text-cream/90"
            >
              {item}
              <span className="text-moss">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        {/* Core Value Pillars Section */}
        <section className="relative">
          <SectionHeader
            eyebrow="What Are Carbon Credits"
            title={
              <AnimatedHeadline
                text="Earn Extra Income by Farming Sustainably"
                highlight={(w) => w === "Sustainably"}
              />
            }
            description="Good farming already saves carbon. Agaate helps you measure, verify, and monetise it — turning sustainable practices into a brand-new income stream, with no extra land required."
            align="center"
            className="mx-auto"
          />

          <Stagger
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.12}
          >
            {creditFacts.map((fact) => (
              <StaggerItem key={fact.title} variant="scale-up">
                <div className="group h-full rounded-3xl border border-forest/10 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-xl">
                  <motion.div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-sm"
                    whileHover={{ rotate: -8, scale: 1.1 }}
                  >
                    <fact.icon className="h-6 w-6" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-forest-deep">
                    {fact.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-forest/70">{fact.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Stats Bar */}
          <Stagger
            className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-forest/10 bg-bone px-8 py-8 sm:grid-cols-4 shadow-sm"
            stagger={0.1}
          >
            {stats.map((s) => (
              <StaggerItem key={s.label} variant="fade-up" className="text-center">
                <p className="font-serif text-4xl font-bold text-forest-deep md:text-5xl">
                  <CountUp to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-jet text-[9px] font-bold uppercase tracking-[0.18em] text-forest/60">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Interactive Carbon Credit Earnings & Income Calculator Section */}
        <section id="calculator" className="scroll-mt-28">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
            {/* Left Narrative Column */}
            <div className="space-y-8 text-left lg:col-span-6">
              <Reveal variant="fade-up">
                <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                  Interactive Income Estimator
                </span>
                <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight text-forest-deep md:text-5xl mt-2">
                  Turn Carbon Savings into <span className="italic text-terracotta">Direct Cash-Flow.</span>
                </h2>
              </Reveal>
              <Reveal variant="fade-up" delay={0.1}>
                <p className="text-sm leading-relaxed text-forest/75 md:text-base">
                  Every tonne of carbon dioxide equivalent (CO₂e) you lock into your soil
                  or prevent from entering the atmosphere through zero residue burning generates one verified carbon credit.
                  Agaate coordinates Sentinel-2 satellite orbit checks and on-field core audits, distributing payouts directly to grower bank accounts.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 gap-6 border-t border-border pt-6 md:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "No Extra Land Required",
                    text: "Monetise existing acreage operations. Simply implement baseline soil conservation practices.",
                  },
                  {
                    icon: TrendUp,
                    title: "End-to-End MRV Auditing",
                    text: "Agaate coordinates Soil Organic Matter (SOM) lab checks and Sentinel satellite canopy audits.",
                  },
                ].map((f, i) => (
                  <Reveal key={f.title} variant={i === 0 ? "fade-right" : "fade-left"} delay={0.1}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-forest/10 bg-forest/5 text-forest">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-forest-deep md:text-base">
                          {f.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-forest/65">{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Mandatory Guidelines Box */}
              <Reveal variant="scale-up" delay={0.15}>
                <div className="space-y-4 rounded-[2rem] border border-forest/10 bg-bone p-8">
                  <span className="block font-jet text-[9px] font-bold uppercase tracking-widest text-forest">
                    Verification Rules Guidelines
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-deep">
                    Mandatory Credit Auditing Criteria
                  </h3>
                  <ul className="space-y-3 pt-2 text-xs">
                    {[
                      "Zero residue burning: Crop stubble must be incorporated into soil beds using rota-seeders or mulchers.",
                      "Efficient drip irrigation: Water pumping energy must be reduced via precision drip line installation.",
                      "Zero tillage restriction: Deep plow inversion is restricted; shallow conservation passes are required.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-forest-deep">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right Calculator Card */}
            <div className="lg:col-span-6">
              <Reveal variant="fade-left">
                <div className="space-y-8 rounded-[2.5rem] border border-border bg-bone p-8 text-left shadow-lg">
                  <div>
                    <span className="mb-1 block font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                      Live Earnings Calculator
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-forest-deep">
                      Calculate Your Annual Carbon Payout
                    </h3>
                  </div>

                  {/* Calculator Form */}
                  <div className="space-y-6">
                    {/* Sustainable Practices Checkboxes */}
                    <div>
                      <label className="mb-3 block text-xs font-jet font-semibold uppercase tracking-wider text-forest/70">
                        Select Sustainable Practices Carried Out
                      </label>
                      <div className="space-y-2.5">
                        {practices.map((p) => {
                          const isOn = selected.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleToggle(p.id)}
                              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                                isOn
                                  ? "border-forest-deep bg-card shadow-sm"
                                  : "border-border/60 bg-cream/50 hover:bg-card"
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
                                  isOn
                                    ? "border-terracotta bg-terracotta text-cream"
                                    : "border-border bg-white"
                                }`}
                              >
                                {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                              </span>
                              <span className="min-w-0 flex-1 text-xs">
                                <span className="block font-bold text-forest-deep">{p.name}</span>
                                <span className="mt-0.5 block truncate text-[10px] text-forest/60">
                                  {p.desc}
                                </span>
                              </span>
                              <span
                                className={`font-mono text-xs ${
                                  isOn ? "font-bold text-forest" : "text-forest/40"
                                }`}
                              >
                                +{p.value.toFixed(1)} tCO₂/ac
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Acreage Slider (1 - 100 Acres) */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-jet font-semibold uppercase tracking-wider text-forest/70">
                          Total Farm Acreage
                        </label>
                        <span className="font-mono text-base font-extrabold text-forest-deep">
                          {acres} Acres
                        </span>
                      </div>
                      <div className="relative py-2">
                        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-forest/10">
                          <motion.div
                            className="h-full rounded-full bg-forest"
                            animate={{ width: `${sliderPct}%` }}
                            transition={{ type: "spring", stiffness: 180, damping: 26 }}
                          />
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={100}
                          value={acres}
                          onChange={(e) => setAcres(parseInt(e.target.value))}
                          className="relative w-full cursor-pointer appearance-none bg-transparent accent-forest"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-forest/40">
                        <span>1 Acre</span>
                        <span>50 Acres</span>
                        <span>100 Acres</span>
                      </div>
                    </div>

                    {/* Dynamic Payout Summary Grid */}
                    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 text-xs font-mono shadow-sm">
                      <div>
                        <span className="block text-forest/40 font-bold uppercase text-[9px]">
                          TOTAL CO₂ REDUCED / YR
                        </span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={totalCredits.toFixed(1)}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="block text-xl font-extrabold text-forest-deep mt-1"
                          >
                            <CountUp to={totalCredits} decimals={1} duration={0.6} /> tCO₂
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <div>
                        <span className="block text-forest/40 font-bold uppercase text-[9px]">
                          EST. ANNUAL PAYOUT (₹)
                        </span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={Math.round(annualPayout)}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="block text-xl font-extrabold text-terracotta mt-1"
                          >
                            <CountUp
                              to={annualPayout}
                              duration={0.6}
                              format={(v) => "₹" + Math.round(v).toLocaleString("en-IN")}
                            />
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Registration Trigger Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsModalOpen(true)}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-forest-deep py-4 text-sm font-bold text-cream shadow-md transition-colors hover:bg-forest"
                    >
                      <Coins className="h-4 w-4 text-moss" />
                      <span>Register for Carbon Auditing Payouts</span>
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Sustainable Practice Qualifying Matrix */}
        <section>
          <SectionHeader
            eyebrow="Qualifying Practice Matrix"
            title="Six Practices That Qualify for Carbon Income"
            description="Agaate verifies the climate-friendly practices you already run — and pays you for the carbon each one keeps out of the atmosphere."
            align="center"
            className="mx-auto"
          />
          <Stagger
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {qualifyingPractices.map((p) => (
              <StaggerItem key={p.name} variant="fade-up">
                <TiltCard className="group relative h-full rounded-3xl border border-forest/10 bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  <span className="pointer-events-none absolute right-6 top-6 font-jet text-[9px] font-bold uppercase tracking-[0.18em] text-moss bg-moss/10 px-2.5 py-1 rounded-full">
                    {p.tag}
                  </span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-deep text-cream shadow-sm">
                    <p.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-forest-deep">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-forest/70">{p.benefit}</p>
                  <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-terracotta">
                    <span className="font-jet text-[9px] uppercase tracking-[0.18em]">
                      Qualifies for CO₂ Payout
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* End-to-End MRV 4-Step Interactive Timeline */}
        <section>
          <SectionHeader
            eyebrow="End-to-End MRV Process"
            title="Measure. Report. Verify. Get Paid."
            description="No paperwork or complex audits on your plate. Agaate handles the full MRV cycle from satellite verification to direct bank transfer."
            align="center"
            className="mx-auto"
          />
          <MrvTimeline />
        </section>

        {/* Recharts 5-Year Carbon Forecast & Satellite Compliance Ledger */}
        <section className="border-t border-border pt-24 text-left">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal variant="fade-right">
              <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-md">
                <span className="mb-4 block text-[10px] font-jet font-bold uppercase text-forest/50">
                  5-Year Carbon Sequestration & Income Forecast (tCO₂e)
                </span>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" />
                      <XAxis dataKey="year" stroke="#59635D" fontSize={10} fontFamily="var(--font-mono)" />
                      <YAxis stroke="#59635D" fontSize={10} fontFamily="var(--font-mono)" />
                      <Tooltip
                        contentStyle={{
                          fontSize: "12px",
                          borderRadius: "12px",
                          border: "1px solid #E7ECE8",
                        }}
                      />
                      <Bar dataKey="CO2 Locked (Tons)" fill="var(--color-moss)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal variant="fade-left">
                <span className="block font-jet text-[10px] font-bold uppercase tracking-widest text-moss">
                  Compounding Soil Humus Value
                </span>
                <h3 className="font-serif text-4xl font-bold leading-tight text-forest-deep md:text-5xl mt-1">
                  Build Organic Soil Carbon Over Time.
                </h3>
                <p className="text-sm leading-relaxed text-forest/75 mt-4">
                  As conservation methods (zero-tillage, bio-inputs) continue over several crop cycles,
                  the organic humus layer compounds, trapping higher densities of carbon molecules annually while reducing chemical fertilizer dependency.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Satellite Compliance Ledger */}
        <section className="mx-auto max-w-4xl space-y-12 border-t border-border pt-24 text-left">
          <Reveal variant="fade-up" className="text-center">
            <span className="mb-2 block font-jet text-[10px] font-bold uppercase tracking-widest text-forest/50">
              Satellite Compliance Ledger
            </span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep">
              Live Satellite Audit Logs
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-forest/70">
              Tracking automated Sentinel satellite passes, soil sample verification tests, and payout disbursement schedules.
            </p>
          </Reveal>

          <Stagger className="space-y-4" stagger={0.14}>
            {auditsList.map((audit) => (
              <StaggerItem key={audit.date + audit.type} variant="fade-up">
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md md:flex-row md:items-center">
                  <div className="max-w-2xl space-y-1 text-left">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 rounded-lg border border-forest/10 bg-forest/5 px-2.5 py-0.5 font-mono text-[10px] font-bold text-forest">
                        <Calendar className="h-3.5 w-3.5" /> {audit.date}
                      </span>
                      <span className="text-xs font-mono font-bold text-forest-deep">
                        {audit.type}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-forest/70">{audit.desc}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${
                      audit.status === "Verified"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {audit.status}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* CTA Banner */}
        <section>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep px-8 py-20 text-center md:px-16 shadow-xl">
            <div className="relative z-10 mx-auto max-w-3xl">
              <Reveal variant="blur-in">
                <span className="mb-4 inline-block rounded-full border border-cream/20 px-4 py-1.5 font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-cream/80">
                  No Extra Land Required
                </span>
              </Reveal>
              <AnimatedHeadline
                as="h2"
                text="Good Farming Already Saves Carbon."
                className="font-serif text-4xl font-bold leading-tight text-cream md:text-6xl"
                highlight={(w) => w === "Carbon."}
              />
              <Reveal variant="fade-up" delay={0.25}>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base">
                  Enrol your farm today, keep farming the sustainable way, and let Agaate convert every verified tonne of stored CO₂ into direct bank transfers.
                </p>
              </Reveal>
              <Reveal variant="fade-up" delay={0.4}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
                  <MagneticButton onClick={() => setIsModalOpen(true)}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-bold text-forest-deep shadow-lg hover:bg-white transition-colors">
                      Enrol Your Farm
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </MagneticButton>
                  <MagneticButton as="a" href="tel:9487263498" strength={0.25}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-sm font-bold text-cream hover:bg-cream/10 transition-colors">
                      Talk to an Agronomist
                    </span>
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Farmer Carbon Program Registration Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-border bg-bone p-8 shadow-2xl text-left z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 rounded-full border border-border p-2 text-forest/60 hover:bg-card hover:text-forest cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {modalSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <CheckCircle className="h-8 w-8" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-bold text-forest-deep">Registration Successful!</h3>
                  <p className="text-xs text-forest/70 max-w-xs mx-auto leading-relaxed">
                    Your farm enrolment details have been logged. An Agaate Kisan Sathi agronomist will contact you at {farmerPhone || "your number"} to verify baseline soil parameters.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-5">
                  <div>
                    <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta">
                      Farmer Registration Form
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-forest-deep mt-1">
                      Enrol in Carbon Credit Program
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-forest/70 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-sans font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-forest/70 mb-1">
                      Mobile Number (For WhatsApp Alerts)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9812345678"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-sans font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-forest/70 mb-1">
                        Location / District
                      </label>
                      <input
                        type="text"
                        required
                        value={farmerLocation}
                        onChange={(e) => setFarmerLocation(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-sans font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-forest/70 mb-1">
                        Acreage
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={acres}
                        onChange={(e) => setAcres(parseInt(e.target.value) || 1)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-sans font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4 text-xs font-mono">
                    <span className="block text-[9px] font-bold uppercase text-forest/40">SELECTED PRACTICES</span>
                    <span className="block font-bold text-forest-deep mt-0.5">
                      {selected.length} Sustainable Methods Selected ({creditsPerAc.toFixed(1)} tCO₂/ac)
                    </span>
                    <span className="block text-terracotta font-extrabold mt-1">
                      Estimated Annual Payout: ₹{annualPayout.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep py-4 text-sm font-bold text-cream shadow-md transition-colors hover:bg-forest cursor-pointer"
                  >
                    Submit Carbon Registration
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
