import { NextResponse } from "next/server";

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

type NewsItem = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  source: {
    name: string;
  };
};

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing NEWS_API_KEY" },
      { status: 500 }
    );
  }

  try {
    // 🇬🇧 UK BUSINESS + TAX NEWS
    const url = `https://newsapi.org/v2/everything?q=HMRC OR UK tax OR VAT OR business&language=en&sortBy=publishedAt&pageSize=25&domains=gov.uk,bbc.co.uk,ft.com,telegraph.co.uk,independent.co.uk&apiKey=${API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    const articles: RawArticle[] = Array.isArray(data?.articles)
      ? data.articles
      : [];

    // 🧠 ONLY KEEP AUTHENTIC + VALID ARTICLES
    const filtered: NewsItem[] = articles
      .filter((a) => a?.title && a?.url)
      .map((a) => ({
        title: a.title || "",
        description: a.description || "",
        url: a.url || "",
        urlToImage: a.urlToImage || null,
        publishedAt: a.publishedAt || null,
        source: {
          name: a.source?.name || "UK Source",
        },
      }))
      .slice(0, 9);

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Tax news API error:", error);
    return NextResponse.json([]);
  }
}