import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlantJourney from "@/components/PlantJourney";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import Introduction from "@/components/sections/Introduction";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Mall from "@/components/sections/Mall";
import AgriTech from "@/components/sections/AgriTech";
import CarbonCredits from "@/components/sections/CarbonCredits";
import CommercialFarming from "@/components/sections/CommercialFarming";
import Testimonials from "@/components/sections/Testimonials";
import MarketAccess from "@/components/sections/MarketAccess";
import AgriPark from "@/components/sections/AgriPark";
import CTA from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate — Connected Agri-Ecosystem" },
      { name: "description", content: "Agaate combines trusted agricultural inputs, expert guidance, farm technology, and market access." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleWipeStart = useCallback(() => {
    setStartHeroAnimation(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

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
        <Hero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
        />
        {!loading && (
          <>
            <PlantJourney />
            <Introduction />
            <ProblemSolution />
            <Mall />
            <AgriTech />
            <CarbonCredits />
            <CommercialFarming />
            <Testimonials />
            <MarketAccess />
            <AgriPark />
            <CTA />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
