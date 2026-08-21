export interface KisaanMallMediaContent {
  afterfilmHindi: {
    title: string;
    videoUrl: string;
    posterUrl: string;
    duration: string;
  };
  afterfilmEnglish: {
    title: string;
    videoUrl: string;
    posterUrl: string;
    duration: string;
  };
  launchDocumentary: {
    title: string;
    videoUrl: string;
    posterUrl: string;
    duration: string;
  };
  storePromoReel: {
    title: string;
    videoUrl: string;
    posterUrl: string;
    duration: string;
  };
  farmerReview: {
    farmerName: string;
    location: string;
    videoUrl: string;
    posterUrl: string;
    quote: string;
    quoteHi: string;
  };
  storeAisles: {
    id: string;
    title: string;
    titleHi: string;
    category: string;
    desc: string;
    descHi: string;
    image: string;
    brands: string[];
    skus: string;
  }[];
}

export const KISAAN_MALL_MEDIA: KisaanMallMediaContent = {
  afterfilmHindi: {
    title: "अगाते फार्म व स्मार्ट नर्सरी फर्स्ट लुक",
    videoUrl: "/videos/farm-first-look.mp4",
    posterUrl: "/videos/posters/farm-first-look.webp",
    duration: "2m 03s"
  },
  afterfilmEnglish: {
    title: "Agaate 4K Brand Film · Seed to Sale",
    videoUrl: "/videos/brand-film.mp4",
    posterUrl: "/videos/posters/brand-film.webp",
    duration: "2m 06s"
  },
  launchDocumentary: {
    title: "Agaate Mission & Agri Infrastructure",
    videoUrl: "/videos/brand-film.mp4",
    posterUrl: "/videos/posters/brand-film.webp",
    duration: "2m 06s"
  },
  storePromoReel: {
    title: "Inside India's First Modern Agri Superstore",
    videoUrl: "/videos/shorts/shop-launch-promo.mp4",
    posterUrl: "/videos/posters/shop-launch-promo.webp",
    duration: "42s"
  },
  farmerReview: {
    farmerName: "Suresh Kumar & Fellow Growers",
    location: "Bilaspur Kalan, Gurugram (Haryana)",
    videoUrl: "/videos/shorts/farmer-kisan-mall.mp4",
    posterUrl: "/videos/posters/farmer-kisan-mall.webp",
    quote: "No fake inputs, no black marketing. Genuine brand fertilizers and seeds delivered right on time with QR authentication.",
    quoteHi: "कोई नकली दवा या कालाबाजारी नहीं। सीधे कंपनी का असली माल सही दाम पर और खेत तक डिलीवरी।"
  },
  storeAisles: [
    {
      id: "seeds",
      title: "100% Certified Hybrid & Pure Seeds",
      titleHi: "100% प्रमाणित हाइब्रिड व देशी बीज",
      category: "Seeds & Nursery",
      desc: "Climate-tested vegetable seeds with guaranteed 90%+ germination rates directly sourced from research breeders.",
      descHi: "रिसर्च ब्रीडर्स से सीधे प्रमाणित सब्जी बीज, 90%+ जमाव गारंटी के साथ।",
      image: "/images/gallery/farm_photo_01.webp",
      brands: ["Seminis", "Syngenta", "Namdhari Seeds", "Known-You", "Advanta"],
      skus: "150+ Varieties"
    },
    {
      id: "bio-nutrition",
      title: "Bio-Fertilizers & Soil Biologicals",
      titleHi: "बायो-फर्टिलाइजर व मिट्टी पोषण",
      category: "Plant Nutrition",
      desc: "Water-soluble micro-nutrients, mycorrhiza, amino-acids, and organic compost restoring degraded farm soil biology.",
      descHi: "घुलनशील सूक्ष्म पोषक तत्व, माइकोराइजा और जैविक खाद जो मिट्टी को दोबारा उपजाऊ बनाते हैं।",
      image: "/images/gallery/farm_photo_04.webp",
      brands: ["Coromandel", "T.Stanes", "Aries Agro", "IFFCO", "Koppert"],
      skus: "200+ Nutrients"
    },
    {
      id: "drip-hardware",
      title: "Automated Drip, Mulch & Precision Hardware",
      titleHi: "ड्रिप सिंचाई, मल्चिंग व आधुनिक उपकरण",
      category: "Farm Automation",
      desc: "Pressure-compensating drip laterals, inline drippers, UV-stabilized 25-30 micron mulching films, and fertigation venturis.",
      descHi: "प्रेशर-कम्पेनसेटिंग ड्रिप, 25-30 माइक्रोन यूवी मल्चिंग फिल्म और ऑटोमैटिक फर्टीगेशन किट।",
      image: "/images/gallery/farm_photo_07.webp",
      brands: ["Netafim", "Jain Irrigation", "Captain Polyplast", "Finolex"],
      skus: "80+ Hardware Items"
    },
    {
      id: "ipm-protection",
      title: "Zero-Residue Bio-Pesticides & Traps",
      titleHi: "शून्य-अवशेष जैविक दवाएं व सोलर ट्रैप",
      category: "Crop Protection",
      desc: "Targeted botanical extracts, microbial bio-fungicides, sticky sheets, and solar insect traps eliminating pests without residue penalty.",
      descHi: "वानस्पतिक अर्क, फफूंदनाशक, फेरोमोन व सोलर ट्रैप जो बिना जहर के फसल को बचाते हैं।",
      image: "/images/gallery/farm_photo_12.webp",
      brands: ["Bayer", "Koppert", "PI Industries", "Dhanuka", "Godrej Agrovet"],
      skus: "120+ Bio-Agents"
    }
  ]
};
