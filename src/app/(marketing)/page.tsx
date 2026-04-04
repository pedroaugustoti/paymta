"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Rocket, ShieldCheck, Zap, Check, ChevronRight, BarChart3, Users, DollarSign, DatabaseZap, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-hidden selection:bg-yellow-500/30 font-sans">
      {/* Background Grid Dinâmico (Menor) */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Luzes Neon Suaves */}
      <div className="fixed top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 pt-28 px-6">
        
        {/* 1. HERO SECTION TURBINADA & EQUILIBRADA */}
        <section className="max-w-6xl mx-auto flex flex-col items-center mb-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Infraestrutura Financeira Nativa para MTA
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent leading-[1.1] max-w-4xl">
              Seu servidor vendendo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 filter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                24h no automático.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Esqueça as entregas manuais. Integre o Mercado Pago ao seu MySQL e automatize VIPs em menos de 5 minutos com nosso script .lua de alta performance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto sm:max-w-none">
              <Button size="lg" className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-black px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] flex items-center gap-2 group">
                Começar a Faturar
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-yellow-500/30 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 px-10 py-7 text-lg rounded-2xl transition-all font-bold">
                Ler Documentação
              </Button>
            </div>
          </motion.div>

          {/* MOCKUP FLUTUANTE AJUSTADO */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full max-w-[1100px] mx-auto mt-20 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 rounded-[30px] blur-xl opacity-10 animate-pulse"></div>
            
            <div className="relative bg-[#080808] border border-white/10 rounded-[28px] p-2.5 shadow-2xl grid grid-cols-12 gap-2.5 backdrop-blur-xl">
              
              {/* SaaS Dashboard View */}
              <div className="col-span-12 xl:col-span-7 bg-zinc-950/60 rounded-[24px] border border-white/5 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Painel PayMTA</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard icon={<BarChart3 />} label="Hoje" value="R$ 1.450" accent />
                    <StatCard icon={<Users />} label="VIPs" value="189" />
                    <StatCard icon={<Activity />} label="Transações" value="32" />
                </div>

                {/* Chart Simulado */}
                <div className="h-40 bg-zinc-900 rounded-xl border border-white/5 p-5 flex flex-col relative overflow-hidden mb-5">
                    <div className="flex-1 flex items-end gap-1.5 justify-between pt-2">
                        {[40, 60, 45, 80, 75, 100, 90].map((height, i) => (
                            <motion.div 
                                key={i} 
                                initial={{height: 0}} 
                                animate={{height: `${height}%`}} 
                                transition={{delay: 1 + (i*0.1), duration: 0.5}}
                                className={`flex-1 rounded-t ${i === 5 ? 'bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-zinc-700'}`}
                            />
                        ))}
                    </div>
                </div>
              </div>

              {/* MTA Server Console Simulator */}
              <div className="col-span-12 xl:col-span-5 bg-black rounded-[24px] border border-zinc-800/50 p-5 flex flex-col font-mono relative">
                <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3 relative">
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="text-zinc-500 text-[11px]">Console do Servidor - paymta-core.lua</div>
                    <div className="absolute top-0 right-0 px-2 py-0.5 rounded text-[9px] bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold uppercase">
                        Simulação
                    </div>
                </div>
                
                <div className="flex-1 space-y-1.5 text-[11px] text-zinc-300 overflow-hidden relative">
                    <p className="text-zinc-600">[14:32:01] <span className="text-white">SERVER:</span> MTA v1.6.0 [Iniciando]</p>
                    <p className="text-zinc-600">[14:32:03] <span className="text-yellow-400">[PayMTA]</span> Carregando resource 'paymta'...</p>
                    <p className="text-zinc-600">[14:32:04] <span className="text-emerald-400">[PayMTA]</span> SUCESSO: Autenticação concluída.</p>
                    
                    {/* Linhas de Simulação Dinâmica */}
                    <TypewriterLog delay={5000} text="[14:35:12] [PayMTA] Pagamento PIX recebido ID: 987654321" color="text-zinc-500" />
                    <TypewriterLog delay={6500} text="[14:35:13] [PayMTA] SUCESSO: Benefício entregue para 'Gamer99'" color="text-emerald-400" accent />

                    {/* Cursor */}
                    <div className="text-yellow-400 animate-pulse">_</div>
                    
                    {/* Brilho ao entregar */}
                    <motion.div animate={{ opacity: [0, 0.4, 0] }} transition={{ delay: 6500, duration: 1 }} className="absolute inset-0 bg-yellow-500/5 blur-3xl pointer-events-none rounded-2xl" />
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 2. MINI FEATURES */}
        <section id="features" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 pb-24">
           <FeatureCard 
             icon={<DatabaseZap className="w-6 h-6 text-yellow-400" />} 
             title="Integração MySQL" 
             description="Script Lua comunica direto com seu banco. O PIX cai, o VIP é inserido instantaneamente."
           />
           <FeatureCard 
             icon={<ShieldCheck className="w-6 h-6 text-yellow-400" />} 
             title="Blindagem Total" 
             description="Validação criptográfica de ponta a ponta. Zero chance de fraudes ou VIPs falsos."
           />
           <FeatureCard 
             icon={<Zap className="w-6 h-6 text-yellow-400" />} 
             title="Configuração Rápida" 
             description="Gere sua Chave de API do Mercado Pago, cole no painel PayMTA e ligue o script."
           />
        </section>

        {/* 3. PRICING SECTION */}
        <PricingSection />
        
        {/* 4. FOOTER */}
        <Footer />

=======
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
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
      </div>
    </main>
  );
}

// ---------------------------------------------------------
<<<<<<< HEAD
// COMPONENTES AUXILIARES E ANIMAÇÕES
// ---------------------------------------------------------

interface TypewriterLogProps { text: string; delay: number; color?: string; accent?: boolean;}

function TypewriterLog({ text, delay, color = "text-zinc-300", accent = false }: TypewriterLogProps) {
    const [visibleText, setVisibleText] = useState("");
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) { setVisibleText(prev => prev + text[index]); index++; } 
                else { clearInterval(interval); }
            }, 10);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);
    if (!started) return null;
    return <p className={`${color} ${accent ? 'font-bold' : ''}`}>{visibleText}</p>;
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-[28px] border border-white/5 bg-zinc-950/40 backdrop-blur-sm hover:border-yellow-500/30 hover:bg-zinc-950/80 transition-all duration-300 group cursor-default">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-yellow-500/10 group-hover:scale-105 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold mb-3 text-white group-hover:text-yellow-400 transition-colors tracking-tight">{title}</h3>
      <p className="text-zinc-400 text-base leading-relaxed font-medium">{description}</p>
=======
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
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
    </div>
  );
}

<<<<<<< HEAD
function StatCard({ icon, label, value, accent = false }: { icon: React.ReactNode, label: string, value: string, accent?: boolean }) {
    return (
        <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4 shadow-inner">
            <div className={`flex items-center gap-1.5 text-xs mb-2 ${accent ? 'text-yellow-400' : 'text-zinc-500'}`}>
                {icon} <span className="font-semibold">{label}</span>
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
        </div>
    );
}

function PricingSection() {
    const plans = [
      { name: "Iniciante", price: "R$ 49", features: ["Até 50 slots", "Entrega automática", "Painel de Controle base"], button: "Começar", highlight: false },
      { name: "Profissional", price: "R$ 89", features: ["Slots Ilimitados", "Histórico de Vendas", "Suporte 24h", "Manutenção Customizada"], button: "Plano Definitivo", highlight: true },
      { name: "Empresarial", price: "R$ 149", features: ["Múltiplos Servidores", "API de Integração", "Gestão de Equipe", "Checkout com sua marca"], button: "Falar com Vendas", highlight: false }
    ];
    return (
      <section id="pricing" className="max-w-6xl mx-auto py-20 px-6 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter max-w-2xl leading-tight">Planos para escalar o seu faturamento</h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">Automatize os recebimentos e deixe a engenharia financeira com a PayMTA.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div key={plan.name} className={`p-8 rounded-[32px] border transition-all duration-500 flex flex-col relative overflow-hidden ${ plan.highlight ? 'border-yellow-500 bg-gradient-to-b from-yellow-500/10 to-transparent shadow-[0_0_30px_rgba(234,179,8,0.15)] scale-105' : 'border-white/5 bg-zinc-950/40 hover:border-white/10 hover:bg-zinc-950/70' }`} >
              {plan.highlight && <div className="absolute top-0 inset-x-0 h-0.5 bg-yellow-400"></div> }
              <h3 className={`text-xl font-extrabold mb-2 ${plan.highlight ? 'text-yellow-400' : 'text-white'}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span> <span className="text-zinc-500 font-bold text-base">/mês</span>
              </div>
              <ul className="space-y-3.5 mb-10 flex-1 text-sm font-medium text-zinc-300">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.highlight ? 'bg-yellow-500/20' : 'bg-white/10'}`}><Check className={`w-3.5 h-3.5 ${plan.highlight ? 'text-yellow-400' : 'text-white'}`} /></div> {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-6 rounded-2xl font-black ${ plan.highlight ? 'bg-yellow-400 hover:bg-yellow-500 text-black border-0' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10' }`} >
                {plan.button}
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 py-16 relative z-10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-zinc-500 font-medium">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-3"><div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-sm">P</div><span className="text-2xl font-black text-white tracking-tighter">PayMTA</span></div>
          <p className="max-w-sm">O motor financeiro definitivo para o seu servidor. Mais conversão, zero dores de cabeça manuais.</p>
        </div>
        <div className="space-y-4"> <h4 className="text-white font-bold mb-5 tracking-wide text-base">Produto</h4>
          <a href="#features" className="block hover:text-yellow-400 transition-colors">Funcionalidades</a>
          <a href="#pricing" className="block hover:text-yellow-400 transition-colors">Preços</a>
        </div>
        <div className="space-y-4"> <h4 className="text-white font-bold mb-5 tracking-wide text-base">Legal</h4>
          <a href="#" className="block hover:text-yellow-400 transition-colors">Termos de Uso</a>
          <a href="#" className="block hover:text-yellow-400 transition-colors">Falar com Suporte</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-zinc-700 font-semibold text-xs"> © {new Date().getFullYear()} PayMTA. Construído para donos de servidores brasileiros.</div>
    </footer>
=======
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
>>>>>>> b980a58 (feat: layout do dashboard e schema do prisma finalizados)
  );
}