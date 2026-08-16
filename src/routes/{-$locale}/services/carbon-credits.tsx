import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CarbonHero,
  CarbonPracticesGrid,
  CarbonCalculator,
  MrvTimeline,
  CarbonAuditFeed,
  CarbonEnrolModal,
} from "@/components/carbon-credits";

export const Route = createFileRoute("/{-$locale}/services/carbon-credits")({
  head: () => ({
    meta: [
      { title: "Carbon Credits & Sustainable Ag MRV | Agaate" },
      {
        name: "description",
        content:
          "Monetise sustainable farming practices: reduced tillage, residue retention, and precision drip irrigation into verified ₹1,200/credit payouts.",
      },
    ],
  }),
  component: CarbonCredits,
});

function CarbonCredits() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <CarbonHero onOpenModal={() => setIsModalOpen(true)} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <CarbonPracticesGrid />
        <CarbonCalculator onOpenModal={() => setIsModalOpen(true)} />
        <MrvTimeline />
        <CarbonAuditFeed />
      </div>
      <CarbonEnrolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </main>
  );
}

export default CarbonCredits;
