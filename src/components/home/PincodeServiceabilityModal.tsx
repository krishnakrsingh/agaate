import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  MagnifyingGlass,
  NavigationArrow,
  Truck,
  CheckCircle,
  ShieldCheck,
  CurrencyInr,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  PINCODE_DATABASE,
  AGAATE_HUBS,
  fetchLivePredictions,
  fetchLiveReverseGeocode,
  findPincode,
  PincodeEntry,
} from "./pincodeData";
import RealLeafletMap from "./RealLeafletMap";

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
    PINCODE_DATABASE[0]!, // Default to Patna 800001
  );
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [predictions, setPredictions] = useState<PincodeEntry[]>([]);

  // Live real-time letter-by-letter OpenStreetMap search
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q || q.length < 2) {
      setPredictions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await fetchLivePredictions(q);
      setPredictions(results);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectLocation = (entry: PincodeEntry) => {
    setSelectedLocation(entry);
    setSearchQuery(`${entry.district} (${entry.pincode})`);
    setPredictions([]);
  };

  const handleManualSearchSubmit = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    if (predictions.length > 0) {
      handleSelectLocation(predictions[0]!);
      return;
    }

    setIsSearching(true);
    const results = await fetchLivePredictions(q);
    setIsSearching(false);

    if (results.length > 0) {
      handleSelectLocation(results[0]!);
    } else {
      const matched = findPincode(q);
      if (matched) {
        handleSelectLocation(matched);
      }
    }
  };

  // Browser Geolocation Real GPS Location & Reverse Geocoding
  const handleGeoLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        try {
          const realLocation = await fetchLiveReverseGeocode(userLat, userLng);
          setIsLocating(false);
          setSelectedLocation(realLocation);
          setSearchQuery(`${realLocation.district} (${realLocation.pincode})`);
          setPredictions([]);
        } catch (err) {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn("Geolocation position error:", err.message);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Clean Rectangular Popup with Outer Radius = 32px, Padding = 24px */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="relative z-10 w-full max-w-4xl rounded-[32px] bg-white p-6 shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Close Button Top-Right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-black" />
          </button>

          {/* Grid Layout: Left Search / Right Map */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* ── LEFT SIDE: Luxury Refined Search UI ── */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-[#143d31]">
                    {isHindi ? "पिनकोड सेवा क्षेत्र" : "Check Pincode Delivery"}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    {isHindi
                      ? "15,000+ पिनकोड में सीधे आपके खेत तक डिलीवरी"
                      : "Direct farm gate delivery across 15,000+ PIN codes"}
                  </p>
                </div>

                {/* Refined Floating Input Container */}
                <div className="relative space-y-1">
                  <div className="relative flex items-center rounded-2xl border border-gray-300 bg-white p-1.5 pl-3.5 shadow-sm focus-within:border-[#143d31] focus-within:ring-2 focus-within:ring-[#143d31]/10 transition-all">
                    <MagnifyingGlass className="h-4 w-4 text-[#143d31] shrink-0 mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleManualSearchSubmit();
                      }}
                      placeholder={
                        isHindi
                          ? "पिनकोड या शहर (उदा. सोहना, 122103)"
                          : "Type city, town or PIN (e.g. Sohna)"
                      }
                      className="w-full text-xs font-semibold text-black placeholder-gray-400 bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleGeoLocate}
                      disabled={isLocating}
                      className="flex items-center gap-1.5 rounded-xl bg-[#143d31] px-3 py-2 text-xs font-bold text-white hover:bg-[#1b4e3f] transition-all cursor-pointer shrink-0 shadow-sm"
                    >
                      <NavigationArrow
                        className={`h-3.5 w-3.5 ${isLocating ? "animate-spin text-white" : ""}`}
                      />
                      <span>{isLocating ? "Locating..." : "Auto Detect"}</span>
                    </button>
                  </div>

                  {/* Live Search Predictions Dropdown */}
                  <AnimatePresence>
                    {searchQuery.trim().length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl max-h-48 overflow-y-auto space-y-1 z-30"
                      >
                        {isSearching ? (
                          <div className="p-2 text-center text-xs text-gray-500 font-medium animate-pulse">
                            Searching live location database...
                          </div>
                        ) : predictions.length > 0 ? (
                          predictions.map((item, idx) => (
                            <button
                              key={`${item.pincode}-${idx}`}
                              type="button"
                              onClick={() => handleSelectLocation(item)}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 flex items-center justify-between text-xs font-semibold text-black transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                <MapPin className="h-4 w-4 text-[#143d31] shrink-0" />
                                <span className="truncate">
                                  <strong className="text-[#143d31]">{item.district}</strong>,{" "}
                                  {item.state}
                                </span>
                              </div>
                              <span className="font-mono text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md shrink-0">
                                {item.pincode}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="p-2 text-center text-xs text-gray-400 font-medium">
                            Press Enter to search live network
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Hub Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                    {isHindi ? "लोकप्रिय हब:" : "POPULAR HUBS"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PINCODE_DATABASE.slice(0, 5).map((item) => (
                      <button
                        key={item.pincode}
                        type="button"
                        onClick={() => handleSelectLocation(item)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          selectedLocation.district === item.district
                            ? "bg-[#143d31] text-white shadow-sm"
                            : "bg-gray-100 text-gray-800 hover:bg-[#143d31] hover:text-white"
                        }`}
                      >
                        {item.district}{" "}
                        <span className="font-mono opacity-60">({item.pincode})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* High-Contrast Luxury Location Card */}
                <div className="rounded-2xl border border-[#143d31]/20 bg-[#f2f7f4] p-4.5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#143d31] text-white px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                      <span>{isHindi ? "सेवा उपलब्ध" : "Serviceable Location"}</span>
                    </span>

                    <span className="bg-white border border-[#143d31]/20 text-[#143d31] px-2.5 py-1 rounded-full text-[11px] font-bold font-mono">
                      {selectedLocation.deliveryDays}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-[#143d31] truncate">
                      {selectedLocation.district}, {selectedLocation.state}
                    </h4>
                    <p className="text-xs text-gray-600 font-semibold mt-0.5">
                      PIN Code:{" "}
                      <span className="font-mono font-bold text-[#143d31]">
                        {selectedLocation.pincode}
                      </span>
                    </p>
                  </div>

                  {selectedLocation.pincode === "122413" && (
                    <div className="text-[11px] text-gray-600 bg-white/70 p-2 rounded-xl border border-[#143d31]/10 font-medium">
                      📍 <strong>Agaate Kisaan Mall Flagship Store:</strong> Bilaspur Road, Patti
                      Kawan, Bhora Kalan, Gurugram, Haryana 122413
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#143d31]/15 grid grid-cols-2 gap-2 text-xs font-semibold text-[#143d31]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Truck className="h-4 w-4 text-[#143d31] shrink-0" />
                      <span className="truncate">{selectedLocation.hub}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CurrencyInr className="h-4 w-4 text-[#143d31] shrink-0" />
                      <span>COD Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDE: Rounded Square Real Leaflet Map ── */}
            <div className="md:col-span-7 flex items-center justify-center">
              <div className="w-full aspect-square rounded-[12px] overflow-hidden border border-gray-200 shadow-sm relative min-h-[320px]">
                <RealLeafletMap
                  targetLat={selectedLocation.lat}
                  targetLng={selectedLocation.lng}
                  targetName={selectedLocation.district}
                  pincode={selectedLocation.pincode}
                  hubLat={selectedLocation.hubLat}
                  hubLng={selectedLocation.hubLng}
                  hubName={selectedLocation.hub}
                  hubs={AGAATE_HUBS}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
