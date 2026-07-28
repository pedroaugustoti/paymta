"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full border-b border-white/5 bg-[#030303]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            P
          </div>
          <span className="text-lg font-black tracking-widest text-white uppercase italic">
            Pay<span className="text-yellow-400">Mta</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <Link href="#recursos" className="hover:text-white transition-colors">Recursos</Link>
          <Link href="#precos" className="hover:text-white transition-colors">Preços</Link>
          <Link href="#documentacao" className="hover:text-white transition-colors">Docs</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/api/auth/signin" 
            className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-yellow-400/10 active:scale-95"
          >
            <Sparkles className="w-4 h-4" /> Acessar Painel <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}