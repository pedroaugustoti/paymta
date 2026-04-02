"use client";

import { useState, useEffect } from "react";
import { 
  ReceiptText, Search, Filter, 
  CheckCircle2, Clock, XCircle, 
  DollarSign, TrendingUp, Users,
  ArrowUpRight, Download, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Venda {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
  };
  // Adicione aqui se tiver relação com o produto comprado
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

  // Visão de Analista: Cálculos rápidos para os cards de KPI
  const totalRevenue = sales
    .filter(s => s.status === "approved")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCount = sales.filter(s => s.status === "pending").length;

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Processando Transações...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER E MÉTRICAS RÁPIDAS */}
      <header className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <ReceiptText className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Fluxo de Caixa</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Vendas & Pedidos</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Monitore em tempo real todos os pagamentos via PIX processados pelo Mercado Pago.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[32px] relative overflow-hidden group">
            <DollarSign className="absolute -right-4 -top-4 w-24 h-24 text-emerald-500/10 rotate-12 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Faturamento Aprovado</p>
            <h3 className="text-3xl font-black italic text-white tracking-tighter">R$ {totalRevenue.toFixed(2)}</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase italic">
              <TrendingUp className="w-3 h-3" /> +12% em relação a ontem
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[32px] relative overflow-hidden group">
            <Clock className="absolute -right-4 -top-4 w-24 h-24 text-amber-500/10 rotate-12 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Pedidos Pendentes</p>
            <h3 className="text-3xl font-black italic text-white tracking-tighter">{pendingCount}</h3>
            <p className="mt-4 text-[10px] text-zinc-500 font-bold uppercase italic">Aguardando compensação do PIX</p>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[32px] relative overflow-hidden group">
            <Users className="absolute -right-4 -top-4 w-24 h-24 text-blue-500/10 rotate-12 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Total de Clientes</p>
            <h3 className="text-3xl font-black italic text-white tracking-tighter">{sales.length}</h3>
            <p className="mt-4 text-[10px] text-zinc-500 font-bold uppercase italic">Histórico total de cadastros</p>
          </div>
        </div>
      </header>

      {/* TABELA DE VENDAS */}
      <section className="bg-zinc-950/50 border border-white/5 rounded-[40px] shadow-2xl backdrop-blur-sm overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-black italic uppercase text-white tracking-tighter">Histórico Recente</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Buscar por Nickname..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-emerald-500 outline-none text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">ID Pedido</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Jogador</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Valor</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Data/Hora</th>
                <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 text-[11px] font-mono text-zinc-400">#{sale.id.slice(-6).toUpperCase()}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black text-white italic">
                        {sale.user?.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-white">{sale.user?.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-black text-white italic">R$ {sale.amount.toFixed(2)}</span>
                  </td>
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase italic border ${
                      sale.status === "approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      sale.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}>
                      {sale.status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {sale.status === "approved" ? "Aprovado" : "Pendente"}
                    </div>
                  </td>
                  <td className="p-6 text-[11px] text-zinc-500">
                    {new Date(sale.createdAt).toLocaleDateString("pt-BR")} às {new Date(sale.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-6 text-center">
                    <button className="p-2 hover:bg-white/10 rounded-xl text-zinc-500 hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sales.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <ReceiptText className="w-12 h-12 text-zinc-800 mx-auto" />
            <p className="text-zinc-500 font-medium italic text-sm">Nenhuma venda registrada até o momento. Divulgue sua loja!</p>
          </div>
        )}
      </section>

      {/* DICA TÉCNICA */}
      <div className="flex items-start gap-4 p-6 bg-blue-500/5 rounded-[32px] border border-blue-500/10">
        <Download className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
        <div>
          <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest">Relatório de Analista</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">
            As vendas são sincronizadas via <strong>IPN (Instant Payment Notification)</strong>. Caso um pagamento seja aprovado no Mercado Pago mas continue como "Pendente" aqui, verifique os logs do seu Webhook na aba de Integrações.
          </p>
        </div>
      </div>
    </div>
  );
}