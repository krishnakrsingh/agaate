import type { HomeChapterStat } from "@/lib/cms-types";
import { CountUp } from "@/components/common/motion";

export function HomeChapterStatValue({
  stat,
  isHindi,
}: {
  stat: HomeChapterStat;
  isHindi: boolean;
}) {
  const valueText = isHindi ? stat.valueTextHi : stat.valueTextEn;
  const prefix = isHindi ? stat.prefixHi : stat.prefixEn;
  const suffix = isHindi ? stat.suffixHi : stat.suffixEn;

  if (valueText) {
    return <>{valueText}</>;
  }

  return <CountUp to={stat.numValue} prefix={prefix} suffix={suffix} />;
}
