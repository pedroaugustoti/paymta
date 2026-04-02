"use client";

import { useState, useEffect } from "react";
import { 
  Zap, CreditCard, ShieldCheck, Globe, 
  Copy, CheckCircle2, AlertTriangle, Loader2, 
  Save, Eye, EyeOff, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function IntegrationsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showToken, setShowToken] = useState(false);
  
  const [form, setForm] = useState({
    mpAccessToken: "",
    slug: "", // Usaremos o slug para gerar a URL da API
  });

  // CARREGAMENTO SEGURO
  useEffect(() => {
    async function loadIntegrations() {
      try {
        const res = await fetch("/api/user/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            mpAccessToken: data.mpAccessToken || "",
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) alert("✅ Chaves de integração atualizadas!");
    } catch (error) {
      alert("❌ Erro ao salvar chaves.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado para a área de transferência!");
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Gateways...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER TÉCNICO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Conexões Externas</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Integração & API</h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Conecte o sistema financeiro e configure o Webhook para o seu servidor de MTA.</p>
        </div>

        <Button 
          onClick={handleSave} disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-black font-black px-10 py-7 rounded-2xl flex items-center gap-2 shadow-xl shadow-orange-500/10 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SALVAR CONEXÕES</>}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10">
        
        {/* CARD 1: MERCADO PAGO (ÁREA CRÍTICA) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase text-white leading-tight">Checkout Mercado Pago</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Processamento de Pagamentos via PIX.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase italic">Conexão Criptografada</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Production Access Token</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input 
                  type={showToken ? "text" : "password"}
                  value={form.mpAccessToken} 
                  onChange={(e) => setForm({...form, mpAccessToken: e.target.value})}
                  placeholder="APP_USR-0000000000000000-000000-0000000000000000-000000000" 
                  className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-sm focus:border-orange-500 outline-none text-white font-mono transition-all"
                />
                <button 
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-6 bg-orange-500/5 rounded-[32px] border border-orange-500/10 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-orange-500 font-black text-[10px] uppercase tracking-widest">Segurança de Dados</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mt-1">
                  Este token dá permissão para gerar cobranças em seu nome. Nunca compartilhe este código. 
                  Você pode encontrá-lo no <strong>Painel do Desenvolvedor</strong> do Mercado Pago em "Suas Aplicações" &gt; "Credenciais de Produção".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARD 2: CONEXÃO COM O SERVIDOR (API WEBHOOK) */}
        <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black italic uppercase text-white leading-tight">Configuração do Script Lua</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sincronização entre Site e Servidor de MTA.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Endpoint de Consulta (API)</label>
                <span className="text-[9px] font-bold text-emerald-500 uppercase italic">Status: Ativo</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-black border border-white/10 rounded-2xl py-4 px-6 text-xs text-zinc-500 font-mono flex items-center overflow-x-auto whitespace-nowrap">
                  https://paymta.vercel.app/api/shop/verify/{form.slug || "seu-slug"}
                </div>
                <Button 
                  onClick={() => copyToClipboard(`https://paymta.vercel.app/api/shop/verify/${form.slug}`)}
                  className="bg-white/5 hover:bg-white/10 text-white rounded-2xl h-auto px-6 border border-white/5"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                Use esta URL no seu script Lua (fetchRemote) para verificar se um pagamento foi aprovado antes de entregar o item in-game.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">Tempo de Resposta</p>
                    <p className="text-lg font-black text-white italic tracking-tighter">~120ms</p>
                  </div>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">Verificação Automática</p>
                    <p className="text-lg font-black text-white italic tracking-tighter">Ligado</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}