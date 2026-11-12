"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Team", href: "/#team" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const calculatorLinks = [
    { name: "Salary Estimator", href: "/#salary-calc" },
    { name: "ROI Tracker", href: "/#roi-calc" },
  ];

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between bg-white px-4 md:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 transition-transform duration-300 group-hover:scale-105 md:h-13 md:w-13">
            <Image
              src="/logo.png"
              alt="Alchemy Associates logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <span className="block text-xl font-black tracking-tight text-(--color-brand-logo) md:text-2xl lg:text-3xl">
              Alchemy Associates
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-(--color-brand-subheading) md:text-xs">
              Chartered Certified Accountants
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-widest lg:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.name}-${link.href}`}
              href={link.href}
              className="text-(--color-brand-primary) transition-colors duration-200 hover:text-(--color-brand-button)"
            >
              {link.name}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCalcOpen((v) => !v)}
              className="flex items-center gap-1.5 uppercase text-(--color-brand-primary) transition-colors duration-200 hover:text-(--color-brand-button)"
            >
              Calculators
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${isCalcOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCalcOpen && (
              <div className="absolute left-0 top-full z-50 mt-3 w-60 animate-in slide-in-from-top-2 rounded-xl border border-slate-100 bg-white py-2 shadow-xl fade-in duration-200">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={`${calc.name}-${calc.href}`}
                    href={calc.href}
                    className="block px-5 py-3 text-[10px] font-bold text-(--color-brand-primary) transition-colors hover:bg-slate-50 hover:text-(--color-brand-button)"
                    onClick={() => setIsCalcOpen(false)}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="rounded-xl p-2 text-(--color-brand-primary) transition-colors hover:bg-slate-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 lg:hidden">
          <div
            className="absolute inset-0 animate-in bg-slate-900/10 backdrop-blur-md fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute inset-x-4 top-0 mx-auto mt-3 flex max-h-[calc(100vh-7rem)] max-w-xl animate-in flex-col space-y-6 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl slide-in-from-top-4 duration-300">
            <div className="flex flex-col divide-y divide-slate-100">
              {navLinks.map((link) => (
                <Link
                  key={`${link.name}-${link.href}`}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-slate-50 py-4 text-base font-bold text-(--color-brand-primary) transition-colors duration-200 last:border-0 hover:text-(--color-brand-button)"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <span className="h-1.5 w-1.5 scale-0 rounded-full bg-(--color-brand-button) opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            <div className="rounded-xl border border-slate-100/50 bg-slate-50/70 p-4">
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Calculators
              </p>
              <div className="space-y-0.5">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={`${calc.name}-${calc.href}`}
                    href={calc.href}
                    className="block rounded-lg p-2.5 text-sm font-medium text-(--color-brand-primary) shadow-sm shadow-transparent transition-all hover:bg-white hover:text-(--color-brand-button) hover:shadow-slate-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
