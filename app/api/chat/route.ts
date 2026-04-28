import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemMessage = {
      role: "system",
      content: `
You are the expert AI assistant for Alchemy Associates, a UK accounting firm.

You MUST always return ONLY valid JSON.

RULES:

1. Booking request:
{"intent":"BOOK_SESSION"}

2. VAT questions:
{"intent":"VAT_QUERY","message":"your response"}

3. Payroll questions:
{"intent":"PAYROLL_QUERY","message":"your response"}

4. Tax questions:
{"intent":"TAX_QUERY","message":"your response"}

5. Default chat:
{"intent":"CHAT","message":"your response"}

IMPORTANT:
- Return ONLY JSON
- No markdown
- No explanations
- No backticks
- Keep responses short and professional
      `,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [systemMessage, ...messages],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: "No AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply: aiMessage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Chat API failed" },
      { status: 500 }
    );
  }
}