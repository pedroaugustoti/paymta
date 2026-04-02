"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, ImageIcon, Monitor, Info, 
  Save, Loader2, CheckCircle2, AlertCircle,
  LayoutTemplate, Disc as Discord, Camera, Video, Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function AppearancePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [form, setForm] = useState({
    primaryColor: "#facb11",
    logoUrl: "",
    heroImageUrl: "",
    discordUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
  });

  // CARREGAMENTO DOS DADOS
  useEffect(() => {
    async function loadAppearance() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            primaryColor: data.primaryColor || "#facb11",
            logoUrl: data.logoUrl || "",
            heroImageUrl: data.heroImageUrl || "",
            discordUrl: data.discordUrl || "",
            instagramUrl: data.instagramUrl || "",
            youtubeUrl: data.youtubeUrl || "",
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

  // SALVAR ALTERAÇÕES
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setToast({ message: "Design atualizado com sucesso!", type: "success" });
      } else {
        throw new Error("Erro no servidor");
      }
    } catch (error) {
      setToast({ message: "Erro ao salvar as configurações.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Identidade...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* SISTEMA DE NOTIFICAÇÕES (TOAST) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm tracking-wide ${
              toast.type === "success" 
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" 
                : "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER DA PÁGINA */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Palette className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Branding & Visual</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Design da Loja</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Personalize as cores, logotipos e banners do seu portal de vendas.</p>
        </div>

        <Button 
          onClick={handleSave} disabled={loading}
          className="bg-white hover:bg-zinc-200 text-black font-black px-10 py-7 rounded-2xl flex items-center gap-2 shadow-2xl transition-all active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> ATUALIZAR VISUAL</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* CARD 1: PALETA DE CORES */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Cores do Sistema</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Defina a cor que guiará a experiência do usuário.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-black/40 rounded-[32px] border border-white/5">
            <div className="relative group">
              <input 
                type="color" value={form.primaryColor} onChange={(e) => setForm({...form, primaryColor: e.target.value})}
                className="w-32 h-32 rounded-[32px] bg-black border-4 border-white/5 cursor-pointer p-2 shadow-2xl transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Código Hexadecimal</p>
                <p className="text-4xl font-mono font-black text-white uppercase italic tracking-tighter">{form.primaryColor}</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                  <strong>Onde essa cor aparece?</strong> Ela será aplicada automaticamente em todos os botões de compra, ícones de destaque e elementos interativos da sua loja.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARD 2: IDENTIDADE VISUAL (IMAGENS) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Imagens e Logos</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Gerencie os arquivos visuais da sua marca.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LOGO NAVBAR */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Logo da Navbar</label>
                <span className="text-[9px] font-bold text-zinc-600 uppercase italic">Recomendado: PNG Transparente</span>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors">
                  <Monitor className="w-4 h-4" />
                </div>
                <input 
                  type="text" value={form.logoUrl} onChange={(e) => setForm({...form, logoUrl: e.target.value})}
                  placeholder="https://imgur.com/seu-logo.png" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-blue-500 outline-none text-white font-bold transition-all"
                />
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed px-1">
                Este logo aparecerá no canto superior esquerdo do site.
              </p>
            </div>

            {/* BANNER HERO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Banner Principal</label>
                <span className="text-[9px] font-bold text-zinc-600 uppercase italic">Full HD (1920x1080)</span>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <input 
                  type="text" value={form.heroImageUrl} onChange={(e) => setForm({...form, heroImageUrl: e.target.value})}
                  placeholder="https://imgur.com/seu-banner.jpg" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-purple-500 outline-none text-white font-bold transition-all"
                />
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed px-1">
                A imagem de fundo que recebe os jogadores na Home.
              </p>
            </div>
          </div>

          {/* PREVIEW EM MINIATURA */}
          <div className="mt-12 p-6 bg-white/5 rounded-[32px] border border-white/5 flex flex-col md:flex-row items-center gap-8">
             <div className="w-full md:w-48 h-28 bg-black rounded-2xl overflow-hidden border border-white/10 relative">
                {form.heroImageUrl ? (
                   <img src={form.heroImageUrl} className="w-full h-full object-cover opacity-50" alt="Banner" />
                ) : <div className="w-full h-full flex items-center justify-center text-zinc-800 italic text-[10px]">Sem Banner</div>}
                <div className="absolute top-4 left-4">
                  {form.logoUrl ? <img src={form.logoUrl} className="h-4 w-auto" alt="Logo" /> : <div className="h-4 w-12 bg-white/10 rounded-full" />}
                </div>
             </div>
             <div className="flex-1">
                <h4 className="text-white font-black text-xs uppercase mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Prévia do Layout
                </h4>
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                  Recomendamos o uso do <strong>Imgur</strong> ou <strong>Discord</strong> para hospedar suas imagens e garantir que carreguem rápido.
                </p>
             </div>
          </div>
        </section>

        {/* CARD 3: REDES SOCIAIS (NOVO) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Redes Sociais</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Conecte sua comunidade ao seu portal.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* DISCORD */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Link do Discord</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#5865F2] transition-colors">
                  <Discord className="w-4 h-4" />
                </div>
                <input 
                  type="text" value={form.discordUrl} onChange={(e) => setForm({...form, discordUrl: e.target.value})}
                  placeholder="https://discord.gg/..." 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-[#5865F2] outline-none text-white font-bold transition-all"
                />
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Link do Instagram</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
                <input 
                  type="text" value={form.instagramUrl} onChange={(e) => setForm({...form, instagramUrl: e.target.value})}
                  placeholder="https://instagram.com/..." 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-pink-500 outline-none text-white font-bold transition-all"
                />
              </div>
            </div>

            {/* YOUTUBE */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Link do YouTube</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors">
                  <Video className="w-4 h-4" />
                </div>
                <input 
                  type="text" value={form.youtubeUrl} onChange={(e) => setForm({...form, youtubeUrl: e.target.value})}
                  placeholder="https://youtube.com/..." 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-red-500 outline-none text-white font-bold transition-all"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ALERTA DE SEGURANÇA */}
        <div className="flex items-center gap-4 p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-[10px] text-amber-500/80 font-black uppercase italic leading-tight tracking-widest">
            Atenção: Sempre use links com protocolo HTTPS para evitar que o navegador bloqueie as imagens por falta de segurança.
          </p>
        </div>

      </div>
    </div>
  );
}