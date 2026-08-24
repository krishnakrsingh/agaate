export type TopicFormConfig = {
  id: string;
  badgeEn: string;
  badgeHi: string;
  
  // Field 1 (Select or Text)
  field1LabelEn: string;
  field1LabelHi: string;
  field1OptionsEn?: string[];
  field1OptionsHi?: string[];
  field1PlaceholderEn?: string;
  field1PlaceholderHi?: string;

  // Field 2 (Select or Text)
  field2LabelEn: string;
  field2LabelHi: string;
  field2OptionsEn?: string[];
  field2OptionsHi?: string[];
  field2PlaceholderEn?: string;
  field2PlaceholderHi?: string;

  // Field 3 (Location / District)
  field3LabelEn: string;
  field3LabelHi: string;
  field3PlaceholderEn: string;
  field3PlaceholderHi: string;

  // Notes area
  notesLabelEn: string;
  notesLabelHi: string;
  notesPlaceholderEn: string;
  notesPlaceholderHi: string;

  // File Attachment
  showFileUpload: boolean;
  fileUploadLabelEn?: string;
  fileUploadLabelHi?: string;

  // Submit button text
  buttonLabelEn: string;
  buttonLabelHi: string;
};

export const TOPIC_FORM_CONFIGS: Record<string, TopicFormConfig> = {
  nursery: {
    id: "nursery",
    badgeEn: "Nursery Booking Desk · 95%+ Survival Guaranteed",
    badgeHi: "नर्सरी प्री-ऑर्डर डेस्क · 95%+ पौध बचाव गारंटी",
    field1LabelEn: "Target Crop",
    field1LabelHi: "लक्षित फसल",
    field1OptionsEn: ["Chilli (मिर्च)", "Tomato (टमाटर)", "Watermelon (तरबूज)", "Cucumber (खीरा)", "Cauliflower (फूलगोभी)", "Brinjal (बैंगन)", "Papaya (पपीता)", "Other Vegetable"],
    field1OptionsHi: ["मिर्च (Chilli)", "टमाटर (Tomato)", "तरबूज (Watermelon)", "खीरा (Cucumber)", "फूलगोभी (Cauliflower)", "बैंगन (Brinjal)", "पपीता (Papaya)", "अन्य सब्जी"],
    field2LabelEn: "Required Saplings / Trays",
    field2LabelHi: "आवश्यक पौधे / ट्रे",
    field2OptionsEn: ["2,000 – 5,000 Saplings", "5,000 – 20,000 Saplings", "20,000 – 50,000 Saplings", "50,000+ Commercial Order"],
    field2OptionsHi: ["2,000 – 5,000 पौधे", "5,000 – 20,000 पौधे", "20,000 – 50,000 पौधे", "50,000+ व्यावसायिक ऑर्डर"],
    field3LabelEn: "Delivery District / State",
    field3LabelHi: "डिलीवरी जिला व राज्य",
    field3PlaceholderEn: "e.g. Gurugram, Karnal, Rewari",
    field3PlaceholderHi: "उदा. गुरुग्राम, करनाल, रेवाड़ी",
    notesLabelEn: "Target Planting Month & Variety (Optional)",
    notesLabelHi: "रोपाई का महीना व किस्म (वैकल्पिक)",
    notesPlaceholderEn: "e.g. Need 10,000 seedlings for mid-August transplanting, open to variety recommendation...",
    notesPlaceholderHi: "उदा. अगस्त मध्य में रोपाई के लिए 10,000 पौधे चाहिए, किस्म सलाह भी दें...",
    showFileUpload: false,
    buttonLabelEn: "Reserve Nursery Pre-Order",
    buttonLabelHi: "नर्सरी प्री-ऑर्डर बुक करें",
  },
  bigfarm: {
    id: "bigfarm",
    badgeEn: "Turnkey Projects · Drip, Polyhouse & Commercial Setup",
    badgeHi: "टर्नकी प्रोजेक्ट्स · ड्रिप, पॉलीहाउस व कमर्शियल फार्म",
    field1LabelEn: "Land Area (Acres)",
    field1LabelHi: "कुल भूमि रकबा (एकड़)",
    field1OptionsEn: ["5 – 15 Acres", "15 – 50 Commercial Acres", "50 – 100+ Institutional Acres"],
    field1OptionsHi: ["5 – 15 एकड़", "15 – 50 व्यावसायिक एकड़", "50 – 100+ संस्थागत एकड़"],
    field2LabelEn: "Setup Scope",
    field2LabelHi: "फार्म सेटअप का प्रकार",
    field2OptionsEn: ["Complete Turnkey Setup", "Automated Drip & Fertigation", "Polyhouse / Net-house Facility", "High-Density Fruit Orchard"],
    field2OptionsHi: ["संपूर्ण टर्नकी फार्म सेटअप", "ऑटोमेटेड ड्रिप व फर्टिगेशन", "पॉलीहाउस / नेट-हाउस सुविधा", "सघन बागवानी (ऑर्चर्ड)"],
    field3LabelEn: "Project District / State",
    field3LabelHi: "प्रोजेक्ट जिला व राज्य",
    field3PlaceholderEn: "e.g. Alwar, Jaipur, Mathura",
    field3PlaceholderHi: "उदा. अलवर, जयपुर, मथुरा",
    notesLabelEn: "Water Source & Project Timeline (Optional)",
    notesLabelHi: "पानी का स्रोत व प्रोजेक्ट समय-सीमा",
    notesPlaceholderEn: "Mention borewell water availability, boundary fencing status, or planned launch date...",
    notesPlaceholderHi: "बोरवेल पानी, चारदीवारी स्थिति या शुरू करने की अनुमानित तारीख बताएं...",
    showFileUpload: true,
    fileUploadLabelEn: "Attach farm map, soil test, or layout (optional)",
    fileUploadLabelHi: "खेत का नक्शा, मिट्टी रिपोर्ट या लेआउट संलग्न करें (वैकल्पिक)",
    buttonLabelEn: "Request Turnkey Farm Proposal",
    buttonLabelHi: "टर्नकी फार्म प्रस्ताव प्राप्त करें",
  },
  carbon: {
    id: "carbon",
    badgeEn: "Carbon Credit Program · Extra Income for Sustainable Farming",
    badgeHi: "कार्बन क्रेडिट कार्यक्रम · टिकाऊ खेती से प्रति एकड़ अतिरिक्त आय",
    field1LabelEn: "Cultivated Area (Acres)",
    field1LabelHi: "खेती का रकबा (एकड़)",
    field1OptionsEn: ["10 – 25 Acres", "25 – 100 Acres", "100+ Acres (FPO / Cluster)"],
    field1OptionsHi: ["10 – 25 एकड़", "25 – 100 एकड़", "100+ एकड़ (FPO / क्लस्टर)"],
    field2LabelEn: "Current Irrigation / Practices",
    field2LabelHi: "वर्तमान सिंचाई व कृषि पद्धति",
    field2OptionsEn: ["AWD / Drip Irrigation", "Zero-Tillage / Direct Seeding", "Bio-Fertilizer & Organic Inputs", "Flood Irrigation (Planning Switch)"],
    field2OptionsHi: ["AWD / ड्रिप सिंचाई", "जीरो-टिलेज / सीधी बिजाई", "जैविक खाद व बायो-इनपुट्स", "पारंपरिक खुला पानी (बदलने के इच्छुक)"],
    field3LabelEn: "Farm District / State",
    field3LabelHi: "फार्म का जिला व राज्य",
    field3PlaceholderEn: "e.g. Karnal, Kurukshetra, Sangrur",
    field3PlaceholderHi: "उदा. करनाल, कुरुक्षेत्र, संगरूर",
    notesLabelEn: "Current Crop Rotation Details (Optional)",
    notesLabelHi: "वर्तमान फसल चक्र विवरण (वैकल्पिक)",
    notesPlaceholderEn: "e.g. Currently growing Paddy & Wheat across 30 acres under direct seeded rice...",
    notesPlaceholderHi: "उदा. 30 एकड़ में धान और गेहूं की डीएसआर विधि से खेती कर रहे हैं...",
    showFileUpload: false,
    buttonLabelEn: "Check Carbon Credit Eligibility",
    buttonLabelHi: "कार्बन क्रेडिट पात्रता जांचें",
  },
  wholesale: {
    id: "wholesale",
    badgeEn: "B2B Wholesale · Direct Manufacturer Supply",
    badgeHi: "थोक इनपुट्स · कंपनी से सीधे प्रमाणित सामग्री",
    field1LabelEn: "Buyer Category",
    field1LabelHi: "खरीदार श्रेणी",
    field1OptionsEn: ["Agri Retailer / Dealer", "FPO / Farmer Cooperative", "Commercial Farm Estate", "Institutional Contractor"],
    field1OptionsHi: ["खाद-बीज विक्रेता / डीलर", "FPO / किसान उत्पादक कंपनी", "बड़ा कमर्शियल फार्म", "संस्थागत खरीदार"],
    field2LabelEn: "Primary Products Needed",
    field2LabelHi: "प्रमुख आवश्यक उत्पाद",
    field2OptionsEn: ["Certified Seeds & Hybrid Trays", "Fertilizers & Biocures", "Mulch Film, Drip & Bamboo Staking", "Full Agri-Mall Range"],
    field2OptionsHi: ["प्रमाणित बीज व पौध ट्रे", "खाद, कीटनाशक व बायोक्योर", "मल्चिंग फिल्म, ड्रिप व बांस", "संपूर्ण मॉल उत्पाद रेंज"],
    field3LabelEn: "Store / Delivery Location",
    field3LabelHi: "दुकान / डिलीवरी स्थान",
    field3PlaceholderEn: "e.g. Bilaspur Kalan, Pataudi, Tauru",
    field3PlaceholderHi: "उदा. बिलासपुर कलां, पटौदी, तावड़ू",
    notesLabelEn: "Specific SKUs or Order Volume (Optional)",
    notesLabelHi: "विशिष्ट ब्रांड या ऑर्डर मात्रा (वैकल्पिक)",
    notesPlaceholderEn: "List specific brand names, required quantities, or GST details...",
    notesPlaceholderHi: "विशिष्ट ब्रांड, आवश्यक मात्रा या जीएसटी विवरण लिखें...",
    showFileUpload: false,
    buttonLabelEn: "Request Wholesale Dealer Pricing",
    buttonLabelHi: "थोक डीलर मूल्य सूची प्राप्त करें",
  },
  agripark: {
    id: "agripark",
    badgeEn: "Agri Park Guided Tour · 8 Living Demonstration Zones",
    badgeHi: "एग्री पार्क गाइडेड विजिट · 8 लाइव प्रदर्शन जोन",
    field1LabelEn: "Visitor Profile",
    field1LabelHi: "आगंतुक प्रकार",
    field1OptionsEn: ["Individual Progressive Farmer", "Farmer Delegation / FPO Group", "Agriculture University / Students", "Corporate / Industry Partner"],
    field1OptionsHi: ["प्रगतिशील किसान", "किसान दल / एफपीओ समूह", "कृषि विश्वविद्यालय / छात्र", "कॉर्पोरेट / उद्योग प्रतिनिधि"],
    field2LabelEn: "Group Size",
    field2LabelHi: "सदस्यों की संख्या",
    field2OptionsEn: ["1 – 2 People (Individual Tour)", "3 – 10 People (Farmer Group)", "10 – 30+ People (Bus / Delegation)"],
    field2OptionsHi: ["1 – 2 लोग (व्यक्तिगत दौरा)", "3 – 10 लोग (किसान समूह)", "10 – 30+ लोग (बस / प्रतिनिधिमंडल)"],
    field3LabelEn: "Origin City & State",
    field3LabelHi: "आने का शहर व राज्य",
    field3PlaceholderEn: "e.g. Rohtak, Jhajjar, Rewari",
    field3PlaceholderHi: "उदा. रोहतक, झज्जर, रेवाड़ी",
    notesLabelEn: "Preferred Visit Date & Specific Interests",
    notesLabelHi: "पसंदीदा विजिट तारीख व मुख्य रुचि",
    notesPlaceholderEn: "e.g. Visiting next Saturday morning, interested in nursery tech & drip zones...",
    notesPlaceholderHi: "उदा. अगले शनिवार सुबह आएंगे, नर्सरी तकनीक और ड्रिप डेमो देखना चाहते हैं...",
    showFileUpload: false,
    buttonLabelEn: "Book Agri Park Guided Tour",
    buttonLabelHi: "एग्री पार्क टूर बुक करें",
  },
  general: {
    id: "general",
    badgeEn: "Agronomy Advisory Desk · Direct Guidance & Prescription",
    badgeHi: "कृषि वैज्ञानिक सलाह डेस्क · सीधी जांच व समाधान",
    field1LabelEn: "Primary Crop",
    field1LabelHi: "मुख्य फसल",
    field1OptionsEn: ["Chilli (मिर्च)", "Tomato (टमाटर)", "Watermelon (तरबूज)", "Cucumber (खीरा)", "Wheat & Paddy (गेहूं व धान)", "Other Vegetable / Fruit"],
    field1OptionsHi: ["मिर्च", "टमाटर", "तरबूज", "खीरा", "गेहूं और धान", "अन्य सब्जी / फल"],
    field2LabelEn: "Current Crop Stage",
    field2LabelHi: "फसल की वर्तमान अवस्था",
    field2OptionsEn: ["Planning / Pre-Sowing", "Nursery / Seedling Stage", "Vegetative Growth", "Flowering & Fruit Set", "Harvesting"],
    field2OptionsHi: ["बुवाई पूर्व / योजना", "नर्सरी / पौध अवस्था", "वानस्पतिक बढ़वार", "फूल व फल लगने की अवस्था", "तुड़ाई अवस्था"],
    field3LabelEn: "Farm District / Region",
    field3LabelHi: "खेत का जिला / क्षेत्र",
    field3PlaceholderEn: "e.g. Gurugram, Nuh, Palwal",
    field3PlaceholderHi: "उदा. गुरुग्राम, नूंह, पलवल",
    notesLabelEn: "Describe Symptoms or Agronomy Questions",
    notesLabelHi: "लक्षण, बीमारी या प्रश्न का विवरण",
    notesPlaceholderEn: "Describe leaf curling, yellowing, pest attack, fertigation schedule needs, or soil conditions...",
    notesPlaceholderHi: "पत्ती मुड़ना, पीलापन, कीट प्रकोप, स्प्रे शेड्यूल या मिट्टी संबंधी प्रश्न बताएं...",
    showFileUpload: true,
    fileUploadLabelEn: "Attach crop photo, leaf symptom, or soil test report (optional)",
    fileUploadLabelHi: "फसल रोग का फोटो या मिट्टी जांच रिपोर्ट संलग्न करें (वैकल्पिक)",
    buttonLabelEn: "Get Agronomist Advisory",
    buttonLabelHi: "कृषि वैज्ञानिक से सलाह लें",
  },
  franchise: {
    id: "franchise",
    badgeEn: "Franchise Partnership Desk · Territory Expansion",
    badgeHi: "फ्रेंचाइजी पार्टनरशिप डेस्क · जिला व ब्लॉक विस्तार",
    field1LabelEn: "Franchise Model Interested In",
    field1LabelHi: "इच्छित फ्रेंचाइजी मॉडल",
    field1OptionsEn: ["Agaate Kisan Mall (Retail Store)", "Smart Nursery Distribution Unit", "Integrated Agri Hub (Mall + Nursery)"],
    field1OptionsHi: ["अगाते किसान मॉल (रिटेल केंद्र)", "स्मार्ट नर्सरी डिस्ट्रीब्यूशन यूनिट", "इंटीग्रेटेड एग्री हब (मॉल + नर्सरी)"],
    field2LabelEn: "Investment Capacity",
    field2LabelHi: "निवेश क्षमता",
    field2OptionsEn: ["₹5 Lakh – ₹15 Lakh", "₹15 Lakh – ₹35 Lakh", "₹35 Lakh – ₹75 Lakh+"],
    field2OptionsHi: ["₹5 लाख – ₹15 लाख", "₹15 लाख – ₹35 लाख", "₹35 लाख – ₹75 लाख+"],
    field3LabelEn: "Proposed Franchise District & State",
    field3LabelHi: "प्रस्तावित जिला व राज्य",
    field3PlaceholderEn: "e.g. Rewari (Haryana), Alwar (Rajasthan)",
    field3PlaceholderHi: "उदा. रेवाड़ी (हरियाणा), अलवर (राजस्थान)",
    notesLabelEn: "Available Commercial Space & Business Background",
    notesLabelHi: "उपलब्ध स्थान व व्यावसायिक पृष्ठभूमि",
    notesPlaceholderEn: "Mention if you have a roadside shop (500-1500 sq ft), land, or existing agri business experience...",
    notesPlaceholderHi: "रोड-साइड दुकान (500-1500 वर्ग फीट), जमीन या मौजूदा कृषि व्यापार का अनुभव बताएं...",
    showFileUpload: false,
    buttonLabelEn: "Apply for Franchise Partnership",
    buttonLabelHi: "फ्रेंचाइजी पार्टनरशिप आवेदन भेजें",
  },
};
