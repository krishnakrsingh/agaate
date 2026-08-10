import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import ValuesTriptych from "@/components/about/ValuesTriptych";
import ImpactScaleReach from "@/components/about/ImpactScaleReach";
import LeadershipRoster from "@/components/about/LeadershipRoster";
import FootprintSection from "@/components/about/FootprintSection";
import BrandsAssociationsChapter from "@/components/home/BrandsAssociationsChapter";
import AboutCta from "@/components/about/AboutCta";

export const Route = createFileRoute("/{-$locale}/about")({
  component: About,
});

function About() {
  return (
    <main className="min-h-screen bg-white font-sans text-ink antialiased">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <ValuesTriptych />
      <ImpactScaleReach />
      <LeadershipRoster />
      <FootprintSection />
      <BrandsAssociationsChapter />
      <AboutCta />
      <Footer />
    </main>
  );
}
