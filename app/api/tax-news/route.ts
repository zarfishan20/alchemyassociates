import { NextResponse } from "next/server";
import OpenAI from "openai";

/* ========================
   TYPES
======================== */

type RawArticle = {
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: {
    name?: string;
  };
};

type AIResult = {
  category: "HMRC" | "VAT" | "Payroll" | "Business";
  impact: "LOW" | "MEDIUM" | "HIGH";
  summary: string;
};

/* ========================
   OPENAI
======================== */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/* ========================
   ROUTE
======================== */

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing NEWS_API_KEY" },
      { status: 500 }
    );
  }

  try {
    /* ========================
       FETCH NEWS
    ======================== */

    const url =
      `https://newsapi.org/v2/everything?q=` +
      `HMRC OR VAT OR PAYE OR "UK tax" OR compliance OR "tax update"` +
      `&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = await res.json();

    const articles: RawArticle[] = Array.isArray(data?.articles)
      ? data.articles
      : [];

    if (!articles.length) {
      return NextResponse.json([]);
    }

    /* ========================
       AI INTELLIGENCE (BATCH)
    ======================== */

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are an HMRC UK tax intelligence engine.

Return ONLY valid JSON array:

[
  {
    "category": "HMRC | VAT | Payroll | Business",
    "impact": "LOW | MEDIUM | HIGH",
    "summary": "1-2 sentence explanation of UK business impact"
  }
]

Rules:
- Be precise and UK-focused
- No extra text
- Keep summaries short and professional
          `,
        },
        {
          role: "user",
          content: JSON.stringify(
            articles.map((a) => ({
              title: a.title,
              description: a.description,
            }))
          ),
        },
      ],
    });

    const parsed: AIResult[] = JSON.parse(
      ai.choices[0].message.content || "[]"
    );

    /* ========================
       MERGE AI + NEWS DATA
    ======================== */

    const enriched = articles.map((a: RawArticle, i: number) => ({
      title: a.title || "",
      url: a.url || "",
      urlToImage: a.urlToImage || null,
      publishedAt: a.publishedAt || null,

      source: {
        name: a.source?.name || "HMRC Update",
      },

      category: parsed[i]?.category || "Business",
      impact: parsed[i]?.impact || "LOW",
      summary:
        parsed[i]?.summary ||
        "This is a UK business regulatory update.",
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("HMRC AI engine error:", error);

    return NextResponse.json(
      { error: "Failed to load HMRC news" },
      { status: 500 }
    );
  }
}