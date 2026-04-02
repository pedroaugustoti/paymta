"use client";

import { useState, useEffect } from "react";
import { 
  FileText, ShieldCheck, HelpCircle, 
  ListOrdered, Info, Save, Loader2, 
  MessageSquare, BookOpen, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function ContentPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    termsContent: "",
    // Aqui você pode expandir para FAQ ou Regras no futuro
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
      if (res.ok) alert("✅ Textos e diretrizes atualizados!");
    } catch (error) {
      alert("❌ Falha ao salvar conteúdo.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Biblioteca...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gestão de Textos</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Páginas & Conteúdo</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Edite as regras do servidor, termos de uso e a central de ajuda.</p>
        </div>

        <Button 
          onClick={handleSave} disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 py-7 rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-500/10 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> PUBLICAR TEXTOS</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* TERMOS DE USO */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Termos & Condições</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Políticas de reembolso e regras de compra.</p>
            </div>
          </div>

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
        </section>

        {/* REGRAS DO SERVIDOR (MTA) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm opacity-60">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <ListOrdered className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase text-white leading-tight">Regulamento In-Game</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Regras de Roleplay e convivência.</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase italic">
              Em breve: Gestão Modular
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/5 rounded-[32px]">
             <AlertCircle className="w-8 h-8 text-zinc-800 mb-4" />
             <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Módulo de Regras em Desenvolvimento</p>
          </div>
        </section>

      </div>
    </div>
  );
}