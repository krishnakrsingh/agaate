import { createContext, useContext } from "react";

export type ToastKind = "success" | "error" | "info";
export type ToastItem = { id: string; message: string; kind: ToastKind };
export type ToastContextValue = { toast: (message: string, kind?: ToastKind) => void };

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: (message: string) => {
        if (typeof window !== "undefined") console.info(message);
      },
    };
  }
  return ctx;
}
