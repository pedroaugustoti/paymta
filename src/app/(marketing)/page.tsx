// src/app/(marketing)/page.tsx
"use client"; // Necessário se for usar os lucide-react interativos ou states futuros

import { 
  HeroSection, 
  StatsSection, 
  BentoFeatures, 
  HowItWorksSection, 
  DeveloperSection, 
  FinalCTA 
} from "@/components/marketing/home-sections";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-green-500/30 overflow-hidden relative">
      
      {/* Background Otimizado (Grid estilo Blueprint/Matrix) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Glow amarelo superior super leve na GPU */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none rounded-full" />

      {/* Container Principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-32">
        <HeroSection />
        <StatsSection />
        <BentoFeatures />
        <DeveloperSection />
        <HowItWorksSection />
        <FinalCTA />
      </div>

    </main>
  );
}