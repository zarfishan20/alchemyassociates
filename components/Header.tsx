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
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const calculatorLinks = [
    { name: "Salary Estimator", href: "/#salary-calc" },
    { name: "ROI Tracker", href: "/#roi-calc" },
    { name: "Tax Optimizer", href: "/#salary-calc" },
  ];

  return (
    <nav className="bg-white border-b border-brand-accent/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/logo.png"
              alt="alchemy associates logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <span className="block text-(--color-brand-logo) uppercase font-black text-2xl md:text-3xl">
              Alchemy
            </span>
            <span className="block text-(--color-brand-subheading) font-medium text-sm">
              Associates
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-(--color-brand-primary) hover:text-(--color-brand-button) transition"
            >
              {link.name}
            </Link>
          ))}

          {/* DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setIsCalcOpen(true)}
            onMouseLeave={() => setIsCalcOpen(false)}
          >
            <div className="flex items-center gap-1 text-(--color-brand-primary) cursor-pointer">
              Calculators
              <ChevronDown size={12} />
            </div>

            {isCalcOpen && (
              <div className="absolute top-full left-0 w-60 bg-white shadow-xl text-(--color-brand-primary) rounded-xl py-3 border border-brand-accent">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.name}
                    href={calc.href}
                    className="block px-5 py-3 text-[10px] font-bold hover:bg-brand-subheading/50"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LOGIN */}
          <Link
            href="https://login.xero.com/identity/user/login"
            target="_blank"
            className="flex items-center gap-2 bg-(--color-brand-button) hover:bg-brand-primary text-white px-5 py-2 rounded-full text-xs font-bold"
          >
            <Lock size={12} />
            Portal
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden p-2 text-brand-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-40 flex flex-col ">

          {/* scroll area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-xl font-black text-(--color-brand-primary) hover:text-brand-subheading"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-brand-primary pt-6">
              <p className="text-sm font-black text-(--color-brand-subheading) mb-4 uppercase">
                Calculators
              </p>

              {calculatorLinks.map((calc) => (
                <Link
                  key={calc.name}
                  href={calc.href}
                  className="block text-base font-semibold mb-3 text-(--color-brand-primary) hover:text-brand-subheading"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {calc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* FIXED BOTTOM BUTTON */}
          <div className="p-6 border-t border-brand-primary">
            <Link
              href="https://login.xero.com/identity/user/login"
              className="flex items-center justify-center gap-2 bg-(--color-brand-button) text-white p-4 rounded-2xl font-bold w-full hover:bg-brand-primary"
            >
              <Lock size={16} />
              Portal Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}