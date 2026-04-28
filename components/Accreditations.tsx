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
    <section className="border-y border-brand-primary/5 bg-white py-16">
      
      <div className="max-w-7xl mx-auto px-6">
        
       {/* --- NEW HEADER UI --- */}
        <div className="mb-16 text-center">
          {/* 1. The small wide-tracked label */}
          <p className="text-xl font-bold text-brand-primary uppercase tracking-[0.2em]">
            Our Credentials
          </p>
          
          {/* 2. The main heading */}
          <h2 className="mt-4 text-4xl font-bold text-brand-text md:text-5xl">
            Trusted by <span className="text-brand-primary">Industry Leaders</span>
          </h2>

          {/* 3. The accent line (Coral) */}
          <div className="mt-6 h-1.5 w-20 bg-brand-button mx-auto rounded-full" />
        </div>
        {/* --- END HEADER UI --- */}

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