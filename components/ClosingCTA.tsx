"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ClosingCTA() {
  return (
    <section className="relative py-28 px-6 text-brand-text overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/closingCTA.jpg"
          alt="desk with pc with a curved screen"
          fill
          className="object-cover object-center scale-105"
        />

        {/* OVERLAY (IMPORTANT FOR READABILITY) */}
        <div className="absolute inset-0 bg-linear-to-b from-brand-surface/95 via-brand-surface/85 to-brand-surface/95" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* SMALL TAG */}
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 block">
            Let’s Get Started
          </span>

          {/* HEADLINE */}
          <h2 className="text-4xl md:text-5xl font-black text-brand-text mb-6 leading-tight">
            Ready to Take Control of Your Finances?
          </h2>

          {/* SUBTEXT */}
          <p className="text-brand-text/70 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Book a quick consultation with our team and get clarity on your tax,
            bookkeeping, and payroll position in minutes.
          </p>

          {/* CTA BUTTON */}
          <div className="flex justify-center">
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-brand-primary text-white w-full sm:w-auto min-w-70 px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
              >
                Book Free Consultation
              </motion.button>
            </Link>
          </div>

          {/* TRUST LINE */}
          <p className="mt-8 text-[10px] font-bold text-brand-text/40 uppercase tracking-widest">
            No obligation • 100% confidential • UK accounting experts
          </p>

        </motion.div>

      </div>
    </section>
  );
}