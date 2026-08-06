import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/common/SitePage";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export const Route = createFileRoute("/{-$locale}/free-farm-consultation")({
  component: FreeFarmConsultation,
});

function FreeFarmConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [acres, setAcres] = useState(5);
  const [crop, setCrop] = useState("Tomato");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <SitePage
      eyebrow="FREE FARM CONSULTATION"
      title={
        <>
          Book an <span className="italic text-terracotta">agronomist.</span>
        </>
      }
      description="Direct scheduler for agronomist consultations and onboarding. Share your crop, acreage, and field goals — we will call you back."
    >
      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <div className="p-10 text-center bg-card border border-forest/10 rounded-[2.5rem] flex flex-col items-center justify-center min-h-[320px]">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl text-forest-deep font-bold mb-2">Request received</h3>
            <p className="text-sm text-forest/70 max-w-sm leading-relaxed">
              An Agaate agronomist will review your field profile and call to schedule your free
              consultation.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-bone rounded-[2.5rem] border border-border p-8 md:p-10 space-y-6 text-left shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                  Full name *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                  placeholder="e.g. Ramesh Yadav"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                  Phone *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                Farming acres ({acres})
              </label>
              <input
                type="range"
                min={1}
                max={100}
                value={acres}
                onChange={(e) => setAcres(parseInt(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-forest"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                Primary crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-3 py-3 text-sm focus:border-forest focus:outline-none font-semibold text-forest-deep"
              >
                <option>Tomato</option>
                <option>Chilli</option>
                <option>Capsicum</option>
                <option>Other vegetables</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                What do you need help with?
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none resize-none"
                placeholder="Seedling plan, soil issues, irrigation, market linkage…"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Schedule free consultation</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </SitePage>
  );
}
