export const PRICING = [
  {
    crop: "Tomato (A-Grade)",
    local: "₹18 / kg",
    buyback: "₹23 / kg",
    premium: "+27%",
    buyer: "BigBasket Hubs",
    bar: 27,
  },
  {
    crop: "Chilli (Tejaswini)",
    local: "₹42 / kg",
    buyback: "₹50 / kg",
    premium: "+19%",
    buyer: "Spices Processors",
    bar: 19,
  },
  {
    crop: "Capsicum (Green)",
    local: "₹30 / kg",
    buyback: "₹38 / kg",
    premium: "+26%",
    buyer: "Reliance Retail",
    bar: 26,
  },
];

export const BUYER_NETWORKS = [
  { name: "BigBasket", tags: "Supermarkets" },
  { name: "Reliance Retail", tags: "Hypermarkets" },
  { name: "Zomato Hyperpure", tags: "Kitchen Supply" },
  { name: "Handpick", tags: "Direct Tie-up" },
];

export const SCALE_STATS = [
  { to: 2000, suffix: "+", label: "Agaate Parivaar farmers" },
  { to: 15000, suffix: "+", label: "Acres under association" },
  { to: 25, suffix: "+", label: "Direct buyer & market partners" },
  { to: 24, prefix: "+", suffix: "%", label: "Avg premium above mandi" },
];

export const FLOW_NODES = [
  {
    label: "Farmer",
    sub: "Quality produce · market-ready standards",
    desc: "Timely harvest best practices, graded at the farm gate.",
  },
  {
    label: "Agaate",
    sub: "Buyback ecosystem",
    desc: "Purchases output directly, guaranteeing ROI and securing the supply chain.",
  },
  {
    label: "Buyer",
    sub: "Handpick tie-ups · direct integration",
    desc: "Supermarket and processor networks, no unnecessary middlemen.",
  },
];
