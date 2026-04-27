"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Database, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "April 08, 2026";

  return (
    <main className="bg-brand-surface min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-8 hover:gap-4 transition-all">
            <ArrowLeft size={14} /> Return to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-brand-text leading-tight tracking-tighter uppercase"
          >
            Privacy <span className="text-brand-primary">&</span> <br/>Data Governance.
          </motion.h1>
          <p className="mt-6 text-brand-text/40 text-[10px] font-black uppercase tracking-[0.2em]">
            Last Revised: {lastUpdated}
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12 bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-brand-text/5 border border-brand-text/5">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black text-brand-text uppercase tracking-tight">Commitment to Security</h2>
            </div>
            <p className="text-brand-text/60 leading-relaxed">
              FlexiPay Systems Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting the privacy of our clients and website visitors. This policy outlines how we handle personal data in accordance with UK GDPR and the Data Protection Act 2018.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Database size={20} />
              <h2 className="text-xl font-black text-brand-text uppercase tracking-tight">Data Collection & Sub-Processors</h2>
            </div>
            <p className="text-brand-text/60 leading-relaxed mb-4">
              To provide a seamless technical experience, we utilize specialized third-party infrastructure:
            </p>
            <ul className="grid gap-4">
              <li className="p-6 bg-brand-surface rounded-2xl border border-brand-text/5">
                <span className="font-black text-brand-text uppercase text-xs block mb-2">Scheduling (Cal.com)</span>
                <p className="text-sm text-brand-text/60">We use Cal.com to manage briefing synchronizations. Data entered (Name, Email, Meeting Details) is processed to facilitate the booking. Cal.com maintains high-level encryption standards.</p>
              </li>
              <li className="p-6 bg-brand-surface rounded-2xl border border-brand-text/5">
                <span className="font-black text-brand-text uppercase text-xs block mb-2">CRM & Forms (HubSpot)</span>
                <p className="text-sm text-brand-text/60">Contact forms and lead intake are powered by HubSpot. This data is stored securely within our CRM to manage our relationship with you and provide requested fiscal insights.</p>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Eye size={20} />
              <h2 className="text-xl font-black text-brand-text uppercase tracking-tight">How We Use Your Information</h2>
            </div>
            <p className="text-brand-text/60 leading-relaxed">
              Data collected is strictly used for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-brand-text/60 text-sm">
              <li>Delivering requested technical briefings and consultations.</li>
              <li>Sending essential tax updates and HMRC deadline reminders (with consent).</li>
              <li>Improving our automated payroll infrastructure services.</li>
              <li>Meeting our legal and regulatory accounting obligations.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Globe size={20} />
              <h2 className="text-xl font-black text-brand-text uppercase tracking-tight">Your Rights</h2>
            </div>
            <p className="text-brand-text/60 leading-relaxed">
              Under UK GDPR, you have the right to access, rectify, or erase your personal data. You may also object to processing or request data portability. To exercise these rights, please contact our Data Controller at <span className="text-brand-text font-bold">info@flexipaysystems.com</span>.
            </p>
          </section>

          <div className="pt-12 border-t border-brand-text/5 text-[10px] text-brand-text/40 font-bold uppercase tracking-widest text-center">
            FlexiPay Systems Ltd • Company No: 16293227 • Registered in England & Wales
          </div>
        </div>
      </div>
    </main>
  );
}