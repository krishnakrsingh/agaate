import type { ContactPageContent } from "@/lib/cms-types";

export const CONTACT_PAGE_FALLBACK: ContactPageContent = {
  faqBadgeEn: "FAQ · Quick Answers",
  faqBadgeHi: "FAQ · त्वरित जवाब",
  faqTitleEn: "Frequently asked questions",
  faqTitleHi: "सामान्य प्रश्न",
  faqs: [
    {
      qEn: "How quickly will someone get back to me?",
      qHi: "किसी को कितनी जल्दी जवाब मिलेगा?",
      aEn:
        "We aim to reply within 2 business hours during farm operating hours (7:30 AM – 8:00 PM IST). Urgent crop issues are prioritised on WhatsApp and the hotline.",
      aHi:
        "हम फार्म संचालन समय (7:30 AM – 8:00 PM IST) के दौरान 2 व्यावसायिक घंटों के भीतर जवाब देने का लक्ष्य रखते हैं।",
    },
    {
      qEn: "Can I visit the farm or Kisan Mall without an appointment?",
      qHi: "क्या मैं बिना अपॉइंटमेंट के फार्म या किसान मॉल जा सकता हूँ?",
      aEn:
        "Yes. The Kisan Mall is open daily 8:00 AM – 8:00 PM. For a guided Agri Park walk or nursery pickup, a quick call or form submission helps us prepare the right advisor.",
      aHi:
        "हाँ। किसान मॉल दैनिक 8:00 AM – 8:00 PM खुला है। एग्री पार्क टूर या नर्सरी पिकअप के लिए एक कॉल या फॉर्म हमें तैयार रखने में मदद करता है।",
    },
    {
      qEn: "What should I share for crop disease help?",
      qHi: "फसल रोग सहायता के लिए मुझे क्या साझा करना चाहिए?",
      aEn:
        "A clear photo of the affected plant, your crop name, stage, and location is enough. You can upload a photo in the form or send it on WhatsApp after submitting.",
      aHi:
        "प्रभावित पौधे की स्पष्ट फोटो, फसल का नाम, चरण और स्थान पर्याप्त है। फॉर्म में फोटो अपलोड करें या सबमिट के बाद WhatsApp पर भेजें।",
    },
    {
      qEn: "Do you charge for the first consultation?",
      qHi: "पहली परामर्श के लिए शुल्क लेते हैं?",
      aEn:
        "Initial agronomy callbacks and guidance for farmers connected through Agaate are free. Turnkey Big Farm Setup and specialised projects are scoped separately.",
      aHi:
        "Agaate से जुड़े किसानों के लिए प्रारंभिक कृषि सलाह मुफ्त है। बिग फार्म सेटअप और विशेष प्रोजेक्ट अलग से तय होते हैं।",
    },
    {
      qEn: "Which locations do you serve?",
      qHi: "आप किन स्थानों पर सेवा देते हैं?",
      aEn:
        "Our hubs are in Gurugram, Haryana. Advisory, nursery, and market linkage support farmers across neighbouring districts; Big Farm projects are planned nationally by scope.",
      aHi:
        "हमारे केंद्र गुरुग्राम, हरियाणा में हैं। सलाह, नर्सरी और बाजार लिंकेज पड़ोसी जिलों में; बिग फार्म प्रोजेक्ट राष्ट्रीय स्तर पर।",
    },
  ],
  consultationTopics: [
    {
      id: "nursery",
      labelEn: "Bio-Boosted Nursery Pre-Orders",
      labelHi: "बायो-बूस्टेड नर्सरी प्री-ऑर्डर",
      descEn: "Reserve disease-resistant saplings with 95%+ guaranteed survival.",
      descHi: "95%+ जीवित रहने की गारंटी के साथ रोग-प्रतिरोधी पौधे बुक करें।",
      iconKey: "plant",
    },
    {
      id: "bigfarm",
      labelEn: "Big Farm Setup (Turnkey)",
      labelHi: "बिग फार्म सेटअप (टर्नकी)",
      descEn: "End-to-end commercial farm planning, drip setup & operations.",
      descHi: "व्यावसायिक फार्म योजना, ड्रिप सेटअप और संचालन।",
      iconKey: "stack",
    },
    {
      id: "carbon",
      labelEn: "Carbon Credit Program",
      labelHi: "कार्बन क्रेडिट कार्यक्रम",
      descEn: "Monetise zero-tillage & drip irrigation practices for extra payout.",
      descHi: "शून्य-जुताई और ड्रिप सिंचाई से अतिरिक्त आय।",
      iconKey: "lightning",
    },
    {
      id: "wholesale",
      labelEn: "Kisan Mall Wholesale",
      labelHi: "किसान मॉल थोक",
      descEn: "Bulk agri-inputs, biocures, mulch rolls & bamboo staking orders.",
      descHi: "थोक कृषि इनपुट, बायोक्योर, मल्च और बांस स्टेकिंग।",
      iconKey: "storefront",
    },
    {
      id: "agripark",
      labelEn: "Agri Park Visit",
      labelHi: "एग्री पार्क विजिट",
      descEn: "Book a guided walk through 8 living partner demonstration zones.",
      descHi: "8 जीवित प्रदर्शन क्षेत्रों का निर्देशित टूर बुक करें।",
      iconKey: "compass",
    },
    {
      id: "general",
      labelEn: "General Agronomy Advisory",
      labelHi: "सामान्य कृषि सलाह",
      descEn: "Direct guidance on soil reports, fertigation schedules & pests.",
      descHi: "मिट्टी रिपोर्ट, फर्टिगेशन और कीट पर सीधी मार्गदर्शन।",
      iconKey: "chat",
    },
  ],
  acreageOptionsEn: ["1-5 Acres", "5-15 Acres", "15-50 Commercial Acres", "50+ Institutional Farm"],
  acreageOptionsHi: ["1-5 एकड़", "5-15 एकड़", "15-50 व्यावसायिक एकड़", "50+ संस्थागत फार्म"],
  cropOptionsEn: ["Watermelon", "Chilli", "Tomato", "Cauliflower", "Cucumber", "Wheat & Paddy"],
  cropOptionsHi: ["तरबूज", "मिर्च", "टमाटर", "फूलगोभी", "खीरा", "गेहूं और धान"],
  channelOptionsEn: ["WhatsApp", "Phone Call", "Email"],
  channelOptionsHi: ["WhatsApp", "फोन कॉल", "ईमेल"],
};
