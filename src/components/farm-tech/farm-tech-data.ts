import {
  Brain,
  CellTower,
  DeviceMobile,
  Drone,
  Drop,
  type Icon,
  Layout,
  Leaf,
  Plant,
  Scan,
  ShieldCheck,
} from "@phosphor-icons/react";

export const TICKER = [
  "Live Telemetry Stream: Soil Moisture 38%",
  "EC 1.82 mS/cm",
  "Soil Temp 28.4°C",
  "NDVI Index 0.74",
  "Node Battery 92%",
  "LoRa Mesh Signal -42 dBm",
  "17-Acre Nursery Telemetry Active",
  "Drone Fleet Standby",
  "Automated Fertigation Valve Loop Ready",
];

export interface TechModule {
  id: string;
  icon: Icon;
  tag: string;
  name: string;
  subtitle: string;
  text: string;
  points: string[];
}

export const MODULES: TechModule[] = [
  {
    id: "sensors",
    icon: CellTower,
    tag: "Sensors",
    name: "IoT Soil & Weather Sensors",
    subtitle: "Continuous subterranean telemetry & atmospheric micro-climate tracking",
    text: "Live moisture, temperature & nutrient data with real-time field-level weather tracking using LoRa mesh nodes.",
    points: [
      "Subsoil Moisture, EC & temperature probes",
      "Field-level micro-weather & wind stations",
      "LoRa mesh array, 3km range, zero cellular dependency",
    ],
  },
  {
    id: "drones",
    icon: Drone,
    tag: "Drones",
    name: "Drone Scouting & Spraying",
    subtitle: "Multispectral aerial imaging & calibrated micro-droplet application",
    text: "Aerial crop scouting from above with targeted, ultra-uniform precision spraying across stress zones.",
    points: [
      "NDVI aerial crop scouting & canopy index",
      "Targeted precision spray passes",
      "Ultra-uniform coverage, zero chemical waste",
    ],
  },
  {
    id: "ai",
    icon: Scan,
    tag: "AI Detection",
    name: "AI Crop Health Photo Detection",
    subtitle: "Computer-vision leaf disease diagnostic neural models",
    text: "Spot disease & pests early from a smartphone photo — get instant, crop-specific advice and precise dosages.",
    points: [
      "Smartphone photo issue detection in seconds",
      "Crop-specific protection protocols",
      "Early action before disease spreads",
    ],
  },
  {
    id: "drip",
    icon: Drop,
    tag: "Fertigation",
    name: "Automated Drip & Fertigation",
    subtitle: "Stage-wise hydraulic nutrient dosing & automated valve schedules",
    text: "Water & nutrients applied strictly on schedule — right dose, right stage, every time with zero leaching.",
    points: [
      "Schedule-driven automated irrigation",
      "Soil report-backed stage-wise nutrition",
      "Prevents root asphyxiation & under-dosing",
    ],
  },
  {
    id: "app",
    icon: Layout,
    tag: "Mobile App",
    name: "Farm Management Mobile App",
    subtitle: "Centralized operational command center in your pocket",
    text: "All plots, growth stages & inputs tracked in one centralized app — alerts, logs & planning tools.",
    points: [
      "Plots & growth stages mapped in one view",
      "Automated WhatsApp alerts & activity logs",
      "Phased financial & ROI planning tools",
    ],
  },
  {
    id: "advisory",
    icon: Brain,
    tag: "Advisory",
    name: "Data-Driven Advisory",
    subtitle: "Agronomic recommendations generated directly from live field telemetry",
    text: "Custom agronomic recommendations generated directly from your farm's live data for higher yields.",
    points: [
      "Tailored recommendations from live telemetry",
      "Export-grade produce quality consistency",
      "Lower risk, higher profit margins",
    ],
  },
];

export interface AiDiagnosisSample {
  id: string;
  crop: string;
  disease: string;
  photoName: string;
  photoUrl: string;
  severity: string;
  confidence: number;
  symptoms: string;
  rootCause: string;
  recommendation: {
    primaryProduct: string;
    primaryDose: string;
    secondaryProduct: string;
    secondaryDose: string;
    culturalAdvice: string;
  };
}

export const AI_DIAGNOSES: AiDiagnosisSample[] = [
  {
    id: "downy",
    crop: "Watermelon",
    disease: "Downy Mildew (Pseudoperonospora cubensis)",
    photoName: "Watermelon Leaf Sample #W-402",
    photoUrl:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=600&auto=format&fit=crop",
    severity: "High Risk",
    confidence: 98.6,
    symptoms: "Angular chlorotic leaf lesions with purplish-gray sporulation on leaf underside.",
    rootCause: "High leaf wetness duration combined with night humidity spikes above 88%.",
    recommendation: {
      primaryProduct: "Biocure F (Trichoderma Viride)",
      primaryDose: "2.5 kg / acre foliar spray in 200L water",
      secondaryProduct: "Plantex Botanical Leaf Extract",
      secondaryDose: "1.0 L / acre spray after 48 hours",
      culturalAdvice:
        "Suspend evening overhead sprinkler passes; maintain central line 1 ft drip aeration.",
    },
  },
  {
    id: "curl",
    crop: "Chili",
    disease: "Chili Leaf Curl Virus (ChiLCV)",
    photoName: "Chili Shoot Sample #C-108",
    photoUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop",
    severity: "Critical Alert",
    confidence: 96.4,
    symptoms:
      "Upward curling of leaves, puckering, vein clearing, and stunted plant canopy growth.",
    rootCause: "Bemisia tabaci (Whitefly) vector population feeding on young tender flush.",
    recommendation: {
      primaryProduct: "Bio Nimaton (Neem 10,000 PPM)",
      primaryDose: "1.5 L / acre foliar spray in early evening",
      secondaryProduct: "Stanes Symbion Vam Plus",
      secondaryDose: "4.0 kg / acre drench to rebuild vascular root uptake",
      culturalAdvice:
        "Install yellow sticky traps (25 per acre); rogue out severely stunted plants.",
    },
  },
  {
    id: "nitrogen",
    crop: "Tomato",
    disease: "Nitrogen & Iron Chlorosis Deficiency",
    photoName: "Tomato Canopy Sample #T-309",
    photoUrl:
      "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?q=80&w=600&auto=format&fit=crop",
    severity: "Nutrient Deficit",
    confidence: 99.1,
    symptoms:
      "General yellowing of older lower leaves progressing to pale green upper canopy growth.",
    rootCause: "Low soil EC (1.1 mS/cm) and rapid nitrogen leaching following heavy drip flush.",
    recommendation: {
      primaryProduct: "Biovita Seaweed Extract Booster",
      primaryDose: "500 ml / acre foliar application",
      secondaryProduct: "Soluble Organic NPK fertigation dose",
      secondaryDose: "5.0 kg / acre via drip line loop",
      culturalAdvice: "Adjust fertigation loop frequency from 45 mins to 20 mins split intervals.",
    },
  },
  {
    id: "blight",
    crop: "Cucumber / Solanaceous",
    disease: "Early Blight (Alternaria solani)",
    photoName: "Cucumber Leaf Sample #K-201",
    photoUrl:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=600&auto=format&fit=crop",
    severity: "Moderate Alert",
    confidence: 97.4,
    symptoms: "Concentric ring target spots on foliage surrounded by narrow yellow halos.",
    rootCause: "Soil splash vector inoculation following surface mud splashing on lower leaves.",
    recommendation: {
      primaryProduct: "Biocure F + Biocure B Dual Mix",
      primaryDose: "2.0 kg Biocure F + 1.5 kg Biocure B per acre",
      secondaryProduct: "Silver-Black Mulching Film (25 Micron)",
      secondaryDose: "Cover soil beds to block fungal spore soil splash",
      culturalAdvice: "Prune lower 10 cm foliage touching soil layer; apply mulching film.",
    },
  },
];

export const CYCLE = [
  {
    icon: Plant,
    label: "Data-Driven Sowing",
    detail: "Calibrated seed rate & soil moisture testing",
  },
  { icon: Leaf, label: "Bio-Boosted Nursery", detail: "Root-fungus pre-inoculated seedling plugs" },
  { icon: Drop, label: "Stage-Wise Fertigation", detail: "Soil-report matched NPK & micro-dosing" },
  { icon: ShieldCheck, label: "Preventive Care", detail: "Weather-based bio-input spray alerts" },
  { icon: Plant, label: "Timely Harvest", detail: "Peak Brix sweetness & market linkage" },
];

export const STATS = [
  {
    to: 17,
    suffix: " Acres",
    label: "Controlled smart nursery infrastructure at Kukrola, Gurugram",
  },
  { to: 1000, suffix: "+", label: "Registered farmers accessing live field telemetry & advisory" },
  { to: 5, suffix: " Days", label: "Earlier catch — flagging stress before visual wilting occurs" },
  { to: 24, suffix: "/7", label: "Real-time field visibility & automated alert protection" },
];

export const NODES_LIST = [
  {
    label: "Node-04 (West Block)",
    status: "Active",
    battery: "92%",
    ec: 1.82,
    temp: 28.4,
    ndvi: 0.74,
  },
  {
    label: "Node-07 (North Nursery)",
    status: "Active",
    battery: "85%",
    ec: 1.65,
    temp: 26.1,
    ndvi: 0.81,
  },
  {
    label: "Node-02 (East Polyhouse)",
    status: "Standby",
    battery: "98%",
    ec: 2.1,
    temp: 31.2,
    ndvi: 0.69,
  },
  {
    label: "Node-09 (South Field)",
    status: "Active",
    battery: "78%",
    ec: 1.58,
    temp: 27.7,
    ndvi: 0.76,
  },
];
