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
        "Hi! I can help with VAT, PAYE, and Self-Assessment. This is general guidance only.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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
      console.error("HubSpot error", err);
    }
  };

  const triggerBooking = () => {
    window.open("/booking", "_blank");
  };

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

    // 🔥 SAFE PARSING (NO BREAKS EVER)
    const parsed = typeof data.reply === "string"
      ? JSON.parse(data.reply)
      : data.reply;

    if (!parsed) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "No response from server.",
        },
      ]);
      return;
    }

    const message = parsed.message || "Let me help you with that.";

    // Always show message FIRST (prevents "silent chat")
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: message },
    ]);

    // THEN handle intent side-effects
    switch (parsed.intent) {
      case "BOOK_SESSION":
        setShowBooking(true);
        await createHubSpotLead("booking");
        break;

      case "VAT_QUERY":
        await createHubSpotLead("vat");
        break;

      case "PAYROLL_QUERY":
        await createHubSpotLead("payroll");
        break;
    }

  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong. Please try again.",
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-[340px] h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 min-h-0">

          {/* HEADER (FIXED) */}
          <div className="flex-none bg-brand-primary p-4 text-white flex justify-between items-center border-b border-black/10">
            <div>
              <p className="font-bold text-sm">Alchemy Assistant</p>
              <p className="text-[10px] opacity-80 uppercase tracking-widest">
                UK accounting bot
              </p>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* CHAT BODY (FIXED SCROLL) */}
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
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
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <Loader2 className="animate-spin text-brand-primary" />
              </div>
            )}
          </div>

          {/* INPUT (FIXED) */}
          <form
            onSubmit={handleSubmit}
            className="flex-none p-3 border-t border-gray-200 flex gap-2 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-primary/30"
              placeholder="Ask a question..."
            />

            <button type="submit" className="bg-brand-primary text-white p-2 rounded-md">
  <Send size={16} />
</button>
          </form>
        </div>
      )}

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center border border-gray-200">

            <Calendar className="mx-auto mb-3 text-brand-primary" />

            <h2 className="text-brand-primary text-lg mb-2">
              Book a Consultation
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Speak to an accounting expert.
            </p>

            <button
              onClick={triggerBooking}
              className="bg-brand-primary text-white w-full py-3 rounded-xl font-bold"
            >
              Continue to booking
            </button>

            <button
              onClick={() => setShowBooking(false)}
              className="text-xs text-gray-400 mt-3"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-primary text-white p-4 rounded-full shadow-xl border border-white/20"
      >
        <MessageCircle />
      </button>
    </div>
  );
}