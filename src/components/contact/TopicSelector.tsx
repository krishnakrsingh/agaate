import { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  desc?: string;
  badge?: string;
  icon?: Icon;
};

export function TopicSelector({
  options,
  value,
  onChange,
  disabled,
}: {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="sr-only">Select your consultation inquiry track</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#143d31]/15 bg-white/40">
        {options.map((topic, index) => {
          const selected = value === topic.id;
          const num = String(index + 1).padStart(2, "0");
          return (
            <button
              key={topic.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(topic.id)}
              className={cn(
                "group relative p-3 sm:p-3.5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#143d31]",
                "border-b border-[#143d31]/15",
                index % 2 === 0 ? "sm:border-r sm:border-r-[#143d31]/15" : "",
                index >= options.length - 2 ? "sm:border-b-0" : "",
                index === options.length - 1 ? "border-b-0" : "",
                selected
                  ? "bg-[#143d31] text-white"
                  : "bg-transparent text-[#143d31] hover:bg-[#143d31]/[0.04]",
              )}
            >
              {/* Left accent indicator line for active state */}
              {selected && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#a3e635]" />
              )}

              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "font-mono text-[10px] font-bold tracking-wider shrink-0 mt-0.5 transition-colors",
                    selected ? "text-[#a3e635]" : "text-[#5d7d37]/80 group-hover:text-[#143d31]",
                  )}
                >
                  {num}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={cn(
                        "block text-xs sm:text-[13px] font-bold tracking-tight truncate leading-snug",
                        selected ? "text-white" : "text-[#143d31]",
                      )}
                    >
                      {topic.label}
                    </span>
                    {selected && (
                      <Check className="h-3.5 w-3.5 text-[#a3e635] shrink-0" weight="bold" />
                    )}
                  </div>
                  {topic.desc && (
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px] font-sans leading-tight line-clamp-1 transition-colors",
                        selected ? "text-white/70" : "text-[#4f624f]/80",
                      )}
                    >
                      {topic.desc}
                    </span>
                  )}

              </div>
            </div>
          </button>
        );
      })}
    </fieldset>
  );
}

export function ChannelGroup({
  options,
  value,
  onChange,
  disabled,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
<fieldset disabled={disabled} className="space-y-1.5">
      <legend className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
        5. Preferred Response Mode
      </legend>
      <div
        className="inline-flex flex-wrap sm:flex-nowrap border border-[#143d31]/20 divide-x divide-[#143d31]/20 bg-white/40"
        role="radiogroup"
      >
        {options.map((ch) => {
          const selected = value === ch;
          return (
            <button
              key={ch}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(ch)}
              className={cn(
"cursor-pointer px-4 sm:px-5 py-2 text-xs font-mono font-bold tracking-wide transition-all duration-200 focus-visible:outline-none",
                selected
                  ? "bg-[#143d31] text-[#a3e635]"
                  : "bg-transparent text-[#143d31] hover:bg-[#143d31]/5",
              )}
            >
              {ch}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
