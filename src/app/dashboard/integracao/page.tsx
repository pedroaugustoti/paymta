"use client";

import { useState, useEffect } from "react";
import { 
  Zap, CreditCard, Lock, Save, RefreshCw, Eye, EyeOff, Copy, FileArchive, Download, Server, ExternalLink, Loader2 
} from "lucide-react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

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
    } catch (err) {
      console.error(err);
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

    const newKey = `paymta_sk_${crypto.randomUUID().replace(/-/g, '')}`;
    const updatedForm = { ...form, licenseKey: newKey };
    
    setForm(updatedForm);
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
      
      <PageHeader 
        title="Integrações"
        subtitle="Configure o processador de pagamentos e a infraestrutura in-game."
        category="Gateways & API"
        categoryColor="text-orange-500"
        icon={<Zap className="w-4 h-4" />}
        actionButton={{
          label: "SALVAR ALTERAÇÕES",
          icon: <Save className="w-5 h-5" />,
          onClick: () => handleSave(form),
          isLoading: loading,
          colorClass: "bg-orange-500 hover:bg-orange-600 text-black shadow-xl shadow-orange-500/10"
        }}
      />

      <div className="grid grid-cols-1 gap-10">
        <SectionCard 
          title="Mercado Pago" 
          subtitle="Processador de PIX Oficial"
          icon={<CreditCard className="w-6 h-6" />}
          iconColorClass="bg-blue-500/10 text-blue-500"
          headerAction={
            <a href="https://www.mercadopago.com.br/developers/panel/app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase transition-all shadow-lg shadow-blue-500/20">
              Obter Access Token <ExternalLink className="w-4 h-4" />
            </a>
          }
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Production Access Token</label>
              <div className="relative group">
                <input 
                  type={showMpToken ? "text" : "password"}
                  value={form.mpAccessToken} 
                  onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
                  placeholder="APP_USR-0000000000000000-000000-0000000000000000-000000000" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-6 pr-14 text-sm focus:border-blue-500 outline-none text-white font-mono transition-all"
                />
                <button type="button" onClick={() => setShowMpToken(!showMpToken)} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showMpToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium ml-1">Este token autoriza o sistema a gerar chaves PIX dinâmicas e aprovar pagamentos.</p>
          </div>
        </SectionCard>

        <SectionCard 
          title="Segurança do Servidor" 
          subtitle="Sincronização in-game via License Key"
          icon={<Lock className="w-6 h-6" />}
          iconColorClass="bg-emerald-500/10 text-emerald-500"
          headerAction={
             <button type="button" onClick={generateNewKey} className="flex items-center border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl px-4 py-2 text-xs font-black uppercase transition-all cursor-pointer">
              <RefreshCw className="w-4 h-4 mr-2" /> {form.licenseKey ? "Revogar e Gerar Nova" : "Gerar License Key"}
            </button>
          }
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Server License Key</label>
              <div className="flex gap-2">
                <div className="relative group flex-1">
                  <input 
                    type={showServerToken ? "text" : "password"}
                    value={form.licenseKey} 
                    readOnly 
                    placeholder="Clique no botão acima para gerar sua chave" 
                    className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-6 pr-14 text-sm outline-none text-emerald-400 font-mono transition-all opacity-80 cursor-not-allowed selection:bg-emerald-500/30"
                  />
                  <button type="button" onClick={() => setShowServerToken(!showServerToken)} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    {showServerToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button type="button" onClick={() => copyToClipboard(form.licenseKey, "License Key")} className="bg-white/5 hover:bg-white/10 text-white rounded-2xl h-auto px-6 border border-white/5 shrink-0 cursor-pointer">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10 flex items-start gap-4">
              <Server className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Acesso Restrito</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">Nunca exiba essa chave para seus jogadores.</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard 
          title="Resource PayMTA (MTA:SA)" 
          subtitle="O motor do seu servidor"
          icon={<FileArchive className="w-6 h-6" />}
          iconColorClass="bg-white/5 border border-white/10 text-white"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
            <ol className="text-xs text-zinc-400 space-y-3 font-medium leading-relaxed flex-1">
              <li><span className="text-orange-500 font-black">1.</span> Faça o download do arquivo <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">paymta-core.zip</code>.</li>
              <li><span className="text-orange-500 font-black">2.</span> Extraia na pasta <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">/resources/</code> do seu servidor.</li>
              <li><span className="text-orange-500 font-black">3.</span> Abra o arquivo <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">config.lua</code> e cole a sua <strong>License Key</strong>.</li>
              <li><span className="text-orange-500 font-black">4.</span> Inicie com o comando <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">start paymta-core</code> no console.</li>
            </ol>

            <div className="shrink-0 w-full md:w-auto">
              <button type="button" onClick={() => alert("Em desenvolvimento!")} className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black font-black px-10 py-8 rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-all cursor-pointer">
                <Download className="w-6 h-6" /> BAIXAR SCRIPT (.ZIP)
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}