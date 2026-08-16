import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "@phosphor-icons/react";

interface ParivaarRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ParivaarRegistrationModal({ isOpen, onClose }: ParivaarRegistrationModalProps) {
  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    village: "",
    acres: "1-5 Acres",
    crops: "Watermelon & Chilli",
    support: "Disease Control & Saplings",
  });
  const [registeredMemberId, setRegisteredMemberId] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      const memberId = `PARIVAAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsRegistering(false);
      setRegisteredMemberId(memberId);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setRegisteredMemberId(null);
    onClose();
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
              onClick={handleResetAndClose}
              className="absolute right-6 top-6 cursor-pointer text-forest/40 hover:text-forest"
            >
              <X className="h-5 w-5" />
            </button>

            {registeredMemberId ? (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8 animate-bounce" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-forest-deep">
                  Welcome to Agaate Parivaar!
                </h4>
                <div className="rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4 font-mono text-sm font-bold text-emerald-900">
                  Member ID: {registeredMemberId}
                </div>
                <p className="mx-auto max-w-xs text-xs text-forest/70">
                  Your regional Kisan Sathi will contact you on WhatsApp to add you to the active
                  grower advisory group.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-4 rounded-xl bg-forest-deep px-6 py-2.5 font-mono text-xs font-bold text-cream"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-moss">
                    FREE GROWER MEMBERSHIP
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-forest-deep">
                    Join Agaate Parivaar
                  </h4>
                  <p className="text-xs text-forest/60">
                    Get free daily WhatsApp crop advice & buyback priority.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="mb-1 block text-forest/60">Farmer Full Name:</label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      placeholder="e.g. Surender Yadav"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">WhatsApp Mobile Number:</label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="e.g. 98120XXXXX"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-forest/60">Village / Tehsil:</label>
                    <input
                      type="text"
                      required
                      value={regForm.village}
                      onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                      placeholder="e.g. Bhora Kalan, Gurugram"
                      className="w-full rounded-xl border border-border bg-bone p-3 font-bold text-forest-deep focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isRegistering}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-forest-deep py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-forest disabled:opacity-50"
                >
                  {isRegistering ? "Enrolling Member..." : "Join the Parivaar Free"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
