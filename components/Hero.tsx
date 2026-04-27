"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image"; 
import Link from "next/link";
// Import your animation variants
import { slideIn, fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <motion.section 
      // 1. Initialize the stagger orchestration
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-brand-surface"
    >
      
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/london-bg.jpg" 
          alt="London Cityscape"
          fill
          priority
          className="object-cover object-center opacity-60 mix-blend-luminosity" 
        />
        <div 
          className="absolute inset-0" 
          style={{ background: "linear-gradient(135deg, rgba(249, 248, 244, 0.1) 0%, #F9F8F4 80%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT: Text --- */}
        <div>
          {/* Tagline - Slides in from left */}
          <motion.span 
            variants={slideIn("left", 0.1)}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-6 block"
          >
            M&M Accounts & Taxation
          </motion.span>

          {/* Headline - Slides in from left with slight delay */}
          <motion.h1 
            variants={slideIn("left", 0.2)}
            className="text-4xl md:text-5xl font-black text-brand-text mb-6 leading-tight"
          >
            
Expert Accounting <span className="text-brand-primary italic">& Taxation Services </span>
          </motion.h1>

          {/* Subtext - Fades up */}
          <motion.p 
            variants={fadeUp(0.3)}
            className="text-lg text-brand-text/70 mb-10 max-w-md leading-relaxed font-medium"
          >
          Professional financial solutions tailored for your business growth. Trust M&M for accuracy, compliance, and peace of mind.</motion.p>

          {/* CTA Buttons - Fades up slightly later */}
  <motion.div
            variants={fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-5"
          >
            {/* PRIMARY */}
            <Link
              href="/booking"
              className="bg-brand-text text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg shadow-brand-text/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center"
            >
              Book Free Consultation
            </Link>

            {/* SECONDARY */}
            <Link
              href="/quote"
              className="bg-white text-brand-text border border-brand-text/20 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:-translate-y-1 active:scale-95 flex items-center justify-center"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>

        {/* --- RIGHT: Founder Visual --- */}
        <motion.div 
          // 2. Slide the whole image container from the right
          variants={slideIn("right", 0.4)}
          className="hidden md:flex relative h-162.5 items-end justify-center group overflow-visible"
        >
          <div className="relative w-full max-w-sm h-full flex items-end justify-center">

            {/* Background Card */}
            <div className="absolute inset-x-0 bottom-0 top-[25%] rounded-[3.5rem] shadow-2xl shadow-brand-primary/20 transform group-hover:scale-[1.02] transition-transform duration-700 ease-out z-0 bg-white/50" />

            {/* Floating Image */}
            <div className="relative z-20 w-full h-125 flex items-end justify-center pointer-events-none overflow-hidden rounded-3xl">
              <Image 
                src="/founder.jpg" 
                alt="Shahid Shah- Founder"
                width={600}
                height={750}
                priority
                className="
                  w-auto h-[115%] object-cover object-bottom
                  transition-all duration-700 ease-out 
                  group-hover:scale-105 group-hover:-translate-y-3
                  group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                "
              />
            </div>

            {/* Quote Box - Fades up specifically within this group */}
            <motion.div 
              variants={fadeUp(0.7)}
              className="absolute bottom-12 -left-6 -right-6 z-30 bg-brand-text p-7 rounded-[2.5rem] shadow-2xl border border-white/5"
            >
              <Quote className="text-brand-primary mb-3" size={24} fill="currentColor" />
              <p className="text-brand-surface text-[15px] font-medium leading-relaxed italic mb-4">
                &quot;We build systems that give UK founders their time back.&quot;
              </p>
              <div className="flex flex-col text-[10px] font-black uppercase text-brand-primary tracking-widest">
                <span>Shahid Shah</span>
                <span className="text-white/40">Founder, M&M Accounts & Taxation</span>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}