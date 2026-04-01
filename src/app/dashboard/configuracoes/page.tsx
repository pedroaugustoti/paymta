"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Globe, Palette, Link as LinkIcon, 
  FileText, CreditCard, Loader2, Layout, 
  Camera, Play, Image as ImageIcon, CheckCircle2,
  Settings2, Smartphone, Monitor, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function ConfiguracoesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("identidade");
  
  const [form, setForm] = useState({
    slug: "",
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
              slug: data.slug || "",
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
        body: JSON.stringify(form),
      });
      if (res.ok) alert("✅ Configurações atualizadas!");
    } catch (error) {
      alert("❌ Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "identidade", label: "Identidade", icon: Layout },
    { id: "aparencia", label: "Aparência", icon: Palette },
    { id: "sociais", label: "Redes Sociais", icon: LinkIcon },
    { id: "termos", label: "Termos & Regras", icon: FileText },
    { id: "pagamento", label: "Pagamento", icon: CreditCard },
  ];

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      <span className="text-zinc-500 font-black uppercase italic text-xs tracking-tighter">Sincronizando Host...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER DINÂMICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Settings2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">SaaS Manager</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Configurações</h1>
          <p className="text-zinc-500 text-sm font-medium">Personalize cada detalhe da sua loja de MTA.</p>
        </div>

        <Button 
          onClick={handleSave} disabled={loading}
          className="bg-white hover:bg-zinc-200 text-black font-black px-8 py-7 rounded-2xl flex items-center gap-2 shadow-xl shadow-white/5 active:scale-95 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SALVAR ALTERAÇÕES</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* SIDEBAR DE NAVEGAÇÃO */}
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* ÁREA DE CONTEÚDO (COM ANIMATION) */}
        <div className="lg:col-span-3 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm"
            >
              
              {/* ABA: IDENTIDADE */}
              {activeTab === "identidade" && (
                <div className="space-y-8">
                  <div className="border-l-4 border-yellow-500 pl-4 mb-10">
                    <h3 className="text-xl font-black italic uppercase text-white">Textos do Portal</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight mt-1">Como seu servidor será identificado pelos jogadores.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Nome da Marca (Navbar)</label>
                      <input 
                        type="text" value={form.navbarName} onChange={(e) => setForm({...form, navbarName: e.target.value})}
                        placeholder="Ex: BRP" className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-yellow-500 outline-none text-white font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Título do Servidor (Hero)</label>
                      <input 
                        type="text" value={form.serverName} onChange={(e) => setForm({...form, serverName: e.target.value})}
                        placeholder="Ex: Brasil Roleplay" className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-yellow-500 outline-none text-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Slogan de Impacto</label>
                    <input 
                      type="text" value={form.slogan} onChange={(e) => setForm({...form, slogan: e.target.value})}
                      placeholder="Ex: Sua nova vida começa aqui" className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-yellow-500 outline-none text-white font-bold"
                    />
                  </div>

                  <div className="p-6 bg-yellow-500/5 rounded-[24px] border border-yellow-500/10 flex items-start gap-4">
                    <Monitor className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-yellow-500 font-black text-[10px] uppercase">Dica de Analista</h4>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed mt-1">
                        Use nomes curtos na Navbar para manter o layout limpo em dispositivos móveis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA: APARÊNCIA */}
              {activeTab === "aparencia" && (
                <div className="space-y-8">
                   <div className="border-l-4 border-purple-500 pl-4 mb-10">
                    <h3 className="text-xl font-black italic uppercase text-white">Visual & Branding</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight mt-1">Defina as cores e imagens que dão vida à sua loja.</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-black/40 rounded-[32px] border border-white/5">
                    <div className="relative group cursor-pointer">
                      <input 
                        type="color" value={form.primaryColor} onChange={(e) => setForm({...form, primaryColor: e.target.value})}
                        className="w-32 h-32 rounded-3xl bg-black border-none cursor-pointer p-2 shadow-2xl"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <Palette className="w-6 h-6 text-black mix-blend-difference" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-[10px] font-black uppercase text-zinc-500 mb-2">Tom Primário do Sistema</p>
                      <p className="text-4xl font-mono font-black text-white uppercase italic">{form.primaryColor}</p>
                      <p className="text-xs text-zinc-500 mt-2 font-medium italic">Esta cor será aplicada em botões, links e detalhes de destaque.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">URL do Banner de Fundo (Hero)</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input 
                        type="text" value={form.heroImageUrl} onChange={(e) => setForm({...form, heroImageUrl: e.target.value})}
                        placeholder="Link da imagem (Ex: Imgur/Discord)" className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-purple-500 outline-none text-white"
                      />
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-black italic ml-1">Recomendado: 1920x1080px para melhor nitidez.</p>
                  </div>
                </div>
              )}

              {/* ABA: REDES SOCIAIS */}
              {activeTab === "sociais" && (
                <div className="space-y-8">
                   <div className="border-l-4 border-blue-500 pl-4 mb-10">
                    <h3 className="text-xl font-black italic uppercase text-white">Comunidade</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight mt-1">Conecte seus jogadores às suas redes sociais.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="group">
                      <label className="text-[10px] font-black text-zinc-600 uppercase ml-1 mb-2 block group-focus-within:text-blue-400 transition-colors">Convite Discord</label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-14 bg-white/5 rounded-l-2xl flex items-center justify-center text-[#5865F2] font-black text-[10px]">DISC</div>
                        <input 
                          type="text" value={form.discordUrl} onChange={(e) => setForm({...form, discordUrl: e.target.value})}
                          placeholder="discord.gg/convite" className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-20 pr-6 text-sm focus:border-blue-500 outline-none text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase ml-1">Instagram</label>
                          <div className="relative">
                            <Camera className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500" />
                            <input 
                              type="text" value={form.instagramUrl} onChange={(e) => setForm({...form, instagramUrl: e.target.value})}
                              placeholder="@seu_insta" className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-pink-500 outline-none text-white"
                            />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-zinc-600 uppercase ml-1">YouTube</label>
                          <div className="relative">
                            <Play className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                            <input 
                              type="text" value={form.youtubeUrl} onChange={(e) => setForm({...form, youtubeUrl: e.target.value})}
                              placeholder="youtube.com/c/canal" className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:border-red-500 outline-none text-white"
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA: TERMOS */}
              {activeTab === "termos" && (
                <div className="space-y-8">
                  <div className="border-l-4 border-emerald-500 pl-4 mb-10">
                    <h3 className="text-xl font-black italic uppercase text-white">Diretrizes Legais</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight mt-1">Escreva as regras de reembolso e termos de uso do VIP.</p>
                  </div>
                  
                  <textarea 
                    rows={12} value={form.termsContent} onChange={(e) => setForm({...form, termsContent: e.target.value})}
                    placeholder="Ao adquirir este pacote, você concorda que..."
                    className="w-full bg-black border border-white/10 rounded-[32px] p-8 text-sm focus:border-emerald-500 outline-none text-zinc-300 leading-relaxed font-medium min-h-[350px] scrollbar-hide"
                  />
                  <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase italic italic">
                    <ShieldCheck className="w-3 h-3" /> Seus jogadores devem aceitar estes termos antes do checkout.
                  </div>
                </div>
              )}

              {/* ABA: PAGAMENTO */}
              {activeTab === "pagamento" && (
                <div className="space-y-8">
                   <div className="border-l-4 border-orange-500 pl-4 mb-10">
                    <h3 className="text-xl font-black italic uppercase text-white">Configuração Financeira</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight mt-1">Conecte sua conta para receber pagamentos via PIX.</p>
                  </div>

                  <div className="p-8 bg-orange-500/5 rounded-[32px] border border-orange-500/10 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-5 h-5 text-orange-500" />
                      <h4 className="text-orange-500 font-black text-xs uppercase tracking-widest">Gateway: Mercado Pago</h4>
                    </div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Production Access Token</label>
                    <input 
                      type="password" value={form.mpAccessToken} onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
                      placeholder="APP_USR-..." className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-orange-500 outline-none text-white font-mono"
                    />
                    <p className="text-[9px] text-zinc-500 mt-4 uppercase font-bold italic leading-relaxed">
                      Seu token é criptografado e usado apenas para gerar as cobranças no checkout.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                     <span className="text-[10px] font-black text-zinc-400 uppercase">Segurança de Dados Ativa</span>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}