"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Ícone customizado do Discord (SVG)
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" className={className}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Resetar estados ao trocar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
    setIsScrolled(false);
  }, [pathname]);

  // Monitorar Scroll para efeitos da Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Planos", href: "/planos" },
    { name: "Documentação", href: "/docs" },
  ];

  return (
    <div className="relative bg-[#000000] min-h-screen text-zinc-300 antialiased flex flex-col selection:bg-yellow-500/30">
      
      {/* ---------------- NAVBAR ---------------- */}
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
              <Link href="/login">
                <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-full px-8 h-10 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/10 text-xs uppercase tracking-wider">
                  Acessar Painel
                </Button>
              </Link>
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
              <Link href="/login" className="w-full">
                <Button className="bg-yellow-400 text-black font-black w-full py-7 rounded-2xl shadow-lg text-lg">
                  Acessar Painel
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------- CONTEÚDO ---------------- */}
      <div className="flex-1">
        {children}
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------
// Componente Footer (Global para o Marketing)
// ---------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303] pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-sm">P</div>
              <span className="text-2xl font-black text-white tracking-tighter">PayMTA</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 font-medium">
              Profissionalizando a economia dos servidores de MTA:SA com tecnologia de ponta e segurança para donos de cidades.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Produto</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">Visão Geral</Link></li>
              <li><Link href="/planos" className="hover:text-yellow-400 transition-colors">Preços e Planos</Link></li>
              <li><Link href="/#features" className="hover:text-yellow-400 transition-colors">Funcionalidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Suporte</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/docs" className="hover:text-yellow-400 transition-colors">Documentação</Link></li>
              <li><a href="https://discord.gg/seu-link" target="_blank" className="hover:text-yellow-400 transition-colors">Discord Oficial</a></li>
              <li><Link href="/docs#troubleshooting" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/reembolso" className="hover:text-white transition-colors">Reembolso</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[11px] md:text-xs text-zinc-600 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} PayMTA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}