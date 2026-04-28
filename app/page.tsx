"use client";

import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import CalculatorsSection from '../components/CalculatorsSection';
import ClosingCTA from '@/components/ClosingCTA';
import GoogleReviews from '../components/GoogleReviews';
import Accreditations from '@/components/Accreditations';
import TeamSection from '@/components/team';


const logos = [
  { src: "/logos/acca.png", alt: "ACCA" },
  { src: "/logos/icaew.jpg", alt: "ICAEW" },
  { src: "/logos/acas.png", alt: "ATT" },
];


export default function Home() {
  return (
    /* Background set to your light grey #e2e2e2 */
    <main className=" bg-brand-surface">
   {/* Hero (loads immediately — no wrapper needed if already animated) */}
      <Hero />

      {/* Slide from LEFT */}
     
        <Accreditations logos={logos} />
     

      {/* Slide from RIGHT */}
      
        <Services />

      {/* Slide from LEFT */}
        <TrustBar />

      {/* Slide from RIGHT */}
        <CalculatorsSection />

      {/* Insert the Team Section here */}
      <TeamSection />


      {/* Slide from LEFT */}
        <GoogleReviews />

      {/* Slide from RIGHT */}
        <ClosingCTA />

    </main>
  );
}