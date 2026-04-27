"use client";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, PieChart, ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-black text-brand-navy tracking-tight">Scale with confidence</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<PieChart size={32} />}
          title="Payroll Management"
          desc="At FlexiPay, we offer reliable and fully managed payroll services to ensure your employees are paid accurately and on time, every time. From payslip generation and HMRC submissions to pension contributions and year-end reports, we handle it all—so you don’t have to."
          delay={0.1}
        />
        <ServiceCard 
          icon={<ShieldCheck size={32} />}
          title="Bookkeeping"
          desc="At FlexiPay, we take the stress out of managing your day-to-day finances. Our bookkeeping services are designed to keep your records accurate, organized, and up to date—giving you complete visibility over your business’s finances."
          delay={0.2}
        />
        <ServiceCard 
          icon={<BarChart3 size={32} />}
          title="CFO Insights"
          desc="High-level guidance on cash flow and profitable scaling."
          delay={0.3}
        />
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -12, transition: { duration: 0.2 } }}
      className="p-10 rounded-4xl border border-brand-navy/5 bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group"
    >
      <div className="text-brand-gold mb-8 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-2xl font-black mb-4 text-brand-navy">{title}</h3>
      <p className="text-brand-slate leading-relaxed text-sm font-medium">{desc}</p>
      <div className="mt-8 flex items-center gap-2 text-brand-gold font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Service <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}