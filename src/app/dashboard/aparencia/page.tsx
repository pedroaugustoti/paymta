"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, ImageIcon, Info, Save, Loader2, 
  CheckCircle2, AlertCircle, LayoutTemplate, 
  Disc as Discord, Camera, Video, Link2, Type,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function AppearancePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Estado unificado com Identidade, Textos e Visual 
  const [form, setForm] = useState({
    serverName: "",
    navbarName: "",
    primaryColor: "#facb11",
    logoUrl: "",
    heroImageUrl: "",
    discordUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    slogan: "",
    description: "",
    footerName: "",
  });

  useEffect(() => {
    async function loadAppearance() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            serverName: data.serverName || "",
            navbarName: data.navbarName || "",
            primaryColor: data.primaryColor || "#facb11",
            logoUrl: data.logoUrl || "",
            heroImageUrl: data.heroImageUrl || "",
            discordUrl: data.discordUrl || "",
            instagramUrl: data.instagramUrl || "",
            youtubeUrl: data.youtubeUrl || "",
            slogan: data.slogan || "",
            description: data.description || "",
            footerName: data.footerName || "",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar design:", err);
      } finally {
        setFetching(false);
      }
    }
    if (session) loadAppearance();
  }, [session]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setToast({ message: "Identidade visual atualizada!", type: "success" });
    } catch (error) {
      setToast({ message: "Erro ao salvar design.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px]">Sincronizando Identidade Visual...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm ${toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" : "bg-red-950/90 border-red-500/30 text-red-400"}`}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Palette className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Branding & Visual</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Design da Loja</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Personalize a identidade, cores e mensagens da sua marca.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-white hover:bg-zinc-200 text-black font-black px-10 py-7 rounded-2xl flex items-center gap-2 transition-all">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> ATUALIZAR DESIGN</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* SEÇÃO 1: NOMES DE IDENTIDADE (Movido de Configurações Gerais)  */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-zinc-800 rounded-2xl text-white"><Monitor className="w-6 h-6" /></div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">Nomes de Identidade</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Nome na Navbar (Curto)</label>
              <input 
                type="text" 
                value={form.navbarName} 
                onChange={(e) => setForm({...form, navbarName: e.target.value})} 
                className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white font-bold focus:border-yellow-500/50 outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Nome Completo do Servidor</label>
              <input 
                type="text" 
                value={form.serverName} 
                onChange={(e) => setForm({...form, serverName: e.target.value})} 
                className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white font-bold focus:border-yellow-500/50 outline-none transition-all" 
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: TEXTOS DE IMPACTO  */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500"><Type className="w-6 h-6" /></div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">Textos de Impacto</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Slogan Principal (Hero)</label>
              <input type="text" value={form.slogan} onChange={(e) => setForm({...form, slogan: e.target.value})} placeholder="Ex: O melhor Roleplay do Brasil." className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Descrição / Boas-Vindas</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-medium outline-none focus:border-yellow-500/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome de Copyright (Rodapé)</label>
              <input 
                type="text" 
                value={form.footerName} 
                onChange={(e) => setForm({...form, footerName: e.target.value})}
                placeholder="Ex: Brasil Roleplay Oficial" 
                className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm focus:border-yellow-500/50 outline-none text-white font-bold transition-all"
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: CORES E MEDIA  */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><LayoutTemplate className="w-6 h-6" /></div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">Cores e Media</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-black/40 rounded-[32px] border border-white/5">
            <input type="color" value={form.primaryColor} onChange={(e) => setForm({...form, primaryColor: e.target.value})} className="w-32 h-32 rounded-[32px] bg-black border-4 border-white/5 cursor-pointer p-2 shadow-2xl" />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Cor Principal do Sistema</p>
              <p className="text-4xl font-mono font-black text-white uppercase italic">{form.primaryColor}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">URL da Logo (Fundo Transparente)</label>
              <input type="text" value={form.logoUrl} onChange={(e) => setForm({...form, logoUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">URL do Banner Principal (Hero)</label>
              <input type="text" value={form.heroImageUrl} onChange={(e) => setForm({...form, heroImageUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm text-white font-bold" />
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: REDES SOCIAIS  */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><Link2 className="w-6 h-6" /></div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">Presença Digital</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1"><Discord size={14}/> Discord</label>
              <input type="text" value={form.discordUrl} onChange={(e) => setForm({...form, discordUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1"><Camera size={14}/> Instagram</label>
              <input type="text" value={form.instagramUrl} onChange={(e) => setForm({...form, instagramUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 ml-1"><Video size={14}/> YouTube</label>
              <input type="text" value={form.youtubeUrl} onChange={(e) => setForm({...form, youtubeUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white font-bold" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}