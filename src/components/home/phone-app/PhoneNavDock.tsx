import { ChatCircleText, MapPin, Plant, ShoppingBag } from "@phosphor-icons/react";

interface PhoneNavDockProps {
  activeTab: "chat" | "mall" | "farm" | "park";
  onChangeTab: (tab: "chat" | "mall" | "farm" | "park") => void;
}

export function PhoneNavDock({ activeTab, onChangeTab }: PhoneNavDockProps) {
  const navItems = [
    { id: "chat" as const, icon: ChatCircleText, label: "Advisory" },
    { id: "mall" as const, icon: ShoppingBag, label: "Mall" },
    { id: "farm" as const, icon: Plant, label: "Farm" },
    { id: "park" as const, icon: MapPin, label: "Park" },
  ];

  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between border-t border-[#143d31]/8 bg-white px-3 py-2 shadow-[0_-4px_15px_-10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.id === "chat") {
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab("chat")}
              className={`group relative flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
                isActive ? "bg-[#143d31] px-3.5 py-1.5" : "bg-transparent p-2 hover:bg-gray-100/50"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-colors duration-300 ${
                  isActive ? "text-[#a3e635]" : "text-[#143d31]/40 group-hover:text-[#143d31]/70"
                }`}
                weight={isActive ? "fill" : "regular"}
              />
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${
                  isActive ? "ml-1.5 max-w-[80px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                <span className="whitespace-nowrap text-[11px] font-bold text-white">
                  {item.label}
                </span>
              </div>
            </button>
          );
        } else {
          return (
            <div
              key={item.id}
              className="flex select-none items-center justify-center p-2 text-[#143d31]/30 cursor-default"
            >
              <Icon className="h-[18px] w-[18px] shrink-0" weight="regular" />
            </div>
          );
        }
      })}
    </div>
  );
}
