import { motion } from "framer-motion";
import { Package } from "@phosphor-icons/react";
import { MALL_PRODUCTS } from "../phone-app-data";

interface PhoneStoreViewProps {
  onAddToCart: (productName: string) => void;
}

export function PhoneStoreView({ onAddToCart }: PhoneStoreViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-y-auto bg-[#f4f7ef]/50 p-3.5">
      {/* Category Filter Chips */}
      <div className="no-scrollbar flex shrink-0 items-center gap-2 overflow-x-auto pb-0.5">
        {["All Inputs", "Seeds 🌾", "Bio-Cures 🧪", "Drip 💧", "Mulch 🛡️"].map((cat, i) => (
          <span
            key={cat}
            className={`shrink-0 rounded-xl px-3.5 py-1.5 text-[10px] font-bold transition-all ${
              i === 0
                ? "bg-[#143d31] text-white shadow-md"
                : "border border-[#143d31]/5 bg-white text-[#143d31] shadow-sm"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Promo Banner Card */}
      <div className="relative flex shrink-0 items-center justify-between overflow-hidden rounded-[20px] border border-[#143d31]/10 bg-gradient-to-br from-[#143d31] via-[#1a4f40] to-[#286b58] p-3.5 text-white shadow-lg">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-[#a3e635]/20 blur-xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#a3e635] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#143d31]">
            Direct Partner Supply
          </span>
          <p className="mt-1.5 text-[13px] font-black leading-tight tracking-wide text-white">
            500+ Genuine <br />
            Agri Inputs
          </p>
          <p className="mt-1 text-[9px] font-medium text-white/80">Up to 35% off · 24h Delivery</p>
        </div>
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm">
          <Package className="h-5 w-5" weight="duotone" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {MALL_PRODUCTS.map((prod, i) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex flex-col rounded-[16px] border border-[#143d31]/5 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Top: Image Box */}
            <div className="relative mb-2 aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-[#f4f7ef]">
              <img
                src={prod.image}
                alt={prod.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute left-1.5 top-1.5 rounded bg-[#143d31] px-1.5 py-0.5 text-[8px] font-black tracking-wide text-[#a3e635] shadow-sm">
                {prod.discount}
              </span>
            </div>

            {/* Bottom: Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[9px] font-black text-amber-500">
                    {prod.rating.split(" ")[0]} ★
                  </span>
                  <span className="rounded bg-[#e7edd9] px-1 text-[8px] font-bold text-[#3a6b28]">
                    {prod.deliveryTime.split(" ")[1]}
                  </span>
                </div>

                <h4 className="line-clamp-2 text-[11px] font-extrabold leading-snug text-[#143d31]">
                  {prod.name}
                </h4>
                <p className="mt-0.5 line-clamp-1 text-[9px] font-medium text-[#536253]">
                  {prod.quantity}
                </p>
              </div>

              {/* Price & Add Button */}
              <div className="mt-2.5 flex items-end justify-between border-t border-gray-100 pt-2">
                <div className="flex flex-col">
                  <span className="text-[12px] font-black leading-none text-[#143d31]">
                    {prod.price}
                  </span>
                  <span className="mt-0.5 text-[9px] font-semibold leading-none text-gray-400 line-through">
                    {prod.originalPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(prod.name)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31] text-white shadow-md transition-transform active:scale-90"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Footer Bar */}
      <div className="mt-2 flex shrink-0 items-center justify-around rounded-xl border border-[#143d31]/5 bg-white p-2.5 text-[8px] font-extrabold uppercase tracking-wider text-[#476f2d] shadow-sm">
        <span className="flex items-center gap-1">✓ Direct Supply</span>
        <span className="flex items-center gap-1">✓ QC Verified</span>
      </div>
    </div>
  );
}
