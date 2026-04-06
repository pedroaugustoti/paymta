"use client";

import { useState, useEffect } from "react";
import { 
  Settings, Globe, ShieldAlert, FileText, 
  Save, Loader2, Monitor, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function GeneralSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  // O form agora foca apenas em Infraestrutura e Termos
  const [form, setForm] = useState({
    slug: "",
    serverIp: "",
    isMaintenance: false,
    termsContent: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          // Mapeamos apenas os campos de infra
          setForm({
            slug: data.slug || "",
            serverIp: data.serverIp || "",
            isMaintenance: data.isMaintenance || false,
            termsContent: data.termsContent || "",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar configurações gerais:", err);
      } finally {
        setFetching(false);
      }
    }
    if (session) loadSettings();
  }, [session]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) alert("✅ Infraestrutura atualizada!");
    } catch (error) {
      alert("❌ Falha na sincronização.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px]">Acessando Core do Sistema...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Settings className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Administration</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Configurações Gerais</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Gerencie a infraestrutura básica e diretrizes do portal.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-7 rounded-2xl flex items-center gap-2 transition-all">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SALVAR CONFIGS</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* SEÇÃO 1: ACESSO E CONEXÃO */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Globe className="w-6 h-6" /></div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">Acesso e Conexão</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Slug da URL (Link Único)</label>
              <input 
                type="text" 
                value={form.slug} 
                onChange={(e) => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">IP do Servidor (MTA)</label>
              <input 
                type="text" 
                value={form.serverIp} 
                onChange={(e) => setForm({...form, serverIp: e.target.value})} 
                placeholder="192.168.1.1:22003" 
                className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-bold" 
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: ESTADO E TERMOS */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-500"><ShieldAlert className="w-6 h-6" /></div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Estado e Termos</h3>
            </div>
            <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-3xl border border-white/5">
              <span className="text-[10px] font-black text-zinc-500 uppercase">Modo Manutenção</span>
              <button 
                onClick={() => setForm({...form, isMaintenance: !form.isMaintenance})} 
                className={`w-12 h-6 rounded-full transition-all relative ${form.isMaintenance ? 'bg-red-500' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.isMaintenance ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Conteúdo Legal (Termos e Reembolso)</label>
            <textarea 
              rows={8} 
              value={form.termsContent} 
              onChange={(e) => setForm({...form, termsContent: e.target.value})} 
              placeholder="Descreva aqui as regras de uso e políticas de reembolso do seu servidor..." 
              className="w-full bg-black border border-white/10 rounded-[32px] p-8 text-sm text-zinc-400 font-medium leading-relaxed focus:border-red-500/30 transition-all outline-none" 
            />
          </div>
        </section>
      </div>
    </div>
  );
}