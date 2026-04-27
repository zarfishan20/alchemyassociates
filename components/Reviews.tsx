import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    { name: "Sarah J.", text: "Saved me $5k on my taxes this year. Absolute pro!", stars: 5 },
    { name: "Mark Thompson", text: "The bookkeeping automation is a game changer.", stars: 5 },
    { name: "Elena R.", text: "Finally an accountant who speaks tech.", stars: 5 },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-brand-navy mb-2 tracking-tight">Client Feedback</h2>
            <p className="text-brand-slate">Trusted by entrepreneurs nationwide.</p>
          </div>
          <div className="flex items-center gap-3 bg-brand-light px-5 py-3 rounded-2xl border border-brand-navy/5">
            <span className="font-bold text-brand-navy">4.9/5</span>
            <div className="flex text-yellow-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-l border-slate-200 pl-3">Google Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-10 rounded-3xl border border-brand-navy/5 bg-brand-light/20 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-500 group">
              <div className="flex text-yellow-500 mb-6">
                {[...Array(r.stars)].map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              {/* FIXED QUOTES BELOW */}
              <p className="text-brand-navy text-base mb-8 italic leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                  {r.name[0]}
                </div>
                <p className="font-bold text-brand-navy text-xs uppercase tracking-widest underline decoration-brand-gold/30 underline-offset-4">
                  {r.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}