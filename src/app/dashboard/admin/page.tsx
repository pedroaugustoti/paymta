"use client";

import { useSession } from "next-auth/react";
import { ShieldAlert, Users, LifeBuoy, TrendingUp, Activity, ArrowUpRight, Lock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function AdminOverviewPage() {
  const { data: session } = useSession();

  // @ts-ignore
  const isAdmin = session?.user?.role === "ADMIN";

  // Se por ventura um usuário comum tentar acessar via URL direta
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 text-red-500 mb-2">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black italic uppercase text-white tracking-tighter">Acesso Negado</h1>
        <p className="text-zinc-500 text-xs font-medium max-w-sm">
          Você não possui privilégios de administrador para acessar o Quartel General da Staff.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu">
      
      <PageHeader 
        title="Quartel General (Staff)"
        subtitle="Métricas globais da plataforma PayMTA e controle de suporte geral."
        category="Admin Backoffice"
        categoryColor="text-violet-500"
        icon={<ShieldAlert className="w-4 h-4" />}
      />

      {/* MÉTRICAS GLOBAIS DO SAAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#050505] border border-white/5 p-8 rounded-[32px] relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-violet-500/10">
            <TrendingUp className="w-full h-full" />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Volume Transacionado (Global)</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">R$ 14.502,50</h3>
          <p className="mt-4 text-[10px] text-emerald-500 font-bold uppercase italic relative z-10 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12% em relação ao mês passado
          </p>
        </div>

        <div className="bg-[#050505] border border-white/5 p-8 rounded-[32px] relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-blue-500/10">
            <Users className="w-full h-full" />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Cidades Ativas (Lojas)</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">42</h3>
          <p className="mt-4 text-[10px] text-blue-500 font-bold uppercase italic relative z-10">
            3 novas cidades esta semana
          </p>
        </div>

        <div className="bg-[#050505] border border-violet-500/20 p-8 rounded-[32px] relative overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.05)]">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-red-500/10">
            <LifeBuoy className="w-full h-full" />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Tickets na Fila (Geral)</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">8</h3>
          <div className="mt-4 inline-flex items-center gap-2 text-[9px] font-black uppercase text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 relative z-10">
            <Activity className="w-3 h-3" /> Ação Imediata Requerida
          </div>
        </div>
      </div>

      {/* FEED DE ATIVIDADE */}
      <div className="bg-[#050505] border border-white/5 rounded-[32px] p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black uppercase italic text-white">Radar de Atividade da Staff</h3>
            <p className="text-xs text-zinc-500 font-medium mt-1">Acompanhe os chamados e movimentações de todas as cidades cadastradas</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-white">Ticket Aberto: Problema com repasse PIX</span>
              <span className="text-xs text-zinc-500 font-medium">Servidor: <span className="text-zinc-300">Brasil Roleplay</span></span>
            </div>
            <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 w-fit">Pendente</span>
          </div>
        </div>
      </div>
    </div>
  );
}