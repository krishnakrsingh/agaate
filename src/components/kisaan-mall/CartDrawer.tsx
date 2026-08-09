import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "@/types";
import { EASE } from "@/components/common/motion";

const spring = { type: "spring", stiffness: 320, damping: 30 } as const;
const popSpring = { type: "spring", stiffness: 520, damping: 16 } as const;

type CartDrawerProps = {
  cart: CartItem[];
  updateQty: (id: string, newQty: number) => void;
  total: number;
  ordered: boolean;
  onReserve: () => void;
};

export function CartDrawer({ cart, updateQty, total, ordered, onReserve }: CartDrawerProps) {
  const [open, setOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.qtyNeeded, 0);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open shopping bag"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest-deep text-cream shadow-xl shadow-forest-deep/30 cursor-pointer"
      >
        <ShoppingBag className="h-5 w-5" />
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={spring}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta font-mono text-[10px] font-bold text-cream"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-forest-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <div>
                  <p className="mb-1 font-jet text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">
                    Acreage synced basket
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-forest-deep">Shopping Bag</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-forest/60 transition-colors hover:text-forest cursor-pointer"
                  aria-label="Close bag"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {ordered ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={spring}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/15 text-moss"
                  >
                    <ShieldCheck className="h-8 w-8" />
                  </motion.div>
                  <h4 className="font-serif text-3xl font-bold text-forest-deep">
                    Inputs Reserved
                  </h4>
                  <p className="max-w-xs text-xs leading-relaxed text-forest/70">
                    Your custom input package order has been successfully queued. An agronomist will
                    review your crop-block details and call to dispatch trays.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-forest-deep px-6 py-3 text-xs font-bold text-cream transition-colors hover:bg-forest cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-1 items-center justify-center p-8">
                  <p className="max-w-xs text-center font-mono text-xs leading-relaxed text-forest/40">
                    Cart is empty. Select products below to build your input package.
                  </p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col">
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 56, scale: 0.92 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
                        >
                          <div className="min-w-0 text-left">
                            <p className="truncate text-xs font-bold text-forest-deep">
                              {item.name}
                            </p>
                            <p className="mt-0.5 font-mono text-[9px] text-forest/40">
                              ₹{item.pricePerAc.toLocaleString("en-IN")}/ac
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qtyNeeded - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-md bg-bone text-forest-deep transition-colors hover:bg-forest/15 cursor-pointer"
                              aria-label={`Decrease ${item.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <motion.span
                              key={item.qtyNeeded}
                              initial={{ scale: 0.4 }}
                              animate={{ scale: 1 }}
                              transition={popSpring}
                              className="w-5 text-center font-mono text-sm font-bold text-forest-deep"
                            >
                              {item.qtyNeeded}
                            </motion.span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qtyNeeded + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-md bg-bone text-forest-deep transition-colors hover:bg-forest/15 cursor-pointer"
                              aria-label={`Increase ${item.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4 border-t border-border p-6">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="uppercase tracking-wider text-forest/40">
                        Est. total system cost
                      </span>
                      <motion.span
                        key={total}
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={spring}
                        className="text-2xl font-bold text-terracotta"
                      >
                        ₹{total.toLocaleString("en-IN")}
                      </motion.span>
                    </div>
                    <button
                      type="button"
                      onClick={onReserve}
                      className="w-full rounded-xl bg-forest-deep py-4 text-sm font-semibold text-cream shadow-md transition-colors hover:bg-forest cursor-pointer"
                    >
                      Reserve Input Package
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
