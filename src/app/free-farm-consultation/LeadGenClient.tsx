"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Leaf, Shield, TrendingUp, Users } from "lucide-react";

export function LeadGenClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
            alt="Farm landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Get Free Expert Guidance for Your Farm
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/90">
              Receive crop-specific recommendations, scientific farming support, disease diagnosis assistance, and market access opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-accent" />
                <span>Zero Guesswork</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-accent" />
                <span>Higher Yields</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-accent" />
                <span>Better Pricing</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card text-card-foreground shadow-2xl border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Book Your Free Consultation</CardTitle>
                <CardDescription>Fill out the details below and our agronomist will contact you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Rajesh Kumar" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="e.g. Maharashtra" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input id="district" placeholder="e.g. Pune" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village">Village / Taluka</Label>
                    <Input id="village" placeholder="Your village name" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="crop">Primary Crop Type</Label>
                      <Input id="crop" placeholder="e.g. Tomato, Cotton" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Farm Size (Acres)</Label>
                      <Input id="size" type="number" placeholder="e.g. 5" required />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 mt-4">
                    Get Free Consultation Now
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting, you agree to our terms of service and privacy policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Partner With Agaate?</h2>
            <p className="text-muted-foreground">We provide end-to-end support to ensure your farming journey is profitable and sustainable.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Leaf className="h-8 w-8 text-primary" />, title: "Personalized Crop Guidance", desc: "Stage-wise scientific farming support tailored for your specific crop and soil." },
              { icon: <Shield className="h-8 w-8 text-primary" />, title: "Scientific Farming Support", desc: "Access to modern techniques, IoT sensors, and AI-driven disease detection." },
              { icon: <TrendingUp className="h-8 w-8 text-primary" />, title: "Market Linkage", desc: "Direct ties with major buyers ensuring you get the best price for your yield." },
              { icon: <Users className="h-8 w-8 text-primary" />, title: "Carbon Credit Opportunities", desc: "Earn extra income simply by adopting sustainable farming practices." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
