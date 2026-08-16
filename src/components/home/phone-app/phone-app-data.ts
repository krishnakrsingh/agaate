export interface Message {
  id: string;
  sender: "farmer" | "agronomist";
  text: string;
  time: string;
  verified?: boolean;
}

export const getFreshWelcomeMessage = (): Message[] => [
  {
    id: "welcome-1",
    sender: "agronomist",
    text: "Namaste! I'm your Agaate Agronomist. Describe your crop issue or tap a question below for quick help!",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    verified: true,
  },
];

export const SUGGESTED_PROMPTS = [
  "Yellow spots on tomato leaves?",
  "Best fertigation dose for chilli?",
  "Biocure for root rot?",
  "How to control thrips attack?",
];

/** Free AI turns before WhatsApp handoff */
export const FREE_CHAT_LIMIT = 1;

export const WHATSAPP_AGRONOMIST_URL =
  "https://wa.me/918350085005?text=Hello%20Agaate%20Team%2C%20I%20chatted%20on%20the%20app%20and%20want%20to%20continue%20with%20a%20real%20agronomist%20for%20my%20crop.";

export const MALL_PRODUCTS = [
  {
    id: "1",
    name: "Agaate Bio-Boosted Chilli Seeds",
    quantity: "100g Pack · 98% Germination",
    price: "₹450",
    originalPrice: "₹600",
    discount: "25% OFF",
    rating: "4.9 ★ (128)",
    badge: "Certified",
    deliveryTime: "⚡ 24h Delivery",
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Trichoderma Viride Bio-Cure",
    quantity: "1 L Bottle · Organic Soil Care",
    price: "₹380",
    originalPrice: "₹500",
    discount: "24% OFF",
    rating: "4.8 ★ (94)",
    badge: "100% Organic",
    deliveryTime: "⚡ 24h Delivery",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Drip Fertigation Venturi Set",
    quantity: "1 Heavy-Duty Injector Kit",
    price: "₹1,250",
    originalPrice: "₹1,600",
    discount: "22% OFF",
    rating: "4.9 ★ (215)",
    badge: "Best Seller",
    deliveryTime: "⚡ Same Day",
    image:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: "Silver-Black UV Mulch Film",
    quantity: "300m Roll · 25 Micron",
    price: "₹1,890",
    originalPrice: "₹2,300",
    discount: "18% OFF",
    rating: "4.7 ★ (82)",
    badge: "300m Roll",
    deliveryTime: "⚡ Same Day",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
  },
];
