import { FAQSection } from "../components/sections/FAQSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { FinalCTASection } from "../components/sections/FinalCTASection";
import { HeroSection } from "../components/sections/HeroSection";
import { IndustriesSection } from "../components/sections/IndustriesSection";
import { ProcessSection } from "../components/sections/ProcessSection";
import { SolutionsPreviewSection } from "../components/sections/SolutionsPreviewSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SolutionsPreviewSection />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
