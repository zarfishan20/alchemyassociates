"use client";

import Image from "next/image";

interface Accreditation {
  src: string;
  alt: string;
}

interface AccreditationsProps {
  logos: Accreditation[];
}

export default function Accreditations({ logos }: AccreditationsProps) {
  return (
    <section className="border-y border-brand-navy/5 bg-white py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
        <p className="text-center text-xs font-bold text-brand-slate uppercase tracking-[0.2em] mb-12">
          Our Credentials
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12">
          
          {logos.map((logo, i) => (
            <div
              key={i}
              className="
                w-32 h-16 
                flex items-center justify-center 
                transition-all duration-300 ease-out
                hover:scale-[1.04]
              "
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={128}
                height={64}
                className="
                  object-contain 
                  grayscale 
                  opacity-70 
                  hover:opacity-100 
                  transition-all 
                  duration-500
                "
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}