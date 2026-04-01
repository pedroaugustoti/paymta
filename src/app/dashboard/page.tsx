"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Copy, Save, Server, ShieldAlert, 
  KeyRound, Wallet, Loader2, Globe, 
  Package, ExternalLink 
} from "lucide-react"; // Adicionado Package
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [productCount, setProductCount] = useState(0); // ESTADO PARA OS PRODUTOS
  const [settings, setSettings] = useState({
    slug: "",
    isMaintenance: false,
    mpAccessToken: "",
    licenseKey: "CARREGANDO..."
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Busca Configurações
        const resSettings = await fetch("/api/user/settings");
        const dataSettings = await resSettings.json();
        
        // Busca Produtos (A rota que criamos antes)
        const resProducts = await fetch("/api/products");
        const dataProducts = await resProducts.json();

        if (dataSettings) {
          setSettings({
            slug: dataSettings.slug || "",
            isMaintenance: dataSettings.isMaintenance,
            mpAccessToken: dataSettings.mpAccessToken || "",
            licenseKey: dataSettings.licenseKey
          });
        }
        
        if (Array.isArray(dataProducts)) {
          setProductCount(dataProducts.length);
        }

      } catch (err) {
        console.error("Erro ao carregar Dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    if (session) loadDashboard();
  }, [session]);

  const handleSave = async (updatedFields: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        setSettings(prev => ({ ...prev, ...updatedFields }));
        if (updatedFields.slug) alert("URL da loja atualizada com sucesso!");
      }
    } catch (err) {
      alert("Erro ao sincronizar com a host.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center text-zinc-500 font-black uppercase italic tracking-tighter">
      <Loader2 className="w-6 h-6 animate-spin mr-3 text-yellow-500" /> Sincronizando Host e Produtos...
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto w-full animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase italic">Visão Geral</h1>
          <p className="text-zinc-400 font-medium">Controle operacional e status do seu servidor MTA.</p>
        </div>

        <div className="flex items-center gap-4 bg-zinc-900/80 border border-white/5 p-2 rounded-2xl">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status da Loja</span>
            <span className={`text-xs font-bold uppercase ${settings.isMaintenance ? 'text-red-400' : 'text-emerald-400'}`}>
              {settings.isMaintenance ? 'Em Manutenção' : 'Sistema Online'}
            </span>
          </div>
          <button 
            disabled={saving}
            onClick={() => handleSave({ isMaintenance: !settings.isMaintenance })}
            className={`w-16 h-8 rounded-full relative transition-colors duration-300 focus:outline-none ${settings.isMaintenance ? 'bg-red-500/20 border border-red-500/50' : 'bg-emerald-500/20 border border-emerald-500/50'}`}
          >
            <motion.div 
              animate={{ x: settings.isMaintenance ? 4 : 36 }}
              className={`w-6 h-6 rounded-full absolute top-0.5 ${settings.isMaintenance ? 'bg-red-500' : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'}`}
            />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* CARD: PRODUTOS ATIVOS */}
        <div className="bg-zinc-950/50 border border-white/5 rounded-[32px] p-8 flex flex-col hover:border-yellow-500/20 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estoque</span>
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-tight">Produtos Cadastrados</p>
          <h3 className="text-4xl font-black text-white italic mt-1">{productCount}</h3>
          <div className="mt-6 pt-6 border-t border-white/5">
             <button className="text-[10px] font-black text-yellow-500 uppercase hover:underline">Gerenciar Itens</button>
          </div>
        </div>

        {/* CARD: ENDEREÇO DA LOJA */}
        <div className="bg-zinc-950/50 border border-white/5 rounded-[32px] p-8 flex flex-col hover:border-white/20 transition-all duration-500 lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 border border-white/10">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">URL da Savana</h3>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Link Ativo no momento</p>
            </div>
          </div>
          <div className="flex items-center bg-black border border-white/10 rounded-2xl px-5 py-4">
             <span className="text-zinc-600 font-bold text-xs">paymta.com/</span>
             <span className="text-yellow-500 font-black text-sm ml-1">{settings.slug || 'nao-definido'}</span>
          </div>
          <p className="text-[9px] text-zinc-500 mt-4 uppercase font-bold italic">
            Para alterar seu subdomínio, use o campo abaixo ou vá em configurações.
          </p>
        </div>
      </div>

      {/* Grid de Configurações Técnicas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* URL Customizada (Input) */}
        <div className="bg-zinc-950/50 border border-white/5 rounded-[32px] p-8 flex flex-col">
          <label className="block text-[10px] font-black text-zinc-500 uppercase mb-4 ml-1">Atualizar URL Personalizada</label>
          <div className="flex items-center bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-yellow-500/50 transition-all">
            <input 
              type="text" 
              value={settings.slug}
              onChange={(e) => setSettings({...settings, slug: e.target.value.toLowerCase().replace(/ /g, "-")})}
              className="bg-transparent border-none outline-none text-white font-bold text-sm flex-1"
              placeholder="nome-da-cidade"
            />
          </div>
          <Button 
            disabled={saving || !settings.slug}
            onClick={() => handleSave({ slug: settings.slug })}
            className="w-full mt-6 bg-white hover:bg-zinc-200 text-black font-black py-6 rounded-2xl transition-all"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "ATUALIZAR ENDEREÇO"}
          </Button>
        </div>

        {/* Mercado Pago */}
        <div className="bg-zinc-950/50 border border-white/5 rounded-[32px] p-8 flex flex-col">
          <label className="block text-[10px] font-black text-zinc-500 uppercase mb-4 ml-1">Access Token Mercado Pago</label>
          <input 
            type="password" 
            value={settings.mpAccessToken}
            onChange={(e) => setSettings({...settings, mpAccessToken: e.target.value})}
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-xs focus:border-blue-500/50 outline-none mb-4"
            placeholder="APP_USR-..."
          />
          <Button 
            disabled={saving}
            onClick={() => handleSave({ mpAccessToken: settings.mpAccessToken })}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-6 rounded-2xl transition-all"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "SALVAR TOKEN"}
          </Button>
        </div>

        {/* Card License Key Full Width */}
        <div className="bg-zinc-950/50 border border-white/5 rounded-[32px] p-8 md:col-span-2 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Licença Lua</h3>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Script do Servidor</p>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly
                  value={settings.licenseKey}
                  className="w-full bg-black border border-yellow-500/20 rounded-2xl px-5 py-4 text-yellow-500 font-mono text-xs cursor-default"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(settings.licenseKey);
                    alert("Copiada!");
                  }}
                  className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-5 rounded-2xl transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}