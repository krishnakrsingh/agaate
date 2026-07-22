import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Homepage Sections
import SectionHero from "@/components/sections/SectionHero";
import SectionCropWorld from "@/components/sections/SectionCropWorld";
import SectionValueProp from "@/components/sections/SectionValueProp";
import BridgeChapter from "@/components/home/BridgeChapter";
import AppChapter from "@/components/home/AppChapter";
import SectionKisaanMall from "@/components/sections/SectionKisaanMall";
import ScienceChapter from "@/components/home/ScienceChapter";
import NurseryChapter from "@/components/home/NurseryChapter";
import AgriParkChapter from "@/components/home/AgriParkChapter";
import BeyondChapter from "@/components/home/BeyondChapter";
import ProofChapter from "@/components/home/ProofChapter";
import SectionInvestorNarrative from "@/components/sections/SectionInvestorNarrative";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate — Connected Agri-Ecosystem" },
      {
        name: "description",
        content:
          "Agaate is a connected agri-ecosystem combining Bio-Boosted nursery infrastructure, input commerce, farm technology, advisory, market linkage, and carbon-credit enablement.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleWipeStart = useCallback(() => {
    setStartHeroAnimation(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setContentReady(true);
  }, []);

  useScrollTriggerRefresh(contentReady);

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={handleComplete}
          videoLoaded={videoLoaded}
          onWipeStart={handleWipeStart}
        />
      )}
      <main className="bg-white text-ink antialiased">
        <Header />
        {/* Section 1: Hero Section */}
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />
        {contentReady && (
          <>
            {/* Section 2: Interactive Crop Lifecycle Deep Dive */}
            <SectionCropWorld />

            {/* Section 3: Value Proposition & Core Manifesto */}
            <SectionValueProp />

            {/* Section 4: Where Agaate Becomes Useful (Farmer's Question) */}
            <BridgeChapter />

            {/* Section 5: The Agaate App & Agronomist Advisory */}
            <AppChapter />

            {/* Section 6: Agaate Kisaan Mall (Input Commerce) */}
            <SectionKisaanMall />

            {/* Section 7: Farm Science & Seedling Quality */}
            <ScienceChapter />

            {/* Section 8: 17-Acre Smart Nursery (Dark Forest Accent Section) */}
            <NurseryChapter />

            {/* Section 9: Agaate Agri Park (Living Demonstration Farm) */}
            <AgriParkChapter />

            {/* Section 10: Advanced Services (Farm Tech, Carbon & Setup) */}
            <BeyondChapter />

            {/* Section 11: Impact Proof & Farmer Testimonial */}
            <ProofChapter />

            {/* Section 12: Investor & Ecosystem Governance Narrative */}
            <SectionInvestorNarrative />

            {/* Footer */}
            <Footer />
          </>
        )}
      </main>
    </>
  );
}

