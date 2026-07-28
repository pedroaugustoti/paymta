"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, ListOrdered, Info, Save, Loader2, 
  BookOpen, AlertCircle, CheckCircle2, Lock
} from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

export default function ContentPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<ToastProps | null>(null);
  
  const [form, setForm] = useState({
    termsContent: "",
  });

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
    if (session) loadContent();
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
        showToast("Textos e diretrizes publicados com sucesso!", "success");
      } else {
        showToast("Falha ao salvar conteúdo. (API Protegida)", "error");
      }
    } catch {
      showToast("Erro de comunicação com o servidor.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500 transform-gpu" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-widest">Sincronizando Biblioteca...</span>
    </div>
  );

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
          colorClass: "bg-emerald-500 hover:bg-emerald-600 text-black shadow-xl shadow-emerald-500/20"
        }}
      />

      <div className="grid grid-cols-1 gap-10">
        
        {/* TERMOS E CONDIÇÕES */}
        <SectionCard 
          title="Termos & Condições" 
          subtitle="Políticas de reembolso e regras de compra."
          icon={<ShieldCheck className="w-6 h-6" />}
          iconColorClass="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
        >
          <div className="space-y-6">
            <div className="p-5 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-start gap-4">
               <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
               <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                 Este texto aparecerá no checkout da sua loja. É fundamental para evitar <strong className="text-zinc-200">Chargebacks</strong> no Mercado Pago. Deixe claro que os itens são digitais e não reembolsáveis após a entrega.
               </p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] opacity-20 pointer-events-none rounded-[32px]" />
              <textarea 
                rows={12} 
                value={form.termsContent} 
                onChange={(e) => setForm({...form, termsContent: e.target.value})} 
                placeholder="Ex: Ao adquirir créditos em nossa loja, você concorda que todos os itens são bens virtuais e não reembolsáveis..." 
                className="w-full bg-[#050505] border border-white/10 rounded-[32px] p-8 text-sm focus:border-emerald-500/50 outline-none text-zinc-300 leading-relaxed font-medium min-h-[400px] scrollbar-thin scrollbar-thumb-white/10 shadow-inner transition-colors" 
              />
            </div>
          </div>
        </SectionCard>

        {/* REGULAMENTO IN-GAME (EM BREVE) */}
        <SectionCard 
          title="Regulamento In-Game" 
          subtitle="Regras de Roleplay e convivência da cidade."
          icon={<ListOrdered className="w-6 h-6" />}
          iconColorClass="bg-blue-500/10 text-blue-500 border border-blue-500/20"
          headerAction={
            <div className="px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest italic shadow-inner">
              Gestão Modular
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-white/10 rounded-[32px] bg-[#050505]/50 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.05),_transparent_60%)] pointer-events-none" />
             
             <div className="w-16 h-16 bg-blue-500/5 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/10 group-hover:scale-110 transition-transform duration-500 transform-gpu shadow-inner">
               <Lock className="w-8 h-8 text-blue-500" />
             </div>
             
             <h3 className="text-xl font-black italic uppercase text-white mb-2">Módulo em Desenvolvimento</h3>
             <p className="text-zinc-500 text-sm max-w-md text-center font-medium leading-relaxed">
               Em breve você poderá criar categorias, capítulos e artigos para as regras da sua cidade diretamente por aqui, com leitura imersiva in-game.
             </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}