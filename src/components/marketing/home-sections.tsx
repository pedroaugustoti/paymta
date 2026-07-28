"use client";

import { ShieldAlert, Zap, Terminal, Cpu, Globe, Box, Lock, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ==========================================
// 1. HERO SECTION
// ==========================================
export function HeroSection() {
  return (
    <section className="pt-32 pb-16 flex flex-col items-center text-center">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-8 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)] transform-gpu hover:scale-105 transition-transform">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Gateway Oficial de Automação PIX para MTA:SA
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
          Acelere o faturamento <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
            da sua cidade.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Esqueça o envio manual de comprovantes no Discord. Baixe nosso resource, conecte sua licença e automatize a entrega de VIPs e coins via PIX em tempo real.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/planos" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-xl px-10 h-14 text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.2)] flex items-center justify-center w-full sm:w-auto transform-gpu">
            Começar Teste Grátis
          </Link>
          <Link href="#como-funciona" className="border border-white/10 text-white hover:bg-white/5 rounded-xl px-10 h-14 text-lg font-bold transition-all flex items-center justify-center w-full sm:w-auto transform-gpu">
            Ver Como Funciona
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. SOCIAL PROOF / INTEGRAÇÕES
// ==========================================
export function IntegrationLogos() {
  return (
    <div className="py-10 border-y border-white/5 my-12 bg-white/[0.02] animate-in fade-in duration-1000 delay-300 fill-mode-forwards opacity-0">
      <p className="text-center text-sm font-bold text-zinc-600 uppercase tracking-widest mb-6">Tecnologia de ponta e infraestrutura robusta</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 will-change-[filter,opacity]">
        <div className="font-black text-xl md:text-2xl text-white flex items-center gap-2"><Globe className="w-6 h-6"/> Mercado Pago API</div>
        <div className="font-black text-xl md:text-2xl text-white flex items-center gap-2"><Box className="w-6 h-6"/> Resource Plug & Play</div>
        <div className="font-black text-xl md:text-2xl text-white flex items-center gap-2"><Lock className="w-6 h-6"/> Lua Compilada (Luac)</div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ESTATÍSTICAS DE IMPACTO
// ==========================================
export function StatsSection() {
  return (
    <section className="py-12 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-forwards opacity-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Entrega Média", value: "< 2.5s", desc: "Do PIX aprovado ao in-game" },
          { label: "Uptime da API", value: "99.9%", desc: "Estabilidade garantida 24/7" },
          { label: "Segurança", value: "100%", desc: "Zero acesso ao seu banco MySQL" },
          { label: "Configuração", value: "2 Min", desc: "Pronto para faturar rápido" }
        ].map((stat, i) => (
          <div key={i} className="bg-[#09090b] border border-white/5 p-6 rounded-3xl text-center hover:border-white/10 transition-colors transform-gpu hover:-translate-y-1 duration-300">
            <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-xs text-zinc-500 font-medium">{stat.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 4. BENTO GRID DE RECURSOS
// ==========================================
export function BentoFeatures() {
  return (
    <section id="features" className="py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Engenharia construída para Roleplay</h2>
        <p className="text-zinc-400 font-medium">O PayMTA foi desenhado para ser seguro, rápido e inviolável.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#09090b] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors transform-gpu">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(234,179,8,0.05),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10">
            <Zap className="w-10 h-10 text-yellow-400 mb-6 transform-gpu group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-black text-white mb-3">Velocidade da Luz in-game</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md">O jogador paga o QRCode PIX e, em milissegundos, a nossa API Cloud confirma a transação e dispara a liberação direto no console do seu servidor. Sem delays, sem relogar.</p>
          </div>
        </div>

        <div className="md:col-span-1 bg-[#09090b] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-colors flex flex-col justify-center transform-gpu">
          <ShieldAlert className="w-10 h-10 text-white mb-6 transform-gpu group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-xl font-black text-white mb-3">Zero Banco de Dados</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Não pedimos a senha do seu MySQL. O sistema roda de forma independente enviando comandos nativos.</p>
        </div>

        <div className="md:col-span-1 bg-[#09090b] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-colors transform-gpu">
          <Cpu className="w-10 h-10 text-white mb-6 transform-gpu group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-xl font-black text-white mb-3">Core Compilado</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">O núcleo do nosso resource é compilado (Luac). Ninguém consegue ler ou injetar fraudes no script de verificação.</p>
        </div>

        <div className="md:col-span-2 bg-[#09090b] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-colors flex items-center justify-between transform-gpu">
          <div className="relative z-10">
            <Terminal className="w-10 h-10 text-white mb-6 transform-gpu group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-black text-white mb-3">Painel SaaS Completo</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md">Controle absoluto fora do jogo. Dashboard web para visualizar faturamento, estornos, tickets de suporte e gerenciar sua loja digital.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. COMO FUNCIONA EM 3 PASSOS
// ==========================================
export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 scroll-mt-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Como funciona na prática?</h2>
        <p className="text-zinc-400 font-medium">Três passos simples entre a configuração e o primeiro lucro automático.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { step: "01", title: "Crie sua Loja & Produtos", desc: "Acesse o painel web, cadastre os pacotes de VIP ou coins da sua cidade e conecte sua conta do Mercado Pago em segundos." },
          { step: "02", title: "Instale o Resource", desc: "Baixe o ZIP gerado, coloque na pasta resources do seu servidor MTA e adicione sua chave de licença no config.lua." },
          { step: "03", title: "Venda Automática", desc: "O player compra pelo site via PIX. Nosso sistema valida o pagamento e executa o comando de entrega no servidor na mesma hora." }
        ].map((item, index) => (
          <div key={index} className="bg-[#09090b] border border-white/5 p-8 rounded-3xl relative hover:border-white/10 transition-colors">
            <div className="text-5xl font-black text-yellow-500/20 mb-4">{item.step}</div>
            <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 6. SEÇÃO DESENVOLVEDOR (ZIP e Licença)
// ==========================================
export function DeveloperSection() {
  return (
    <section className="py-20 flex flex-col md:flex-row items-center gap-12 border-t border-white/5">
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Segurança e praticidade. <br/><span className="text-yellow-400">Instalação em 2 minutos.</span></h2>
        <p className="text-zinc-400 mb-8 leading-relaxed font-medium">
          Você só precisa baixar o arquivo ZIP no seu painel e extrair na pasta do servidor. O motor principal já vem compilado. 
          Você edita apenas o arquivo <strong>config.lua</strong>, cola sua License Key e os comandos da sua base.
        </p>
        <ul className="space-y-4 text-sm font-bold text-zinc-300">
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" /> Resource Plug & Play (.zip pronto para uso)</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" /> Roda via comandos de console nativos</li>
          <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" /> Compatível instantaneamente com qualquer gamemode</li>
        </ul>
      </div>

      <div className="flex-1 w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform-gpu hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-500">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-zinc-500 font-mono">paymta/config.lua</span>
        </div>
        <div className="p-6 overflow-x-auto text-sm font-mono text-zinc-300 scrollbar-thin scrollbar-thumb-white/10">
          <pre>
            <span className="text-blue-400">Config</span> = &#123;&#125;<br/><br/>
            <span className="text-zinc-500">-- A chave de licença gerada no seu painel PayMTA web</span><br/>
            <span className="text-blue-400">Config.LicenseKey</span> = <span className="text-yellow-300">&quot;PAYMTA-A1B2-C3D4-E5F6&quot;</span><br/><br/>
            <span className="text-zinc-500">-- Configure a entrega (Mapeie seus comandos de Admin)</span><br/>
            <span className="text-zinc-500">-- Use &#123;player&#125; para o ID ou Login do comprador</span><br/>
            <span className="text-blue-400">Config.Pacotes</span> = &#123;<br/>
            &nbsp;&nbsp;[&quot;vip_diamante&quot;] = <span className="text-yellow-300">&quot;addvip &#123;player&#125; Diamante 30&quot;</span>,<br/>
            &nbsp;&nbsp;[&quot;vip_ouro&quot;] &nbsp;&nbsp;&nbsp;&nbsp;= <span className="text-yellow-300">&quot;addvip &#123;player&#125; Ouro 30&quot;</span>,<br/>
            &nbsp;&nbsp;[&quot;100k_dinheiro&quot;] = <span className="text-yellow-300">&quot;givemoney &#123;player&#125; 100000&quot;</span><br/>
            &#125;<br/><br/>
            <span className="text-zinc-500">-- Aviso no chat global após a compra?</span><br/>
            <span className="text-blue-400">Config.AvisoGlobal</span> = <span className="text-orange-400">true</span><br/>
          </pre>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. FAQ / PERGUNTAS FREQUENTES
// ==========================================
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "O PayMTA exige acesso ao banco de dados MySQL da minha cidade?",
      a: "De forma alguma! Por questões de segurança, nossa arquitetura não solicita credenciais do seu banco de dados. O sistema interage exclusivamente enviando comandos nativos de console que você mesmo define no config.lua."
    },
    {
      q: "Funciona com qualquer base/gamemode de MTA:SA?",
      a: "Sim. Como o script dispara comandos de console (ex: addvip, givemoney, setgroup), ele se adapta instantaneamente a qualquer base de Roleplay ou DayZ do mercado, desde que você configure os comandos corretos da sua staff."
    },
    {
      q: "O que acontece se o servidor estiver offline no momento da compra?",
      a: "Nossa API possui um sistema de fila inteligente. Se o servidor cair momentaneamente, a entrega fica pendente e é disparada automaticamente assim que o servidor reconectar e sincronizar com a nuvem."
    },
    {
      q: "Preciso ter CNPJ para receber os pagamentos via Mercado Pago?",
      a: "Não é obrigatório. Você pode utilizar uma conta física (CPF) do Mercado Pago para receber os valores das vendas de forma totalmente integrada e segura."
    }
  ];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Perguntas Frequentes</h2>
        <p className="text-zinc-400 font-medium">Tudo o que você precisa saber antes de automatizar sua loja.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="bg-[#09090b] border border-white/5 rounded-2xl p-6 cursor-pointer transition-colors hover:border-white/10"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-white flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                  {faq.q}
                </h3>
                <span className={`text-yellow-400 font-bold transition-transform duration-300 transform-gpu ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="mt-4 text-zinc-400 text-sm leading-relaxed pl-8 border-l border-yellow-500/20">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// 8. FINAL CTA
// ==========================================
export function FinalCTA() {
  return (
    <section className="py-20 text-center border-t border-white/5">
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-[32px] p-12 relative overflow-hidden transform-gpu hover:border-yellow-500/40 transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.15),_transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Pronto para revolucionar o faturamento da sua cidade?
          </h2>
          <p className="text-zinc-400 text-base mb-8 font-medium">
            Junte-se aos donos de servidores que já escalaram suas vendas com automação instantânea e zero dor de cabeça.
          </p>
          <Link href="/planos" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-xl px-10 h-14 text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.3)] inline-flex items-center justify-center transform-gpu">
            Começar Teste Grátis Agora <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}