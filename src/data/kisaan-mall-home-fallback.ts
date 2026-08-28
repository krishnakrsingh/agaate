import type {
  KisaanMallHeroStat,
  KisaanMallHomeChapter,
  KisaanMallSectionCopy,
  KisaanMallSupplyStep,
} from "@/lib/cms-types";

export const KISAAN_MALL_HOME_DEFAULTS: {
  homeChapter: KisaanMallHomeChapter;
  heroStats: KisaanMallHeroStat[];
  supplyChain: KisaanMallSectionCopy;
  supplySteps: KisaanMallSupplyStep[];
} = {
  heroStats: [
    {
      numValue: 1000,
      suffixEn: "+",
      suffixHi: "+",
      valueTextEn: "",
      valueTextHi: "",
      labelEn: "Verified Products",
      labelHi: "प्रमाणित उत्पाद",
    },
    {
      numValue: 50,
      suffixEn: "+",
      suffixHi: "+",
      valueTextEn: "",
      valueTextHi: "",
      labelEn: "Brand Partners",
      labelHi: "पार्टनर ब्रांड्स",
    },
    {
      numValue: 0,
      suffixEn: "",
      suffixHi: "",
      valueTextEn: "100%",
      valueTextHi: "100%",
      labelEn: "Genuine Guaranteed",
      labelHi: "असली व प्रमाणित",
    },
  ],
  supplyChain: {
    badgeEn: "Agaate Direct Supply Guarantee",
    badgeHi: "अगाते डायरेक्ट सप्लाई गारंटी",
    titleEn: "From partner labs directly to your field gate",
    titleHi: "निर्माता कंपनियों से सीधे खेत के गेट तक की सुरक्षित यात्रा",
    descriptionEn:
      "Zero middleman adulteration, zero expired stock. Every batch is stored under climate control and delivered with verified lot codes.",
    descriptionHi:
      "बिना किसी बिचौलिये या मिलावट के खतरे के — हर इनपुट की वैज्ञानिक जांच और तापमान-नियंत्रित वेयरहाउसिंग से गुणवत्ता सुरक्षित रहती है।",
  },
  supplySteps: [
    {
      step: "01",
      titleEn: "Information Gathering",
      titleHi: "क्षेत्रीय डेटा व मांग संग्रह",
      descEn:
        "Localized soil, weather & crop data analyzed to curate verified inputs suited for local conditions.",
      descHi: "क्षेत्रीय मिट्टी, मौसम व फसल चक्र अनुसार उपयुक्त और प्रमाणित इनपुट्स का सटीक चयन।",
      iconKey: "compass",
    },
    {
      step: "02",
      titleEn: "Direct Partner Sourcing",
      titleHi: "सीधे कंपनियों से सोर्सिंग",
      descEn:
        "Sourced directly from 50+ certified seed & input manufacturers with zero multi-tier middleman margins.",
      descHi:
        "बिना किसी बिचौलिए के सीधे 50+ प्रतिष्ठित विनिर्माताओं से पारदर्शी व किफायती दरों पर खरीद।",
      iconKey: "cap",
    },
    {
      step: "03",
      titleEn: "Climate-Controlled Hub",
      titleHi: "तापमान-नियंत्रित वेयरहाउस",
      descEn:
        "Preserved in humidity and temperature-controlled storage to maintain seed vigour and microbial viability.",
      descHi:
        "बीज की अंकुरण क्षमता और बायो-कल्चर की गुणवत्ता बनाए रखने हेतु विशेष हब में सुरक्षित भंडारण।",
      iconKey: "warehouse",
    },
    {
      step: "04",
      titleEn: "Direct Farm Delivery",
      titleHi: "खेत के गेट तक सीधी डिलीवरी",
      descEn:
        "Delivered straight to your field gate across 15,000+ PIN codes with tamper-proof sealed packaging.",
      descHi:
        "15,000+ पिनकोड में सीधे आपके खेत के गेट तक सुरक्षित डिलीवरी और सीलबंद सुरक्षित पैकेजिंग।",
      iconKey: "warehouse",
    },
  ],
  homeChapter: {
    badgeEn: "Agaate Kisaan Mall",
    badgeHi: "अगाते किसान मॉल",
    titleEn: "India's First Modern Input Retail for Farmers",
    titleHi: "किसानों के लिए भारत का पहला आधुनिक कृषि मॉल",
    descriptionEn:
      "One-stop shop for farmers. Verified seeds, biologicals, and drip kits delivered direct to your farm at honest prices.",
    descriptionHi:
      "किसानों के लिए वन-स्टॉप कृषि केंद्र। 100% प्रमाणित बीज, जैविक पोषण और ड्रिप किट सीधे खेत तक किफायती दरों पर।",
    featuresEn: [
      "Direct-from-brand honest pricing",
      "100% verified product authenticity",
      "Custom drip & irrigation packages",
    ],
    featuresHi: [
      "सीधे निर्माता कंपनियों से किफायती दाम",
      "100% असली व प्रमाणित उत्पाद की गारंटी",
      "कस्टमाइज्ड ड्रिप व सिंचाई पैकेज",
    ],
    browseLabelEn: "Browse Agaate Mall",
    browseLabelHi: "किसान मॉल देखें",
    supplyHeadingEn: "How Agaate Direct Supply Works",
    supplyHeadingHi: "अगाते डायरेक्ट सप्लाई कैसे काम करती है",
    supplySubtextEn:
      "From certified partner brands to your field gate — every batch is verified for germination, purity, and authenticity.",
    supplySubtextHi:
      "प्रमाणित ब्रांड्स से लेकर सीधे आपके खेत के गेट तक — हर एक लॉट की अंकुरण, शुद्धता और असलियत जांची जाती है।",
    ctaEyebrowEn: "DIRECT AGRONOMIST RECOMMENDATION",
    ctaEyebrowHi: "कृषि वैज्ञानिक से सीधी सलाह",
    ctaTitleEn: "Unsure which seed or bio-input matches your soil?",
    ctaTitleHi: "तय नहीं कर पा रहे कि आपकी मिट्टी के लिए कौन सा बीज या खाद सही है?",
    ctaDescriptionEn:
      "Talk directly with senior field experts to get exact dose calculations before placing your Agaate Mall order.",
    ctaDescriptionHi:
      "ऑर्डर करने से पहले सीधे वरिष्ठ कृषि विशेषज्ञों से बात करें और सही मात्रा का चार्ट प्राप्त करें।",
    ctaBrowseEn: "Browse Store",
    ctaBrowseHi: "स्टोर देखें",
    ctaCallEn: "Call Agronomist",
    ctaCallHi: "कृषि डॉक्टर को कॉल करें",
  },
};
