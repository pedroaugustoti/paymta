"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, Save, Loader2, CheckCircle2, 
  AlertCircle, LayoutTemplate, Monitor, 
  Type, Link2, Camera, Video, MessageSquare, 
  Image as ImageIcon
} from "lucide-react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

export default function AppearancePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<ToastProps | null>(null);
  
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

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
      if (res.ok) {
        showToast("Identidade visual atualizada com sucesso!", "success");
      } else {
        showToast("Erro ao salvar configurações de design.", "error");
      }
    } catch (error) {
      showToast("Falha na comunicação com o servidor.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-500 transform-gpu" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-widest">Sincronizando Identidade Visual...</span>
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
        title="Design da Loja"
        subtitle="Personalize a identidade, cores e mensagens da sua marca."
        category="Branding & Visual"
        categoryColor="text-yellow-500"
        icon={<Palette className="w-4 h-4" />}
        actionButton={{
          label: "ATUALIZAR DESIGN",
          icon: <Save className="w-5 h-5" />,
          onClick: handleSave,
          isLoading: loading,
          colorClass: "bg-white hover:bg-zinc-200 text-black shadow-xl shadow-white/10"
        }}
      />

      <div className="grid grid-cols-1 gap-8">
        
        {/* NOMES DE IDENTIDADE */}
        <SectionCard 
          title="Nomes de Identidade" 
          subtitle="Como sua marca será chamada no portal"
          icon={<Monitor className="w-6 h-6" />}
          iconColorClass="bg-zinc-800 text-white border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome na Navbar (Curto)</label>
              <input 
                type="text" 
                value={form.navbarName} 
                onChange={(e) => setForm({...form, navbarName: e.target.value})} 
                placeholder="Ex: PayMTA"
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold focus:border-yellow-500/50 outline-none transition-colors shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome Completo do Servidor</label>
              <input 
                type="text" 
                value={form.serverName} 
                onChange={(e) => setForm({...form, serverName: e.target.value})} 
                placeholder="Ex: PayMTA Roleplay Oficial"
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold focus:border-yellow-500/50 outline-none transition-colors shadow-inner" 
              />
            </div>
          </div>
        </SectionCard>

        {/* TEXTOS DE IMPACTO */}
        <SectionCard 
          title="Textos de Impacto" 
          subtitle="Slogans, descrições e copyright"
          icon={<Type className="w-6 h-6" />}
          iconColorClass="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Slogan Principal (Hero)</label>
              <input 
                type="text" 
                value={form.slogan} 
                onChange={(e) => setForm({...form, slogan: e.target.value})} 
                placeholder="Ex: Elevando o nível do seu Roleplay." 
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-yellow-500/50 transition-colors shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Descrição / Boas-Vindas</label>
              <textarea 
                rows={3} 
                value={form.description} 
                onChange={(e) => setForm({...form, description: e.target.value})} 
                placeholder="Apresente sua cidade para novos jogadores..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-medium outline-none focus:border-yellow-500/50 transition-colors resize-none shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome de Copyright (Rodapé)</label>
              <input 
                type="text" 
                value={form.footerName} 
                onChange={(e) => setForm({...form, footerName: e.target.value})} 
                placeholder="Ex: Brasil Roleplay Oficial" 
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-yellow-500/50 outline-none text-white font-bold transition-colors shadow-inner" 
              />
            </div>
          </div>
        </SectionCard>

        {/* CORES E MÍDIA */}
        <SectionCard 
          title="Cores e Mídia" 
          subtitle="Identidade visual primária da loja"
          icon={<LayoutTemplate className="w-6 h-6" />}
          iconColorClass="bg-purple-500/10 text-purple-500 border border-purple-500/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-[#050505] rounded-3xl border border-white/5 shadow-inner mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-[24px] border-4 border-white/5 overflow-hidden shadow-2xl shrink-0 group">
              {/* Box visual da cor */}
              <div className="absolute inset-0 transition-colors" style={{ backgroundColor: form.primaryColor }} />
              {/* Input de cor real, esticado e invisível por cima */}
              <input 
                type="color" 
                value={form.primaryColor} 
                onChange={(e) => setForm({...form, primaryColor: e.target.value})} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Cor Principal do Sistema</p>
              <p className="text-3xl md:text-4xl font-mono font-black text-white uppercase italic tracking-tighter">{form.primaryColor}</p>
              <p className="text-[11px] text-zinc-500 font-medium mt-2 max-w-xs">Clique no quadrado ao lado para abrir o seletor de cores e alterar o tom da sua marca.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> URL da Logo (Transparente)
              </label>
              <input 
                type="text" 
                value={form.logoUrl} 
                onChange={(e) => setForm({...form, logoUrl: e.target.value})} 
                placeholder="https://..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-yellow-500/50 transition-colors shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> URL do Banner Principal
              </label>
              <input 
                type="text" 
                value={form.heroImageUrl} 
                onChange={(e) => setForm({...form, heroImageUrl: e.target.value})} 
                placeholder="https://..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-yellow-500/50 transition-colors shadow-inner" 
              />
            </div>
          </div>
        </SectionCard>

        {/* PRESENÇA DIGITAL */}
        <SectionCard 
          title="Presença Digital" 
          subtitle="Conecte suas redes sociais"
          icon={<Link2 className="w-6 h-6" />}
          iconColorClass="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" /> Discord
              </label>
              <input 
                type="text" 
                value={form.discordUrl} 
                onChange={(e) => setForm({...form, discordUrl: e.target.value})} 
                placeholder="https://discord.gg/..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-emerald-500/50 transition-colors shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Camera className="w-3.5 h-3.5 text-pink-500" /> Instagram
              </label>
              <input 
                type="text" 
                value={form.instagramUrl} 
                onChange={(e) => setForm({...form, instagramUrl: e.target.value})} 
                placeholder="https://instagram.com/..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-emerald-500/50 transition-colors shadow-inner" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Video className="w-3.5 h-3.5 text-red-500" /> YouTube
              </label>
              <input 
                type="text" 
                value={form.youtubeUrl} 
                onChange={(e) => setForm({...form, youtubeUrl: e.target.value})} 
                placeholder="https://youtube.com/..."
                className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm text-white font-bold outline-none focus:border-emerald-500/50 transition-colors shadow-inner" 
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}