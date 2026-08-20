import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  MagnifyingGlass,
  NavigationArrow,
  Truck,
  CheckCircle,
  ShieldCheck,
  Clock,
  CurrencyInr,
  Compass,
  Sparkle,
  ArrowRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOut,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  PINCODE_DATABASE,
  AGAATE_HUBS,
  searchPincodesLetterByLetter,
  findPincode,
  PincodeEntry,
  HubLocation,
} from "./pincodeData";

interface PincodeServiceabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PincodeServiceabilityModal({
  isOpen,
  onClose,
}: PincodeServiceabilityModalProps) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<PincodeEntry>(
    PINCODE_DATABASE[0] // Default to Patna 800001
  );
  const [isLocating, setIsLocating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [focusedHub, setFocusedHub] = useState<HubLocation | null>(null);

  // Predictions letter-by-letter as user types
  const predictions = useMemo(() => {
    return searchPincodesLetterByLetter(searchQuery);
  }, [searchQuery]);

  const handleSelectLocation = (entry: PincodeEntry) => {
    setSelectedLocation(entry);
    setSearchQuery(`${entry.district} (${entry.pincode})`);
  };

  const handleManualSearchSubmit = () => {
    const matched = findPincode(searchQuery);
    if (matched) {
      setSelectedLocation(matched);
    }
  };

  // Browser Geolocation auto-detect
  const handleGeoLocate = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        // Map latitude to nearest database entry
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        let closest = PINCODE_DATABASE[0];
        let minDist = Infinity;

        PINCODE_DATABASE.forEach((item) => {
          const d = Math.hypot(item.lat - userLat, item.lng - userLng);
          if (d < minDist) {
            minDist = d;
            closest = item;
          }
        });

        setSelectedLocation(closest);
        setSearchQuery(`${closest.district} (${closest.pincode})`);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  // Map projection helpers for India SVG viewport (bounds approx Lat 8-37 N, Lng 68-97 E)
  const mapWidth = 440;
  const mapHeight = 440;
  const convertCoordsToSvg = (lat: number, lng: number) => {
    const x = ((lng - 68) / (97 - 68)) * mapWidth;
    const y = mapHeight - ((lat - 8) / (37 - 8)) * mapHeight;
    return { x, y };
  };

  const targetSvgPos = convertCoordsToSvg(
    selectedLocation.lat,
    selectedLocation.lng
  );
  const hubSvgPos = convertCoordsToSvg(
    selectedLocation.hubLat,
    selectedLocation.hubLng
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0c241d]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#f4f8f5] shadow-2xl border border-[#143d31]/20 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#143d31]/10 bg-[#143d31] px-5 sm:px-6 py-4 text-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a3e635] text-[#143d31] font-bold shadow-md">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#a3e635] uppercase tracking-widest">
                    {isHindi ? "राष्ट्रीय लॉजिस्टिक्स नेटवर्क" : "NATIONAL EXPRESS NETWORK"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                    15,000+ PIN Codes
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight mt-0.5">
                  {isHindi
                    ? "पिनकोड एवं खेत डिलीवरी सेवा क्षेत्र"
                    : "Pincode Serviceability & Farm Gate Delivery"}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Modal Main Body (Grid split: Left search / Right map) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-[#143d31]/10">
            {/* ── LEFT COLUMN: Interactive Selector & Search Predictions ── */}
            <div className="lg:col-span-6 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Search Box with Real Predictions */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#143d31] uppercase tracking-wider font-mono">
                    {isHindi ? "पिनकोड या जिला खोजें" : "Search Pincode or District"}
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-3.5 top-3 text-[#4f624f]">
                      <MagnifyingGlass className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleManualSearchSubmit();
                      }}
                      placeholder={
                        isHindi
                          ? "पिनकोड, जिला या राज्य टाइप करें (उदा. 800001, पटना, वाराणसी)"
                          : "Type PIN code or district (e.g. 800001, Patna, Varanasi)"
                      }
                      className="w-full rounded-2xl border border-[#143d31]/20 bg-white py-2.5 pl-10 pr-24 text-sm font-medium text-[#143d31] placeholder-[#4f624f]/60 focus:border-[#143d31] focus:outline-none focus:ring-2 focus:ring-[#143d31]/10 transition-all shadow-sm"
                    />

                    <button
                      type="button"
                      onClick={handleGeoLocate}
                      disabled={isLocating}
                      className="absolute right-2 top-1.5 flex items-center gap-1 rounded-xl bg-[#143d31]/10 px-2.5 py-1 text-xs font-semibold text-[#143d31] hover:bg-[#143d31]/20 transition-colors cursor-pointer"
                      title="Use current GPS location"
                    >
                      <NavigationArrow
                        className={`h-3.5 w-3.5 ${isLocating ? "animate-spin text-[#5d7d37]" : ""}`}
                      />
                      <span className="hidden sm:inline">
                        {isLocating ? "Locating..." : "Auto Detect"}
                      </span>
                    </button>
                  </div>

                  {/* Dynamic Predictions Dropdown (Letter-by-Letter Real Match) */}
                  <AnimatePresence>
                    {searchQuery.trim().length > 0 && predictions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="rounded-2xl border border-[#143d31]/15 bg-white p-2 shadow-lg max-h-48 overflow-y-auto space-y-1 z-30"
                      >
                        <p className="px-2 py-1 font-mono text-[10px] font-bold text-[#5d7d37] uppercase tracking-wider border-b border-[#143d31]/5">
                          {isHindi ? "अक्षर-दर-अक्षर खोज परिणाम:" : "Live Predictive Results:"}
                        </p>
                        {predictions.map((item) => (
                          <button
                            key={item.pincode}
                            type="button"
                            onClick={() => handleSelectLocation(item)}
                            className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-[#f4f8f5] flex items-center justify-between text-xs font-medium text-[#143d31] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-[#5d7d37] shrink-0" />
                              <span>
                                <strong>{item.district}</strong>, {item.state}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#5d7d37]">
                              {item.pincode}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Popular Agricultural District Preset Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-[#4f624f] font-semibold">
                    {isHindi ? "प्रमुख कृषि हब:" : "Quick Agriculture Hubs:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PINCODE_DATABASE.slice(0, 6).map((item) => (
                      <button
                        key={item.pincode}
                        type="button"
                        onClick={() => handleSelectLocation(item)}
                        className={`rounded-xl border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                          selectedLocation.pincode === item.pincode
                            ? "border-[#143d31] bg-[#143d31] text-white shadow-sm"
                            : "border-[#143d31]/15 bg-white text-[#143d31] hover:border-[#143d31]"
                        }`}
                      >
                        {item.district} <span className="font-mono opacity-80">({item.pincode})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Location Information Card */}
                <div className="rounded-2xl bg-[#143d31] p-4 text-white shadow-md space-y-3">
                  <div className="flex items-start justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#a3e635] font-mono text-xs font-bold">
                        <CheckCircle className="h-4 w-4" />
                        <span>
                          {isHindi ? "डिलीवरी उपलब्ध है" : "Serviceable Location"}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-white mt-0.5">
                        {selectedLocation.district}, {selectedLocation.state}
                      </h4>
                      <p className="font-mono text-xs text-white/70">
                        PIN Code: {selectedLocation.pincode}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#a3e635]/20 px-2.5 py-1 text-[10px] font-bold text-[#a3e635] border border-[#a3e635]/40 uppercase tracking-wider">
                      {selectedLocation.deliveryDays}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-white/85">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-[#a3e635] shrink-0" />
                      <span>{selectedLocation.hub}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#a3e635] shrink-0" />
                      <span>Est: {selectedLocation.deliveryDays} Gate Dispatch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#a3e635] shrink-0" />
                      <span>QR Sealed Batch Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CurrencyInr className="h-4 w-4 text-[#a3e635] shrink-0" />
                      <span>COD & Pay-After-Check</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Callout */}
              <div className="rounded-xl border border-dashed border-[#143d31]/20 bg-white p-3 text-xs text-[#4f624f] flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-[#5d7d37] shrink-0" />
                <span>
                  {isHindi
                    ? "सभी ऑर्डर सीधे क्षेत्रीय अगाते हब से पैक होकर 100% क्यूआर-वेरिफाइड सील के साथ आपके खेत तक पहुंचते हैं।"
                    : "All orders dispatched sealed with QR-traceability direct to field gate across 15,000+ PIN codes."}
                </span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Interactive Vector Map & Route Visualizer ── */}
            <div className="lg:col-span-6 bg-[#0f2e25] p-5 sm:p-6 text-white relative flex flex-col justify-between min-h-[380px]">
              {/* Map Header Overlay */}
              <div className="flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[#a3e635]" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {isHindi ? "लाइव लॉजिस्टिक्स हब मैप" : "Live Regional Hub Map"}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
                    className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
                    title="Zoom in"
                  >
                    <MagnifyingGlassPlus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                    className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
                    title="Zoom out"
                  >
                    <MagnifyingGlassMinus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="p-1 rounded-lg hover:bg-white/20 text-white cursor-pointer"
                    title="Reset view"
                  >
                    <ArrowsOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Interactive Vector Map SVG Stage */}
              <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden my-2 flex items-center justify-center">
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <svg
                    viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                    className="w-full h-full drop-shadow-2xl"
                  >
                    {/* Background Grid Pattern */}
                    <defs>
                      <pattern
                        id="grid-map-pat"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a3e635" stopOpacity="1" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <rect
                      width={mapWidth}
                      height={mapHeight}
                      fill="url(#grid-map-pat)"
                    />

                    {/* Stylized India Outline Shapes */}
                    <path
                      d="M 170 60 L 220 50 L 270 70 L 300 120 L 340 160 L 320 220 L 260 260 L 210 370 L 170 330 L 140 260 L 110 200 L 120 120 Z"
                      fill="rgba(20, 61, 49, 0.6)"
                      stroke="rgba(163, 230, 53, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />

                    {/* Hub Coverage Radius Circles */}
                    {AGAATE_HUBS.map((hub) => {
                      const pos = convertCoordsToSvg(hub.lat, hub.lng);
                      return (
                        <circle
                          key={hub.id}
                          cx={pos.x}
                          cy={pos.y}
                          r="35"
                          fill="rgba(163, 230, 53, 0.05)"
                          stroke="rgba(163, 230, 53, 0.2)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Animated Delivery Route Arc Line from Nearest Hub to Target */}
                    <motion.path
                      d={`M ${hubSvgPos.x} ${hubSvgPos.y} Q ${(hubSvgPos.x + targetSvgPos.x) / 2 - 20} ${(hubSvgPos.y + targetSvgPos.y) / 2 - 20} ${targetSvgPos.x} ${targetSvgPos.y}`}
                      fill="none"
                      stroke="url(#routeGrad)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                    />

                    {/* All Agaate Hub Markers */}
                    {AGAATE_HUBS.map((hub) => {
                      const pos = convertCoordsToSvg(hub.lat, hub.lng);
                      const isSelectedHub =
                        selectedLocation.hub.toLowerCase().includes(hub.state.toLowerCase()) ||
                        selectedLocation.hub === hub.name;

                      return (
                        <g
                          key={hub.id}
                          className="cursor-pointer group"
                          onClick={() => setFocusedHub(hub)}
                        >
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="6"
                            fill={isSelectedHub ? "#a3e635" : "#143d31"}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="12"
                            fill="none"
                            stroke={isSelectedHub ? "#a3e635" : "rgba(255,255,255,0.3)"}
                            strokeWidth="1.5"
                            className="animate-ping"
                          />
                          <text
                            x={pos.x + 10}
                            y={pos.y + 3}
                            fill="#ffffff"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                            className="pointer-events-none drop-shadow-md"
                          >
                            {hub.name.replace("Agaate ", "")}
                          </text>
                        </g>
                      );
                    })}

                    {/* Selected Target Location Pin */}
                    <g>
                      <circle
                        cx={targetSvgPos.x}
                        cy={targetSvgPos.y}
                        r="8"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <circle
                        cx={targetSvgPos.x}
                        cy={targetSvgPos.y}
                        r="18"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                      <text
                        x={targetSvgPos.x + 12}
                        y={targetSvgPos.y + 4}
                        fill="#a3e635"
                        fontSize="10"
                        fontWeight="bold"
                        className="drop-shadow-md"
                      >
                        📍 {selectedLocation.district} ({selectedLocation.pincode})
                      </text>
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Map Footer Route Bar */}
              <div className="z-20 rounded-xl bg-white/10 backdrop-blur-md p-3 text-xs flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#a3e635] shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] font-bold text-[#a3e635] uppercase">
                      {selectedLocation.hub}
                    </p>
                    <p className="text-white/80 font-medium">
                      Direct Dispatch Route ➔ {selectedLocation.district} ({selectedLocation.pincode})
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[11px] font-bold text-[#a3e635] bg-black/30 px-2.5 py-1 rounded-lg">
                  {selectedLocation.deliveryDays}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
