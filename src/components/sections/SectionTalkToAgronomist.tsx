import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Camera,
  CheckCircle,
  Clock,
  Leaf,
  MessageCircleMore,
  Phone,
  Sprout,
  Users,
  Mic,
  Sun,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import advisorFarmerImage from "@/assets/about-farmer-advisor.png";
import tomatoFieldImage from "@/assets/journey-05-tomato.png";
import nurseryImage from "@/assets/journey-03-nursery.png";

 gsap.registerPlugin(ScrollTrigger);

 const SectionEyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={`inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] ${
      dark ? "text-[#C9693B]" : "text-[#2E6B50]"
    }`}
  >
    {children}
  </span>
 );

 const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Share your crop situation",
    description: "Send a photo, describe a symptom, or ask about an upcoming crop stage. Any question is welcome.",
  },
  {
    number: "02",
    icon: MessageCircleMore,
    title: "Get expert guidance",
    description: "A qualified agronomist reviews your context and responds with practical, stage-specific advice.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Implement with confidence",
    description: "Clear next steps, specific to your crop condition, with follow-up support when needed.",
  },
 ];

 const features = [
  {
    icon: Users,
    title: "Qualified agronomists",
    description: "Experienced crop specialists with field expertise across vegetables and growing conditions.",
  },
  {
    icon: Clock,
    title: "Timely responses",
    description: "Get guidance when you need it — during critical crop stages and decision moments.",
  },
  {
    icon: Mic,
    title: "Regional languages",
    description: "Communicate in the language you're comfortable with — Hindi, Haryanvi, and more.",
  },
  {
    icon: Sun,
    title: "Stage-specific advice",
    description: "Recommendations change as your crop grows — from nursery to harvest.",
  },
  {
    icon: ShieldCheck,
    title: "Follow-up support",
    description: "Stay connected for the season — guidance continues as conditions change.",
  },
  {
    icon: Phone,
    title: "Multiple ways to connect",
    description: "WhatsApp, voice call, or photo sharing — choose what works for your situation.",
  },
 ];

 const testimonials = [
  {
    quote: "Before Agaate, I used to guess what my crop needed. Now I send a photo and get clear advice the same day.",
    name: "Rajesh Kumar",
    location: "Bhiwani, Haryana",
    crop: "Tomato farmer",
  },
  {
    quote: "The agronomist understood my nursery problem immediately. The guidance saved my seedlings and my investment.",
    name: "Suresh Yadav",
    location: "Rohtak, Haryana",
    crop: "Capsicum grower",
  },
 ];

 export default function SectionTalkToAgronomist() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-animate") || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", once: true },
        }
      );

      // Steps animation
      gsap.fromTo(
        stepsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: stepsRef.current, start: "top 85%", once: true },
        }
      );

      // Features animation
      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="talk-to-agronomist" className="scroll-mt-24 bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden bg-[#F4F7F0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-6">
              <span className="hero-animate inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#2E6B50]">
                Core offering / 01
              </span>
              <h1 className="hero-animate mt-6 max-w-2xl font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95] tracking-[-0.055em] text-[#12382D]">
                Talk to an{" "}
                <span className="italic text-[#C9693B]">Agronomist.</span>
              </h1>
              <p className="hero-animate mt-6 max-w-lg text-[17px] leading-7 text-[#486158]">
                Get expert crop guidance when you need it. Share a photo, ask a question, or discuss
                your crop stage — receive practical advice from qualified agronomists who understand
                your field.
              </p>
              <div className="hero-animate mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:9487263498"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#12382D] px-7 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircleMore className="h-4 w-4 text-[#B8F08F]" />
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <span className="flex items-center justify-center gap-2 text-sm text-[#59635D]">
                  <Phone className="h-4 w-4 text-[#2E6B50]" />
                  94872 63498
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#E5EFE0]">
                <img
                  src={advisorFarmerImage}
                  alt="Farmer consulting with agronomist in the field"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#12382D]/90 to-transparent p-6">
                  <p className="font-serif text-xl text-white leading-tight">
                    "The right guidance at the right time can save an entire season."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#2E6B50]">
              How it works
            </span>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[#12382D]">
              Expert guidance in three simple steps
            </h2>
          </div>

          <div ref={stepsRef} className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative rounded-[1.5rem] border border-[#143D31]/12 bg-[#F9FBF6] p-7 transition-all duration-300 hover:border-[#2E6B50]/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-jet text-[11px] font-bold text-[#C9693B]">
                      {step.number}
                    </span>
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#DCECD5] text-[#2E6B50] transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-serif text-[1.5rem] leading-[1.1] tracking-[-0.03em] text-[#12382D]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#59635D]">
                    {step.description}
                  </p>
                  <div className="mt-6 h-0.5 w-10 bg-[#12382D]/15 transition-all group-hover:w-16 group-hover:bg-[#2E6B50]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-[#F4F7F0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <span className="inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#2E6B50]">
                What you get
              </span>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[#12382D]">
                Designed for real farmers with real questions
              </h2>
              <p className="mt-4 text-[17px] leading-7 text-[#486158]">
                Every feature is built to make expert crop guidance accessible, timely, and practical for your specific situation.
              </p>
              <div className="mt-8">
                <a
                  href="tel:9487263498"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#12382D] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircleMore className="h-4 w-4 text-[#B8F08F]" />
                  Connect with an expert
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div ref={featuresRef} className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group rounded-[1.25rem] border border-[#143D31]/10 bg-white p-6 transition-all duration-300 hover:border-[#2E6B50]/25 hover:shadow-md"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#E9F1E3] text-[#2E6B50] transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-serif text-lg tracking-[-0.02em] text-[#12382D]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#59635D]">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / Social Proof Banner */}
      <div className="bg-[#12382D] px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-5">
              <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em] text-white">
                "The right guidance at the right time can save an entire season."
              </h3>
              <p className="mt-4 font-jet text-[11px] uppercase tracking-[0.2em] text-[#B8F08F]">
                — Agaate founding belief
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { value: "15,000+", label: "Acres supported" },
                  { value: "2,000+", label: "Farmer families" },
                  { value: "48hr", label: "Avg. response time" },
                  { value: "94%", label: "Satisfaction rate" },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] leading-none tracking-[-0.03em] text-[#B8F08F]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.4] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
 }
