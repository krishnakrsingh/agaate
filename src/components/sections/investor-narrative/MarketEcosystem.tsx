import { Cpu, Leaf, ShieldCheck, ShoppingBasket } from "lucide-react";
import agroPark from "@/assets/agro-park.jpg";
import heroPlant from "@/assets/hero-plant.jpg";
import irrigationImg from "@/assets/zones/irrigation_drip.png";
import droneImg from "@/assets/zones/drone_scan.png";
import marketImg from "@/assets/journey-09-market.png";
import { Eyebrow, InlineCta } from "./Shared";

const parkZones = [
  "Seed",
  "Nursery",
  "Irrigation",
  "Nutrition",
  "Protection",
  "Tech and drone",
  "Training",
  "Market",
];

export function MarketEcosystem() {
  return (
    <section className="bg-white px-6 py-20 text-ink lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="sticky top-24 border-t border-ink/10 pt-6">
            <Eyebrow>Market and ecosystem</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.06] text-forest-deep">
              Kisan Mall, market linkage, and Agri Park should feel connected, not random.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-[#59635D] md:text-[18px]">
              Kisan Mall is the retail gateway. Market linkage is the farmer's revenue gateway.
              Agri Park is the trust gateway where partners, farmers, and buyers can see the full
              crop journey on real land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InlineCta href="/agri-park">Visit Agri Park</InlineCta>
              <InlineCta href="/services/market-linkage" variant="light">
                Review market linkage
              </InlineCta>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[#DDE7E1] bg-bone p-6 md:p-8">
              <ShoppingBasket className="mb-8 h-6 w-6 text-forest" />
              <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                Kisan Mall as a trust and distribution node.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#59635D]">
                Instead of throwing a mall section into the homepage, the landing page now explains
                why it exists: verified inputs, prescriptions, farmer education, and manufacturer
                access under one roof.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
              <img src={marketImg} alt="Harvest and market linkage" className="h-full min-h-[320px] w-full object-cover" />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-bone">
            <img src={agroPark} alt="Agaate integrated Agri Park" className="h-[340px] w-full object-cover" />
            <div className="p-6 md:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-serif text-3xl leading-tight text-forest-deep">
                  India's first integrated Agri Park concept.
                </h3>
                <span className="font-jet text-[10px] uppercase tracking-[0.18em] text-terracotta">
                  Live demonstration farm
                </span>
              </div>
              <p className="max-w-3xl text-sm leading-relaxed text-[#59635D]">
                One Agaate farm where seed, nursery, irrigation, nutrition, protection, technology,
                training, and market partners can be demonstrated on real crops through one walk.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {parkZones.map((zone) => (
                  <span
                    key={zone}
                    className="rounded-full border border-forest/20 bg-white px-3 py-1.5 text-xs font-semibold text-forest-deep"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { img: heroPlant, title: "Preventive crop care", icon: ShieldCheck },
              { img: irrigationImg, title: "Precision irrigation", icon: Leaf },
              { img: droneImg, title: "Drone and field intelligence", icon: Cpu },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="overflow-hidden rounded-lg border border-[#DDE7E1] bg-white">
                  <img src={item.img} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="flex items-center gap-3 p-4">
                    <Icon className="h-4 w-4 text-forest" />
                    <span className="text-sm font-semibold text-forest-deep">{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
