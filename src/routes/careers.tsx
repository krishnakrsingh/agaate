import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Briefcase, MapPin, Send, HelpCircle, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  const categories = ["All", "Agronomy", "Technology", "Logistics"];

  const jobs = [
    {
      title: "Lead Field Agronomist",
      dept: "Agronomy",
      location: "Bhora Kalan Cluster, HR",
      type: "Full-Time",
      desc: "Supervise regional seed planning trial plots, coordinate leaf pathology assays, and guide farmer crop schedules.",
      req: "B.Sc/M.Sc in Agriculture with 3+ years of field experience in vegetable farming.",
    },
    {
      title: "IoT Firmware Engineer",
      dept: "Technology",
      location: "Gurugram Office, HR",
      type: "Full-Time",
      desc: "Design low-power firmware scripts for soil moisture nodes, LoRa mesh transceivers, and weather station microcontrollers.",
      req: "B.Tech/M.Tech in ECE/CS with experience in C/C++, RTOS, and wireless telemetry.",
    },
    {
      title: "Supply Chain Operations Lead",
      dept: "Logistics",
      location: "Haryana Hub",
      type: "Full-Time",
      desc: "Coordinate bulk seedling distribution maps from the 17-acre nursery to grower groups. Manage cold transport assets.",
      req: "Experience in agricultural cold chains or rural supply logistics.",
    },
    {
      title: "Regional Sales & Support Officer",
      dept: "Logistics",
      location: "Jhajjar/Rohtak, HR",
      type: "Full-Time",
      desc: "Lead customer onboarding programs for Agaate Kisan Malls, coordinate wholesale pricing buybacks, and manage buyer relations.",
      req: "Strong communication in local dialect and 2+ years of input sales experience.",
    },
  ];

  const filteredJobs =
    selectedCategory === "All" ? jobs : jobs.filter((j) => j.dept === selectedCategory);

  const handleApply = (title: string) => {
    setAppliedJob(title);
    setTimeout(() => setAppliedJob(null), 3000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            CAREERS AT AGAATE
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Cultivate the <span className="italic text-terracotta">future.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            We are hiring agronomists, logistics leaders, and software engineers to build the
            infrastructure that helps Indian vegetable farmers grow with data-driven confidence.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow">
        {/* Culture Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-[2rem] bg-bone/35 border border-[#E7ECE8]">
            <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-deep mb-3">Field Impact</h3>
            <p className="text-[#59635D] text-sm leading-relaxed">
              Your code, operational mapping, or agronomic inputs immediately reduce seed mortality
              and save farmer resources in the real soil.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-bone/35 border border-[#E7ECE8]">
            <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-deep mb-3">
              Scientific Precision
            </h3>
            <p className="text-[#59635D] text-sm leading-relaxed">
              We replace traditional farm heuristics with lab verified assays, satellite index
              analytics, and calibrated nutrient formulations.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-bone/35 border border-[#E7ECE8]">
            <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-6">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-deep mb-3">Community First</h3>
            <p className="text-[#59635D] text-sm leading-relaxed">
              Our business grows when our farmers yield higher returns. We align all employee
              metrics to real farm profitability gains.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="border-t border-[#E7ECE8] pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Join Our Team
              </span>
              <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
                Open roles
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-forest text-cream border border-forest"
                      : "bg-bone/50 border border-[#E7ECE8] text-forest/70 hover:border-forest"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.title}
                className="p-8 rounded-[2rem] border border-[#E7ECE8] bg-white hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-[9px] font-bold tracking-wider uppercase bg-forest/5 text-forest border border-forest/10 px-2 py-0.5 rounded">
                      {job.dept}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-forest/50 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                    {job.title}
                  </h3>
                  <p className="text-[#59635D] text-sm leading-relaxed mb-4">{job.desc}</p>
                  <p className="text-forest/60 text-xs italic font-medium">
                    Requirements: {job.req}
                  </p>
                </div>

                <button
                  onClick={() => handleApply(job.title)}
                  className="rounded-full bg-forest-deep hover:bg-forest text-cream font-semibold text-xs md:text-sm px-6 py-3.5 transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
                >
                  {appliedJob === job.title ? (
                    <>
                      <span>Application Sent</span>
                      <Send className="w-4 h-4 animate-bounce" />
                    </>
                  ) : (
                    <>
                      <span>Apply Now</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="p-12 text-center text-forest/40 font-mono text-sm bg-bone/35 rounded-2xl">
                No active roles found in this category. Check back soon!
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
