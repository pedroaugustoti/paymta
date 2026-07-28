"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, CreditCard, Lock, Save, RefreshCw, Eye, EyeOff, 
  Copy, FileArchive, Download, Server, ExternalLink, 
  Loader2, CheckCircle2, AlertCircle 
} from "lucide-react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

export default function IntegrationsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showMpToken, setShowMpToken] = useState(false);
  const [showServerToken, setShowServerToken] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  
  const [form, setForm] = useState({
    mpAccessToken: "",
    licenseKey: "", 
    slug: "", 
  });

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
      if (res.ok) {
        showToast("Integrações e chaves sincronizadas com sucesso!", "success");
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      showToast("Erro ao salvar credenciais. Verifique sua conexão.", "error");
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    if (form.licenseKey) {
      const confirmRevoke = window.confirm("Atenção: Gerar uma nova licença invalidará a atual. O seu servidor MTA perderá a conexão até você atualizar o config.lua com a nova chave. Deseja continuar?");
      if (!confirmRevoke) return;
    }

    const newKey = `paymta_sk_${crypto.randomUUID().replace(/-/g, '')}`;
    const updatedForm = { ...form, licenseKey: newKey };
    
    setForm(updatedForm);
    await handleSave(updatedForm); 
    showToast("Nova License Key gerada e ativada!", "success");
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) {
      showToast(`Nenhuma ${label} gerada para copiar.`, "warning");
      return;
    }
    navigator.clipboard.writeText(text);
    showToast(`${label} copiada para a área de transferência!`, "success");
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500 transform-gpu" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Conectando ao Core...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 transform-gpu relative">
      
      {/* TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
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
        title="Integrações da API"
        subtitle="Configure o processador de pagamentos e a infraestrutura in-game."
        category="Gateways & Conexão"
        categoryColor="text-orange-500"
        icon={<Zap className="w-4 h-4" />}
        actionButton={{
          label: "SALVAR ALTERAÇÕES",
          icon: <Save className="w-5 h-5" />,
          onClick: () => handleSave(form),
          isLoading: loading,
          colorClass: "bg-orange-500 hover:bg-orange-600 text-black shadow-xl shadow-orange-500/20"
        }}
      />

      <div className="grid grid-cols-1 gap-8">
        
        {/* MERCADO PAGO SECTION */}
        <SectionCard 
          title="Mercado Pago" 
          subtitle="Processador de PIX Oficial"
          icon={<CreditCard className="w-6 h-6" />}
          iconColorClass="bg-blue-500/10 text-blue-500"
          headerAction={
            <a href="https://www.mercadopago.com.br/developers/panel/app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] hover:bg-blue-500 hover:text-white border border-white/10 hover:border-blue-500 text-zinc-300 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg transform-gpu">
              Obter Access Token <ExternalLink className="w-3.5 h-3.5" />
            </a>
          }
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Production Access Token</label>
              <div className="relative group">
                <input 
                  type={showMpToken ? "text" : "password"}
                  value={form.mpAccessToken} 
                  onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
                  placeholder="APP_USR-0000000000000000-000000-0000000000000000-000000000" 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:border-blue-500/50 outline-none text-white font-mono transition-colors shadow-inner"
                />
                <button type="button" onClick={() => setShowMpToken(!showMpToken)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  {showMpToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold ml-1">
              Este token autoriza o sistema a gerar chaves PIX dinâmicas e aprovar pagamentos na sua conta Mercado Pago.
            </p>
          </div>
        </SectionCard>

        {/* SERVER LICENSE KEY SECTION */}
        <SectionCard 
          title="Segurança do Servidor" 
          subtitle="Sincronização in-game via License Key"
          icon={<Lock className="w-6 h-6" />}
          iconColorClass="bg-emerald-500/10 text-emerald-500"
          headerAction={
             <button type="button" onClick={generateNewKey} className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase transition-all shadow-lg transform-gpu active:scale-95">
              <RefreshCw className="w-3.5 h-3.5" /> {form.licenseKey ? "Revogar e Gerar Nova" : "Gerar License Key"}
            </button>
          }
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Server License Key</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative group flex-1">
                  <input 
                    type={showServerToken ? "text" : "password"}
                    value={form.licenseKey} 
                    readOnly 
                    placeholder="Clique no botão acima para gerar sua chave" 
                    className="w-full bg-[#030303] border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-sm outline-none text-emerald-400 font-mono transition-all cursor-not-allowed selection:bg-emerald-500/30 shadow-inner"
                  />
                  <button type="button" onClick={() => setShowServerToken(!showServerToken)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                    {showServerToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={() => copyToClipboard(form.licenseKey, "License Key")} 
                  className="bg-[#0a0a0a] hover:bg-white/10 text-zinc-300 hover:text-white rounded-2xl px-6 py-4 border border-white/10 shrink-0 transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase transform-gpu active:scale-95"
                >
                  <Copy className="w-4 h-4" /> <span className="sm:hidden">Copiar Chave</span>
                </button>
              </div>
            </div>

            <div className="p-5 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 flex items-start gap-4">
              <Server className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">Acesso Restrito ao Backend</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">Nunca exiba essa chave para seus jogadores ou staff. Ela é o passaporte que permite ao painel web enviar comandos diretamente para o console do seu servidor MTA.</p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* DOWNLOAD RESOURCE SECTION */}
        <SectionCard 
          title="Resource PayMTA" 
          subtitle="O motor de processamento do seu servidor"
          icon={<FileArchive className="w-6 h-6" />}
          iconColorClass="bg-white/5 border border-white/10 text-white"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 space-y-4">
              <p className="text-xs text-zinc-400 font-medium mb-2">Siga as instruções abaixo para ativar a automação in-game:</p>
              <ul className="text-xs text-zinc-300 space-y-3 font-medium flex flex-col">
                <li className="flex gap-3 items-center bg-[#050505] p-3 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-black shrink-0">1</span> 
                  <span>Faça o download do arquivo <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-300 font-mono text-[10px]">paymta-core.zip</code>.</span>
                </li>
                <li className="flex gap-3 items-center bg-[#050505] p-3 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-black shrink-0">2</span> 
                  <span>Extraia na pasta <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-300 font-mono text-[10px]">[resources]</code> do seu servidor.</span>
                </li>
                <li className="flex gap-3 items-center bg-[#050505] p-3 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-black shrink-0">3</span> 
                  <span>Abra o <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-300 font-mono text-[10px]">config.lua</code> e cole a sua <strong>License Key</strong>.</span>
                </li>
                <li className="flex gap-3 items-center bg-[#050505] p-3 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-black shrink-0">4</span> 
                  <span>Inicie com o comando <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-300 font-mono text-[10px]">start paymta-core</code> no console.</span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <button 
                type="button" 
                onClick={() => showToast("Download do Core estará disponível na versão final de produção.", "warning")} 
                className="w-full md:w-auto bg-white hover:bg-zinc-200 text-black font-black px-8 py-6 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all cursor-pointer transform-gpu active:scale-95"
              >
                <Download className="w-5 h-5" /> BAIXAR SCRIPT (.ZIP)
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}