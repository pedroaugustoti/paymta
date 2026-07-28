"use client";

import { useState, useEffect } from "react";
import { 
  LifeBuoy, Search, Plus, 
  Disc as Discord, Clock, CheckCircle2, 
  AlertCircle, ArrowRight, X, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader";

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
  
  const [form, setForm] = useState({ subject: "", department: "Financeiro", message: "" });

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error("Erro ao carregar tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast("Chamado aberto com sucesso!", "success");
        setIsModalOpen(false);
        setForm({ subject: "", department: "Financeiro", message: "" });
        fetchTickets(); // Recarrega a lista do banco
      } else {
        throw new Error();
      }
    } catch {
      showToast("Erro ao abrir chamado. Tente novamente.", "error");
    } finally {
      setIsSaving(false);
    }
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
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-widest">Conectando ao Banco de Dados...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu relative">
      
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} 
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm tracking-wide ${
              toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" : "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader 
        title="Central de Suporte"
        subtitle="Abra chamados para nossa equipe ou acompanhe o status em tempo real."
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
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-[#0a0a0a] p-2 rounded-2xl border border-white/5 shadow-inner">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Buscar ticket pelo assunto ou ID..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm focus:outline-none text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">{ticket.id}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{ticket.department}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-200">{ticket.subject}</h3>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3 h-3" /> Criado em {new Date(ticket.createdAt).toLocaleDateString()} <span className="text-zinc-700">•</span> {ticket.lastReply}
                  </p>
                </div>
                
                <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase italic border flex items-center gap-2 w-fit ${getStatusStyle(ticket.status)}`}>
                  {ticket.status === 'open' ? 'Aberto' : ticket.status === 'progress' ? 'Em Análise' : 'Fechado'}
                </div>
              </div>
            )) : (
              <div className="py-20 flex flex-col items-center justify-center text-center bg-black/20 rounded-[32px] border-2 border-dashed border-white/5">
                <LifeBuoy className="w-10 h-10 text-zinc-800 mb-4" />
                <p className="text-zinc-500 text-sm font-medium">Nenhum ticket encontrado no banco de dados.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#5865F2]/10 to-transparent border border-[#5865F2]/20 p-8 rounded-[32px] text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Discord className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-black italic uppercase text-white mb-2">Comunidade VIP</h3>
            <p className="text-xs text-indigo-200/60 leading-relaxed font-medium pb-6">
              Entre no nosso Discord oficial para suporte rápido e integração direta com os desenvolvedores.
            </p>
            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-4 rounded-2xl transition-all shadow-lg uppercase tracking-widest text-[11px] flex items-center justify-center gap-2">
              ENTRAR NO DISCORD <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-8 pb-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-2xl font-black italic uppercase text-white">Abrir Chamado</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-full text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-8">
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Assunto</label>
                    <input required type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Departamento</label>
                    <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-zinc-300 outline-none">
                      <option value="Financeiro">Financeiro / Pagamentos</option>
                      <option value="Técnico">Suporte Técnico / Core</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Mensagem</label>
                    <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-zinc-300 resize-none outline-none" />
                  </div>
                  <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "ENVIAR SOLICITAÇÃO"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}