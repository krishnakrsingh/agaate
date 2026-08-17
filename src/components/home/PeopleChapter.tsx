import { motion } from "framer-motion";
import { Plant, Stethoscope, TrendUp } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { useTranslation } from "react-i18next";
import { CountUp, Reveal, Stagger, StaggerItem, EASE } from "@/components/common/motion";

const impactStatsEn = [
  {
    id: "network",
    icon: Stethoscope,
    label: "Advisory & Network",
    accent: "#5d7d37",
    headline: "Real-time agronomy across North India.",
    primary: { value: 15000, suffix: "+", label: "Acres Monitored" },
    secondary: { value: 2000, suffix: "+", label: "Farmers Enrolled" },
  },
  {
    id: "infra",
    icon: Plant,
    label: "Bio-Infrastructure",
    accent: "#3a6b28",
    headline: "Zero-mortality plug nurseries.",
    primary: { value: 85, suffix: " Lakh+", label: "Bio-Seedlings Delivered" },
    secondary: { value: 98, suffix: "%", label: "Field Survival Rate" },
  },
  {
    id: "market",
    icon: TrendUp,
    label: "Market Linkage",
    accent: "#143d31",
    headline: "Fair buybacks & additional income.",
    primary: { value: 10, prefix: "₹", suffix: "Cr+", label: "Farmer Value Generated" },
    secondary: { value: 100, suffix: "%", label: "Guaranteed Buyback" },
  },
];

const impactStatsHi = [
  {
    id: "network",
    icon: Stethoscope,
    label: "सलाह व नेटवर्क",
    accent: "#5d7d37",
    headline: "उत्तर भारत के खेतों में रियल-टाइम वैज्ञानिक सलाह।",
    primary: { value: 15000, suffix: "+", label: "एकड़ निगरानी रकबा" },
    secondary: { value: 2000, suffix: "+", label: "जुड़े किसान" },
  },
  {
    id: "infra",
    icon: Plant,
    label: "बायो-नर्सरी इंफ्रास्ट्रक्चर",
    accent: "#3a6b28",
    headline: "शून्य-मृत्यु दर वाली प्लग पौध।",
    primary: { value: 85, suffix: " लाख+", label: "सप्लाई बायो-पौधे" },
    secondary: { value: 98, suffix: "%", label: "खेत में जमाव दर" },
  },
  {
    id: "market",
    icon: TrendUp,
    label: "मार्केट लिंकेज",
    accent: "#143d31",
    headline: "उचित फसल खरीद व अतिरिक्त कमाई।",
    primary: { value: 10, prefix: "₹", suffix: " करोड़+", label: "किसानों को भुगतान" },
    secondary: { value: 100, suffix: "%", label: "पक्का बायबैक" },
  },
];

const teamEn = [
  { name: "Ankit Rawat", role: "Founder & CEO", image: "/team/ankit.png?v=2" },
  { name: "Kuldeep Sengar", role: "Procurement Head", image: "/team/kuldeep.png" },
  { name: "Chanchala Shukla", role: "Agronomist", image: "/team/chanchala.png" },
  { name: "Ravi Kumar", role: "Data & Strategy", image: "/team/ravi.png" },
];

const teamHi = [
  { name: "अंकित रावत", role: "संस्थापक एवं सीईओ", image: "/team/ankit.png?v=2" },
  { name: "कुलदीप सेंगर", role: "प्रोक्योरमेंट हेड", image: "/team/kuldeep.png" },
  { name: "चंचला शुक्ला", role: "कृषि वैज्ञानिक", image: "/team/chanchala.png" },
  { name: "रवि कुमार", role: "डेटा एवं रणनीति", image: "/team/ravi.png" },
];

export default function PeopleChapter() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const impactStats = isHindi ? impactStatsHi : impactStatsEn;
  const team = isHindi ? teamHi : teamEn;
  const sectionRef = useHomeChapterReveal("fade-up");

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Animated Stat Ledger: Agaate by the Numbers */}
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-5 h-[1.5px] bg-[#5d7d37]" />
            <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5d7d37]">
              {isHindi ? "अगाते: आंकड़ों के आईने में" : "Agaate by the numbers"}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-[2rem] border border-[#143d31]/10 bg-white shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10">
              {impactStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.id}
                    className="p-8 lg:p-10 flex flex-col justify-between group hover:bg-[#f4f7ef]/30 transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                          style={{ backgroundColor: `${stat.accent}15`, color: stat.accent }}
                        >
                          <Icon className="h-5 w-5" weight="duotone" />
                        </div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#143d31]/60">
                          {stat.label}
                        </p>
                      </div>
                      <p className="font-sans text-sm font-medium text-[#143d31] mb-10">
                        {stat.headline}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-baseline gap-1 mb-1">
                          {stat.primary.prefix && (
                            <span className="text-xl font-bold text-[#143d31]">
                              {stat.primary.prefix}
                            </span>
                          )}
                          <span className="font-display text-4xl lg:text-5xl font-black tracking-tight text-[#143d31]">
                            <CountUp to={stat.primary.value} suffix={stat.primary.suffix} />
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#5d7d37]">{stat.primary.label}</p>
                      </div>

                      <div className="pt-6 border-t border-[#143d31]/8">
                        <span className="font-display text-2xl font-extrabold text-[#143d31]">
                          <CountUp to={stat.secondary.value} suffix={stat.secondary.suffix} />
                        </span>
                        <p className="text-[11px] font-semibold text-[#143d31]/50 mt-1 uppercase tracking-wider">
                          {stat.secondary.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Founder Quote Banner */}
        <Reveal variant="blur-in" delay={0.15} className="mt-16">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-3xl bg-[#eaf0df] p-8 md:p-12 border border-[#143d31]/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <blockquote className="font-serif text-xl md:text-2xl font-normal italic text-[#143d31] flex-1 max-w-4xl leading-relaxed">
              {isHindi
                ? "“हमने अगाते की शुरुआत एक सरल विश्वास के साथ की — कि हर किसान को सही मार्गदर्शन, सही साधन और सही सहयोग मिलना चाहिए, ताकि उनकी मेहनत कभी घाटे में न बदले।”"
                : '"We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss."'}
            </blockquote>
            <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#143d31]/15 pt-6 md:pt-0 md:pl-8">
              <motion.img
                whileHover={{ scale: 1.12, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="/team/ankit.png?v=2"
                alt="Ankit Rawat"
                className="h-14 w-14 rounded-full object-cover border-2 border-white shrink-0 cursor-pointer"
              />
              <div>
                <p className="font-display text-base font-extrabold text-[#143d31]">
                  {isHindi ? "अंकित रावत" : "Ankit Rawat"}
                </p>
                <p className="font-sans text-xs font-semibold text-[#5d7d37] mt-0.5">
                  {isHindi ? "संस्थापक एवं सीईओ" : "Founder & CEO"}
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Leadership Team List */}
        <Reveal variant="fade-up" delay={0.2} className="mt-16 border-t border-[#143d31]/10 pt-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
            {isHindi ? "नेतृत्व टीम" : "Leadership Team"}
          </p>
          <Stagger
            stagger={0.08}
            delayChildren={0.1}
            className="mt-6 flex flex-col gap-5 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-6 md:gap-y-6"
          >
            {team.map((member) => (
              <StaggerItem key={member.name} variant="fade-up" className="md:min-w-0 md:flex-1">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="group flex items-center gap-3.5 cursor-pointer"
                >
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    src={member.image}
                    alt={member.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover border border-[#143d31]/15 transition-transform duration-300"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-[#143d31] group-hover:text-[#5d7d37] transition-colors">
                      {member.name}
                    </p>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
