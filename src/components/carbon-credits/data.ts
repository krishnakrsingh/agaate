import {
  Bank,
  ClipboardText,
  Coins,
  DeviceMobile,
  Drop,
  Leaf,
  Money,
  Plant,
  Recycle,
  SealCheck,
  ShieldCheck,
  Stack,
  Target,
  Wallet
} from "@phosphor-icons/react";

export const RATE = 1200; // ₹ per tCO2e credit

export const creditFacts = [
  {
    icon: Coins,
    title: "1 tonne = 1 verified credit",
    text: "Every tonne of CO₂ you reduce or store earns exactly one verified carbon credit.",
  },
  {
    icon: Bank,
    title: "Bought by corporations",
    text: "Credits are purchased by corporations and institutions offsetting their emissions.",
  },
  {
    icon: Wallet,
    title: "On top of crop sales",
    text: "An additional, regular income stream on top of your standard crop sales.",
  },
  {
    icon: ShieldCheck,
    title: "Rewards your practices",
    text: "Directly rewards the climate-friendly farming practices you already perform.",
  },
];

export const qualifyingPractices = [
  {
    icon: Stack,
    name: "Reduced & Zero Tillage",
    benefit: "Keeps carbon locked directly in the soil structure.",
    tag: "TILLAGE",
  },
  {
    icon: Drop,
    name: "Efficient Drip Irrigation",
    benefit: "Conserves water and reduces pumping energy usage.",
    tag: "WATER",
  },
  {
    icon: Leaf,
    name: "Organic & Bio-Inputs",
    benefit: "Significantly cuts chemical nitrogen greenhouse emissions.",
    tag: "INPUTS",
  },
  {
    icon: Recycle,
    name: "No Residue Burning",
    benefit: "Crop residue is returned cleanly to fertilize the field.",
    tag: "RESIDUE",
  },
  {
    icon: Plant,
    name: "Cover Cropping",
    benefit: "Builds long-term organic soil carbon and prevents erosion.",
    tag: "SOIL",
  },
  {
    icon: Target,
    name: "Better Input Efficiency",
    benefit: "Lowers input costs while reducing the overall carbon footprint.",
    tag: "EFFICIENCY",
  },
];

export const mrvSteps = [
  {
    icon: ClipboardText,
    step: "01",
    title: "Simple farm enrolment & registration",
    text: "Register your farm with Agaate's field team in a few simple steps.",
  },
  {
    icon: DeviceMobile,
    step: "02",
    title: "Practice tracking",
    text: "Practices are tracked via the mobile app and periodic field visits.",
  },
  {
    icon: SealCheck,
    step: "03",
    title: "End-to-End MRV handled for you",
    text: "Measure, Report, Verify — the complete MRV cycle is managed entirely by Agaate.",
  },
  {
    icon: Money,
    step: "04",
    title: "Transparent direct payouts",
    text: "Direct payouts to your bank account on every verified credit.",
  },
];

export const marqueeItems = [
  "1 TONNE = 1 CREDIT",
  "REDUCED & ZERO TILLAGE",
  "EFFICIENT DRIP IRRIGATION",
  "ORGANIC & BIO-INPUTS",
  "NO RESIDUE BURNING",
  "COVER CROPPING",
  "BETTER INPUT EFFICIENCY",
  "VERIFIED PAYOUTS",
];
