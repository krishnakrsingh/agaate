import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

type ToastContextType = {
  toast: (toast: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = toast.duration ?? 4000;
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => [newToast, ...prev].slice(0, 5));

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const success = useCallback((title: string, message?: string) => addToast({ type: "success", title, message }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ type: "error", title, message }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ type: "info", title, message }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ type: "warning", title, message }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      {/* Toast Render Dock */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-stone-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              {t.type === "error" && <AlertCircle className="h-4 w-4 text-rose-600" />}
              {t.type === "warning" && <AlertCircle className="h-4 w-4 text-amber-600" />}
              {t.type === "info" && <Info className="h-4 w-4 text-sky-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-stone-900 leading-tight">{t.title}</p>
              {t.message && <p className="mt-0.5 text-xs text-stone-500 leading-relaxed">{t.message}</p>}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-stone-400 hover:text-stone-700 transition-colors p-0.5 rounded-md"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
    };
  }
  return context;
}
