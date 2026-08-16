import { createFileRoute, useParams } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ServicesHero,
  ServicesGrid,
  CropJourneyStepper,
  SowingComparisonCalculator,
  ServicesImpactMetrics,
} from "@/components/services-overview";

export const Route = createFileRoute("/{-$locale}/services/")({
  head: () => ({
    meta: [
      { title: "Agricultural Services & Smart Agri Solutions | Agaate" },
      {
        name: "description",
        content:
          "End-to-end scientific farming services from Bio-Boosted plug nursery, Kisaan Mall inputs, AI field advisory, carbon credits, turnkey farm setups, to guaranteed market linkages.",
      },
    ],
  }),
  component: ServicesOverview,
});

function ServicesOverview() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <ServicesHero currentLang={currentLang} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <ServicesGrid currentLang={currentLang} />
        <CropJourneyStepper />
        <SowingComparisonCalculator />
        <ServicesImpactMetrics currentLang={currentLang} />
      </div>
      <Footer />
    </main>
  );
}

export default ServicesOverview;
