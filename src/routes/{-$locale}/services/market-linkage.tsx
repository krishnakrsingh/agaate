import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MarketLinkageHero,
  CommodityPriceBoard,
  MiddlemanComparisonCalculator,
  GradingStandardsGrid,
  BuybackEnrollmentModal,
  MarketLinkageCta,
} from "@/components/market-linkage";

export const Route = createFileRoute("/{-$locale}/services/market-linkage")({
  head: () => ({
    meta: [
      { title: "Direct Buyback & Market Linkage | Agaate" },
      {
        name: "description",
        content:
          "Guaranteed market buyback contracts for farmers with zero middleman commissions, Handpick retail network access, and 24-48 hour bank payouts.",
      },
    ],
  }),
  component: MarketLinkagePage,
});

function MarketLinkagePage() {
  const [harvestQuintals, setHarvestQuintals] = useState<number>(100);
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <MarketLinkageHero onOpenModal={() => setIsModalOpen(true)} />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <CommodityPriceBoard
          selectedCropIndex={selectedCropIndex}
          onSelectCropIndex={setSelectedCropIndex}
        />
        <MiddlemanComparisonCalculator
          selectedCropIndex={selectedCropIndex}
          onSelectCropIndex={setSelectedCropIndex}
          harvestQuintals={harvestQuintals}
          onChangeHarvestQuintals={setHarvestQuintals}
        />
        <GradingStandardsGrid />
        <MarketLinkageCta onOpenModal={() => setIsModalOpen(true)} />
      </div>
      <BuybackEnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCropIndex={selectedCropIndex}
      />
      <Footer />
    </main>
  );
}

export default MarketLinkagePage;
