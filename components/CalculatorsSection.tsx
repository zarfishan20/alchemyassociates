"use client";

import { motion } from "framer-motion";
import SalaryCalculator from "./SalaryCalculator";
import ROICalculator from "./ROICalculator";
import Image from "next/image";

export default function CalculatorsSection() {
  return (
    <section className="relative isolate py-24 space-y-32 min-h-screen overflow-hidden bg-brand-surface">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/calculator.jpg"
          alt="Calculator Background"
          fill
          priority
          className="object-cover object-center opacity-10"
        />

        {/* Gradient overlay (FIXED CLASS) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/60" />
      </div>

      {/* Content wrapper (IMPORTANT FIX) */}
      <div className="relative z-10">
        
        {/* Heading */}
        <motion.div
          className="relative max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Understand Your Payroll & ROI
          </h2>

          <p className="text-lg text-white/80 font-medium max-w-xl mx-auto">
            Use our interactive tools to estimate your take-home salary and see how our system can optimise your operational efficiency.
          </p>
        </motion.div>

        {/* Calculators */}
        <div className="relative space-y-32 mt-20">
          
          {/* Salary Calculator */}
          <motion.div
            id="salary-calc"
            className="max-w-5xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SalaryCalculator />
          </motion.div>

          {/* ROI Calculator */}
          <motion.div
            id="roi-calc"
            className="max-w-5xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ROICalculator />
          </motion.div>

        </div>

      </div>
    </section>
  );
}