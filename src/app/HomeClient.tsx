"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHero from "@/components/sections/SectionHero";
import SectionCropWorld from "@/components/sections/SectionCropWorld";
import { Footer } from "@/components/layout/Footer";
import { useScrollTriggerRefresh } from "@/hooks/useScrollTriggerRefresh";

export function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleWipeStart = useCallback(() => {
    setStartHeroAnimation(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleHeroAnimationComplete = useCallback(() => {
    setContentReady(true);
  }, []);

  useScrollTriggerRefresh(contentReady);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={handleComplete}
          videoLoaded={videoLoaded}
          onWipeStart={handleWipeStart}
        />
      )}
      <div className="bg-card text-ink antialiased">
        <Header />
        <SectionHero
          onVideoLoaded={handleVideoLoaded}
          startAnimation={startHeroAnimation}
          onAnimationComplete={handleHeroAnimationComplete}
        />
        {contentReady && (
          <>
            <SectionCropWorld />

            <section id="services" className="py-24 bg-primary text-white">
              <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div {...fadeInUp} className="flex gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop"
                    alt="Farm rows"
                    className="w-1/2 h-[500px] object-cover rounded-2xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
                    alt="Farmer working"
                    className="w-1/2 h-[500px] object-cover rounded-2xl mt-12"
                  />
                </motion.div>
                <motion.div {...fadeInUp} className="space-y-12 pl-0 lg:pl-12">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight uppercase">
                      INNOVATING THE FUTURE <br /> OF AGRICULTURE
                    </h2>
                    <p className="text-white/70 text-lg">
                      We empower farmers with precision technology and actionable insights to
                      maximize yield and reduce waste, creating a better future for generations.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-6xl font-bold text-white mb-2">100%</h3>
                      <p className="text-xl font-semibold">Customer Satisfaction</p>
                      <p className="text-white/60">From over thousands of farmers across India.</p>
                    </div>
                    <div className="h-px w-full bg-white/20"></div>
                    <div>
                      <h3 className="text-6xl font-bold text-white mb-2">20+</h3>
                      <p className="text-xl font-semibold">Years of Experience</p>
                      <p className="text-white/60">Combined expertise in agronomy and tech.</p>
                    </div>
                    <div className="h-px w-full bg-white/20"></div>
                    <div>
                      <h3 className="text-6xl font-bold text-white mb-2">100%</h3>
                      <p className="text-xl font-semibold">Science Backed</p>
                      <p className="text-white/60">Decisions driven by data, not guesswork.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="py-24 bg-white text-black">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <motion.h2
                    {...fadeInUp}
                    className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight uppercase"
                  >
                    WHERE TECHNOLOGY MEETS <br /> THE ROOTS OF NATURE
                  </motion.h2>
                  <motion.p {...fadeInUp} className="text-gray-500 max-w-sm mt-6 md:mt-0 text-sm">
                    Discover how our precision farming tools and data analytics are revolutionizing
                    the agricultural landscape.
                  </motion.p>
                </div>

                <motion.div
                  {...fadeInUp}
                  className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop"
                    alt="Terraced fields"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                      <Play fill="white" className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="py-24 bg-primary text-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                  <motion.h2
                    {...fadeInUp}
                    className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight uppercase"
                  >
                    WHERE TECHNOLOGY MEETS <br /> THE ROOTS OF NATURE
                  </motion.h2>
                  <motion.p {...fadeInUp} className="text-white/60 max-w-sm mt-6 md:mt-0 text-sm">
                    Explore the tools making sustainable farming possible today.
                  </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
                      title: "Sustainable Farming is the Age of Climate Change",
                      desc: "Adapt to changing weather patterns with precision data and resilient seed varieties.",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2072&auto=format&fit=crop",
                      title: "How Smart Technology is Transforming Modern Agriculture",
                      desc: "Drone monitoring, IoT sensors, and automated fertigation systems in action.",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop",
                      title: "Building a Greener Future Through Regenerative Farming",
                      desc: "Improve soil health, capture carbon, and earn credits for sustainable practices.",
                    },
                    {
                      img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
                      title: "Sustainable Farming in the Modern Era",
                      desc: "Maximize yield while minimizing environmental impact with data-backed decisions.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      {...fadeInUp}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-2xl mb-6">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="faq" className="py-24 bg-[#FAFAF7]">
              <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
                <motion.div {...fadeInUp}>
                  <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6">
                    GOT QUESTIONS? WE&apos;VE <br /> GOT YOU COVERED.
                  </h2>
                </motion.div>
                <motion.div {...fadeInUp} className="pt-4">
                  <p className="text-gray-500 mb-8">
                    Find answers to the most common questions about our services, technology, and
                    how we help farmers transition to profitable sustainability.
                  </p>
                  <Accordion className="w-full">
                    {[
                      {
                        q: "What kind of farming solutions do you offer?",
                        a: "We provide end-to-end support including crop advisory, IoT and drone-based farm management, market linkage, and carbon credit programs.",
                      },
                      {
                        q: "How can I start using Agaate platform?",
                        a: "Simply sign up for a free farm consultation and our agronomists will guide you through the onboarding process.",
                      },
                      {
                        q: "Are your technologies eco-friendly?",
                        a: "Yes, our primary focus is sustainable agriculture, reducing chemical usage, and improving soil health.",
                      },
                      {
                        q: "Do you provide support and training?",
                        a: "Absolutely. We offer hands-on training at our Agri Park and continuous support via our mobile app and field visits.",
                      },
                      {
                        q: "Can I integrate Agaate tools with my existing system?",
                        a: "Our dashboard integrates seamlessly with most modern farm management systems and IoT sensors.",
                      },
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-b-gray-200">
                        <AccordionTrigger className="text-lg font-semibold hover:text-primary py-6 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base pb-6">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </div>
            </section>

            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-12">
                <motion.div {...fadeInUp} className="lg:col-span-1">
                  <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
                    WHAT FARMERS ARE <br /> SAYING ABOUT US
                  </h2>
                  <p className="text-gray-500">
                    Real stories from real farmers who transformed their yield, profits, and
                    sustainability with Agaate.
                  </p>
                </motion.div>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                  <motion.div {...fadeInUp} className="space-y-6">
                    <Card className="bg-[#FAFAF7] border-none shadow-sm p-6 rounded-3xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Sam Lupa</h4>
                          <p className="text-sm text-gray-500">Customer</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        &quot;The Smart Irrigation System Has Completely Changed How We Manage Our
                        Farm. It&apos;s Efficient, Sustainable, And Easy To Use.&quot;
                      </p>
                    </Card>
                    <div className="rounded-3xl overflow-hidden h-[300px]">
                      <img
                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop"
                        alt="Farmer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-6 md:pt-12">
                    <div className="text-7xl text-gray-200 font-serif leading-none">&ldquo;</div>
                    <h3 className="text-2xl font-bold text-primary">
                      &quot;The Smart Irrigation System Has Completely Changed How We Manage Our
                      Farm. It&apos;s Efficient, Sustainable, And Easy To Use.&quot;
                    </h3>
                    <div className="flex gap-4 pt-4">
                      <div className="w-10 h-10 border rounded-full flex items-center justify-center text-gray-400 hover:border-black cursor-pointer">
                        ←
                      </div>
                      <div className="w-10 h-10 border rounded-full flex items-center justify-center text-gray-400 hover:border-black cursor-pointer">
                        →
                      </div>
                    </div>
                    <Card className="bg-[#FAFAF7] border-none shadow-sm p-6 rounded-3xl mt-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">Sarah Doe</h4>
                          <p className="text-sm text-gray-500">Customer</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        &quot;This app is a game changer for sustainable agriculture. It tracks every
                        detail.&quot;
                      </p>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </section>

            <Footer />
          </>
        )}
      </div>
    </>
  );
}
