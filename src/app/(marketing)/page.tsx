"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Zap, Terminal, Cpu, Globe, Box, Lock } from "lucide-react";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-zinc-300 selection:bg-yellow-500/30 font-sans overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/15 via-black to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <HeroSection />
        <IntegrationLogos />
        <BentoFeatures />
        <DeveloperSection />
      </div>
      
      <Footer />
    </main>
  );
}

// ---------------------------------------------------------
// 1. HERO SECTION (Foco no Plug & Play)
// ---------------------------------------------------------
function HeroSection() {
  return (
    <section className="pt-32 pb-16 flex flex-col items-center text-center">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-8 border border-yellow-500/20">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Gateway de Pagamento MTA:SA
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
          Acelere o faturamento <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
            da sua cidade.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Esqueça integrações complexas. Baixe nosso resource em ZIP, coloque sua licença e deixe que o nosso sistema entregue VIPs automaticamente usando os próprios comandos do seu servidor.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-xl px-10 h-14 text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            Explorar Recursos
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-10 h-14 text-lg font-bold transition-all">
            Falar com a Equipe
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------
// 2. SOCIAL PROOF / INTEGRAÇÕES (Sem menção a MySQL)
// ---------------------------------------------------------
function IntegrationLogos() {
  return (
    <div className="py-10 border-y border-white/5 my-12 bg-white/[0.02]">
      <p className="text-center text-sm font-bold text-zinc-600 uppercase tracking-widest mb-6">Uma arquitetura construída para segurança</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
        <div className="font-black text-2xl text-white flex items-center gap-2"><Globe className="w-6 h-6"/> Mercado Pago API</div>
        <div className="font-black text-2xl text-white flex items-center gap-2"><Box className="w-6 h-6"/> Resource Plug & Play</div>
        <div className="font-black text-2xl text-white flex items-center gap-2"><Lock className="w-6 h-6"/> Lua Compilada (Luac)</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 3. BENTO GRID (Apresentação Profissional)
// ---------------------------------------------------------
function BentoFeatures() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Engenharia construída para Roleplay</h2>
        <p className="text-zinc-400 font-medium">O PayMTA foi desenhado para ser seguro, rápido e inviolável.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="md:col-span-2 bg-[#09090b] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-all"></div>
          <Zap className="w-10 h-10 text-yellow-400 mb-6" />
          <h3 className="text-2xl font-black text-white mb-3">Velocidade da Luz in-game</h3>
          <p className="text-zinc-400 leading-relaxed max-w-md">O jogador paga o QRCode PIX e, em milissegundos, a nossa API Cloud confirma a transação e dispara a liberação direto no console do seu servidor. Sem delays, sem relogar.</p>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-1 bg-[#09090b] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all flex flex-col justify-center">
          <ShieldAlert className="w-10 h-10 text-white mb-6" />
          <h3 className="text-xl font-black text-white mb-3">Zero Banco de Dados</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Não pedimos a senha do seu MySQL. O sistema roda de forma independente enviando os comandos nativos que você configurar.</p>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-1 bg-[#09090b] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all">
          <Cpu className="w-10 h-10 text-white mb-6" />
          <h3 className="text-xl font-black text-white mb-3">Core Compilado</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">O núcleo do nosso resource é compilado (Luac). Ninguém consegue ler ou injetar fraudes no script de verificação.</p>
        </div>

        {/* Card 4 */}
        <div className="md:col-span-2 bg-[#09090b] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all flex items-center justify-between">
          <div className="relative z-10">
            <Terminal className="w-10 h-10 text-white mb-6" />
            <h3 className="text-2xl font-black text-white mb-3">Painel SaaS Completo</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md">Controle absoluto fora do jogo. Dashboard web para visualizar faturamento, estornos, tickets de suporte e gerenciar sua loja digital.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// 4. SEÇÃO DESENVOLVEDOR (ZIP e Licença)
// ---------------------------------------------------------
function DeveloperSection() {
  return (
    <section className="py-20 flex flex-col md:flex-row items-center gap-12">
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

      <div className="flex-1 w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-zinc-500 font-mono">paymta/config.lua</span>
        </div>
        <div className="p-6 overflow-x-auto text-sm font-mono text-zinc-300">
          <pre>
            <span className="text-blue-400">Config</span> = {'{}'}<br/><br/>
            <span className="text-zinc-500">-- A chave de licença gerada no seu painel PayMTA web</span><br/>
            <span className="text-blue-400">Config.LicenseKey</span> = <span className="text-yellow-300">"PAYMTA-A1B2-C3D4-E5F6"</span><br/><br/>
            <span className="text-zinc-500">-- Configure a entrega (Mapeie seus comandos de Admin)</span><br/>
            <span className="text-zinc-500">-- Use {'{'}player{'}'} para o ID ou Login do comprador</span><br/>
            <span className="text-blue-400">Config.Pacotes</span> = {'{'}<br/>
            &nbsp;&nbsp;[<span className="text-yellow-300">"vip_diamante"</span>] = <span className="text-yellow-300">"addvip {'{'}player{'}'} Diamante 30"</span>,<br/>
            &nbsp;&nbsp;[<span className="text-yellow-300">"vip_ouro"</span>] &nbsp;&nbsp;&nbsp;&nbsp;= <span className="text-yellow-300">"addvip {'{'}player{'}'} Ouro 30"</span>,<br/>
            &nbsp;&nbsp;[<span className="text-yellow-300">"100k_dinheiro"</span>] = <span className="text-yellow-300">"givemoney {'{'}player{'}'} 100000"</span><br/>
            {'}'}<br/><br/>
            <span className="text-zinc-500">-- Aviso no chat global após a compra?</span><br/>
            <span className="text-blue-400">Config.AvisoGlobal</span> = <span className="text-orange-400">true</span><br/>
          </pre>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// 5. RODAPÉ PREMIUM (Caprichado e Profissional)
// ---------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303] pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          
          {/* Coluna 1 - Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-sm">P</div>
              <span className="text-2xl font-black text-white tracking-tighter">PayMTA</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
              Nossa missão é profissionalizar a economia dos servidores de Multi Theft Auto, entregando tecnologia financeira de ponta para a comunidade.
            </p>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Sistemas Operacionais</span>
            </div>
          </div>

          {/* Coluna 2 - Produto */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Produto</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Visão Geral</a></li>
              <li><a href="/planos" className="hover:text-yellow-400 transition-colors">Preços e Planos</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Changelog (Updates)</a></li>
            </ul>
          </div>

          {/* Coluna 3 - Desenvolvedores */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Desenvolvedores</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Documentação API</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Webhooks</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Baixar Resource</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Comunidade Discord</a></li>
            </ul>
          </div>

          {/* Coluna 4 - Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Reembolso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato Comercial</a></li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-semibold">
            © {new Date().getFullYear()} PayMTA. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-600 font-semibold">
            Desenvolvido no Brasil. Não afiliado oficialmente à Rockstar Games ou Multi Theft Auto.
          </p>
        </div>
      </div>
    </footer>
  );
}