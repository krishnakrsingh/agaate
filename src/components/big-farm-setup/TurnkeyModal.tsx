import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Buildings,
  Calendar,
  CheckCircle,
  MapPin,
  Phone,
  Plant,
  X,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";

export function TurnkeyModal({
  isOpen,
  onClose,
  initialAcres = 25,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialAcres?: number;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    acres: initialAcres.toString(),
    waterSource: "Borewell",
    targetCrop: "Commercial Vegetables",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

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
          className="fixed inset-0 bg-forest-deep/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative w-full max-w-2xl rounded-[2.5rem] border border-border bg-cream p-8 md:p-10 shadow-2xl z-10 text-left overflow-hidden"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-bone hover:bg-forest/10 text-forest transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle className="h-10 w-10" />
              </div>
              <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block">
                Reference ID: #ESTATE-{Math.floor(Math.random() * 89999) + 10000}
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-deep">
                Turnkey Consultation Reserved
              </h3>
              <p className="text-sm text-forest/70 max-w-md mx-auto leading-relaxed">
                Thank you,{" "}
                <span className="font-bold text-forest-deep">
                  {formData.name || "Valued Investor"}
                </span>
                . Our Head of Operations & Senior Commercial Agronomist will contact you at{" "}
                <span className="font-bold text-forest-deep">
                  {formData.phone || "your contact number"}
                </span>{" "}
                within 24 hours to schedule a site elevation survey.
              </p>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-forest-deep px-8 py-3.5 text-xs font-bold text-cream hover:bg-forest transition-all"
                >
                  Close & Return to Showcase
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block mb-1">
                Agaate Commercial Estates Advisory
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-deep">
                Request Turnkey Farm Feasibility
              </h3>
              <p className="text-xs text-forest/70 mt-1 mb-6">
                Step {step} of 3 — Complete this brief profile to receive a customized CapEx
                roadmap.
              </p>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-bone rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-terracotta transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              <form onSubmit={handleNext} className="space-y-5">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                        Full Name / Organization *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Farms / Ankit Singh"
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="investor@domain.com"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                          Farm Location / District *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Gurugram, Haryana / Nuh"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                          Total Acreage (Acres) *
                        </label>
                        <input
                          required
                          type="number"
                          min={3}
                          max={1000}
                          value={formData.acres}
                          onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                        Primary Water Source
                      </label>
                      <select
                        value={formData.waterSource}
                        onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      >
                        <option>Borewell with High Discharge</option>
                        <option>Canal Loop Supply</option>
                        <option>Rainwater Harvesting Reservoir</option>
                        <option>River / Stream Proximity</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                        Target Crop Focus
                      </label>
                      <select
                        value={formData.targetCrop}
                        onChange={(e) => setFormData({ ...formData, targetCrop: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      >
                        <option>Commercial Vegetables (Tomato / Chilli / Watermelon)</option>
                        <option>Protected Polyhouse (Capsicum / Hydroponic Cucumber)</option>
                        <option>High-Value Orchards (Pomegranate / Papaya / Dragon Fruit)</option>
                        <option>Multi-Crop Mixed Estate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                        Additional Project Requirements / Soil Context
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Mention soil type, existing borewells, or preferred timeline..."
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-forest/70 hover:bg-bone transition-all"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-forest-deep px-8 py-3 text-xs font-bold text-cream hover:bg-forest shadow-md transition-all"
                  >
                    <span>{step === 3 ? "Submit Feasibility Request" : "Continue"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
