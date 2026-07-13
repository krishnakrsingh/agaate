import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroPlant from "@/assets/hero-plant.jpg";
import rottenPlant from "@/assets/rotten-plant.jpg";
import agroPark from "@/assets/agro-park.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import pSeeds from "@/assets/product-seeds.jpg";
import pFert from "@/assets/product-fertiliser.jpg";
import pIrr from "@/assets/product-irrigation.jpg";
import pTools from "@/assets/product-tools.jpg";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlantJourney from "@/components/PlantJourney";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agaate Farm Tech — We grow with you, at every stage" },
      { name: "description", content: "From seed to harvest, Agaate stands with India's farmers. Science-backed inputs, an AI agronomist in your pocket, and a marketplace built on trust." },
      { property: "og:title", content: "Agaate Farm Tech — We grow with you" },
      { property: "og:description", content: "Science-backed agritech for India's farmers — from seed to harvest." },
      { property: "og:image", content: "" },
    ],
  }),
  component: Index,
});





function Crisis() {
  return (
    <section className="relative bg-ink h-screen overflow-hidden">
      <div className="grid h-full grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 relative bg-ink flex items-center justify-center p-8">
          <div className="relative w-full max-w-sm aspect-[3/4]">
            <img src={rottenPlant} alt="Diseased plant" className="absolute inset-0 h-full w-full object-cover grayscale" loading="lazy" />
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <div className="label-mono text-terracotta/80 mb-6">— 03 · The Crisis</div>
          <h2 className="font-display text-cream text-5xl md:text-7xl leading-[1.05]">
            But what happens<br/>
            <span className="italic text-cream/50">when things</span><br/>
            <span className="italic text-cream/50">go wrong?</span>
          </h2>
          <p className="mt-10 text-cream/40 max-w-md text-lg">
            Disease. Drought. A bad season. Every farmer knows the weight of it. So do we.
          </p>
        </div>
      </div>
    </section>
  );
}

function AppSection() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="label-mono mb-4">— 04 · Relief in your pocket</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-forest-deep mb-6">
              Talk to an <span className="italic">agronomist.</span> Today, not next week.
            </h2>
            <p className="text-ink/70 text-lg mb-10">When the plant doesn't look right, you don't need a textbook. You need someone who knows. The Agaate app is exactly that — open 24 hours, in your language.</p>
            <ul className="space-y-4 mb-10">
              {["24/7 chat with certified agronomists", "AI diagnosis from a single photo", "Available in 11 Indian languages"].map((f, i) => (
                <li key={f} className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-terracotta">0{i+1}</span>
                  <span className="text-ink/90 text-base">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <a href="#" className="inline-flex items-center gap-2 bg-forest-deep text-cream px-6 py-3 text-sm hover:bg-ink transition-colors">▶ Play Store</a>
              <a href="#" className="inline-flex items-center gap-2 border border-forest-deep text-forest-deep px-6 py-3 text-sm hover:bg-forest-deep hover:text-cream transition-colors">⌘ App Store</a>
            </div>
          </div>
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-moss/10 rounded-full blur-3xl" />
              <div className="relative w-[280px] md:w-[320px] aspect-[9/19] rounded-[2.5rem] border-[10px] border-ink bg-forest-deep overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-10" />
                <div className="h-full w-full p-4 pt-12 flex flex-col gap-3">
                  <div className="label-mono text-cream/60">Agaate · Live</div>
                  <div className="bg-cream/10 rounded-2xl p-3 text-cream text-xs">My tomato leaves have yellow spots. What should I do?</div>
                  <div className="bg-moss/30 rounded-2xl p-3 text-cream text-xs ml-6">Likely early blight. Spray neem oil this evening. Photo guide coming →</div>
                  <div className="bg-cream/10 rounded-2xl p-3 text-cream text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" /> Dr. Meera is typing…</div>
                  <div className="mt-auto bg-cream/10 rounded-full px-4 py-2 text-cream/50 text-xs">Type a message…</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const slides = [
  { tag: "Agro Park", title: "A campus built for what's next.", body: "200 acres of fields, labs, and greenhouses where research meets the soil. Open to partners, students, and farmers alike." },
  { tag: "Partner Companies", title: "Twelve teams. One mission.", body: "From seed genetics to post-harvest logistics — the companies inside our park each solve one piece of the puzzle." },
  { tag: "Pharma Testing", title: "Every input, proven on real fields.", body: "Before any formulation reaches a farmer, it spends seasons under our agronomists' watch. No shortcuts." },
  { tag: "Sapling Selection", title: "Only the strongest leave the nursery.", body: "Hand-graded saplings, sorted by root vigor and disease resistance. Yield begins long before planting." },
];

function Research() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <section className="bg-forest-deep text-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <div className="label-mono text-cream/60 mb-3">— 05 · Agro Park & Science</div>
            <h2 className="font-display text-5xl md:text-6xl">Where the science <span className="italic">happens.</span></h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => setI((x) => (x - 1 + slides.length) % slides.length)} className="w-12 h-12 border border-cream/30 hover:border-cream flex items-center justify-center">‹</button>
            <button onClick={() => setI((x) => (x + 1) % slides.length)} className="w-12 h-12 border border-cream/30 hover:border-cream flex items-center justify-center">›</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 aspect-[4/3] overflow-hidden">
            <img src={agroPark} alt="Agaate Agro Park research lab" width={1400} height={1000} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div key={s.tag} className="md:col-span-5 animate-in fade-in duration-700">
            <div className="label-mono text-terracotta mb-4">{s.tag}</div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight mb-6">{s.title}</h3>
            <p className="text-cream/70 mb-8">{s.body}</p>
            <button className="label-mono border-b border-cream/40 pb-1 hover:border-terracotta hover:text-terracotta transition-colors">Read more →</button>
          </div>
        </div>
        <div className="flex gap-2 mt-12">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-px transition-all ${idx === i ? "w-16 bg-terracotta" : "w-8 bg-cream/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const cats = ["Seeds", "Fertilisers", "Irrigation", "Tools"];
const products = [
  { img: pSeeds, name: "Heirloom Tomato Seeds", tag: "Best Seller", cat: "Seeds", price: "₹240" },
  { img: pFert, name: "Organic Soil Booster", tag: "Research Verified", cat: "Fertilisers", price: "₹520" },
  { img: pIrr, name: "Drip Irrigation Kit", tag: "New", cat: "Irrigation", price: "₹3,200" },
  { img: pTools, name: "Hand Tool Set", tag: "Farmer's Pick", cat: "Tools", price: "₹890" },
];

function Mall() {
  const [cat, setCat] = useState("Seeds");
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="label-mono mb-3">— 06 · Kisan Mall</div>
          <h2 className="font-display text-5xl md:text-6xl text-forest-deep">What you need, <span className="italic">delivered.</span></h2>
          <p className="text-ink/60 mt-4 max-w-lg mx-auto">Inputs tested in our park, priced for the farm, shipped to the village.</p>
        </div>
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`label-mono px-5 py-2 border transition-colors ${cat === c ? "bg-forest-deep text-cream border-forest-deep" : "border-ink/20 text-ink hover:border-forest-deep"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {products.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden bg-bone mb-4">
                <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="label-mono text-terracotta mb-2">{p.tag}</div>
              <div className="font-display text-xl text-forest-deep leading-tight">{p.name}</div>
              <div className="flex justify-between items-baseline mt-2">
                <div className="text-sm text-ink/60">{p.cat}</div>
                <div className="font-mono text-sm">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="inline-flex items-center gap-3 border border-forest-deep text-forest-deep px-8 py-4 label-mono hover:bg-forest-deep hover:text-cream transition-colors">Explore Kisan Mall →</a>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { img: t1, name: "Ramesh Patel", place: "Anand, Gujarat", quote: "My cotton yield is up 27% this year. The agronomist on the app caught a fungal infection before I'd even noticed it." },
  { img: t2, name: "Lakshmi Devi", place: "Warangal, Telangana", quote: "I trust the seeds because I've seen the lab they come from. That changes everything for a farmer." },
  { img: t3, name: "Arjun Singh", place: "Ludhiana, Punjab", quote: "I run 14 acres alone. Agaate is the team I couldn't afford to hire. It's in my pocket." },
];

function Proof() {
  const stats = [
    { v: "10,000+", l: "Farmers served" },
    { v: "15", l: "States covered" },
    { v: "50+", l: "Crop varieties" },
    { v: "₹4.2cr", l: "Extra farmer income, 2024" },
  ];
  const why = [
    { h: "Lab-backed, field-proven", b: "Every input is tested through full growing seasons before it ever reaches you." },
    { h: "Real humans, not bots", b: "Our agronomists are agricultural scientists, available in your language, 24/7." },
    { h: "Built for Bharat", b: "Designed around small and mid-sized farms — not industrial monoculture." },
    { h: "Fair, transparent pricing", b: "No middlemen markup. The price you see is the price we charge." },
  ];
  return (
    <section className="bg-bone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="label-mono mb-3">— 07 · Why farmers stay</div>
        <h2 className="font-display text-5xl md:text-6xl text-forest-deep mb-16 max-w-3xl">The numbers and the people <span className="italic">behind them.</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-forest-deep/20 mb-20">
          {stats.map((s, i) => (
            <div key={s.l} className={`py-8 px-6 ${i !== stats.length - 1 ? "md:border-r border-forest-deep/20" : ""} ${i < 2 ? "border-b md:border-b-0 border-forest-deep/20" : ""}`}>
              <div className="font-display text-4xl md:text-5xl text-forest-deep mb-2">{s.v}</div>
              <div className="label-mono">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-cream p-8 flex flex-col">
              <div className="font-display text-6xl text-terracotta leading-none mb-4">"</div>
              <p className="text-ink/80 mb-8 flex-1 text-[15px] leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3 hairline pt-5">
                <img src={t.img} alt={t.name} width={48} height={48} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-display text-lg text-forest-deep leading-tight">{t.name}</div>
                  <div className="label-mono text-xs">{t.place}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-forest-deep/20 pt-12">
          {why.map((w, i) => (
            <div key={w.h} className="flex gap-6">
              <div className="font-mono text-xs text-terracotta pt-1">0{i+1}</div>
              <div>
                <div className="font-display text-2xl text-forest-deep mb-2">{w.h}</div>
                <div className="text-ink/70">{w.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const logos = ["ICAR", "IARI", "Tata Agri", "Mahindra", "IIT Kgp", "NABARD"];
  return (
    <section className="bg-cream py-20 px-6 md:px-12 border-t border-forest-deep/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="label-mono">— 08 · Research partners & network</div>
          <div className="text-ink/50 text-sm">Trusted by institutions across India</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-forest-deep/10">
          {logos.map((l) => (
            <div key={l} className="bg-cream h-28 flex items-center justify-center font-display text-2xl text-ink/40 hover:text-forest-deep transition-colors">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-ink text-cream py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={heroPlant} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="label-mono text-cream/60 mb-6">— 10 · Join us</div>
        <h2 className="font-display text-5xl md:text-8xl leading-[1.02]">
          Join 10,000 farmers<br/><span className="italic text-moss">growing with Agaate.</span>
        </h2>
        <p className="mt-8 text-cream/70 text-lg max-w-xl mx-auto">Download the app. Talk to an agronomist tonight. Plant the next season with someone in your corner.</p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="inline-flex items-center justify-center gap-2 bg-terracotta text-cream px-8 py-4 label-mono hover:bg-cream hover:text-ink transition-colors">▶ Get on Play Store</a>
          <a href="#" className="inline-flex items-center justify-center gap-2 border border-cream/40 text-cream px-8 py-4 label-mono hover:bg-cream hover:text-ink transition-colors">⌘ Get on App Store</a>
        </div>
        <a href="#" className="inline-block mt-8 label-mono text-cream/60 underline underline-offset-4 hover:text-cream">or browse Kisan Mall →</a>
      </div>
    </section>
  );
}


function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <main className="bg-cream text-ink">
        <Header />
        <Hero />
        <PlantJourney />
        <Crisis />
        <AppSection />
        <Research />
        <Mall />
        <Proof />
        <Partners />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
