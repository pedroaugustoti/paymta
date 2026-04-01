"use client";

import { ArrowDownToLine, Search, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendasPage() {
  // Mock data simulando o retorno do nosso banco de dados
  const transacoes = [
    { id: "TX-9871", jogador: "GamerPro99", item: "VIP Diamante", valor: "R$ 89,90", data: "Hoje, 14:32", status: "Aprovado" },
    { id: "TX-9870", jogador: "ZezinSniper", item: "100k Dinheiro", valor: "R$ 15,00", data: "Hoje, 11:15", status: "Aprovado" },
    { id: "TX-9869", jogador: "LucasMTA", item: "Carro Exclusivo", valor: "R$ 45,00", data: "Ontem, 22:40", status: "Pendente" },
    { id: "TX-9868", jogador: "AnaClara", item: "VIP Ouro", valor: "R$ 49,90", data: "Ontem, 19:10", status: "Aprovado" },
    { id: "TX-9867", jogador: "FelipeBR", item: "Desbanimento", valor: "R$ 30,00", data: "12 Mar, 08:22", status: "Recusado" },
    { id: "TX-9866", jogador: "MTA_Lover", item: "VIP Prata", valor: "R$ 29,90", data: "11 Mar, 15:45", status: "Aprovado" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Pendente":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Recusado":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado": return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Pendente": return <Clock className="w-3.5 h-3.5" />;
      case "Recusado": return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Histórico de Vendas</h1>
          <p className="text-zinc-400 font-medium">Acompanhe todos os PIX recebidos e entregas no servidor.</p>
        </div>
        <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-5 rounded-xl transition-all flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Barra de Ferramentas (Filtros e Busca) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por jogador, ID da transação ou item..." 
            className="w-full bg-zinc-900/50 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-white font-medium text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>
        <Button variant="outline" className="bg-zinc-900/50 border-white/5 text-zinc-300 hover:text-white hover:bg-white/5 py-6 px-6 rounded-xl flex items-center gap-2 font-bold">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Tabela de Dados */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-black/40 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                <th className="px-6 py-5">Transação</th>
                <th className="px-6 py-5">Jogador (MTA)</th>
                <th className="px-6 py-5">Item / Pacote</th>
                <th className="px-6 py-5">Valor</th>
                <th className="px-6 py-5">Data e Hora</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transacoes.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-zinc-400 group-hover:text-yellow-400 transition-colors">{tx.id}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{tx.jogador}</td>
                  <td className="px-6 py-4 text-zinc-300 font-medium">{tx.item}</td>
                  <td className="px-6 py-4 font-black text-white">{tx.valor}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{tx.data}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(tx.status)}`}>
                      {getStatusIcon(tx.status)}
                      {tx.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginação Simples */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-zinc-500 font-medium">
          <span>Mostrando 1 a 6 de 148 transações</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/5 bg-transparent text-zinc-400 hover:text-white" disabled>Anterior</Button>
            <Button variant="outline" size="sm" className="border-white/5 bg-white/5 text-white hover:bg-white/10">Próxima</Button>
          </div>
        </div>
      </div>
    </div>
  );
}