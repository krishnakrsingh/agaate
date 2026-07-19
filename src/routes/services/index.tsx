import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@tanstack/react-router";
import { Sprout, Store, Cpu, Coins, Hammer, Truck, ArrowRight, ShieldCheck } from "lucide-react";

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
    },
    {
      icon: Store,
      title: "Kisaan Mall Input Hub",
      desc: "Source 500+ authentic seeds, customized fertilizers, crop protection formulas, and machinery tools. All with agronomist prescriptions.",
      link: "/services/kisaan-mall",
      tag: "Inputs Retail",
    },
    {
      icon: Cpu,
      title: "Farm Management & Tech",
      desc: "LoRa sensor arrays, solar moisture probes, and drone multispectral maps feeding direct telemetry to your advisor dashboards.",
      link: "/services/farm-tech",
      tag: "IoT & Telemetry",
    },
    {
      icon: Coins,
      title: "Carbon Credit Program",
      desc: "Verify zero-tillage and residue preservation methods with global satellites. Convert carbon offsets into bank transfers.",
      link: "/services/carbon-credits",
      tag: "Sustainability",
    },
    {
      icon: Hammer,
      title: "Big Farm Turnkey Setup",
      desc: "Complete planning from bare land to first harvest. Includes automated drip loops, polyhouse design, and field management SOPs.",
      link: "/services/big-farm-setup",
      tag: "Turnkey Project",
    },
    {
      icon: Truck,
      title: "Direct Market Linkage",
      desc: "Contract buybacks that skip traditional auction middlemen. Clean grading assays and logistics direct to premium food buyers.",
      link: "/services/market-linkage",
      tag: "Buyer Linkage",
    },
  ];

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            AGAATE SERVICES
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Our ecosystem <span className="italic text-terracotta">verticals.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            A closed-loop system of agricultural inputs, telemetry data monitoring, carbon
            conservation audits, and direct retail sales integrations.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow space-y-24">
        {/* Grid display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                to={service.link}
                className="group block bg-bone/30 rounded-[2rem] p-8 border border-[#E7ECE8] hover:shadow-lg hover:border-forest/20 transition-all duration-300 relative flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-forest/40">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep font-bold mb-3 group-hover:text-forest transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#59635D] text-sm leading-relaxed mb-6">{service.desc}</p>
                </div>

                <div className="font-semibold text-xs md:text-sm text-forest group-hover:text-forest-deep flex items-center gap-1.5 transition-colors pt-4 border-t border-[#E7ECE8]/50">
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Integration Blueprint banner */}
        <div className="bg-bone rounded-[2rem] border border-[#E7ECE8] p-8 md:p-12 text-left">
          <div className="max-w-3xl">
            <span className="font-mono text-[9px] tracking-widest text-terracotta font-bold uppercase block mb-1">
              Ecosystem Loop
            </span>
            <h3 className="font-serif text-3xl text-forest-deep font-bold mb-4">
              How the services connect
            </h3>
            <p className="text-[#59635D] text-sm md:text-base leading-relaxed mb-6">
              Unlike single-point agricultural vendors, Agaate coordinates all inputs and data.
              Nursery outputs feed your custom fertilizer schedule, sensor telemetry audits your
              carbon credits eligibility, and crop logs guarantee retail buyers the exact quality
              grades they require.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-white text-forest px-4 py-2 rounded-full border border-forest/10 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Closed-Loop agricultural management
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
