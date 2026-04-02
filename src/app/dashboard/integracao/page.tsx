"use client";

import { useState, useEffect } from "react";
import { 
  Zap, CreditCard, ShieldCheck, Globe, 
  Copy, CheckCircle2, AlertTriangle, Loader2, 
  Save, Eye, EyeOff, RefreshCw, ExternalLink, Key,
  Download, FileArchive, Lock, Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function IntegrationsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showMpToken, setShowMpToken] = useState(false);
  const [showServerToken, setShowServerToken] = useState(false);
  
  const [form, setForm] = useState({
    mpAccessToken: "",
    licenseKey: "", 
    slug: "", 
  });

  useEffect(() => {
    async function loadIntegrations() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            mpAccessToken: data.mpAccessToken || "",
            licenseKey: data.licenseKey || "",
            slug: data.slug || "",
          });
        }
      } catch (err) {
        console.error("Falha na sincronização técnica:", err);
      } finally {
        setFetching(false);
      }
    }
    if (session) loadIntegrations();
  }, [session]);

  const handleSave = async (formData = form) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) alert("✅ Integrações e chaves sincronizadas com sucesso!");
    } catch (error) {
      alert("❌ Erro ao salvar chaves.");
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    if (form.licenseKey) {
      const confirmRevoke = confirm("Atenção: Gerar uma nova licença invalidará a atual. O seu servidor MTA perderá a conexão de pagamentos até você atualizar o config.lua com a nova chave. Deseja continuar?");
      if (!confirmRevoke) return;
    }

    // Gera um hash criptográfico seguro (SaaS Standard)
    const newKey = `paymta_sk_${crypto.randomUUID().replace(/-/g, '')}`;
    const updatedForm = { ...form, licenseKey: newKey };
    
    setForm(updatedForm);
    // Auto-salva para garantir que a chave não seja perdida se o usuário fechar a página
    await handleSave(updatedForm); 
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return alert(`Nenhuma ${label} gerada para copiar.`);
    navigator.clipboard.writeText(text);
    alert(`${label} copiada para a área de transferência!`);
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 bg-transparent">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Conectando ao Core...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER TÉCNICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gateways & API</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Integrações</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Configure o processador de pagamentos e a infraestrutura in-game.</p>
        </div>

        <Button 
          onClick={() => handleSave(form)} disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-black font-black px-10 py-7 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-500/10 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SALVAR ALTERAÇÕES</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* CARD 1: MERCADO PAGO */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shadow-inner">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase text-white leading-tight">Mercado Pago</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Processador de PIX Oficial</p>
              </div>
            </div>
            
            <a 
              href="https://www.mercadopago.com.br/developers/panel/app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase transition-all shadow-lg shadow-blue-500/20"
            >
              Obter Access Token <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Production Access Token (Token de Produção)</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input 
                  type={showMpToken ? "text" : "password"}
                  value={form.mpAccessToken} 
                  onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
                  placeholder="APP_USR-0000000000000000-000000-0000000000000000-000000000" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-sm focus:border-blue-500 outline-none text-white font-mono transition-all"
                />
                <button 
                  onClick={() => setShowMpToken(!showMpToken)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showMpToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium ml-1">
              Este token é estritamente confidencial. Ele autoriza o sistema a gerar chaves PIX dinâmicas e aprovar pagamentos em tempo real na sua conta do Mercado Pago.
            </p>
          </div>
        </section>

        {/* CARD 2: AUTENTICAÇÃO DO SERVIDOR (LICENSE KEY) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase text-white leading-tight">Segurança do Servidor</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sincronização in-game via License Key</p>
              </div>
            </div>

            {/* BOTÃO DE GERAR NOVA CHAVE */}
            <Button 
              onClick={generateNewKey}
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> 
              {form.licenseKey ? "Revogar e Gerar Nova" : "Gerar License Key"}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Server License Key (Chave de API)</label>
              <div className="flex gap-2">
                <div className="relative group flex-1">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500">
                    <Key className="w-4 h-4" />
                  </div>
                  <input 
                    type={showServerToken ? "text" : "password"}
                    value={form.licenseKey} 
                    readOnly // BLOQUEADO PARA EDIÇÃO MANUAL
                    placeholder="Clique no botão acima para gerar sua chave" 
                    className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-sm outline-none text-emerald-400 font-mono transition-all opacity-80 cursor-not-allowed selection:bg-emerald-500/30"
                  />
                  <button 
                    onClick={() => setShowServerToken(!showServerToken)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showServerToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button 
                  onClick={() => copyToClipboard(form.licenseKey, "License Key")}
                  className="bg-white/5 hover:bg-white/10 text-white rounded-2xl h-auto px-6 border border-white/5 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10 flex items-start gap-4">
              <Server className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Acesso Restrito</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">
                  A <strong>License Key</strong> é uma assinatura criptografada que prova para a nossa API que quem está solicitando a liberação de um item VIP é realmente o seu servidor. Nunca exiba essa chave para seus jogadores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARD 3: DOWNLOAD DO RESOURCE (SCRIPT MTA) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white">
                  <FileArchive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase text-white leading-tight">Resource PayMTA (MTA:SA)</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">O motor do seu servidor</p>
                </div>
              </div>
              
              <ol className="text-xs text-zinc-400 space-y-3 font-medium leading-relaxed pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-black">1.</span> Faça o download do arquivo <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">paymta-core.zip</code>.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-black">2.</span> Extraia na pasta <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">/resources/</code> do seu servidor.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-black">3.</span> Abra o arquivo <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">config.lua</code> e cole a sua <strong>License Key</strong>.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-black">4.</span> Inicie com o comando <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">start paymta-core</code> no console.
                </li>
              </ol>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Button 
                onClick={() => alert("O arquivo paymta-core.zip será baixado em breve! (Em desenvolvimento)")}
                className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black font-black px-10 py-8 rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-105"
              >
                <Download className="w-6 h-6" /> BAIXAR SCRIPT (.ZIP)
              </Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" /> Versão 1.0 (Estável)
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}