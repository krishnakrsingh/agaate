import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  MagnifyingGlassPlus,
  MapPin,
  Sparkle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { useParams } from "@tanstack/react-router";
import { Reveal } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { getLocalizedPath } from "@/lib/i18n";

export interface GalleryPhoto {
  id: string;
  image: string;
  title: string;
  caption: string;
  category: "field" | "nursery" | "community" | "campus";
  location: string;
  tag: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "field-advisory-01",
    image: "/who-we-are-farm.jpg",
    title: "On-Ground Crop Scouting & Field Trials",
    caption:
      "Our agronomists conduct hands-on crop diagnostics, inspecting leaf health and drip line efficiency with progressive vegetable growers.",
    category: "field",
    location: "Kukrola Proving Grounds, Gurugram",
    tag: "Field Advisory",
  },
  {
    id: "nursery-germination-02",
    image: "/images/gallery/farm_photo_05.webp",
    title: "5-Acre Climate-Controlled Smart Nursery",
    caption:
      "Nursery teams inspecting bio-boosted seedling plug trays in controlled climate chambers to ensure 98% field survival.",
    category: "nursery",
    location: "Agaate Smart Nursery, Kukrola",
    tag: "Smart Nursery",
  },
  {
    id: "campus-recruitment-03",
    image: "/src/assets/contact-team.jpg",
    title: "Team Innovation & Campus Outreach",
    caption:
      "Agaate leadership and young agronomy graduates collaborating on regional crop cycle planning and digital advisory tools.",
    category: "campus",
    location: "Corporate Hub & Campus Drives (CSA Kanpur)",
    tag: "Campus & Culture",
  },
  {
    id: "kisan-mall-demo-04",
    image: "/images/gallery/farm_photo_18.webp",
    title: "Kisan Mall Farmer Demonstration Day",
    caption:
      "Growers exploring certified seeds, biological pest solutions, and mulching hardware at our Bilaspur Kalan retail hub.",
    category: "community",
    location: "Agaate Kisan Mall, Bilaspur Kalan",
    tag: "Community",
  },
  {
    id: "field-harvest-05",
    image: "/images/gallery/farm_photo_28.webp",
    title: "Watermelon & Solanaceae Field Days",
    caption:
      "Demonstrating modern bamboo staking and mulching techniques that increase export-grade fruit output by 25%.",
    category: "field",
    location: "Associated Farm Blocks, Haryana",
    tag: "Field Advisory",
  },
  {
    id: "nursery-prep-06",
    image: "/images/gallery/farm_photo_30.webp",
    title: "Quality Verification & Seedling Dispatch",
    caption:
      "Rigorous root architecture checks before loading healthy plug seedlings for doorstep delivery across 15,000+ associated acres.",
    category: "nursery",
    location: "Dispatch Hub, Pachgaon NH-8",
    tag: "Smart Nursery",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Moments" },
  { id: "field", label: "Field Advisory" },
  { id: "nursery", label: "Smart Nursery" },
  { id: "community", label: "Kisan Mall & Community" },
  { id: "campus", label: "Campus & Team" },
] as const;

export default function LifeAtAgaate() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const currentLang = locale ?? "en";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="life-at-agaate"
      aria-labelledby="life-at-agaate-heading"
      className="relative overflow-hidden border-b border-[#143d31]/10 bg-[#f4f8f5] py-16 sm:py-20 md:py-24 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <Reveal variant="fade-up" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              Life at Agaate · Culture &amp; Field Days
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <h2
                id="life-at-agaate-heading"
                className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1]"
              >
                Where agronomy science meets{" "}
                <span className="text-[#5d7d37]">real-world farm impact</span>
              </h2>
              <p className="font-sans text-[#4f624f] text-sm sm:text-base leading-relaxed">
                From our 5-acre Smart Nursery to university campus recruitment and on-field
                diagnostics with 2,000+ Parivaar farmers — explore life, teamwork, and grassroots
                energy at Agaate.
              </p>
            </div>

            {/* Quick Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#143d31]/15 bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-[#143d31] shadow-xs">
              <Sparkle className="h-4 w-4 text-[#5d7d37]" weight="fill" />
              <span>Growing Talent · Empowering Farmers</span>
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* PROMINENT CAREERS PROMOTION CALLOUT CARD */}
        {/* ========================================================================= */}
        <Reveal variant="fade-up" delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-[#143d31]/15 bg-gradient-to-br from-[#143d31] via-[#103429] to-[#0a231b] p-6 sm:p-8 md:p-10 text-white shadow-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#a3e635]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#5d7d37]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Mission & Roles */}
              <div className="space-y-4 lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635]/20 border border-[#a3e635]/30 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#a3e635]">
                    <Briefcase className="h-3.5 w-3.5" weight="fill" />
                    We're Hiring Passionate Minds
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                  Build the future of Indian agriculture with us
                </h3>

                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl font-normal">
                  Whether you are an experienced Agronomist, a Smart Nursery specialist, an IoT
                  precision engineer, or an ambitious university graduate — Agaate provides
                  on-ground mentorship, real equity in farmer outcomes, and high-impact career
                  growth.
                </p>
              </div>

              {/* Right Column: CTA Button */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
                <SlideUpPillButton
                  to={getLocalizedPath("/careers", currentLang)}
                  variant="lime"
                  size="lg"
                  label="Explore Careers & Open Roles"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* PHOTO GALLERY WITH CATEGORY TABS & CAPTIONS */}
        {/* ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          {/* Category Filter Tabs */}
          <Reveal variant="fade-up" delay={0.12} className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#143d31] text-white shadow-xs"
                    : "bg-white border border-[#143d31]/10 text-[#4f624f] hover:bg-[#143d31]/5 hover:text-[#143d31]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </Reveal>

          {/* Photo Gallery Grid */}
          <Reveal variant="fade-up" delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative overflow-hidden rounded-2xl border border-[#143d31]/12 bg-white shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#143d31]/5">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#143d31] border border-[#143d31]/10 shadow-xs">
                      {photo.tag}
                    </div>

                    {/* Hover expand icon */}
                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#143d31]/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                      <MagnifyingGlassPlus className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Caption & Location Footer */}
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors leading-snug">
                        {photo.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#4f624f] leading-relaxed line-clamp-3">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#143d31]/8 flex items-center justify-between text-[11px] text-[#5d7d37] font-medium">
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin weight="fill" className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </span>
                      <span className="text-[#143d31]/60 font-mono text-[10px] uppercase font-bold group-hover:text-[#143d31] transition-colors">
                        View Photo ↗
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHOTO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-[#0a231b]/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[#143d31]/20 bg-white shadow-2xl z-10 text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-3 bg-[#fbfdfa] text-[#143d31]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] bg-[#5d7d37]/10 px-2.5 py-0.5 rounded-md">
                    {selectedPhoto.tag}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-[#4f624f]">
                    <MapPin weight="fill" className="h-3.5 w-3.5 text-[#5d7d37]" />
                    {selectedPhoto.location}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#143d31]">
                  {selectedPhoto.title}
                </h3>

                <p className="font-sans text-sm text-[#4f624f] leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
