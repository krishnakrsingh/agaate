"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";

export function AboutClient() {
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
            src="https://images.unsplash.com/photo-1592982537447-6f2334208f34?q=80&w=2070&auto=format&fit=crop" 
            alt="Farmer at sunrise" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block"
          >
            Our Story
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 leading-tight"
          >
            Built for Farmers.<br/>Driven by Science.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            Agaate is built for farmers, always. We stand with them through the entire crop journey, from seed to harvest and beyond.
          </motion.p>
        </div>
      </section>

      {/* 2. Mission / Vision / Values */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="bg-[#FAFAF7] p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-accent/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To stand with the farmer at every stage of the crop lifecycle, providing the exact data, tools, and market connections needed to thrive in modern agriculture.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-[#FAFAF7] p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-accent/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where farming is consistently profitable, environmentally sustainable, and driven by precise data rather than guesswork and tradition.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="bg-[#FAFAF7] p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-accent/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Science-first decision making. Farmer-centric solutions. Radical transparency in pricing and yield predictions. Unwavering commitment to the soil.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Agaate Story */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">How It Started</h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </motion.div>

          <div className="space-y-24 relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>

            {/* Block 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="hidden lg:block absolute left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-[#FAFAF7]"></div>
              <motion.div {...fadeInUp} className="order-2 lg:order-1 pr-0 lg:pr-16 text-left lg:text-right">
                <div className="text-accent font-bold text-xl mb-2">2018</div>
                <h3 className="text-3xl font-bold mb-4">Recognizing the Gap</h3>
                <p className="text-gray-600 text-lg">
                  We noticed that despite massive advances in agritech, small and medium farmers were still relying on outdated advice and guesswork. The disconnect between cutting-edge science and field-level execution was costing farmers their livelihoods.
                </p>
              </motion.div>
              <motion.div {...fadeInUp} className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef4ebb?q=80&w=2070&auto=format&fit=crop" alt="Early farm days" className="rounded-3xl shadow-lg w-full h-[400px] object-cover" />
              </motion.div>
            </div>

            {/* Block 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="hidden lg:block absolute left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-[#FAFAF7]"></div>
              <motion.div {...fadeInUp} className="order-1">
                <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop" alt="Technology introduction" className="rounded-3xl shadow-lg w-full h-[400px] object-cover" />
              </motion.div>
              <motion.div {...fadeInUp} className="order-2 pl-0 lg:pl-16">
                <div className="text-accent font-bold text-xl mb-2">2021</div>
                <h3 className="text-3xl font-bold mb-4">Building the Platform</h3>
                <p className="text-gray-600 text-lg">
                  Agaate was born. We assembled a team of agronomists, data scientists, and engineers to build a unified platform. We started deploying IoT sensors and drones to a select pilot group of farmers, demonstrating immediate yield improvements.
                </p>
              </motion.div>
            </div>

            {/* Block 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="hidden lg:block absolute left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-[#FAFAF7]"></div>
              <motion.div {...fadeInUp} className="order-2 lg:order-1 pr-0 lg:pr-16 text-left lg:text-right">
                <div className="text-accent font-bold text-xl mb-2">Today</div>
                <h3 className="text-3xl font-bold mb-4">Scaling Impact</h3>
                <p className="text-gray-600 text-lg">
                  Today, Agaate is an end-to-end ecosystem. With the launch of our physical Agri Park, our carbon credit programs, and direct market linkages, we are fundamentally changing the economics of farming across the country.
                </p>
              </motion.div>
              <motion.div {...fadeInUp} className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" alt="Modern farming" className="rounded-3xl shadow-lg w-full h-[400px] object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact Numbers */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/20">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="text-center px-4">
              <div className="text-5xl md:text-7xl font-bold text-accent mb-4">10k+</div>
              <div className="text-lg uppercase tracking-wider text-white/80">Farmers Served</div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="text-center px-4">
              <div className="text-5xl md:text-7xl font-bold text-accent mb-4">50+</div>
              <div className="text-lg uppercase tracking-wider text-white/80">Crops Covered</div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="text-center px-4">
              <div className="text-5xl md:text-7xl font-bold text-accent mb-4">15+</div>
              <div className="text-lg uppercase tracking-wider text-white/80">States Active</div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="text-center px-4">
              <div className="text-5xl md:text-7xl font-bold text-accent mb-4">100%</div>
              <div className="text-lg uppercase tracking-wider text-white/80">Commitment</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Our Team / Leadership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">Leadership Team</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">The agronomists, technologists, and visionaries driving Agaate forward.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arjun Mehta", role: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
              { name: "Dr. Sunita Rao", role: "Chief Agronomist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
              { name: "Vikram Singh", role: "Head of Technology", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" },
              { name: "Priya Desai", role: "VP of Operations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
              { name: "Rahul Verma", role: "Director of Market Linkage", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
              { name: "Ananya Patel", role: "Head of Sustainability", img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=1974&auto=format&fit=crop" },
            ].map((member, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="group">
                <Card className="bg-[#FAFAF7] border-none overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
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
            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-white/80 mb-10">Join thousands of farmers who are already seeing higher yields and better profits with Agaate.</p>
            <Link href="/free-farm-consultation" className="inline-flex items-center justify-center whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-5 text-xl font-bold gap-2 transition-transform hover:scale-105">
              Get Your Free Farm Consultation <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
