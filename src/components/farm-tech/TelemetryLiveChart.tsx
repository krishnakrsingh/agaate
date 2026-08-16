import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CellTower, Sliders } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/common/motion";
import { NODES_LIST } from "./farm-tech-data";

interface TelemetryPoint {
  time: string;
  moisture: number;
  ec: number;
  temp: number;
}

export function TelemetryLiveChart() {
  const [moisture, setMoisture] = useState(38);
  const [nodeActive, setNodeActive] = useState("Node-04 (West Block)");
  const [telemetryData, setTelemetryData] = useState<TelemetryPoint[]>([]);

  useEffect(() => {
    const baseMoisture = moisture;
    const data: TelemetryPoint[] = [
      { time: "06:00", moisture: Math.max(10, baseMoisture - 4), ec: 1.8, temp: 22 },
      { time: "08:00", moisture: Math.max(10, baseMoisture - 2), ec: 1.85, temp: 24 },
      { time: "10:00", moisture: Math.min(90, baseMoisture + 3), ec: 1.9, temp: 27 },
      { time: "12:00", moisture: baseMoisture, ec: 1.82, temp: 29.4 },
      { time: "14:00", moisture: Math.max(10, baseMoisture - 3), ec: 1.75, temp: 31.5 },
      { time: "16:00", moisture: Math.max(10, baseMoisture - 1), ec: 1.72, temp: 30.0 },
      { time: "18:00", moisture: Math.max(10, baseMoisture - 5), ec: 1.7, temp: 28.4 },
    ];
    setTelemetryData(data);
  }, [moisture]);

  return (
    <section id="telemetry-cockpit" className="scroll-mt-28">
      <SectionHeader
        align="center"
        eyebrow="FIELD TELEMETRY COCKPIT"
        title="Live Sensor Feeds & Real-Time Probing."
        description="Monitor subterranean soil conditions, electrical conductivity, canopy temperature, and micro-climate fluctuations without leaving your farmhouse."
      />

      <div className="mt-12 rounded-[2.5rem] border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Node Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div className="flex flex-wrap gap-2">
            {NODES_LIST.map((node) => (
              <button
                key={node.label}
                type="button"
                onClick={() => setNodeActive(node.label)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold transition-all ${
                  nodeActive === node.label
                    ? "bg-forest-deep text-cream shadow-md"
                    : "border border-border bg-bone text-forest/70 hover:border-forest/40"
                }`}
              >
                <CellTower className="h-3.5 w-3.5" />
                <span>{node.label}</span>
                <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-700">
                  {node.status}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Sliders className="h-4 w-4 text-forest/60" />
            <label htmlFor="sim-moisture" className="font-mono text-xs font-bold text-forest/60">
              Simulate Moisture: {moisture}%
            </label>
            <input
              id="sim-moisture"
              type="range"
              min={15}
              max={65}
              value={moisture}
              onChange={(e) => setMoisture(Number(e.target.value))}
              className="w-28 cursor-pointer accent-forest"
            />
          </div>
        </div>

        {/* Telemetry Chart */}
        <div className="mt-8 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#6b7280" }} stroke="#d1d5db" />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} stroke="#d1d5db" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d2a21",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="moisture"
                name="Soil Moisture (%)"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMoisture)"
              />
              <Area
                type="monotone"
                dataKey="temp"
                name="Soil Temp (°C)"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTemp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Live Gauges Summary */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/80 pt-6 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-bone p-4 text-center">
            <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
              SOIL MOISTURE
            </span>
            <p className="mt-1 font-serif text-3xl font-bold text-emerald-600">{moisture}%</p>
            <span className="text-[11px] text-forest/70">Optimal root hydration</span>
          </div>

          <div className="rounded-2xl border border-border bg-bone p-4 text-center">
            <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
              ELECTRICAL CONDUCTIVITY (EC)
            </span>
            <p className="mt-1 font-serif text-3xl font-bold text-forest-deep">1.82 mS/cm</p>
            <span className="text-[11px] text-forest/70">Balanced salinity & NPK</span>
          </div>

          <div className="rounded-2xl border border-border bg-bone p-4 text-center">
            <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
              CANOPY TEMP
            </span>
            <p className="mt-1 font-serif text-3xl font-bold text-amber-600">28.4°C</p>
            <span className="text-[11px] text-forest/70">Safe transpiration range</span>
          </div>

          <div className="rounded-2xl border border-border bg-bone p-4 text-center">
            <span className="font-mono text-[10px] font-bold uppercase text-forest/50">
              LORA MESH NODE HEALTH
            </span>
            <p className="mt-1 font-serif text-3xl font-bold text-forest-deep">92% Batt</p>
            <span className="text-[11px] text-emerald-600 font-semibold">
              -42 dBm strong signal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
