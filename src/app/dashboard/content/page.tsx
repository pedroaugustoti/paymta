"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, ListOrdered, Info, Save, Loader2, 
  BookOpen, AlertCircle, CheckCircle2
} from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

export default function ContentPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [form, setForm] = useState({
    termsContent: "",
  });

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            termsContent: data.termsContent || "",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar textos:", err);
      } finally {
        setFetching(false);
      }
    }
    // Mesmo com o erro 401 no backend local, a tela vai carregar para você testar o UI
    loadContent();
  }, [session]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast({ message: "Textos e diretrizes publicados com sucesso!", type: "success" });
      } else {
        setToast({ message: "Falha ao salvar conteúdo. (API Protegida)", type: "error" });
      }
    } catch {
      setToast({ message: "Erro de comunicação com o servidor.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Biblioteca...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700 relative">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} 
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm ${toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" : "bg-red-950/90 border-red-500/30 text-red-400"}`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader 
        title="Páginas & Conteúdo"
        subtitle="Edite as regras do servidor, termos de uso e a central de ajuda."
        category="Gestão de Textos"
        categoryColor="text-emerald-500"
        icon={<BookOpen className="w-4 h-4" />}
        actionButton={{
          label: "PUBLICAR TEXTOS",
          icon: <Save className="w-5 h-5" />,
          onClick: handleSave,
          isLoading: loading,
          colorClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/10"
        }}
      />

      <div className="grid grid-cols-1 gap-10">
        <SectionCard 
          title="Termos & Condições" 
          subtitle="Políticas de reembolso e regras de compra."
          icon={<ShieldCheck className="w-6 h-6" />}
          iconColorClass="bg-emerald-500/10 text-emerald-500"
        >
          <div className="space-y-6">
            <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-start gap-4">
               <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
               <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                 Este texto aparecerá no checkout da sua loja. É fundamental para evitar <strong>Chargebacks</strong> no Mercado Pago. Deixe claro que os itens são digitais e não reembolsáveis após a entrega.
               </p>
            </div>
            <textarea 
              rows={12} 
              value={form.termsContent} 
              onChange={(e) => setForm({...form, termsContent: e.target.value})} 
              placeholder="Ex: Ao adquirir créditos em nossa loja, você concorda que..." 
              className="w-full bg-black border border-white/10 rounded-[32px] p-8 text-sm focus:border-emerald-500 outline-none text-zinc-300 leading-relaxed font-medium min-h-[400px] scrollbar-hide" 
            />
          </div>
        </SectionCard>

        <SectionCard 
          title="Regulamento In-Game" 
          subtitle="Regras de Roleplay e convivência."
          icon={<ListOrdered className="w-6 h-6" />}
          iconColorClass="bg-blue-500/10 text-blue-500"
          headerAction={
            <div className="px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase italic">
              Em breve: Gestão Modular
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-[32px] bg-black/20">
             <AlertCircle className="w-8 h-8 text-zinc-800 mb-4" />
             <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Módulo de Regras em Desenvolvimento</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}