import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  X,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";

export function AgriParkVisitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [visitDate, setVisitDate] = useState("2026-08-18");
  const [visitorType, setVisitorType] = useState("Farmer");
  const [cropFocus, setCropFocus] = useState("Commercial Vegetables");
  const [groupCount, setGroupCount] = useState("1-2 People");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
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

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-5"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle className="h-10 w-10" />
              </div>

              <div>
                <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block">
                  VIP Field Pass Reference: #PARK-{Math.floor(Math.random() * 89999) + 10000}
                </span>
                <h3 className="font-serif text-3xl font-bold text-forest-deep mt-1">
                  Agri Park Field Visit Registered!
                </h3>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-forest/20 bg-card p-6 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-forest/50">Visitor Name:</span>
                  <span className="font-bold text-forest-deep">{name || "Valued Guest"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-forest/50">Scheduled Date:</span>
                  <span className="font-bold text-terracotta">{visitDate}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-forest/50">Location:</span>
                  <span className="font-bold text-forest-deep">Kukrola, Gurugram (NH8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest/50">Crop Focus:</span>
                  <span className="font-bold text-moss">{cropFocus}</span>
                </div>
              </div>

              <p className="text-xs text-forest/70 max-w-md mx-auto leading-relaxed">
                Our Kisan Sathi field coordinator will call{" "}
                <span className="font-bold text-forest-deep">{phone || "your number"}</span> to
                confirm directions and assemble your trial walkthrough itinerary.
              </p>

              <div className="pt-4 flex justify-center">
                <SlideUpPillButton
                  onClick={handleReset}
                  variant="dark"
                  size="md"
                  label="Close & Explore 8 Zones"
                />
              </div>
            </motion.div>
          ) : (
            <div>
              <span className="font-jet text-[10px] font-bold uppercase tracking-widest text-terracotta block mb-1">
                Kukrola, Gurugram · 17-Acre Living Farm
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-deep">
                Book VIP Farm Visit & Field Day
              </h3>
              <p className="text-xs text-forest/70 mt-1 mb-6">
                Walk through all 8 living innovation zones, observe real crop trial beds, and
                consult directly with our agronomists.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ramesh Yadav"
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Preferred Visit Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Visitor Category
                    </label>
                    <select
                      value={visitorType}
                      onChange={(e) => setVisitorType(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    >
                      <option>Individual Progressive Farmer</option>
                      <option>Commercial Agri Estate Investor</option>
                      <option>Agri Input Dealer / Distributor</option>
                      <option>Academic / Student Delegation</option>
                      <option>Corporate Agri Partner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Primary Crop Interest
                    </label>
                    <select
                      value={cropFocus}
                      onChange={(e) => setCropFocus(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    >
                      <option>Commercial Open-Field Vegetables</option>
                      <option>Protected Polyhouse & Hydroponics</option>
                      <option>Precision Drip & Fertigation Systems</option>
                      <option>Bio-Boosted Nursery Seedling Plugs</option>
                      <option>Agri Drone Scouting & IoT Sensors</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                      Expected Group Size
                    </label>
                    <select
                      value={groupCount}
                      onChange={(e) => setGroupCount(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                    >
                      <option>1-2 People (Individual Tour)</option>
                      <option>3-5 People (Family / Business Partners)</option>
                      <option>6-15 People (Farmer Group / Delegation)</option>
                      <option>15+ People (Bus / Institution Delegation)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-forest/70 mb-1.5">
                    District / State
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Gurugram, Haryana / Rewari / Alwar"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <SlideUpPillButton
                    type="submit"
                    variant="dark"
                    size="lg"
                    fullWidth
                    label="Register VIP Field Visit Pass"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  />
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
