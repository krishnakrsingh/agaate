import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  MapPin,
  NavigationArrow,
  Phone
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/common/motion";
import { FACILITIES, type Facility } from "./data";
import GoogleMapEmbed from "./GoogleMapEmbed";
import { useToast } from "./Toast";
import { track } from "@/lib/analytics";

function FacilityCard({
  facility,
  onCopy,
  copied,
}: {
  facility: Facility;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <motion.div
      key={facility.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
    >
      <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
        <img
          src={facility.image}
          alt={facility.name}
          className="h-full w-full object-cover"
          width={800}
          height={450}
        />
      </div>

      <div className="p-6 md:p-7">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {facility.role}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest-deep">
          {facility.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-600">{facility.tagline}</p>

        <div className="mt-5 space-y-4 border-t border-neutral-100 pt-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} />
            <div>
              <p className="text-sm leading-relaxed text-forest-deep">{facility.address}</p>
              {facility.plusCode ? (
                <p className="mt-1 font-mono text-[11px] text-neutral-500">{facility.plusCode}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} />
              <a
                href={`tel:${facility.telRaw}`}
                onClick={() =>
                  track("phone_clicked", { source: "facility", facility: facility.id })
                }
                className="text-sm font-medium text-forest-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
              >
                {facility.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} />
              <span className="text-sm text-neutral-600">{facility.hours}</span>
            </div>
          </div>
        </div>

        <ul className="mt-5 space-y-2 border-t border-neutral-100 pt-5">
          {facility.highlights.map((hl) => (
            <li key={hl} className="flex items-start gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" strokeWidth={2} />
              <span>{hl}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={facility.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions_clicked", { facility: facility.id })}
            className="inline-flex items-center gap-2 rounded-md bg-forest-deep px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            <NavigationArrow className="h-3.5 w-3.5" strokeWidth={1.75} />
            Get directions
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-forest" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.75} />
                Copy address
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FacilitiesSection() {
  const [activeId, setActiveId] = useState(FACILITIES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  const active = FACILITIES.find((f) => f.id === activeId) || FACILITIES[0];

  return (
    <section aria-labelledby="facilities-heading" className="border-t border-neutral-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-forest">Locations</p>
          <h2
            id="facilities-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-forest-deep md:text-4xl"
          >
            Visit our Gurugram hubs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            Nursery and R&amp;D farm in Kukrola, Kisan Mall in Bhora Kalan, and our registered
            office in Sector 81.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Agaate facilities"
          className="mt-10 flex gap-1 overflow-x-auto border-b border-neutral-200 pb-px"
        >
          {FACILITIES.map((fac) => {
            const selected = activeId === fac.id;
            return (
              <button
                key={fac.id}
                role="tab"
                type="button"
                id={`facility-tab-${fac.id}`}
                aria-selected={selected}
                aria-controls={`facility-panel-${fac.id}`}
                onClick={() => {
                  setActiveId(fac.id);
                  track("facility_tab_changed", { facility: fac.id });
                }}
                className={`min-h-11 shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 ${
                  selected
                    ? "border-forest-deep text-forest-deep"
                    : "border-transparent text-neutral-500 hover:text-forest-deep"
                }`}
              >
                {fac.name.replace("Agaate ", "").replace("Anzix Farm Technologies Pvt Ltd", "Corporate office")}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div
            className="lg:col-span-6"
            role="tabpanel"
            id={`facility-panel-${active.id}`}
            aria-labelledby={`facility-tab-${active.id}`}
          >
            <AnimatePresence mode="wait">
              <FacilityCard
                facility={active}
                copied={copiedId === active.id}
                onCopy={async () => {
                  try {
                    await navigator.clipboard.writeText(active.address);
                    setCopiedId(active.id);
                    toast("Address copied", "success");
                    window.setTimeout(() => setCopiedId(null), 2500);
                  } catch {
                    toast("Could not copy address", "error");
                  }
                }}
              />
            </AnimatePresence>
          </div>
          <div className="lg:col-span-6">
            <GoogleMapEmbed facility={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
