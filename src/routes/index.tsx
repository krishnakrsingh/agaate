import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Homepage Sections
import SectionHero from "@/components/sections/SectionHero";
import SectionCropWorld from "@/components/sections/SectionCropWorld";
import BridgeChapter from "@/components/home/BridgeChapter";
import AppChapter from "@/components/home/AppChapter";
import MallChapter from "@/components/home/MallChapter";
import ScienceChapter from "@/components/home/ScienceChapter";
import NurseryChapter from "@/components/home/NurseryChapter";
import AgriParkChapter from "@/components/home/AgriParkChapter";
import BeyondChapter from "@/components/home/BeyondChapter";
import ProofChapter from "@/components/home/ProofChapter";
import SectionKisaanMall from "@/components/sections/SectionKisaanMall";
import SectionValueProp from "@/components/sections/SectionValueProp";
import SectionProductStory from "@/components/sections/SectionProductStory";
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
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />
        {contentReady && (
          <>
            {/* 1. High-Level Proposition & Core Offerings */}
            <SectionValueProp />
            <SectionKisaanMall />
            
            {/* 2. The Connected Ecosystem Overview */}
            <SectionProductStory />
            
            {/* 3. The Crop Lifecycle Deep Dive */}
            <SectionCropWorld />
            
            {/* 4. The Detailed Journey Chapters */}
            <BridgeChapter />
            <AppChapter />
            <MallChapter />
            <ScienceChapter />
            <NurseryChapter />
            <AgriParkChapter />
            <BeyondChapter />
            
            {/* 5. Validation & Business Logic */}
            <ProofChapter />
            <SectionInvestorNarrative />
            
            {/* 6. Conclusion */}
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
