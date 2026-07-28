"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Command, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#facb11] selection:text-black bg-[#030303]"
      style={{ "--primary": "#facb11" } as React.CSSProperties}
    >
      {/* 1. BACKGROUND GRID & GLOWS (Efeito SaaS Premium) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--primary)] blur-[150px] opacity-[0.15] rounded-[100%] pointer-events-none" />

      {/* 2. CARD PRINCIPAL COM GLASSMORPHISM */}
      <motion.div 
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] bg-[#0a0a0a]/80 border border-white/5 rounded-[40px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10"
      >
        {/* DETALHE NEON TOP */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />

        {/* LOGO E TEXTOS */}
        <div className="flex flex-col items-center text-center mb-10 mt-2">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-amber-600 rounded-[20px] flex items-center justify-center shadow-[0_0_30px_color-mix(in_srgb,_var(--primary)_40%,_transparent)] mb-6 border border-[var(--primary)]/50 relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-[20px] mix-blend-overlay" />
            <Command className="w-8 h-8 text-black" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white mb-2">
            Acesso ao <span className="text-[var(--primary)]">Painel</span>
          </h1>
          <p className="text-zinc-400 font-medium text-xs uppercase tracking-widest italic">
            Gerencie sua automação MTA
          </p>
        </div>

        {/* BOTÕES DE LOGIN (Nativos) */}
        <div className="space-y-4">
          <button 
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full h-14 bg-[#050505] hover:bg-[#111] text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 shadow-inner group"
          >
            <div className="bg-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            Entrar com Google
          </button>

          <button 
            onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            className="w-full h-14 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all flex items-center justify-center gap-3 border-none shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] active:scale-95 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            Entrar com Discord
          </button>
        </div>

        {/* TRUST BADGE FOOTER */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] italic">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span>Conexão Segura 256-bit</span>
          </div>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
            PayMTA © {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </main>
  );
}