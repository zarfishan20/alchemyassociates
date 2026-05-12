import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          email: body.email,
          firstname: body.name,
          source: "chatbot",
        },
      }),
    });

    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}