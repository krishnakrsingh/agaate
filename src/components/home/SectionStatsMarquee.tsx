import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Icon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { CountUp } from "@/components/common/motion";
import { CMS_ICON_MAP } from "@/lib/cms-icons";
import { HOMEPAGE_CMS_FALLBACK } from "@/data/homepage-fallback";
import type { HomeCmsStat } from "@/lib/cms-types";

type StatItem = {
  id: string;
  icon: Icon;
  numValue: number;
  prefix?: string;
  suffixEn: string;
  suffixHi: string;
  labelEn: string;
  labelHi: string;
};

function toStatItems(stats: HomeCmsStat[]): StatItem[] {
  return stats.map((s) => ({
    id: s.id,
    icon: CMS_ICON_MAP[s.iconKey],
    numValue: s.numValue,
    prefix: s.prefix ? `${s.prefix} ` : undefined,
    suffixEn: s.suffixEn,
    suffixHi: s.suffixHi,
    labelEn: s.labelEn,
    labelHi: s.labelHi,
  }));
}

function StatCell({
  item,
  isHindi,
  isInView,
}: {
  item: StatItem;
  isHindi: boolean;
  isInView: boolean;
}) {
  const Icon = item.icon;
  const suffix = isHindi ? item.suffixHi : item.suffixEn;
  const label = isHindi ? item.labelHi : item.labelEn;

  return (
    <div className="group relative flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl bg-white border border-[#143d31]/10 shadow-[0_2px_12px_-4px_rgba(20,61,49,0.06)] select-none transition-all duration-300 hover:border-[#5d7d37]/40 hover:shadow-md hover:-translate-y-0.5 min-w-0">
      {/* Icon Badge */}
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#143d31] text-[#a3e635] shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#1a4d3e]">
        <Icon weight="duotone" className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#a3e635]" />
      </div>

      {/* Metric Content */}
      <div className="flex flex-col min-w-0 flex-1 justify-center">
        <div className="flex items-baseline gap-0.5 sm:gap-1 font-display text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-black tracking-tight text-[#143d31] tabular-nums leading-none">
          {item.prefix && (
            <span className="text-[12px] sm:text-[14px] font-bold text-[#5d7d37]">
              {item.prefix}
            </span>
          )}
          <span>
            {isInView ? (
              <CountUp to={item.numValue} suffix={suffix} duration={1.5} />
            ) : (
              `0${suffix}`
            )}
          </span>
        </div>
        <p className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10px] lg:text-[10.5px] font-bold uppercase tracking-[0.04em] sm:tracking-[0.06em] text-[#5d7d37] mt-1 leading-[1.2] break-words line-clamp-2">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function SectionStatsMarquee({ stats }: { stats?: HomeCmsStat[] }) {
  const { i18n } = useTranslation();
  const isHindi = Boolean(i18n.language?.startsWith("hi"));
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const allStats = toStatItems(stats ?? HOMEPAGE_CMS_FALLBACK.stats);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f4f8f5] py-3 sm:py-4 text-[#143d31] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-3 sm:px-6 md:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {allStats.map((item) => (
            <StatCell
              key={item.id}
              item={item}
              isHindi={isHindi}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
