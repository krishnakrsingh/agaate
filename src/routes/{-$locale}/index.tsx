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
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/{-$locale}/services/")({
  head: () => ({
    meta: [
      { title: "All 6 Agricultural Services & Smart Solutions | Agaate" },
      {
        name: "description",
        content:
          "India's premier end-to-end scientific farming platform: Bio-Boosted plug nursery, Kisaan Mall inputs, IoT farm tech & drone scans, verified carbon credits, turnkey farm setups, and guaranteed buyback floor pricing.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { locale } = useParams({ strict: false }) as any;
  const { i18n } = useTranslation();
  const currentLang = locale ?? i18n.language ?? "en";

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <ServicesHero currentLang={currentLang} />
      <ServicesGrid currentLang={currentLang} />
      <CropJourneyStepper />
      <SowingComparisonCalculator />
      <ServicesImpactMetrics currentLang={currentLang} />
      <Footer />
    </main>
  );
}

export default ServicesPage;
