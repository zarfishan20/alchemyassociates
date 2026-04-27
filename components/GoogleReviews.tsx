"use client";

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data: Review[] = [
          { id: 1, author: "James W.", text: "Best accounting firm in London. Saved me thousands in NI.", rating: 5 },
          { id: 2, author: "Sarah L.", text: "The ROI calculator was spot on. Highly recommend.", rating: 5 },
          { id: 3, author: "TechFlow Ltd", text: "Seamless transition to MTD. Professional and fast.", rating: 5 },
        ];
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return (
    <div className="py-20 text-center opacity-50 uppercase text-[10px] font-black tracking-widest text-brand-text">
      Loading Reviews...
    </div>
  );

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-brand-text tracking-tighter mb-4 uppercase">
              Trusted by UK <br/> Founders
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex text-brand-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-brand-text uppercase tracking-widest border-l border-brand-text/10 pl-3">
                5.0 Google Rating
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              /* Added group for hover effects and rounded-[2rem] for consistency */
              className="p-10 rounded-4xl bg-brand-surface/30 border border-brand-text/5 relative group hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* FIXED OVERLAP: Moved icon further back (z-0) and reduced opacity */}
              <Quote 
                className="absolute top-8 right-8 text-brand-primary/10 z-0 group-hover:text-brand-primary/20 transition-colors" 
                size={48} 
              />
              
              {/* FIXED OVERLAP: Added relative z-10 to lift text above the icon */}
              <div className="relative z-10">
                <p className="text-sm leading-relaxed text-brand-text font-medium mb-8 pt-4">
                  &quot;{review.text}&quot;
                </p>
                
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text">
                    {review.author}
                  </p>
                  <p className="text-[8px] font-bold text-brand-primary uppercase tracking-widest">
                    Verified Client
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}