import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loginAdmin } from "@/functions/admin-auth";
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function AdminLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f8faf8] px-4 py-12 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-stone-200/90 bg-white/95 p-8 shadow-xl backdrop-blur-md transition-all">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="mt-4 text-xs font-bold uppercase tracking-widest text-emerald-800">
            Agaate Agricultural CRM
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Admin Sign In</h1>
          <p className="mt-1 text-xs text-stone-500">
            Internal enterprise console for agronomists and operators.
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-7 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            setError(null);
            const res = await loginAdmin({ data: { email, password } });
            setPending(false);
            if (!res.ok) {
              setError(res.error);
              return;
            }
            await navigate({ to: "/agaate-admin" });
          }}
        >
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="email"
                autoComplete="username"
                required
                placeholder="admin@agaate.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 pl-10 pr-3 py-2.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 pl-10 pr-3 py-2.5 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium animate-in fade-in duration-150">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3 text-xs font-semibold text-white shadow-md hover:bg-emerald-800 transition-all disabled:opacity-60"
          >
            <span>{pending ? "Signing in..." : "Sign In to Admin"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Demo Fast Login Shortcuts */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
            Quick Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillDemo("admin@agaate.in")}
              className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 text-left hover:bg-stone-100 hover:border-emerald-200 transition-all"
            >
              <p className="font-semibold text-stone-800 text-[11px]">Super Admin</p>
              <p className="text-[10px] text-stone-400">admin@agaate.in</p>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("aman@agaate.in")}
              className="rounded-xl border border-stone-200 bg-stone-50/70 p-2 text-left hover:bg-stone-100 hover:border-emerald-200 transition-all"
            >
              <p className="font-semibold text-stone-800 text-[11px]">Field Agronomist</p>
              <p className="text-[10px] text-stone-400">aman@agaate.in</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
