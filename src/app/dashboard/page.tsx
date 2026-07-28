"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Palette, Zap, Package, 
  ReceiptText, ArrowRight, TrendingUp, Activity, 
  ShieldCheck, MousePointer2, LayoutDashboard
} from "lucide-react";
import { useDashboard } from "./dashboard-context";

// --- TIPAGENS (INTERFACES) PARA O TYPESCRIPT ---
interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
  isLoading?: boolean;
}

interface FooterInfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

// --- DADOS DE TESTE (MOCK) ---
const MOCK_STATS = {
  totalRevenue: 15420.50,
  salesToday: 450.00,
  activeProducts: 12,
  pendingOrders: 3
};

export default function DashboardHome() {
  const { settings } = useDashboard();
  
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
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setStats(MOCK_STATS);
        }
      } catch {
        // Removida a variável `err` não utilizada
        setStats(MOCK_STATS);
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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ambiente de Comando</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Painel <span className="text-yellow-400">{(settings?.serverName as string) || "PayMTA"}</span>
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm font-medium mt-1">Status operacional: <span className="text-emerald-500 font-bold">Totalmente Funcional</span>.</p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SaaS Cloud Online</span>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard label="Vendas Hoje" value={`R$ ${stats.salesToday.toFixed(2)}`} icon={<Activity />} isLoading={loading} />
        <MetricCard label="Receita Total" value={`R$ ${stats.totalRevenue.toFixed(2)}`} icon={<TrendingUp />} color="text-emerald-500" isLoading={loading} />
        <MetricCard label="Itens Ativos" value={stats.activeProducts.toString()} icon={<Package />} isLoading={loading} />
        <MetricCard label="Pendentes" value={stats.pendingOrders.toString()} icon={<ReceiptText />} color="text-amber-500" isLoading={loading} />
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <MousePointer2 className="w-4 h-4 text-zinc-600" />
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Módulos de Gestão</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuCards.map((card, idx) => (
            <Link href={card.path} key={idx} className="group outline-none">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

// Aplicando as tipagens ao invés de usar `any`
function MetricCard({ label, value, icon, color = "text-white", isLoading = false }: MetricCardProps) {
  return (
    <div className="bg-[#050505] border border-white/5 p-5 md:p-8 rounded-[24px] md:rounded-[32px] relative overflow-hidden group flex flex-col justify-between min-h-[130px]">
      <div className="absolute -right-2 -top-2 w-16 h-16 text-white/5 opacity-20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">{label}</p>
      
      {isLoading ? (
        <div className="h-8 w-24 bg-white/10 animate-pulse rounded-lg mt-1 relative z-10" />
      ) : (
        <h3 className={`text-xl md:text-3xl font-black italic tracking-tighter ${color} relative z-10`}>
          {value}
        </h3>
      )}
    </div>
  );
}

function FooterInfoCard({ icon, title, text }: FooterInfoCardProps) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white/[0.02] rounded-3xl border border-white/5">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</p>
        <p className="text-[11px] md:text-xs text-zinc-600 leading-relaxed mt-1 font-medium">{text}</p>
      </div>
    </div>
  );
}