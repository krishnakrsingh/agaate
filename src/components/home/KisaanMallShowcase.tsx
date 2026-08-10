import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store, Sparkles, MapPin, PackageCheck, UserCheck } from "lucide-react";

export default function KisaanMallShowcase() {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[640px] mx-auto flex items-center justify-center p-2 sm:p-4">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#143d31]/20 via-[#a3e635]/15 to-transparent blur-3xl rounded-full transform -translate-y-4 pointer-events-none" />

      {/* 3D Platform Floor Shadow & Stage */}
      <div className="absolute bottom-4 inset-x-6 h-20 bg-gradient-to-t from-[#143d31]/30 via-[#143d31]/10 to-transparent rounded-[100%] blur-xl border-b-2 border-[#a3e635]/40 pointer-events-none" />

      {/* Main Freestanding Store Cutout — Clean & Unobstructed */}
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative z-10 w-full flex flex-col items-center py-4"
      >
        <div className="relative w-full flex justify-center">
          <img
            src="/kisaan mall.png"
            alt="Agaate Kisaan Mall Physical Storefront"
            className="w-full max-h-[480px] sm:max-h-[540px] lg:max-h-[600px] object-contain drop-shadow-[0_25px_35px_rgba(20,61,49,0.3)] transition-all duration-500"
          />

          {/* Hotspot Pin 1: Store Branding / Signage */}
          <div className="absolute top-[22%] left-[38%] z-30">
            <button
              onMouseEnter={() => setActivePin(1)}
              onMouseLeave={() => setActivePin(null)}
              onClick={() => setActivePin(activePin === 1 ? null : 1)}
              className="relative group flex items-center justify-center h-7 w-7 rounded-full bg-[#a3e635] text-[#143d31] shadow-xl border-2 border-[#143d31] cursor-pointer hover:scale-125 transition-transform"
              aria-label="Flagship Retail Hub Information"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="animate-ping absolute inset-0 rounded-full bg-[#a3e635]/60" />
            </button>
            {activePin === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 rounded-2xl bg-[#143d31] p-3 text-white shadow-2xl border border-[#a3e635]/40 z-40 text-left pointer-events-none"
              >
                <div className="flex items-center gap-1.5 text-white font-mono text-[10px] font-bold uppercase">
                  <MapPin className="h-3 w-3" />
                  <span>Flagship Storefront</span>
                </div>
                <p className="font-display text-xs font-bold text-white mt-1">Authentic Agri Mall</p>
                <p className="text-[10px] text-white/75 mt-0.5 leading-tight">Every item QR-traced direct from partner factories.</p>
              </motion.div>
            )}
          </div>

          {/* Hotspot Pin 2: Store Inventory Shelves */}
          <div className="absolute top-[68%] left-[28%] z-30">
            <button
              onMouseEnter={() => setActivePin(2)}
              onMouseLeave={() => setActivePin(null)}
              onClick={() => setActivePin(activePin === 2 ? null : 2)}
              className="relative group flex items-center justify-center h-7 w-7 rounded-full bg-[#143d31] text-white shadow-xl border-2 border-white/60 cursor-pointer hover:scale-125 transition-transform"
              aria-label="Store Inventory Information"
            >
              <PackageCheck className="h-3.5 w-3.5" />
              <span className="animate-ping absolute inset-0 rounded-full bg-[#143d31]/60" />
            </button>
            {activePin === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 rounded-2xl bg-[#143d31] p-3 text-white shadow-2xl border border-[#a3e635]/40 z-40 text-left pointer-events-none"
              >
                <div className="flex items-center gap-1.5 text-white font-mono text-[10px] font-bold uppercase">
                  <Store className="h-3 w-3" />
                  <span>500+ Verified SKUs</span>
                </div>
                <p className="font-display text-xs font-bold text-white mt-1">Fully Stocked Shelves</p>
                <p className="text-[10px] text-white/75 mt-0.5 leading-tight">Bio-inputs, hybrid seeds, UV mulch & drip kits ready for field dispatch.</p>
              </motion.div>
            )}
          </div>

          {/* Hotspot Pin 3: Agronomist Desk */}
          <div className="absolute top-[72%] right-[25%] z-30">
            <button
              onMouseEnter={() => setActivePin(3)}
              onMouseLeave={() => setActivePin(null)}
              onClick={() => setActivePin(activePin === 3 ? null : 3)}
              className="relative group flex items-center justify-center h-7 w-7 rounded-full bg-[#a3e635] text-[#143d31] shadow-xl border-2 border-[#143d31] cursor-pointer hover:scale-125 transition-transform"
              aria-label="Agronomist Diagnostics Desk"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span className="animate-ping absolute inset-0 rounded-full bg-[#a3e635]/60" />
            </button>
            {activePin === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 rounded-2xl bg-[#143d31] p-3 text-white shadow-2xl border border-[#a3e635]/40 z-40 text-left pointer-events-none"
              >
                <div className="flex items-center gap-1.5 text-white font-mono text-[10px] font-bold uppercase">
                  <UserCheck className="h-3 w-3" />
                  <span>In-Store Agronomist</span>
                </div>
                <p className="font-display text-xs font-bold text-white mt-1">Soil Testing & Advice</p>
                <p className="text-[10px] text-white/75 mt-0.5 leading-tight">Walk in with crop samples for instant spray & dose guidance.</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
