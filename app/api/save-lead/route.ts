import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    // HubSpot Private App Tokens use the /crm/v3/objects/contacts endpoint
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}` // Use Access Token, not API Key
      },
      body: JSON.stringify({
        properties: {
          email: email,
          firstname: name || "Chat Lead",
          lifecyclestage: "lead"
        }
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("HubSpot Error:", errorData);
      // If contact already exists, HubSpot returns 409. We can treat that as success.
      if (res.status === 409) return NextResponse.json({ success: true, message: "Already exists" });
      throw new Error("HubSpot API failed");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}