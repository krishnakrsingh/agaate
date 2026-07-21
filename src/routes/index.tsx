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
import SectionProductStory from "@/components/sections/SectionProductStory";
import SectionInvestorNarrative from "@/components/sections/SectionInvestorNarrative";
import SectionCta from "@/components/sections/SectionCta";

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
            <SectionCropWorld />
            <SectionValueProp />
            <SectionProductStory />
            <SectionInvestorNarrative />
            <SectionCta />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
