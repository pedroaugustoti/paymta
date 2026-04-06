"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Settings, DollarSign, 
  Zap, ExternalLink, Package, Palette, 
  FileText, Menu, X, Loader2
} from "lucide-react";
import { LogoutButton } from "./logout-button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. VALIDAÇÃO DE SESSÃO NO CLIENTE
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  const [userSettings, setUserSettings] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. BUSCA DE DADOS NA API
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/settings")
        .then((res) => res.json())
        .then((data) => setUserSettings(data))
        .catch(() => console.error("Erro ao carregar configurações do painel"));
    }
  }, [status]);

  // TELA DE CARREGAMENTO ENQUANTO VALIDA A SESSÃO E BUSCA DADOS
  if (status === "loading" || !userSettings) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
        <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.3em] animate-pulse">
          Iniciando Painel...
        </span>
      </div>
    );
  }

  // 3. COMPONENTE DO MENU (Reaproveitado no PC e Celular)
  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-4 border-b border-white/5">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-black text-lg shadow-[0_0_20px_rgba(234,179,8,0.2)] overflow-hidden bg-yellow-400 shrink-0">
          {userSettings?.logoUrl ? (
            <img src={userSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span>{(userSettings?.serverName || "P").charAt(0)}</span>
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-black tracking-widest leading-none uppercase truncate text-zinc-100">
            {userSettings?.serverName || "Painel PayMTA"}
          </span>
          {userSettings?.slug && (
            <Link 
              href={`/${userSettings.slug}`} 
              target="_blank"
              className="text-[10px] text-zinc-500 hover:text-yellow-400 flex items-center gap-1 mt-1.5 transition-colors font-bold italic"
            >
              VISUALIZAR LOJA <ExternalLink className="w-2 h-2" />
            </Link>
          )}
        </div>
      </div>

      <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
        <div className="relative">
          {session?.user?.image ? (
            <Image 
              src={session.user.image} 
              alt="Avatar" 
              width={38} 
              height={38} 
              className="rounded-full border-2 border-yellow-500/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-black text-white truncate italic uppercase tracking-tighter">
            {session?.user?.name?.split(' ')[0]}
          </span>
          <span className="text-[10px] text-zinc-500 truncate font-medium">Administrador</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Principal</p>
        <NavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Visão Geral" onClick={() => setIsMobileMenuOpen(false)} />
        
        <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Gestão</p>
        <NavLink href="/dashboard/produtos" icon={<Package className="w-5 h-5" />} label="Produtos" onClick={() => setIsMobileMenuOpen(false)} />
        <NavLink href="/dashboard/vendas" icon={<DollarSign className="w-5 h-5" />} label="Vendas & PIX" onClick={() => setIsMobileMenuOpen(false)} />
        
        <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Customização</p>
        <NavLink href="/dashboard/aparencia" icon={<Palette className="w-5 h-5" />} label="Design da Loja" onClick={() => setIsMobileMenuOpen(false)} />
        <NavLink href="/dashboard/content" icon={<FileText className="w-5 h-5" />} label="Páginas & Termos" onClick={() => setIsMobileMenuOpen(false)} />
        
        <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Sistema</p>
        <NavLink href="/dashboard/integracao" icon={<Zap className="w-5 h-5" />} label="Integração API" onClick={() => setIsMobileMenuOpen(false)} />
        <NavLink href="/dashboard/configuracoes" icon={<Settings className="w-5 h-5" />} label="Configurações" onClick={() => setIsMobileMenuOpen(false)} />
      </nav>

      <div className="p-4 border-t border-white/5">
        <LogoutButton />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col md:flex-row font-sans">
      
      {/* 📱 HEADER MOBILE (Visível apenas em telas pequenas) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-white/5 sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-black bg-yellow-400">
            {(userSettings?.serverName || "P").charAt(0)}
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-zinc-100">PayMTA</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-lg border border-white/10">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* 💻 SIDEBAR DESKTOP (Fixa no PC, Oculta no Mobile) */}
      <aside className="hidden md:flex w-64 lg:w-72 border-r border-white/5 bg-zinc-950 flex-col sticky top-0 h-screen shadow-2xl shadow-black shrink-0">
        <SidebarContent />
      </aside>

      {/* 📱 SIDEBAR MOBILE (Gaveta flutuante animada) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)} 
              className="fixed inset-0 bg-black/80 z-[100] md:hidden backdrop-blur-sm" 
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-72 h-full bg-zinc-950 border-r border-white/5 z-[101] flex flex-col shadow-2xl md:hidden"
            >
              <div className="absolute top-4 right-4 z-50">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#030303] w-full max-w-full">
        {children}
      </main>
    </div>
  );
}

// COMPONENTE DE LINK REAPROVEITÁVEL
function NavLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all group relative overflow-hidden"
    >
      <span className="group-hover:text-yellow-400 transition-colors shrink-0">
        {icon}
      </span>
      <span className="truncate">{label}</span>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-500 group-hover:h-6 transition-all rounded-r-full" />
    </Link>
  );
}