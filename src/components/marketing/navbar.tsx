"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// O componente da Logo agora recebe o estado de scroll e usa uma DIV para animar o tamanho
const BrandLogo = ({ scrolled }: { scrolled: boolean }) => (
  <div 
    className={`relative flex items-center justify-center transition-all duration-300 ease-out transform-gpu shrink-0 group-hover:scale-105 ${
      scrolled ? 'w-7 h-7 md:w-8 md:h-8' : 'w-9 h-9 md:w-10 md:h-10'
    }`}
  >
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 15C20 9.47715 24.4772 5 30 5H65C81.5685 5 95 18.4315 95 35C95 51.5685 81.5685 65 65 65H45V90C45 92.7614 42.7614 95 40 95H25C22.2386 95 20 92.7614 20 90V15ZM45 45H65C70.5228 45 75 40.5228 75 35C75 29.4772 70.5228 25 65 25H45V45Z" fill="url(#navbar-grad)" />
      <defs>
        <linearGradient id="navbar-grad" x1="20" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Escuta o Scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trava a rolagem do body quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out transform-gpu will-change-auto pointer-events-none ${scrolled ? 'p-3 md:p-4' : 'p-0'}`}>
        
        {/* Container que encolhe de padding (py-6 para py-3.5) */}
        <div className={`pointer-events-auto mx-auto w-full flex items-center justify-between transition-all duration-300 ease-out transform-gpu ${
          scrolled 
            ? "max-w-6xl bg-[#050505]/90 backdrop-blur-lg border border-white/10 rounded-2xl px-6 md:px-8 py-3.5 shadow-2xl" 
            : "max-w-none bg-[#030303] border-b border-white/5 px-6 md:px-8 py-6 rounded-none"
        }`}>
          
          <Link href="/" className="flex items-center gap-3 group transform-gpu">
            {/* Passamos a prop scrolled para a logo diminuir junto */}
            <BrandLogo scrolled={scrolled} />
            
            {/* O texto também encolhe levemente para acompanhar */}
            <span className={`font-black tracking-widest text-white uppercase italic group-hover:text-green-500 transition-all duration-300 ${
              scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'
            }`}>
              Pay<span className="text-green-500 group-hover:text-white transition-colors">MTA</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Link href="/#features" className="hover:text-green-500 transition-colors">Recursos</Link>
            <Link href="/planos" className="hover:text-green-500 transition-colors">Planos</Link>
            <Link href="/docs" className="hover:text-green-500 transition-colors">Docs</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/auth/login" 
              // O botão diminui o padding e o texto sutilmente ao rolar
              className={`hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95 transform-gpu ${
                scrolled ? 'px-4 py-2 text-[11px]' : 'px-5 py-2.5 text-xs'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Acessar Painel <ArrowRight className="w-3 h-3" />
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors transform-gpu"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl pt-28 px-6 md:hidden flex flex-col justify-between pb-12 animate-in fade-in slide-in-from-top-4 duration-200 transform-gpu">
          <nav className="flex flex-col gap-6 text-center">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-green-500 transition-colors">Recursos</Link>
            <Link href="/planos" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-green-500 transition-colors">Preços</Link>
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-green-500 transition-colors">Docs</Link>
          </nav>

          <div className="flex flex-col gap-4">
            <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-transform transform-gpu">
              <Sparkles className="w-4 h-4" /> Acessar Painel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}