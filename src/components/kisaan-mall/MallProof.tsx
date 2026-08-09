import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Quote, Star, Store } from "lucide-react";
import {
  CountUp,
  Marquee,
  Parallax,
  Reveal,
  SectionHeader,
  Stagger,
  StaggerItem,
} from "@/components/common/motion";

export function StatsBand() {
  const stats = [
    {
      to: 500,
      suffix: "+",
      label: "Agri-input SKUs under one roof",
      sub: "Seeds, biologicals, saplings & infrastructure",
    },
    {
      to: 25,
      suffix: "+",
      label: "Direct manufacturer partners",
      sub: "Bayer, Yara, Sakata, Netafim & more",
    },
    {
      to: 2000,
      suffix: "+",
      label: "Parivaar farmers served",
      sub: "Backed by a 20+ member Kisan Sathi team",
    },
  ];

  return (
    <section className="border-y border-border bg-bone">
      <Stagger
        className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 lg:px-12"
        amount={0.3}
      >
        {stats.map((stat, i) => (
          <StaggerItem
            key={stat.label}
            variant="scale-up"
            className={`text-center ${i > 0 ? "md:border-l md:border-border/60" : ""}`}
          >
            <p className="font-serif text-6xl font-bold tracking-tight text-forest-deep md:text-7xl">
              <CountUp to={stat.to} suffix={stat.suffix} duration={2.2} />
            </p>
            <p className="mt-2 font-jet text-[10px] font-bold uppercase tracking-[0.2em] text-forest">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-forest/60">{stat.sub}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

const quotes = [
  {
    name: "Pankaj Gupta",
    role: "Kisan Mall customer",
    text: "Agaate Kisan Mall is a one-stop shop for agricultural inputs.",
  },
  {
    name: "Abhay Ranjan",
    role: "Store visitor",
    text: "A farm to experience — multiple farming technologies, products, seed varieties, nursery for vegetables, multiple crops, and best practices in farming.",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          align="center"
          eyebrow="Word from the fields"
          title={
            <>
              Farmers call it a <span className="italic text-terracotta">one-stop shop</span>
            </>
          }
          description="A flawless 5.0 rating on local directories across the Bhorakalan region, built one harvest at a time."
        />
      </div>

      <Parallax offset={40} className="mt-14">
        <Marquee duration={46} className="-rotate-1 py-4">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex w-80 flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-1 text-terracotta">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="font-serif text-xl leading-snug text-forest-deep">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm font-bold text-forest-deep">{q.name}</p>
                <p className="font-jet text-[9px] uppercase tracking-[0.2em] text-forest/50">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
          <figure className="flex w-80 flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex gap-1 text-terracotta">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <p className="font-serif text-4xl font-bold text-forest-deep">Avinash Kumar</p>
            <p className="font-jet text-[9px] uppercase tracking-[0.2em] text-forest/50">
              Verified buyer · 5-star
            </p>
            <p className="text-xs text-forest/65">Rated on local directories in the region</p>
          </figure>
          <figure className="flex w-80 flex-col items-center justify-center gap-2 rounded-3xl border border-forest-deep bg-forest-deep p-6 text-center text-cream">
            <p className="flex gap-1 text-moss">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </p>
            <p className="font-serif text-5xl font-bold">5.0</p>
            <p className="font-jet text-[9px] uppercase tracking-[0.22em] text-moss">
              Flawless local-directory rating
            </p>
            <p className="text-xs text-cream/70">Numerous verified reviews, Bhorakalan region</p>
          </figure>
        </Marquee>
      </Parallax>
    </section>
  );
}

export function StoreLocator() {
  return (
    <section id="store-locator" className="border-t border-border bg-bone/40 py-24 scroll-mt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-12">
        <Reveal variant="fade-up">
          <p className="mb-3 font-jet text-[10px] font-bold uppercase tracking-[0.18em] text-moss">
            Find the store
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-forest-deep md:text-5xl">
            A <span className="italic text-terracotta">comprehensive farm experience</span>, not
            just a shop
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest/70 md:text-lg">
            Customers describe the Kisan Mall as a place where multiple farming technologies, seed
            varieties, and best practices meet in a single visit — a community hub for agricultural
            commerce in the Bhorakalan region.
          </p>

          <div className="mt-8 space-y-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest/5 text-forest">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-forest-deep">Agaate Kisan Mall</p>
                <p className="mt-0.5 text-xs leading-relaxed text-forest/65">
                  Bilaspur Rd, Patti Kawan, Bhora Kalan, Bilaspur Kalan, Gurugram, Haryana 122413
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-13 border-t border-border/50 pt-4">
              <a
                href="mailto:info@agaate.in"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[11px] font-bold text-forest-deep transition-colors hover:border-forest hover:bg-forest/5"
              >
                <Mail className="h-3.5 w-3.5 text-moss" />
                info@agaate.in
              </a>
              <a
                href="tel:8350085005"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[11px] font-bold text-forest-deep transition-colors hover:border-forest hover:bg-forest/5"
              >
                <Phone className="h-3.5 w-3.5 text-moss" />
                8350085005
              </a>
              <span className="flex items-center gap-1.5 rounded-full bg-forest/5 px-4 py-2 font-mono text-[11px] font-bold text-forest">
                <Star className="h-3.5 w-3.5 fill-current text-terracotta" />
                5.0 flawless rating
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-right">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-border bg-bone shadow-inner">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:26px_26px] opacity-10" />
            <motion.div
              className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)",
              }}
              animate={{ y: [0, 24, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute -inset-3 rounded-full border border-forest/40"
                  initial={{ scale: 0.5, opacity: 0.7 }}
                  animate={{ scale: 3.4, opacity: 0 }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: i * 1.05,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-forest-deep text-cream shadow-xl shadow-forest-deep/30">
                <Store className="h-7 w-7" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              <div className="animate-float-slow rounded-2xl border border-border bg-card p-4 shadow-lg">
                <p className="font-jet text-[9px] font-bold uppercase tracking-[0.2em] text-moss">
                  Community hub
                </p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-forest-deep">
                  Bhorakalan's agricultural commerce centre
                </p>
              </div>
              <div className="animate-pulse-glow ml-auto flex items-center gap-2 rounded-full bg-forest-deep px-4 py-2.5 text-cream shadow-lg">
                <Star className="h-3.5 w-3.5 fill-current text-moss" />
                <span className="font-mono text-[10px] font-bold">5.0 RATED</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StoreCta() {
  return (
    <section className="border-t border-border bg-forest-deep py-20 text-center text-cream">
      <Reveal variant="scale-up" className="mx-auto max-w-3xl px-6">
        <Quote className="mx-auto mb-6 h-8 w-8 text-moss" />
        <p className="font-serif text-3xl italic leading-snug md:text-4xl">
          "From advice to action — Agaate stays with you at every step."
        </p>
        <p className="mt-4 font-jet text-[10px] uppercase tracking-[0.22em] text-moss">
          Call 8350085005 · Visit Agaate Kisan Mall, Bilaspur Rd, Gurugram
        </p>
      </Reveal>
    </section>
  );
}
