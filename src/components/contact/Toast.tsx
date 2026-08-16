import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "@phosphor-icons/react";
import { EASE } from "@/components/common/motion";
import { ToastContext, type ToastItem, type ToastKind } from "./toast-context";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => [...prev, { id, message, kind }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-24 left-1/2 z-[80] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-2 sm:bottom-8"
        aria-live="polite"
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.28, ease: EASE }}
              role="status"
              className={`pointer-events-auto flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-medium shadow-md ${
                item.kind === "success"
                  ? "border-forest-deep bg-forest-deep text-white"
                  : item.kind === "error"
                    ? "border-destructive/40 bg-white text-destructive"
                    : "border-neutral-200 bg-white text-forest-deep"
              }`}
            >
              {item.kind === "success" ? (
                <Check className="h-4 w-4 shrink-0" />
              ) : item.kind === "error" ? (
                <X className="h-4 w-4 shrink-0" />
              ) : null}
              <span>{item.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
