import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowSquareOut,
  Buildings,
  Clock,
  Compass,
  MapPin,
  Phone,
  Plant,
  Storefront,
  X,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";

export interface LocationItem {
  id: string;
  name: string;
  role: string;
  tagline: string;
  address: string;
  district: string;
  plusCode?: string;
  phone: string;
  hours: string;
  badges: string[];
  mapsUrl: string;
  icon: typeof Plant;
}

export const AGAATE_LOCATIONS: LocationItem[] = [
  {
    id: "farm-kukrola",
    name: "Agaate Anzix Farm & Smart Nursery",
    role: "Farm & Production Facility",
    tagline: "5-Acre Smart Nursery & High-Tech R&D Proving Ground",
    address: "NH8, opposite Bikanervala, Kukrola / Pachgaon, Gurugram, Haryana 122413",
    district: "Gurugram, Haryana",
    plusCode: "8WG2+QR6 Gurugram",
    phone: "+91 94872 63498",
    hours: "Mon – Sat: 07:30 AM – 06:30 PM",
    badges: ["5-Acre Climate Chambers", "Live Crop Trials", "Seedling Pickup"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=8WG2%2BQR6+Gurugram",
    icon: Plant,
  },
  {
    id: "kisan-mall",
    name: "Agaate Kisan Mall",
    role: "Retail & Experience Center",
    tagline: "Comprehensive Agri-Input Storefront & Soil Testing Hub",
    address: "Bilaspur Rd, Patti Kawan, Bhora Kalan, Bilaspur Kalan, Gurugram, Haryana 122413",
    district: "Gurugram, Haryana",
    plusCode: "8W88+9C Gurugram",
    phone: "+91 83500 85005",
    hours: "Mon – Sun: 08:00 AM – 08:00 PM",
    badges: ["500+ SKUs", "Soil Testing Lab", "Drip Hardware & Mulching"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Agaate+Kisan+Mall+Bilaspur+Rd+Gurugram",
    icon: Storefront,
  },
  {
    id: "corporate-hq",
    name: "Anzix Farm Technologies Corporate Office",
    role: "Corporate Registered Headquarters",
    tagline: "Governance, Project Planning & Carbon Credit Operations",
    address: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
    district: "Gurugram, Haryana",
    plusCode: "CIN: U46200HR2024PTC121982",
    phone: "+91 83500 85005",
    hours: "Mon – Fri: 09:30 AM – 06:00 PM",
    badges: ["Big Farm Strategy", "Carbon Credits", "Institutional Ties"],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bestech+Park+View+Ananda+Sector+81+Gurugram",
    icon: Buildings,
  },
];

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationsModal({ isOpen, onClose }: LocationsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a231b]/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl sm:rounded-[2rem] border border-[#143d31]/15 bg-[#fbfdfa] p-5 sm:p-7 md:p-8 shadow-2xl z-10 text-left overflow-hidden text-[#143d31]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close locations popup"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#143d31]/5 hover:bg-[#143d31]/10 text-[#143d31] transition-colors cursor-pointer z-20"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Modal Header */}
          <div className="mb-5 sm:mb-6 pr-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5d7d37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5d7d37]"></span>
              </span>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5d7d37]">
                Live Physical Network · 3 Hubs in Gurugram
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31]">
              Agaate Operational Locations
            </h3>
            <p className="text-xs sm:text-sm text-[#4f624f] mt-1 leading-relaxed">
              Visit our 5-acre Smart Nursery, experience center, or retail mall. Click any location
              below to open directions directly in Google Maps.
            </p>
          </div>

          {/* Locations Cards List */}
          <div className="space-y-3.5 overflow-y-auto pr-1 sm:pr-2 pb-2 custom-scrollbar">
            {AGAATE_LOCATIONS.map((loc) => {
              const Icon = loc.icon;

              return (
                <div
                  key={loc.id}
                  onClick={() => window.open(loc.mapsUrl, "_blank", "noopener,noreferrer")}
                  className="group relative rounded-2xl border border-[#143d31]/12 bg-white p-4 sm:p-5 transition-all duration-300 hover:border-[#5d7d37] hover:shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#143d31]/10 text-[#143d31] group-hover:bg-[#143d31] group-hover:text-[#a3e635] transition-colors">
                        <Icon weight="duotone" className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] bg-[#5d7d37]/10 px-2 py-0.5 rounded-md">
                        {loc.role}
                      </span>
                      {loc.plusCode && (
                        <span className="font-mono text-[10px] text-[#4f624f]/80">
                          {loc.plusCode}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors flex items-center gap-1.5">
                        {loc.name}
                      </h4>
                      <p className="font-sans text-xs text-[#4f624f] mt-0.5 leading-relaxed flex items-start gap-1.5">
                        <MapPin
                          weight="fill"
                          className="h-3.5 w-3.5 text-[#5d7d37] mt-0.5 shrink-0"
                        />
                        <span>{loc.address}</span>
                      </p>
                    </div>

                    {/* Meta info strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#143d31]/75 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#5d7d37]" />
                        {loc.hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-[#5d7d37]" />
                        {loc.phone}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {loc.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-[#143d31]/5 px-2.5 py-0.5 text-[10px] font-semibold text-[#143d31]/80"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(loc.mapsUrl, "_blank", "noopener,noreferrer");
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#143d31] px-4 py-2.5 text-xs font-bold text-white shadow-xs group-hover:bg-[#5d7d37] group-hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <Compass className="h-4 w-4" weight="bold" />
                      <span>Open in Maps</span>
                      <ArrowSquareOut className="h-3.5 w-3.5" weight="bold" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Footer Note */}
          <div className="mt-4 pt-3 border-t border-[#143d31]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4f624f]">
            <span>All facilities are open for grower visits, farm trials, and consultations.</span>
            <span className="font-mono text-[11px] font-bold text-[#143d31]">
              Hotline: +91 83500 85005
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
