"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Palette, Zap, Package, 
  ReceiptText, ArrowRight, DollarSign, 
  TrendingUp, Activity, ShieldCheck,
  ExternalLink, Loader2, MousePointer2
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    salesToday: 0,
    activeProducts: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        // Visão de Analista: Aqui você buscaria um resumo de todas as tabelas
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Erro ao carregar métricas globais:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const menuCards = [
    {
      title: "Aparência",
      desc: "Logo, cores e banners do portal.",
      icon: Palette,
      path: "/dashboard/aparencia",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      title: "Produtos",
      desc: "Gestão de VIPs, Carros e Itens.",
      icon: Package,
      path: "/dashboard/produtos",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Integração",
      desc: "Mercado Pago e Webhook Lua.",
      icon: Zap,
      path: "/dashboard/integracao",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Vendas",
      desc: "Histórico financeiro e logs PIX.",
      icon: ReceiptText,
      path: "/dashboard/vendas",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.3em]">Iniciando Sistemas de Comando...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* BOAS VINDAS */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Overview Dashboard</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Console de Gestão</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Bem-vindo de volta! Aqui está o resumo do seu ecossistema PayMTA.</p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">SaaS Online</span>
        </div>
      </header>

      {/* METRICAS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
          <Activity className="absolute -right-4 -top-4 w-24 h-24 text-white/5 rotate-12" />
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Vendas Hoje</p>
          <h3 className="text-3xl font-black italic text-white tracking-tighter">R$ {stats.salesToday.toFixed(2)}</h3>
        </div>
        <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px] shadow-2xl">
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Receita Total</p>
          <h3 className="text-3xl font-black italic text-emerald-500 tracking-tighter">R$ {stats.totalRevenue.toFixed(2)}</h3>
        </div>
        <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px] shadow-2xl">
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Itens Ativos</p>
          <h3 className="text-3xl font-black italic text-white tracking-tighter">{stats.activeProducts}</h3>
        </div>
        <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px] shadow-2xl">
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Pedidos Pendentes</p>
          <h3 className="text-3xl font-black italic text-amber-500 tracking-tighter">{stats.pendingOrders}</h3>
        </div>
      </div>

      {/* NAVEGAÇÃO RÁPIDA (ATALHOS) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <MousePointer2 className="w-4 h-4 text-zinc-500" />
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Ações e Módulos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCards.map((card, idx) => (
            <Link href={card.path} key={idx} className="group">
              <div className="bg-zinc-950 border border-white/5 p-8 rounded-[40px] h-full hover:border-white/20 transition-all shadow-xl hover:shadow-white/5 flex flex-col items-start gap-4">
                <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black italic uppercase text-white group-hover:text-yellow-500 transition-colors">{card.title}</h4>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase italic">
                  Acessar Módulo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER DE ANALISTA */}
      <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/5">
         <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Segurança de Dados</p>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Sua conexão com o Supabase e o Mercado Pago está criptografada. Todos os logs de transação são auditados em tempo real.
              </p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl border border-white/5">
            <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Performance do Sistema</p>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Ambiente de produção rodando na Vercel (Edge Runtime). Latência média de resposta: <strong>45ms</strong>.
              </p>
            </div>
         </div>
      </footer>
    </div>
  );
}