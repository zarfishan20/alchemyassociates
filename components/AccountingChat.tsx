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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help with VAT, PAYE, and Self-Assessment. This is general guidance only, not professional advice.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // 💬 CHAT SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 BOOK CONSULTATION (NO FORM)
  const handleBooking = async () => {
    try {
      // optional tracking only (does NOT block user)
      await fetch("/api/lead-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "chat",
          page: pathname,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Tracking error:", err);
    }

    // 🚀 DIRECT TO BOOKING PAGE
    window.location.href = "/booking";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-85 h-130 rounded-2xl shadow-2xl flex flex-col overflow-hidden border">

          {/* HEADER */}
          <div className="bg-brand-primary p-4 text-white flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">M&M Assistant</p>
              <p className="text-[10px] opacity-80 uppercase">
                UK Accounting Bot
              </p>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* CHAT */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50"
          >
            {/* WARNING */}
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-[11px] p-3 rounded-xl">
              General guidance only. Do not share personal or financial data.
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl text-sm max-w-[80%] ${
                    m.role === "user"
                      ? "bg-brand-primary text-white"
                      : "bg-white border"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <Loader2 className="animate-spin text-brand-primary" />
            )}
          </div>

          {/* INPUT */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-2 border rounded-md text-sm"
            />
            <button className="bg-brand-primary text-white p-2 rounded-md">
              <Send size={16} />
            </button>
          </form>

          {/* BOOK BUTTON */}
          <button
            onClick={handleBooking}
            className="m-3 bg-black text-white p-2 rounded-md text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <Calendar size={14} />
            Book Consultation
          </button>
        </div>
      )}

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-primary text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}