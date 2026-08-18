import { motion } from "framer-motion";
import { Plant, Stethoscope, TrendUp } from "@phosphor-icons/react";
import { useHomeChapterReveal } from "./useHomeChapterReveal";
import { useTranslation } from "react-i18next";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/common/motion";

const impactStatsEn = [
  {
    id: "network",
    icon: Stethoscope,
    label: "Advisory & Network",
    headline: "Real-time agronomy across North India.",
    primary: { value: 15000, suffix: "+", label: "Acres Monitored" },
    secondary: { value: 2000, suffix: "+", label: "Farmers Enrolled" },
  },
  {
    id: "infra",
    icon: Plant,
    label: "Bio-Infrastructure",
    headline: "Zero-mortality plug nurseries.",
    primary: { value: 85, suffix: " Lakh+", label: "Bio-Seedlings Delivered" },
    secondary: { value: 98, suffix: "%", label: "Field Survival Rate" },
  },
  {
    id: "market",
    icon: TrendUp,
    label: "Market Linkage",
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
    headline: "उत्तर भारत के खेतों में रियल-टाइम वैज्ञानिक सलाह।",
    primary: { value: 15000, suffix: "+", label: "एकड़ निगरानी रकबा" },
    secondary: { value: 2000, suffix: "+", label: "जुड़े किसान" },
  },
  {
    id: "infra",
    icon: Plant,
    label: "बायो-नर्सरी इंफ्रास्ट्रक्चर",
    headline: "शून्य-मृत्यु दर वाली प्लग पौध।",
    primary: { value: 85, suffix: " लाख+", label: "सप्लाई बायो-पौधे" },
    secondary: { value: 98, suffix: "%", label: "खेत में जमाव दर" },
  },
  {
    id: "market",
    icon: TrendUp,
    label: "मार्केट लिंकेज",
    headline: "उचित फसल खरीद व अतिरिक्त कमाई।",
    primary: { value: 10, prefix: "₹", suffix: " करोड़+", label: "किसानों को भुगतान" },
    secondary: { value: 100, suffix: "%", label: "पक्का बायबैक" },
  },
];

const teamEn = [
  { name: "Ankit Rawat", role: "Founder & CEO", image: "/team/ankit.png?v=2" },
  { name: "Kuldeep Sengar", role: "Procurement Head", image: "/team/kuldeep.png" },
  { name: "Abhay Ranjan", role: "Chief of Staff", image: "/team/abhay.png" },
  { name: "Chanchala Shukla", role: "Agronomist", image: "/team/chanchala.png" },
  { name: "Ravi Kumar", role: "Data & Strategy", image: "/team/ravi.png" },
];

const teamHi = [
  { name: "अंकित रावत", role: "संस्थापक एवं सीईओ", image: "/team/ankit.png?v=2" },
  { name: "कुलदीप सेंगर", role: "प्रोक्योरमेंट हेड", image: "/team/kuldeep.png" },
  { name: "अभय रंजन", role: "चीफ ऑफ स्टाफ", image: "/team/abhay.png" },
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
      className="relative bg-[#f4f8f5] py-16 sm:py-20 md:py-24 border-t border-[#143d31]/10 text-[#143d31]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 space-y-12">
        {/* Section Header */}
        <div data-home-reveal className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#5d7d37]" aria-hidden="true" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37]">
              {isHindi ? "अगाते: आंकड़ों के आईने में" : "Agaate By The Numbers"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#143d31] tracking-tight leading-[1.1] max-w-2xl">
              {isHindi
                ? "वैज्ञानिक मार्गदर्शन, प्रमाणित इंफ्रास्ट्रक्चर व पक्का बाजार"
                : "Real science on the ground, measured in numbers"}
            </h2>

            <p className="font-sans text-[#4f624f] text-sm sm:text-base max-w-md leading-relaxed">
              {isHindi
                ? "बीज से लेकर बिक्री तक, जानिए कैसे अगाते उत्तर भारत के हजारों किसान परिवारों के जीवन में बदलाव ला रहा है।"
                : "From seed to sale, discover how Agaate's integrated ecosystem is empowering farmers across North India."}
            </p>
          </div>
        </div>

        {/* Card-less Architectural Impact Ledger */}
        <div
          data-home-reveal
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#143d31]/10 border-y border-[#143d31]/10 py-4"
        >
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:bg-white/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143d31]/10 text-[#143d31]">
                      <Icon className="h-5 w-5 text-[#143d31]" weight="duotone" />
                    </div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d7d37]">
                      {stat.label}
                    </p>
                  </div>
                  <p className="font-sans text-sm font-medium text-[#143d31] mt-2">
                    {stat.headline}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-1 mb-0.5">
                      {stat.primary.prefix && (
                        <span className="text-xl font-bold text-[#143d31]">
                          {stat.primary.prefix}
                        </span>
                      )}
                      <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#143d31]">
                        <CountUp to={stat.primary.value} suffix={stat.primary.suffix} />
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#5d7d37]">{stat.primary.label}</p>
                  </div>

                  <div className="pt-3 border-t border-[#143d31]/10">
                    <span className="font-display text-xl font-bold text-[#143d31]">
                      <CountUp to={stat.secondary.value} suffix={stat.secondary.suffix} />
                    </span>
                    <p className="text-[10px] font-semibold text-[#4f624f] mt-0.5 uppercase tracking-wider">
                      {stat.secondary.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Quote Banner */}
        <Reveal variant="fade-up" delay={0.15}>
          <div className="rounded-2xl bg-white p-8 md:p-10 border border-[#143d31]/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <blockquote className="font-serif text-lg md:text-xl font-normal italic text-[#143d31] flex-1 max-w-4xl leading-relaxed">
              {isHindi
                ? "“हमने अगाते की शुरुआत एक सरल विश्वास के साथ की — कि हर किसान को सही मार्गदर्शन, सही साधन और सही सहयोग मिलना चाहिए, ताकि उनकी मेहनत कभी घाटे में न बदले।”"
                : '"We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss."'}
            </blockquote>
            <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#143d31]/10 pt-4 md:pt-0 md:pl-8">
              <img
                src="/team/ankit.png?v=2"
                alt="Ankit Rawat"
                className="h-12 w-12 rounded-full object-cover border-2 border-white shrink-0"
              />
              <div>
                <p className="font-display text-sm font-bold text-[#143d31]">
                  {isHindi ? "अंकित रावत" : "Ankit Rawat"}
                </p>
                <p className="font-sans text-xs font-semibold text-[#5d7d37]">
                  {isHindi ? "संस्थापक एवं सीईओ" : "Founder & CEO"}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Leadership Team List */}
        <Reveal variant="fade-up" delay={0.2} className="pt-4 border-t border-[#143d31]/10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#5d7d37] mb-4">
            {isHindi ? "नेतृत्व टीम" : "Leadership Team"}
          </p>
          <Stagger
            stagger={0.08}
            delayChildren={0.1}
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          >
            {team.map((member) => (
              <StaggerItem key={member.name} variant="fade-up">
                <div className="flex items-center gap-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover border border-[#143d31]/10"
                  />
                  <div>
                    <p className="font-display text-sm font-bold text-[#143d31]">{member.name}</p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {member.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
