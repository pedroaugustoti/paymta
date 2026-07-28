"use client";

import { 
  HeroSection, 
  IntegrationLogos, 
  StatsSection, 
  BentoFeatures, 
  HowItWorksSection, 
  DeveloperSection, 
  FaqSection, 
  FinalCTA 
} from "../../components/marketing/home-sections";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-zinc-300 selection:bg-yellow-500/30 font-sans overflow-hidden">
      
      {/* BACKGROUND OTIMIZADO (GPU) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(234,179,8,0.08),_transparent_70%)] pointer-events-none z-0 transform-gpu" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <HeroSection />
        <IntegrationLogos />
        <StatsSection />
        <BentoFeatures />
        <HowItWorksSection />
        <DeveloperSection />
        <FaqSection />
        <FinalCTA />
      </div>
    </main>
  );
}