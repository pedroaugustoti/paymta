import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// O Logo da PayMTA em Verde
const BrandLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M20 15C20 9.47715 24.4772 5 30 5H65C81.5685 5 95 18.4315 95 35C95 51.5685 81.5685 65 65 65H45V90C45 92.7614 42.7614 95 40 95H25C22.2386 95 20 92.7614 20 90V15ZM45 45H65C70.5228 45 75 40.5228 75 35C75 29.4772 70.5228 25 65 25H45V45Z" fill="url(#auth-grad)" />
    <defs>
      <linearGradient id="auth-grad" x1="20" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ADE80" />
        <stop offset="1" stopColor="#16A34A" />
      </linearGradient>
    </defs>
  </svg>
);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-green-500/30 relative flex flex-col justify-center items-center py-12 px-4 overflow-hidden">
      
      {/* Botão Voltar - Fixo no Topo Esquerdo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>

      {/* Background Otimizado (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Glow Superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Centralizada */}
        <div className="flex flex-col items-center justify-center mb-8">
          <BrandLogo />
          <h1 className="text-2xl font-black tracking-widest text-white uppercase italic mt-4">
            Pay<span className="text-green-500">MTA</span>
          </h1>
        </div>

        {/* Renderiza o Login ou Cadastro aqui */}
        {children}
      </div>
    </div>
  );
}