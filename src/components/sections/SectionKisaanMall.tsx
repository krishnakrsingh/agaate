import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Droplets,
  FlaskConical,
  Package,
  ScanLine,
  ShoppingBasket,
  Sprout,
  Star,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import seedsImage from "@/assets/product-seeds.jpg";
import fertiliserImage from "@/assets/product-fertiliser.jpg";
import irrigationImage from "@/assets/product-irrigation.jpg";
import toolsImage from "@/assets/product-tools.jpg";
import agroParkImage from "@/assets/agro-park.jpg";
import tomatoFieldImage from "@/assets/journey-05-tomato.png";

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

const categories = [
  {
    name: "Seeds & Saplings",
    description: "Certified seeds and healthy saplings selected for your crop and region",
    image: seedsImage,
    icon: Sprout,
    features: ["Certified quality", "Region-specific", "Germination guarantee"],
  },
  {
    name: "Nutrition",
    description: "Fertilizers and nutrients matched to your crop stage and soil needs",
    image: fertiliserImage,
    icon: FlaskConical,
    features: ["Stage-specific", "Soil-tested", "Quality verified"],
  },
  {
    name: "Irrigation",
    description: "Drip systems, sprinklers, and irrigation equipment for efficient water use",
    image: irrigationImage,
    icon: ScanLine,
    features: ["Water-efficient", "Crop-specific", "Expert guidance"],
  },
  {
    name: "Tools & Support",
    description: "Farm equipment, protection gear, and essential field support items",
    image: toolsImage,
    icon: Package,
    features: ["Field-tested", "Durable quality", "Practical design"],
  },
];

const benefits = [
  {
    icon: BadgeCheck,
    title: "Quality assured",
    description: "Every product verified for quality and suitability",
  },
  {
    icon: Users,
    title: "Expert backed",
    description: "Selection guided by agronomists, not algorithms",
  },
  {
    icon: Store,
    title: "Crop specific",
    description: "Recommendations matched to your crop stage",
  },
  {
    icon: Zap,
    title: "Reliable supply",
    description: "Stock available when you need it",
  },
  {
    icon: Truck,
    title: "Timely delivery",
    description: "Get inputs before critical crop stages",
  },
  {
    icon: Star,
    title: "Trusted source",
    description: "Join 2,000+ farmers who rely on Kisaan Mall",
  },
];

export default function SectionKisaanMall() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

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

      // Categories animation
      gsap.fromTo(
        categoriesRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: categoriesRef.current, start: "top 85%", once: true },
        }
      );

      // Benefits animation
      gsap.fromTo(
        benefitsRef.current?.children || [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: benefitsRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kisaan-mall" className="scroll-mt-24 bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden bg-[#E9F1E3] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-6">
              <span className="hero-animate inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#2E6B50]">
                Core offering / 02
              </span>
              <h1 className="hero-animate mt-6 max-w-2xl font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95] tracking-[-0.055em] text-[#12382D]">
                Kisaan{" "}
                <span className="italic text-[#C9693B]">Mall.</span>
              </h1>
              <p className="hero-animate mt-6 max-w-lg text-[17px] leading-7 text-[#486158]">
                Quality agricultural inputs, trusted sourcing, and expert-backed selection — all in
                one place. From seeds to irrigation, find everything your crop plan calls for.
              </p>
              <div className="hero-animate mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/services/kisaan-mall"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#12382D] px-7 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBasket className="h-4 w-4 text-[#B8F08F]" />
                  Explore Kisaan Mall
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#categories"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#12382D]/25 px-7 py-3.5 text-sm font-bold text-[#12382D] transition-colors hover:border-[#12382D] hover:bg-white"
                >
                  Browse categories
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#12382D]">
                <img
                  src={agroParkImage}
                  alt="Agaate agricultural innovation landscape"
                  className="w-full h-auto object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12382D]/90 via-[#12382D]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">
                      <BadgeCheck className="h-4 w-4 text-[#B8F08F]" />
                      <span className="text-sm font-medium">Quality assured</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">
                      <Users className="h-4 w-4 text-[#B8F08F]" />
                      <span className="text-sm font-medium">Expert backed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block font-jet text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#2E6B50]">
              Shop by category
            </span>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[#12382D]">
              Everything your crop plan calls for
            </h2>
          </div>

          <div ref={categoriesRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-[1.5rem] bg-[#143D31]"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C261D]/95 via-[#0C261D]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#B8F08F]/20 text-[#B8F08F] backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-2xl tracking-[-0.03em] text-white">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.5] text-white/65">
                      {category.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-sm"
                        >
                          <Check className="h-3 w-3 text-[#B8F08F]" />
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#B8F08F]">
                      <span>Explore {category.name.split(" ")[0]}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-[#E9F1E3] px-6 py-16 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-[2rem] bg-[#12382D] p-8 md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
              <div className="lg:col-span-6">
                <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em] text-white">
                  Every input in Kisaan Mall is selected to support the advice farmers receive.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-white/60">
                  Quality products, expert-backed selection, and a direct connection to the guidance that makes them useful.
                </p>
              </div>
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "500+", label: "Curated products" },
                    { value: "25+", label: "Supply partners" },
                    { value: "4", label: "Core categories" },
                    { value: "100%", label: "Quality assured" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white/10 p-5 text-center backdrop-blur-sm">
                      <p className="font-serif text-[clamp(1.5rem,3vw,2rem)] leading-none tracking-[-0.03em] text-[#B8F08F]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
