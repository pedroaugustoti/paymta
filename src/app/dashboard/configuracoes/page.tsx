"use client";

import { useState, useEffect } from "react";
import { 
  Settings, Globe, ShieldAlert, FileText, 
  Save, Loader2, Link2, Monitor, 
  CheckCircle2, AlertTriangle, ToggleLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function GeneralSettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    slug: "",
    navbarName: "",
    serverName: "",
    slogan: "",
    isMaintenance: false,
    termsContent: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            slug: data.slug || "",
            navbarName: data.navbarName || "",
            serverName: data.serverName || "",
            slogan: data.slogan || "",
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
      if (res.ok) alert("✅ Configurações globais aplicadas!");
    } catch (error) {
      alert("❌ Falha na sincronização com o banco.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Acessando Core do Sistema...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Settings className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Administration</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Configurações Gerais</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Gerencie a infraestrutura básica e as diretrizes do seu portal PayMTA.</p>
        </div>

        <Button 
          onClick={handleSave} disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-7 rounded-2xl flex items-center gap-2 shadow-xl shadow-blue-500/10 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SALVAR TUDO</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* SEÇÃO 1: ACESSO E URL */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Endereço do Portal</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Defina como os jogadores acessam sua loja.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Slug da URL (Único)</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 font-bold text-xs uppercase tracking-tighter">
                  paymta.com/
                </div>
                <input 
                  type="text" value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  placeholder="nome-da-sua-cidade" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-28 pr-6 text-sm focus:border-blue-500 outline-none text-white font-bold transition-all"
                />
              </div>
            </div>

            <div className="p-6 bg-blue-500/5 rounded-[32px] border border-blue-500/10 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-blue-500 font-black text-[10px] uppercase tracking-widest italic">Aviso de Analista</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">
                  Alterar o Slug mudará o link da sua loja imediatamente. Links antigos enviados no Discord ou salvos por jogadores pararão de funcionar. Use com cautela!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: IDENTIDADE BÁSICA */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-zinc-800 rounded-2xl text-white">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Textos e Slogan</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Nomes que aparecem em todo o portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Nome de Exibição (Navbar)</label>
              <input 
                type="text" value={form.navbarName} onChange={(e) => setForm({...form, navbarName: e.target.value})}
                placeholder="Ex: BRP" className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-blue-500 outline-none text-white font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Título do Hero</label>
              <input 
                type="text" value={form.serverName} onChange={(e) => setForm({...form, serverName: e.target.value})}
                placeholder="Ex: Brasil Roleplay" className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-blue-500 outline-none text-white font-bold"
              />
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Slogan Principal</label>
            <input 
              type="text" value={form.slogan} onChange={(e) => setForm({...form, slogan: e.target.value})}
              placeholder="Onde sua jornada começa..." className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-blue-500 outline-none text-zinc-300"
            />
          </div>
        </section>

        {/* SEÇÃO 3: MANUTENÇÃO E REGRAS */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase text-white leading-tight">Estado do Sistema</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Controle de acesso e termos legais.</p>
              </div>
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Termos e Condições de Compra</label>
              <div className="flex items-center gap-2 text-emerald-500 text-[9px] font-black uppercase italic">
                <FileText className="w-3 h-3" /> Exibido no Checkout
              </div>
            </div>
            <textarea 
              rows={8} value={form.termsContent} onChange={(e) => setForm({...form, termsContent: e.target.value})}
              placeholder="Descreva as regras de reembolso e uso dos itens..."
              className="w-full bg-black border border-white/10 rounded-[32px] p-8 text-sm focus:border-red-500 outline-none text-zinc-400 leading-relaxed font-medium"
            />
          </div>
        </section>

      </div>
    </div>
  );
}