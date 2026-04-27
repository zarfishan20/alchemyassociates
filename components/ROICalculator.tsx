"use client";
import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ROICalculator() {
  const [turnover, setTurnover] = useState(100000);
  const [animatedValue, setAnimatedValue] = useState(0);

  // FlexiPay Context: 3% operational efficiency + 150 hours saved @ £60/hr
  const totalValue = turnover * 0.03 + 150 * 60;

  // Animate totalValue whenever turnover changes
  useEffect(() => {
    const duration = 0.8; // seconds
    const stepTime = 20; // ms
    let steps = duration * 1000 / stepTime;
    const increment = totalValue / steps;

    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (steps <= 0) return totalValue;
        steps--;
        return prev + increment;
      });
      if (steps <= 0) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [totalValue]);

  const features = [
    'Automated Payroll Processing',
    '150+ Admin Hours Reclaimed',
    'Real-time Compliance Monitoring'
  ];

  return (
    <div className="relative group bg-brand-text text-white p-8 md:p-12 rounded-4xl shadow-2xl border border-brand-primary/20 overflow-hidden">

      {/* Floating Glow Circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-2xl animate-[pulse_7s_ease-in-out_infinite] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-10 relative z-10">
        <div className="bg-brand-primary/20 p-2 rounded-lg flex items-center justify-center">
          <BarChart3 className="text-brand-primary" size={28} />
        </div>
        <h3 className="text-2xl font-black tracking-tight uppercase">
          System Efficiency ROI
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Input & Features */}
        <div className="space-y-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">
            Estimated Annual Revenue (£)
          </label>
          <input 
            type="number" 
            value={turnover}
            onChange={(e) => setTurnover(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold text-2xl outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-surface"
          />

          <div className="space-y-4 pt-4">
            {features.map((item, i) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-3 text-sm font-medium text-white/70"
              >
                <CheckCircle2 size={18} className="text-brand-primary shrink-0" /> {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Result Card */}
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
          className="bg-brand-surface p-10 rounded-4xl text-center shadow-inner transition-shadow duration-500"
        >
          <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-4">
            Total System Value
          </p>

          <motion.p
            className="text-6xl font-black text-brand-text"
            key={animatedValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            £{Math.round(animatedValue).toLocaleString()}
          </motion.p>

          <p className="mt-6 text-[10px] font-bold text-brand-text/40 uppercase tracking-widest">
            Estimated Annual Efficiency Gain
          </p>

          
        </motion.div>
      </div>
    </div>
  );
}