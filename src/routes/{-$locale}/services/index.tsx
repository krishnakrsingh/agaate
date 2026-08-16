import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServicesUnifiedMaster } from "@/components/services-unified";

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
  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <ServicesUnifiedMaster />
      <Footer />
    </main>
  );
}

export default ServicesPage;
