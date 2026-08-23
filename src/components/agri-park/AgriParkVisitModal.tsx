import { useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  X,
  MapPin,
} from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { SlideUpPillButton } from "@/components/ui/SlideUpPillButton";
import { submitLead } from "@/functions/submit-lead";
import { getLocalizedPath } from "@/lib/i18n";

function makeClientToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function AgriParkVisitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  const isHindi = location.pathname === "/hi" || location.pathname.startsWith("/hi/");
  const currentLang = isHindi ? "hi" : "en";
  const privacyHref = getLocalizedPath("/privacy-policy", currentLang);

  const todayStr = new Date().toISOString().split("T")[0];
  const [visitDate, setVisitDate] = useState(todayStr);
  const [visitorType, setVisitorType] = useState("Individual Progressive Farmer");
  const [cropFocus, setCropFocus] = useState("Commercial Open-Field Vegetables");
  const [groupCount, setGroupCount] = useState("1-2 People (Individual Tour)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const clientToken = useRef(makeClientToken());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!consent) {
      setFormError("Please accept the privacy notice to continue.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(normalizePhone(phone))) {
      setFormError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        data: {
          name: name.trim(),
          phone,
          topic: "agripark",
          crop: cropFocus,
          district: district.trim() || undefined,
          channel: "Phone",
          visitDate,
          visitorType,
          groupCount,
          consent: true,
          honeypot,
          startedAt: startedAt.current,
          clientToken: clientToken.current,
          sourcePage: location.pathname,
        },
      });

      if (!result.ok) {
        setFormError(result.error);
        return;
      }

      setTicketId(result.ticketId);
      setIsSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again or call our team.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId(null);
    setFormError(null);
    setConsent(false);
    setHoneypot("");
    startedAt.current = Date.now();
    clientToken.current = makeClientToken();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a231b]/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative w-full max-w-2xl rounded-3xl sm:rounded-[2rem] border border-[#143d31]/15 bg-[#fbfdfa] p-6 sm:p-8 md:p-10 shadow-2xl z-10 text-left overflow-hidden text-[#143d31]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-5 top-5 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#143d31]/5 hover:bg-[#143d31]/10 text-[#143d31] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-5"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#143d31] text-[#a3e635] shadow-lg ring-4 ring-[#a3e635]/30">
                <CheckCircle className="h-8 w-8" weight="fill" />
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#5d7d37] block">
                  Field Pass Reference: {ticketId}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#143d31] mt-1">
                  Agri Park Field Visit Registered!
                </h3>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-[#143d31]/10 bg-white p-5 text-left space-y-2.5 font-sans text-xs shadow-xs">
                <div className="flex justify-between border-b border-[#143d31]/8 pb-2">
                  <span className="text-[#4f624f]">Visitor Name:</span>
                  <span className="font-bold text-[#143d31]">{name || "Valued Guest"}</span>
                </div>
                <div className="flex justify-between border-b border-[#143d31]/8 pb-2">
                  <span className="text-[#4f624f]">Scheduled Date:</span>
                  <span className="font-bold text-[#5d7d37]">{visitDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#143d31]/8 pb-2">
                  <span className="text-[#4f624f]">Location:</span>
                  <span className="font-bold text-[#143d31]">Kukrola, Gurugram (NH-8) · 5-Acre Proving Ground</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4f624f]">Crop Focus:</span>
                  <span className="font-bold text-[#143d31]">{cropFocus}</span>
                </div>
              </div>

              <p className="text-xs text-[#4f624f] max-w-md mx-auto leading-relaxed">
                Our Kisan Sathi field coordinator will call{" "}
                <span className="font-bold text-[#143d31]">{phone || "your number"}</span> to
                confirm directions and assemble your trial walkthrough itinerary.
              </p>

              <div className="pt-2 flex justify-center">
                <SlideUpPillButton
                  onClick={handleReset}
                  variant="dark"
                  size="md"
                  label="Close & Return to Page"
                />
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#5d7d37]" weight="fill" />
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5d7d37]">
                  Kukrola, Gurugram · 5-Acre Living Farm
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#143d31]">
                Book Farm Visit & Field Day
              </h3>
              <p className="text-xs sm:text-sm text-[#4f624f] mt-1 mb-6 leading-relaxed">
                Walk through all 8 living innovation demonstration zones, observe real partner crop trials, and
                consult directly with our agronomists on live soil.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ramesh Yadav"
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Preferred Visit Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={visitDate}
                      min={todayStr}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Visitor Category
                    </label>
                    <select
                      value={visitorType}
                      onChange={(e) => setVisitorType(e.target.value)}
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs cursor-pointer"
                    >
                      <option>Individual Progressive Farmer</option>
                      <option>Commercial Agri Estate Investor</option>
                      <option>Agri Input Dealer / Distributor</option>
                      <option>Academic / Student Delegation</option>
                      <option>Corporate Agri Partner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Primary Crop Interest
                    </label>
                    <select
                      value={cropFocus}
                      onChange={(e) => setCropFocus(e.target.value)}
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs cursor-pointer"
                    >
                      <option>Commercial Open-Field Vegetables</option>
                      <option>Protected Polyhouse & Hydroponics</option>
                      <option>Precision Drip & Fertigation Systems</option>
                      <option>Bio-Boosted Nursery Seedling Plugs</option>
                      <option>Agri Drone Scouting & IoT Sensors</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                      Expected Group Size
                    </label>
                    <select
                      value={groupCount}
                      onChange={(e) => setGroupCount(e.target.value)}
                      className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs cursor-pointer"
                    >
                      <option>1-2 People (Individual Tour)</option>
                      <option>3-5 People (Family / Business Partners)</option>
                      <option>6-15 People (Farmer Group / Delegation)</option>
                      <option>15+ People (Bus / Institution Delegation)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#143d31]/80 mb-1.5">
                    District / State
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Gurugram, Haryana / Rewari / Alwar"
                    className="w-full rounded-xl border border-[#143d31]/15 bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#143d31] placeholder:text-[#143d31]/35 focus:border-[#143d31] focus:ring-1 focus:ring-[#143d31] focus:outline-none transition-all shadow-xs"
                  />
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#143d31]/30 text-[#143d31] focus:ring-[#143d31]"
                  />
                  <span className="text-[11px] text-[#4f624f] leading-relaxed">
                    I agree to be contacted about this visit and accept the{" "}
                    <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="underline text-[#143d31]">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>

                {formError && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <div className="pt-3">
                  <SlideUpPillButton
                    type="submit"
                    variant="dark"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    label={isSubmitting ? "Registering..." : "Register Field Visit Pass"}
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
