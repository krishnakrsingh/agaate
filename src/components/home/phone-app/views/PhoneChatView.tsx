import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneRight } from "@phosphor-icons/react";
import type { Message } from "../phone-app-data";
import { FREE_CHAT_LIMIT, SUGGESTED_PROMPTS, WHATSAPP_AGRONOMIST_URL } from "../phone-app-data";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface PhoneChatViewProps {
  messages: Message[];
  inputQuery: string;
  setInputQuery: (val: string) => void;
  isLoading: boolean;
  chatLocked: boolean;
  onSendMessage: (customText?: string) => void;
}

export function PhoneChatView({
  messages,
  inputQuery,
  setInputQuery,
  isLoading,
  chatLocked,
  onSendMessage,
}: PhoneChatViewProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const farmerChatCount = messages.filter((m) => m.sender === "farmer").length;
  const chatsLeft = Math.max(0, FREE_CHAT_LIMIT - farmerChatCount);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, chatLocked]);

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-hidden bg-[#fffdf4]">
      {/* Chat Messages Container */}
      <div ref={chatContainerRef} className="flex-1 min-h-0 space-y-2.5 overflow-y-auto p-3.5">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 6,
                transformOrigin: msg.sender === "farmer" ? "bottom right" : "bottom left",
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === "farmer" ? "items-end" : "items-start"}`}
            >
              {msg.sender === "farmer" ? (
                <div className="max-w-[82%] rounded-2xl rounded-tr-xs bg-[#143d31] px-3 py-2 text-white shadow-2xs">
                  <p className="whitespace-pre-line text-[11.5px] leading-relaxed">{msg.text}</p>
                  <p className="mt-0.5 text-right font-mono text-[8.5px] text-white/60">{msg.time}</p>
                </div>
              ) : (
                <div className="max-w-[92%] rounded-2xl rounded-bl-xs border border-[#143d31]/10 bg-white p-3 shadow-2xs">
                  {/* Advisory Card Header */}
                  <div className="mb-1.5 flex items-center gap-1.5 border-b border-[#143d31]/8 pb-1.5">
                    <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-[#143d31]/12 bg-[#e7edd9] p-[1.5px]">
                      <img
                        src="/logo11.png"
                        alt="Agaate"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#143d31]">
                      Agaate Agronomist
                    </span>
                    {msg.verified && (
                      <span
                        className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#25D366]"
                        aria-label="Verified"
                        title="Verified"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-2 w-2 text-white"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M3.5 8.2 6.4 11l6.1-6.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Advisory Content */}
                  <p className="whitespace-pre-line text-[11.5px] font-medium leading-relaxed text-[#143d31]/90">
                    {msg.text}
                  </p>

                  {/* Advisory Card Footer */}
                  <div className="mt-2 flex items-center justify-between border-t border-[#143d31]/6 pt-1.5 text-[9px] text-[#4f624f]">
                    <span className="font-mono text-[#143d31]/40">{msg.time}</span>
                    <a
                      href={WHATSAPP_AGRONOMIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#128C7E] hover:underline"
                    >
                      <WhatsAppIcon className="h-2.5 w-2.5" />
                      <span>Chat now</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-start"
          >
            <div className="flex max-w-[75%] items-center gap-2 rounded-2xl rounded-bl-xs border border-[#143d31]/10 bg-white px-3 py-2 shadow-2xs">
              <div className="flex items-center gap-1 px-0.5 py-1">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5d7d37]"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5d7d37]"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5d7d37]"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-[10px] font-bold text-[#5d7d37]">Agronomist typing...</span>
            </div>
          </motion.div>
        )}

        {chatLocked && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="rounded-2xl border border-[#25D366]/35 bg-gradient-to-b from-[#e8fff0] to-white p-3.5 shadow-2xs"
          >
            <p className="mt-1 text-[11.5px] font-bold leading-snug text-[#143d31]">
              Get a real agronomist on WhatsApp for your field.
            </p>
            <p className="mt-1 text-[10px] font-medium leading-relaxed text-[#143d31]/70">
              Photo diagnosis, spray dose, and follow-up — replies within minutes.
            </p>
            <a
              href={WHATSAPP_AGRONOMIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-[11.5px] font-bold text-white shadow-xs transition-transform hover:bg-[#1ebe57] active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>Continue on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      {!chatLocked && (
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-t border-[#143d31]/8 bg-[#f4f8f5] px-3 py-1.5">
          <span className="shrink-0 font-mono text-[9px] uppercase font-bold text-[#5d7d37]">Ask:</span>
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSendMessage(prompt)}
              disabled={isLoading}
              className="cursor-pointer shrink-0 rounded-full border border-[#143d31]/10 bg-white px-2.5 py-1 text-[10px] font-bold text-[#143d31] transition-all hover:border-[#5d7d37] hover:bg-[#a3e635]/20 disabled:opacity-50 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
          {chatsLeft > 0 && chatsLeft < FREE_CHAT_LIMIT && (
            <span className="ml-auto shrink-0 font-mono text-[9px] font-bold text-[#5d7d37]">
              {chatsLeft} left
            </span>
          )}
        </div>
      )}

      {/* Chat Input Bar */}
      {chatLocked ? (
        <div className="flex items-center gap-2 border-t border-[#143d31]/8 bg-[#f4f8f5]/50 p-2.5 px-3">
          <input
            type="text"
            disabled
            placeholder="Free chats limit reached"
            className="flex-1 cursor-not-allowed rounded-full bg-[#e8eddf] px-3.5 py-1.5 text-xs text-[#143d31]/40 outline-none"
          />
          <button
            type="button"
            disabled
            className="flex h-7.5 w-7.5 cursor-not-allowed items-center justify-center rounded-full bg-[#143d31]/20 text-white"
          >
            <PaperPlaneRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-[#143d31]/8 bg-white p-2 px-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            placeholder="Ask crop advice or symptoms..."
            className="flex-1 rounded-full bg-[#f4f8f5] px-3.5 py-1.5 text-[11.5px] text-[#143d31] outline-none placeholder:text-[#143d31]/40 focus:ring-1 focus:ring-[#5d7d37]"
          />
          <button
            type="button"
            onClick={() => onSendMessage()}
            disabled={isLoading || !inputQuery.trim()}
            className="cursor-pointer flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#143d31] text-white transition-all hover:scale-105 disabled:opacity-40 shadow-2xs"
          >
            <PaperPlaneRight className="h-3.5 w-3.5" weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
