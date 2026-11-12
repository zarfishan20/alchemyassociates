"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const calculatorLinks = [
    { name: "Salary Estimator", href: "/#salary-calc" },
    { name: "ROI Tracker", href: "/#roi-calc" },
  ];

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCalcOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-20 flex justify-between items-center relative z-50 bg-white">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 md:w-13 md:h-13 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="alchemy associates logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <span className="block text-(--color-brand-logo) font-black text-xl md:text-2xl lg:text-3xl tracking-tight">
              Alchemy Associates
            </span>
            <span className="block text-(--color-brand-subheading) font-medium text-[11px] md:text-xs tracking-wide">
              Accountancy • Tax • Payroll
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={`${link.name}-${link.href}`}
              href={link.href}
              className="text-(--color-brand-primary) hover:text-(--color-brand-button) transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* DESKTOP DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCalcOpen((v) => !v)}
              className="flex uppercase items-center gap-1.5 text-(--color-brand-primary) hover:text-(--color-brand-button) transition-colors duration-200"
            >
              Calculators
              <ChevronDown size={12} className={`transition-transform duration-300 ${isCalcOpen ? "rotate-180" : ""}`} />
            </button>

            {isCalcOpen && (
              <div className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-xl py-2 border border-slate-100 mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={`${calc.name}-${calc.href}`}
                    href={calc.href}
                    className="block px-5 py-3 text-[10px] font-bold hover:bg-slate-50 text-(--color-brand-primary) hover:text-(--color-brand-button) transition-colors"
                    onClick={() => setIsCalcOpen(false)}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP LOGIN BUTTON */}
          <Link
            href="https://login.xero.com/identity/user/login"
            target="_blank"
            className="flex items-center gap-2 bg-(--color-brand-button) text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:bg-(--color-brand-primary) hover:scale-105 active:scale-95 shadow-sm"
          >
            <Lock size={12} />
            Portal
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden p-2 text-(--color-brand-primary) hover:bg-slate-50 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE & TABLET OVERLAY MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Clean Dropdown Card */}
          <div className="absolute top-0 inset-x-4 max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 mt-3 flex flex-col space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            
            {/* Elegant Stacked Navigation */}
            <div className="flex flex-col division-y divide-slate-100">
              {navLinks.map((link) => (
                <Link
                  key={`${link.name}-${link.href}`}
                  href={link.href}
                  className="flex items-center justify-between py-4 group text-base font-bold text-(--color-brand-primary) hover:text-(--color-brand-button) transition-colors duration-200 border-b border-slate-50 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  {/* Subtle boutique-style indicator dot on hover */}
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-brand-button) opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
                </Link>
              ))}
            </div>

            {/* Calculators Submenu */}
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 px-2">
                Calculators
              </p>

              <div className="space-y-0.5">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={`${calc.name}-${calc.href}`}
                    href={calc.href}
                    className="block p-2.5 text-sm font-medium rounded-lg text-(--color-brand-primary) hover:bg-white hover:text-(--color-brand-button) transition-all duration-200 shadow-sm shadow-transparent hover:shadow-slate-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Portal Action Link */}
            <div className="pt-2">
              <Link
                href="https://login.xero.com/identity/user/login"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-(--color-brand-button) text-white p-4 rounded-xl font-bold w-full transition-all duration-200 hover:bg-(--color-brand-primary) hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-slate-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Lock size={16} />
                Portal Login
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}