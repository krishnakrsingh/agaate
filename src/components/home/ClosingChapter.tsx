import { ArrowRight, MapPin, Phone, DeviceMobile } from "@phosphor-icons/react";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/lib/i18n";
import { useHomeChapterReveal } from "./useHomeChapterReveal";

const trustFactsEn = [
  "2,000+ Parivaar farmers",
  "15,000+ acres under association",
  "17-acre smart nursery",
];

const trustFactsHi = [
  "2,000+ संतुष्ट किसान परिवार",
  "15,000+ एकड़ जुड़ा रकबा",
  "17-एकड़ हाई-टेक स्मार्ट नर्सरी",
];

const actionsEn = [
  {
    icon: DeviceMobile,
    number: "01",
    title: "Talk to an Agronomist",
    text: "Describe your crop problem or planning question — a real agronomy expert responds directly. Crop diseases, pest issues, fertilizer, soil, or anything in the field.",
    cta: "Chat Now",
    subCta: null,
    href: "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20am%20reaching%20out%20for%20assistance%20and%20would%20appreciate%20a%20response%20at%20your%20earliest%20convenience.",
    accent: "#143d31",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Visit Kisaan Mall",
    text: "500+ genuine agri inputs in one place. Expert-matched for your crop and stage, sourced from 25+ verified manufacturer partners. No guesswork, no duplicates.",
    cta: "Get Directions",
    subCta: "Bhora Kalan, Gurugram",
    href: "/contact",
    accent: "#9a5a2c",
  },
  {
    icon: Phone,
    number: "03",
    title: "See the Agri Park",
    text: "India's first agri park — live demo plots, Bio-Boosted nursery, drone technology, and farmer training. One visit changes how you understand farming. See it before you use it.",
    cta: "Plan Your Visit",
    subCta: "Kukrola, Gurugram",
    href: "/agri-park",
    accent: "#476f2d",
  },
];

const actionsHi = [
  {
    icon: DeviceMobile,
    number: "01",
    title: "कृषि डॉक्टर से सलाह लें",
    text: "फसल की बीमारी, कीट-पतंगे, खाद की मात्रा या मिट्टी की समस्या — सीधे अनुभवी कृषि वैज्ञानिक से व्हाट्सएप पर बात करें और तुरंत सही इलाज पाएं।",
    cta: "व्हाट्सएप चैट शुरू करें",
    subCta: null,
    href: "https://wa.me/918350085005?text=Namaste%20Agaate%20Team%2C%20mujhe%20apni%20fasal%20ke%20liye%20krishi%20salah%20chahiye.",
    accent: "#143d31",
  },
  {
    icon: MapPin,
    number: "02",
    title: "किसान मॉल से मंगवाएं",
    text: "500+ प्रामाणिक बीज, खाद व जैविक कीटनाशक। सीधे 25+ टॉप निर्माता कंपनियों से। 100% असली उत्पाद, बिना किसी मिलावट व नकली के डर के।",
    cta: "लोकेशन देखें",
    subCta: "भोड़ा कलां, गुरुग्राम",
    href: "/contact",
    accent: "#9a5a2c",
  },
  {
    icon: Phone,
    number: "03",
    title: "अगाते एग्री पार्क देखें",
    text: "भारत का पहला एकीकृत एग्री पार्क — लाइव फसल प्लॉट, बायो-बूस्टेड नर्सरी, ड्रोन तकनीक और किसान ट्रेनिंग। अपने खेत में अपनाने से पहले लाइव देखें।",
    cta: "विजिट शेड्यूल करें",
    subCta: "कुकरोला, गुरुग्राम",
    href: "/agri-park",
    accent: "#476f2d",
  },
];

export default function ClosingChapter() {
  const sectionRef = useHomeChapterReveal();
  const { i18n } = useTranslation();
  const { locale } = useParams({ strict: false }) as any;
  const currentLang = locale ?? i18n.language ?? "en";
  const isHindi = currentLang.startsWith("hi");

  const trustFacts = isHindi ? trustFactsHi : trustFactsEn;
  const actions = isHindi ? actionsHi : actionsEn;

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="relative scroll-mt-20 overflow-hidden bg-[#f4f8f5] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div data-home-reveal>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-5 h-[1px] bg-[#9a5a2c]/40" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a5a2c]">
                {isHindi ? "अपनी यात्रा शुरू करें" : "Start your journey"}
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#143d31] leading-[1.08]">
              {isHindi ? (
                <>
                  आपके खेत की अगली सफलता का कदम{" "}
                  <span className="font-serif italic font-normal text-[#9a5a2c]">
                    यहीं से शुरू होता है।
                  </span>
                </>
              ) : (
                <>
                  Your farm's next step{" "}
                  <span className="font-serif italic font-normal text-[#9a5a2c]">starts here.</span>
                </>
              )}
            </h2>
          </div>
          <div data-home-reveal>
            <p className="font-sans max-w-3xl text-sm md:text-base leading-relaxed text-[#536253] font-normal">
              {isHindi
                ? "चाहे आपको फसल सलाह चाहिए, 100% असली इनपुट्स, निरोगी नर्सरी पौध, या फिर आप फार्म पर आकर अगाते का पूरा लाइव मॉडल देखना चाहते हैं — अपनी जरूरत के अनुसार शुरुआत करें।"
                : "Whether you need crop advice, the right inputs, nursery plants, or want to visit the farm and see Agaate's ecosystem in person — choose the path that fits where you are right now."}
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div
          data-home-reveal
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-[#143d31]/15"
        >
          {trustFacts.map((fact) => (
            <span
              key={fact}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#143d31]/55 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              {fact}
            </span>
          ))}
        </div>

        {/* Three action cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${action.accent}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: action.accent }} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#143d31]/30 tracking-wider">
                      {action.number}
                    </span>
                  </div>
                  <h3
                    className="font-display mt-6 text-xl md:text-2xl font-bold tracking-tight"
                    style={{ color: "#143d31" }}
                  >
                    {action.title}
                  </h3>
                  <p className="font-sans mt-3 max-w-sm text-sm leading-relaxed text-[#536253]">
                    {action.text}
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1"
                    style={{ color: action.accent }}
                  >
                    {action.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  {action.subCta && (
                    <span className="font-jet text-[10px] font-bold uppercase tracking-[0.14em] text-[#143d31]/35">
                      {action.subCta}
                    </span>
                  )}
                </div>
              </>
            );

            const cardClass =
              "group flex min-h-80 flex-col justify-between rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-[#143d31]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#143d31]/5";

            if (action.href.startsWith("/")) {
              return (
                <Link
                  key={action.title}
                  to={getLocalizedPath(action.href, currentLang) as any}
                  className={cardClass}
                  data-home-reveal
                >
                  {content}
                </Link>
              );
            }

            const isExternal = action.href.startsWith("http");
            return (
              <a
                key={action.title}
                href={action.href}
                className={cardClass}
                data-home-reveal
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {content}
              </a>
            );
          })}
        </div>

        {/* Final tagline */}
        <p
          data-home-reveal
          className="mt-14 font-serif text-center text-xl italic leading-relaxed text-[#143d31]/60 md:text-2xl"
        >
          {isHindi
            ? "“अगाते हर कदम पर किसान के साथ खड़ा है — बीज से लेकर बिक्री तक।”"
            : '"Agaate stands with the farmer at every step — from seed to sale."'}
        </p>
      </div>
    </section>
  );
}
