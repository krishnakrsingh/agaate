import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useScrollTriggerRefresh } from "@/hooks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHero from "@/components/sections/SectionHero";
import {
  SectionStatsMarquee,
  FieldSignal,
  PillarsHorizontalParallax,
  AppChapter,
  AgriParkChapter,
  BrandsAssociationsChapter,
  PeopleChapter,
  ProofChapter,
  ClosingChapter,
} from "@/components/home";

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
      <main className="overflow-x-clip bg-white text-ink antialiased">
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
            {/* Section 2: Stats Marquee */}
            <SectionStatsMarquee />

            {/* Section 3: Farmer pain points — establish empathy & problem */}
            <FieldSignal />

            {/* Section 4: The 4 Core Integrated Pillars (Horizontal Parallax Transition) */}
            <PillarsHorizontalParallax />

            {/* Section 5: Agaate Mobile App — Interactive Digital Experience */}
            <AppChapter />

            {/* Section 6: Physical Proof — 17-Acre Smart Nursery & Agri Park Demonstration */}
            <AgriParkChapter />

            {/* Section 7: Brands & Associations — Partners, Customers & Veg Buyers */}
            <BrandsAssociationsChapter />

            {/* Section 8: Who We Are — Founder Vision & Leadership Team */}
            <PeopleChapter />

            {/* Section 9: Farmer Testimonials & Reviews */}
            <ProofChapter />

            {/* Section 10: Final Conversion — Three Clear Action Paths */}
            <ClosingChapter />

            {/* Footer */}
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
