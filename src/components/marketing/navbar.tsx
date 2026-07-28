"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Isotipo Exclusivo PayMTA (SVG Vetorial exato)
const BrandLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-9 md:h-9 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] shrink-0 transition-transform group-hover:scale-105">
    <path fillRule="evenodd" clipRule="evenodd" d="M20 15C20 9.47715 24.4772 5 30 5H65C81.5685 5 95 18.4315 95 35C95 51.5685 81.5685 65 65 65H45V90C45 92.7614 42.7614 95 40 95H25C22.2386 95 20 92.7614 20 90V15ZM45 45H65C70.5228 45 75 40.5228 75 35C75 29.4772 70.5228 25 65 25H45V45Z" fill="url(#navbar-grad)" />
    <defs>
      <linearGradient id="navbar-grad" x1="20" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 transition-all duration-500 ease-in-out">
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled 
            ? "w-full max-w-6xl bg-[#030303]/85 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            : "w-full max-w-full bg-[#030303] border-b border-white/5 px-6 md:px-8 py-5 rounded-none shadow-none"
        }`}>
          
          {/* LOGO VETORIAL E NOME */}
          <Link href="/" className="flex items-center gap-3 group">
            <BrandLogo />
            <span className="text-base md:text-lg font-black tracking-widest text-white uppercase italic">
              Pay<span className="text-yellow-400">MTA</span>
            </span>
          </Link>

          {/* ROTAS ESSENCIAIS (APENAS DESKTOP) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <Link href="/#features" className="hover:text-yellow-400 transition-colors">
              Recursos
            </Link>
            <Link href="/planos" className="hover:text-yellow-400 transition-colors">
              Preços
            </Link>
            <Link href="/docs" className="hover:text-yellow-400 transition-colors">
              Docs
            </Link>
          </nav>

          {/* CTA DESKTOP & BOTÃO HAMBURGUER MOBILE */}
          <div className="flex items-center gap-3">
            <Link 
              href="/api/auth/signin" 
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-yellow-400/15 active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> Acessar Painel <ArrowRight className="w-3 h-3" />
            </Link>

            {/* BOTÃO MOBILE HAMBURGUER */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* MENU MOBILE EXPANSIVO (DRAWER) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-6 text-center">
              <Link 
                href="/#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-yellow-400 transition-colors"
              >
                Recursos
              </Link>
              <Link 
                href="/planos" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-yellow-400 transition-colors"
              >
                Preços
              </Link>
              <Link 
                href="/docs" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black uppercase tracking-wider text-zinc-300 hover:text-yellow-400 transition-colors"
              >
                Docs
              </Link>
            </nav>

            <div className="flex flex-col gap-4">
              <Link 
                href="/api/auth/signin" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-yellow-400 text-black font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-yellow-400/20"
              >
                <Sparkles className="w-4 h-4" /> Acessar Painel <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}