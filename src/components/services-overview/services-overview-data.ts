import {
  Coins,
  Cpu,
  GraduationCap,
  Hammer,
  type Icon,
  Leaf,
  Plant,
  ShieldCheck,
  Sliders,
  Storefront,
  Truck,
} from "@phosphor-icons/react";

export type ServiceCategory =
  "all" | "nursery-inputs" | "advisory-tech" | "scale-infra" | "buyback";

export type ServiceItem = {
  id: string;
  icon: Icon;
  title: string;
  category: ServiceCategory;
  desc: string;
  tag: string;
  badgeStat: string;
  badgeLabel: string;
  href: string;
  highlights: string[];
  bgGradient: string;
};

export const SERVICES_EN: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-Acre Smart Nursery",
    category: "nursery-inputs",
    desc: "Containerized, bio-boosted plug saplings raised in AI-monitored climate chambers in Pachgaon/Kukrola. Zero root shock and 90-98% survival.",
    tag: "Nursery",
    badgeStat: "+40%",
    badgeLabel: "Survival vs Direct Sowing",
    href: "/services#nursery",
    highlights: [
      "Sterile Plug Chamber Germination",
      "Biological Root Inoculation (VAM)",
      "Certified Disease-Free Stock",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "Kisaan Mall & Prescribed Inputs",
    category: "nursery-inputs",
    desc: "500+ certified SKUs from 25+ direct manufacturer partners. Stage-matched bio-fertilizers, organic fungicides (Biocure F), and hybrid seeds.",
    tag: "Inputs",
    badgeStat: "500+",
    badgeLabel: "Direct Agri SKUs",
    href: "/services#kisaan-mall",
    highlights: [
      "Direct Manufacturer Pricing",
      "Soil EC/pH Prescribed Dosage",
      "Zero Counterfeit Guarantee",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "Farm Tech & Precision Agronomy",
    category: "advisory-tech",
    desc: "IoT soil probes, drone scouting, AI disease diagnostics from smartphone photos, and automated fertigation systems.",
    tag: "Tech & AI",
    badgeStat: "Real-Time",
    badgeLabel: "Field Telemetry & Alerts",
    href: "/services#farm-tech",
    highlights: [
      "WhatsApp Crop Advisory",
      "AI Leaf Disease Diagnostics",
      "Solar Telemetric Soil Probes",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "carbon",
    icon: Coins,
    title: "Carbon Credits & Soil Health",
    category: "scale-infra",
    desc: "Monetize sustainable farming. Turn reduced tillage, drip efficiency, and residue retention into verified carbon credit payouts.",
    tag: "Sustainability",
    badgeStat: "1 Credit",
    badgeLabel: "Per Tonne CO2 Saved",
    href: "/services#carbon-credits",
    highlights: [
      "Full MRV (Measure/Report/Verify)",
      "No Extra Land Required",
      "Direct Bank Payouts",
    ],
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "Turnkey Big-Farm Setup",
    category: "scale-infra",
    desc: "Complete commercial establishment from bare land to first harvest. Drip layout, mulching, polyhouse design, SOPs, and labor planning.",
    tag: "Projects",
    badgeStat: "Turnkey",
    badgeLabel: "Land to Harvest Execution",
    href: "/services#big-farm-setup",
    highlights: [
      "15,000+ Acres Managed",
      "Drip & Fertigation Infrastructure",
      "Dedicated On-Site Agronomist",
    ],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "Sales & Market Linkage",
    category: "buyback",
    desc: "Direct buyer tie-ups with retail chains and food processors. Guaranteed buyback floor price with zero middleman commissions.",
    tag: "Market Linkage",
    badgeStat: "0%",
    badgeLabel: "Middleman Commission",
    href: "/services#market-linkage",
    highlights: [
      "Guaranteed Floor Pricing",
      "Handpick Buyer Integration",
      "24-48hr Direct Bank Payment",
    ],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

export const SERVICES_HI: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-एकड़ स्मार्ट नर्सरी",
    category: "nursery-inputs",
    desc: "पचगांव/कुकरोला में वातानुकूलित जर्मिनेशन चैंबर में तैयार बायो-बूस्टेड प्लग पौध। 90-98% गारंटीड जमाव दर।",
    tag: "नर्सरी",
    badgeStat: "+40%",
    badgeLabel: "सीधी बुवाई से अधिक जमाव",
    href: "/services#nursery",
    highlights: [
      "वातानुकूलित प्लग चैंबर अंकुरण",
      "माइकोराइजा व ट्राइकोडर्मा उपचार",
      "प्रमाणित रोगमुक्त पौध",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "किसान मॉल व प्रमाणित इनपुट्स",
    category: "nursery-inputs",
    desc: "25+ टॉप कंपनियों से 500+ प्रमाणित बीज, जैविक खाद व फसल सुरक्षा दवाएं। सीधे खेत तक डिलीवरी।",
    tag: "इनपुट्स",
    badgeStat: "500+",
    badgeLabel: "प्रमाणित कृषि उत्पाद",
    href: "/services#kisaan-mall",
    highlights: [
      "सीधे कंपनियों के किफायती दाम",
      "मिट्टी अनुसार सही मात्रा का पर्चा",
      "100% असली होने की गारंटी",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "फार्म टेक व सटीक एग्रोनॉमी",
    category: "advisory-tech",
    desc: "स्मार्टफोन फोटो से 15 मिनट में एआई रोग पहचान, मौसम आधारित अलर्ट और ड्रिप फर्टीगेशन ऑटोमेशन।",
    tag: "तकनीक व एआई",
    badgeStat: "रियल-टाइम",
    badgeLabel: "खेत की डिजिटल निगरानी",
    href: "/services#farm-tech",
    highlights: [
      "व्हाट्सएप फसल सलाह",
      "फोटो से पत्तों के रोग की पहचान",
      "सोलर फील्ड सेंसर व अलर्ट",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "carbon",
    icon: Coins,
    title: "कार्बन क्रेडिट्स व मृदा स्वास्थ्य",
    category: "scale-infra",
    desc: "टिकाऊ खेती से अतिरिक्त कमाई। ड्रिप सिंचाई और पराली न जलाने के बदले सत्यापित कार्बन क्रेडिट से नकद आय।",
    tag: "सस्टेनेबिलिटी",
    badgeStat: "1 क्रेडिट",
    badgeLabel: "प्रति टन CO2 बचत पर",
    href: "/services#carbon-credits",
    highlights: [
      "सत्यापित MRV प्रक्रिया",
      "बिना किसी अतिरिक्त जमीन के",
      "सीधे बैंक खाते में भुगतान",
    ],
    bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "कमर्शियल बिग-फार्म संपूर्ण सेटअप",
    category: "scale-infra",
    desc: "जमीन की योजना से लेकर पहली कटाई तक टर्नकी निर्माण। ड्रिप, मल्चिंग, ग्रीनहाउस और एग्रोनॉमी SOPs।",
    tag: "प्रोजेक्ट्स",
    badgeStat: "टर्नकी",
    badgeLabel: "जमीन से कटाई तक सेटअप",
    href: "/services#big-farm-setup",
    highlights: [
      "15,000+ एकड़ का अनुभव",
      "आधुनिक ड्रिप व सिंचाई इंफ्रा",
      "समर्पित ऑन-साइट कृषि वैज्ञानिक",
    ],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "सुनिश्चित बाजार व बायबैक खरीद",
    category: "buyback",
    desc: "होटल, सुपरमार्केट और फूड प्रोसेसर्स से सीधा टाई-अप। बिना किसी बिचौलिया आढ़त के खेत पर पक्का भाव।",
    tag: "मार्केट लिंकेज",
    badgeStat: "0%",
    badgeLabel: "मंडी बिचौलिया कमीशन",
    href: "/services#market-linkage",
    highlights: [
      "पक्का न्यूनतम मूल्य बायबैक",
      "संस्थागत खरीदारों से जुड़ाव",
      "24-48 घंटे में सीधा बैंक भुगतान",
    ],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

export const SERVICES = SERVICES_EN;

export const IMPACT_STATS_EN = [
  { to: 15000, suffix: "+", label: "Acres under association" },
  { to: 500, suffix: "+", label: "Acres nursery plants delivered" },
  { to: 10, prefix: "₹", suffix: " Cr+", label: "Managed crop GMV" },
  { to: 25, suffix: "+", label: "Direct manufacturer partners" },
  { to: 20, suffix: "+", label: "Kisan Sathi field agronomists" },
  { to: 500, suffix: "+", label: "Agri-input SKUs in mall" },
  { to: 200, suffix: "+", label: "Drip installations" },
  { to: 2000, suffix: "+", label: "Parivaar registered farmers" },
];

export const IMPACT_STATS_HI = [
  { to: 15000, suffix: "+", label: "एकड़ जुड़ा रकबा" },
  { to: 500, suffix: "+", label: "एकड़ में नर्सरी पौध सप्लाई" },
  { to: 10, prefix: "₹", suffix: " करोड़+", label: "प्रबंधित फसल मूल्य" },
  { to: 25, suffix: "+", label: "निर्माता साझेदार" },
  { to: 20, suffix: "+", label: "किसान साथी कृषि वैज्ञानिक" },
  { to: 500, suffix: "+", label: "किसान मॉल इनपुट उत्पाद" },
  { to: 200, suffix: "+", label: "सफल ड्रिप इंस्टालेशन" },
  { to: 2000, suffix: "+", label: "अगाते परिवार से जुड़े किसान" },
];

export const IMPACT_STATS = IMPACT_STATS_EN;

export const CROP_JOURNEY_STAGES_EN = [
  {
    id: 1,
    title: "Seed Selection",
    icon: Plant,
    desc: "Choosing best-in-class hybrid & disease-resistant seed varieties tailored to local soil pH and sowing windows.",
    inputs: "Certified Hybrids, High-Yield Seeds",
    partners: "Leading Seed Partners",
    benefit: "High Genetic Vigor & Resistance",
  },
  {
    id: 2,
    title: "Bio-Boosted Nursery",
    icon: Leaf,
    desc: "Germinating seeds inside 17-acre sterile plug chambers with VAM bio-boosters for dense root ball structure.",
    inputs: "Biocure F, VAM Inoculant, Plug Trays",
    partners: "Agaate Smart Nursery",
    benefit: "90-98% Survival Rate",
  },
  {
    id: 3,
    title: "Land Preparation",
    icon: Hammer,
    desc: "Scientific soil analysis, customized basal dose planning, precision drip line setup, and specialized mulching.",
    inputs: "Soil Test Kit, Drip Tubing, Silver Mulch",
    partners: "IrriTech & Soil Labs",
    benefit: "Optimal Water & Root Aeration",
  },
  {
    id: 4,
    title: "Expert Advisory",
    icon: Cpu,
    desc: "Daily stage-wise guidance via WhatsApp, smartphone AI image diagnostics, and Kisan Sathi field visits.",
    inputs: "Agaate App, Telemetry Probes",
    partners: "Kisan Sathi Agronomy Team",
    benefit: "Early Disease Identification",
  },
  {
    id: 5,
    title: "Smart Fertigation",
    icon: Sliders,
    desc: "Stage-wise plant nutrition formulated strictly based on live soil EC sensors and real-time crop needs.",
    inputs: "Water-Soluble Bio-Formulas",
    partners: "Stanes & Biological Partners",
    benefit: "50-70% Reduced Chemical Runoff",
  },
  {
    id: 6,
    title: "Preventive Protection",
    icon: ShieldCheck,
    desc: "Weather-triggered disease prevention protocols and organic bio-cures before pest outbreaks occur.",
    inputs: "Biocure B, Bio Nimaton, Plantex",
    partners: "Certified Protection Partners",
    benefit: "Zero Crop Damage Spikes",
  },
  {
    id: 7,
    title: "Timely Harvest",
    icon: GraduationCap,
    desc: "Using specialized bamboo staking, ties, and harvest tools to gather market-ready grade-A produce at peak ripeness.",
    inputs: "Bamboo Poles, Netting, Harvest Crates",
    partners: "Agaate Harvest Protocol",
    benefit: "Higher Fruit Uniformity & Grade A %",
  },
  {
    id: 8,
    title: "Market Linkage",
    icon: Truck,
    desc: "Bypassing mandi auctions to sell directly to retail chains with guaranteed buyback contracts and fast payouts.",
    inputs: "Direct Handpick Buyer Connect",
    partners: "Handpick & Supermarket Networks",
    benefit: "Maximized Net Profit & Clean Prices",
  },
];

export const CROP_JOURNEY_STAGES_HI = [
  {
    id: 1,
    title: "उन्नत बीज चयन",
    icon: Plant,
    desc: "स्थानीय मिट्टी, मौसम और बुवाई समय के अनुसार सर्वश्रेष्ठ हाइब्रिड व रोग-प्रतिरोधी किस्मों का चयन।",
    inputs: "प्रमाणित हाइब्रिड व अधिक उपज वाले बीज",
    partners: "प्रमुख राष्ट्रीय बीज कंपनियां",
    benefit: "उत्कृष्ट अंकुरण व मजबूत आनुवंशिक क्षमता",
  },
  {
    id: 2,
    title: "बायो-बूस्टेड नर्सरी",
    icon: Leaf,
    desc: "17 एकड़ के वातानुकूलित जर्मिनेशन चैंबर में माइकोराइजा व जैविक संवर्धन द्वारा मजबूत जड़ वाली पौध।",
    inputs: "बायोक्योर F, VAM बायो-बूस्टर, प्लग ट्रे",
    partners: "अगाते स्मार्ट नर्सरी",
    benefit: "90-98% गारंटीड जमाव व उत्तरजीविता",
  },
  {
    id: 3,
    title: "खेत की वैज्ञानिक तैयारी",
    icon: Hammer,
    desc: "वैज्ञानिक मिट्टी परीक्षण, बेसल खाद का सही अनुपात, ड्रिप सिंचाई और सिल्वर मल्चिंग का सटीक लेआउट।",
    inputs: "मृदा परीक्षण किट, ड्रिप ट्यूबिंग, मल्चिंग शीट",
    partners: "इरीटेक व स्वाइल टेस्टिंग लैब",
    benefit: "जड़ों का अधिकतम विकास व पानी की बचत",
  },
  {
    id: 4,
    title: "कृषि डॉक्टर की निरंतर सलाह",
    icon: Cpu,
    desc: "व्हाट्सएप पर दैनिक मार्गदर्शन, मोबाइल फोटो से रोग पहचान और किसान साथी कृषि वैज्ञानिकों के सीधे खेत दौरे।",
    inputs: "अगाते ऐप, फील्ड टेलीमेट्री सेंसर",
    partners: "किसान साथी एग्रोनॉमी टीम",
    benefit: "रोगों की शुरुआती दौर में पहचान व इलाज",
  },
  {
    id: 5,
    title: "स्मार्ट ड्रिप फर्टीगेशन",
    icon: Sliders,
    desc: "फसल के चरण अनुसार ड्रिप द्वारा खाद की सटीक आपूर्ति, जिससे खाद सीधे जड़ों तक पहुंचे और बर्बादी न हो।",
    inputs: "घुलनशील बायो-फर्टीलाइजर्स व सूक्ष्म पोषक तत्व",
    partners: "स्टेनिस व जैविक साझेदार",
    benefit: "50-70% तक केमिकल खाद की बचत",
  },
  {
    id: 6,
    title: "निवारक फसल सुरक्षा",
    icon: ShieldCheck,
    desc: "मौसम और कीट पूर्वानुमान के आधार पर बीमारी आने से पहले ही जैविक और सुरक्षित उपचार का सुरक्षा चक्र।",
    inputs: "बायोक्योर B, बायो निमाटॉन, प्लैंटेक्स",
    partners: "प्रमाणित फसल सुरक्षा साझेदार",
    benefit: "फसल का शून्य नुकसान व निरोगी बढ़वार",
  },
  {
    id: 7,
    title: "समय पर वैज्ञानिक तुड़ाई",
    icon: GraduationCap,
    desc: "बांस-तार स्टेकिंग और विशेष क्रेट्स के साथ सही समय पर ग्रेड-ए फल व सब्जियों की वैज्ञानिक तुड़ाई।",
    inputs: "बांस पोल, क्रॉप नेटिंग, हार्वेस्ट क्रेट्स",
    partners: "अगाते हार्वेस्टिंग प्रोटोकॉल",
    benefit: "एकसमान शानदार चमक व ग्रेड-A क्वालिटी",
  },
  {
    id: 8,
    title: "सीधी पक्की बिक्री (बायबैक)",
    icon: Truck,
    desc: "मंडी बिचौलियों और आढ़त के बिना सुपरमार्केट और प्रोसेसर्स को सीधे बिक्री। डिजिटल वजन और तुरंत बैंक भुगतान।",
    inputs: "सीधा खरीदार नेटवर्क जुड़ाव",
    partners: "हैंडपिक व रिटेल सुपरमार्केट नेटवर्क",
    benefit: "अधिकतम मुनाफा और पारदर्शी दाम",
  },
];

export const CROP_JOURNEY_STAGES = CROP_JOURNEY_STAGES_EN;
