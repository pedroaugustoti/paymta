"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Rocket, ShieldCheck, Zap, Check, ChevronRight, 
  BarChart3, Users, DollarSign, DatabaseZap, 
  Activity, ShieldAlert, Terminal, Cpu, Globe, Box, Lock, MousePointer2 
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-hidden selection:bg-yellow-500/30 font-sans">
      {/* Background Grid Dinâmico */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Luzes Neon */}
      <div className="fixed top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 pt-28 px-6">
        
        {/* 1. HERO SECTION */}
        <section className="max-w-6xl mx-auto flex flex-col items-center mb-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Infraestrutura Financeira Nativa para MTA
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent leading-[1.1] max-w-4xl italic">
              Seu servidor vendendo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 filter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                24h no automático.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Esqueça as entregas manuais. Integre o Mercado Pago ao seu servidor e automatize VIPs e Itens instantaneamente com nosso script de alta performance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto sm:max-w-none">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all hover:scale-105 flex items-center gap-2 group italic">
                  Começar a Faturar
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl transition-all font-bold">
                Ler Documentação
              </Button>
            </div>
          </motion.div>

          {/* MOCKUP VISUAL */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full max-w-[1100px] mx-auto mt-20 relative"
          >
            <div className="relative bg-[#080808] border border-white/10 rounded-[28px] p-2.5 shadow-2xl grid grid-cols-12 gap-2.5 backdrop-blur-xl">
              <div className="col-span-12 xl:col-span-7 bg-zinc-950/60 rounded-[24px] border border-white/5 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-yellow-400">
                    <DollarSign size={20} />
                    <h3 className="text-lg font-bold text-white uppercase italic tracking-tighter">Live Sales Dashboard</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 text-white font-mono">
                    <StatCard icon={<BarChart3 size={14}/>} label="Hoje" value="R$ 1.450" accent />
                    <StatCard icon={<Users size={14}/>} label="Jogadores" value="189" />
                    <StatCard icon={<Activity size={14}/>} label="API" value="99.9%" />
                </div>
                <div className="h-32 bg-zinc-900 rounded-xl border border-white/5 p-4 flex items-end gap-1.5 overflow-hidden">
                    {[40, 60, 45, 80, 75, 100, 90, 50, 70, 85].map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className="flex-1 bg-yellow-500/20 border-t border-yellow-400/40 rounded-t-sm" />
                    ))}
                </div>
              </div>

              <div className="col-span-12 xl:col-span-5 bg-black rounded-[24px] border border-white/5 p-5 flex flex-col font-mono text-[10px]">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-zinc-600">server_console.log</span>
                </div>
                <div className="space-y-1 text-zinc-500">
                  <p>[14:20] <span className="text-emerald-400">PAYMTA:</span> Conexão estabelecida.</p>
                  <p>[14:21] <span className="text-yellow-400">PAYMTA:</span> Webhook escutando...</p>
                  <p>[14:25] <span className="text-white">INFO:</span> Pix Recebido (R$ 50,00)</p>
                  <p>[14:25] <span className="text-emerald-400">SUCCESS:</span> Comando 'addvip user1' executado.</p>
                  <div className="w-1.5 h-3 bg-white animate-pulse inline-block" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. BENTO FEATURES */}
        <section className="max-w-6xl mx-auto py-20 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-zinc-950/40 border border-white/5 p-8 rounded-3xl hover:border-yellow-500/30 transition-all group">
            <Zap className="text-yellow-400 mb-4" />
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Engenharia Cloud</h3>
            <p className="text-zinc-400">Nossa API processa os pagamentos fora do seu servidor. Isso significa zero lag e zero queda de FPS para os seus jogadores durante as transações.</p>
          </div>
          <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-all">
            <ShieldAlert className="text-white mb-4" />
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">Inviolável</h3>
            <p className="text-zinc-400 text-sm">Scripts compilados em Luac e validação por token JWT. Segurança de nível bancário para sua economia in-game.</p>
          </div>
        </section>

        {/* 3. DEVELOPER SECTION (Config.lua) */}
        <section className="max-w-6xl mx-auto py-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-6">Instalação <br/><span className="text-yellow-400">Plug & Play</span></h2>
            <p className="text-zinc-400 font-medium mb-6">
              Não pedimos acesso ao seu banco de dados. Você apenas configura os comandos que o servidor deve executar ao confirmar um pagamento. Simples assim.
            </p>
            <ul className="space-y-3 text-sm font-bold text-zinc-500 italic">
              <li className="flex items-center gap-2"><Check size={16} className="text-yellow-400" /> Resource em ZIP pronto para uso</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-yellow-400" /> Comandos de console nativos</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-yellow-400" /> Suporte para qualquer gamemode</li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
            <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 text-zinc-500">paymta/config.lua</div>
            <pre className="p-6 text-zinc-300 overflow-x-auto">
              <code>{`Config = {}
Config.License = "PAYMTA-A1B2-C3D4"

Config.Pacotes = {
  ["vip_ouro"] = "addvip {player} Ouro 30",
  ["money_100k"] = "givemoney {player} 100000"
}

-- Simples, Seguro, PayMTA.`}</code>
            </pre>
          </div>
        </section>

        {/* 4. PRICING */}
        <PricingSection />

      </div>
    </main>
  );
}

// --- SUBCOMPONENTES ---

function StatCard({ icon, label, value, accent = false }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
      <div className={`flex items-center gap-1.5 mb-1 ${accent ? 'text-yellow-400' : 'text-zinc-500'}`}>
        {icon} <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className="text-lg font-black italic">{value}</p>
    </div>
  );
}

function PricingSection() {
  const plans = [
    { name: "Iniciante", price: "14", features: ["1 Servidor", "Entrega Automática", "Logs 7 dias"], highlight: false },
    { name: "Profissional", price: "25", features: ["Até 3 Servidores", "Suporte Prioritário", "Painel Customizado"], highlight: true },
    { name: "Enterprise", price: "42", features: ["Servidores Ilimitados", "API de Integração", "Webhook Custom"], highlight: false }
  ];

  return (
    <section className="max-w-6xl mx-auto py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Planos para escala</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`p-8 rounded-3xl border transition-all ${plan.highlight ? 'border-yellow-400 bg-yellow-400/5 shadow-2xl shadow-yellow-400/10' : 'border-white/5 bg-zinc-950/40'}`}>
            <h3 className="text-xl font-black text-white uppercase italic mb-4">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black">R$ {plan.price}</span>
              <span className="text-zinc-500 font-bold text-sm">/mês</span>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-zinc-400">
                  <Check size={14} className="text-yellow-400" /> {f}
                </li>
              ))}
            </ul>
            <Button className={`w-full py-6 rounded-xl font-black ${plan.highlight ? 'bg-yellow-400 text-black' : 'bg-white/5 text-white'}`}>Selecionar</Button>
          </div>
        ))}
      </div>
    </section>
  );
}