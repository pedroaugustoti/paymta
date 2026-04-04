"use client";

import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlanosPage() {
  const planos = [
    {
      nome: "Trial (Teste)",
      preco: "R$ 0",
      periodo: "3 dias",
      desc: "Experimente a automação completa sem custos.",
      icon: <Clock className="text-zinc-400" />,
      features: ["1 Servidor", "Transações Ilimitadas", "Suporte via Discord", "Entrega Instantânea"],
      cta: "Começar Teste Grátis",
      popular: false,
      border: "border-white/5"
    },
    {
      nome: "Basic",
      preco: "R$ 14",
      periodo: "/mês",
      desc: "Ideal para servidores que estão começando agora.",
      icon: <Zap className="text-yellow-400" />,
      features: ["1 Servidor", "Transações Ilimitadas", "Dashboard Completo", "Logs de 7 dias"],
      cta: "Assinar Agora",
      popular: false,
      border: "border-white/10"
    },
    {
      nome: "Intermediate",
      preco: "R$ 25",
      periodo: "/mês",
      desc: "O equilíbrio perfeito para cidades em crescimento.",
      icon: <Shield className="text-blue-400" />,
      features: ["Até 2 Servidores", "Prioridade na API", "Logs de 30 dias", "Suporte VIP 24h"],
      cta: "Assinar Agora",
      popular: true,
      border: "border-yellow-500/50"
    },
    {
      nome: "Advanced",
      preco: "R$ 42",
      periodo: "/mês",
      desc: "Para grandes redes de servidores e alto tráfego.",
      icon: <Crown className="text-purple-400" />,
      features: ["Servidores Ilimitados", "Webhooks Customizados", "Logs Infinitos", "Gestão de Staff"],
      cta: "Assinar Agora",
      popular: false,
      border: "border-white/10"
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Centralizado */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Planos que cabem no seu <span className="text-yellow-400">faturamento.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Escolha o plano ideal para a sua comunidade. Comece testando por 3 dias sem pagar nada e sinta a diferença na sua economia.
          </p>
        </div>

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planos.map((plano) => (
            <motion.div 
              key={plano.nome}
              whileHover={{ y: -10 }}
              className={`relative bg-[#09090b] p-8 rounded-[32px] border ${plano.border} flex flex-col`}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  Mais Vendido
                </div>
              )}

              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {plano.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-2">{plano.nome}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{plano.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plano.preco}</span>
                  <span className="text-zinc-500 font-bold text-sm">{plano.periodo}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plano.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                    <Check size={16} className="text-emerald-500" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link href="/login" className="w-full">
                <Button className={`w-full py-6 rounded-2xl font-black transition-all ${
                  plano.popular 
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-500/10" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                }`}>
                  {plano.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Rápido / Garantia */}
        <div className="mt-20 p-8 rounded-[32px] border border-white/5 bg-[#050505] text-center max-w-3xl mx-auto">
          <p className="text-zinc-500 text-sm font-medium">
            Precisa de um plano personalizado para uma rede de servidores? <br/>
            <a href="https://discord.gg/seu-link" className="text-yellow-400 font-bold hover:underline">Entre em contato com o nosso comercial no Discord.</a>
          </p>
        </div>
      </div>
    </main>
  );
} 