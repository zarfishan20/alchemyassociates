import { notFound } from "next/navigation";
import Image from "next/image";

type NewsItem = {
  title: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt?: string;
};

// TEMP: in real apps you'd fetch this from DB or API
async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tax-news`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data: NewsItem[] = await res.json();

  // simple fake slug match (replace later with real slug system)
  const item = data.find((_, i) => i.toString() === slug);

  return item || null;
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getNewsItem(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Source */}
        <p className="text-sm text-gray-500 mb-2">
          {article.source.name}
        </p>

        {/* Title */}
        <h1 className="text-3xl font-black mb-6 text-brand-navy">
          {article.title}
        </h1>

        {/* Image */}
        {article.urlToImage && (
          <Image
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
        )}

        {/* Date */}
        <p className="text-xs text-gray-400 mb-6">
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString()
            : "No date available"}
        </p>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed mb-10">
          This is a live UK tax & business news update.  
          Click below to read the full article from the original source.
        </p>

        {/* External link */}
        <a
          href={article.url}
          target="_blank"
          className="inline-block bg-brand-gold text-brand-navy font-bold px-6 py-3 rounded-full"
        >
          Read Full Article
        </a>
      </div>
    </main>
  );
}