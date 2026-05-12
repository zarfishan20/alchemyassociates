import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://www.gov.uk/government/organisations/hm-revenue-customs.atom"
    );

    const items = feed.items.map((item) => ({
      title: item.title || "",
      url: item.link || "",
      publishedAt: item.pubDate || "",
      summary: item.contentSnippet || "",
      source: "HMRC", // ✅ FIXED (STRING, NOT OBJECT)
    }));

    return NextResponse.json(items);
  } catch (error) {
    console.error("HMRC RSS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch HMRC feed" },
      { status: 500 }
    );
  }
}