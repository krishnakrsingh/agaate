"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
  ArrowRight,
  MapPin,
  Clock,
  CalendarDays,
  Sun,
  Eye,
  GraduationCap,
  Store
} from "lucide-react";

export function AgriParkClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-primary text-white pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop" 
            alt="Panoramic Agri Park view" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block shadow-lg"
          >
            India's First
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold uppercase tracking-wider mb-6 leading-tight max-w-4xl mx-auto"
          >
            The Agri Park Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto font-light"
          >
            Walk the entire crop journey in one visit. See cutting-edge products perform on real crops before you implement them on your farm.
          </motion.p>
        </div>
      </section>

      {/* 2. What is Agri Park? */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6 leading-tight">Seeing Is <br/><span className="text-primary">Believing.</span></h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The Agaate Agri Park is a live demonstration farm designed specifically for farmers. It’s not a lab or a controlled greenhouse—it's a real field where we put the world's best seeds, fertilizers, and technology to the ultimate test.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                By visiting the park, you can literally walk through different stages of a crop's life cycle, compare how different treatments perform side-by-side, and consult with our resident agronomists.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <div className="font-bold text-3xl text-primary mb-1">50+</div>
                  <div className="text-sm text-gray-500 uppercase">Acres of Demo Plots</div>
                </div>
                <div>
                  <div className="font-bold text-3xl text-primary mb-1">20+</div>
                  <div className="text-sm text-gray-500 uppercase">Global Brands</div>
                </div>
                <div>
                  <div className="font-bold text-3xl text-primary mb-1">Live</div>
                  <div className="text-sm text-gray-500 uppercase">IoT Sensors</div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-[4/5] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1595822530182-0196cb95155f?q=80&w=2070&auto=format&fit=crop" alt="Farmers walking in field" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#FAFAF7] text-primary rounded-full flex items-center justify-center mb-6">
                <Eye size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Demo Plots</h3>
              <p className="text-gray-600">See seeds, nutrients, and protectants working in real soil under real weather conditions.</p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#FAFAF7] text-primary rounded-full flex items-center justify-center mb-6">
                <GraduationCap size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Expert-Led Tours</h3>
              <p className="text-gray-600">Walk the fields with our senior agronomists who explain the science behind the results.</p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#FAFAF7] text-primary rounded-full flex items-center justify-center mb-6">
                <Store size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Brand Pavilions</h3>
              <p className="text-gray-600">Interact directly with representatives from top agricultural brands all in one convenient place.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Experience Journey Map */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">The Tour Journey</h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">What to expect when you arrive at the Agaate Agri Park.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line for Mobile, Horizontal for Desktop */}
            <div className="absolute left-8 lg:left-0 lg:right-0 top-0 bottom-0 lg:bottom-auto lg:top-1/2 w-1 lg:w-full lg:h-1 bg-white/10 -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-0 rounded-full"></div>
            
            <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { title: "Arrival", desc: "Welcome center registration and coffee." },
                { title: "Nursery", desc: "Observe seedling preparation techniques." },
                { title: "Demo Fields", desc: "Side-by-side product comparisons." },
                { title: "Tech Zone", desc: "Drones and automated irrigation in action." }
              ].map((step, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="relative z-10 flex lg:flex-col items-center lg:text-center gap-6 lg:gap-0">
                  <div className="w-16 h-16 shrink-0 lg:mx-auto bg-primary border-4 border-accent text-accent font-bold text-xl rounded-full flex items-center justify-center lg:mb-6 shadow-[0_0_20px_rgba(212,255,63,0.2)]">
                    0{i+1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gallery */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">A Glimpse Inside</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
            <motion.div {...fadeInUp} className="col-span-2 row-span-2 rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop" alt="Park overview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop" alt="Working in fields" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop" alt="Tractor in field" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop" alt="Technology demo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="col-span-2 rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" alt="Lush crops" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Visiting Info */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">Plan Your Visit</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <MapPin size={24} />, title: "Location", desc: "Agaate Agri Park, Hubli-Dharwad Highway, Karnataka 580011" },
              { icon: <Clock size={24} />, title: "Timings", desc: "Open Monday to Saturday. 9:00 AM to 5:00 PM." },
              { icon: <CalendarDays size={24} />, title: "Booking", desc: "Walk-ins welcome, but booking ahead ensures an expert guide." },
              { icon: <Sun size={24} />, title: "What to Bring", desc: "Comfortable walking shoes, a hat, and a water bottle." }
            ].map((info, i) => (
               <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-[#FAFAF7] border-none shadow-sm p-8 h-full">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
                      {info.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                    <p className="text-gray-600">{info.desc}</p>
                  </Card>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8">Ready to see it in person?</h2>
            <p className="text-xl text-white/80 mb-10">Schedule a guided tour of the Agri Park with one of our senior agronomists.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-5 text-xl font-bold gap-2 transition-transform hover:scale-105 shadow-lg">
                Book a Tour <ArrowRight size={24} />
              </Link>
              <Link href="/free-farm-consultation" className="inline-flex items-center justify-center whitespace-nowrap bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-full px-10 py-5 text-xl font-bold gap-2 transition-colors">
                Get Online Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
