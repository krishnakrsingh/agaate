"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ArrowRight
} from "lucide-react";

export function ContactClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col justify-center overflow-hidden bg-primary text-white pt-24 pb-12">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block"
          >
            Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 leading-tight max-w-4xl mx-auto"
          >
            Let's Grow Together
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            Whether you're a farmer looking to increase yield, an investor, or a potential partner — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* 2. Contact Methods */}
      <section className="py-12 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-24">
            {[
              { icon: <Phone size={28} />, title: "Call Us", value: "+91 94872 63498", desc: "Mon-Sat, 9AM-6PM", link: "tel:+919487263498", btnText: "Call Now" },
              { icon: <MessageCircle size={28} />, title: "WhatsApp", value: "Chat with an Expert", desc: "Fastest response time", link: "https://wa.me/919487263498", btnText: "Send Message" },
              { icon: <Mail size={28} />, title: "Email", value: "hello@agaate.in", desc: "For general inquiries", link: "mailto:hello@agaate.in", btnText: "Email Us" }
            ].map((method, i) => (
               <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 h-full flex flex-col items-center text-center group rounded-3xl">
                  <div className="w-16 h-16 bg-[#FAFAF7] text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-primary font-semibold text-lg mb-2">{method.value}</p>
                  <p className="text-gray-500 mb-8 flex-grow">{method.desc}</p>
                  <a href={method.link} className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                    {method.btnText}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Contact Form & Map */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            
            {/* Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <Card className="bg-white border-none shadow-lg p-8 md:p-12 rounded-3xl">
                <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
                <p className="text-gray-500 mb-8">We typically respond within 24 hours.</p>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="bg-gray-50 border-gray-200 py-6" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="bg-gray-50 border-gray-200 py-6" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-gray-50 border-gray-200 py-6" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <select id="subject" className="flex h-14 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Farm Consultation Request</option>
                      <option>Partnership Inquiry</option>
                      <option>Agri Park Visit Booking</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="bg-gray-50 border-gray-200 min-h-[150px] resize-none" />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg rounded-xl">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Office Info */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
              <Card className="bg-primary text-white border-none shadow-lg p-8 rounded-3xl h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Headquarters</h3>
                
                <div className="space-y-6 flex-grow">
                  <div className="flex gap-4">
                    <MapPin className="text-accent shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-bold mb-1">Agaate Agritech Pvt Ltd</p>
                      <p className="text-white/70 leading-relaxed">
                        123 Tech Park Avenue,<br/>
                        Hubli-Dharwad Highway,<br/>
                        Karnataka, India 580011
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-bold mb-4 uppercase text-sm tracking-wider text-accent">Operating Hours</h4>
                  <div className="space-y-2 text-white/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden h-48 bg-white/10 relative group">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white text-primary px-4 py-2 rounded-full font-bold text-sm shadow-lg">View on Google Maps</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center max-w-6xl">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6 leading-tight">Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Check out our frequently asked questions. We might have already answered what you're looking for.
            </p>
            <Link href="/#faq" className="inline-flex items-center justify-center whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-8 py-4 font-bold transition-colors">
              Read All FAQs
            </Link>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion className="w-full">
              {[
                { q: "How quickly do you respond to consultations?", a: "Our agronomy team typically reviews consultation requests and reaches out within 24 hours." },
                { q: "Do you offer support in local languages?", a: "Yes, our field agents and support staff speak multiple regional languages including Hindi, Kannada, Marathi, and Telugu." },
                { q: "Can I visit the Agri Park without an appointment?", a: "Walk-ins are welcome, but we highly recommend booking an appointment so we can assign an agronomist to guide you." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-gray-200">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary py-6 text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
      
      {/* 5. Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8">Ready to grow?</h2>
            <p className="text-xl text-white/80 mb-10">Skip the general inquiry and get straight to business with a free farm consultation.</p>
            <Link href="/free-farm-consultation" className="inline-flex items-center justify-center whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-5 text-xl font-bold gap-2 transition-transform hover:scale-105 shadow-lg">
              Book Free Consultation <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
