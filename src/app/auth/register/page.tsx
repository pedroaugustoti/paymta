"use client";

import Link from "next/link";
import { Mail, Lock, Server, ArrowRight } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Importação do NextAuth

// SVGs Nativos
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transform-gpu relative z-20">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Criar sua Conta</h2>
        <p className="text-sm text-zinc-500">Comece a monetizar em 5 minutos.</p>
      </div>

      {/* Botões Sociais Funcionais */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => signIn('discord', { callbackUrl: '/dashboard/admin' })} type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors">
          <DiscordIcon /> Discord
        </button>
        <button onClick={() => signIn('google', { callbackUrl: '/dashboard/admin' })} type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors">
          <GoogleIcon /> Google
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Ou</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        
        {/* Input Nome da Loja */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Nome da Loja</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Server className="w-5 h-5 text-zinc-600" />
            </div>
            <input 
              type="text" 
              required
              autoComplete="off"
              placeholder="Ex: Brasil PlayVício" 
              className="w-full bg-[#121212] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all [&:-webkit-autofill]:bg-[#121212] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>
        </div>

        {/* Input Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">E-mail</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-zinc-600" />
            </div>
            <input 
            type="email" 
            required
            autoComplete="off"
            placeholder="exemplo@gmail.com" 
            className="w-full bg-[#121212] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_30px_#121212_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>
        </div>

        {/* Input Senha */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Senha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-zinc-600" />
            </div>
            <input 
            type="password" 
            required
            autoComplete="current-password"
            placeholder="••••••••" 
            className="w-full bg-[#121212] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_30px_#121212_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <>Criar Loja <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-8 pt-6 border-t border-white/5">
        Já possui uma loja?{' '}
        <Link href="/auth/login" className="text-green-500 hover:text-green-400 font-bold transition-colors">
          Fazer Login
        </Link>
      </p>
    </div>
  );
}