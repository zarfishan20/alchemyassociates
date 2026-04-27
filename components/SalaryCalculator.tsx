"use client";
import { useState, useEffect } from 'react';
import { PoundSterling, Wallet, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SalaryCalculator() {
  const [gross, setGross] = useState(50000);
  const [animatedNet, setAnimatedNet] = useState(0);

  // Calculate net salary
  const calculateNet = (amt: number) => {
    const allowance = 12570;
    const taxable = Math.max(0, amt - allowance);
    const tax =
      taxable > 37700
        ? 37700 * 0.2 + (taxable - 37700) * 0.4
        : taxable * 0.2;
    const ni = amt > 12570 ? (amt - 12570) * 0.08 : 0;
    return amt - tax - ni;
  };

  const net = calculateNet(gross);

  // Animate net change smoothly
 useEffect(() => {
  const end = net;
  const duration = 0.6; // seconds
  const stepTime = 20; // ms
  let steps = duration * 1000 / stepTime;
  const increment = end / steps; // start from 0 each time

  const interval = setInterval(() => {
    setAnimatedNet((prev) => {
      if (steps <= 0) return end;
      steps--;
      return prev + increment;
    });
    if (steps <= 0) clearInterval(interval);
  }, stepTime);

  return () => clearInterval(interval);
}, [net]);

  return (
    <div className="bg-white p-8 md:p-12 rounded-4xl border border-brand-text/5 shadow-2xl relative overflow-hidden group">
      
      {/* Floating glow circle */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl opacity-70 animate-[pulse_6s_ease-in-out_infinite] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-10 relative z-10">
        <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary flex items-center justify-center">
          <PoundSterling size={24} />
        </div>
        <h3 className="text-2xl font-black text-brand-text uppercase tracking-tight">
          System Salary Estimator
        </h3>
      </div>

      <div className="space-y-12 relative z-10">

        {/* Slider Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-text/40">
              Annual Gross Pay
            </span>
            <motion.span 
              className="text-3xl font-black text-brand-primary"
              key={gross}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              £{gross.toLocaleString()}
            </motion.span>
          </div>
          <input 
            type="range"
            min="15000"
            max="150000"
            step="1000"
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-primary transition-all duration-500"
          />
        </div>

        {/* Result Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Monthly Take-Home Card */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            className="bg-brand-surface p-8 rounded-3xl border border-brand-text/5 transition-shadow duration-500"
          >
            <p className="text-[10px] font-bold text-brand-text/60 uppercase mb-2 tracking-widest">
              Monthly Take-Home
            </p>
            <p className="text-4xl font-black text-brand-text">
              £{Math.round(animatedNet / 12).toLocaleString()}
            </p>
            <div className="mt-4 h-1 w-12 bg-brand-primary rounded-full" />
          </motion.div>

          {/* System Tip Card */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            className="bg-brand-text p-8 rounded-3xl text-white shadow-xl shadow-brand-text/20 transition-shadow duration-500"
          >
            <div className="flex items-center gap-2 mb-4 text-brand-primary uppercase font-black text-[10px] tracking-widest">
              <Wallet size={14} /> System Insight
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              FlexiPay automation ensures your first <span className="text-white font-bold">£12,570</span> is optimized. 
              Our systems automatically flag Dividend/Salary splits for maximum efficiency.
            </p>
            <button className="mt-6 text-[10px] flex items-center gap-1 font-bold text-brand-primary hover:text-white transition-colors uppercase">
              Learn about automation <Info size={10} />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}