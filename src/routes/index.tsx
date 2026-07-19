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
import SectionTransformations from "@/components/sections/SectionTransformations";
import SectionProducts from "@/components/sections/SectionProducts";
import SectionSustainability from "@/components/sections/SectionSustainability";
import SectionSetupSteps from "@/components/sections/SectionSetupSteps";
import SectionMarketLinkage from "@/components/sections/SectionMarketLinkage";
import SectionImpact from "@/components/sections/SectionImpact";
import SectionServicesGrid from "@/components/sections/SectionServicesGrid";
import SectionAgriPark from "@/components/sections/SectionAgriPark";
import SectionPartners from "@/components/sections/SectionPartners";
import SectionTestimonials from "@/components/sections/SectionTestimonials";
import SectionTeamPreview from "@/components/sections/SectionTeamPreview";
import SectionCta from "@/components/sections/SectionCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate — Connected Agri-Ecosystem" },
      {
        name: "description",
        content:
          "Agaate combines trusted agricultural inputs, expert guidance, farm technology, and market access.",
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
            <SectionCropWorld />
            <SectionValueProp />
            <SectionProducts />
            <SectionSustainability />
            <SectionSetupSteps />
            <SectionTransformations />
            <SectionMarketLinkage />
            <SectionImpact />
            <SectionServicesGrid />
            <SectionAgriPark />
            <SectionPartners />
            <SectionTestimonials />
            <SectionTeamPreview />
            <SectionCta />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
