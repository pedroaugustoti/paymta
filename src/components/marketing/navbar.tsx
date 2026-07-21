"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { Menu, X, Loader2, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

// Ícone customizado do Discord (SVG mantido do seu design original)
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" className={className}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // Fecha o menu mobile e reseta o scroll ao trocar de página
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Monitor de Scroll OTIMIZADO (Fim do lag)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    // O { passive: true } avisa o navegador que não vamos bloquear o scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Planos", href: "/planos" },
    { name: "Documentação", href: "/docs" },
  ];

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-5 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group shrink-0">
          <div className={`transition-all duration-500 flex items-center justify-center font-black text-black rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.2)] ${isScrolled ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-xs md:text-sm"}`}>
            P
          </div>
          <span className={`font-black text-white tracking-tighter transition-all duration-500 ${isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}>
            PayMTA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[13px] xl:text-sm font-semibold text-zinc-400">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-yellow-400 transition-colors">
                {link.name}
              </Link>
            ))}
            <a 
              href="https://discord.gg/seu-link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-[#5865F2] transition-colors group"
            >
              <DiscordIcon className="w-4 h-4 text-zinc-500 group-hover:text-[#5865F2] transition-colors" />
              Comunidade
            </a>
          </div>
          
          <div className="flex items-center border-l border-white/10 pl-8">
            {/* Lógica de Autenticação Integrada */}
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
            ) : session ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-full px-8 h-10 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/10 text-xs uppercase tracking-wider">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Acessar Painel
                </Button>
              </Link>
            ) : (
              <Button size="sm" onClick={() => signIn()} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black rounded-full px-8 h-10 transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider">
                <LogIn className="w-4 h-4 mr-2" /> Entrar
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden text-white p-2.5 bg-zinc-900/50 border border-white/10 rounded-xl active:bg-zinc-800 transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[#09090b] border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl lg:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-zinc-300 hover:text-yellow-400 py-1"
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://discord.gg/seu-link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg font-bold text-zinc-300 flex items-center gap-3 py-1 hover:text-[#5865F2]"
            >
              <DiscordIcon className="w-6 h-6" /> Comunidade
            </a>
            <hr className="border-white/10 my-1" />
            
            {/* Lógica Mobile de Autenticação */}
            {session ? (
              <Link href="/dashboard" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black w-full py-7 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2">
                  <LayoutDashboard className="w-5 h-5" /> Acessar Painel
                </Button>
              </Link>
            ) : (
              <Button onClick={() => { signIn(); setMobileMenuOpen(false); }} className="bg-white/5 border border-white/10 text-white font-black w-full py-7 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" /> Fazer Login
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}