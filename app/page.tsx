import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import CalculatorsSection from "../components/CalculatorsSection";
import ClosingCTA from "@/components/ClosingCTA";
import TeamSection from "@/components/team";

export default function Home() {
  return (
    <main className="bg-brand-surface">
      <Hero />
      <Services />
      <TrustBar />
      <CalculatorsSection />
      <TeamSection />
      <ClosingCTA />
    </main>
  );
}
