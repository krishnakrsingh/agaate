import { Check, type Icon } from "@phosphor-icons/react";
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
      <div className="flex flex-col divide-y divide-[#143d31]/10 rounded-2xl border border-[#143d31]/15 bg-white/70 overflow-hidden shadow-2xs">
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
                "group relative cursor-pointer p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143d31]/40",
                selected
                  ? "bg-[#143d31] text-white"
                  : "bg-transparent text-[#143d31] hover:bg-[#143d31]/[0.03]",
              )}
            >
              {selected ? (
                <div className="absolute bottom-0 left-0 top-0 w-[4px] bg-[#a3e635]" />
              ) : null}

              <div className="flex items-start gap-3.5 pl-1">
                <span
                  className={cn(
                    "mt-0.5 shrink-0 font-mono text-xs font-bold tracking-wider transition-colors",
                    selected ? "text-[#a3e635]" : "text-[#5d7d37] group-hover:text-[#143d31]",
                  )}
                >
                  {num}
                </span>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "block font-display text-sm sm:text-base font-bold leading-snug tracking-tight",
                        selected ? "text-white" : "text-[#143d31]",
                      )}
                    >
                      {topic.label}
                    </span>
                    {selected ? (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#a3e635] text-[#143d31]">
                        <Check className="h-3.5 w-3.5 text-[#143d31]" weight="bold" />
                      </div>
                    ) : (
                      <div className="h-4 w-4 shrink-0 rounded-full border border-[#143d31]/20 group-hover:border-[#143d31]/40 transition-colors" />
                    )}
                  </div>
                  {topic.desc ? (
                    <span
                      className={cn(
                        "block font-sans text-xs leading-relaxed transition-colors",
                        selected ? "text-white/80" : "text-[#4f624f]",
                      )}
                    >
                      {topic.desc}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
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
      <legend className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5d7d37] sm:text-[11px]">
        Preferred Response Mode
      </legend>
      <div
        className="inline-flex flex-wrap divide-x divide-[#143d31]/20 border border-[#143d31]/20 bg-white/40 rounded-xl overflow-hidden sm:flex-nowrap"
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
                "cursor-pointer px-4 py-2 font-mono text-xs font-bold tracking-wide transition-all duration-200 focus-visible:outline-none sm:px-5",
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
