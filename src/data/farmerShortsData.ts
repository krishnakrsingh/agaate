export interface FarmerShortItem {
  id: string;
  name: string;
  role: string;
  location: string;
  acres: string;
  crop: string;
  quote: string;
  thumbnail: string;
  videoUrl: string;
  badge: string;
}

export const SHORTS_DATA_EN: FarmerShortItem[] = [
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

export const SHORTS_DATA_HI: FarmerShortItem[] = [
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
