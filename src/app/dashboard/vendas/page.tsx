"use client";

import { useState, useEffect } from "react";
import { 
  ReceiptText, Search, 
  CheckCircle2, Clock, 
  DollarSign, TrendingUp, Users,
  ArrowUpRight, Download, Loader2, ListOrdered
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

// Tipagem rigorosa
interface VendaUser {
  name: string;
}

interface Venda {
  id: string;
  amount: number;
  status: "approved" | "pending" | "rejected" | string;
  createdAt: string;
  user: VendaUser;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await fetch("/api/sales");
        if (res.ok) {
          const data = await res.json();
          setSales(data);
        }
      } catch (err) {
        console.error("Erro ao carregar vendas:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSales();
  }, []);

  const totalRevenue = sales
    .filter(s => s.status === "approved")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCount = sales.filter(s => s.status === "pending").length;

  const filteredSales = sales.filter(sale => 
    sale.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500 transform-gpu" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Processando Transações...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu">
      
      <PageHeader 
        title="Vendas & Pedidos"
        subtitle="Monitore em tempo real todos os pagamentos via PIX processados pelo Mercado Pago."
        category="Fluxo de Caixa"
        categoryColor="text-emerald-500"
        icon={<ReceiptText className="w-4 h-4" />}
      />

      {/* CARDS DE RESUMO (Métricas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group hover:border-emerald-500/30 transition-colors transform-gpu shadow-lg">
          <DollarSign className="absolute -right-4 -top-4 w-28 h-28 text-emerald-500/10 rotate-12 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 transform-gpu" />
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Faturamento Aprovado</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">R$ {totalRevenue.toFixed(2)}</h3>
          <div className="mt-6 flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase italic bg-emerald-500/10 w-fit px-3 py-1.5 rounded-lg border border-emerald-500/20 relative z-10">
            <TrendingUp className="w-3 h-3" /> Consolidado Cloud
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group hover:border-amber-500/30 transition-colors transform-gpu shadow-lg">
          <Clock className="absolute -right-4 -top-4 w-28 h-28 text-amber-500/10 rotate-12 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 transform-gpu" />
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Pedidos Pendentes</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">{pendingCount}</h3>
          <p className="mt-6 text-[10px] text-zinc-400 font-bold uppercase italic relative z-10">Aguardando compensação do PIX</p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group hover:border-blue-500/30 transition-colors transform-gpu shadow-lg">
          <Users className="absolute -right-4 -top-4 w-28 h-28 text-blue-500/10 rotate-12 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 transform-gpu" />
          <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest relative z-10">Total de Clientes</p>
          <h3 className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter relative z-10">{sales.length}</h3>
          <p className="mt-6 text-[10px] text-zinc-400 font-bold uppercase italic relative z-10">Histórico total de cadastros</p>
        </div>
      </div>

      <SectionCard 
        title="Histórico Recente" 
        subtitle="Registro completo de transações"
        icon={<ListOrdered className="w-6 h-6" />}
        iconColorClass="bg-emerald-500/10 text-emerald-500"
        headerAction={
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Buscar por Nickname ou ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:border-emerald-500/50 outline-none text-white font-medium transition-colors"
            />
          </div>
        }
      >
        <div className="overflow-x-auto bg-[#0a0a0a] rounded-[24px] border border-white/5 shadow-inner">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">ID Pedido</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Jogador</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Valor</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Data/Hora</th>
                <th className="p-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-[11px] font-mono font-bold text-zinc-500">#{sale.id.slice(-6).toUpperCase()}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] font-black text-white italic border border-white/5 shadow-inner">
                        {sale.user?.name?.substring(0, 2).toUpperCase() || "MT"}
                      </div>
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{sale.user?.name || "Desconhecido"}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-black text-emerald-400 italic">R$ {sale.amount.toFixed(2)}</span>
                  </td>
                  <td className="p-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase italic border ${
                      sale.status === "approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      sale.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}>
                      {sale.status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {sale.status === "approved" ? "Aprovado" : "Pendente"}
                    </div>
                  </td>
                  <td className="p-5 text-[11px] font-medium text-zinc-500">
                    {new Date(sale.createdAt).toLocaleDateString("pt-BR")} <span className="text-zinc-700 px-1">•</span> {new Date(sale.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-5 text-center">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10 transform-gpu active:scale-95">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSales.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                <ReceiptText className="w-8 h-8 text-zinc-700" />
              </div>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="flex items-start gap-4 p-6 bg-blue-500/5 rounded-[32px] border border-blue-500/10 hover:border-blue-500/20 transition-colors">
        <div className="p-3 bg-blue-500/10 rounded-2xl">
          <Download className="w-5 h-5 text-blue-500 shrink-0" />
        </div>
        <div>
          <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-2">Relatório de Analista</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            As vendas são sincronizadas via <strong className="text-zinc-300">IPN (Instant Payment Notification)</strong>. Caso um pagamento seja aprovado no Mercado Pago mas continue como "Pendente" aqui, verifique os logs do seu Webhook na aba de Integrações.
          </p>
        </div>
      </div>
    </div>
  );
}