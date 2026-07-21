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
    <section className="bg-bone px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 border-t border-ink/10 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>People and governance</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              Investors need to see who runs the field engine.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              The leadership story is operational: founder vision, supply execution, nursery and
              retail infrastructure, agronomy, and data strategy. Corporate materials can then go
              deeper into Anzix Farm Technologies Private Limited diligence details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {leadership.map((person) => (
            <Link
              key={person.name}
              to="/about"
              className="group overflow-hidden rounded-lg border border-[#DDE7E1] bg-white transition-colors hover:border-forest/50"
            >
              <div className="relative h-56 overflow-hidden bg-[#EDF3EF]">
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  className="absolute bottom-0 left-1/2 h-56 w-auto -translate-x-1/2 object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl leading-tight text-forest-deep">{person.name}</h3>
                <p className="mt-1 font-jet text-[10px] uppercase tracking-[0.16em] text-terracotta">
                  {person.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#59635D]">{person.focus}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
            <MapPin className="mb-6 h-5 w-5 text-forest" />
            <h3 className="font-semibold text-forest-deep">Farm and production facility</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
              NH8, opposite Bikanervala, Kukrola, Gurugram, Haryana 122413.
            </p>
          </div>
          <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
            <Store className="mb-6 h-5 w-5 text-forest" />
            <h3 className="font-semibold text-forest-deep">Retail and experience center</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
              Agaate Kisan Mall, Bilaspur Road, Bhora Kalan, Gurugram.
            </p>
          </div>
          <div className="rounded-lg border border-[#DDE7E1] bg-white p-6">
            <ShieldCheck className="mb-6 h-5 w-5 text-forest" />
            <h3 className="font-semibold text-forest-deep">Corporate entity</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#59635D]">
              Anzix Farm Technologies Private Limited. Investor diligence available on request.
            </p>
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
