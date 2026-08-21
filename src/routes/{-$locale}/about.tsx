import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AboutHero,
  WhoWeAre,
  ValuesTriptych,
  ImpactScaleReach,
  MilestonesSection,
  LeadershipRoster,
  FootprintSection,
  AboutCta,
} from "@/components/about";

export const Route = createFileRoute("/{-$locale}/about")({
  head: () => ({
    meta: [
      { title: "About Us — Agaate | Rooted in Science, Built for Farmers" },
      {
        name: "description",
        content:
          "Agaate is an integrated agricultural enterprise combining Bio-Boosted seedling infrastructure, input commerce, on-ground field advisory, and sustainable market linkage.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="min-h-screen bg-[#f4f8f5] font-sans text-[#143d31] antialiased overflow-x-clip">
      <Header />
      <AboutHero />
      <WhoWeAre />
      <ValuesTriptych />
      <ImpactScaleReach />
      <MilestonesSection />
      <LeadershipRoster />
      <FootprintSection />
      <AboutCta />
      <Footer />
    </main>
  );
}

