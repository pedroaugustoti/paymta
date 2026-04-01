"use client";

import { Download, Terminal, Code2, ShieldCheck, FileJson, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function IntegracaoPage() {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `
-- Arquivo: config.lua (Dentro da pasta do resource paymta)

Config = {}

-- Cole sua License Key gerada na aba 'Visão Geral'
Config.LicenseKey = "PMTA-98A7-B6C5-D4E3-F2G1"

-- Configure o grupo VIP padrão que será setado no ACL
Config.DefaultVIPGroup = "vip_diamante"

-- Tempo de checagem do webhook (em milissegundos)
Config.PollingRate = 5000 
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      {/* Cabeçalho */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Integração do Servidor</h1>
        <p className="text-zinc-400 font-medium">Baixe o resource e configure o webhook no seu servidor MTA em 3 passos.</p>
      </div>

      <div className="space-y-8">
        
        {/* PASSO 1: Download */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 border border-yellow-500/20 shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1">1. Download do Resource</h3>
              <p className="text-sm text-zinc-400 font-medium">Baixe o arquivo .zip contendo o script client-side e server-side já otimizado.</p>
            </div>
          </div>
          
          <Button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-black py-6 px-8 rounded-xl transition-all flex items-center gap-2 relative z-10">
            <Download className="w-5 h-5" /> Baixar paymta.zip
          </Button>
        </div>

        {/* PASSO 2: Instalação e ACL */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-8">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 border border-white/10 shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1">2. Instalação e Permissões (ACL)</h3>
              <p className="text-sm text-zinc-400 font-medium">Mova o resource e garanta os direitos administrativos.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-white/5 rounded-xl p-5">
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2"><FileJson className="w-4 h-4 text-zinc-500" /> Estrutura de Pastas</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Extraia o arquivo baixado e coloque a pasta <code className="bg-white/10 text-yellow-400 px-1.5 py-0.5 rounded text-xs font-mono">paymta</code> dentro do diretório <code className="bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded text-xs font-mono">mods/deathmatch/resources/</code> da sua host.
              </p>
            </div>
            <div className="bg-black/50 border border-white/5 rounded-xl p-5">
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Configuração da ACL.xml</h4>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Para que o script consiga entregar os itens e alterar grupos nativamente, adicione o resource ao grupo Admin:
              </p>
              <div className="bg-zinc-950 border border-white/10 rounded-lg p-3 overflow-x-auto">
                <code className="text-emerald-400 font-mono text-xs whitespace-nowrap">
                  &lt;object name="resource.paymta"&gt;&lt;/object&gt;
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 3: Configuração Lua */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-[24px] p-8">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 border border-white/10 shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1">3. Configuração do Script</h3>
              <p className="text-sm text-zinc-400 font-medium">Abra o arquivo config.lua e insira suas credenciais do painel.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute right-4 top-4">
              <button 
                onClick={handleCopy}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg backdrop-blur-md transition-all flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar Exemplo"}
              </button>
            </div>
            <pre className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 overflow-x-auto font-mono text-sm text-zinc-300 leading-relaxed">
              <code>
<span className="text-zinc-500">-- Arquivo: config.lua (Dentro da pasta do resource paymta)</span>{"\n\n"}
<span className="text-blue-400">Config</span> = {"{}"}{"\n\n"}
<span className="text-zinc-500">-- Cole sua License Key gerada na aba 'Visão Geral'</span>{"\n"}
<span className="text-blue-400">Config</span>.LicenseKey = <span className="text-yellow-400">"PMTA-98A7-B6C5-D4E3-F2G1"</span>{"\n\n"}
<span className="text-zinc-500">-- Configure o grupo VIP padrão que será setado no ACL</span>{"\n"}
<span className="text-blue-400">Config</span>.DefaultVIPGroup = <span className="text-yellow-400">"vip_diamante"</span>{"\n\n"}
<span className="text-zinc-500">-- Tempo de checagem da fila de processamento</span>{"\n"}
<span className="text-blue-400">Config</span>.PollingRate = <span className="text-orange-400">5000</span>
              </code>
            </pre>
          </div>
          
          <div className="mt-6 flex items-center gap-3 text-sm font-medium text-zinc-400 bg-black/40 border border-white/5 p-4 rounded-xl">
            <Terminal className="w-4 h-4 text-yellow-400" />
            Por fim, basta digitar <code className="text-white bg-white/10 px-1.5 py-0.5 rounded">refresh</code> e <code className="text-white bg-white/10 px-1.5 py-0.5 rounded">start paymta</code> no console do servidor.
          </div>
        </div>

      </div>
    </div>
  );
}