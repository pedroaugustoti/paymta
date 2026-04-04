"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CreditCard, 
  Package, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Users, 
  Zap, 
  Search,
  Bell,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 flex font-sans">
      
      {/* 1. SIDEBAR (Fixa na esquerda) */}
      <aside className="w-64 border-r border-white/5 hidden lg:flex flex-col p-6 sticky top-0 h-screen bg-[#050505]">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-xs">P</div>
          <span className="text-xl font-black text-white tracking-tighter">PayMTA</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={18} />} label="Visão Geral" active />
          <SidebarLink icon={<CreditCard size={18} />} label="Transações" />
          <SidebarLink icon={<Package size={18} />} label="Meus Pacotes" />
          <SidebarLink icon={<Zap size={18} />} label="Integração (API)" />
          <SidebarLink icon={<Settings size={18} />} label="Configurações" />
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button className="flex items-center gap-3 text-sm font-bold text-zinc-500 hover:text-red-400 transition-colors px-2 w-full">
            <LogOut size={18} /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        
        {/* Header do Dashboard */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Dashboard</h1>
            <p className="text-zinc-500 text-sm font-medium">Bem-vindo de volta, <span className="text-zinc-300">Augustinho</span>.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text" 
                placeholder="Buscar transação..." 
                className="bg-[#09090b] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs w-64 focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
            </div>
            <button className="w-10 h-10 rounded-xl bg-[#09090b] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10" />
          </div>
        </header>

        {/* Grid de Métricas (Stats) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <StatCard title="Faturamento Total" value="R$ 1.450,00" icon={<TrendingUp className="text-emerald-500" />} percent="+12%" />
          <StatCard title="Vendas Hoje" value="14" icon={<CreditCard className="text-yellow-400" />} percent="+5" />
          <StatCard title="Jogadores Ativos" value="128" icon={<Users className="text-blue-400" />} />
          <StatCard title="Status do Script" value="Online" icon={<CheckCircle2 className="text-emerald-400" />} status />
        </div>

        {/* Seção de Transações Recentes */}
        <div className="bg-[#09090b] border border-white/5 rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white">Transações Recentes</h3>
            <Button variant="link" className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Ver Todas</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 border-b border-white/5">
                  <th className="pb-4 font-black">Jogador</th>
                  <th className="pb-4 font-black">Pacote</th>
                  <th className="pb-4 font-black">Data</th>
                  <th className="pb-4 font-black text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                <TransactionRow name="PedroAugusto" pack="VIP Diamante (30 dias)" date="Hoje, 14:20" price="R$ 89,00" />
                <TransactionRow name="Dante_RP" pack="100k Dinheiro Sujo" date="Hoje, 12:05" price="R$ 25,00" />
                <TransactionRow name="Neymar_Junior" pack="VIP Ouro (30 dias)" date="Ontem, 23:50" price="R$ 49,00" />
                <TransactionRow name="Skinny_MTA" pack="Unban Global" date="Ontem, 20:15" price="R$ 120,00" />
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

function SidebarLink({ icon, label, active = false }: any) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
      active ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/10" : "text-zinc-500 hover:text-white hover:bg-white/5"
    }`}>
      {icon}
      {label}
    </a>
  );
}

function StatCard({ title, value, icon, percent, status }: any) {
  return (
    <div className="bg-[#09090b] border border-white/5 p-6 rounded-[24px] hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        {percent && (
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
            {percent}
          </span>
        )}
      </div>
      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-1">{title}</p>
      <h4 className={`text-2xl font-black text-white tracking-tight ${status ? "text-emerald-400" : ""}`}>
        {value}
      </h4>
    </div>
  );
}

function TransactionRow({ name, pack, date, price }: any) {
  return (
    <tr className="border-b border-white/5 last:border-0 group">
      <td className="py-5 font-bold text-zinc-300">{name}</td>
      <td className="py-5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">{pack}</span>
        </div>
      </td>
      <td className="py-5 text-zinc-600 text-xs font-bold">{date}</td>
      <td className="py-5 text-right font-black text-white">{price}</td>
    </tr>
  );
}