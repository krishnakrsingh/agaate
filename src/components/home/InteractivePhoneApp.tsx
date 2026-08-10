import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Battery,
  CheckCircle2,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  PhoneCall,
  RotateCcw,
  Send,
  ShoppingBag,
  Signal,
  Smartphone,
  Sparkles,
  Sprout,
  ShieldCheck,
  FlaskConical,
  Droplets,
  Wifi,
} from "lucide-react";

interface Message {
  id: string;
  sender: "farmer" | "agronomist";
  text: string;
  time: string;
  verified?: boolean;
}

const getFreshWelcomeMessage = (): Message[] => [
  {
    id: "welcome-1",
    sender: "agronomist",
    text: "Namaste! I'm your Agaate Agronomist. Describe your crop issue or tap a question below for quick help!",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    verified: true,
  },
];

const SUGGESTED_PROMPTS = [
  "Yellow spots on tomato leaves?",
  "Best fertigation dose for chilli?",
  "Biocure for root rot?",
  "How to control thrips attack?",
];

const MALL_PRODUCTS = [
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

interface InteractivePhoneAppProps {
  activeTab?: "chat" | "mall" | "farm" | "park";
  onChangeTab?: (tab: "chat" | "mall" | "farm" | "park") => void;
}

export default function InteractivePhoneApp({
  activeTab: propActiveTab,
  onChangeTab,
}: InteractivePhoneAppProps = {}) {
  const [internalActiveTab, setInternalActiveTab] = useState<"chat" | "mall" | "farm" | "park">("chat");

  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab;
  const setActiveTab = (tab: "chat" | "mall" | "farm" | "park") => {
    setInternalActiveTab(tab);
    if (onChangeTab) {
      onChangeTab(tab);
    }
  };

  const [messages, setMessages] = useState<Message[]>(getFreshWelcomeMessage());
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartPulsing, setIsCartPulsing] = useState(false);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  // Internal container ref (only scrolls inside the phone screen, NOT the webpage window!)
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "chat" && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, activeTab, isLoading]);

  useEffect(() => {
    if (isCartPulsing) {
      const timer = setTimeout(() => setIsCartPulsing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isCartPulsing]);

  const handleResetChat = () => {
    setMessages(getFreshWelcomeMessage());
    setInputQuery("");
    setAddedItemToast("Fresh Chat Started!");
    setTimeout(() => setAddedItemToast(null), 2000);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "farmer",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputQuery("");
    setIsLoading(true);

    const aiMsgId = (Date.now() + 1).toString();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Create an empty AI message target for real-time text streaming
    const initialAiMsg: Message = {
      id: aiMsgId,
      sender: "agronomist",
      text: "",
      time: timeStr,
      verified: true,
    };

    setMessages((prev) => [...prev, initialAiMsg]);

    const updateAiText = (newText: string) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: newText } : msg)),
      );
    };

    const animateTextStream = async (fullText: string) => {
      const words = fullText.split(" ");
      let currentText = "";
      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        updateAiText(currentText);
        await new Promise((res) => setTimeout(res, 25));
      }
    };

    try {
      const updatedMessages = [...messages, userMsg];

      // Ultra-clean WhatsApp Agronomist System Prompt
      const AGRONOMIST_SYSTEM_PROMPT = `You are a friendly Indian field agronomist chatting with a farmer on WhatsApp.
- Speak naturally and casually in 1 or 2 short sentences (max 30 words).
- Give immediate, practical advice (e.g. spray name, dose, or simple field check).
- Never sound robotic, textbook-like, or overly formal.`;

      const conversationTurns: { role: "user" | "model"; parts: { text: string }[] }[] = [];

      updatedMessages.forEach((m) => {
        if (m.id === "welcome-1" && m.sender === "agronomist") return;

        const role = m.sender === "farmer" ? "user" : "model";
        const lastTurn = conversationTurns[conversationTurns.length - 1];

        if (lastTurn && lastTurn.role === role) {
          lastTurn.parts[0].text += `\n${m.text}`;
        } else {
          conversationTurns.push({
            role,
            parts: [{ text: m.text }],
          });
        }
      });

      if (conversationTurns.length === 0 || conversationTurns[conversationTurns.length - 1].role !== "user") {
        conversationTurns.push({
          role: "user",
          parts: [{ text: textToSend }],
        });
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"];
      let streamedSuccess = false;
      let accumulatedText = "";

      if (apiKey) {
        for (const model of modelsToTry) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: AGRONOMIST_SYSTEM_PROMPT }],
                  },
                  contents: conversationTurns,
                  generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0.3,
                  },
                }),
              },
            );

            if (!response.ok || !response.body) {
              const errData = await response.json().catch(() => null);
              console.warn(`Gemini API stream (${model}) HTTP ${response.status}:`, errData);
              continue;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
              const { value, done } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith("data:")) {
                  const jsonStr = trimmed.replace(/^data:\s*/, "");
                  if (jsonStr === "[DONE]") continue;
                  try {
                    const parsed = JSON.parse(jsonStr);
                    const chunk = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (chunk) {
                      accumulatedText += chunk;
                      updateAiText(accumulatedText);
                      streamedSuccess = true;
                    }
                  } catch (e) {
                    // Ignore parse errors on partial chunks
                  }
                }
              }
            }

            if (streamedSuccess && accumulatedText.trim()) {
              break;
            }
          } catch (mErr) {
            console.warn(`Model ${model} stream call failed, trying next...`, mErr);
          }
        }
      }

      if (!streamedSuccess || !accumulatedText.trim()) {
        const getFallbackAnswer = (q: string): string => {
          const lower = q.trim().toLowerCase();

          // Greetings
          if (/^(hi|hello|hey|namaste|hallo|good morning|ram ram|pranam)/i.test(lower) || lower === "hi") {
            return "Namaste! How can I help with your crop today?";
          }

          // Identity / Who are you
          if (lower.includes("who are you") || lower.includes("who r u") || lower.includes("agaate")) {
            return "I'm your Agaate Agronomist! Ask me anything about crop diseases, sprays, fertilizers, or soil care.";
          }

          // Thanks
          if (lower.includes("thank") || lower.includes("dhanyawad") || lower.includes("shukriya") || lower === "ok" || lower === "okay") {
            return "You're welcome! Let me know whenever you need field advice. Happy farming!";
          }

          // Tomato / Yellow spots
          if (lower.includes("yellow") || lower.includes("spot") || lower.includes("tomato")) {
            return "Sounds like Early Blight! Spray Copper Oxychloride (2.5g per litre) or Neem oil. Keep leaf surfaces dry.";
          }

          // Fertigation / Dose / Chilli / NPK
          if (lower.includes("fertigation") || lower.includes("chilli") || lower.includes("dose") || lower.includes("npk") || lower.includes("fertiliz")) {
            return "For chilli growth stage, give NPK 19:19:19 (2.5 kg/acre) via drip every 3 days. Switch to 0:52:34 once flowering starts.";
          }

          // Root rot / Fungus / Soil
          if (lower.includes("root rot") || lower.includes("biocure") || lower.includes("fungus") || lower.includes("wilt") || lower.includes("soil")) {
            return "Drench the root zone with Trichoderma Viride (5g per litre of water). It stops root rot naturally without chemical shock.";
          }

          // Thrips / Pests / Leaf curl
          if (lower.includes("thrip") || lower.includes("pest") || lower.includes("curl") || lower.includes("insect")) {
            return "Spray Spinetoram 11.7% SC (1ml/L) in early morning and hang blue sticky traps across your field.";
          }

          // Default natural simple response
          return "What crop are you growing and what symptom do you see? Tell me and I'll give you the exact spray dose!";
        };

        const fallbackText = getFallbackAnswer(textToSend);
        await animateTextStream(fallbackText);
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      const fallbackText =
        "Namaste! Spray Neem oil (5ml/L) and check soil moisture. Our Kisan Sathi agronomist is also available for a field visit.";
      await animateTextStream(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setIsCartPulsing(true);
    setAddedItemToast(`${productName} added!`);
    setTimeout(() => setAddedItemToast(null), 2200);
  };

  return (
    <div className="font-dm relative mx-auto w-full max-w-[270px] sm:max-w-[290px] lg:max-w-[300px]">
      {/* Toast notification */}
      {addedItemToast && (
        <div className="absolute -top-11 inset-x-0 z-50 mx-auto w-max max-w-[90%] rounded-full bg-[#143d31] px-4 py-2 text-xs font-bold text-white shadow-xl border border-white/30 animate-bounce">
          ✓ {addedItemToast}
        </div>
      )}

      {/* Nothing Phone (1) — 20:9 frame, thin uniform bezels, punch-hole */}
      <div className="relative aspect-[9/20] rounded-[2.15rem] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-[5px] shadow-2xl shadow-black/40 ring-1 ring-white/10">
        {/* Side buttons (volume / power) */}
        <div
          className="pointer-events-none absolute -left-[5px] top-[18%] h-10 w-[3px] rounded-l-sm bg-[#2a2a2a]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-[5px] top-[28%] h-14 w-[3px] rounded-l-sm bg-[#2a2a2a]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-[5px] top-[24%] h-16 w-[3px] rounded-r-sm bg-[#2a2a2a]"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.85rem] bg-[#fffdf4] text-[#143d31]">
          {/* Punch-hole camera */}
          <div
            className="pointer-events-none absolute left-1/2 top-2.5 z-30 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#0a0a0a] ring-1 ring-black/40"
            aria-hidden="true"
          />

          {/* Top System Status Bar — Clean Light Theme */}
          <div className="relative shrink-0 border-b border-[#143d31]/6 bg-[#fffdf4] px-4 pb-1.5 pt-3.5 text-[#143d31]">
            <div className="flex items-center justify-between text-[9px] font-bold text-[#143d31]/80">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1.5 text-[#143d31]/80">
                <Signal className="h-2.5 w-2.5" />
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Single Integrated App Header Bar */}
          <div className="bg-[#fffdf4] px-3.5 py-2.5 border-b border-[#143d31]/10 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 shrink-0">
                <img
                  src="/logo11.png"
                  alt="Agaate Agronomist"
                  className="h-8 w-8 rounded-full object-cover shadow-xs border border-[#143d31]/15 p-0.5 bg-[#e7edd9]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#fffdf4]" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#143d31] leading-tight">
                  {activeTab === "chat" && "Agaate AI Agronomist"}
                  {activeTab === "mall" && "Agaate Mall Store"}
                  {activeTab === "farm" && "My Chilli Farm Plot"}
                  {activeTab === "park" && "Agaate Agri Park"}
                </p>
                <div className="flex items-center gap-1 text-[9px] font-semibold text-[#476f2d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online · Advisory Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              {activeTab === "chat" && (
                <button
                  onClick={handleResetChat}
                  className="flex items-center gap-1 rounded-full bg-[#e7edd9] px-2.5 py-1 text-[10px] font-bold text-[#3a6b28] hover:bg-[#d8e3c5] transition-colors"
                  title="Start Fresh Chat"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>New Chat</span>
                </button>
              )}
              {activeTab === "mall" && (
                <motion.div
                  animate={isCartPulsing ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31]/8 text-[#143d31]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#143d31] text-[9px] font-extrabold text-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>
              )}
              <a
                href="tel:9487263498"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31] text-white hover:bg-[#3a6b28] transition-colors"
                title="Call Hotline"
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* TAB 1: AI AGRONOMIST CHAT INTERFACE */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#fffdf4]">
              {/* Chat Messages Container */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3.5 space-y-3">
                <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: msg.sender === "farmer" ? "bottom right" : "bottom left" }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`flex flex-col ${
                      msg.sender === "farmer" ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.sender === "farmer" ? (
                      <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#143d31] px-3.5 py-2.5 text-xs leading-relaxed text-white shadow-xs">
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <p className="mt-1 text-[9px] text-white/50 text-right font-mono">
                          {msg.time}
                        </p>
                      </div>
                    ) : (
                      <div className="max-w-[94%] rounded-2xl bg-white p-3.5 text-xs leading-relaxed text-[#143d31] border border-[#143d31]/12 shadow-sm rounded-bl-xs">
                        {/* Advisory Card Header */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#143d31]/8">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-[#e7edd9] p-0.5 border border-[#143d31]/12 flex items-center justify-center shrink-0">
                              <img
                                src="/logo11.png"
                                alt="Agaate"
                                className="h-full w-full rounded-full object-cover"
                              />
                            </div>
                            <span className="font-extrabold text-[11px] text-[#143d31]">
                              Agaate Agronomist
                            </span>
                          </div>
                          {msg.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#143d31] px-2 py-0.5 text-[8px] font-mono font-bold text-white tracking-wider uppercase shadow-xs">
                              <ShieldCheck className="h-2.5 w-2.5 text-white" />
                              Verified Advisory
                            </span>
                          )}
                        </div>

                        {/* Advisory Content */}
                        <p className="whitespace-pre-line leading-relaxed text-[#143d31]/90 font-medium">
                          {msg.text}
                        </p>

                        {/* Advisory Card Footer */}
                        <div className="mt-2.5 pt-2 border-t border-[#143d31]/6 flex items-center justify-between text-[9px] text-[#536253]">
                          <span className="font-mono text-[#143d31]/40">{msg.time}</span>
                          <a
                            href="tel:9487263498"
                            className="inline-flex items-center gap-1 text-[#476f2d] font-bold hover:underline"
                          >
                            <span>📞 Call Kisan Sathi</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex flex-col items-start"
                  >
                    <div className="max-w-[75%] rounded-2xl rounded-bl-xs bg-white px-3.5 py-2.5 border border-[#143d31]/12 shadow-xs flex items-center gap-2">
                      <div className="flex gap-1 items-center py-1.5 px-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5d7d37] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5d7d37] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5d7d37] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#5d7d37]">Agronomist typing...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="px-3 py-1.5 bg-[#f6f9f0] border-t border-[#143d31]/8 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[9px] font-mono text-[#143d31]/50 uppercase shrink-0">
                  Ask:
                </span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 rounded-full bg-white border border-[#143d31]/12 px-2.5 py-1 text-[10px] font-semibold text-[#143d31] hover:bg-[#a3e635]/20 hover:border-[#5d7d37] transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-2.5 bg-white border-t border-[#143d31]/10 flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask crop advice or symptoms..."
                  className="flex-1 rounded-full bg-[#f4f7ef] px-3.5 py-2 text-xs text-[#143d31] outline-none placeholder:text-[#143d31]/40 focus:ring-1 focus:ring-[#5d7d37]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputQuery.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#143d31] text-white disabled:opacity-40 transition-all hover:scale-105"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KISAAN MALL E-COMMERCE STORE */}
          {activeTab === "mall" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-3.5 bg-[#fffdf4] space-y-3">
              {/* Category Filter Chips — Fixed & Clean */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 shrink-0">
                {["All Inputs", "Seeds 🌾", "Bio-Cures 🧪", "Drip 💧", "Mulch 🛡️"].map((cat, i) => (
                  <span
                    key={cat}
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold transition-all ${
                      i === 0
                        ? "bg-[#143d31] text-white shadow-xs"
                        : "bg-white border border-[#143d31]/12 text-[#143d31]"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Promo Banner Card — Clean & Rounded */}
              <div className="rounded-2xl bg-[#143d31] p-3 text-white flex items-center justify-between shadow-xs shrink-0 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#a3e635] px-2 py-0.5 text-[8px] font-mono font-extrabold text-[#143d31] uppercase">
                    Direct Partner Supply
                  </span>
                  <p className="mt-1 text-xs font-extrabold leading-tight text-white">
                    500+ Genuine Agri Inputs
                  </p>
                  <p className="mt-0.5 text-[9px] text-white/70">
                    Up to 35% off · 24h NCR Farm Delivery
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white shrink-0">
                  <Package className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Product List — 1 Horizontal Rectangular Card Per Row */}
              <div className="space-y-2.5">
                {MALL_PRODUCTS.map((prod, i) => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 rounded-2xl bg-white p-2.5 border border-[#143d31]/12 shadow-xs hover:border-[#5d7d37] transition-all group"
                  >
                    {/* Left: Rectangular Image Box */}
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-[#143d31]/8">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Discount Badge */}
                      <span className="absolute top-1 left-1 rounded-md bg-[#143d31] px-1.5 py-0.5 text-[8px] font-extrabold text-white">
                        {prod.discount}
                      </span>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                      <div>
                        {/* Weight & Rating */}
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="font-mono text-[#536253] font-semibold truncate max-w-[130px]">
                            {prod.quantity}
                          </span>
                          <span className="font-bold text-amber-600 shrink-0">{prod.rating}</span>
                        </div>

                        {/* Title */}
                        <p className="text-xs font-bold text-[#143d31] font-dm leading-snug truncate mt-0.5">
                          {prod.name}
                        </p>

                        {/* Delivery Tag */}
                        <p className="text-[9px] font-semibold text-[#3a6b28] mt-0.5">
                          {prod.deliveryTime}
                        </p>
                      </div>

                      {/* Bottom Row: Price & Swiggy ADD Button */}
                      <div className="flex items-center justify-between border-t border-[#143d31]/8 pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs font-extrabold text-[#143d31]">
                            {prod.price}
                          </span>
                          <span className="text-[9px] text-[#143d31]/40 line-through">
                            {prod.originalPrice}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(prod.name)}
                          className="rounded-lg border-2 border-[#143d31] bg-white px-2.5 py-0.5 text-[10px] font-extrabold text-[#143d31] shadow-2xs hover:bg-[#143d31] hover:text-white transition-all active:scale-95"
                        >
                          ADD +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Footer Bar */}
              <div className="mt-1 p-2 rounded-xl bg-[#f4f7ef] border border-[#143d31]/8 text-[9px] font-medium text-[#476f2d] flex items-center justify-around text-center shrink-0">
                <span>✓ Direct Supply</span>
                <span>•</span>
                <span>✓ QC Verified</span>
                <span>•</span>
                <span>✓ Free Delivery</span>
              </div>
            </div>
          )}

          {/* TAB 3: MY FARM PLOT DASHBOARD */}
          {activeTab === "farm" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-3.5 bg-[#fffdf4] space-y-3">
              {/* Rounded Corner Square Satellite Field Map */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#143d31]/15 shadow-sm group">
                {/* Satellite Background Image */}
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
                  alt="Satellite Farm Map"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Map Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* SVG Field Plot Boundary & GPS Radar Marker */}
                <svg
                  className="absolute inset-0 h-full w-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="20,25 75,18 85,70 30,82"
                    className="fill-[#a3e635]/25 stroke-[#a3e635] stroke-[2.5] stroke-dasharray-2 animate-pulse"
                  />
                </svg>

                {/* Pulsing GPS Radar Node */}
                <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="absolute h-6 w-6 rounded-full bg-[#a3e635]/50 animate-ping" />
                  <span className="h-3 w-3 rounded-full bg-[#a3e635] ring-2 ring-white shadow-md" />
                </div>

                {/* Map Top Floating Badges */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#143d31]/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold text-white shadow-xs">
                    <MapPin className="h-3 w-3 text-white" />
                    <span>Plot A · Karnal, HR</span>
                  </span>
                  <span className="rounded-full bg-[#a3e635] px-2.5 py-1 text-[9px] font-extrabold text-[#143d31] shadow-xs">
                    Stage: Flowering 🌸
                  </span>
                </div>

                {/* Map Bottom Floating Badges */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-md px-2 py-1 text-[9px] font-bold text-[#143d31] shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>NDVI 0.84 · High Health</span>
                  </span>
                  <button className="rounded-lg bg-[#143d31] px-2 py-1 text-[8px] font-extrabold text-white shadow-xs hover:bg-[#3a6b28] transition-colors">
                    🌐 Live Scan
                  </button>
                </div>
              </div>

              {/* Specs & Telemetry Grid Below Map */}
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5d7d37] mb-2">
                  Live Field Telemetry Specs
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-white p-3 border border-[#143d31]/10 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#536253]">
                      <span>Soil Moisture</span>
                      <span className="text-emerald-600 font-bold">💧 42%</span>
                    </div>
                    <p className="mt-1 text-xs font-extrabold text-[#143d31]">Optimal Level</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[42%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-3 border border-[#143d31]/10 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#536253]">
                      <span>Pest Risk</span>
                      <span className="text-amber-600 font-bold">🛡️ Low</span>
                    </div>
                    <p className="mt-1 text-xs font-extrabold text-[#143d31]">Thrips Safe</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[25%] rounded-full bg-amber-500" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-3 border border-[#143d31]/10 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#536253]">
                      <span>Root Temp</span>
                      <span className="text-[#3a6b28] font-bold">🌡️ 26.4°C</span>
                    </div>
                    <p className="mt-1 text-xs font-extrabold text-[#143d31]">Ideal Range</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[65%] rounded-full bg-[#3a6b28]" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-3 border border-[#143d31]/10 shadow-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#536253]">
                      <span>Drip Cycle</span>
                      <span className="text-[#143d31] font-bold">⚡ Active</span>
                    </div>
                    <p className="mt-1 text-xs font-extrabold text-[#143d31]">NPK 19:19:19</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[80%] rounded-full bg-[#143d31]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Advisory Action Plan */}
              <div className="rounded-2xl bg-white p-3.5 border border-[#143d31]/10 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-[#143d31]">
                    Flowering Advisory Action Plan
                  </p>
                  <span className="text-[9px] font-mono text-[#476f2d] font-bold">
                    2 Tasks Active
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs pt-1 border-t border-[#143d31]/8">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#476f2d] mt-0.5" />
                  <p className="text-[#536253] leading-tight">
                    Apply NPK 19:19:19 fertigation (2.5 kg/acre) this Thursday through drip.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 text-xs pt-2 border-t border-[#143d31]/6">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#476f2d] mt-0.5" />
                  <p className="text-[#536253] leading-tight">
                    Inspect underside of leaves for yellow thrips nymph activity & set yellow sticky
                    traps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGRI PARK VISIT BOOKING */}
          {activeTab === "park" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-3.5 bg-[#fffdf4] space-y-3">
              <div className="rounded-xl bg-[#143d31] p-3 text-white">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white">
                  Gurugram 17-Acre Farm
                </span>
                <p className="mt-2 text-sm font-extrabold">Walk the Living Agri Park</p>
                <p className="mt-1 text-[11px] text-white/70">
                  Live Bio-Boosted Nursery, drip trials, drone spraying & partner demo plots.
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 border border-[#143d31]/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#143d31]">Next Open Farmer Tour:</span>
                  <span className="font-mono text-[#5d7d37] font-bold">This Saturday</span>
                </div>
                <p className="text-[11px] text-[#536253]">
                  Free entry for registered Agaate Parivaar farmers.
                </p>
                <button
                  onClick={() => {
                    setAddedItemToast("Agri Park Tour Reserved!");
                    setTimeout(() => setAddedItemToast(null), 2200);
                  }}
                  className="w-full rounded-lg bg-[#143d31] py-2 text-xs font-bold text-white hover:bg-[#3a6b28] transition-colors"
                >
                  Reserve Visitor Slot
                </button>
              </div>
            </div>
          )}

          {/* FLUSH INTEGRATED BOTTOM OS NAVIGATION BAR */}
          <div className="flex shrink-0 items-center justify-around border-t border-[#143d31]/10 bg-[#143d31] px-3 py-2.5 text-white">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeTab === "chat"
                  ? "bg-[#a3e635] text-[#143d31] font-extrabold shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="text-[10px]">Advisory</span>
            </button>

            <button
              onClick={() => setActiveTab("mall")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeTab === "mall"
                  ? "bg-[#a3e635] text-[#143d31] font-extrabold shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="text-[10px]">Mall</span>
            </button>

            <button
              onClick={() => setActiveTab("farm")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeTab === "farm"
                  ? "bg-[#a3e635] text-[#143d31] font-extrabold shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              <Sprout className="h-3.5 w-3.5" />
              <span className="text-[10px]">Farm</span>
            </button>

            <button
              onClick={() => setActiveTab("park")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeTab === "park"
                  ? "bg-[#a3e635] text-[#143d31] font-extrabold shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-[10px]">Park</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
