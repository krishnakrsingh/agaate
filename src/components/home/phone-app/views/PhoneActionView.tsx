import { CheckCircle, MapPin } from "@phosphor-icons/react";

export function PhoneActionView() {
  return (
    <div className="flex flex-1 flex-col space-y-3 overflow-y-auto bg-[#fffdf4] p-3.5">
      {/* Satellite Field Map */}
      <div className="group relative h-44 w-full overflow-hidden rounded-2xl border border-[#143d31]/15 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
          alt="Satellite Farm Map"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="20,25 75,18 85,70 30,82"
            className="animate-pulse fill-[#a3e635]/25 stroke-[#a3e635] stroke-[2.5] stroke-dasharray-2"
          />
        </svg>

        <div className="absolute left-[52%] top-[48%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#a3e635]/50" />
          <span className="h-3 w-3 rounded-full bg-[#a3e635] shadow-md ring-2 ring-white" />
        </div>

        <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#143d31]/90 px-2.5 py-1 text-[9px] font-bold text-white shadow-xs backdrop-blur-md">
            <MapPin className="h-3 w-3 text-white" />
            <span>Plot A · Karnal, HR</span>
          </span>
          <span className="rounded-full bg-[#a3e635] px-2.5 py-1 text-[9px] font-extrabold text-[#143d31] shadow-xs">
            Stage: Flowering 🌸
          </span>
        </div>

        <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-[9px] font-bold text-[#143d31] shadow-xs backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>NDVI 0.84 · High Health</span>
          </span>
          <button
            type="button"
            className="rounded-lg bg-[#143d31] px-2 py-1 text-[8px] font-extrabold text-white shadow-xs transition-colors hover:bg-[#3a6b28]"
          >
            🌐 Live Scan
          </button>
        </div>
      </div>

      {/* Telemetry Grid */}
      <div>
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
          Live Field Telemetry Specs
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-[#143d31]/10 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] text-[#536253]">
              <span>Soil Moisture</span>
              <span className="font-bold text-emerald-600">💧 42%</span>
            </div>
            <p className="mt-1 text-xs font-extrabold text-[#143d31]">Optimal Level</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[42%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#143d31]/10 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] text-[#536253]">
              <span>Pest Risk</span>
              <span className="font-bold text-amber-600">🛡️ Low</span>
            </div>
            <p className="mt-1 text-xs font-extrabold text-[#143d31]">Thrips Safe</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[25%] rounded-full bg-amber-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#143d31]/10 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] text-[#536253]">
              <span>Root Temp</span>
              <span className="font-bold text-[#3a6b28]">🌡️ 26.4°C</span>
            </div>
            <p className="mt-1 text-xs font-extrabold text-[#143d31]">Ideal Range</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[65%] rounded-full bg-[#3a6b28]" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#143d31]/10 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] text-[#536253]">
              <span>Drip Cycle</span>
              <span className="font-bold text-[#143d31]">⚡ Active</span>
            </div>
            <p className="mt-1 text-xs font-extrabold text-[#143d31]">NPK 19:19:19</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[80%] rounded-full bg-[#143d31]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stage Advisory Action Plan */}
      <div className="space-y-2.5 rounded-2xl border border-[#143d31]/10 bg-white p-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-[#143d31]">Flowering Advisory Action Plan</p>
          <span className="font-mono text-[9px] font-bold text-[#476f2d]">2 Tasks Active</span>
        </div>
        <div className="flex items-start gap-2.5 border-t border-[#143d31]/8 pt-1 text-xs">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#476f2d]" />
          <p className="leading-tight text-[#536253]">
            Apply NPK 19:19:19 fertigation (2.5 kg/acre) this Thursday through drip.
          </p>
        </div>
        <div className="flex items-start gap-2.5 border-t border-[#143d31]/6 pt-2 text-xs">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#476f2d]" />
          <p className="leading-tight text-[#536253]">
            Inspect underside of leaves for yellow thrips nymph activity & set yellow sticky traps.
          </p>
        </div>
      </div>
    </div>
  );
}
