import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemMessage = {
      role: "system",
      content: `
You are the expert AI assistant for Alchemy Associates, a UK accounting firm.

You MUST always return valid JSON ONLY in this format:

{
  "intent": "BOOK_SESSION | VAT_QUERY | PAYROLL_QUERY | TAX_QUERY | CHAT",
  "message": "short, clear, professional response"
}

RULES:
- Always return BOTH intent and message
- No markdown
- No backticks
- No explanations
- Keep responses short
- If unsure, use CHAT intent

EXAMPLES:

User: I need VAT help
{"intent":"VAT_QUERY","message":"VAT depends on your turnover and registration status."}

User: I want to book
{"intent":"BOOK_SESSION","message":"I can help you book a consultation."}

User: hi
{"intent":"CHAT","message":"Hi! How can I help you today?"}
      `,
    };

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [systemMessage, ...messages],
          temperature: 0.2,
          response_format: { type: "json_object" },
        }),
      }
    );

    const data = await response.json();

    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: "No AI response" },
        { status: 500 }
      );
    }

    // ALWAYS SAFE PARSE
    let parsed;

    try {
      parsed = JSON.parse(aiMessage);
    } catch {
      parsed = {
        intent: "CHAT",
        message: aiMessage,
      };
    }

    if (!parsed.message) {
      parsed.message = "Let me help you with that.";
    }

    return NextResponse.json({
      reply: parsed, // 👈 OBJECT (important)
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Chat API failed" },
      { status: 500 }
    );
  }
}