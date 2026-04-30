"use client";

import { motion } from "framer-motion";
import { FileText, Receipt, Wallet, TrendingUp, Calculator, ShieldCheck} from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">

      {/* HEADER (same style as yours) */}
      <div className="mb-12 text-center">

        <p className="text-xl font-bold text-brand-primary uppercase tracking-[0.2em]">
          Our Services
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-brand-halfheading">
          Complete{" "}
          <span className="text-brand-primary">Accounting Solutions</span>
        </h2>

        <div className="mt-6 h-1 w-20 bg-brand-button mx-auto rounded-full" />

        <p className="mt-8 text-lg text-brand-muted font-medium max-w-2xl mx-auto leading-relaxed">
          We provide full-service accounting, tax, payroll and advisory support for individuals, contractors, and businesses across the UK.
        </p>

      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        <ServiceCard
          icon={<FileText size={32} />}
          title="Accounts & Bookkeeping"
          desc="Accurate bookkeeping and preparation of statutory accounts to keep your business compliant and organised year-round."
          delay={0.1}
        />

        <ServiceCard
          icon={<Receipt size={32} />}
          title="Tax Returns"
          desc="Self-assessment, corporation tax, and capital gains tax returns prepared and submitted accurately to HMRC."
          delay={0.2}
        />

        <ServiceCard
          icon={<Wallet size={32} />}
          title="VAT Services"
          desc="Full VAT registration, returns, and compliance support to ensure your business meets all HMRC requirements."
          delay={0.3}
        />

        <ServiceCard
          icon={<Calculator size={32} />}
          title="Payroll & CIS"
          desc="End-to-end payroll processing, pension administration, and CIS support for contractors and construction businesses."
          delay={0.4}
        />

        <ServiceCard
          icon={<TrendingUp size={32} />}
          title="Business Advisory"
          desc="Strategic financial guidance to help you grow, improve profitability, and make smarter business decisions."
          delay={0.5}
        />

        <ServiceCard
          icon={<ShieldCheck size={32} />}
          title="Compliance & HMRC Support"
          desc="We ensure full compliance with HMRC regulations, reducing risk and keeping your business protected."
          delay={0.6}
        />

      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="p-10 rounded-3xl border border-brand-primary/5 bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group"
    >

      <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-2xl font-black mb-3 text-brand-primary">
        {title}
      </h3>

      <p className="text-sm text-brand-text/70 leading-relaxed">
        {desc}
      </p>

      <div className="mt-8 flex items-center gap-2 text-brand-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Learn More →
      </div>

    </motion.div>
  );
}