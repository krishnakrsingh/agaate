import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Homepage Sections
import SectionHero from "@/components/sections/SectionHero";
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
      { title: "Agaate — Integrated Seed-to-Market Agri Business" },
      {
        name: "description",
        content:
          "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, market linkage, and carbon monetization.",
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

            {/* Section 3: Farmer pain points — establish empathy & problem */}
            <FieldSignal />

            {/* Section 4: Talk to Agronomist App — first digital solution */}
            <AppChapter />

            {/* Section 5: Section 03 AGAATE MALL — Direct Input Commerce */}
            <MallChapter />

            {/* Section 6: Agri Park & Bio-Boosted Nursery — smart nursery & physical proof */}
            <AgriParkChapter />

            {/* Section 7: Trust, scale stats, and testimonials */}
            <ProofChapter />

            {/* Section 8: Final conversion — three clear action paths */}
            <ClosingChapter />

            {/* Footer */}
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
