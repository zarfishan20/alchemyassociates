"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { slideIn, fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-brand-surface"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/london-bg.jpg"
          alt="London cityscape"
          fill
          priority
          className="object-cover object-center opacity-35 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(247,246,242,0.98) 0%, rgba(247,246,242,0.92) 48%, rgba(247,246,242,0.35) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
        <div>
          <motion.span
            variants={slideIn("left", 0.1)}
            className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-brand-subheading"
          >
            Alchemy Associates · Chadwell Heath
          </motion.span>

          <motion.h1
            variants={slideIn("left", 0.2)}
            className="mb-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-brand-primary md:text-6xl"
          >
            Accountants in{" "}
            <span className="text-brand-button">Chadwell Heath</span>
            <span className="block">for people and businesses.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.3)}
            className="mb-10 max-w-xl text-lg leading-8 text-brand-text/75"
          >
            Practical support with accounts, bookkeeping, tax returns, VAT and
            payroll — with a local team based in Chadwell Heath, Romford.
          </motion.p>

          <motion.div
            variants={fadeUp(0.4)}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/booking"
              className="flex items-center justify-center rounded-full bg-brand-button px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            >
              Book a consultation
            </Link>
            <Link
              href="/quote"
              className="flex items-center justify-center rounded-full border border-brand-primary/20 bg-white px-8 py-4 text-sm font-bold text-brand-primary transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            >
              Request a quote
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn("right", 0.35)}
          className="relative mx-auto hidden h-[560px] w-full max-w-md items-end justify-center md:flex"
        >
          <div className="absolute inset-x-4 bottom-0 top-20 rounded-[2rem] border border-white/60 bg-white/50 shadow-2xl shadow-brand-primary/10 backdrop-blur-sm" />
          <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-[1.75rem]">
            <Image
              src="/founder.jpg"
              alt="Shahid Shah of Alchemy Associates"
              fill
              priority
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-0 z-20 max-w-[calc(100%-1rem)] rounded-2xl border border-brand-primary/10 bg-white px-6 py-5 shadow-xl">
            <p className="text-base font-semibold italic leading-relaxed text-brand-primary">
              “We build systems that give UK founders their time back.”
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-subheading">
              Shahid Shah
            </p>
            <p className="text-sm text-brand-text/65">Founder, Alchemy Associates</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
