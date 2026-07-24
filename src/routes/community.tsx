import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  MessageSquare,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  Heart,
  User,
  Ticket,
  Check,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/community")({
  component: Community,
});

function Community() {
  const [activeCrop, setActiveCrop] = useState("All");
  const [rsvpEvent, setRsvpEvent] = useState<string | null>(null);

  const posts = [
    {
      author: "Hawa Singh Yadav",
      location: "Jhajjar Block B",
      crop: "Tomato",
      text: "Tested the nursery seedling plugs this week. Vigor is excellent, roots are dense with cocopeat binding. No damping-off observed.",
      likes: 14,
      verified: true,
      time: "2 hours ago",
    },
    {
      author: "Agronomist Chanchala",
      location: "Agaate Central Lab",
      crop: "Chilli",
      text: "Warning: High morning humidity cycles are triggering early spore releases. Make sure your botanical protection spray loops are active by sunrise.",
      likes: 31,
      verified: true,
      time: "5 hours ago",
    },
    {
      author: "Abhay Ranjan",
      location: "Rohtak Hub",
      crop: "Irrigation",
      text: "Our drip loop filters require flushing every 48 hours when pumping from groundwater borewells to avoid emitter salt crusting.",
      likes: 8,
      verified: false,
      time: "1 day ago",
    },
  ];

  const events = [
    {
      id: "ev-01",
      title: "Jhajjar Drip Calibration Seminar",
      date: "August 12, 2026",
      time: "10:00 AM - 1:00 PM",
      venue: "Agaate Jhajjar Regional Hub",
      desc: "Live walk-through detailing venturi dosing calibration, sand filter cleanup, and flowmeter reading.",
    },
    {
      id: "ev-02",
      title: "Soil Carbon Masterclass",
      date: "September 05, 2026",
      time: "11:00 AM - 3:00 PM",
      venue: "Rohtak Agri Park Sector B",
      desc: "Learn to shred stubble organic biomass and apply bio-inoculants to maximize carbon payouts.",
    },
  ];

  const filteredPosts = posts.filter((p) => activeCrop === "All" || p.crop === activeCrop);

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            GROWER COMMUNITY
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Knowledge is <span className="italic text-terracotta">shared.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Join the forum network. Share telemetry data observations, check active agronomy disease
            advisories, and secure passes to regional seminars.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Discussion Board Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 text-left space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                  Grower Feed
                </span>
                <h2 className="font-serif text-4xl text-forest-deep font-bold tracking-tight">
                  Discussion Board
                </h2>
              </div>
              {/* Crop Filter pills */}
              <div className="flex gap-1.5 flex-wrap">
                {["All", "Tomato", "Chilli", "Irrigation"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCrop(c)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                      activeCrop === c
                        ? "bg-forest border-forest text-cream"
                        : "bg-card border-border text-forest/70 hover:border-forest"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Forum post items */}
            <div className="space-y-4">
              {filteredPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-[2rem] p-6 text-left space-y-4 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-deep text-sm">{post.author}</span>
                          {post.verified && (
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-forest/40 font-mono">
                          {post.location} · {post.time}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] font-bold bg-[#F9FAF9] text-forest px-2.5 py-1 rounded border border-border">
                      {post.crop.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-forest-deep/80 leading-relaxed font-sans">
                    {post.text}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono pt-3 border-t border-border/50">
                    <button className="flex items-center gap-1.5 text-forest/50 hover:text-terracotta transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-forest/50 hover:text-forest transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event RSVPs & Ticket Passes */}
          <div className="lg:col-span-4 text-left space-y-8">
            <div>
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block mb-2">
                Field Seminars
              </span>
              <h2 className="font-serif text-3xl text-forest-deep font-bold tracking-tight">
                Hub Events
              </h2>
            </div>

            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-bone rounded-[2rem] border border-border p-6 text-left space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-terracotta font-bold uppercase tracking-wider">
                      Seminar Pass
                    </span>
                    <span className="font-mono text-[9px] text-forest/50">
                      {ev.date.split(",")[0]}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest-deep leading-tight">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-forest/70 leading-relaxed font-sans">{ev.desc}</p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-forest/50 pt-2">
                    <div>
                      <span className="block text-[8px] text-forest/40">TIME</span>
                      <span className="font-bold text-forest-deep">
                        {ev.time.split(" ")[0] + " " + ev.time.split(" ")[1]}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-forest/40">VENUE</span>
                      <span className="font-bold text-forest-deep truncate block">
                        {ev.venue.split(" ")[2]}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setRsvpEvent(rsvpEvent === ev.id ? null : ev.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      rsvpEvent === ev.id
                        ? "bg-emerald-600 text-cream"
                        : "bg-card border border-border hover:border-forest text-forest"
                    }`}
                  >
                    {rsvpEvent === ev.id ? "Ticket Secured ✓" : "RSVP & Claim Pass"}
                  </button>
                </div>
              ))}
            </div>

            {/* Generated RSVP Pass Overlay Modal */}
            {rsvpEvent && (
              <div className="bg-card border border-border rounded-[2rem] p-6 text-center space-y-4 shadow-md animate-in zoom-in-95">
                <Ticket className="w-10 h-10 text-terracotta mx-auto" />
                <h4 className="font-serif text-xl font-bold text-forest-deep">
                  Digital Seminar Pass
                </h4>
                <div className="bg-bone/40 p-4 rounded-xl text-xs font-mono space-y-1.5 text-left border border-border">
                  <div className="flex justify-between">
                    <span className="text-forest/40">PASS CODE:</span>
                    <span className="font-bold text-forest-deep">
                      AG-EVENT-{rsvpEvent.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest/40">DATE:</span>
                    <span className="font-bold text-forest-deep">
                      {events.find((e) => e.id === rsvpEvent)?.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest/40">VENUE:</span>
                    <span className="font-bold text-forest-deep truncate max-w-[150px]">
                      {events.find((e) => e.id === rsvpEvent)?.venue}
                    </span>
                  </div>
                </div>
                {/* Mock Barcode */}
                <div className="h-10 bg-mono bg-[repeating-linear-gradient(90deg,var(--color-forest),var(--color-forest)_2px,transparent_2px,transparent_6px)] w-full opacity-65 border-t border-border/50 pt-2" />
                <span className="text-[9px] font-mono text-forest/40 uppercase font-bold tracking-wider">
                  Present pass barcode at regional registration desk
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
