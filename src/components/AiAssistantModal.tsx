import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const presetQuestions = [
  "請簡要介紹郭盈芝教授的學術背景與專長",
  "郭教授在 AR/VR 數位教材領域有哪些特色？",
  "如何與郭教授洽談產學合作或研究專案？"
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content: "您好！我是淡江大學教育科技學系郭盈芝助理教授的 AI 學術助理。請問有什麼我可以協助您的嗎？（例如：查詢郭教授的專長領域、研究計畫、或產學合作洽詢方式）"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || data.error || "抱歉，目前暫時無法取得回覆，請稍後再試。";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: botReply
        }
      ]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: "您好！郭盈芝助理教授現任職於淡江大學教育科技學系，專精於教學設計、數位學習及 AR/VR 沉浸式教材開發。若需要詳細說明，歡迎寄信至 yingchih0704@gmail.com 諮詢。"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-2xl h-[85vh] max-h-[680px] bg-white rounded-3xl shadow-2xl border border-peach/50 flex flex-col overflow-hidden text-left font-sans"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#85a6bf] to-[#2a6f97] text-white flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm sm:text-base tracking-wide">
                      郭盈芝教授 AI 學術助理
                    </h3>
                    <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-mono text-white/90">
                      AI Studio
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-light">
                    淡江大學教育科技學系 專業諮詢
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/90 cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-vanilla/20">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs ${
                      msg.role === "user"
                        ? "bg-[#2a6f97] text-white"
                        : "bg-[#85a6bf] text-white"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#2a6f97] text-white rounded-tr-none shadow-xs font-medium"
                        : "bg-white text-chestnut border border-peach/40 rounded-tl-none shadow-xs"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#85a6bf] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-peach/40 rounded-tl-none text-xs text-chestnut/60 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2a6f97] animate-spin" />
                    <span>AI 助理正在檢索與生成回覆...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Preset Question Quick Suggestions */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 py-2.5 bg-vanilla/50 border-t border-peach/30 flex flex-wrap gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-chestnut/50 w-full mb-0.5">
                  推薦快捷提問：
                </span>
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[11px] bg-white border border-peach/50 hover:border-[#2a6f97] text-[#2a6f97] hover:bg-[#2a6f97]/10 px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium"
                  >
                    ✦ {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-peach/30 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="請輸入關於郭盈芝教授的問題..."
                className="flex-1 bg-vanilla/40 border border-peach/40 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-plum focus:outline-none focus:border-[#2a6f97] focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2.5 bg-[#2a6f97] hover:bg-[#1f5373] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>送出</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
