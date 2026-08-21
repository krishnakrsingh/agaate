import type { CmsIconKey, CmsTeamMemberPayload, TeamCmsData } from "@/lib/cms-types";

export type TeamSeedMember = CmsTeamMemberPayload & { sortOrder: number };

export function getFallbackSeedTeam(): TeamSeedMember[] {
  return [
    {
      slug: "ankit-rawat",
      nameEn: "Ankit Rawat",
      nameHi: "अंकित रावत",
      roleEn: "Founder & CEO",
      roleHi: "संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)",
      focusEn: "Net-Zero Sustainability & Corporate Vision",
      focusHi: "नेट-ज़ीरो स्थिरता और कॉर्पोरेट विज़न",
      tagEn: "Bharat Climate Summit Speaker",
      tagHi: "भारत क्लाइमेट समिट वक्ता",
      bioEn:
        "Pioneer in tech-enabled vegetable crop ecosystems and net-zero mission advocate. Ankit leads corporate strategy, institutional partnerships, and campus leadership initiatives across North India.",
      bioHi:
        "तकनीक-सक्षम सब्जी फसल इकोसिस्टम और नेट-ज़ीरो मिशन के अग्रणी। अंकित उत्तर भारत में कॉर्पोरेट रणनीति, संस्थागत साझेदारी और कैंपस नेतृत्व का नेतृत्व करते हैं।",
      quoteEn:
        "Every farmer deserves the right guidance, the right tools, and the right support so that their hard work never goes to loss.",
      quoteHi:
        "हर किसान को सही मार्गदर्शन, सही साधन और सही सहयोग मिलना चाहिए, ताकि उनकी मेहनत कभी घाटे में न बदले।",
      pubEn:
        "Investigating Nitrogen optimization loops in sub-tropical Solanaceae cultivation blocks (2024)",
      pubHi:
        "उपोष्णकटिबंधीय सोलानेसी खेती में नाइट्रोजन अनुकूलन लूप्स की जांच (2024)",
      keyAchEn: [
        "Keynote Speaker at Bharat Climate Summit on Net-Zero AgTech",
        "Architect of the Bio-Boosted Nursery model replacing risky direct sowing",
        "Pioneered direct buyback market linkages for 2,000+ farmers",
      ],
      keyAchHi: [
        "नेट-ज़ीरो एगटेक पर भारत क्लाइमेट समिट में मुख्य वक्ता",
        "जोखिम भरी प्रत्यक्ष बुवाई को बदलने वाले बायो-बूस्टेड नर्सरी मॉडल के शिल्पकार",
        "2,000+ किसानों के लिए प्रत्यक्ष बायबैक बाजार लिंकेज की शुरुआत",
      ],
      imageUrl: "/team/ankit.png?v=2",
      iconKey: "plant",
      showInBanner: true,
      bannerBadgeEn: "Founder",
      bannerBadgeHi: "संस्थापक",
      sortOrder: 0,
    },
    {
      slug: "kuldeep-sengar",
      nameEn: "Kuldeep Sengar",
      nameHi: "कुलदीप सेंगर",
      roleEn: "Procurement Head",
      roleHi: "प्रोक्योरमेंट प्रमुख",
      focusEn: "Strategic Sourcing, Agri-Inputs & Supply Chain Procurement",
      focusHi: "रणनीतिक सोर्सिंग, कृषि इनपुट और सप्लाई चेन प्रोक्योरमेंट",
      tagEn: "Procurement & Sourcing Lead",
      tagHi: "प्रोक्योरमेंट और सोर्सिंग लीड",
      bioEn:
        "Kuldeep leads strategic procurement and input sourcing across seed-to-sale pipelines, partnering with certified manufacturers and managing input delivery schedules across 15,000+ associated acres.",
      bioHi:
        "कुलदीप बीज से बिक्री तक की प्रक्रिया में रणनीतिक प्रोक्योरमेंट और इनपुट सोर्सिंग का नेतृत्व करते हैं।",
      quoteEn:
        "Precision procurement and direct-from-source inputs guarantee the highest quality foundation for every crop cycle.",
      quoteHi:
        "सटीक प्रोक्योरमेंट और स्रोत से सीधे इनपुट हर फसल चक्र के लिए सर्वोत्तम गुणवत्ता सुनिश्चित करते हैं।",
      pubEn:
        "Procurement optimization and supply chain mechanics for high-density agricultural input networks (2025)",
      pubHi:
        "उच्च-घनत्व कृषि इनपुट नेटवर्क के लिए प्रोक्योरमेंट अनुकूलन (2025)",
      keyAchEn: [
        "Streamlined input procurement and supply logistics across North India hubs",
        "Secured high-grade seed & input contracts with 25+ certified manufacturing partners",
        "Oversees quality-verified procurement pipelines for 20+ Kisan Sathi field teams",
      ],
      keyAchHi: [
        "उत्तर भारत हब में इनपुट प्रोक्योरमेंट और सप्लाई लॉजिस्टिक्स को सुव्यवस्थित किया",
        "25+ प्रमाणित निर्माताओं के साथ उच्च-ग्रेड बीज और इनपुट अनुबंध सुरक्षित किए",
        "20+ किसान साथी फील्ड टीमों के लिए गुणवत्ता-सत्यापित प्रोक्योरमेंट पाइपलाइन की देखरेख",
      ],
      imageUrl: "/team/kuldeep.png",
      iconKey: "cap",
      showInBanner: false,
      bannerBadgeEn: "",
      bannerBadgeHi: "",
      sortOrder: 1,
    },
    {
      slug: "abhay-ranjan",
      nameEn: "Abhay Ranjan",
      nameHi: "अभय रंजन",
      roleEn: "Chief of Staff",
      roleHi: "चीफ ऑफ स्टाफ",
      focusEn: "Infrastructure, Nursery & Kisan Mall Retail Operations",
      focusHi: "इंफ्रास्ट्रक्चर, नर्सरी और किसान मॉल रिटेल संचालन",
      tagEn: "Infrastructure & Retail Lead",
      tagHi: "इंफ्रास्ट्रक्चर और रिटेल लीड",
      bioEn:
        "Abhay manages critical facility operations, specifically overseeing the 17-acre Kukrola Smart Nursery infrastructure and physical Kisan Mall retail sales hubs in Bilaspur Kalan.",
      bioHi:
        "अभय महत्वपूर्ण सुविधा संचालन का प्रबंधन करते हैं, विशेष रूप से 17 एकड़ कुकरोला स्मार्ट नर्सरी और किसान मॉल रिटेल हब की देखरेख।",
      quoteEn:
        "A farm to experience — exposing growers to modern farming technologies, quality seeds, and best practices in one place.",
      quoteHi:
        "एक अनुभव के लिए खेत — किसानों को आधुनिक तकनीक, गुणवत्ता बीज और सर्वोत्तम प्रथाओं से परिचित कराना।",
      pubEn: "Closed-loop agricultural business frameworks and retail hubs in North India (2025)",
      pubHi: "उत्तर भारत में बंद-लूप कृषि व्यापार ढांचे और रिटेल हब (2025)",
      keyAchEn: [
        "Designed and scaled the 17-acre controlled-environment Smart Nursery facility",
        "Expanded Kisan Mall retail offerings to over 500+ verified SKUs",
        "Built experiential technology demonstration zones for visiting farming clusters",
      ],
      keyAchHi: [
        "17 एकड़ नियंत्रित-पर्यावरण स्मार्ट नर्सरी सुविधा का डिज़ाइन और विस्तार",
        "किसान मॉल रिटेल को 500+ सत्यापित SKU तक विस्तारित किया",
        "आने वाले किसान समूहों के लिए प्रौद्योगिकी प्रदर्शन क्षेत्र बनाए",
      ],
      imageUrl: "/team/abhay.png",
      iconKey: "warehouse",
      showInBanner: false,
      bannerBadgeEn: "",
      bannerBadgeHi: "",
      sortOrder: 2,
    },
    {
      slug: "chanchala-shukla",
      nameEn: "Chanchala Shukla",
      nameHi: "चंचला शुक्ला",
      roleEn: "Co-Founder & Agronomist",
      roleHi: "सह-संस्थापक एवं मुख्य कृषि वैज्ञानिक",
      focusEn: "Pathology, Integrated Pest Management (IPM) & Crop Viability",
      focusHi: "पैथोलॉजी, एकीकृत कीट प्रबंधन (IPM) और फसल व्यवहार्यता",
      tagEn: "Co-Founder & Agronomy Lead",
      tagHi: "सह-संस्थापक और एग्रोनॉमी लीड",
      bioEn:
        "Co-Founder and scientific backbone for crop viability, designing basal dose schedules, pathological pest diagnosis protocols, and micro-climate preventive spray matrices.",
      bioHi:
        "सह-संस्थापक और फसल व्यवहार्यता की वैज्ञानिक आधारशिला, रोग निदान प्रोटोकॉल और स्प्रे मैट्रिक्स के डिज़ाइनर।",
      quoteEn: "Precision agronomy turns unpredictable weather into calculated, high-survival yields.",
      quoteHi:
        "सटीक वैज्ञानिक कृषि हर मौसम की अनिश्चितता को सुरक्षित और भरपूर पैदावार में बदल देती है।",
      pubEn: "Managing Early Blight resistance using targeted botanical sprays and spore traps (2026)",
      pubHi: "लक्षित वनस्पति स्प्रे और स्पोर ट्रैप से अर्ली ब्लाइट प्रतिरोध प्रबंधन (2026)",
      keyAchEn: [
        "Developed weather-based disease prevention schedules for Solanaceae & Cucurbitaceae",
        "Formulated scientific soil testing and stage-wise fertigation protocols",
        "Authored localized IPM handbooks distributed across 2,000+ farms",
      ],
      keyAchHi: [
        "सोलानेसी और क्यूकर्बिटेसी के लिए मौसम-आधारित रोग रोकथाम अनुसूची विकसित",
        "वैज्ञानिक मिट्टी परीक्षण और चरणवार फर्टिगेशन प्रोटोकॉल तैयार किए",
        "2,000+ खेतों में वितरित स्थानीय IPM पुस्तिकाएँ लिखीं",
      ],
      imageUrl: "/team/chanchala.png",
      iconKey: "plant",
      showInBanner: true,
      bannerBadgeEn: "Co-Founder",
      bannerBadgeHi: "सह-संस्थापक",
      sortOrder: 3,
    },
    {
      slug: "ravi-kumar",
      nameEn: "Ravi Kumar",
      nameHi: "रवि कुमार",
      roleEn: "Data & Strategy",
      roleHi: "डेटा और रणनीति",
      focusEn: "IoT Telemetry, Drone Analytics & Smart Crop Cycles",
      focusHi: "IoT टेलीमेट्री, ड्रोन एनालिटिक्स और स्मार्ट फसल चक्र",
      tagEn: "Agri-Data & Strategy Lead",
      tagHi: "एग्री-डेटा और रणनीति लीड",
      bioEn:
        "Ravi drives data-driven decision-making, leveraging IoT soil sensors, Sentinel satellite canopy imaging, and AI crop health detection algorithms to execute precision Smart Crop Cycles.",
      bioHi:
        "रवि IoT सेंसर, सैटेलाइट इमेजिंग और AI फसल स्वास्थ्य एल्गोरिदम के माध्यम से डेटा-आधारित निर्णय चलाते हैं।",
      quoteEn:
        "Sensors, drones, and AI on your farm mean seeing issues earlier, acting faster, and wasting less.",
      quoteHi:
        "आपके खेत में सेंसर, ड्रोन और AI का मतलब समस्याएँ पहले देखना, तेज़ी से कार्रवाई करना और कम बर्बादी।",
      pubEn: "NDVI canopy analysis and Sentinel-2 radar scans in vegetable crop rotations (2026)",
      pubHi: "सब्जी फसल चक्र में NDVI कैनोपी विश्लेषण और Sentinel-2 रडार स्कैन (2026)",
      keyAchEn: [
        "Deployed IoT telemetry nodes across commercial farm blocks",
        "Integrated Sentinel-2 satellite NDVI canopy scouting for early disease detection",
        "Engineered automated fertigation & irrigation alert algorithms",
      ],
      keyAchHi: [
        "व्यावसायिक खेत ब्लॉकों में IoT टेलीमेट्री नोड्स तैनात किए",
        "प्रारंभिक रोग पहचान के लिए Sentinel-2 NDVI कैनोपी स्काउटिंग एकीकृत",
        "स्वचालित फर्टिगेशन और सिंचाई अलर्ट एल्गोरिदम विकसित किए",
      ],
      imageUrl: "/team/ravi.png",
      iconKey: "chart",
      showInBanner: false,
      bannerBadgeEn: "",
      bannerBadgeHi: "",
      sortOrder: 4,
    },
  ];
}

function memberToPublic(
  m: CmsTeamMemberPayload,
  lang: "en" | "hi",
): TeamCmsData["membersEn"][number] {
  const isHi = lang === "hi";
  return {
    id: m.slug,
    name: isHi ? m.nameHi : m.nameEn,
    role: isHi ? m.roleHi : m.roleEn,
    focus: isHi ? m.focusHi : m.focusEn,
    tag: isHi ? m.tagHi : m.tagEn,
    iconKey: m.iconKey,
    image: m.imageUrl,
    bio: isHi ? m.bioHi : m.bioEn,
    keyAch: isHi ? m.keyAchHi : m.keyAchEn,
    pub: isHi ? m.pubHi : m.pubEn,
    quote: isHi ? m.quoteHi : m.quoteEn,
    showInBanner: m.showInBanner,
    bannerBadge: isHi ? m.bannerBadgeHi : m.bannerBadgeEn,
  };
}

export function buildTeamCmsFallback(): TeamCmsData {
  const seed = getFallbackSeedTeam();
  return {
    membersEn: seed.map((m) => memberToPublic(m, "en")),
    membersHi: seed.map((m) => memberToPublic(m, "hi")),
  };
}

export const TEAM_CMS_FALLBACK = buildTeamCmsFallback();
