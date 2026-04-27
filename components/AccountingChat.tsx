"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { MessageCircle, X, Send, Loader2, Calendar } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AccountingChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 1. Added Mount State
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your FlexiPay UK expert. Ask me about VAT, PAYE, or Self-Assessment." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Set mounted to true after first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // 3. Prevent SSR rendering
  if (!isMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingRedirect = () => {
    setIsOpen(false);
    if (pathname === "/contact") {
      const calElement = document.getElementById("hubspot-form-container");
      if (calElement) {
        calElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open("/contact", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-white w-[320px] sm:w-95 h-125 rounded-2xl shadow-2xl flex flex-col border border-brand-surface overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-brand-primary p-4 flex justify-between items-center text-white">
            <div>
              <p className="font-bold text-sm tracking-tight">FlexiPay Assistant</p>
              <p className="text-[10px] opacity-80 uppercase">UK Compliance Bot</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-[13px] shadow-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user" 
                      ? "bg-brand-primary text-white rounded-tr-none" 
                      : "bg-white text-brand-text border border-brand-surface rounded-tl-none"
                  }`}
                >
                  {m.content.includes("[BOOK_SESSION]") ? (
                    <div className="flex flex-col gap-3">
                      <p>{m.content.replace("[BOOK_SESSION]", "")}</p>
                      <button 
                        onClick={handleBookingRedirect}
                        className="bg-brand-primary text-white py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
                      >
                        <Calendar size={14} />
                        Book Consultation
                      </button>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-2 rounded-xl border border-brand-surface shadow-sm">
                  <Loader2 size={16} className="animate-spin text-brand-primary" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask a question..." 
              className="flex-1 p-2.5 bg-slate-100 rounded-xl outline-none text-sm focus:ring-1 ring-brand-primary" 
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading} 
              className="bg-brand-primary text-white p-2.5 rounded-xl disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-brand-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </button>
    </div>
  );
}