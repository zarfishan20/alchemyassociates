"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Bookmark, Newspaper } from "lucide-react";

type Category = "All" | "HMRC" | "VAT" | "Payroll" | "Business";

type NewsItem = {
  title: string;
  url: string;
  urlToImage?: string | null;
  source: { name: string };
  category?: string;
  impact?: "LOW" | "MEDIUM" | "HIGH";
  summary?: string;
};

const filters: Category[] = ["All", "HMRC", "VAT", "Payroll", "Business"];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
const [bookmarks, setBookmarks] = useState<string[]>(() => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  // Fetch news
  useEffect(() => {
    fetch("/api/tax-news")
      .then((res) => res.json())
      .then(setNews)
      .catch(() => setNews([]));
  }, []);

  // Load bookmarks safely (SSR-safe)


  const toggleBookmark = (url: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(url)
        ? prev.filter((b) => b !== url)
        : [...prev, url];

      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // Filtered news
  const filtered = useMemo(() => {
    if (activeFilter === "All") return news;
    return news.filter((n) => n.category === activeFilter);
  }, [news, activeFilter]);

  return (
    <main className="min-h-screen bg-brand-surface pb-20">

      {/* HEADER */}
      <section className="bg-brand-primary pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Newspaper size={12} /> Resource Hub
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Latest UK Tax <span className="text-brand-accent">&</span> Business News
          </h1>

          <p className="text-white/70 text-sm">
            Real-time HMRC & UK business updates
          </p>

          {/* FILTERS */}
          <div className="flex gap-2 mt-6 flex-wrap justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition
                  ${
                    activeFilter === f
                      ? "bg-black text-white"
                      : "bg-white border"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* NEWS GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-10">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {filtered.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >

              {/* IMAGE */}
              <div className="relative h-48 bg-gray-100">
                {item.urlToImage && (
                  <Image
                    src={item.urlToImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}

                {/* BOOKMARK */}
                <button
                  onClick={() => toggleBookmark(item.url)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Bookmark
                    size={16}
                    fill={bookmarks.includes(item.url) ? "black" : "none"}
                  />
                </button>
              </div>

         {/* CONTENT */}
<div className="p-5">

  {/* TOP ROW */}
  <div className="flex justify-between items-center">

    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
      {item.source.name} • {item.category}
    </span>

    {/* IMPACT BADGE */}
    <span
      className={`text-[10px] font-black px-2 py-1 rounded-full
        ${
          item.impact === "HIGH"
            ? "bg-red-100 text-red-600"
            : item.impact === "MEDIUM"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-green-100 text-green-600"
        }`}
    >
      {item.impact || "LOW"}
    </span>

  </div>

  {/* TITLE */}
  <h2 className="text-lg font-black mt-2 line-clamp-2">
    {item.title}
  </h2>

  {/* AI SUMMARY */}
  <p className="text-sm text-gray-600 mt-2">
    🤖 {item.summary}
  </p>

  {/* CTA */}
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 text-sm font-bold underline"
  >
    Read full article
  </a>

</div>





            </div>
          ))}

        </div>
      </section>
    </main>
  );
}