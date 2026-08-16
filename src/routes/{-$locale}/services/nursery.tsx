import { createFileRoute, useParams } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  NurseryHero,
  NurseryProductionPhases,
  NurseryBatchTraceability,
  NurserySeedlingCalculator,
  NurseryFaq,
} from "@/components/nursery";

export const Route = createFileRoute("/{-$locale}/services/nursery")({
  head: () => ({
    meta: [
      { title: "17-Acre Smart Bio-Boosted Nursery | Agaate" },
      {
        name: "description",
        content:
          "Containerized, bio-boosted hybrid plug seedlings raised in 17 acres of AI-monitored climate chambers in Pachgaon/Kukrola, Gurugram. 90-98% field survival guaranteed.",
      },
    ],
  }),
  component: SmartNurseryPage,
});

function SmartNurseryPage() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <NurseryHero currentLang={currentLang} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <NurseryProductionPhases />
        <NurseryBatchTraceability />
        <NurserySeedlingCalculator />
        <NurseryFaq />
      </div>
      <Footer />
    </main>
  );
}

export default SmartNurseryPage;
