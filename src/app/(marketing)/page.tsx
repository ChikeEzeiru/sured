import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowToBondSection from "@/components/HowToBondSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSection from "@/components/TestimonialSection.new";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <BenefitsSection />
      <HowToBondSection />
      <TestimonialSection />
      <StatsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
