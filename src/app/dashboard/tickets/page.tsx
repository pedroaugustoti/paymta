"use client";

import { useState, useEffect } from "react";
import { 
  LifeBuoy, Search, Plus, 
  Disc as Discord, Clock, CheckCircle2, 
  AlertCircle, ArrowRight, X, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader";

// Tipagem de dados
interface Ticket {
  id: string;
  subject: string;
  department: string;
  status: 'open' | 'progress' | 'closed';
  createdAt: string;
  lastReply: string;
}

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<ToastProps | null>(null);
  
  const [form, setForm] = useState({ subject: "", department: "financeiro", message: "" });

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    // Simulação de chamada de API para carregar os tickets
    const timer = setTimeout(() => {
      setTickets([
        { id: "TK-9021", subject: "Problema com repasse do Mercado Pago", department: "Financeiro", status: "open", createdAt: new Date().toISOString(), lastReply: "Aguardando Suporte" },
        { id: "TK-8834", subject: "Dúvida sobre a License Key", department: "Técnico", status: "closed", createdAt: new Date(Date.now() - 86400000).toISOString(), lastReply: "Resolvido" }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulação de envio para a API
    setTimeout(() => {
      showToast("Chamado aberto com sucesso! Nossa equipe responderá em breve.", "success");
      setIsModalOpen(false);
      setForm({ subject: "", department: "financeiro", message: "" });
      setIsSaving(false);
    }, 1200);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'open': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'closed': return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500 transform-gpu" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-widest">Carregando Central de Ajuda...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu relative">
      
      {/* TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }} 
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm tracking-wide ${
              toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" : 
              toast.type === "warning" ? "bg-amber-950/90 border-amber-500/30 text-amber-400" :
              "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
            {toast.type === "warning" && <AlertCircle className="w-5 h-5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

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
          colorClass: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20"
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LISTA DE TICKETS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-[#0a0a0a] p-2 rounded-2xl border border-white/5 shadow-inner">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Buscar ticket pelo assunto ou ID..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm focus:outline-none text-white font-medium transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col sm:flex-row justify-between sm:items-center gap-4 transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 bg-white/5 px-2 py-1 rounded shadow-inner border border-white/5">{ticket.id}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{ticket.department}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors">{ticket.subject}</h3>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3 h-3" /> Atualizado hoje <span className="text-zinc-700">•</span> {ticket.lastReply}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase italic border flex items-center gap-2 ${getStatusStyle(ticket.status)}`}>
                    {ticket.status === 'open' && <AlertCircle className="w-3 h-3" />}
                    {ticket.status === 'closed' && <CheckCircle2 className="w-3 h-3" />}
                    {ticket.status === 'open' ? 'Aberto' : ticket.status === 'progress' ? 'Em Análise' : 'Fechado'}
                  </div>
                  <div className="p-2 bg-white/5 rounded-xl text-zinc-600 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-transparent group-hover:border-indigo-500/20">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-black/20 rounded-[32px] border-2 border-dashed border-white/5">
                <LifeBuoy className="w-10 h-10 text-zinc-800 mb-4" />
                <p className="text-zinc-500 text-sm font-medium">Nenhum ticket encontrado com essa busca.</p>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR COMUNIDADE / DISCORD */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#5865F2]/10 to-transparent border border-[#5865F2]/20 p-8 rounded-[32px] text-center space-y-4 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,101,242,0.15),_transparent_70%)] pointer-events-none" />
            
            <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(88,101,242,0.4)] relative z-10 transform-gpu group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Discord className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-black italic uppercase text-white mb-2 tracking-tight">Comunidade VIP</h3>
              <p className="text-xs text-indigo-200/60 leading-relaxed font-medium pb-6">
                Precisa de ajuda rápida? Entre no nosso Discord oficial de vendas e suporte para falar diretamente com a equipe técnica.
              </p>
              <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-[#5865F2]/20 uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transform-gpu active:scale-95">
                ENTRAR NO DISCORD <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE NOVO TICKET */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* HEADER MODAL */}
              <div className="p-8 pb-6 border-b border-white/5 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white">Abrir Chamado</h2>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Nossa equipe responderá em até 24 horas.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BODY FORMULÁRIO */}
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 p-8">
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Assunto da Solicitação</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Resuma o seu problema..."
                      value={form.subject} 
                      onChange={e => setForm({...form, subject: e.target.value})} 
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500/50 outline-none text-white font-bold transition-colors shadow-inner" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Departamento</label>
                    <select 
                      value={form.department} 
                      onChange={e => setForm({...form, department: e.target.value})} 
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500/50 outline-none text-zinc-300 appearance-none shadow-inner cursor-pointer"
                    >
                      <option value="financeiro">Dúvidas Financeiras / Pagamentos</option>
                      <option value="tecnico">Suporte Técnico / Bugs in-game</option>
                      <option value="sugestao">Sugestões e Melhorias</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Mensagem Detalhada</label>
                    <textarea 
                      required 
                      rows={5} 
                      placeholder="Descreva todos os detalhes possíveis para agilizar o suporte..."
                      value={form.message} 
                      onChange={e => setForm({...form, message: e.target.value})} 
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-indigo-500/50 outline-none text-zinc-300 resize-none shadow-inner transition-colors" 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl text-[11px] shadow-xl shadow-indigo-500/20 uppercase tracking-widest italic transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "ENVIAR SOLICITAÇÃO"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}