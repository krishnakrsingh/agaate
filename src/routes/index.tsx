import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Homepage Sections
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import SectionValueProp from "@/components/sections/SectionValueProp";
import Section4 from "@/components/sections/Section4";
import Section5 from "@/components/sections/Section5";
import Section6 from "@/components/sections/Section6";
import Section7 from "@/components/sections/Section7";
import Section8 from "@/components/sections/Section8";
import Section10 from "@/components/sections/Section10";
import Section3 from "@/components/sections/Section3"; // Impact
import SectionServicesGrid from "@/components/sections/SectionServicesGrid";
import Section11 from "@/components/sections/Section11"; // Agri Park
import SectionPartners from "@/components/sections/SectionPartners"; // Partners Logo Strip
import Section9 from "@/components/sections/Section9"; // Testimonials
import SectionTeamPreview from "@/components/sections/SectionTeamPreview";
import Section12 from "@/components/sections/Section12"; // CTA

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

  useEffect(() => {
    if (!contentReady) return;

    // GSAP ScrollTrigger needs to recalculate container heights once images are loaded
    const images = document.querySelectorAll("img");
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    images.forEach((img) => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    ScrollTrigger.refresh();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1800);

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [contentReady]);

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
        <Section1
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />
        {contentReady && (
          <>
            <Section2 />
            <SectionValueProp />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <Section4 />
            <Section10 />
            <Section3 />
            <SectionServicesGrid />
            <Section11 />
            <SectionPartners />
            <Section9 />
            <SectionTeamPreview />
            <Section12 />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
