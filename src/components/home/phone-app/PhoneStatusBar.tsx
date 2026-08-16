import { BatteryFull, CellSignalFull, WifiHigh } from "@phosphor-icons/react";

export function PhoneStatusBar() {
  return (
    <div className="relative shrink-0 border-b border-[#143d31]/6 bg-[#fffdf4] px-3.5 pb-1 pt-2.5 text-[#143d31]">
      <div className="flex items-center justify-between text-[9.5px] font-bold text-[#143d31]/80">
        <span>9:41 AM</span>
        <div className="flex items-center gap-1 text-[#143d31]/80">
          <CellSignalFull className="h-2.5 w-2.5" />
          <WifiHigh className="h-2.5 w-2.5" />
          <BatteryFull className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
