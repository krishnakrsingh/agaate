import { BatteryFull, CellSignalFull, WifiHigh } from "@phosphor-icons/react";

export function PhoneStatusBar() {
  return (
    <div className="relative shrink-0 bg-[#fffdf4] px-4 pt-3 pb-1 text-[#143d31]">
      <div className="flex items-center justify-between text-[10px] font-bold text-[#143d31]/80">
        <span className="font-mono tracking-tight">9:41 AM</span>
        <div className="flex items-center gap-1.5 text-[#143d31]/80">
          <CellSignalFull className="h-3 w-3" />
          <WifiHigh className="h-3 w-3" />
          <BatteryFull className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
