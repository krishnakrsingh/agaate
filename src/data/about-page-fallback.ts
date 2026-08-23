import type { AboutPageContent } from "@/lib/cms-types";
import heroImage from "@/assets/contact-team.png";

export const ABOUT_PAGE_FALLBACK: AboutPageContent = {
  brochureHref: "/agaate-brochure.pdf",
  hero: {
    badgeEn: "About Agaate · Our Foundation",
    badgeHi: "Agaate के बारे में · हमारी नींव",
    titleEn: "Begin with strong roots.",
    titleHi: "मजबूत जड़ों से शुरू करें।",
    titleAccentEn: "Growing better tomorrow.",
    titleAccentHi: "बेहतर कल की ओर।",
    descriptionEn:
      "From seeds to sales — Agaate provides complete crop support through science-backed farming decisions, trusted agri partnerships, and the Agaate Kisaan Mall for all essential agri inputs.",
    descriptionHi:
      "बीज से बिक्री तक — Agaate विज्ञान-आधारित खेती, विश्वसनीय साझेदारी और किसान मॉल के माध्यम से संपूर्ण फसल सहायता प्रदान करता है।",
    heroImageUrl: heroImage,
    heroImageAltEn: "The Agaate team at the Gurugram hub",
    heroImageAltHi: "गुरुग्राम केंद्र पर Agaate टीम",
    stats: [
      { valueEn: "15,000+", valueHi: "15,000+", labelEn: "Monitored Acres", labelHi: "निगरानी एकड़" },
      { valueEn: "2,000+", valueHi: "2,000+", labelEn: "Enrolled Farmers", labelHi: "पंजीकृत किसान" },
      { valueEn: "5-Acre", valueHi: "5-एकड़", labelEn: "Smart Nursery", labelHi: "स्मार्ट नर्सरी" },
    ],
  },
  whoWeAre: {
    eyebrowEn: "Who we are",
    eyebrowHi: "हम कौन हैं",
    headlineEn: "Built for farmers, always.",
    headlineHi: "किसानों के लिए बना, हमेशा।",
    bodyEn:
      "Agaate is built for farmers, always. We stand with them through the entire vegetable crop journey, from seed to harvest. By bringing together trusted agri companies, modern technologies, and practical support, we help farmers grow with confidence, reduce risks, and make better decisions at every step.",
    bodyHi:
      "Agaate हमेशा किसानों के लिए बना है। हम बीज से कटाई तक पूरी यात्रा में उनके साथ खड़े हैं।",
    pullQuoteEn:
      "We built Agaate with a simple belief — that every farmer deserves the right guidance, the right tools, and the right support, so that their hard work never goes to loss.",
    pullQuoteHi:
      "हमने Agaate एक सरल विश्वास के साथ बनाया — हर किसान सही मार्गदर्शन, सही उपकरण और सही सहायता का हकदार है।",
    imageUrl: "/who-we-are-farm.jpg",
    imageAltEn: "Agaate farm fields in Gurugram",
    imageAltHi: "गुरुग्राम में Agaate फार्म खेत",
  },
  mission: {
    eyebrowEn: "Our Mission",
    eyebrowHi: "हमारा मिशन",
    titleEn: "Managing Farming Outcome",
    titleHi: "खेती के परिणाम का प्रबंधन",
    bodyEn:
      "Higher yield. Better price. Zero guesswork. Agaate's mission is to strengthen Indian farmers by providing science-backed, sustainable agriculture solutions that improve crop survival, reduce early-stage losses, and build long-term productivity through reliable Bio-Boosted nursery systems nationwide.",
    bodyHi:
      "उच्च उपज। बेहतर मूल्य। शून्य अनुमान। Agaate का मिशन भारतीय किसानों को मजबूत करना है।",
    supportEn:
      "We focus on practical research, quality inputs, and farmer-first thinking — designing ecosystems that prioritize the economic resilience and growth of the cultivator.",
    supportHi:
      "हम व्यावहारिक अनुसंधान, गुणवत्ता इनपुट और किसान-प्रथम सोच पर केंद्रित हैं।",
  },
  guarantees: [
    {
      titleEn: "Practical Research",
      titleHi: "व्यावहारिक अनुसंधान",
      descEn:
        "Every recommendation is grounded in field-tested, actionable science — not theory. We trial seeds, bio-inoculants, and crop protection protocols in real sub-tropical farm conditions before prescribing them.",
      descHi:
        "हर सिफारिश मैदान-परीक्षित, कार्यान्वयन योग्य विज्ञान पर आधारित है।",
      badgeEn: "Field-Tested Protocols",
      badgeHi: "फील्ड-परीक्षित प्रोटोकॉल",
      iconKey: "chart",
    },
    {
      titleEn: "Quality Inputs",
      titleHi: "गुणवत्ता इनपुट",
      descEn:
        "Seeds, biologicals, irrigation hardware, and crop protection sourced exclusively from 25+ direct manufacturer partners. Every input passes multi-stage quality verification and brand certification.",
      descHi:
        "बीज, जैविक, सिंचाई हार्डवेयर 25+ प्रत्यक्ष निर्माता भागीदारों से।",
      badgeEn: "25+ Certified Partners",
      badgeHi: "25+ प्रमाणित भागीदार",
      iconKey: "handshake",
    },
    {
      titleEn: "Farmer-First Thinking",
      titleHi: "किसान-प्रथम सोच",
      descEn:
        "Every advisory, bio-boosted seedling batch, and buyback agreement is engineered to protect farmer economics — reducing early losses and securing higher yield returns.",
      descHi:
        "हर सलाह, पौधे और बायबैक किसान अर्थशास्त्र की सुरक्षा के लिए डिज़ाइन किया गया है।",
      badgeEn: "Risk Mitigation Built-In",
      badgeHi: "जोखिम कमी अंतर्निहित",
      iconKey: "users",
    },
  ],
  impactMetrics: [
    { numValue: 15000, suffixEn: "+", suffixHi: "+", labelEn: "Under Association", labelHi: "जुड़े एकड़", iconKey: "plant" },
    { numValue: 2000, suffixEn: "+", suffixHi: "+", labelEn: "Agaate Parivaar", labelHi: "Agaate परिवार", iconKey: "users" },
    { numValue: 500, suffixEn: "+", suffixHi: "+", labelEn: "Verified SKUs", labelHi: "सत्यापित SKU", iconKey: "warehouse" },
    { numValue: 25, suffixEn: "+", suffixHi: "+", labelEn: "Direct Manufacturers", labelHi: "प्रत्यक्ष निर्माता", iconKey: "cap" },
  ],
  milestones: [
    {
      year: "2024",
      titleEn: "Incorporation & Experimental Nursery",
      titleHi: "पंजीकरण और प्रयोगात्मक नर्सरी",
      descEn:
        "Anzix Farm Technologies Private Limited formally incorporated on May 28, 2024. Launched a 1-acre experimental nursery block in Kukrola, Gurugram.",
      descHi: "28 मई 2024 पर कंपनी पंजीकृत। कुकरोला में 1-एकड़ प्रयोगात्मक नर्सरी।",
      highlightsEn: [
        "Company incorporated — May 28, 2024",
        "1-acre controlled nursery trial block launched",
        "Bio-Boosted seedling R&D initiated",
      ],
      highlightsHi: ["कंपनी पंजीकृत — 28 मई 2024", "1-एकड़ नर्सरी ट्रायल", "बायो-बूस्टेड R&D शुरू"],
    },
    {
      year: "2025",
      titleEn: "5-Acre Smart Nursery & Kisan Mall",
      titleHi: "5-एकड़ स्मार्ट नर्सरी और किसान मॉल",
      descEn:
        "Scaled to the flagship 5-acre climate-controlled Smart Nursery in Kukrola. Opened the Agaate Kisan Mall experience center in Bilaspur Kalan.",
      descHi: "कुकरोला में 5-एकड़ स्मार्ट नर्सरी। बिलासपुर कलां में किसान मॉल।",
      highlightsEn: [
        "5-acre Smart Nursery fully operational",
        "Kisan Mall retail hub launched in Bilaspur Kalan",
        "₹96.9 Lakhs initial corporate revenue (MCA filed)",
      ],
      highlightsHi: ["5-एकड़ स्मार्ट नर्सरी", "किसान मॉल लॉन्च", "₹96.9 लाख प्रारंभिक राजस्व"],
    },
    {
      year: "2026",
      titleEn: "India's First Agri Park & Carbon Credits",
      titleHi: "भारत का पहला एग्री पार्क और कार्बन क्रेडिट",
      descEn:
        "Inaugurated India's first collaborative Agri Park. Launched the Carbon Credit Program helping farmers monetise sustainable practices.",
      descHi: "भारत का पहला सहयोगी एग्री पार्क। कार्बन क्रेडिट कार्यक्रम लॉन्च।",
      highlightsEn: [
        "8-zone Agri Park: Seed, Nursery, Irrigation, Nutrition, Protection, Tech, Training, Market",
        "15,000+ acres · 2,000+ Parivaar farmers",
        "Carbon Credit Program — earn from sustainable farming",
      ],
      highlightsHi: ["8-ज़ोन एग्री पार्क", "15,000+ एकड़ · 2,000+ किसान", "कार्बन क्रेडिट कार्यक्रम"],
    },
  ],
  locations: [
    {
      tagEn: "Farm & Production Facility",
      tagHi: "फार्म और उत्पादन सुविधा",
      nameEn: "Agaate – Anzix Farm",
      nameHi: "Agaate – Anzix फार्म",
      addressEn: "NH8, opposite Bikanervala, Kukrola, Gurugram, Haryana 122413",
      addressHi: "NH8, बिकानेरवाला के सामने, कुकरोला, गुरुग्राम, हरियाणा 122413",
      subEn: "Plus Code: 8WG2+QR6 · 5-Acre Smart Nursery",
      subHi: "प्लस कोड: 8WG2+QR6 · 5-एकड़ स्मार्ट नर्सरी",
    },
    {
      tagEn: "Retail & Experience Center",
      tagHi: "रिटेल और अनुभव केंद्र",
      nameEn: "Agaate Kisan Mall",
      nameHi: "Agaate किसान मॉल",
      addressEn: "Bilaspur Rd, Patti Kawan, Bhora Kalan, Bilaspur Kalan, Gurugram, Haryana 122413",
      addressHi: "बिलासपुर रोड, पत्ती कवान, भोरा कलां, बिलासपुर कलां, गुरुग्राम, हरियाणा 122413",
      subEn: "Community hub for agri-inputs & technology demos",
      subHi: "कृषि-इनपुट और तकनीक डेमो केंद्र",
    },
    {
      tagEn: "Registered Corporate Office",
      tagHi: "पंजीकृत कॉर्पोरेट कार्यालय",
      nameEn: "Anzix Farm Technologies Pvt Ltd",
      nameHi: "Anzix Farm Technologies Pvt Ltd",
      addressEn: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
      addressHi: "I-205 Bestech Park View Ananda, Sector-81, Narsinghpur, Gurugram, Haryana 122004",
      subEn: "Legal & financial headquarters",
      subHi: "कानूनी और वित्तीय मुख्यालय",
    },
  ],
  complianceHighlights: [
    { labelEn: "Entity", labelHi: "इकाई", valueEn: "Anzix Farm Technologies Pvt Ltd", valueHi: "Anzix Farm Technologies Pvt Ltd" },
    { labelEn: "CIN", labelHi: "CIN", valueEn: "U46200HR2024PTC121982", valueHi: "U46200HR2024PTC121982" },
    { labelEn: "Registered Office", labelHi: "पंजीकृत कार्यालय", valueEn: "Sector-81, Gurugram, Haryana", valueHi: "सेक्टर-81, गुरुग्राम, हरियाणा" },
  ],
  complianceFooterEn:
    "Agaate is the registered brand of Anzix Farm Technologies Private Limited. All corporate records are verifiable on the Ministry of Corporate Affairs (MCA) portal.",
  complianceFooterHi:
    "Agaate Anzix Farm Technologies Private Limited की पंजीकृत ब्रांड है। सभी कॉर्पोरेट रिकॉर्ड MCA पोर्टल पर सत्यापन योग्य हैं।",
};
