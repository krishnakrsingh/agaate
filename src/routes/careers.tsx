import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { JobPosition } from "@/types";
import { jobs } from "@/data/careers-data";
import {
  Briefcase,
  ShieldCheck,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [step, setStep] = useState(1);
  const [applied, setApplied] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [exp, setExp] = useState("1-3 Years");
  const [cropExp, setCropExp] = useState("");

  const handleOpenJob = (job: JobPosition) => {
    setSelectedJob(job);
    setStep(1);
    setApplied(false);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setApplied(true);
      setTimeout(() => {
        setSelectedJob(null);
        setApplied(false);
        setStep(1);
      }, 4000);
    }
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            CAREERS AT AGAATE
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Build the farm of the <span className="italic text-terracotta">future.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            We are looking for agronomists, logistics leads, and data engineers committed to making
            crop cultivation reliable and profitable for Indian growers.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Culture / Life at Agaate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "On-Field Impact",
              desc: "We don't work in high-rise bubble offices. Our engineers spend time testing hardware setups and training growers directly in Haryana fields.",
            },
            {
              title: "Scientific Rigour",
              desc: "Every intervention is backed by lab soil core assays, satellite analytics, and telemetry logs. We build evidence-based agriculture.",
            },
            {
              title: "Ecosystem Ownership",
              desc: "Growers trust us. We honor price floors and guarantee container seed delivery cycles, treating farmers as operational partners.",
            },
          ].map((c, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2.5rem] bg-card border border-border text-left hover:shadow-sm transition-all duration-300"
            >
              <h3 className="font-serif text-2xl font-bold text-forest-deep mb-4">{c.title}</h3>
              <p className="text-forest/70 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Jobs Listing */}
        <div className="border-t border-border pt-24 text-left">
          <div className="max-w-2xl mb-12">
            <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
              Active Positions
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight">
              Open Opportunities
            </h2>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleOpenJob(job)}
                className="bg-card border border-border rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-forest/20 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-2 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[9px] font-bold text-forest bg-forest/5 border border-forest/10 px-2.5 py-0.5 rounded">
                      {job.dept}
                    </span>
                    <span className="text-[10px] text-forest/50 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.loc}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest-deep font-bold">{job.title}</h3>
                  <p className="text-forest/70 text-xs md:text-sm max-w-2xl leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                <button className="flex items-center gap-1.5 text-xs font-mono font-bold text-forest-deep group-hover:text-forest flex-shrink-0">
                  <span>Apply Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Drawer / Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-forest-deep/30 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-lg bg-cream min-h-screen p-8 md:p-12 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-border relative animate-in slide-in-from-right duration-300">
            {/* Close button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-6 top-6 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-forest/65 hover:text-forest cursor-pointer shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-8 text-left">
              <div>
                <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                  Active Application
                </span>
                <h3 className="font-serif text-3xl text-forest-deep font-bold">
                  {selectedJob.title}
                </h3>
                <span className="font-mono text-[10px] text-forest/50 block mt-1">
                  {selectedJob.dept} · {selectedJob.loc}
                </span>
              </div>

              {applied ? (
                <div className="p-8 text-center bg-card border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                    Application Logged
                  </h4>
                  <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                    Thank you, your application details have been submitted. Our operations team
                    will check your profile experience logs and call within 48 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step Indicators */}
                  <div className="flex gap-2 font-mono text-[9px] font-bold text-forest/40">
                    <span className={step === 1 ? "text-forest" : ""}>01 PERSONAL</span>
                    <span>·</span>
                    <span className={step === 2 ? "text-forest" : ""}>02 EXPERIENCE</span>
                    <span>·</span>
                    <span className={step === 3 ? "text-forest" : ""}>03 SUBMIT</span>
                  </div>

                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in">
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                          Your Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                          placeholder="e.g. Sandeep Phogat"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                          Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                          placeholder="e.g. +91 99887 76655"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 animate-in fade-in">
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                          Professional Experience *
                        </label>
                        <select
                          value={exp}
                          onChange={(e) => setExp(e.target.value)}
                          className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs focus:border-forest focus:outline-none font-semibold text-forest-deep"
                        >
                          <option>1-3 Years</option>
                          <option>3-5 Years</option>
                          <option>5+ Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                          Key Crop / Hardware Experience
                        </label>
                        <input
                          type="text"
                          value={cropExp}
                          onChange={(e) => setCropExp(e.target.value)}
                          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                          placeholder="e.g. Solanaceae pathology / PCB debugging"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in leading-relaxed">
                      <div className="p-4 bg-card border border-border rounded-xl text-xs space-y-2">
                        <p>
                          <strong>Name:</strong> {name || "Not provided"}
                        </p>
                        <p>
                          <strong>Phone:</strong> {phone || "Not provided"}
                        </p>
                        <p>
                          <strong>Experience:</strong> {exp}
                        </p>
                        <p>
                          <strong>Focus Area:</strong> {cropExp || "General"}
                        </p>
                      </div>
                      <p className="text-xs text-forest/70">
                        By clicking submit, you confirm the accuracy of your details. A recruiter
                        will follow up via WhatsApp/call.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleNextStep}
                    disabled={step === 1 ? !name || !phone : false}
                    className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-forest/40 disabled:cursor-not-allowed"
                  >
                    <span>{step === 3 ? "Submit Application" : "Continue"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-border/50 text-[10px] font-mono text-forest/40 flex justify-between items-center text-left">
              <span>AG-HR-PORTAL</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 48h Response
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
