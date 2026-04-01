"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Lights */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#080808] border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center font-black text-black text-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)] mb-6">
            P
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Acesso ao Painel</h1>
          <p className="text-zinc-400 font-medium">Faça login para gerenciar a automação do seu servidor MTA.</p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-base"
          >
            {/* Ícone do Google */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Entrar com Google
          </Button>

          <Button 
            onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-base border-0"
          >
            {/* Ícone do Discord */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77.7,77.7,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            Entrar com Discord
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Conexão Segura e Criptografada
        </div>
      </motion.div>
    </main>
  );
}