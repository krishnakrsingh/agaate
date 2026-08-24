import type { CmsBrandGroup, CmsIconKey, HomeCmsData } from "@/lib/cms-types";
import { DEFAULT_CMS_SITE_CONFIG } from "@/lib/cms-types";

const STATS_FALLBACK: HomeCmsData["stats"] = [
  {
    id: "acres",
    slug: "acres",
    iconKey: "tractor",
    numValue: 1_500_000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Acres Associated",
    labelHi: "एकड़ जुड़ा रकबा",
  },
  {
    id: "seedlings",
    slug: "seedlings",
    iconKey: "plant",
    numValue: 8_500_000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Bio Plants Delivered",
    labelHi: "बायो पौधे सप्लाई",
  },
  {
    id: "value",
    slug: "value",
    iconKey: "chart",
    numValue: 10,
    prefix: "₹",
    suffixEn: " Cr+",
    suffixHi: " करोड़+",
    labelEn: "Annual Value Managed",
    labelHi: "वार्षिक मूल्य प्रबंधन",
  },
  {
    id: "partners",
    slug: "partners",
    iconKey: "handshake",
    numValue: 50,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Supply Partners",
    labelHi: "साझेदार ब्रांड्स",
  },
  {
    id: "skus",
    slug: "skus",
    iconKey: "warehouse",
    numValue: 1000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Agri-Input SKUs",
    labelHi: "इनपुट उत्पाद",
  },
  {
    id: "irrigation",
    slug: "irrigation",
    iconKey: "drop",
    numValue: 200,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Smart Irrigations",
    labelHi: "स्मार्ट ड्रिप सिंचाई",
  },
  {
    id: "experts",
    slug: "experts",
    iconKey: "cap",
    numValue: 20,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Kisaan Sathi Experts",
    labelHi: "किसान साथी विशेषज्ञ",
  },
  {
    id: "farmers",
    slug: "farmers",
    iconKey: "users",
    numValue: 2000,
    suffixEn: "+",
    suffixHi: "+",
    labelEn: "Parivaar Farmers",
    labelHi: "संतुष्ट किसान परिवार",
  },
];

const LOGOS_FALLBACK: Record<CmsBrandGroup, HomeCmsData["logos"][CmsBrandGroup]> = {
  partners: [
    {
      name: "Coromandel",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289198/coromandel_sgjzct.png",
    },
    {
      name: "Ravi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298183/ravi_e6yg0j.png",
    },
    {
      name: "Indus",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298206/indus_j41n1o.png",
    },
    {
      name: "Netafim",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298152/netafim_ayhi1x.png",
    },
    {
      name: "Vihaan",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298261/vihaan_yzqhdy.png",
    },
    {
      name: "Known-You Seed",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298299/known-you_rlfhmu.png",
    },
    {
      name: "Aries Agro",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289196/aries_kxccjq.png",
    },
    {
      name: "Namdhari Seeds",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768562662/Naamdhari_seeds_xq4a4d.png",
    },
    {
      name: "Syngenta",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768894202/Syngenta_nflip5.png",
    },
    {
      name: "Seminis",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768895033/Seminis_oyretu.png",
    },
  ],
  customers: [
    {
      name: "DS Group",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768560703/DS_y9vrlk.png",
    },
    {
      name: "Harit Bhoomi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768560925/Harit_Bhoomi_h64koo.png",
    },
    {
      name: "FPO Network",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768561266/FPO_wokfze.png",
    },
  ],
  buyers: [
    {
      name: "Blinkit",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768289196/blinkit_dzjrag.png",
    },
    {
      name: "SNS",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298331/sns_ilisot.png",
    },
    {
      name: "Handpickd",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298381/Handpickd_iygla7.jpg",
    },
    {
      name: "Local Mandi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768298412/localmandi_sanyvw.jpg",
    },
    {
      name: "Flipkart",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768561427/Flipkart_yiiedx.png",
    },
    {
      name: "Aadat Mandi",
      src: "https://res.cloudinary.com/dsxfpu2tk/image/upload/v1768893718/aadat_mandi_zicmdx.png",
    },
  ],
  institutional: [
    {
      name: "KR Mangalam University",
      src: "https://www.krmangalam.edu.in/_next/image?url=%2FKRMU-Logo-NAAC.webp&w=750&q=75",
    },
  ],
};

const STORIES_EN_FALLBACK: HomeCmsData["storiesEn"] = [
  {
    id: "short-chilli",
    name: "Rajesh Yadav",
    role: "Progressive Chilli Grower",
    location: "Rewari, Haryana",
    acres: "18 Acres",
    crop: "Chilli (Mirch Paudh)",
    quote:
      "Agaate's Bio-Boosted nursery plug seedlings gave us 98% field survival. Sowing losses dropped to zero.",
    thumbnail: "/videos/posters/mirch-paudh-kisan.webp",
    videoUrl: "/videos/shorts/mirch-paudh-kisan.mp4",
    badge: "98% Plug Survival",
  },
  {
    id: "short-capsicum",
    name: "Pankaj Gupta",
    role: "Polyhouse Capsicum Specialist",
    location: "Karnal, Haryana",
    acres: "12 Acres",
    crop: "Shimla Mirch (Capsicum)",
    quote:
      "Biological root treatments and stage fertigation stopped bacterial wilt and delivered export-grade bell peppers.",
    thumbnail: "/videos/posters/shimla-mirch-kisan.webp",
    videoUrl: "/videos/shorts/shimla-mirch-kisan.mp4",
    badge: "Wilt Recovery",
  },
  {
    id: "short-watermelon",
    name: "Devendra Choudhary",
    role: "Horticulture Cultivator",
    location: "Nuh / Mewat, Haryana",
    acres: "22 Acres",
    crop: "Watermelon (Tarbooz)",
    quote:
      "Uniform fruit size and deep red flesh with 13° Brix sugar levels. Sold our harvest at top mandi rates.",
    thumbnail: "/videos/posters/watermelon-reel.webp",
    videoUrl: "/videos/shorts/watermelon-reel.mp4",
    badge: "Record Harvest",
  },
  {
    id: "short-tomato",
    name: "Sunita Devi & Group",
    role: "Commercial Tomato Growers",
    location: "Sonipat, Haryana",
    acres: "15 Acres",
    crop: "Tomato (Tamatar)",
    quote:
      "Trellising staking and IPM solar traps protected our crop during peak blight weather without pesticide burn.",
    thumbnail: "/videos/posters/tomato-farming-reel.webp",
    videoUrl: "/videos/shorts/tomato-farming-reel.mp4",
    badge: "Zero Spray Burn",
  },
  {
    id: "short-7day",
    name: "Virender Singh",
    role: "Vegetable Farmer",
    location: "Jhajjar, Haryana",
    acres: "14 Acres",
    crop: "Bio-Inoculated Nursery",
    quote:
      "Within just 7 days of transplanting, root anchoring and new leaf flushes were visibly double ordinary seedlings.",
    thumbnail: "/videos/posters/7-din-fark.webp",
    videoUrl: "/videos/shorts/7-din-fark.mp4",
    badge: "7-Day Rapid Growth",
  },
  {
    id: "short-drip",
    name: "Rameshwar Dayal",
    role: "Precision Farm Operator",
    location: "Kukrola, Gurugram",
    acres: "8 Acres",
    crop: "Automated Drip Setup",
    quote:
      "Automated drip irrigation saved 60% water and 2 hours of daily labour while dosing nutrients directly to the root zone.",
    thumbnail: "/videos/posters/drip-short.webp",
    videoUrl: "/videos/shorts/drip-short.mp4",
    badge: "60% Water Saved",
  },
  {
    id: "short-traps",
    name: "Harish Sharma",
    role: "IPM Farm Advocate",
    location: "Farrukhnagar, Haryana",
    acres: "10 Acres",
    crop: "Pheromone & Solar Traps",
    quote:
      "Lure traps trapped fruit flies and borers before they could lay eggs. Reduced chemical sprays by 4 rounds.",
    thumbnail: "/videos/posters/traps-intro-reel.webp",
    videoUrl: "/videos/shorts/traps-intro-reel.mp4",
    badge: "Residue-Free IPM",
  },
  {
    id: "short-mall",
    name: "Suresh Kumar",
    role: "Agaate Parivaar Member",
    location: "Bilaspur Kalan, Gurugram",
    acres: "16 Acres",
    crop: "Kisaan Mall Customer",
    quote:
      "Getting 100% original inputs straight from manufacturers at fair wholesale rates with agronomist guidance.",
    thumbnail: "/videos/posters/farmer-kisan-mall.webp",
    videoUrl: "/videos/shorts/farmer-kisan-mall.mp4",
    badge: "100% Genuine Inputs",
  },
];

const STORIES_HI_FALLBACK: HomeCmsData["storiesHi"] = [
  {
    id: "short-chilli",
    name: "राजेश यादव",
    role: "प्रगतिशील मिर्च उत्पादक",
    location: "रेवाड़ी, हरियाणा",
    acres: "18 एकड़",
    crop: "मिर्च पौध (प्लस रूट)",
    quote:
      "अगाते की बायो-बूस्टेड नर्सरी पौध का 98% जमाव रहा। खेत में रोपाई के बाद एक भी पौधा नहीं सूखा।",
    thumbnail: "/videos/posters/mirch-paudh-kisan.webp",
    videoUrl: "/videos/shorts/mirch-paudh-kisan.mp4",
    badge: "98% पौध जमाव",
  },
  {
    id: "short-capsicum",
    name: "पंकज गुप्ता",
    role: "पॉलीहाउस शिमला मिर्च विशेषज्ञ",
    location: "करनाल, हरियाणा",
    acres: "12 एकड़",
    crop: "शिमला मिर्च",
    quote:
      "बायो-दवाओं और सही ड्रिप फर्टीगेशन से उकठा (Wilt) रोग पूरी तरह रुक गया और शानदार एक्सपोर्ट-ग्रेड शिमला मिर्च मिली।",
    thumbnail: "/videos/posters/shimla-mirch-kisan.webp",
    videoUrl: "/videos/shorts/shimla-mirch-kisan.mp4",
    badge: "रोग मुक्त फसल",
  },
  {
    id: "short-watermelon",
    name: "देवेंद्र चौधरी",
    role: "सब्जी व तरबूज उत्पादक",
    location: "नूंह / मेवात, हरियाणा",
    acres: "22 एकड़",
    crop: "तरबूज (Watermelon)",
    quote: "एक समान साइज और गहरा लाल मिठास भरा तरबूज। मंडी में सबसे पहले और सबसे ऊंचे भाव पर बिका।",
    thumbnail: "/videos/posters/watermelon-reel.webp",
    videoUrl: "/videos/shorts/watermelon-reel.mp4",
    badge: "रिकॉर्ड उत्पादन",
  },
  {
    id: "short-tomato",
    name: "सुनीता देवी व समूह",
    role: "टमाटर किसान समूह",
    location: "सोनीपत, हरियाणा",
    acres: "15 एकड़",
    crop: "टमाटर (Tamatar)",
    quote:
      "स्टेकिंग व सोलर ट्रैप्स की तकनीक से बारिश के मौसम में भी टमाटर की बेल सुरक्षित रही और कोई स्प्रे नुकसान नहीं हुआ।",
    thumbnail: "/videos/posters/tomato-farming-reel.webp",
    videoUrl: "/videos/shorts/tomato-farming-reel.mp4",
    badge: "सुरक्षित बेल",
  },
  {
    id: "short-7day",
    name: "वीरेंद्र सिंह",
    role: "सब्जी किसान",
    location: "झज्जर, हरियाणा",
    acres: "14 एकड़",
    crop: "बायो-बूस्टेड नर्सरी",
    quote:
      "रोपाई के सिर्फ 7 दिन के अंदर सफेद जड़ों का जाल और नए पत्तों का विकास आम पौध से दोगुना दिखा।",
    thumbnail: "/videos/posters/7-din-fark.webp",
    videoUrl: "/videos/shorts/7-din-fark.mp4",
    badge: "7 दिन में असर",
  },
  {
    id: "short-drip",
    name: "रामेश्वर दयाल",
    role: "आधुनिक ड्रिप फार्मर",
    location: "कुकरोला, गुरुग्राम",
    acres: "8 एकड़",
    crop: "ड्रिप सिंचाई सिस्टम",
    quote: "ड्रिप सिस्टम लगाने से पानी और लेबर दोनों 60% बचे और खाद सीधे पौधे की जड़ तक पहुंची।",
    thumbnail: "/videos/posters/drip-short.webp",
    videoUrl: "/videos/shorts/drip-short.mp4",
    badge: "60% पानी की बचत",
  },
  {
    id: "short-traps",
    name: "हरीश शर्मा",
    role: "जैविक कीट नियंत्रण",
    location: "फारुखनगर, हरियाणा",
    acres: "10 एकड़",
    crop: "फेरोमोन व सोलर ट्रैप",
    quote:
      "ट्रैप्स ने फल मक्खी और सुंडी को अंडे देने से पहले ही पकड़ लिया। 4 राउंड के रासायनिक स्प्रे बच गए।",
    thumbnail: "/videos/posters/traps-intro-reel.webp",
    videoUrl: "/videos/shorts/traps-intro-reel.mp4",
    badge: "सुरक्षित कीट नियंत्रण",
  },
  {
    id: "short-mall",
    name: "सुरेश कुमार",
    role: "अगाते परिवार सदस्य",
    location: "बिलासपुर कलां, गुरुग्राम",
    acres: "16 एकड़",
    crop: "किसान मॉल ग्राहक",
    quote:
      "किसान मॉल से सीधे कंपनी का 100% असली बीज और खाद उचित दाम पर मिली, साथ में कृषि डॉक्टर की सलाह।",
    thumbnail: "/videos/posters/farmer-kisan-mall.webp",
    videoUrl: "/videos/shorts/farmer-kisan-mall.mp4",
    badge: "100% असली इनपुट",
  },
];

export const HOMEPAGE_CMS_FALLBACK: HomeCmsData = {
  stats: STATS_FALLBACK,
  logos: LOGOS_FALLBACK,
  storiesEn: STORIES_EN_FALLBACK,
  storiesHi: STORIES_HI_FALLBACK,
  appLinks: DEFAULT_CMS_SITE_CONFIG.appLinks,
  agriParkTour: DEFAULT_CMS_SITE_CONFIG.agriParkTour,
};

export function getFallbackSeedStats() {
  return STATS_FALLBACK.map((s, i) => ({
    slug: s.slug,
    iconKey: s.iconKey as CmsIconKey,
    numValue: s.numValue,
    prefix: s.prefix ?? null,
    suffixEn: s.suffixEn,
    suffixHi: s.suffixHi,
    labelEn: s.labelEn,
    labelHi: s.labelHi,
    sortOrder: i,
  }));
}

export function getFallbackSeedLogos() {
  const items: Array<{ name: string; group: CmsBrandGroup; imageUrl: string; sortOrder: number }> =
    [];
  let order = 0;
  for (const group of ["partners", "customers", "buyers", "institutional"] as const) {
    for (const logo of LOGOS_FALLBACK[group]) {
      items.push({ name: logo.name, group, imageUrl: logo.src, sortOrder: order++ });
    }
  }
  return items;
}

export function getFallbackSeedStories() {
  return STORIES_EN_FALLBACK.map((en, i) => {
    const hi = STORIES_HI_FALLBACK[i]!;
    return {
      slug: en.id,
      nameEn: en.name,
      nameHi: hi.name,
      roleEn: en.role,
      roleHi: hi.role,
      locationEn: en.location,
      locationHi: hi.location,
      acresEn: en.acres,
      acresHi: hi.acres,
      cropEn: en.crop,
      cropHi: hi.crop,
      quoteEn: en.quote,
      quoteHi: hi.quote,
      badgeEn: en.badge,
      badgeHi: hi.badge,
      thumbnailUrl: en.thumbnail,
      videoUrl: en.videoUrl,
      sortOrder: i,
    };
  });
}
