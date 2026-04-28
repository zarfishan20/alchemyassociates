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

  // -------------------------
  // HUBSPOT LEAD
  // -------------------------
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

  // -------------------------
  // CAL.COM BOOKING
  // -------------------------
  const triggerBooking = () => {
    window.open("/booking", "_blank");
  };

  // -------------------------
  // CHAT SUBMIT
  // -------------------------
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
        let parsed;

        try {
          parsed = JSON.parse(data.reply);
        } catch {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
          return;
        }

        // -------------------------
        // INTENT ROUTER
        // -------------------------
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

          default:
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: parsed.message || "Let me help you with that.",
              },
            ]);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-white w-85 h-130 rounded-2xl shadow-2xl flex flex-col overflow-hidden border relative">

          {/* HEADER */}
          <div className="bg-brand-primary p-4 text-white flex justify-between items-center">
            <div>
            <p className="font-bold text-sm tracking-tight">Alchemy Assistant</p>
           <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">uk accounting bot</p>
           </div>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* CHAT */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">

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
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="Ask a question..."
            />
            <button className="bg-brand-primary text-white p-2 rounded-md">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center">

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
        className="bg-brand-primary text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle />
      </button>
    </div>
  );
}