"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar} from "lucide-react";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";

import { slideIn, fadeUp, staggerContainer } from "@/lib/animations";

// -------------------------
// Client-side helper
// -------------------------
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
    // Init Cal.com
    (async function initCal() {
      const cal = await getCalApi({ namespace: "website-consultation" });

      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#19757e" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    // HubSpot form
    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.hbspt && !formInitialized.current) {
        const container = document.querySelector("#hubspot-form-container");

        if (container) {
          container.innerHTML = "";

          window.hbspt.forms.create({
            region: "eu1",
            portalId: "148029377",
            formId: "15e148d2-417a-4481-b45c-d15533c1c205",
            target: "#hubspot-form-container",
            cssClass: "flexipay-custom-form",
          });

          formInitialized.current = true;
        }
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="bg-brand-surface min-h-screen pb-20"
    >
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 text-center">
        <div className="absolute inset-0">
          <Image
            src="/planner.jpg"
            alt="planner"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-surface" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1
            variants={fadeUp(0.2)}
            className="text-4xl md:text-6xl font-black text-brand-text uppercase tracking-tight"
          >
            Book Your <br />
            <span className="text-brand-primary">Accountant</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.4)}
            className="mt-6 text-brand-text/60 max-w-xl mx-auto"
          >
            Speak directly with a UK-qualified accountant.
            Get clarity on VAT, PAYE, tax & compliance in 30 minutes.
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">

        {/* ================= PRIMARY: BOOKING ================= */}
        <motion.div
          variants={slideIn("left", 0.4)}
          className="lg:col-span-12 bg-white p-10 rounded-[2.5rem] shadow-2xl border"
        >
          {/* HEADER */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Calendar size={14} className="text-brand-primary" />
              Book Consultation (Free 30 Min Call)
            </h2>

            <p className="text-sm text-brand-text/60 mt-2">
              Limited weekly availability — secure your slot below.
            </p>
          </div>

          {/* CAL.COM */}
          <div className="rounded-2xl overflow-hidden border min-h-125">
            {isMounted && (
              <Cal
                namespace="website-consultation"
                calLink="caramelwebstudios/website-consultation"
                style={{ width: "100%", height: "100%" }}
                config={{
                  layout: "month_view",
                  theme: "light",
                  useSlotsViewOnSmallScreen: "true",
                }}
              />
            )}
          </div>
        </motion.div>

      </div>

      {/* ================= CONTACT INFO ================= */}
      <motion.div
        variants={fadeUp(0.6)}
        className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6"
      >
        {/* PHONE */}
        <div className="bg-brand-text text-white p-8 rounded-3xl flex gap-4 items-center">
          <Phone className="text-brand-primary" />
          <div>
            <p className="text-xs uppercase opacity-50">Call Direct</p>
            <p className="text-xl font-bold">+44 2085973316</p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="bg-white border p-8 rounded-3xl flex gap-4 items-center">
          <Mail className="text-brand-primary" />
          <div>
            <p className="text-xs uppercase text-brand-text/50">Email</p>
            <p className="text-xl font-bold text-brand-text">
              info@mandmaccountsandtaxation.com
            </p>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}