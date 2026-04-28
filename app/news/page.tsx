"use client";

import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type NewsItem = {
  title: string;
  url: string;
  urlToImage?: string | null;
  source: { name: string };
  publishedAt?: string | null;
};

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tax-news")
      .then((res) => res.json())
      .then((data) => {
        setNewsItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

          <p className="text-white/70 text-sm leading-relaxed">
            Real-time HMRC & UK business updates
          </p>
        </div>
      </section>

      {/* NEWS */}
      <section className="max-w-7xl mx-auto px-6 -mt-10">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-brand-text/10 animate-pulse"
              >
                <div className="w-full h-45 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-3xl border border-brand-text/10 shadow-md hover:shadow-xl transition-all group block"
              >
                {/* IMAGE */}
                <div className="relative w-full h-45 mb-4 rounded-xl overflow-hidden bg-gray-100">
                  {item.urlToImage ? (
                    <Image
                      src={item.urlToImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-brand-muted text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* META (NO DATE FORMATTING ISSUES) */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">
                    {item.source?.name}
                  </span>

                  <div className="flex items-center gap-1 text-[10px] text-brand-muted font-bold">
                    <Calendar size={12} />
                    {item.publishedAt || "—"}
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-black text-brand-text group-hover:text-brand-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* CTA */}
                <div className="flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-brand-text">
                  Read Full Article
                  <ArrowRight
                    size={14}
                    className="text-brand-accent group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}