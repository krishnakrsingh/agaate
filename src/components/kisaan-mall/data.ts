import {
  Plant,
  Drop,
  ShieldCheck,
  Wrench,
  Package,
  Truck,
  Buildings,
  MagnifyingGlass,
  CheckCircle,
  CurrencyInr,
  QrCode,
  UsersThree,
} from "@phosphor-icons/react";

export const MALL_PHONE = "+91 83500 85005";
export const TEL_MALL = "+918350085005";
export const WHATSAPP_MALL_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20want%20to%20know%20more%20about%20Agaate%20Kisaan%20Mall%20inputs%20and%20pre-orders.";

export interface MallCategory {
  id: string;
  titleEn: string;
  titleHi: string;
  tagEn: string;
  tagHi: string;
  descEn: string;
  descHi: string;
  examplesEn: string[];
  examplesHi: string[];
  icon: any;
  badgeEn: string;
  badgeHi: string;
}

export const MALL_CATEGORIES: MallCategory[] = [
  {
    id: "seeds",
    titleEn: "Certified High-Yield Seeds",
    titleHi: "100% प्रमाणित उन्नत बीज",
    tagEn: "Seeds & Hybrids",
    tagHi: "बीज एवं हाइब्रिड",
    descEn:
      "100% genuine seed lots tested for germination rate, purity, and localized climatic resistance.",
    descHi:
      "उच्च अंकुरण दर, शुद्धता और क्षेत्रीय जलवायु सहनशीलता हेतु प्रमाणित हाइब्रिड एवं शोधित बीज।",
    examplesEn: [
      "Bi-Color Sweet Corn",
      "F1 Watermelon & Papaya",
      "High-Yield Tomato & Chilli",
      "Exotic Bell Peppers",
    ],
    examplesHi: [
      "बाई-कलर स्वीट कॉर्न",
      "F1 तरबूज व पपीता",
      "उन्नत टमाटर व मिर्च",
      "रंगीन शिमला मिर्च",
    ],
    icon: Plant,
    badgeEn: "Germination Tested",
    badgeHi: "अंकुरण प्रमाणित",
  },
  {
    id: "bio-nutrition",
    titleEn: "Biologicals & Soil Nutrition",
    titleHi: "जैविक पोषण व बायो-फर्टिलाइजर",
    tagEn: "Soil Health",
    tagHi: "मृदा स्वास्थ्य",
    descEn:
      "Certified bio-stimulants, mycorrhizal inoculants, and organic carbon enrichers that revitalize soil microbiome.",
    descHi:
      "मिट्टी के जीवाणुओं और पोषण को सक्रिय करने वाले प्रमाणित बायो-स्टिमुलेंट्स, माइकोराइजा व समुद्री शैवाल अर्क।",
    examplesEn: [
      "Endo-Mycorrhiza Granules",
      "Cold-Water Seaweed Extract",
      "Potassium Humate 98%",
      "Amino Acid Liquid",
    ],
    examplesHi: [
      "एंडो-माइकोराइजा दानेदार",
      "सीवीड एक्सट्रैक्ट अर्क",
      "पोटेशियम ह्यूमेट 98%",
      "अमीनो एसिड फॉर्मूलेशन",
    ],
    icon: Drop,
    badgeEn: "100% Organic Certified",
    badgeHi: "जैविक प्रमाणित",
  },
  {
    id: "crop-protection",
    titleEn: "Bio-Control & Crop Protection",
    titleHi: "बायो-प्रोटेक्शन व फसल सुरक्षा",
    tagEn: "Protection",
    tagHi: "सुरक्षा",
    descEn:
      "Targeted bio-fungicides, natural repellents, and pest management inputs with zero toxic chemical residue.",
    descHi:
      "फफूंद, रसचूसक कीट एवं सुंडी नियंत्रण हेतु सुरक्षित बायो-फंगीसाइड्स और प्राकृतिक कीट नियंत्रक।",
    examplesEn: [
      "Trichoderma Viride Bio-culture",
      "Pseudomonas Fluorescens",
      "Cold-Pressed Neem 10,000 PPM",
      "Pheromone Delta Traps",
    ],
    examplesHi: [
      "ट्राइकोडर्मा विरिडी कल्चर",
      "स्यूडोमोनास फ्लोरेसेंस",
      "नीम तेल 10,000 PPM",
      "फेरोमोन ट्रैप व ल्योर",
    ],
    icon: ShieldCheck,
    badgeEn: "Zero Toxic Residue",
    badgeHi: "शून्य विषाक्त अवशेष",
  },
  {
    id: "irrigation",
    titleEn: "Micro-Irrigation & Drip Kits",
    titleHi: "ड्रिप सिंचाई व फर्टिगेशन किट",
    tagEn: "Water Tech",
    tagHi: "जल तकनीक",
    descEn:
      "UV-stabilized inline drip laterals, pressure compensating drippers, and automated fertigation injectors.",
    descHi:
      "यूवी-स्टैबिलाइज्ड ड्रिप लेटरल्स, प्रेशर कम्पेन्सेटिंग एमिटर्स व आसान फर्टिगेशन वेंच्युरी सिस्टम।",
    examplesEn: [
      "16mm Inline Drip 40cm Spacing",
      "Venturi Injector Sets",
      "Disc & Screen Filters",
      "Mini-Sprinkler Packages",
    ],
    examplesHi: [
      "16mm इनलाइन ड्रिप लेटरल",
      "वेंच्युरी फर्टिगेशन सेट",
      "डिस्क व स्क्रीन फिल्टर",
      "मिनी-स्प्रिंकलर पैकेज",
    ],
    icon: Drop,
    badgeEn: "ISI & BIS Standard",
    badgeHi: "ISI मानक प्रमाणित",
  },
  {
    id: "farm-hardware",
    titleEn: "Modern Farm Tools & Mulching",
    titleHi: "आधुनिक फार्म टूल्स व मल्चिंग",
    tagEn: "Farm Hardware",
    tagHi: "हार्डवेयर",
    descEn:
      "Commercial grade silver-black mulch films, shade netting, weed mats, and dual-motor electric sprayers.",
    descHi:
      "नमी संरक्षण व खरपतवार रोकथाम हेतु 25-30 माइक्रोन मल्चिंग फिल्म, शेड नेट और रिचार्जेबल स्प्रेयर।",
    examplesEn: [
      "25 Micron Silver-Black Mulch",
      "50% Agro Shade Nets",
      "16L Dual-Motor Sprayers",
      "High-Carbon Pruning Shears",
    ],
    examplesHi: [
      "25-30 माइक्रोन मल्चिंग फिल्म",
      "50% शेड नेट",
      "डबल-मोटर बैटरी स्प्रेयर",
      "हाई-कार्बन प्रूनिंग कटर",
    ],
    icon: Wrench,
    badgeEn: "Commercial Grade",
    badgeHi: "कमर्शियल ग्रेड",
  },
  {
    id: "saplings",
    titleEn: "Bio-Boosted Nursery Seedlings",
    titleHi: "बायो-बूस्टेड उन्नत नर्सरी पौध",
    tagEn: "Root-Treated",
    tagHi: "रूट-ट्रीटेड",
    descEn:
      "Climate-hardened vegetable & fruit saplings raised in automated smart nursery plug-trays.",
    descHi:
      "अगाते स्मार्ट नर्सरी में कोकोपीट प्लग ट्रे में तैयार, 98% से अधिक फील्ड सर्वाइवल वाली रोगमुक्त पौध।",
    examplesEn: [
      "Vigorous Papaya (Taiwan 786)",
      "Root-Boosted Tomato & Chilli",
      "Sweet Pepper & Capsicum",
      "Seedless Watermelon Plugs",
    ],
    examplesHi: [
      "ताइवान 786 रेड लेडी पपीता",
      "रूट-बूस्टेड टमाटर व मिर्च",
      "रंगीन शिमला मिर्च पौध",
      "सीडलेस तरबूज पौध",
    ],
    icon: Plant,
    badgeEn: "98%+ Field Survival",
    badgeHi: "98%+ फील्ड सर्वाइवल",
  },
];

export const MALL_SUPPLY_CHAIN = [
  {
    step: "01",
    titleEn: "Information Gathering",
    titleHi: "क्षेत्रीय डेटा व मांग संग्रह",
    descEn:
      "Localized soil, weather & crop data analyzed to curate verified inputs suited for local conditions.",
    descHi: "क्षेत्रीय मिट्टी, मौसम व फसल चक्र अनुसार उपयुक्त और प्रमाणित इनपुट्स का सटीक चयन।",
    icon: MagnifyingGlass,
  },
  {
    step: "02",
    titleEn: "Direct Partner Sourcing",
    titleHi: "सीधे कंपनियों से सोर्सिंग",
    descEn:
      "Sourced directly from 50+ certified seed & input manufacturers with zero multi-tier middleman margins.",
    descHi:
      "बिना किसी बिचौलिए के सीधे 50+ प्रतिष्ठित विनिर्माताओं से पारदर्शी व किफायती दरों पर खरीद।",
    icon: Buildings,
  },
  {
    step: "03",
    titleEn: "Climate-Controlled Hub",
    titleHi: "तापमान-नियंत्रित वेयरहाउस",
    descEn:
      "Preserved in humidity and temperature-controlled storage to maintain seed vigour and microbial viability.",
    descHi:
      "बीज की अंकुरण क्षमता और बायो-कल्चर की गुणवत्ता बनाए रखने हेतु विशेष हब में सुरक्षित भंडारण।",
    icon: Package,
  },
  {
    step: "04",
    titleEn: "Direct Farm Delivery",
    titleHi: "खेत के गेट तक सीधी डिलीवरी",
    descEn:
      "Delivered straight to your field gate across 15,000+ PIN codes with tamper-proof sealed packaging.",
    descHi:
      "15,000+ पिनकोड में सीधे आपके खेत के गेट तक सुरक्षित डिलीवरी और सीलबंद सुरक्षित पैकेजिंग।",
    icon: Truck,
  },
];

export const MALL_TRUST_ITEMS = [
  {
    labelEn: "Genuine Guarantee",
    labelHi: "100% असली उत्पाद",
    value: "100% Genuine",
    hintEn: "Direct from authorized brand partners with 100% authenticity",
    hintHi: "प्रमाणित ब्रांड्स से सीधी आपूर्ति और 100% असलियत की गारंटी",
    icon: ShieldCheck,
  },
  {
    labelEn: "Transparent Pricing",
    labelHi: "पारदर्शी व ईमानदार दरें",
    value: "Direct Pricing",
    hintEn: "No multi-tier wholesale markups or hidden surcharges",
    hintHi: "बिना बिचौलियों के सीधे विनिर्माता दरों का लाभ",
    icon: CurrencyInr,
  },
  {
    labelEn: "Expert Advice",
    labelHi: "मुफ्त कृषि परामर्श",
    value: "Free Agronomy",
    hintEn: "Crop-specific dosage and fertigation schedules included",
    hintHi: "हर इनपुट के साथ फसल-विशिष्ट खुराक और इस्तेमाल की सलाह",
    icon: UsersThree,
  },
  {
    labelEn: "Pan-India Reach",
    labelHi: "पैन-इंडिया डिलीवरी",
    value: "15,000+ PINs",
    hintEn: "Direct dispatch to field gates across North & Central India",
    hintHi: "उत्तर व मध्य भारत के 15,000+ पिनकोड में सुरक्षित पहुंच",
    icon: Truck,
  },
];

export const MALL_FAQS = [
  {
    qEn: "How does Agaate guarantee input genuineness and quality?",
    qHi: "अगाते इनपुट्स की असलियत और गुणवत्ता की क्या गारंटी है?",
    aEn: "All inputs in Agaate Kisaan Mall are sourced directly from registered, ISO/FSSAI/CIB-RC certified manufacturers. Each batch is sampled, germination-tested in our laboratory, and verified for high field performance.",
    aHi: "अगाते किसान मॉल में सभी इनपुट्स केवल अधिकृत एवं प्रमाणित कंपनियों से सीधे खरीदे जाते हैं। हर बैच की अंकुरण दर व गुणवत्ता की जांच हमारे लैब में की जाती है और 100% असलियत सुनिश्चित की जाती है।",
  },
  {
    qEn: "Can I place bulk or pre-orders for my entire farm season?",
    qHi: "क्या मैं पूरे सीजन के लिए एक साथ बल्क या प्री-ऑर्डर कर सकता हूं?",
    aEn: "Yes! FPOs, progressive growers, and commercial farms can place advance seasonal orders for seeds, mulch, drip lines, and biologicals with scheduled delivery matching their sowing dates.",
    aHi: "जी हां! किसान उत्पादक संगठन (FPO), प्रगतिशील किसान और बड़े फार्म अपनी बुवाई की तारीख अनुसार बीजों, मल्चिंग और फर्टिलाइजर का अग्रिम सीजनल ऑर्डर बुक कर सकते हैं।",
  },
  {
    qEn: "Do you provide dosage and application guidelines with the inputs?",
    qHi: "क्या इनपुट्स के साथ इस्तेमाल और खुराक का चार्ट भी मिलता है?",
    aEn: "Absolutely. Every input purchased comes with crop-stage specific application charts curated by our senior agronomists. You can also message our WhatsApp helpline for custom fertigation schedules.",
    aHi: "बिल्कुल। खरीदे गए हर इनपुट के साथ हमारी एग्रोनॉमी टीम द्वारा तैयार फसल-अनुसार खुराक और छिड़काव का विस्तृत चार्ट प्रदान किया जाता है।",
  },
  {
    qEn: "How are nursery saplings dispatched to prevent transit shock?",
    qHi: "नर्सरी पौधों को ट्रांजिट में सुरक्षित रखने के लिए क्या व्यवस्था है?",
    aEn: "Our saplings are root-conditioned with mycorrhizal bio-boosters before dispatch and transported in specialized ventilated crates ensuring 98%+ survival when transplanted into your field.",
    aHi: "पौधों को भेजने से पहले विशेष माइकोराइजा व बायो-प्रोटेक्टेंट से शोधित किया जाता है और हवादार क्रेट्स में भेजा जाता है जिससे खेत में 98% से अधिक जीवित रहने की दर सुनिश्चित होती है।",
  },
  {
    qEn: "Where is the physical Agaate Kisaan Mall located?",
    qHi: "अगाते किसान मॉल का मुख्य स्टोर कहां स्थित है?",
    aEn: "Our flagship retail hub is located in Bhora Kalan, Gurugram, Haryana. Farmers are welcome to visit during operating hours (7:30 AM – 8:00 PM IST, Monday to Saturday).",
    aHi: "हमारा मुख्य किसान मॉल भोरा कलां, गुरुग्राम, हरियाणा में स्थित है। किसान भाई सप्ताह में 6 दिन (सुबह 7:30 से शाम 8:00 बजे तक) व्यक्तिगत रूप से भी आ सकते हैं।",
  },
];
