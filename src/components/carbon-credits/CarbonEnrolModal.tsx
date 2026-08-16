import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "@phosphor-icons/react";

interface CarbonEnrolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CarbonEnrolModal({ isOpen, onClose }: CarbonEnrolModalProps) {
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("Gurugram, Haryana");

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      onClose();
      setFarmerName("");
      setFarmerPhone("");
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
                  Farmland Registered for Carbon MRV!
                </h4>
                <p className="mx-auto max-w-xs text-xs text-forest/70">
                  An Agaate MRV Field Officer will visit your plot to establish your baseline soil
                  organic carbon level.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-moss">
                    AGAATE CARBON INITIATIVE
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Enrol Farmland in MRV Program
                  </h4>
                  <p className="text-xs text-forest/60">
                    Earn ₹1,200 per verified tCO₂e sequestered on your land.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-forest/60">Farmer Full Name:</label>
                    <input
                      type="text"
                      required
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      placeholder="e.g. Ramesh Yadav"
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
                      placeholder="e.g. 98120XXXXX"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">Location / Tehsil:</label>
                    <input
                      type="text"
                      required
                      value={farmerLocation}
                      onChange={(e) => setFarmerLocation(e.target.value)}
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full cursor-pointer rounded-xl bg-forest-deep py-3.5 text-xs font-bold text-cream transition-colors hover:bg-forest"
                >
                  Submit MRV Enrolment
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
