import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CommunityHero,
  CommunityCaseStudies,
  WhatsAppWorkflowSimulator,
  CommunityFeedSection,
  ParivaarRegistrationModal,
} from "@/components/community";

export const Route = createFileRoute("/{-$locale}/community")({
  head: () => ({
    meta: [
      { title: "Agaate Parivaar | Farmer Community & Field Advisory" },
      {
        name: "description",
        content:
          "Join 2,000+ Parivaar farmers across India. Get daily WhatsApp stage advisory, photo disease diagnosis, verified yield case studies, and guaranteed buyback floor prices.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Header />
      <CommunityHero onOpenModal={() => setIsModalOpen(true)} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <CommunityCaseStudies />
        <WhatsAppWorkflowSimulator />
        <CommunityFeedSection />
      </div>
      <ParivaarRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </main>
  );
}
