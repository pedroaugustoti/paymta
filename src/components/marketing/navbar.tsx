"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { Loader2, LayoutDashboard, LogIn } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            P
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">PayMTA</span>
        </Link>

        {/* NAVEGAÇÃO E BOTÃO DINÂMICO */}
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors hidden md:block">
            Recursos
          </Link>
          
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
          ) : session ? (
            <Link href="/dashboard">
              <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-5 px-6 rounded-xl flex items-center gap-2 text-xs uppercase italic transition-all">
                <LayoutDashboard className="w-4 h-4" /> Painel Admin
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={() => signIn()} 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-5 px-8 rounded-xl flex items-center gap-2 text-xs uppercase italic shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all"
            >
              <LogIn className="w-4 h-4" /> Entrar
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}