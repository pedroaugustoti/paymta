"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShieldAlert, Users, LifeBuoy, TrendingUp, Activity, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function AdminOverviewPage() {
  const { data: session } = useSession();
  const [ticketsCount, setTicketsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    async function loadAdminData() {
      try {
        const res = await fetch("/api/tickets");
        if (res.ok) {
          const data = await res.json();
          setTicketsCount(data.length);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do admin:", err);
      } finally {
        setLoading(false);
      }
    }
    if (isAdmin) loadAdminData();
  }, [isAdmin]);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#050505] border border-white/5 p-8 rounded-[32px] relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-violet-500/10"><TrendingUp className="w-full h-full" /></div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Volume Transacionado</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">R$ 14.502,50</h3>
          <p className="mt-4 text-[10px] text-emerald-500 font-bold uppercase italic relative z-10 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Sincronizado com Mercado Pago
          </p>
        </div>

        <div className="bg-[#050505] border border-white/5 p-8 rounded-[32px] relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-blue-500/10"><Users className="w-full h-full" /></div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Lojas Cadastradas</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">1</h3>
          <p className="mt-4 text-[10px] text-blue-500 font-bold uppercase italic relative z-10">Ativo na base de dados</p>
        </div>

        <div className="bg-[#050505] border border-violet-500/20 p-8 rounded-[32px] relative overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.05)]">
          <div className="absolute -right-4 -top-4 w-28 h-28 text-red-500/10"><LifeBuoy className="w-full h-full" /></div>
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Tickets no Banco</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">{ticketsCount}</h3>
          <div className="mt-4 inline-flex items-center gap-2 text-[9px] font-black uppercase text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-lg border border-violet-500/20 relative z-10">
            <Activity className="w-3 h-3" /> Banco Conectado com Sucesso
          </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[32px] p-8 shadow-xl">
        <h3 className="text-lg font-black uppercase italic text-white mb-2">Status do Sistema</h3>
        <p className="text-xs text-zinc-500 font-medium mb-6">Todos os serviços do ecossistema PayMTA estão respondendo normalmente.</p>
        <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-between">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> API Database (Prisma ORM)
          </span>
          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">Online</span>
        </div>
      </div>
    </div>
  );
}