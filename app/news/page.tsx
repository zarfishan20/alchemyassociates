"use client";

import { useEffect, useState } from "react";
import { Bookmark, Newspaper, ExternalLink } from "lucide-react";

type NewsItem = {
  title: string;
  url: string;
  source: string; // ✅ FIXED TYPE
  publishedAt?: string;
  summary?: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // FETCH HMRC RSS
  useEffect(() => {
    fetch("/api/hmrc-feed")
      .then((res) => res.json())
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setNews([]));
  }, []);

  // BOOKMARK TOGGLE
  const toggleBookmark = (url: string) => {
    setBookmarks((prev) =>
      prev.includes(url)
        ? prev.filter((b) => b !== url)
        : [...prev, url]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">

      {/* HEADER */}
      <section className="bg-brand-logo text-white pt-28 pb-14 text-center px-6">
        <div className="max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold">
            <Newspaper size={14} /> HMRC Live Intelligence Feed
          </div>

          <h1 className="text-4xl font-black mt-6">
            UK HMRC Tax Updates
          </h1>

          <p className="text-white/70 mt-2 text-sm">
            Live GOV.UK HMRC announcements & tax changes
          </p>

        </div>
      </section>

      {/* NEWS GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {news.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col justify-between"
          >

            {/* SOURCE */}
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {item.source}
            </span>

            {/* TITLE */}
           <h2 className="font-black mt-2 text-lg text-brand-logo line-clamp-3">
              {item.title}
            </h2>

            {/* SUMMARY */}
            {item.summary && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.summary}
              </p>
            )}

            {/* DATE */}
            {item.publishedAt && (
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.publishedAt).toLocaleDateString()}
              </p>
            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-5">

              {/* BOOKMARK */}
              <button
                onClick={() => toggleBookmark(item.url)}
                className="bg-gray-100 p-2 rounded-full"
              >
                <Bookmark
                  size={16}
                  fill={bookmarks.includes(item.url) ? "black" : "none"}
                />
              </button>

              {/* LINK */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-brand-button font-bold underline"
              >
                Read <ExternalLink size={14} />
              </a>

            </div>

          </div>
        ))}

      </section>
    </main>
  );
}