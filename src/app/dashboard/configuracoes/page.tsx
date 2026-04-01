"use client";

import { useState, useEffect } from "react";
import { 
  Save, Globe, Palette, Link as LinkIcon, 
  FileText, CreditCard, Loader2, Layout, 
  Camera, Play, Image as ImageIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function ConfiguracoesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    slug: "", // CAMPO ADICIONADO PARA BLINDAGEM
    navbarName: "",
    serverName: "",
    footerName: "",
    slogan: "",
    primaryColor: "#facb11",
    heroImageUrl: "",
    discordUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    termsContent: "",
    mpAccessToken: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setForm({
              slug: data.slug || "", // CARREGA O SLUG EXISTENTE
              navbarName: data.navbarName || "",
              serverName: data.serverName || "",
              footerName: data.footerName || "",
              slogan: data.slogan || "",
              primaryColor: data.primaryColor || "#facb11",
              heroImageUrl: data.heroImageUrl || "",
              discordUrl: data.discordUrl || "",
              instagramUrl: data.instagramUrl || "",
              youtubeUrl: data.youtubeUrl || "",
              termsContent: data.termsContent || "",
              mpAccessToken: data.mpAccessToken || "",
            });
          }
        }
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
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
        body: JSON.stringify(form), // AGORA O SLUG VAI JUNTO NO JSON
      });

      if (res.ok) {
        alert("✅ Configurações e URL preservadas com sucesso!");
      } else {
        alert("❌ Erro ao salvar. Verifique a conexão.");
      }
    } catch (error) {
      alert("❌ Erro crítico de rede.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-full gap-3 text-zinc-500 font-black uppercase italic tracking-tighter">
        <Loader2 className="w-5 h-5 animate-spin text-yellow-500" /> Sincronizando com a Host...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl space-y-8 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Configurações Gerais</h1>
        <p className="text-zinc-500 text-sm">Gerencie a identidade visual e as diretrizes do seu portal.</p>
      </header>

      <div className="space-y-6">
        <section className="bg-zinc-950 border border-white/5 p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-8 text-yellow-500">
            <Layout className="w-5 h-5" />
            <h2 className="font-bold uppercase text-xs tracking-widest">Nomes e Textos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 ml-1">Nome na Navbar</label>
              <input 
                type="text" value={form.navbarName} onChange={(e) => setForm({...form, navbarName: e.target.value})}
                placeholder="Ex: BRP" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 ml-1">Nome no Hero (Centro)</label>
              <input 
                type="text" value={form.serverName} onChange={(e) => setForm({...form, serverName: e.target.value})}
                placeholder="Ex: Brasil Roleplay" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 ml-1">Nome no Rodapé</label>
              <input 
                type="text" value={form.footerName} onChange={(e) => setForm({...form, footerName: e.target.value})}
                placeholder="Ex: Brasil RP Oficial" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-yellow-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 ml-1">Slogan Principal</label>
            <input 
              type="text" value={form.slogan} onChange={(e) => setForm({...form, slogan: e.target.value})}
              placeholder="Ex: Sua nova vida começa aqui" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-yellow-500 outline-none"
            />
          </div>
        </section>

        <section className="bg-zinc-950 border border-white/5 p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-8 text-purple-500">
            <Palette className="w-5 h-5" />
            <h2 className="font-bold uppercase text-xs tracking-widest">Estilo Visual</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
              <input 
                type="color" value={form.primaryColor} onChange={(e) => setForm({...form, primaryColor: e.target.value})}
                className="w-16 h-16 rounded-xl bg-black border-none cursor-pointer p-1"
              />
              <div>
                <p className="text-xs font-black uppercase text-zinc-400 mb-1">Cor Primária</p>
                <p className="text-lg font-mono font-bold text-white uppercase">{form.primaryColor}</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase mb-2 ml-1">Background Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" value={form.heroImageUrl} onChange={(e) => setForm({...form, heroImageUrl: e.target.value})}
                  placeholder="Link da imagem" className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 border border-white/5 p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-8 text-blue-500">
            <LinkIcon className="w-5 h-5" />
            <h2 className="font-bold uppercase text-xs tracking-widest">Links Sociais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5865F2] font-bold text-xs">DISC</span>
              <input 
                type="text" value={form.discordUrl} onChange={(e) => setForm({...form, discordUrl: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-14 pr-4 text-sm focus:border-[#5865F2] outline-none"
              />
            </div>
            <div className="relative">
              <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
              <input 
                type="text" value={form.instagramUrl} onChange={(e) => setForm({...form, instagramUrl: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-pink-500 outline-none"
              />
            </div>
            <div className="relative">
              <Play className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
              <input 
                type="text" value={form.youtubeUrl} onChange={(e) => setForm({...form, youtubeUrl: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-red-500 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 border border-white/5 p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-8 text-emerald-500">
            <FileText className="w-5 h-5" />
            <h2 className="font-bold uppercase text-xs tracking-widest">Regras e Termos</h2>
          </div>
          <textarea 
            rows={10} value={form.termsContent} onChange={(e) => setForm({...form, termsContent: e.target.value})}
            className="w-full bg-black border border-white/10 rounded-[24px] p-6 text-sm focus:border-emerald-500 outline-none min-h-[200px]"
          />
        </section>

        <section className="bg-zinc-950 border border-white/5 p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-8 text-orange-500">
            <CreditCard className="w-5 h-5" />
            <h2 className="font-bold uppercase text-xs tracking-widest">Mercado Pago</h2>
          </div>
          <input 
            type="password" value={form.mpAccessToken} onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
            placeholder="APP_USR-..." className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-orange-500 outline-none font-mono"
          />
        </section>

        <div className="flex justify-end pt-10">
          <Button 
            onClick={handleSave} disabled={loading}
            className="bg-white hover:bg-zinc-200 text-black font-black px-12 py-8 rounded-3xl text-lg flex items-center gap-3"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-6 h-6" /> SALVAR TUDO NO BANCO</>}
          </Button>
        </div>
      </div>
    </div>
  );
}