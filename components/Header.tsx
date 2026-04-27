"use client";

import { useState } from "react";
import { ChevronDown, Menu, X, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
  ];

  const calculatorLinks = [
    { name: "Salary Estimator", href: "/#salary-calc" },
    { name: "ROI Tracker", href: "/#roi-calc" },
    { name: "Tax Optimizer", href: "/#salary-calc" },
  ];

  return (
    <nav className="bg-white border-b border-brand-text/5 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-14 md:w-16 md:h-16">
            <Image
              src="/logo.png"
              alt="M&M Accounts & Taxation logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="leading-none">
            <span className="block text-brand-text uppercase font-black text-3xl md:text-4xl">
              M&M
            </span>
            <span className="block text-brand-primary font-light text-sm md:text-base">
              Accounts & Taxation
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">

          {/* LINKS */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brand-text hover:text-brand-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* DROPDOWN WRAPPER (FIXED) */}
          <div
            className="relative"
            onMouseEnter={() => setIsCalcOpen(true)}
            onMouseLeave={() => setIsCalcOpen(false)}
          >

            {/* TRIGGER */}
            <div className="flex items-center gap-1 text-brand-text hover:text-brand-primary transition-colors cursor-pointer">
              Calculators
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${
                  isCalcOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* HOVER BRIDGE (prevents flicker) */}
            <div className="absolute top-full left-0 w-full h-3" />

            {/* DROPDOWN */}
            <div
              className={`absolute top-full -left-4 w-60 bg-white border border-brand-text/5 shadow-2xl rounded-2xl py-3 transition-all duration-300 z-50 ${
                isCalcOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              {calculatorLinks.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  onClick={() => setIsCalcOpen(false)}
                  className="block px-6 py-3 text-[10px] font-black text-brand-text hover:bg-brand-surface hover:text-brand-primary uppercase tracking-widest"
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* PORTAL LOGIN */}
          <Link
            href="https://login.xero.com/identity/user/login"
            target="_blank"
            className="flex items-center gap-2 bg-brand-text text-white px-6 py-3 rounded-full hover:bg-brand-primary transition-all"
          >
            <Lock size={12} />
            Portal Login
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-brand-text p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-surface fixed inset-x-0 top-20 bottom-0 z-40 p-8 flex flex-col gap-8 overflow-y-auto">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-3xl font-black text-brand-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-brand-text/10">
            <p className="text-brand-primary text-xs font-black uppercase mb-4">
              Calculators
            </p>

            {calculatorLinks.map((calc) => (
              <Link
                key={calc.name}
                href={calc.href}
                className="block text-xl font-bold text-brand-text mb-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {calc.name}
              </Link>
            ))}
          </div>

          <Link
            href="https://login.xero.com/identity/user/login"
            className="mt-auto bg-brand-text text-white p-6 rounded-2xl text-center font-black"
          >
            <Lock size={18} /> Portal Login
          </Link>
        </div>
      )}
    </nav>
  );
}