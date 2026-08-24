import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "@phosphor-icons/react";
import { COMMODITIES } from "./market-linkage-data";

interface BuybackEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCropIndex: number;
}

export function BuybackEnrollmentModal({
  isOpen,
  onClose,
  selectedCropIndex,
}: BuybackEnrollmentModalProps) {
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("");
  const [expectedYieldQuintals, setExpectedYieldQuintals] = useState("100");

  const crop = COMMODITIES[selectedCropIndex] ?? COMMODITIES[0]!;

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      onClose();
      setFarmerName("");
      setFarmerPhone("");
      setFarmerLocation("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg space-y-6 rounded-3xl border border-border bg-card p-8 text-left shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 cursor-pointer text-forest/40 hover:text-forest"
            >
              <X className="h-5 w-5" />
            </button>

            {modalSubmitted ? (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-forest-deep">
                  Buyback Registration Received!
                </h4>
                <p className="mx-auto max-w-xs text-xs text-forest/70">
                  We have registered your {crop.crop} crop ({expectedYieldQuintals} Quintals) for
                  guaranteed buyback. A procurement officer will contact {farmerPhone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-terracotta">
                    DIRECT MARKET CONTRACT
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Enroll Harvest in Buyback
                  </h4>
                  <p className="text-xs text-forest/60">
                    Lock floor price of ₹{crop.agaateFloorPrice}/kg for {crop.crop}.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-forest/60">Full Name:</label>
                    <input
                      type="text"
                      required
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      placeholder="e.g. Balwan Singh"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">WhatsApp Phone Number:</label>
                    <input
                      type="tel"
                      required
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      placeholder="e.g. 9812345678"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">Tehsil / District Location:</label>
                    <input
                      type="text"
                      required
                      value={farmerLocation}
                      onChange={(e) => setFarmerLocation(e.target.value)}
                      placeholder="e.g. Kukrola, Gurugram"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">
                      Expected Harvest Volume (Quintals):
                    </label>
                    <input
                      type="number"
                      required
                      value={expectedYieldQuintals}
                      onChange={(e) => setExpectedYieldQuintals(e.target.value)}
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full cursor-pointer rounded-xl bg-forest-deep py-3.5 text-xs font-bold text-cream transition-colors hover:bg-forest"
                >
                  Submit Buyback Application
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
