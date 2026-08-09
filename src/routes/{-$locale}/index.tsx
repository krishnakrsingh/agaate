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
import SectionStatsMarquee from "@/components/home/SectionStatsMarquee";
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
      <main className="bg-white text-ink antialiased">
        <Header />
        {/* Section 1: Hero Section */}
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />

        {/* Defer rendering heavy components until hero animation completes to prevent initial loading screen lag */}
        {contentReady && (
          <>
            {/* Stats Marquee Section */}
            <SectionStatsMarquee />

            {/* Section 2: Who Agaate is — founder vision & core commitments */}
            <PeopleChapter />

            {/* Section 3: Interactive Crop Lifecycle Deep Dive */}
            <SectionCropWorld />

            {/* Section 4: Farmer pain points — establish empathy & problem */}
            <FieldSignal />

            {/* Section 5: Talk to Agronomist App — first digital solution */}
            <AppChapter />

            {/* Section 6: Agaate Kisaan Mall — physical input store */}
            <MallChapter />

            {/* Section 7: Agri Park & Bio-Boosted Nursery — smart nursery & physical proof */}
            <AgriParkChapter />

            {/* Section 8: Trust, scale stats, and testimonials */}
            <ProofChapter />

            {/* Section 9: Final conversion — three clear action paths */}
            <ClosingChapter />

            {/* Footer */}
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
