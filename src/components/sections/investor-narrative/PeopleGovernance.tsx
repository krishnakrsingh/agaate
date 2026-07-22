import { Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Store } from "lucide-react";
import { Eyebrow, InlineCta } from "./Shared";

const leadership = [
  {
    name: "Ankit Rawat",
    role: "Founder & CEO",
    focus: "Company vision, sustainability, partner strategy, and capital narrative.",
    image: "/team/ankit.png",
  },
  {
    name: "Kuldeep Singh Singhar",
    role: "Head of Operations",
    focus: "Farm execution, crop sales, supply chain reliability, and operating discipline.",
    image: "/team/kuldeep.png",
  },
  {
    name: "Abhay Ranjan",
    role: "Chief of Staff",
    focus: "Nursery operations, Kisan Mall execution, and cross-functional infrastructure.",
    image: "/team/abhay.png",
  },
  {
    name: "Chanchala Shukla",
    role: "Agronomist",
    focus: "Crop viability, product development, nutrition, and integrated pest management.",
    image: "/team/chanchala.png",
  },
  {
    name: "Ravi Kumar",
    role: "Data & Strategy",
    focus: "Analytics, smart crop cycles, reporting, and strategic operating intelligence.",
    image: "/team/ravi.png",
  },
];

export function PeopleGovernance() {
  return (
    <section className="bg-bone px-6 py-16 text-ink lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>People and governance</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              The people driving the field engine.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              Our leadership brings together deep expertise across farm operations, agronomy, retail infrastructure, and data science. We are united by a singular vision: to replace guesswork with science and empower every grower to succeed from seed to sale.
            </p>
          </div>
        </div>

        {/* Redesigned Masonry Leadership Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {[leadership[1], leadership[2]].map((person) => (
              <Link
                key={person.name}
                to="/about"
                className="group relative flex h-[260px] flex-col overflow-hidden rounded-[1.25rem] bg-[#F4F5F4] p-6 transition-colors hover:bg-[#EAECEA]"
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-medium text-forest-deep">{person.name}</h3>
                  <p className="mt-1 font-sans text-[13px] text-[#59635D]">{person.role}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Center Column (Featured) */}
          <div className="flex flex-col gap-6">
            <Link
              to="/about"
              className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.25rem] bg-[#1E1915] p-8 transition-colors hover:bg-[#15110E]"
            >
              {/* Radial glow */}
              <div className="absolute bottom-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#B25D34] opacity-[0.35] blur-[80px] transition-opacity duration-500 group-hover:opacity-50" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-white">{leadership[0].name}</h3>
                <p className="mt-1 font-sans text-[13px] text-white/70">{leadership[0].role}</p>
                <p className="mt-6 text-[15px] leading-relaxed text-white/80">{leadership[0].focus}</p>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <img
                  src={leadership[0].image}
                  alt={leadership[0].name}
                  className="h-[260px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {[leadership[3], leadership[4]].map((person) => (
              <Link
                key={person.name}
                to="/about"
                className="group relative flex h-[260px] flex-col overflow-hidden rounded-[1.25rem] bg-[#F4F5F4] p-6 transition-colors hover:bg-[#EAECEA]"
              >
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-medium text-forest-deep">{person.name}</h3>
                  <p className="mt-1 font-sans text-[13px] text-[#59635D]">{person.role}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-[200px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>


        <div className="mt-10 flex flex-wrap gap-3">
          <InlineCta href="/about">Meet the leadership team</InlineCta>
          <InlineCta href="/contact" variant="light">
            Contact investor desk
          </InlineCta>
        </div>
      </div>
    </section>
  );
}
