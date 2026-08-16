import { createFileRoute, useParams } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FarmTechHero,
  TelemetryLiveChart,
  AiDiagnosticSimulator,
  TechModulesGrid,
  CropCycleWorkflow,
  FieldNetwork,
} from "@/components/farm-tech";

export const Route = createFileRoute("/{-$locale}/services/farm-tech")({
  head: () => ({
    meta: [
      { title: "IoT Sensors, Drones & AI Precision Farming | Agaate" },
      {
        name: "description",
        content:
          "Precision farming technology: subterranean soil telemetry, AI photo disease detection, multi-spectral drone scouting, and automated fertigation systems.",
      },
    ],
  }),
  component: FarmTech,
});

function FarmTech() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <FarmTechHero currentLang={currentLang} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <TelemetryLiveChart />
        <AiDiagnosticSimulator />
        <TechModulesGrid />
        <FieldNetwork />
        <CropCycleWorkflow currentLang={currentLang} />
      </div>
      <Footer />
    </main>
  );
}

export default FarmTech;
