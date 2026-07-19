import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import {
  Cpu,
  ShieldCheck,
  Activity,
  Wifi,
  Compass,
  Sparkles,
  Thermometer,
  Droplets,
  AlertTriangle,
  Play,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/services/farm-tech")({
  component: FarmTech,
});

function FarmTech() {
  const [moisture, setMoisture] = useState(38); // percentage
  const [nodeActive, setNodeActive] = useState("Node-04 (West Block)");
  const [isPlayingFlight, setIsPlayingFlight] = useState(false);
  const [flightProgress, setFlightProgress] = useState(0);

  // Generate realistic sensor logs over a 12-hour period based on the selected soil moisture slider
  const [telemetryData, setTelemetryData] = useState<any[]>([]);

  useEffect(() => {
    const baseMoisture = moisture;
    const data = [
      { time: "06:00", moisture: baseMoisture - 3, ec: 1.8, temp: 22 },
      { time: "08:00", moisture: baseMoisture - 1, ec: 1.85, temp: 24 },
      { time: "10:00", moisture: baseMoisture + 2, ec: 1.9, temp: 27 },
      { time: "12:00", moisture: baseMoisture, ec: 1.78, temp: 29 },
      { time: "14:00", moisture: baseMoisture - 2, ec: 1.75, temp: 31 },
      { time: "16:00", moisture: baseMoisture - 1, ec: 1.72, temp: 30 },
      { time: "18:00", moisture: baseMoisture - 4, ec: 1.7, temp: 28 },
    ];
    setTelemetryData(data);
  }, [moisture]);

  const runDroneFlight = () => {
    setIsPlayingFlight(true);
    setFlightProgress(0);
    const interval = setInterval(() => {
      setFlightProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsPlayingFlight(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 3000);
  };

  const getAdvice = (m: number) => {
    if (m < 30) {
      return {
        status: "Critical Low",
        color: "text-red-500 bg-red-50 border-red-200",
        icon: AlertTriangle,
        text: "Soil moisture is below safe threshold. Trigger automated drip line valves for 45 minutes immediately to avoid vascular collapse.",
      };
    } else if (m >= 30 && m <= 45) {
      return {
        status: "Optimal Range",
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        icon: ShieldCheck,
        text: "Soil moisture tension is perfectly balanced. Drip lines remain inactive. Root cell expansion index is stable.",
      };
    } else {
      return {
        status: "Saturated",
        color: "text-yellow-700 bg-yellow-50 border-yellow-200",
        icon: AlertTriangle,
        text: "Soil moisture exceeds root capacity. Suspend active irrigation cycles to prevent anaerobic root stress and phytophthora risks.",
      };
    }
  };

  const advice = getAdvice(moisture);

  const nodesList = [
    { label: "Node-04 (West Block)", status: "Active", battery: "92%" },
    { label: "Node-07 (North Nursery)", status: "Active", battery: "85%" },
    { label: "Node-02 (East Polyhouse)", status: "Standby", battery: "98%" },
  ];

  return (
    <main className="bg-cream text-ink antialiased min-h-screen flex flex-col font-sans">
      <Header />

      {/* Hero */}
      <div className="pt-40 pb-24 px-6 lg:px-12 bg-bone border-b border-[#E7ECE8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-forest)_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <span className="font-jet text-[11px] uppercase tracking-[0.22em] text-forest mb-4 block font-bold">
            SERVICE VERTICAL · 03
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-forest-deep mb-6 leading-[1.05] tracking-tight">
            Farm Tech & <span className="italic text-terracotta">IoT.</span>
          </h1>
          <p className="text-xl md:text-2xl text-forest/80 leading-relaxed font-normal max-w-2xl">
            Continuous telemetry solar probes, LoRa mesh node channels, and drone multispectral
            mapping giving you complete soil visibility.
          </p>
        </div>
      </div>

      <div className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-grow space-y-32">
        {/* Core details & Telemetry Live Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-8 text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold tracking-tight leading-tight">
              Science on the field, telemetry in the pocket
            </h2>
            <p className="text-forest/75 text-sm md:text-base leading-relaxed">
              Traditional crop scouting only catches disease after visual leaf lesions appear. Our
              LoRa field arrays monitor soil moisture tension, electro-conductivity (EC), and
              ambient humidity continuously, catching growth halts 5 days before visible wilting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E7ECE8]">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    LoRa Mesh Network
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Continuous transmission up to 3km from regional hubs with zero cell-tower dependency.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 border border-forest/10">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep text-sm md:text-base">
                    Drone Analytics
                  </h4>
                  <p className="text-xs text-forest/65 leading-relaxed mt-1">
                    Bi-weekly flyover flights evaluating NDVI leaf indices to target nitrogen dosing.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Live warning alerts banner */}
            <div className={`p-6 border rounded-2xl flex gap-4 text-xs font-sans items-start ${advice.color}`}>
              <advice.icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block font-mono">Telemetry Alert · {advice.status}</span>
                <p className="mt-1 leading-relaxed text-forest-deep/80">{advice.text}</p>
              </div>
            </div>
          </div>

          {/* Telemetry Simulator Box */}
          <div className="lg:col-span-6 bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 text-left space-y-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                  Active Reading Dashboard
                </span>
                <h3 className="font-serif text-3xl text-forest-deep font-bold">
                  {nodeActive}
                </h3>
              </div>
              <div className="flex gap-2">
                {nodesList.map((node) => (
                  <button
                    key={node.label}
                    onClick={() => setNodeActive(node.label)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                      nodeActive === node.label
                        ? "bg-forest border-forest text-cream"
                        : "bg-white border-[#E7ECE8] text-forest/70 hover:border-forest"
                    }`}
                  >
                    {node.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Chart using Recharts */}
            <div className="bg-white border border-[#E7ECE8] rounded-2xl p-4 shadow-sm">
              <span className="text-[10px] font-mono text-forest/45 uppercase block mb-3 font-semibold">12h Soil Moisture Curve (%)</span>
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetryData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F2" />
                    <XAxis dataKey="time" stroke="#59635D" fontSize={9} fontFamily="var(--font-mono)" />
                    <YAxis domain={[0, 100]} stroke="#59635D" fontSize={9} fontFamily="var(--font-mono)" />
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #E7ECE8" }} />
                    <Area type="monotone" dataKey="moisture" stroke="var(--color-forest)" strokeWidth={2} fillOpacity={1} fill="url(#moistGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Slider to adjust moisture */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-forest/60 uppercase font-semibold">Simulate Soil moisture tension</span>
                <span className="font-bold text-forest-deep">{moisture}%</span>
              </div>
              <input
                type="range"
                min={15}
                max={75}
                value={moisture}
                onChange={(e) => setMoisture(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#E7ECE8] rounded-lg appearance-none cursor-pointer accent-forest"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="bg-white p-3.5 border border-[#E7ECE8] rounded-xl">
                <span className="text-forest/40 block text-[9px]">NPK SALINITY</span>
                <span className="text-forest-deep font-bold text-sm">1.82 mS/cm</span>
              </div>
              <div className="bg-white p-3.5 border border-[#E7ECE8] rounded-xl">
                <span className="text-forest/40 block text-[9px]">SOIL TEMP</span>
                <span className="text-terracotta font-bold text-sm">28.4°C</span>
              </div>
              <div className="bg-white p-3.5 border border-[#E7ECE8] rounded-xl">
                <span className="text-forest/40 block text-[9px]">NODE BATTERY</span>
                <span className="text-emerald-600 font-bold text-sm">92% OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drone Multispectral Scan block */}
        <div className="border-t border-[#E7ECE8] pt-24 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="font-jet text-[10px] tracking-widest uppercase text-forest/40 font-bold block">NDVI AERIAL SURVEILLANCE</span>
              <h3 className="font-serif text-4xl md:text-5xl text-forest-deep font-bold leading-tight">
                Drone Multispectral Flight Paths
              </h3>
              <p className="text-forest/75 text-sm leading-relaxed">
                Bi-weekly drone scans evaluate the Normalized Difference Vegetation Index (NDVI). By analyzing near-infrared light reflection, we generate crop nitrogen deficiency maps, allowing localized dosing instead of wasting expensive fertilizer across healthy areas.
              </p>
              <button
                onClick={runDroneFlight}
                disabled={isPlayingFlight}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-all duration-300 shadow-md ${
                  isPlayingFlight
                    ? "bg-forest/40 text-cream/70 cursor-not-allowed"
                    : "bg-forest-deep hover:bg-forest text-cream cursor-pointer"
                }`}
              >
                {isPlayingFlight ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Drone Mapping in progress...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-cream" />
                    <span>Trigger Diagnostic Drone Flight</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-bone rounded-[2.5rem] border border-[#E7ECE8] p-8 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1a3c34_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div className="flex justify-between items-center font-mono text-[10px] text-forest/50">
                  <span>FLIGHT MISSION: BLOCK_A_TOMATOES</span>
                  <span>STATUS: {isPlayingFlight ? "FLIGHT SIMULATION LIVE" : "MISSION WAITING"}</span>
                </div>

                {isPlayingFlight ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-forest/5 text-forest flex items-center justify-center mx-auto mb-2 animate-bounce border border-forest/15">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div className="w-full h-2 bg-white border border-[#E7ECE8] rounded-full overflow-hidden">
                      <div className="h-full bg-forest transition-all duration-300 rounded-full" style={{ width: `${flightProgress}%` }} />
                    </div>
                    <span className="text-center block text-xs font-mono text-forest font-bold">Scanning Field Grids... {flightProgress}%</span>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <Compass className="w-12 h-12 text-forest/30 mx-auto" />
                    <h4 className="font-serif text-2xl text-forest-deep font-bold">Drone Diagnostics Standby</h4>
                    <p className="text-xs text-forest/65 max-w-xs mx-auto">
                      Click the trigger button to simulate compiling leaf reflectance indices and diagnosing nitrogen patches.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E7ECE8]/50 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-forest/40 block text-[9px]">LAST FLIGHT DATE</span>
                    <span className="font-bold text-forest-deep">July 15, 2026</span>
                  </div>
                  <div>
                    <span className="text-forest/40 block text-[9px]">NITROGEN PRESCRIPTION</span>
                    <span className="font-bold text-terracotta">Pending Scan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
