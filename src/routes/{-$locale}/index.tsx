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
import ConversionChapter from "@/components/home/ConversionChapter";
import ClosingChapter from "@/components/home/ClosingChapter";
import AppChapter from "@/components/home/AppChapter";
import MallChapter from "@/components/home/MallChapter";

import NurseryChapter from "@/components/home/NurseryChapter";
import AgriParkChapter from "@/components/home/AgriParkChapter";
import BeyondChapter from "@/components/home/BeyondChapter";
import ProofChapter from "@/components/home/ProofChapter";

export const Route = createFileRoute("/{-$locale}/")({
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
      <main className="bg-card text-ink antialiased">
        <Header />
        {/* Section 1: Hero Section */}
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />

        {/* Section 2: Interactive Crop Lifecycle Deep Dive */}
        <SectionCropWorld />

        {/* Section 3: High-intent conversion paths */}
        <ConversionChapter />

        {/* Section 4: Why the nursery model matters */}
        <SectionValueProp />

        {/* Section 5: Smart Nursery */}
        <NurseryChapter />

        {/* Section 6: Agronomist advisory */}
        <AppChapter />

        {/* Section 7: Kisaan Mall */}
        <MallChapter />

        {/* Section 8: Advanced services */}
        <BeyondChapter />

        {/* Section 9: Agri Park */}
        <AgriParkChapter />

        {/* Section 10: Impact Proof */}
        <ProofChapter />

        {/* Final conversion */}
        <ClosingChapter />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
