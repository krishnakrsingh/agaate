import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";
import { Cpu, Gauge, Radio, Satellite, ScanLine, Waves } from "lucide-react";

export const Route = createFileRoute("/{-$locale}/technology")({
  component: Technology,
});

function Technology() {
  const capabilities = [
    {
      icon: ScanLine,
      title: "Drone surveys",
      desc: "Multispectral flight paths map canopy vigor, stress zones, and irrigation gaps before they show up by eye.",
    },
    {
      icon: Radio,
      title: "IoT sensor arrays",
      desc: "LoRa moisture, EC, and microclimate probes stream field telemetry to agronomist dashboards in near real time.",
    },
    {
      icon: Gauge,
      title: "Precision soil metrics",
      desc: "Soil organic tension, nutrient availability, and stage-matched dosing replace guesswork with measured prescriptions.",
    },
    {
      icon: Satellite,
      title: "Satellite NDVI layers",
      desc: "Regional canopy indices help prioritize scouting routes and validate regenerative practice outcomes.",
    },
    {
      icon: Waves,
      title: "Irrigation intelligence",
      desc: "Demand-based drip triggers cut overwatering, diesel pump hours, and root asphyxiation risk.",
    },
    {
      icon: Cpu,
      title: "Advisor dashboards",
      desc: "Field signals, crop stage, and weather windows land in one place so recommendations stay actionable.",
    },
  ];

  return (
    <SitePage
      eyebrow="TECHNOLOGY"
      title={
        <>
          Precision tools for <span className="italic text-terracotta">every acre.</span>
        </>
      }
      description="Drone surveys, IoT sensor arrays, and precision soil metrics that turn field signals into clearer crop decisions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-8 rounded-[2.5rem] bg-card border border-border text-left transition-all duration-300 hover:border-forest/20 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mb-6 border border-forest/10">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-deep mb-4">{item.title}</h3>
              <p className="text-forest/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </SitePage>
  );
}
