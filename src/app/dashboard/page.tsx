"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Palette, Zap, Package, 
<<<<<<< HEAD
  ReceiptText, ArrowRight, DollarSign, 
  TrendingUp, Activity, ShieldCheck,
  ExternalLink, Loader2, MousePointer2
} from "lucide-react";
import { motion } from "framer-motion";

=======
  ReceiptText, ArrowRight, TrendingUp, Activity, 
  ShieldCheck, Loader2, MousePointer2
} from "lucide-react";
import { motion } from "framer-motion";

// --- DADOS DE TESTE (MOCK) PARA AMBIENTE LOCAL ---
const MOCK_STATS = {
  totalRevenue: 15420.50,
  salesToday: 450.00,
  activeProducts: 12,
  pendingOrders: 3
};

>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
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
<<<<<<< HEAD
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
=======
        // Tenta buscar os dados reais da sua API
        const res = await fetch("/api/dashboard/stats");
        
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          // Se a API não responder (comum no localhost), usa os dados de teste
          setStats(MOCK_STATS);
        }
      } catch (err) {
        // Fallback de segurança para não travar no loading em dev
        setStats(MOCK_STATS);
      } finally {
        // Pequeno delay apenas para o efeito visual do loader não ser brusco
        setTimeout(() => setLoading(false), 800);
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
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
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.3em]">Iniciando Sistemas de Comando...</span>
=======
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-yellow-400" />
      </motion.div>
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.3em] animate-pulse">
        Sincronizando Banco de Dados...
      </span>
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
=======
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
      
      {/* BOAS VINDAS */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <LayoutDashboard className="w-4 h-4" />
<<<<<<< HEAD
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
=======
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ambiente de Comando</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Painel <span className="text-yellow-400">PayMTA</span>
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm font-medium mt-1">Status operacional: <span className="text-emerald-500 font-bold">Totalmente Funcional</span>.</p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SaaS Cloud Online</span>
        </div>
      </header>

      {/* METRICAS PRINCIPAIS - Otimizado: 2 colunas no mobile, 4 no desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard label="Vendas Hoje" value={`R$ ${stats.salesToday.toFixed(2)}`} icon={<Activity />} />
        <MetricCard label="Receita Total" value={`R$ ${stats.totalRevenue.toFixed(2)}`} icon={<TrendingUp />} color="text-emerald-500" />
        <MetricCard label="Itens Ativos" value={stats.activeProducts.toString()} icon={<Package />} />
        <MetricCard label="Pendentes" value={stats.pendingOrders.toString()} icon={<ReceiptText />} color="text-amber-500" />
      </div>

      {/* NAVEGAÇÃO RÁPIDA */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <MousePointer2 className="w-4 h-4 text-zinc-600" />
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Módulos de Gestão</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuCards.map((card, idx) => (
            <Link href={card.path} key={idx} className="group">
              <div className="bg-[#050505] border border-white/5 p-6 md:p-8 rounded-[32px] md:rounded-[40px] h-full hover:border-white/20 transition-all shadow-xl hover:shadow-yellow-500/5 flex flex-col items-start gap-4 active:scale-95">
                <div className={`p-3 md:p-4 rounded-2xl ${card.bg} ${card.color}`}>
                  <card.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-black italic uppercase text-white group-hover:text-yellow-500 transition-colors tracking-tight">
                    {card.title}
                  </h4>
                  <p className="text-zinc-500 text-[11px] md:text-xs mt-1 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase italic group-hover:text-zinc-400">
                  Gerenciar <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* FOOTER TÉCNICO */}
      <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-10 border-t border-white/5">
         <FooterInfoCard 
            icon={<ShieldCheck className="text-emerald-500" />} 
            title="Protocolo de Segurança" 
            text="Autenticação via JWT e criptografia de ponta a ponta com Supabase Auth." 
         />
         <FooterInfoCard 
            icon={<TrendingUp className="text-blue-500" />} 
            title="Performance Global" 
            text="Edge Runtime ativo. Tempo de resposta da API otimizado para < 50ms." 
         />
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTES PARA ORGANIZAÇÃO ---

function MetricCard({ label, value, icon, color = "text-white" }: any) {
  return (
    <div className="bg-[#050505] border border-white/5 p-5 md:p-8 rounded-[24px] md:rounded-[32px] relative overflow-hidden group">
      <div className="absolute -right-2 -top-2 w-16 h-16 text-white/5 opacity-20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest">{label}</p>
      <h3 className={`text-xl md:text-3xl font-black italic tracking-tighter ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function FooterInfoCard({ icon, title, text }: any) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white/[0.02] rounded-3xl border border-white/5">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</p>
        <p className="text-[11px] md:text-xs text-zinc-600 leading-relaxed mt-1 font-medium">{text}</p>
      </div>
    </div>
  );
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
}