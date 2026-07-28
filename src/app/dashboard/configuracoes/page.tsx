"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Globe, ShieldAlert, Save, 
  Loader2, CheckCircle2, AlertCircle, 
  Link as LinkIcon, Server, Power
} from "lucide-react";
import { useDashboard } from "../dashboard-context";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

export default function GeneralSettingsPage() {
  const { settings, refreshSettings } = useDashboard();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  
  const [form, setForm] = useState({
    slug: "",
    serverIp: "",
    isMaintenance: false,
    termsContent: "",
  });

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Preenche o formulário assim que os dados globais estiverem disponíveis em memória
  useEffect(() => {
    if (settings) {
      setForm({
        slug: (settings.slug as string) || "",
        serverIp: (settings.serverIp as string) || "",
        isMaintenance: (settings.isMaintenance as boolean) || false,
        termsContent: (settings.termsContent as string) || "",
      });
    }
  }, [settings]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        showToast("Infraestrutura atualizada com sucesso!", "success");
        await refreshSettings(); // Atualiza o cache global em segundo plano
      } else {
        showToast(data.error || "Erro ao salvar configurações.", "error");
      }
    } catch {
      showToast("Erro de comunicação com o servidor.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu relative">
      
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
        title="Configurações Gerais"
        subtitle="Gerencie a infraestrutura básica e diretrizes principais do portal."
        category="Core Administration"
        categoryColor="text-blue-500"
        icon={<Settings className="w-4 h-4" />}
        actionButton={{
          label: "SALVAR CONFIGS",
          icon: <Save className="w-5 h-5" />,
          onClick: handleSave,
          isLoading: loading,
          colorClass: "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20"
        }}
      />

      <div className="grid grid-cols-1 gap-8">
        
        {/* ACESSO E CONEXÃO */}
        <SectionCard 
          title="Acesso e Conexão" 
          subtitle="Rotas e sincronização com o servidor MTA"
          icon={<Globe className="w-6 h-6" />}
          iconColorClass="bg-blue-500/10 text-blue-500 border border-blue-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Slug da URL (Link Único)</label>
              <div className="flex bg-[#050505] border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-colors shadow-inner">
                <div className="bg-[#0a0a0a] px-4 py-4 border-r border-white/5 flex items-center justify-center text-zinc-500 shrink-0">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <span className="text-xs font-mono font-medium">paymta.com.br/</span>
                </div>
                <input 
                  type="text" 
                  value={form.slug} 
                  onChange={(e) => setForm({...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})} 
                  placeholder="suacidade"
                  className="w-full bg-transparent py-4 px-4 text-sm text-white font-bold outline-none font-mono" 
                />
              </div>
              <p className="text-[10px] text-zinc-500 font-medium ml-1 mt-1">Evite usar espaços ou caracteres especiais.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">IP do Servidor (MTA)</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Server className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={form.serverIp} 
                  onChange={(e) => setForm({...form, serverIp: e.target.value})} 
                  placeholder="192.168.1.1:22003" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white font-mono font-bold focus:border-blue-500/50 outline-none transition-colors shadow-inner" 
                />
                {form.serverIp && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-zinc-500 font-medium ml-1 mt-1">Necessário para disparos via Webhook.</p>
            </div>
          </div>
        </SectionCard>

        {/* ESTADO E TERMOS */}
        <SectionCard 
          title="Estado Operacional" 
          subtitle="Controle de acesso e diretrizes legais"
          icon={<ShieldAlert className="w-6 h-6" />}
          iconColorClass="bg-red-500/10 text-red-500 border border-red-500/20"
          headerAction={
            <div className="flex items-center gap-3 bg-[#050505] px-4 py-2.5 rounded-xl border border-white/5 shadow-inner">
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${form.isMaintenance ? 'text-red-500' : 'text-zinc-500'}`}>
                {form.isMaintenance ? "Em Manutenção" : "Loja Online"}
              </span>
              <button 
                onClick={() => setForm({...form, isMaintenance: !form.isMaintenance})} 
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer outline-none transform-gpu ${
                  form.isMaintenance ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              >
                <motion.div 
                  layout
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ left: form.isMaintenance ? "24px" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 flex items-start gap-3">
              <Power className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Ativar o <strong className="text-zinc-200">Modo Manutenção</strong> bloqueia o acesso à loja para jogadores e impede novas transações. Use apenas durante atualizações de wipe ou mudanças críticas na precificação.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Conteúdo Legal (Termos e Reembolso)</label>
                <span className="text-[9px] text-zinc-600 font-bold uppercase">Visível no checkout</span>
              </div>
              <textarea 
                rows={8} 
                value={form.termsContent} 
                onChange={(e) => setForm({...form, termsContent: e.target.value})} 
                placeholder="Descreva aqui as regras de uso, políticas de reembolso do seu servidor e termos de Chargeback..." 
                className="w-full bg-[#050505] border border-white/10 rounded-[24px] p-6 text-sm text-zinc-300 font-medium leading-relaxed focus:border-blue-500/50 transition-colors outline-none resize-none shadow-inner" 
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}