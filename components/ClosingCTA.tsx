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

         <div className="mb-12 text-center">

  {/* Label */}
  <p className="text-xl font-bold text-brand-primary uppercase tracking-[0.2em]">
    Contact Us
  </p>

  {/* Heading */}
  <h2 className="mt-4 text-4xl md:text-5xl font-bold text-brand-halfheading">
    Ready to{" "}
    <span className="text-brand-primary">Get Started?</span>
  </h2>

  {/* Accent line */}
  <div className="mt-6 h-1 w-20 bg-brand-button mx-auto rounded-full" />

  {/* Description */}
  <p className="mt-8 text-lg text-brand-muted font-medium max-w-2xl mx-auto leading-relaxed">
    Schedule your free consultation today and discover how we can help your business thrive.
  </p>

</div>

          {/* CTA BUTTON */}
          <div className="flex justify-center">
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-brand-button text-white w-full sm:w-auto min-w-70 px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-lg hover:bg-brand-primary hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
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