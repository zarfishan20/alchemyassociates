"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

// Interface for type safety
interface QuoteFormData {
  fullName: string;
  email: string;
  service: string;
  revenue: string;
}

export default function RequestAQuote() {
  const [step, setStep] = useState(1);
  
  const { register, handleSubmit } = useForm<QuoteFormData>();

  const onSubmit: SubmitHandler<QuoteFormData> = (data) => {
    console.log("Form Submitted:", data);
    alert("Quote request sent! We will contact you shortly.");
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-brand-surface">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
            Step {step} of 2
          </span>
          <span className="text-xs font-bold text-brand-muted">
            {step === 1 ? "Contact Info" : "Service Details"}
          </span>
        </div>
        <div className="w-full bg-brand-surface h-2 rounded-full overflow-hidden">
          <div 
            className="bg-brand-primary h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  Full Name
                </label>
                <input
                  {...register("fullName", { required: true })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-brand-text"
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-brand-text"
                  placeholder="john@company.com"
                />
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-accent transition-colors shadow-md shadow-(--color-brand-primary)/20"
              >
                Next: Service Details
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  Service Needed
                </label>
                <select
                  {...register("service")}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-brand-text"
                >
                  <option>Bookkeeping</option>
                  <option>Payroll</option>
                  <option>Tax Preparation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-text mb-1">
                  Annual Revenue (Estimate)
                </label>
                <select
                  {...register("revenue")}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-brand-text"
                >
                  <option>Under $100k</option>
                  <option>$100k - $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M+</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 bg-brand-surface text-brand-text py-3 rounded-lg font-bold hover:brightness-95 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-accent transition-colors shadow-md shadow-(--color-brand-primary)/20"
                >
                  Get My Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <p className="mt-6 text-center text-xs text-brand-muted font-medium">
        🔒 Your data is encrypted and handled with 100% confidentiality.
      </p>
    </div>
  );
}