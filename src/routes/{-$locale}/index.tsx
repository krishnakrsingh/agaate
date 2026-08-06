import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Homepage Sections
import SectionHero from "@/components/sections/SectionHero";
import SectionCropWorld from "@/components/sections/SectionCropWorld";
import FieldSignal from "@/components/home/FieldSignal";
import PeopleChapter from "@/components/home/PeopleChapter";
import AppChapter from "@/components/home/AppChapter";
import MallChapter from "@/components/home/MallChapter";
import AgriParkChapter from "@/components/home/AgriParkChapter";
import ProofChapter from "@/components/home/ProofChapter";
import ClosingChapter from "@/components/home/ClosingChapter";

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

        {/* Section 3: Farmer pain points — establish empathy first */}
        <FieldSignal />

        {/* Section 4: Who Agaate is — build trust before products */}
        <PeopleChapter />

        {/* Section 5: Talk to Agronomist App — first product */}
        <AppChapter />

        {/* Section 6: Agaate Kisaan Mall — inputs after advice */}
        <MallChapter />

        {/* Section 7: Agri Park & Bio-Boosted Nursery — physical proof */}
        <AgriParkChapter />

        {/* Section 8: Trust, stats, and social proof */}
        <ProofChapter />

        {/* Section 9: Final conversion — three clear paths */}
        <ClosingChapter />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
