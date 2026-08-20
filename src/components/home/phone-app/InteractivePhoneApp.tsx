import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowCounterClockwise, PhoneCall, ShoppingBag } from "@phosphor-icons/react";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { PhoneNavDock } from "./PhoneNavDock";
import { PhoneChatView } from "./views/PhoneChatView";
import { PhoneStoreView } from "./views/PhoneStoreView";
import { PhoneActionView } from "./views/PhoneActionView";
import { PhoneParkView } from "./views/PhoneParkView";
import type { Message } from "./phone-app-data";
import { FREE_CHAT_LIMIT, getFreshWelcomeMessage } from "./phone-app-data";

export interface InteractivePhoneAppProps {
  activeTab?: "chat" | "mall" | "farm" | "park";
  onChangeTab?: (tab: "chat" | "mall" | "farm" | "park") => void;
}

export function InteractivePhoneApp({
  activeTab: propActiveTab,
  onChangeTab,
}: InteractivePhoneAppProps = {}) {
  const [internalActiveTab, setInternalActiveTab] = useState<"chat" | "mall" | "farm" | "park">(
    "chat",
  );

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
  const [chatLocked, setChatLocked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartPulsing, setIsCartPulsing] = useState(false);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  const farmerChatCount = messages.filter((m) => m.sender === "farmer").length;

  useEffect(() => {
    if (isCartPulsing) {
      const timer = setTimeout(() => setIsCartPulsing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isCartPulsing]);

  const handleResetChat = () => {
    setMessages(getFreshWelcomeMessage());
    setInputQuery("");
    setChatLocked(false);
    setIsLoading(false);
    setAddedItemToast("Fresh Chat Started!");
    setTimeout(() => setAddedItemToast(null), 2000);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || isLoading || chatLocked) return;

    const nextFarmerCount = farmerChatCount + 1;
    const willLockAfterReply = nextFarmerCount >= FREE_CHAT_LIMIT;

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

    const getFallbackAnswer = (q: string): string => {
      const lower = q.trim().toLowerCase();

      if (
        /^(hi|hello|hey|namaste|hallo|good morning|ram ram|pranam)/i.test(lower) ||
        lower === "hi"
      ) {
        return "Namaste! How can I help with your crop today?";
      }
      if (lower.includes("who are you") || lower.includes("who r u") || lower.includes("agaate")) {
        return "I'm your Agaate Agronomist! Ask me anything about crop diseases, sprays, fertilizers, or soil care.";
      }
      if (
        lower.includes("thank") ||
        lower.includes("dhanyawad") ||
        lower.includes("shukriya") ||
        lower === "ok" ||
        lower === "okay"
      ) {
        return "You're welcome! Let me know whenever you need field advice. Happy farming!";
      }
      if (lower.includes("yellow") || lower.includes("spot") || lower.includes("tomato")) {
        return "Sounds like Early Blight! Spray Copper Oxychloride (2.5g per litre) or Neem oil. Keep leaf surfaces dry.";
      }
      if (
        lower.includes("fertigation") ||
        lower.includes("chilli") ||
        lower.includes("dose") ||
        lower.includes("npk") ||
        lower.includes("fertiliz")
      ) {
        return "For chilli growth stage, give NPK 19:19:19 (2.5 kg/acre) via drip every 3 days. Switch to 0:52:34 once flowering starts.";
      }
      if (
        lower.includes("root rot") ||
        lower.includes("biocure") ||
        lower.includes("fungus") ||
        lower.includes("wilt") ||
        lower.includes("soil")
      ) {
        return "Drench the root zone with Trichoderma Viride (5g per litre of water). It stops root rot naturally without chemical shock.";
      }
      if (
        lower.includes("thrip") ||
        lower.includes("pest") ||
        lower.includes("curl") ||
        lower.includes("insect")
      ) {
        return "Spray Spinetoram 11.7% SC (1ml/L) in early morning and hang blue sticky traps across your field.";
      }

      return "What crop are you growing and what symptom do you see? Tell me and I'll give you the exact spray dose!";
    };

    try {
      const fallbackText = getFallbackAnswer(textToSend);
      await animateTextStream(fallbackText);
    } catch (err) {
      console.error("Agronomist bot error:", err);
      const fallbackText =
        "Namaste! Spray Neem oil (5ml/L) and check soil moisture. Our Kisan Sathi agronomist is also available for a field visit.";
      await animateTextStream(fallbackText);
    } finally {
      setIsLoading(false);
      if (willLockAfterReply) {
        setChatLocked(true);
      }
    }
  };

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setIsCartPulsing(true);
    setAddedItemToast(`${productName} added!`);
    setTimeout(() => setAddedItemToast(null), 2200);
  };

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px] overflow-visible font-sans">
      {/* Toast notification */}
      {addedItemToast && (
        <div className="animate-bounce absolute -top-10 inset-x-0 z-50 mx-auto w-max max-w-[90%] rounded-full border border-white/30 bg-[#143d31] px-4 py-1.5 text-xs font-bold text-white shadow-xl">
          ✓ {addedItemToast}
        </div>
      )}

      {/* Flagship Phone Frame */}
      <div className="relative aspect-[9/17.5] max-h-[600px] overflow-hidden rounded-[2.4rem] border-[4px] border-[#181d19] bg-[#181d19] p-[3px] shadow-[0_25px_60px_-15px_rgba(13,40,32,0.25)] ring-1 ring-black/20">
        {/* Side physical buttons */}
        <div
          className="pointer-events-none absolute left-0 top-[18%] z-20 h-9 w-[2px] rounded-r-xs bg-[#2e3630]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-0 top-[27%] z-20 h-13 w-[2px] rounded-r-xs bg-[#2e3630]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-[23%] z-20 h-15 w-[2px] rounded-l-xs bg-[#2e3630]"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.15rem] bg-[#fffdf4] text-[#143d31]">
          {/* Punch-hole camera */}
          <div
            className="pointer-events-none absolute left-1/2 top-2.5 z-30 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#0a0a0a] ring-1 ring-black/50"
            aria-hidden="true"
          />

          {/* Top Status Bar */}
          <PhoneStatusBar />

          {/* Single Integrated App Header Bar */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#143d31]/8 bg-[#fffdf4] px-4 py-2 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 shrink-0">
                <img
                  src="/logo11.png"
                  alt="Agaate Agronomist"
                  className="h-8 w-8 rounded-full border border-[#143d31]/15 bg-[#e7edd9] p-0.5 object-cover shadow-2xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#fffdf4]" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight text-[#143d31]">
                  {activeTab === "chat" && "Agaate AI Agronomist"}
                  {activeTab === "mall" && "Agaate Mall Store"}
                  {activeTab === "farm" && "My Chilli Farm Plot"}
                  {activeTab === "park" && "Agaate Agri Park"}
                </p>
                <div className="flex items-center gap-1 text-[9.5px] font-semibold text-[#5d7d37]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span>Online · Advisory Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              {activeTab === "chat" && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="flex items-center gap-1 rounded-full bg-[#e7edd9] px-2.5 py-1 text-[10px] font-bold text-[#3a6b28] transition-colors hover:bg-[#d8e3c5]"
                  title="Start Fresh Chat"
                >
                  <ArrowCounterClockwise className="h-3 w-3" />
                  <span>New Chat</span>
                </button>
              )}
              {activeTab === "mall" && (
                <motion.div
                  animate={
                    isCartPulsing ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, -5, 5, 0] } : {}
                  }
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31]/8 text-[#143d31]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#143d31] text-[9px] font-extrabold text-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>
              )}
              <a
                href="tel:8350085005"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#143d31] text-white transition-colors hover:bg-[#3a6b28]"
                title="Call Hotline"
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Active Tab Screen Content */}
          {activeTab === "chat" && (
            <PhoneChatView
              messages={messages}
              inputQuery={inputQuery}
              setInputQuery={setInputQuery}
              isLoading={isLoading}
              chatLocked={chatLocked}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === "mall" && <PhoneStoreView onAddToCart={handleAddToCart} />}

          {activeTab === "farm" && <PhoneActionView />}

          {activeTab === "park" && (
            <PhoneParkView
              onReserveTour={() => {
                setAddedItemToast("Agri Park Tour Reserved!");
                setTimeout(() => setAddedItemToast(null), 2200);
              }}
            />
          )}

          {/* Bottom Dock Navigation */}
          <PhoneNavDock activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

export default InteractivePhoneApp;
