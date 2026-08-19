import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Tractor,
  PottedPlant,
  ChartLineUp,
  Handshake,
  Warehouse,
  Drop,
  GraduationCap,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { CountUp } from "@/components/common/motion";

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

const ROW_1: StatItem[] = [
  {
    id: "acres",
    icon: Tractor,
    numValue: 1500000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Acres Associated",
    labelHi: "एकड़ जुड़ा रकबा",
  },
  {
    id: "seedlings",
    icon: PottedPlant,
    numValue: 8500000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Bio Plants Delivered",
    labelHi: "बायो पौधे सप्लाई",
  },
  {
    id: "value",
    icon: ChartLineUp,
    numValue: 10,
    prefix: "₹",
    suffixEn: " Cr+",
    suffixHi: " करोड़+",
    labelEn: "Annual Value Managed",
    labelHi: "वार्षिक मूल्य प्रबंधन",
  },
  {
    id: "partners",
    icon: Handshake,
    numValue: 50,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Supply Partners",
    labelHi: "साझेदार ब्रांड्स",
  },
];

const ROW_2: StatItem[] = [
  {
    id: "skus",
    icon: Warehouse,
    numValue: 1000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Agri-Input SKUs",
    labelHi: "इनपुट उत्पाद",
  },
  {
    id: "irrigation",
    icon: Drop,
    numValue: 200,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Smart Irrigations",
    labelHi: "स्मार्ट ड्रिप सिंचाई",
  },
  {
    id: "experts",
    icon: GraduationCap,
    numValue: 20,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Kisaan Sathi Experts",
    labelHi: "किसान साथी विशेषज्ञ",
  },
  {
    id: "farmers",
    icon: UsersThree,
    numValue: 2000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Parivaar Farmers",
    labelHi: "संतुष्ट किसान परिवार",
  },
];

const ALL_STATS = [...ROW_1, ...ROW_2];

function StatCell({
  item,
  isHindi,
  isInView,
  isRightCol,
}: {
  item: StatItem;
  isHindi: boolean;
  isInView: boolean;
  isRightCol: boolean;
}) {
  const Icon = item.icon;
  const suffix = isHindi ? item.suffixHi : item.suffixEn;
  const label = isHindi ? item.labelHi : item.labelEn;

  return (
    <div className="relative flex items-center justify-between gap-2.5 sm:gap-3 px-2 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 select-none overflow-hidden rounded-lg">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Deep Forest Green Icon Emblem */}
        <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] sm:rounded-[11px] bg-[#123c30] border border-[#143d31]/20 shadow-[0_1px_4px_rgba(18,60,48,0.2)]">
          <Icon
            weight="fill"
            className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-white"
          />
        </span>

        {/* Metric typography */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-0.5 font-sans text-[14.5px] sm:text-[16.5px] md:text-[17.5px] font-semibold tracking-tight text-[#0d2a21] tabular-nums leading-none">
            {item.prefix && (
              <span className="text-[12px] sm:text-[13.5px] font-medium text-[#5d7d37]">
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

          <p className="font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.11em] text-[#5d7d37] truncate mt-0.5 sm:mt-1 leading-none">
            {label}
          </p>
        </div>
      </div>

      {/* Floating faded vertical divider */}
      {!isRightCol && (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 h-8 sm:h-10 md:h-11 w-px bg-gradient-to-b from-transparent via-[#143d31]/22 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function SectionStatsMarquee() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#fafbf7] py-1.5 sm:py-2 md:py-2.5 text-[#143d31] overflow-hidden"
    >
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 sm:w-16 md:w-32 bg-gradient-to-r from-[#fafbf7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 sm:w-16 md:w-32 bg-gradient-to-l from-[#fafbf7] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-2 sm:px-4 md:px-8"
      >
        {/* Top Faded Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#143d31]/26 to-transparent" />

        {/* ── DESKTOP VIEW (md+): 2 rows of 4 columns ── */}
        <div className="hidden md:block">
          {/* Row 1 */}
          <div className="grid grid-cols-4 py-0.5">
            {ROW_1.map((item, idx) => (
              <StatCell
                key={item.id}
                item={item}
                isHindi={Boolean(isHindi)}
                isInView={isInView}
                isRightCol={idx === ROW_1.length - 1}
              />
            ))}
          </div>

          {/* Middle Faded Line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#143d31]/20 to-transparent" />

          {/* Row 2 */}
          <div className="grid grid-cols-4 py-0.5">
            {ROW_2.map((item, idx) => (
              <StatCell
                key={item.id}
                item={item}
                isHindi={Boolean(isHindi)}
                isInView={isInView}
                isRightCol={idx === ROW_2.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE / TABLET VIEW (< md): 4 balanced rows of 2 columns with consistent dividing lines ── */}
        <div className="block md:hidden">
          {[0, 2, 4, 6].map((startIndex, rowIndex) => {
            const pair = ALL_STATS.slice(startIndex, startIndex + 2);
            const isLastRow = rowIndex === 3;

            return (
              <React.Fragment key={startIndex}>
                <div className="grid grid-cols-2 py-0.5">
                  {pair.map((item, idx) => (
                    <StatCell
                      key={item.id}
                      item={item}
                      isHindi={Boolean(isHindi)}
                      isInView={isInView}
                      isRightCol={idx === 1}
                    />
                  ))}
                </div>

                {!isLastRow && (
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#143d31]/18 to-transparent" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Faded Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#143d31]/26 to-transparent" />
      </motion.div>
    </section>
  );
}
