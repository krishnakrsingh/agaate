export interface PartnerByteItem {
  partnerId: string;
  brandName: string;
  speaker: string;
  designation: string;
  topic: string;
  topicHi: string;
  summary: string;
  summaryHi: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
}

export const PARTNER_BYTES: Record<string, PartnerByteItem> = {
  netafim: {
    partnerId: "netafim",
    brandName: "Netafim",
    speaker: "Gaurav",
    designation: "Agronomy & Drip Irrigation Lead, Netafim India",
    topic: "Precision Drip Automation & Water Efficiency",
    topicHi: "सटीक ड्रिप ऑटोमेशन व जल बचत तकनीक",
    summary: "How Netafim precision drip and automated fertigation systems increase nutrient absorption by 40% while slashing water consumption across Haryana vegetable clusters.",
    summaryHi: "नेटाफिम ड्रिप और ऑटोमेटेड फर्टीगेशन से हरियाणा में सब्जी किसानों की 40% खाद और 60% पानी की बचत होती है।",
    videoUrl: "/videos/partners/netafim-byte.mp4",
    posterUrl: "/videos/posters/netafim-byte.webp",
    duration: "1m 15s"
  },
  bayer: {
    partnerId: "bayer",
    brandName: "Bayer Crop Science / Seminis",
    speaker: "Ankit Rawat with Bayer Regional Team",
    designation: "Bayer Agronomic Specialist",
    topic: "High-Yield Hybrid Vegetable Seeds & Disease Resistance",
    topicHi: "उच्च उपज हाइब्रिड सब्जी बीज व रोग प्रतिरोधकता",
    summary: "Authentic Bayer & Seminis seed genetics tailored for North Indian sub-tropical climate, ensuring high germination and robust field performance.",
    summaryHi: "उत्तर भारत की जलवायु के अनुसार बायर और सेमिनिस के प्रमाणित हाइब्रिड बीजों की उच्च जमाव दर और रोग प्रतिरोधक क्षमता।",
    videoUrl: "/videos/partners/bayer-byte.mp4",
    posterUrl: "/videos/posters/bayer-byte.webp",
    duration: "1m 45s"
  },
  coromandel: {
    partnerId: "coromandel",
    brandName: "Coromandel International",
    speaker: "Harish & Technical Agronomists",
    designation: "Nutrition & Soil Science Specialist, Coromandel",
    topic: "Balanced Crop Nutrition & Stage Fertigation Matrices",
    topicHi: "संतुलित फसल पोषण व स्टेज-वार फर्टीगेशन चार्ट",
    summary: "Coromandel specialized water-soluble fertilizers and organic bio-boosters custom-prescribed for tomato, chilli, and cucurbit crops.",
    summaryHi: "कोरोमंडल के घुलनशील उर्वरक और जैविक पोषण से टमाटर, मिर्च और बेलदार फसलों के संपूर्ण विकास का वैज्ञानिक तरीका।",
    videoUrl: "/videos/partners/coromandel-byte.mp4",
    posterUrl: "/videos/posters/coromandel-byte.webp",
    duration: "2m 10s"
  },
  syngenta: {
    partnerId: "syngenta",
    brandName: "Syngenta",
    speaker: "Syngenta Field Expert",
    designation: "Vegetable Seeds & Crop Care Specialist",
    topic: "Certified CFL Seed Varieties & Crop Protection Protocols",
    topicHi: "प्रमाणित बीज वैरायटी और फसल सुरक्षा प्रोटोकॉल",
    summary: "Guaranteed seed authentication and targeted protection spray schedules minimizing residue and maximizing market yield.",
    summaryHi: "100% असली बीजों की पहचान और न्यूनतम रासायनिक स्प्रे में अधिकतम सब्जी उत्पादन के नियम।",
    videoUrl: "/videos/partners/syngenta-byte.mp4",
    posterUrl: "/videos/posters/syngenta-byte.webp",
    duration: "45s"
  },
  koppert: {
    partnerId: "koppert",
    brandName: "Koppert Biological Systems",
    speaker: "Koppert Biological Technical Team",
    designation: "Bio-Protection Agronomist",
    topic: "Microbial Bio-Fungicides & Zero-Residue Bio-Control",
    topicHi: "जैविक फफूंदनाशक व शून्य-अवशेष कीट नियंत्रण",
    summary: "Beneficial microorganisms and bio-agents that suppress soil-borne pathogens and root rot naturally without chemical resistance.",
    summaryHi: "कॉपरट के जैविक बायो-एजेंट्स जो बिना किसी हानिकारक केमिकल के मिट्टी के रोगों और उकठा से फसल को बचाते हैं।",
    videoUrl: "/videos/partners/koppert-byte.mp4",
    posterUrl: "/videos/posters/koppert-byte.webp",
    duration: "1m 20s"
  },
  "t-stanes": {
    partnerId: "t-stanes",
    brandName: "T.Stanes & Company",
    speaker: "Ankit Rawat & T.Stanes Leadership",
    designation: "Botanical Input & Bio-Nutrition Lead",
    topic: "Bio-Fertilizers & Botanical Extracts for Soil Rejuvenation",
    topicHi: "मिट्टी सुधार हेतु बायो-फर्टिलाइजर व वानस्पतिक पोषण",
    summary: "Century-old botanical extraction and bio-inoculation science revitalizing soil microbiology and boosting root capillary development.",
    summaryHi: "टी. स्टेन्स के 100+ वर्षों के वैज्ञानिक बायो-फर्टिलाइजर से खेत की मिट्टी को जीवित और उपजाऊ बनाने का अनुभव।",
    videoUrl: "/videos/partners/t-stanes-byte.mp4",
    posterUrl: "/videos/posters/t-stanes-byte.webp",
    duration: "2m 30s"
  }
};
