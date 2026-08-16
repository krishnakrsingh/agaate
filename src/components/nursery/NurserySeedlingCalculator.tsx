import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle, Plant, X } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { CROP_DATA, type CropOption } from "./nursery-data";

export function NurserySeedlingCalculator() {
  const [selectedCrop, setSelectedCrop] = useState<CropOption>("Tomato");
  const [acres, setAcres] = useState<number>(3);
  const [selectedSlot, setSelectedSlot] = useState<string>("Aug 15 - Aug 20 (Immediate)");

  // Pre-order modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerTehsil, setFarmerTehsil] = useState("");

  const cropDetail = CROP_DATA[selectedCrop];
  const totalSeedlings = cropDetail.plugsPerAcre * acres;
  const estimatedCost = totalSeedlings * cropDetail.pricePerPlug;
  const seedWasteSavedRatio = 0.4; // 40% seed waste avoided
  const estimatedSavings = Math.round(estimatedCost * seedWasteSavedRatio);

  const handlePreOrderSubmit = (e: FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      setIsModalOpen(false);
      setFarmerName("");
      setFarmerPhone("");
      setFarmerTehsil("");
    }, 3000);
  };

  return (
    <section id="seedling-calculator" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="TRANSPARENT REQUISITIONING"
        title="Seedling & Plug Requisition Calculator."
        description="Select your crop variety and acreage to compute exact plug tray counts, nursery production lead times, and seed cost savings."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls Form */}
          <div className="space-y-6 lg:col-span-6">
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase text-forest/60">
                Select Crop Variety:
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CROP_DATA) as CropOption[]).map((crop) => (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => setSelectedCrop(crop)}
                    className={`rounded-full px-4 py-2 font-mono text-xs font-bold transition-all ${
                      selectedCrop === crop
                        ? "bg-forest-deep text-cream shadow-md"
                        : "border border-border bg-bone text-forest/70 hover:border-forest/40"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="nursery-acres"
                  className="font-mono text-xs font-bold uppercase text-forest/60"
                >
                  Target Planting Acreage:
                </label>
                <span className="font-serif text-2xl font-bold text-forest-deep">
                  {acres} Acres
                </span>
              </div>
              <input
                id="nursery-acres"
                type="range"
                min={1}
                max={25}
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full cursor-pointer accent-forest"
              />
            </div>

            <div>
              <label
                htmlFor="planting-slot"
                className="mb-2 block font-mono text-xs font-bold uppercase text-forest/60"
              >
                Preferred Field Transplant Slot:
              </label>
              <select
                id="planting-slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full rounded-2xl border border-border bg-bone px-4 py-3 font-sans text-sm font-semibold text-forest-deep outline-none focus:border-forest"
              >
                <option>Aug 15 - Aug 20 (Immediate Nursery Batch)</option>
                <option>Sep 01 - Sep 10 (Pre-Kharif Cycle)</option>
                <option>Oct 01 - Oct 15 (Rabi Transition)</option>
                <option>Nov 01 - Nov 15 (Winter Protected Crop)</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-forest/15 bg-bone p-6 shadow-sm lg:col-span-6 md:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-mono text-xs font-bold uppercase text-moss">
                  PLUG ESTIMATE
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-bold text-emerald-800">
                  {cropDetail.survivalRate} Survival Rate
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-forest/50">
                    TOTAL PLUG COUNT
                  </span>
                  <p className="font-serif text-3xl font-bold text-forest-deep">
                    {totalSeedlings.toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs text-forest/70">
                    ({cropDetail.plugsPerAcre.toLocaleString("en-IN")} plugs/acre)
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-forest/50">
                    ESTIMATED REQUISITION VALUE
                  </span>
                  <p className="font-serif text-3xl font-bold text-terracotta">
                    ₹{estimatedCost.toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs text-forest/70">
                    (@ ₹{cropDetail.pricePerPlug}/plug)
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-600/20 bg-emerald-50 p-4 font-mono text-xs text-emerald-900">
                ✓ Estimated Seed Waste Prevented:{" "}
                <strong>₹{estimatedSavings.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-forest-deep py-4 font-mono text-xs font-bold uppercase tracking-wider text-cream shadow-xl transition-all hover:bg-forest"
            >
              <span>Reserve Seedling Tray Batch</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pre-Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-forest/60 hover:bg-bone hover:text-forest"
            >
              <X className="h-5 w-5" />
            </button>

            {modalSubmitted ? (
              <div className="space-y-4 py-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-emerald-600 animate-bounce" />
                <h3 className="font-serif text-2xl font-bold text-forest-deep">
                  Nursery Requisition Received!
                </h3>
                <p className="text-sm text-forest/80">
                  Our Kukrola Nursery Agronomist will call you within 2 hours to confirm your hybrid
                  variety seed allotment and delivery schedule.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePreOrderSubmit} className="space-y-4">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-moss">
                    NURSERY REQUISITION DESK
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-deep">
                    Reserve {totalSeedlings.toLocaleString("en-IN")} {selectedCrop} Plugs
                  </h3>
                  <p className="mt-1 text-xs text-forest/70">
                    Slot: {selectedSlot} · {acres} Acres
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-forest/60">
                      Farmer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="mt-1 w-full rounded-xl border border-border bg-bone px-4 py-2.5 text-sm font-semibold text-forest-deep outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-forest/60">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      placeholder="e.g. 98120XXXXX"
                      className="mt-1 w-full rounded-xl border border-border bg-bone px-4 py-2.5 text-sm font-semibold text-forest-deep outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase text-forest/60">
                      Village / Tehsil / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerTehsil}
                      onChange={(e) => setFarmerTehsil(e.target.value)}
                      placeholder="e.g. Pataudi, Gurugram"
                      className="mt-1 w-full rounded-xl border border-border bg-bone px-4 py-2.5 text-sm font-semibold text-forest-deep outline-none focus:border-forest"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full cursor-pointer rounded-xl bg-forest-deep py-3.5 font-mono text-xs font-bold uppercase text-cream shadow-lg hover:bg-forest"
                >
                  Confirm Requisition
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
