"use client";

import { useState, useEffect } from "react";
import { 
  LifeBuoy, MessageSquare, Plus, 
  Disc as Discord, Clock, CheckCircle2, 
  AlertCircle, Search, ArrowRight, X, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader"; // Usando nosso novo componente!

// Tipagem de dados
interface Ticket {
  id: string;
  subject: string;
  department: string;
  status: 'open' | 'progress' | 'closed';
  createdAt: string;
  lastReply: string;
}

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [form, setForm] = useState({ subject: "", department: "financeiro", message: "" });

  useEffect(() => {
    // Simulação de chamada de API
    setTimeout(() => {
      setTickets([
        { id: "TK-9021", subject: "Problema com repasse do Mercado Pago", department: "Financeiro", status: "open", createdAt: new Date().toISOString(), lastReply: "Aguardando Suporte" },
        { id: "TK-8834", subject: "Dúvida sobre a License Key", department: "Técnico", status: "closed", createdAt: new Date(Date.now() - 86400000).toISOString(), lastReply: "Resolvido" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ticket criado com sucesso! (Integração API em breve)");
    setIsModalOpen(false);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'open': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'closed': return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Carregando Central de Ajuda...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      <PageHeader 
        title="Central de Suporte"
        subtitle="Abra chamados para nossa equipe ou conecte-se à nossa comunidade."
        category="Atendimento e Ajuda"
        categoryColor="text-indigo-500"
        icon={<LifeBuoy className="w-4 h-4" />}
        actionButton={{
          label: "NOVO TICKET",
          icon: <Plus className="w-5 h-5" />,
          onClick: () => setIsModalOpen(true),
          colorClass: "bg-indigo-600 hover:bg-indigo-700 text-white"
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LISTA DE TICKETS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-zinc-950 p-4 rounded-3xl border border-white/5">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" placeholder="Buscar ticket pelo assunto ou ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none py-2 pl-12 pr-4 text-sm focus:outline-none text-white placeholder:text-zinc-600 font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-zinc-950/50 border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">{ticket.id}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{ticket.department}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">{ticket.subject}</h3>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Atualizado hoje • {ticket.lastReply}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase italic border flex items-center gap-2 ${getStatusStyle(ticket.status)}`}>
                    {ticket.status === 'open' && <AlertCircle className="w-3 h-3" />}
                    {ticket.status === 'closed' && <CheckCircle2 className="w-3 h-3" />}
                    {ticket.status === 'open' ? 'Aberto' : ticket.status === 'progress' ? 'Em Análise' : 'Fechado'}
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR COMUNIDADE / DISCORD */}
        <div className="space-y-6">
          <div className="bg-[#5865F2]/10 border border-[#5865F2]/20 p-8 rounded-[32px] text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(88,101,242,0.4)]">
              <Discord className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-black italic uppercase text-white">Comunidade VIP</h3>
            <p className="text-xs text-[#5865F2] leading-relaxed font-medium pb-4">
              Precisa de ajuda rápida? Entre no nosso Discord oficial de vendas e suporte para falar diretamente com a equipe técnica.
            </p>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-6 rounded-2xl transition-all shadow-lg shadow-[#5865F2]/20">
              ENTRAR NO DISCORD
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL DE NOVO TICKET */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Abrir Chamado</h2>
                  <p className="text-zinc-500 text-sm mt-1">Nossa equipe responderá em até 24 horas.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Assunto da Solicitação</label>
                  <input required type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500 outline-none text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Departamento</label>
                  <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500 outline-none text-zinc-300">
                    <option value="financeiro">Dúvidas Financeiras / Pagamentos</option>
                    <option value="tecnico">Suporte Técnico / Bugs in-game</option>
                    <option value="sugestao">Sugestões e Melhorias</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Mensagem Detalhada</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500 outline-none text-zinc-300 resize-none" />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-8 rounded-[24px] text-lg uppercase italic transition-all">
                  ENVIAR SOLICITAÇÃO
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}