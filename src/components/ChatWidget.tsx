"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";
import Image from "next/image";

const CHAT_API =
  "https://kanai-ai-voice-chatbot-296043914600.us-west1.run.app/chat/message";

const INITIAL_QUICK_BUTTONS = [
  { label: "Dumpster Rental", message: "I need to rent a dumpster" },
  { label: "Check My Status", message: "Can you check the status of my job?" },
  { label: "Book an Estimate", message: "I'd like to schedule a free estimate" },
];

const STORAGE_KEY = "kanai_chat";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
  quickReplies?: { label: string; message: string }[];
}

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    let processed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    processed = processed.replace(/\*(.*?)\*/g, "<em>$1</em>");
    if (processed.startsWith("- ") || processed.startsWith("• ")) {
      processed = `<span class="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#D4850A]">${processed.slice(2)}</span>`;
    }
    return (
      <span
        key={i}
        dangerouslySetInnerHTML={{
          __html:
            processed +
            (i < text.split("\n").length - 1 ? "<br/>" : ""),
        }}
      />
    );
  });
}

function loadSession(): {
  sessionId: string | null;
  messages: Message[];
  phone: string | null;
} {
  if (typeof window === "undefined")
    return { sessionId: null, messages: [], phone: null };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { sessionId: null, messages: [], phone: null };
    const data = JSON.parse(stored);
    if (Date.now() - (data.timestamp || 0) > 30 * 60 * 1000) {
      // Session expired — but keep phone for context recovery
      const phone = data.phone || null;
      localStorage.removeItem(STORAGE_KEY);
      return { sessionId: null, messages: [], phone };
    }
    return {
      sessionId: data.sessionId || null,
      messages: data.messages || [],
      phone: data.phone || null,
    };
  } catch {
    return { sessionId: null, messages: [], phone: null };
  }
}

function saveSession(
  sessionId: string | null,
  messages: Message[],
  phone: string | null
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sessionId, messages, phone, timestamp: Date.now() })
    );
  } catch {}
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Aloha! I'm Kai, your virtual assistant for Kana'i's Roll Off & Junk Removal. How can I help you today?",
  quickReplies: INITIAL_QUICK_BUTTONS,
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [savedPhone, setSavedPhone] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted session on mount
  useEffect(() => {
    const { sessionId: sid, messages: msgs, phone } = loadSession();
    if (phone) setSavedPhone(phone);
    if (sid && msgs.length > 0) {
      setSessionId(sid);
      setMessages(msgs);
    } else if (phone) {
      // Session expired but we have phone — show recovery greeting
      setMessages([
        {
          role: "assistant",
          content: `Welcome back! I still have your info on file. How can I help you today?`,
          quickReplies: INITIAL_QUICK_BUTTONS,
        },
      ]);
    }
  }, []);

  // Save session
  useEffect(() => {
    if (messages.length > 1) {
      saveSession(sessionId, messages, savedPhone);
    }
  }, [messages, sessionId, savedPhone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  // Proactive teaser
  useEffect(() => {
    if (teaserDismissed || isOpen) return;
    const timer = setTimeout(() => setShowTeaser(true), 20000);
    return () => clearTimeout(timer);
  }, [teaserDismissed, isOpen]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || loading) return;

      if (!text) setInput("");
      setLastFailedMessage(null);
      setShowTeaser(false);
      setTeaserDismissed(true);
      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: msg },
      ];
      setMessages(newMessages);
      setLoading(true);

      const phoneMatch = msg.match(
        /\b(\+?1?\s*[-.]?\s*\(?\d{3}\)?[-.\s]*\d{3}[-.\s]*\d{4})\b/
      );
      if (phoneMatch) {
        setSavedPhone(phoneMatch[1].replace(/\D/g, ""));
      }

      try {
        const res = await fetch(CHAT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            message: msg,
            phone: phoneMatch
              ? phoneMatch[1].replace(/\D/g, "")
              : savedPhone || undefined,
          }),
        });

        if (!res.ok) throw new Error("Chat error");
        const data = await res.json();

        if (data.session_id) setSessionId(data.session_id);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            quickReplies: data.quick_replies?.length > 0 ? data.quick_replies : undefined,
          },
        ]);
      } catch {
        setLastFailedMessage(msg);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Having trouble connecting. You can try again or call us at (808) 201-2668.",
            error: true,
          },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [input, loading, sessionId, messages, savedPhone]
  );

  const retryLastMessage = useCallback(() => {
    if (lastFailedMessage) {
      // Remove the error message
      setMessages((prev) => prev.filter((m) => !m.error));
      sendMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, sendMessage]);

  const openChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
    setTeaserDismissed(true);
  };

  // Check if we're on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <>
      {/* Floating button + teaser */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2">
          {showTeaser && !teaserDismissed && (
            <div
              className="relative bg-white border border-[#D4850A]/30 rounded-2xl rounded-br-md shadow-lg px-4 py-2.5 max-w-[240px] cursor-pointer"
              onClick={openChat}
            >
              <p className="text-sm text-[#0F0F0E]">
                Need help? I can give you a quick quote!
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                  setTeaserDismissed(true);
                }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs hover:bg-gray-300"
              >
                &times;
              </button>
            </div>
          )}
          <button
            onClick={openChat}
            className="w-14 h-14 bg-[#D4850A] hover:bg-[#B8720A] text-white rounded-full shadow-lg shadow-amber-900/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Chat with Kai"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Chat window — full screen on mobile, floating on desktop */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-[#F5F2EE] flex flex-col overflow-hidden border border-[#D4850A]/30 ${
            isMobile
              ? "inset-0 rounded-none"
              : "bottom-20 right-4 md:bottom-6 md:right-6 w-[370px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl shadow-black/20"
          }`}
        >
          {/* Header */}
          <div className="bg-[#0F0F0E] text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4850A] shrink-0">
                <Image
                  src="/images/founders.jpg"
                  alt="Kanai's Team"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">Kai</p>
                <p className="text-xs text-[#D4850A]">
                  Kana&apos;i&apos;s Virtual Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D4850A]/40 shrink-0 mr-2 mt-0.5">
                      <Image
                        src="/images/founders.jpg"
                        alt="Kai"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#D4850A] text-white rounded-2xl rounded-br-md"
                        : msg.error
                          ? "bg-red-50 text-red-700 border border-red-200 rounded-2xl rounded-bl-md"
                          : "bg-white text-[#0F0F0E] border border-[#D4850A]/15 rounded-2xl rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.role === "assistant"
                      ? renderMarkdown(msg.content)
                      : msg.content}
                  </div>
                </div>

                {/* Error retry button */}
                {msg.error && lastFailedMessage && (
                  <div className="flex justify-start ml-9 mt-1">
                    <button
                      onClick={retryLastMessage}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-red-600 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Try again
                    </button>
                  </div>
                )}

                {/* Quick reply buttons */}
                {msg.quickReplies && msg.quickReplies.length > 0 && i === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-9">
                    {msg.quickReplies.map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => sendMessage(btn.message)}
                        disabled={loading}
                        className="px-3 py-1.5 bg-white border border-[#D4850A]/30 text-[#D4850A] rounded-full text-xs font-medium hover:bg-[#D4850A] hover:text-white transition-all disabled:opacity-40"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 shrink-0 mr-2" />
                <div className="bg-white border border-[#D4850A]/15 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4850A]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 bg-white border-t border-[#D4850A]/15 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2.5 bg-[#F5F2EE] border border-[#D4850A]/20 rounded-xl text-sm text-[#0F0F0E] placeholder:text-[#0F0F0E]/40 focus:outline-none focus:ring-2 focus:ring-[#D4850A]/30 focus:border-[#D4850A]/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-[#D4850A] text-white rounded-xl hover:bg-[#B8720A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-[#0F0F0E]/30 text-center mt-1.5">
              Powered by Kai AI &middot; Call us: (808) 201-2668
            </p>
          </div>
        </div>
      )}
    </>
  );
}
