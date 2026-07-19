import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sprout,
  Store,
  Cpu,
  Coins,
  Hammer,
  Truck,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/services/")({
  component: Services,
});

function Services() {
  const servicesList = [
    {
      icon: Sprout,
      title: "Bio-Boosted Smart Nursery",
      desc: "Our 17-acre smart climate facility. Containerized vegetable seedlings with accelerated root density, guaranteeing higher transplant survival rates.",
      link: "/services/nursery",
      tag: "Seedlings",
      bgGradient: "from-emerald-500/10 to-teal-500/5",
    },
    {
      icon: Store,
      title: "Kisaan Mall Input Hub",
      desc: "Source 500+ authentic seeds, customized fertilizers, crop protection formulas, and machinery tools. All with agronomist prescriptions.",
      link: "/services/kisaan-mall",
      tag: "Inputs Retail",
      bgGradient: "from-amber-500/10 to-orange-500/5",
    },
    {
      icon: Cpu,
      title: "Farm Management & Tech",
      desc: "LoRa sensor arrays, solar moisture probes, and drone multispectral maps feeding direct telemetry to your advisor dashboards.",
      link: "/services/farm-tech",
      tag: "IoT & Telemetry",
      bgGradient: "from-blue-500/10 to-indigo-500/5",
    },
    {
      icon: Coins,
      title: "Carbon Credit Program",
      desc: "Verify zero-tillage and residue preservation methods with global satellites. Convert carbon offsets into bank transfers.",
      link: "/services/carbon-credits",
      tag: "Sustainability",
      bgGradient: "from-green-500/10 to-emerald-500/5",
    },
    {
      icon: Hammer,
      title: "Big Farm Turnkey Setup",
      desc: "Complete planning from bare land to first harvest. Includes automated drip loops, polyhouse design, and field management SOPs.",
      link: "/services/big-farm-setup",
      tag: "Turnkey Project",
      bgGradient: "from-orange-500/10 to-red-500/5",
    },
    {
      icon: Truck,
      title: "Direct Market Linkage",
      desc: "Contract buybacks that skip traditional auction middlemen. Clean grading assays and logistics direct to premium food buyers.",
      link: "/services/market-linkage",
      tag: "Buyer Linkage",
      bgGradient: "from-purple-500/10 to-pink-500/5",
    },
  ];

  // Wizard state
  const [wizardStep, setWizardStep] = useState(0); // 0: intro, 1: size, 2: crop, 3: pain, 4: result
  const [quizAnswers, setQuizAnswers] = useState({
    acres: "",
    crop: "",
    pain: "",
  });

  const handleNextStep = (field: string, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [field]: value }));
    setWizardStep((prev) => prev + 1);
  };

  const resetWizard = () => {
    setQuizAnswers({ acres: "", crop: "", pain: "" });
    setWizardStep(0);
  };

  const getWizardRecommendation = () => {
    const { acres, crop, pain } = quizAnswers;
    if (pain === "yields" || pain === "mortality") {
      return {
        title: "Bio-Boosted Nursery + Kisaan Mall Nutrients",
        desc: "To solve seedling mortality and boost starting vigor, start with containerized plug seedlings and match them to crop-specific basal nutrition packages.",
        primaryLink: "/services/nursery",
        secondaryLink: "/services/kisaan-mall",
      };
    } else if (pain === "water" || pain === "labor") {
      return {
        title: "Farm Management Tech + Turnkey Setup",
        desc: "Automated drip lines, solar moisture telemetry, and customized block plans will cut your water usage by 40% and save labor hours.",
        primaryLink: "/services/farm-tech",
        secondaryLink: "/services/big-farm-setup",
      };
    } else {
      return {
        title: "Market Linkage + Carbon Credits Program",
        desc: "Secure floor pricing with buyer contract buybacks and lock in sustainable cover crop practices to claim extra carbon credits payouts.",
        primaryLink: "/services/market-linkage",
        secondaryLink: "/services/carbon-credits",
      };
    }
  };

  const recommendation = getWizardRecommendation();

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            AGAATE SERVICES
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Our ecosystem <span className="italic text-terracotta">verticals.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            A closed-loop system coordinate of agricultural inputs, telemetry data monitoring, carbon
            conservation audits, and direct retail buyer integrations.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Grid display */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold mb-4">
              Explore Our Pillars
            </h2>
            <p className="text-forest/70 text-sm md:text-base">
              Click into any service vertical to use our calculators, request specific trial data, and schedule custom setups.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  to={service.link}
                  className={`group block bg-gradient-to-br ${service.bgGradient} bg-white rounded-[2rem] p-8 border border-[#E7ECE8] hover:shadow-xl hover:border-forest/30 transition-all duration-300 relative flex flex-col justify-between min-h-[340px] cursor-pointer`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-forest/10 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-forest/50 bg-[#eef3f0] px-3 py-1 rounded-full border border-forest/5 font-semibold">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl text-forest-deep font-bold mb-4 group-hover:text-forest transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-forest/70 text-sm leading-relaxed mb-6">{service.desc}</p>
                  </div>

                  <div className="font-semibold text-xs md:text-sm text-forest group-hover:text-forest-deep flex items-center gap-2 transition-colors pt-4 border-t border-[#E7ECE8]/50">
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Advisor Wizard section */}
        <div className="bg-bone rounded-[3rem] border border-[#E7ECE8] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-forest/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-terracotta font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-terracotta" />
                SMART ADVISOR
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                Not sure where to start?
              </h3>
              <p className="text-forest/75 text-sm md:text-base leading-relaxed">
                Take our 3-step recommendation survey. We will analyze your land details, primary crops, and current farming obstacles to suggest the most optimized Agaate service integration package.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7ECE8] p-8 min-h-[300px] flex flex-col justify-between shadow-sm">
              {wizardStep === 0 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="font-serif text-2xl text-forest-deep font-bold">Agaate Recommendation Quiz</h4>
                  <p className="text-sm text-forest/70 leading-relaxed">
                    Identify immediate opportunities to reduce inputs costs, lock in floor prices, and boost transplant survival rates on your acreage.
                  </p>
                  <button
                    onClick={() => setWizardStep(1)}
                    className="inline-flex items-center gap-2 rounded-full bg-forest-deep hover:bg-forest text-cream px-6 py-3 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>Start Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {wizardStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <span className="text-[10px] font-mono text-terracotta font-semibold uppercase">Step 1 of 3 · Scale</span>
                  <h4 className="font-serif text-2xl text-forest-deep font-bold">What is your total cultivated farm size?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Small (1-3 acres)", "Medium (4-15 acres)", "Large (15+ acres)"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleNextStep("acres", opt)}
                        className="py-4 border border-[#E7ECE8] rounded-xl hover:border-forest text-left px-5 hover:bg-forest/5 font-medium text-xs md:text-sm text-forest-deep transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <span className="text-[10px] font-mono text-terracotta font-semibold uppercase">Step 2 of 3 · Crops</span>
                  <h4 className="font-serif text-2xl text-forest-deep font-bold">What is your primary crop type?</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Tomato", "Chilli", "Capsicum", "Other Vegetables"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleNextStep("crop", opt)}
                        className="py-4 border border-[#E7ECE8] rounded-xl hover:border-forest text-center hover:bg-forest/5 font-medium text-xs md:text-sm text-forest-deep transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <span className="text-[10px] font-mono text-terracotta font-semibold uppercase">Step 3 of 3 · Priorities</span>
                  <h4 className="font-serif text-2xl text-forest-deep font-bold">What is your biggest current farming risk?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "High seed mortality", val: "mortality" },
                      { label: "High fertilizer & water cost", val: "water" },
                      { label: "Low mandi buyback prices", val: "mandi" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleNextStep("pain", opt.val)}
                        className="py-4 border border-[#E7ECE8] rounded-xl hover:border-forest text-left px-5 hover:bg-forest/5 font-medium text-xs md:text-sm text-forest-deep transition-all cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Recommendation Computed
                  </span>
                  <h4 className="font-serif text-3xl text-forest-deep font-bold leading-tight">
                    {recommendation.title}
                  </h4>
                  <p className="text-forest/75 text-sm leading-relaxed">
                    {recommendation.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      to={recommendation.primaryLink}
                      className="rounded-full bg-forest-deep hover:bg-forest text-cream font-semibold text-xs md:text-sm px-6 py-3 transition-all cursor-pointer shadow-md"
                    >
                      Primary Service Details
                    </Link>
                    <button
                      onClick={resetWizard}
                      className="rounded-full bg-white border border-[#E7ECE8] hover:border-forest text-forest font-semibold text-xs md:text-sm px-6 py-3 transition-all cursor-pointer"
                    >
                      Reset Survey
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System comparison table */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              ECOSYSTEM VS TRADITIONAL
            </span>
            <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
              Why growers choose closed-loop integration
            </h2>
            <p className="text-forest/70 text-sm mt-2 leading-relaxed">
              Single-point input vendors focus strictly on sales. Agaate links your entire cycle together, checking soil metrics to audit carbon payouts and securing buyer contracts before planting.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E7ECE8] rounded-[2rem] bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-bone/40 border-b border-[#E7ECE8] font-mono text-[10px] tracking-wider text-forest/50 uppercase">
                  <th className="px-6 py-4 font-bold">Farming Phase</th>
                  <th className="px-6 py-4 font-bold">Traditional Methods</th>
                  <th className="px-6 py-4 font-bold text-forest-deep flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Agaate Connected Loop
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7ECE8] font-sans">
                {[
                  {
                    phase: "Seed Germination",
                    trad: "Unverified seeds sowed directly into hot, dry soil. High damping-off disease risks, 30% mortality.",
                    agaate: "Germinated inside 17-acre sterile climate facility. Inoculated with root-boosting bio-beneficials.",
                  },
                  {
                    phase: "Fertilizer Schedule",
                    trad: "Prescribed blindly by local dealer looking to maximize chemicals sales. Leads to high costs, toxic runoff.",
                    agaate: "Prescribed strictly based on optical EC/NPK sensors, matching dosage precisely to vegetative stage.",
                  },
                  {
                    phase: "Irrigation Control",
                    trad: "Pumping diesel/electrical loops run on fixed time cycles, leading to overwatering and root asphyxiation.",
                    agaate: "Telemetric moisture tension solar probes check soil water availability, triggering drip networks only on demand.",
                  },
                  {
                    phase: "Harvest Sale",
                    trad: "Drove to mandi auctions, facing middleman cuts (10%+), pricing manipulation, and high peak waste.",
                    agaate: "Direct buyer commitments locked in. Collecting graded crop directly from regional hubs at clean prices.",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-bone/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-forest-deep border-r border-[#E7ECE8]/50 w-1/4">
                      {row.phase}
                    </td>
                    <td className="px-6 py-4 text-forest/60 w-3/8 flex items-start gap-1.5">
                      <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{row.trad}</span>
                    </td>
                    <td className="px-6 py-4 text-forest-deep font-semibold bg-emerald-50/20 w-3/8 flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{row.agaate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

