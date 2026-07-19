import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Building,
  User,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const [activeHub, setActiveHub] = useState("Jhajjar");
  const [intakeStep, setIntakeStep] = useState(1);
  const [intakeSubmitted, setIntakeSubmitted] = useState(false);

  // Form states
  const [acres, setAcres] = useState(5);
  const [crop, setCrop] = useState("Tomato");
  const [water, setWater] = useState("Borewell");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const hubs = [
    {
      name: "Jhajjar",
      address: "Plot 14, Industrial Area, Jhajjar, Haryana 124103",
      agronomist: "Chanchala Shukla (Lead Field Pathologist)",
      phone: "+91 98765 00104",
      email: "jhajjar.hub@agaate.com",
    },
    {
      name: "Rohtak",
      address: "Rohtak Agri Park campus, Sector 4, Rohtak, Haryana 124001",
      agronomist: "Sandeep Phogat (Regional Director)",
      phone: "+91 98765 00107",
      email: "rohtak.hub@agaate.com",
    },
    {
      name: "Gurugram",
      address: "Tower B, DLF Cyber Park, Phase II, Gurugram, Haryana 122008",
      agronomist: "Ankit Rawat (Founding Board Office)",
      phone: "+91 98765 00101",
      email: "hq@agaate.com",
    },
  ];

  const currentHub = hubs.find((h) => h.name === activeHub) || hubs[0];

  const handleNextStep = () => {
    if (intakeStep < 3) {
      setIntakeStep(intakeStep + 1);
    } else {
      setIntakeSubmitted(true);
      setTimeout(() => {
        setIntakeSubmitted(false);
        setIntakeStep(1);
        setName("");
        setPhone("");
      }, 4000);
    }
  };

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            CONTACT COOPERATIVE
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Connect with our <span className="italic text-terracotta">hubs.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Have questions about nursery slot schedules, drone mapping coverage, or buyback contract
            terms? Reach out or visit our regional hubs.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left side: Regional Hub tabs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Operational Locations
              </span>
              <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight text-left">
                Regional Coordinates
              </h2>
            </div>

            <div className="flex gap-2 border-b border-[#E7ECE8] pb-px">
              {hubs.map((hub) => (
                <button
                  key={hub.name}
                  onClick={() => setActiveHub(hub.name)}
                  className={`px-6 py-3 font-mono text-xs font-bold uppercase border-b-2 transition-all cursor-pointer ${
                    activeHub === hub.name
                      ? "border-forest text-forest-deep"
                      : "border-transparent text-forest/50 hover:text-forest"
                  }`}
                >
                  {hub.name} Hub
                </button>
              ))}
            </div>

            <div className="bg-white border border-[#E7ECE8] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] font-mono text-forest/45 uppercase block mb-1">Office Address</span>
                    <p className="text-sm md:text-base text-forest-deep font-semibold leading-relaxed">
                      {currentHub.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pt-4 border-t border-[#E7ECE8]/50">
                  <User className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-[10px] font-mono text-forest/45 uppercase block mb-1">Hub Director / Agronomist</span>
                    <p className="text-sm md:text-base text-forest-deep font-semibold leading-relaxed">
                      {currentHub.agronomist}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#E7ECE8]/50 text-xs font-mono">
                <a href={`tel:${currentHub.phone}`} className="flex gap-3 items-center p-4 bg-bone/30 border border-[#E7ECE8] rounded-xl text-forest-deep hover:border-forest transition-colors">
                  <Phone className="w-4 h-4 text-forest" />
                  <span>{currentHub.phone}</span>
                </a>
                <a href={`mailto:${currentHub.email}`} className="flex gap-3 items-center p-4 bg-bone/30 border border-[#E7ECE8] rounded-xl text-forest-deep hover:border-forest transition-colors">
                  <Mail className="w-4 h-4 text-forest" />
                  <span>{currentHub.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right side: Smart Advisory Form */}
          <div className="lg:col-span-5 bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 text-left space-y-8 shadow-sm">
            <div>
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Field Intake
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                Smart Advisor Setup
              </h3>
            </div>

            {intakeSubmitted ? (
              <div className="p-8 text-center bg-white border border-forest/10 rounded-3xl flex flex-col items-center justify-center min-h-[300px] animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-3xl text-forest-deep font-bold mb-2">
                  Intake Completed
                </h4>
                <p className="text-xs text-forest/70 max-w-xs leading-relaxed">
                  Your crop acreage profile has been logged. An agronomist from the {activeHub} hub will call with custom seed/manure schedules.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Step indicators */}
                <div className="flex gap-2 font-mono text-[9px] font-bold text-forest/40">
                  <span className={intakeStep === 1 ? "text-forest" : ""}>01 FIELD</span>
                  <span>·</span>
                  <span className={intakeStep === 2 ? "text-forest" : ""}>02 IRRIGATION</span>
                  <span>·</span>
                  <span className={intakeStep === 3 ? "text-forest" : ""}>03 CONTACT</span>
                </div>

                {intakeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Total Farming Acres ({acres} acres)</label>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={acres}
                        onChange={(e) => setAcres(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-forest/40 mt-1">
                        <span>1 Acre</span>
                        <span>100 Acres</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Primary Crop Focus</label>
                      <select
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-3 py-3 text-xs focus:border-forest focus:outline-none font-semibold text-forest-deep"
                      >
                        <option>Tomato</option>
                        <option>Chilli</option>
                        <option>Capsicum</option>
                      </select>
                    </div>
                  </div>
                )}

                {intakeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Water Distribution Method</label>
                      <select
                        value={water}
                        onChange={(e) => setWater(e.target.value)}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-3 py-3 text-xs focus:border-forest focus:outline-none font-semibold text-forest-deep"
                      >
                        <option>Borewell groundwater</option>
                        <option>Canal supply</option>
                        <option>Rainwater tank harvesting</option>
                      </select>
                    </div>
                  </div>
                )}

                {intakeStep === 3 && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Your Full Name *</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                        placeholder="e.g. Ramesh Yadav"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-wider text-forest/60 mb-2 uppercase font-semibold">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#E7ECE8] rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  disabled={intakeStep === 3 ? !name || !phone : false}
                  className="w-full rounded-xl bg-forest-deep hover:bg-forest text-cream font-semibold text-sm py-4 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-forest/40 disabled:cursor-not-allowed"
                >
                  <span>{intakeStep === 3 ? "Submit Advisory request" : "Continue"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
