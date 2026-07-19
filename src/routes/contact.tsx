import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    crop: "Tomato",
    acres: "",
    msg: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", phone: "", crop: "Tomato", acres: "", msg: "" });
    }, 4000);
  };

  return (
    <main className="bg-white text-ink antialiased min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div className="pt-36 pb-20 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8]">
        <div className="max-w-4xl mx-auto text-left">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-semibold">
            CONTACT & SUPPORT
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Connect with our <span className="italic text-terracotta">advisors.</span>
          </h1>
          <p className="text-lg md:text-xl text-forest/80 leading-relaxed font-sans max-w-2xl">
            Whether you want to source seedlings, audit your soil nutrition packages, register for
            carbon payouts, or secure buying linkage, we are on the ground to help.
          </p>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-12 bg-white max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Info Directory */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Regional Offices
              </span>
              <h2 className="font-serif text-3xl text-forest-deep font-bold tracking-tight mb-4">
                Direct channels
              </h2>
              <p className="text-[#59635D] text-sm leading-relaxed">
                Connect directly to our dedicated agronomists and operators. Call or email to
                resolve input delivery questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-bone/35 border border-[#E7ECE8] flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep mb-1">
                    Advisory Hotline
                  </h4>
                  <p className="text-xs text-forest/50 font-semibold mb-2">
                    Technical and crop scheduling
                  </p>
                  <a
                    href="tel:9487263498"
                    className="font-mono text-sm text-forest font-bold hover:underline"
                  >
                    +91 94872 63498
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bone/35 border border-[#E7ECE8] flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep mb-1">
                    General Office
                  </h4>
                  <p className="text-xs text-forest/50 font-semibold mb-2">
                    Partner registrations and input retail
                  </p>
                  <a
                    href="mailto:office@agaate.com"
                    className="font-mono text-sm text-forest font-bold hover:underline"
                  >
                    office@agaate.com
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bone/35 border border-[#E7ECE8] flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep mb-1">
                    Nursery Hub
                  </h4>
                  <p className="text-xs text-forest/50 font-semibold mb-2">
                    17-Acre container chamber
                  </p>
                  <span className="text-sm text-forest font-semibold block">
                    Bhora Kalan Region, Gurugram District, HR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-bone/20 rounded-[2rem] border border-[#E7ECE8] p-8 md:p-10">
              <div className="mb-8">
                <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                  Digital Consult
                </span>
                <h3 className="font-serif text-2xl text-forest-deep font-bold">
                  Request an advisor callback
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-forest/5 border border-forest/10 rounded-2xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in-95">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h4 className="font-serif text-2xl text-forest-deep font-bold mb-2">
                    Request Submitted
                  </h4>
                  <p className="text-sm text-forest/75 max-w-sm">
                    Thank you! An Agaate agronomist will review your soil specifications and phone
                    you back within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                        placeholder="e.g. Ramesh Yadav"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Primary Crop
                      </label>
                      <select
                        value={formState.crop}
                        onChange={(e) => setFormState({ ...formState, crop: e.target.value })}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                      >
                        <option>Tomato</option>
                        <option>Chilli</option>
                        <option>Capsicum</option>
                        <option>Cucumbers</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                        Total Acreage
                      </label>
                      <input
                        type="number"
                        value={formState.acres}
                        onChange={(e) => setFormState({ ...formState, acres: e.target.value })}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none"
                        placeholder="e.g. 5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">
                      Message / Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={formState.msg}
                      onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                      className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none resize-none"
                      placeholder="e.g. Need seedling booking availability for mid-September crop cycle..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Submit Consultation Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
