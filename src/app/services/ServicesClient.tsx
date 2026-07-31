"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
  Sprout, 
  Map, 
  LineChart, 
  Leaf, 
  Tractor, 
  Cpu,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export function ServicesClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-primary text-white pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop" 
            alt="Services background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block"
          >
            What We Offer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 leading-tight max-w-4xl mx-auto"
          >
            End-to-End Solutions for Modern Farming
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            From seed selection to market access — technology-driven support at every stage of the agricultural lifecycle.
          </motion.p>
        </div>
      </section>

      {/* 2. Service Overview Grid */}
      <section className="py-24 bg-[#FAFAF7] relative z-20 -mt-10 rounded-t-[3rem] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Sprout size={32} />, title: "Crop Advisory", desc: "Personalized, stage-wise guidance for soil prep, sowing, and nutrient management." },
              { icon: <Map size={32} />, title: "Farm Management", desc: "IoT sensors, drone monitoring, and automated fertigation systems." },
              { icon: <LineChart size={32} />, title: "Market Linkage", desc: "Direct connections with major buyers, ensuring fair pricing and assured off-take." },
              { icon: <Leaf size={32} />, title: "Carbon Credit Programs", desc: "Earn extra income simply by adopting sustainable and regenerative farming practices." },
              { icon: <Tractor size={32} />, title: "Big Farm Setup", desc: "Turnkey operational solutions for setting up and managing commercial-scale farms." },
              { icon: <Cpu size={32} />, title: "AI Crop Monitoring", desc: "Early disease detection, pest management alerts, and accurate yield prediction." }
            ].map((service, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group">
                <Card className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#FAFAF7] text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>
                  <Link href="#deep-dive" className="text-primary font-semibold flex items-center gap-2 group-hover:text-accent-foreground transition-colors mt-auto">
                    Learn more <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Service Deep-Dive */}
      <section id="deep-dive" className="py-24 bg-white">
        <div className="container mx-auto px-4 space-y-32">
          
          {/* Deep Dive 1 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">Precision Crop Advisory</h2>
              <p className="text-lg text-gray-600 mb-8">
                Farming shouldn't be a guessing game. Our agronomists work with your specific soil data and hyper-local weather forecasts to provide a day-by-day plan.
              </p>
              <ul className="space-y-4">
                {[
                  "Soil testing and analysis before sowing",
                  "Customized fertigation scheduling",
                  "Real-time alerts via our mobile app"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" />
                    <span className="text-gray-800 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/free-farm-consultation" className="inline-block mt-10 bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-full font-semibold transition-colors">
                Get Advisory Plan
              </Link>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/3] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop" alt="Crop Advisory" className="w-full h-full object-cover" />
                {/* Floating UI Element */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-primary">
                    <Sprout size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Nitrogen Level</div>
                    <div className="text-xl font-bold text-primary">Optimal (42ppm)</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deep Dive 2 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/3] bg-gray-100">
                <img src="https://images.unsplash.com/photo-1530836369250-ef71a4eb5bf7?q=80&w=2070&auto=format&fit=crop" alt="AI and IoT" className="w-full h-full object-cover" />
                 {/* Floating UI Element */}
                 <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Drone Scan</div>
                    <div className="text-xl font-bold text-blue-900">0% Disease Detected</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="order-2 lg:pl-8">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">AI & IoT Farm Tech</h2>
              <p className="text-lg text-gray-600 mb-8">
                Deploying enterprise-grade technology to individual farms. We provide the hardware and the software to monitor every square inch of your land.
              </p>
              <ul className="space-y-4">
                {[
                  "Drone-based aerial multispectral imaging",
                  "In-ground moisture and NPK sensors",
                  "Automated irrigation and fertigation systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" />
                    <span className="text-gray-800 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">How It Works</h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">A simple, transparent process to onboard your farm and start growing profits.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0"></div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Sign Up", desc: "Book a free consultation and tell us about your farm." },
                { step: "02", title: "Assessment", desc: "Our experts analyze your soil, water, and climate data." },
                { step: "03", title: "Plan", desc: "Receive a tailored crop, tech, and market strategy." },
                { step: "04", title: "Execute", desc: "We support you through harvest and guarantee market linkage." }
              ].map((item, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto bg-primary border-4 border-accent text-accent font-bold text-2xl rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,255,63,0.3)]">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing / Packages */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">Partnership Plans</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Transparent pricing models designed to ensure we only succeed when you do.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1 */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow p-8 rounded-3xl h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Advisory Plan</h3>
                <p className="text-gray-500 mb-6">Perfect for small farms starting out.</p>
                <div className="text-4xl font-bold mb-8">₹999<span className="text-lg text-gray-400 font-normal"> /acre/year</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Soil Testing</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Crop Schedule App</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Phone Support</span></li>
                </ul>
                <Link href="/free-farm-consultation" className="block text-center bg-gray-100 text-gray-800 hover:bg-gray-200 py-4 rounded-xl font-bold transition-colors">Choose Plan</Link>
              </Card>
            </motion.div>

            {/* Plan 2 */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold shadow-md z-10 whitespace-nowrap">Most Popular</div>
              <Card className="bg-primary text-white border-none shadow-xl scale-105 p-8 rounded-3xl h-full flex flex-col relative z-0">
                <h3 className="text-2xl font-bold mb-2">Tech + Market</h3>
                <p className="text-white/60 mb-6">Comprehensive support and guaranteed off-take.</p>
                <div className="text-4xl font-bold text-accent mb-8">Profit Share</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Everything in Advisory</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>IoT Sensor Rental</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Agronomist Field Visits</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Guaranteed Market Linkage</span></li>
                </ul>
                <Link href="/free-farm-consultation" className="block text-center bg-accent text-primary hover:bg-accent/90 py-4 rounded-xl font-bold transition-colors">Choose Plan</Link>
              </Card>
            </motion.div>

            {/* Plan 3 */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow p-8 rounded-3xl h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Big Farm Setup</h3>
                <p className="text-gray-500 mb-6">For commercial farms 50+ acres.</p>
                <div className="text-4xl font-bold mb-8">Custom</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Turnkey Project Setup</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Automated Fertigation Setup</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 w-5 h-5" /> <span>Carbon Credit Registration</span></li>
                </ul>
                <Link href="/free-farm-consultation" className="block text-center bg-gray-100 text-gray-800 hover:bg-gray-200 py-4 rounded-xl font-bold transition-colors">Contact Sales</Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8">Let's Discuss Your Farm</h2>
            <p className="text-xl text-gray-600 mb-10">Not sure which service is right for you? Our agronomists offer a free consultation to map out a strategy.</p>
            <Link href="/free-farm-consultation" className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-5 text-xl font-bold gap-2 transition-transform hover:scale-105 shadow-lg">
              Book Free Consultation <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
