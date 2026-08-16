import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AboutHero,
  WhoWeAre,
  ValuesTriptych,
  ImpactScaleReach,
  LeadershipRoster,
  FootprintSection,
  AboutCta,
} from "@/components/about";
import { BrandsAssociationsChapter } from "@/components/home";

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
