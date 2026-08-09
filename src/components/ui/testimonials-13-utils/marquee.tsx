import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export interface MarqueeProps extends ComponentProps<"div"> {
  pauseOnHover?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  repeat?: number;
}

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      pauseOnHover = false,
      vertical = false,
      reverse = false,
      repeat = 4,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className,
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    );
  },
);
Marquee.displayName = "Marquee";
