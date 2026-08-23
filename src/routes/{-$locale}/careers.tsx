import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ExtendedJobPosition } from "@/data/careers-data";
import {
  CareersHero,
  CareersCultureSection,
  OpenRolesSection,
  CampusOutreachSection,
  RoleDetailDrawer,
  ApplicationModal,
  type Filter,
} from "@/components/careers";

export const Route = createFileRoute("/{-$locale}/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Campus Outreach | Agaate" },
      {
        name: "description",
        content:
          "Join Agaate in building the future of Indian agriculture. Explore open roles across field agronomy, IoT engineering, smart nursery management, and supply chain.",
      },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [selectedJob, setSelectedJob] = useState<ExtendedJobPosition | null>(null);
  const [drawerJob, setDrawerJob] = useState<ExtendedJobPosition | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <main className="flex min-h-screen flex-col bg-cream font-sans text-ink antialiased">
      <Header />
      <CareersHero />
      <div className="mx-auto w-full max-w-7xl flex-grow space-y-32 px-6 py-24 lg:px-12">
        <CareersCultureSection />
        <OpenRolesSection
          filter={filter}
          onFilterChange={setFilter}
          onSelectRole={(job) => setDrawerJob(job)}
          onApplyDirect={(job) => setSelectedJob(job)}
        />
        <CampusOutreachSection />
      </div>
      <RoleDetailDrawer
        role={drawerJob}
        onClose={() => setDrawerJob(null)}
        onApply={(role) => setSelectedJob(role)}
      />
      <ApplicationModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <Footer />
    </main>
  );
}
