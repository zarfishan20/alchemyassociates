"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AccountingChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I can help with VAT, PAYE, and Self-Assessment. This is general guidance only.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadStep, setLeadStep] = useState<"none" | "name" | "email" | "done">("none");
  const [leadData, setLeadData] = useState({ name: "", email: "" });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const triggerBooking = async () => {
    await createHubSpotLead("booking_click");
    window.open("/booking", "_blank");
  };

  const createHubSpotLead = async (source: string) => {
    try {
      await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          page: pathname,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setInput("");

    // LEAD CAPTURE LOGIC
    if (leadStep === "name") {
      setLeadData((prev) => ({ ...prev, name: currentInput }));
      setMessages((prev) => [...prev, { role: "user", content: currentInput }, { role: "assistant", content: "Great! What's your email address?" }]);
      setLeadStep("email");
      return;
    }

    if (leadStep === "email") {
      setLeadData((prev) => ({ ...prev, email: currentInput }));
      setMessages((prev) => [...prev, { role: "user", content: currentInput }, { role: "assistant", content: "Perfect — opening booking now." }]);
      setLeadStep("done");
      await fetch("/api/hubspot/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: leadData.name, email: currentInput, page: pathname }),
      });
      setTimeout(triggerBooking, 1000);
      return;
    }

    // NORMAL CHAT
    const newMessages: Message[] = [...messages, { role: "user", content: currentInput }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const parsed = typeof data.reply === "string" ? JSON.parse(data.reply) : data.reply;
      const message = parsed?.message || "Let me help you.";

      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
      if (parsed?.intent === "BOOK_SESSION") setLeadStep("name");
      if (messages.length >= 3 && leadStep === "none") {
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: "assistant", content: "I can connect you with an accountant. What's your name?" }]);
          setLeadStep("name");
        }, 1500);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {isOpen && (
        <div className="bg-brand-surface w-80 sm:w-96 h-125 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-brand-accent/20">
          
          {/* HEADER - Uses Brand Primary Purple */}
          <div className="bg-brand-primary p-4 text-white flex justify-between items-center shadow-md">
            <div>
              <p className="font-bold text-sm tracking-tight">Alchemy Assistant</p>
              <p className="text-[10px] opacity-90 uppercase tracking-[0.15em] font-semibold">
                UK Accounting AI
              </p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* CHAT BODY */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFDFD]"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-primary text-white rounded-tr-none"
                      : "bg-white border border-brand-accent/30 text-brand-text rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-brand-accent/30 p-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-brand-primary" size={16} />
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-brand-accent/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 text-brand-text"
              placeholder="Ask about VAT, PAYE..."
            />
            <button 
              type="submit"
              className="bg-brand-button hover:opacity-90 text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING ACTION BUTTON - Uses Brand Primary Purple */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-primary hover:bg-brand-primary/90 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-90"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}