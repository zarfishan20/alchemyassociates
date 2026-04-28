"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, } from "lucide-react";
import Image from "next/image";

// Import your refined animations
import { slideIn, fadeUp, staggerContainer } from "@/lib/animations";

// --- Types & Helpers ---
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          css?: string;
          cssClass?: string;
        }) => void;
      };
    };
  }
}

// Modern helper to detect client-side rendering without triggering ESLint warnings
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function ContactPage() {
  const isMounted = useIsClient();
  const formInitialized = useRef(false);

  useEffect(() => {
   

    // 2. Load and Initialize HubSpot Form
    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.hbspt && window.hbspt.forms && !formInitialized.current) {
        const container = document.querySelector("#hubspot-form-container");
        if (container) {
          container.innerHTML = ""; // Prevents form duplication
          window.hbspt.forms.create({
            region: "eu1",
            portalId: "148029377",
            formId: "15e148d2-417a-4481-b45c-d15533c1c205",
            target: "#hubspot-form-container",
            css: "",
            cssClass: "flexipay-custom-form",
          });
          formInitialized.current = true;
        }
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="bg-brand-surface min-h-screen pb-20 overflow-hidden"
    >
      {/* --- HEADER SECTION --- */}
      <section className="relative pt-32 pb-24 z-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/planner.jpg"
            alt="planner"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, #f8fafb 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <motion.div
            variants={fadeUp(0.1)}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-brand-primary/20 shadow-sm mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-[9px]">
              Engagement Portal
            </span>
          </motion.div>

          <div className="relative">
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[140px] font-black text-brand-text/5 select-none tracking-tighter uppercase whitespace-nowrap">
              Contact
            </span>
            <motion.h1
  variants={slideIn("left", 0.2)}
  className="relative text-3xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-[0.9] tracking-[-0.05em] uppercase"
>
  Strategic <br />
  <span className="text-transparent bg-clip-text bg-linear-to-br from-(--color-brand-primary) via-brand-accent to-(--color-brand-subheading)">
    Briefing.
  </span>
</motion.h1>
          </div>

          <motion.p
            variants={fadeUp(0.4)}
            className="mt-10 text-brand-text/60 font-medium text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Connect with our team to streamline your operations <br className="hidden md:block" />
            and deploy automated payroll at scale.
          </motion.p>
        </div>
      </section>

      {/* --- INTERACTIVE GRID SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-8">
          
         

          {/* RIGHT: HUBSPOT FORM */}
          <motion.div
            variants={slideIn("right", 0.5)}
            className="lg:col-span-12 bg-white p-10 rounded-[2.5rem] border border-brand-text/5 shadow-2xl shadow-brand-text/5 flex flex-col"
          >
            <h3 className="text-[11px] font-black uppercase tracking-widest text-brand-text mb-8 border-b border-brand-text/5 pb-4 flex items-center gap-2">
              <Mail size={14} className="text-brand-primary" />
              General Inquiry
            </h3>
            {isMounted ? (
              <div id="hubspot-form-container" className="w-full grow" />
            ) : (
              <div className="w-full h-96 animate-pulse bg-brand-surface rounded-3xl" />
            )}
          </motion.div>
        </div>

        {/* --- BOTTOM ROW: CONTACT CARDS --- */}
        <motion.div
          variants={fadeUp(0.7)}
          className="flex flex-col md:flex-row gap-6 w-full"
        >
          <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-brand-text text-white shadow-xl group flex-1 transition-all hover:-translate-y-1">
            <div className="bg-brand-primary/20 p-4 rounded-2xl text-brand-primary group-hover:scale-110 transition-transform duration-300">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
                Direct Correspondence
              </p>
              <p className="text-xl md:text-2xl font-bold tracking-tight">+44 2085973316 </p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white border border-brand-text/5 shadow-sm group flex-1 transition-all hover:-translate-y-1">
            <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary group-hover:scale-110 transition-transform duration-300">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text/40 mb-1">
                E-Mail
              </p>
              <p className="text-xl md:text-2xl font-bold text-brand-text lowercase tracking-tight">
               info@mandmaccountsandtaxation.com
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}