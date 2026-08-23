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
  Stethoscope,
  Microscope,
  Compass,
} from "@phosphor-icons/react";

export type ServiceCategory =
  | "all"
  | "nursery-inputs"
  | "advisory-tech"
  | "scale-infra"
  | "buyback";

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
  image: string;
  highlights: string[];
  bgGradient: string;
};

export const SERVICES_EN: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-Acre Smart Nursery",
    category: "nursery-inputs",
    desc: "Automated climate chambers & sterile plug trays producing vigorous root-inoculated saplings with 90-98% field survival and zero root shock.",
    tag: "Bio-Infrastructure",
    badgeStat: "98%",
    badgeLabel: "Field Survival Guarantee",
    href: "/services#nursery",
    image: "/nursery.png",
    highlights: [
      "Climate-controlled germination chambers",
      "VAM mycorrhiza & biological root inoculation",
      "Uniform disease-free plug seedlings",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "Kisaan Mall & Verified Inputs",
    category: "nursery-inputs",
    desc: "500+ genuine tested seeds, organic biologicals, water-soluble fertigation nutrients, and custom drip kits straight from 50+ manufacturer partners.",
    tag: "Input Commerce",
    badgeStat: "500+",
    badgeLabel: "Direct Factory SKUs",
    href: "/services#kisaan-mall",
    image: "/kisaan mall.png",
    highlights: [
      "Direct manufacturer transparent pricing",
      "Soil test-matched nutrient dosage charts",
      "100% genuine batch authenticity guarantee",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "advisory",
    icon: Stethoscope,
    title: "Field Agronomy & Plant Doctor",
    category: "advisory-tech",
    desc: "Senior agricultural scientists providing real-time crop disease diagnosis via WhatsApp photo scanner, soil pH mapping, and on-ground field visits.",
    tag: "Field Advisory",
    badgeStat: "< 15 Min",
    badgeLabel: "Diagnosis Response Time",
    href: "/services#advisory",
    image: "/services/agronomy-advisory.jpg",
    highlights: [
      "Smartphone photo pest & fungal diagnosis",
      "Stage-wise customized spray & nutrition schedules",
      "Dedicated on-ground Kisan Sathi field officers",
    ],
    bgGradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "Precision Farm Tech & IoT",
    category: "advisory-tech",
    desc: "Solar soil telemetry probes, multispectral drone crop scouting, automated fertigation valves, and real-time weather risk advisories.",
    tag: "AI & Telemetry",
    badgeStat: "Real-Time",
    badgeLabel: "Soil Telemetry & Alerts",
    href: "/services#farm-tech",
    image: "/services/farm-tech-iot.jpg",
    highlights: [
      "Solar IoT moisture & EC soil probes",
      "Drone aerial crop health NDVI scans",
      "Automated precision drip scheduling",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "Turnkey Big-Farm Establishment",
    category: "scale-infra",
    desc: "Complete commercial establishment from bare acreage to first harvest. Precision polyhouse design, silver mulch layouts, and farm management SOPs.",
    tag: "Commercial Projects",
    badgeStat: "15,000+",
    badgeLabel: "Acres Successfully Managed",
    href: "/services#big-farm-setup",
    image: "/services/turnkey-farm.jpg",
    highlights: [
      "End-to-end polyhouse & drip engineering",
      "Comprehensive labor, crop & harvest SOPs",
      "Full season agronomist stationing",
    ],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "Guaranteed Buyback & Market Linkage",
    category: "buyback",
    desc: "Direct supply agreements with retail chains, supermarket networks, and institutional food processors with guaranteed floor pricing and zero mandi cuts.",
    tag: "Market Linkage",
    badgeStat: "0%",
    badgeLabel: "Mandi Commission Cut",
    href: "/services#market-linkage",
    image: "/services/market-linkage-harvest.jpg",
    highlights: [
      "Pre-season floor pricing contracts",
      "Direct retail & supermarket procurement",
      "24-48 hour direct bank account settlements",
    ],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

export const SERVICES_HI: ServiceItem[] = [
  {
    id: "nursery",
    icon: Plant,
    title: "17-एकड़ बायो-बूस्टेड स्मार्ट नर्सरी",
    category: "nursery-inputs",
    desc: "वातानुकूलित जर्मिनेशन चैंबर व प्लग ट्रे में तैयार बायो-बूस्टेड निरोगी पौध। 90-98% फील्ड जमाव और शून्य जड़ झटका।",
    tag: "बायो-इंफ्रास्ट्रक्चर",
    badgeStat: "98%",
    badgeLabel: "खेत में जीवित रहने की दर",
    href: "/services#nursery",
    image: "/nursery.png",
    highlights: [
      "वातानुकूलित चैंबर में वैज्ञानिक अंकुरण",
      "माइकोराइजा व जैविक संवर्धन उपचार",
      "एकसमान रोगमुक्त मजबूत प्लग पौध",
    ],
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: "inputs",
    icon: Storefront,
    title: "किसान मॉल व प्रमाणित इनपुट्स",
    category: "nursery-inputs",
    desc: "50+ शीर्ष कंपनियों से 500+ प्रमाणित बीज, जैविक पोषण और आधुनिक ड्रिप सामग्री सीधे किफायती दामों पर।",
    tag: "इनपुट कॉमर्स",
    badgeStat: "500+",
    badgeLabel: "प्रमाणित फैक्टरी उत्पाद",
    href: "/services#kisaan-mall",
    image: "/kisaan mall.png",
    highlights: [
      "सीधे फैक्ट्री से पारदर्शी किफायती दरें",
      "मिट्टी जांच अनुसार सटीक मात्रा पर्चा",
      "100% शुद्ध और असली उत्पाद गारंटी",
    ],
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: "advisory",
    icon: Stethoscope,
    title: "फील्ड वैज्ञानिक सलाह व फसल डॉक्टर",
    category: "advisory-tech",
    desc: "व्हाट्सएप फोटो से तुरंत रोग पहचान, मिट्टी पीएच जांच और खेत पर आकर मार्गदर्शन करने वाले अनुभवी कृषि वैज्ञानिक।",
    tag: "फील्ड एडवाइजरी",
    badgeStat: "< 15 मिनट",
    badgeLabel: "रोग पहचान व सलाह समय",
    href: "/services#advisory",
    image: "/services/agronomy-advisory.jpg",
    highlights: [
      "मोबाइल फोटो से तुरंत कीट व फफूंद पहचान",
      "चरणबद्ध स्प्रे और पोषण का सटीक चार्ट",
      "खेत पर उपस्थित किसान साथी वैज्ञानिक",
    ],
    bgGradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "farm-tech",
    icon: Cpu,
    title: "फार्म टेक व एआई प्रीसिजन एग्रोनॉमी",
    category: "advisory-tech",
    desc: "सोलर पावर्ड मृदा टेलीमेट्री सेंसर, ड्रोन द्वारा फसल निगरानी और मोबाइल से संचालित आधुनिक ड्रिप सिंचाई व्यवस्था।",
    tag: "एआई व टेलीमेट्री",
    badgeStat: "रियल-टाइम",
    badgeLabel: "डिजिटल खेत निगरानी",
    href: "/services#farm-tech",
    image: "/services/farm-tech-iot.jpg",
    highlights: [
      "सोलर आईओटी नमी व ईसी सेंसर",
      "ड्रोन से फसल स्वास्थ्य व कीट स्कैन",
      "ऑटोमेटेड ड्रिप फर्टीगेशन कंट्रोल",
    ],
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "turnkey",
    icon: Hammer,
    title: "टर्नकी कमर्शियल बिग-फार्म स्थापना",
    category: "scale-infra",
    desc: "खाली जमीन से लेकर पहली सफल तुड़ाई तक संपूर्ण आधुनिक फार्म का निर्माण। पॉलीहाउस, ड्रिप लेआउट और वैज्ञानिक एसओपी।",
    tag: "कमर्शियल प्रोजेक्ट्स",
    badgeStat: "15,000+",
    badgeLabel: "एकड़ सफलतापूर्वक प्रबंधित",
    href: "/services#big-farm-setup",
    image: "/services/turnkey-farm.jpg",
    highlights: [
      "पॉलीहाउस व ड्रिप सिंचाई का संपूर्ण निर्माण",
      "मजदूर, खाद व तुड़ाई की विस्तृत मानक प्रक्रियाएं",
      "पूरे फसल चक्र में ऑन-साइट कृषि वैज्ञानिक",
    ],
    bgGradient: "from-orange-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "buyback",
    icon: Truck,
    title: "पक्का बायबैक व डायरेक्ट मार्केट लिंकेज",
    category: "buyback",
    desc: "सुपरमार्केट और फूड कंपनियों से सीधा करार। बिना किसी मंडी आढ़त व बिचौलिए के पक्का न्यूनतम समर्थन मूल्य और तुरंत भुगतान।",
    tag: "मार्केट लिंकेज",
    badgeStat: "0%",
    badgeLabel: "मंडी बिचौलिया कटौती",
    href: "/services#market-linkage",
    image: "/services/market-linkage-harvest.jpg",
    highlights: [
      "बुवाई से पहले पक्का न्यूनतम भाव अनुबंध",
      "सीधे रिटेल व सुपरमार्केट को आपूर्ति",
      "24 से 48 घंटे में सीधा बैंक खाता भुगतान",
    ],
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
];

export const SERVICES = SERVICES_EN;

export const IMPACT_STATS_EN = [
  { to: 15000, suffix: "+", label: "Acres under active management" },
  { to: 85, suffix: " Lakh+", label: "Bio-plug saplings delivered" },
  { to: 10, prefix: "₹", suffix: " Cr+", label: "Direct farmer payouts" },
  { to: 50, suffix: "+", label: "Manufacturer partner tie-ups" },
  { to: 2000, suffix: "+", label: "Agaate Parivaar farmers" },
  { to: 100, suffix: "%", label: "Verified genuine inputs" },
  { to: 0, suffix: "%", label: "Middleman commission fee" },
  { to: 48, suffix: " Hrs", label: "Direct bank payment turnaround" },
];

export const IMPACT_STATS_HI = [
  { to: 15000, suffix: "+", label: "एकड़ सक्रिय कृषि रकबा" },
  { to: 85, suffix: " लाख+", label: "बायो-प्लग पौध सप्लाई" },
  { to: 10, prefix: "₹", suffix: " करोड़+", label: "किसानों को सीधा भुगतान" },
  { to: 50, suffix: "+", label: "निर्माता कंपनी साझेदार" },
  { to: 2000, suffix: "+", label: "अगाते परिवार से जुड़े किसान" },
  { to: 100, suffix: "%", label: "प्रमाणित असली उत्पाद" },
  { to: 0, suffix: "%", label: "बिचौलिया आढ़त कटौती" },
  { to: 48, suffix: " घंटे", label: "सीधा बैंक खाता भुगतान" },
];

export const IMPACT_STATS = IMPACT_STATS_EN;

export const CROP_JOURNEY_STAGES_EN = [
  {
    id: 1,
    title: "Soil & Water Testing",
    icon: Plant,
    desc: "Comprehensive lab mapping of soil pH, EC, organic carbon, and groundwater salinity to select the exact crop varieties and basal doses.",
    inputs: "Soil Nutrient Test Kit, EC Meter",
    partners: "Agaate Central Soil Testing Lab",
    benefit: "Precision Baseline Blueprint",
  },
  {
    id: 2,
    title: "Bio-Plug Nursery",
    icon: Leaf,
    desc: "Germinating seeds inside sterile climate chambers with VAM mycorrhiza and Trichoderma biological inoculation for deep root balls.",
    inputs: "Biocure F, VAM Inoculant, 104-Cell Trays",
    partners: "17-Acre Agaate Smart Nursery",
    benefit: "90-98% Field Survival Rate",
  },
  {
    id: 3,
    title: "Bed Prep & Mulching",
    icon: Hammer,
    desc: "Laser-guided raised bed making, customized basal fertilizer incorporation, inline drip placement, and silver-black mulch laying.",
    inputs: "25-Micron Mulch, Inline Drip Tubing",
    partners: "IrriTech Engineering Network",
    benefit: "70% Weed & Evaporation Cut",
  },
  {
    id: 4,
    title: "AI Crop Scouting",
    icon: Cpu,
    desc: "Daily smartphone photo scans to detect fungal blights, leaf miners, and thrips within 15 minutes before infestations spread.",
    inputs: "Agaate Mobile AI Engine",
    partners: "Kisan Sathi Field Agronomists",
    benefit: "Early Warning Disease Shield",
  },
  {
    id: 5,
    title: "Precision Fertigation",
    icon: Sliders,
    desc: "Scheduled drip-feeding of water-soluble NPK, calcium nitrate, and micro-nutrients calculated precisely for each developmental stage.",
    inputs: "Water-Soluble Bio-Formulations",
    partners: "Stanes & Direct Factory Partners",
    benefit: "50% Fertilizer Cost Reduction",
  },
  {
    id: 6,
    title: "Residue-Free Nutrition",
    icon: ShieldCheck,
    desc: "Replacing harsh synthetic chemicals with organic bio-stimulants, seaweed extracts, and botanical repellents for export-grade safety.",
    inputs: "Bio Nimaton, Plantex, Seaweed Extract",
    partners: "Certified Bio-Input Laboratories",
    benefit: "Zero Harmful Chemical Residue",
  },
  {
    id: 7,
    title: "Graded Harvest",
    icon: GraduationCap,
    desc: "Scientific harvesting at peak physiological maturity using sanitized crates and field grading for uniform Grade-A produce.",
    inputs: "Sanitized Crates, Trellis Staking",
    partners: "Agaate Quality Protocol",
    benefit: "Maximum Grade-A Premium Share",
  },
  {
    id: 8,
    title: "48-Hour Buyback Payout",
    icon: Truck,
    desc: "Direct farm-gate pickup, digital weighing, transparent market floor price, and direct bank transfer settlement within 24-48 hours.",
    inputs: "Handpick Logistics & Direct Buyer Connect",
    partners: "Supermarket & Retail Chains",
    benefit: "Zero Middleman Price Exploitation",
  },
];

export const CROP_JOURNEY_STAGES_HI = [
  {
    id: 1,
    title: "मृदा व जल वैज्ञानिक जांच",
    icon: Plant,
    desc: "मिट्टी के पीएच, ईसी, जैविक कार्बन और पानी की गुणवत्ता का परीक्षण ताकि सही फसल और खाद की योजना बनाई जा सके।",
    inputs: "डिजिटल सॉइल टेस्टिंग किट, ईसी मीटर",
    partners: "अगाते केंद्रीय मृदा प्रयोगशाला",
    benefit: "सटीक वैज्ञानिक आधार रिपोर्ट",
  },
  {
    id: 2,
    title: "बायो-बूस्टेड प्लग पौध",
    icon: Leaf,
    desc: "17-एकड़ वातानुकूलित जर्मिनेशन चैंबर में माइकोराइजा व जैविक संवर्धन से तैयार मजबूत जड़ वाली पौध।",
    inputs: "बायोक्योर F, VAM बायो-बूस्टर, 104-प्लग ट्रे",
    partners: "अगाते 17-एकड़ स्मार्ट नर्सरी",
    benefit: "90-98% पक्का जमाव व जीवित रहने की दर",
  },
  {
    id: 3,
    title: "खेत तैयारी व मल्चिंग",
    icon: Hammer,
    desc: "लेजर लेवलिंग, उठी हुई क्यारियां, संतुलित बेसल डोज, इनलाइन ड्रिप पाइप और 25 माइक्रोन सिल्वर मल्चिंग।",
    inputs: "25-माइक्रोन मल्च फिल्म, इनलाइन ड्रिप",
    partners: "इरीटेक इंजीनियरिंग नेटवर्क",
    benefit: "70% खरपतवार व पानी वाष्पीकरण पर रोक",
  },
  {
    id: 4,
    title: "एआई फोटो रोग पहचान",
    icon: Cpu,
    desc: "मोबाइल फोटो द्वारा 15 मिनट में फफूंद व कीट की पहचान और किसान साथी वैज्ञानिक द्वारा तत्काल उपचार पर्चा।",
    inputs: "अगाते एआई मोबाइल इंजन",
    partners: "किसान साथी फील्ड वैज्ञानिक टीम",
    benefit: "बीमारी का समय रहते सटीक खात्मा",
  },
  {
    id: 5,
    title: "ड्रिप फर्टीगेशन पोषण",
    icon: Sliders,
    desc: "फसल के विकास चरण अनुसार घुलनशील खाद का ड्रिप द्वारा सीधे जड़ों में प्रवाह — खाद की शून्य बर्बादी।",
    inputs: "100% जल-घुलनशील एनपीके व सूक्ष्म पोषक",
    partners: "स्टेनिस व शीर्ष जैविक निर्माता",
    benefit: "50% रासायनिक खाद लागत में बचत",
  },
  {
    id: 6,
    title: "अवशेष-मुक्त फसल सुरक्षा",
    icon: ShieldCheck,
    desc: "हानिकारक कीटनाशकों की जगह जैविक बायो-पेस्टीसाइड्स और सीवीड एक्सट्रेक्ट का सुरक्षा चक्र।",
    inputs: "बायो निमाटॉन, प्लैंटेक्स, सीवीड अर्क",
    partners: "प्रमाणित बायो-इनपुट प्रयोगशालाएं",
    benefit: "शून्य हानिकारक केमिकल अवशेष",
  },
  {
    id: 7,
    title: "ग्रेड-ए वैज्ञानिक तुड़ाई",
    icon: GraduationCap,
    desc: "सही पकने के समय पर सुरक्षित क्रेट्स में तुड़ाई, जिससे फलों में शानदार चमक और ग्रेड-ए क्वालिटी बनी रहे।",
    inputs: "सैनिटाइज्ड क्रेट्स, सपोर्ट स्टेकिंग",
    partners: "अगाते क्वालिटी हार्वेस्ट प्रोटोकॉल",
    benefit: "उच्चतम ग्रेड-ए प्रीमियम दर",
  },
  {
    id: 8,
    title: "48 घंटे में सीधा बैंक भुगतान",
    icon: Truck,
    desc: "खेत से सीधी लोडिंग, डिजिटल पारदर्शी तौल, पक्का न्यूनतम मूल्य और 24-48 घंटे में सीधा बैंक खाता भुगतान।",
    inputs: "सीधी कोल्ड-चेन लॉजिस्टिक्स व खरीदार",
    partners: "सुपरमार्केट व संस्थागत खरीदार नेटवर्क",
    benefit: "बिचौलिया आढ़त से 100% मुक्ति",
  },
];

export const CROP_JOURNEY_STAGES = CROP_JOURNEY_STAGES_EN;
