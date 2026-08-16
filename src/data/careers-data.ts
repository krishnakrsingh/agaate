import { JobPosition } from "@/types";

export interface ExtendedJobPosition extends JobPosition {
  responsibilities?: string[];
  departmentCategory: "Agronomy" | "Corporate" | "Retail";
  highlights?: string[];
  experienceLevel?: string;
}

export const jobs: ExtendedJobPosition[] = [
  {
    id: "job-agronomy-01",
    title: "Executive – Agronomy",
    dept: "Agronomy",
    departmentCategory: "Agronomy",
    loc: "Gurugram / Field",
    type: "Full-Time",
    desc: "Own field advisory for vegetable crop clusters — guiding growers on stage-wise crop care, digital farm tools, NPK/soil testing, and technical content.",
    experienceLevel: "0 - 3 Years (Fresh Graduates Welcome)",
    highlights: ["Campus Drive Lead Role", "Direct Grower Engagement", "Digital Advisory"],
    reqs: [
      "B.Sc. or M.Sc. in Agriculture / Agronomy (fresh graduates from CSAUAT Kanpur & top institutes encouraged).",
      "Strong field advisory skills across vegetable crop cycles (Solanaceae, Cucurbitaceae).",
      "Working knowledge of digital farm tools, IoT moisture sensors, and field data collection.",
      "Ability to collaborate on bilingual technical content, farmer manuals, and advisory videos.",
      "Fluency in Hindi and local regional dialects.",
    ],
    responsibilities: [
      "Provide stage-wise crop guidance, basal dose planning, and fertigation schedules to Parivaar farmers.",
      "Diagnose early disease symptoms in the field using image-based AI tools and lab core assays.",
      "Conduct grower training workshops at the 17-acre Smart Nursery and Kisan Mall demonstration zones.",
      "Co-create technical content, agronomy scripts, and localized advisory bulletins.",
    ],
  },
  {
    id: "job-infra-02",
    title: "Farm Infrastructure Supervisor",
    dept: "Crop Operations",
    departmentCategory: "Corporate",
    loc: "Gurugram (Kukrola Smart Nursery)",
    type: "Full-Time",
    desc: "Supervise daily operations at the 17-acre climate-controlled Smart Nursery, managing drip irrigation setups, shade-nets, and seedling germination protocols.",
    experienceLevel: "2 - 5 Years",
    highlights: ["17-Acre Facility Management", "Precision Irrigation", "Seedling Quality Control"],
    reqs: [
      "Diploma or Degree in Agricultural Engineering, Agronomy, or Farm Infrastructure Management.",
      "2+ years experience managing controlled-environment agriculture or commercial nursery setups.",
      "Hands-on expertise in drip irrigation layout, automated fertigation pumps, and shade-net installation.",
      "Strong team management capabilities overseeing farm labor SOPs and safety protocols.",
    ],
    responsibilities: [
      "Monitor AI climate control chambers, maintaining optimal humidity and temperature for seedless germination.",
      "Supervise daily fertigation dosing schedules and bio-inoculation treatments.",
      "Manage turnkey drip irrigation and mulching installations for commercial B2B farm clients.",
      "Enforce 95%+ seedling survival benchmarks prior to distribution.",
    ],
  },
  {
    id: "job-retail-03",
    title: "Kisan Mall Retail Manager",
    dept: "Retail & Commerce",
    departmentCategory: "Retail",
    loc: "Bilaspur (Gurugram)",
    type: "Full-Time",
    desc: "Lead store operations, inventory management, e-commerce fulfillment, and manufacturer partner relations at the Agaate Kisan Mall experience center.",
    experienceLevel: "3 - 6 Years",
    highlights: ["500+ SKU Portfolio", "Direct Supply Partnerships", "Rural E-Commerce"],
    reqs: [
      "Bachelor's degree in Business, Agribusiness, or Supply Chain Management.",
      "3+ years experience in retail store management, agri-input distribution, or rural e-commerce.",
      "Familiarity with seed, biocure, fertilizer, and hardware SKUs from leading agri manufacturers.",
      "Excellent interpersonal skills for building trust with local farming communities and regional dealers.",
    ],
    responsibilities: [
      "Manage daily retail counter sales, inventory stocking, and digital POS checkout operations.",
      "Coordinate with 25+ direct manufacturer partners for timely inventory replenishment.",
      "Guide visiting farmers through interactive technology demonstration zones and input selections.",
      "Fulfill digital orders received through the Agaate e-commerce mobile platform.",
    ],
  },
  {
    id: "job-tech-04",
    title: "Agri-Data & Remote Sensing Specialist",
    dept: "Farm Technology",
    departmentCategory: "Corporate",
    loc: "Gurugram HQ",
    type: "Full-Time",
    desc: "Engineers IoT telemetry pipelines, Sentinel-2 satellite NDVI canopy analysis, drone scouting analytics, and predictive smart crop cycle models.",
    experienceLevel: "2 - 4 Years",
    highlights: ["Sentinel-2 Radar Scouting", "IoT Sensor Pipelines", "Predictive Yield Models"],
    reqs: [
      "B.Tech / M.Tech / M.Sc in Geoinformatics, Remote Sensing, Agri-Tech, or Data Science.",
      "Proven experience processing Sentinel-2 / Landsat satellite imagery and multispectral drone data.",
      "Proficiency in Python, QGIS/ArcGIS, spatial database queries, and machine learning models.",
      "Knowledge of crop phenology and environmental sensor telemetry parameters.",
    ],
    responsibilities: [
      "Build automated satellite canopy health monitoring pipelines for 15,000+ associated acres.",
      "Analyze IoT soil sensor data to generate targeted precision fertigation and pest alerts.",
      "Develop predictive yield algorithms to optimize the Agaate buyback market linkage engine.",
      "Collaborate with field agronomists to ground-truth drone scouting imagery.",
    ],
  },
  {
    id: "job-agronomy-05",
    title: "Field Agronomist (Solanaceae Specialist)",
    dept: "Agronomy",
    departmentCategory: "Agronomy",
    loc: "Jhajjar / Gurugram Field Sector",
    type: "Full-Time",
    desc: "Work directly in field sectors calibrating input schedules and diagnosing early pathological symptoms on tomato, chilli, and brinjal crops.",
    experienceLevel: "1 - 4 Years",
    highlights: ["Pathology Expertise", "Field Advisory", "Yield Optimization"],
    reqs: [
      "B.Sc. or M.Sc. in Agriculture / Plant Pathology.",
      "Deep understanding of Solanaceae disease cycles (Early Blight, Phytophthora, Bacterial Wilt).",
      "Fluency in Hindi and local Haryanvi dialects.",
    ],
    responsibilities: [
      "Conduct weekly field inspections across assigned grower clusters.",
      "Issue preventive spray regimens based on micro-climate weather forecasts.",
      "Collect lab soil core samples and monitor plant vigor parameters.",
    ],
  },
  {
    id: "job-tech-06",
    title: "Embedded IoT Hardware Engineer",
    dept: "Farm Technology",
    departmentCategory: "Corporate",
    loc: "Gurugram Lab",
    type: "Full-Time",
    desc: "Design and program LoRa-based telemetry node boards, calibrating moisture and optical NPK spectrometer sensors for low-power solar deployment.",
    experienceLevel: "2 - 5 Years",
    highlights: ["Hardware R&D", "LoRaWAN Mesh", "Solar Micro-Systems"],
    reqs: [
      "2+ years experience in PCB layout design and firmware development (C/C++).",
      "Experience with LoRaWAN, mesh networking, and sleep-cycle power optimization.",
      "Familiarity with environmental IP67 packaging standard specifications.",
    ],
    responsibilities: [
      "Design ruggedized PCB sensor nodes deployed in open-field crop plots.",
      "Program micro-controllers for ultra-low power telemetry broadcasts.",
      "Test optical soil nutrient sensors in real farm environments.",
    ],
  },
];
