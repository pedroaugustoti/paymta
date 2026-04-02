"use client";

import { RefreshCcw, Zap, HelpCircle, Gavel, AlertTriangle } from "lucide-react";

export default function ReembolsoPage() {
  const secoes = [
    {
      titulo: "1. Natureza do Produto Digital",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      texto: "Os itens vendidos em nossa loja são produtos digitais de ativação imediata. Uma vez que o produto é entregue e os benefícios são ativados in-game, o serviço é considerado prestado."
    },
    {
      titulo: "2. Condições para Estorno",
      icon: <RefreshCcw className="w-6 h-6 text-emerald-400" />,
      texto: "Conforme o CDC, você tem direito a arrependimento em até 7 dias, desde que o produto digital NÃO tenha sido consumido ou utilizado no servidor. Itens já ativos na conta perdem o direito a estorno."
    },
    {
      titulo: "3. Casos de Banimento",
      icon: <Gavel className="w-6 h-6 text-red-400" />,
      texto: "O descumprimento das regras do servidor que resulte em banimento não dá direito a reembolso de pacotes ativos. A responsabilidade de manter a conta em dia com as regras é do jogador."
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pt-16">
      <div className="mb-16">
          <h1 className="text-4xl font-black text-white mb-4">Política de Reembolso</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">Transparência total sobre como funcionam nossos processos de devolução.</p>
      </div>

      <div className="space-y-12">
        {secoes.map((secao) => (
          <div key={secao.titulo} className="flex gap-6">
            <div className="mt-1">{secao.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{secao.titulo}</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">{secao.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-emerald-400 shrink-0" />
          <p className="text-sm text-emerald-400/80 leading-relaxed">
            <strong>SUPORTE:</strong> Teve problemas com a entrega do seu VIP ou veículo? Abra um ticket imediatamente no nosso Discord antes de solicitar qualquer disputa.
          </p>
      </div>
    </div>
  );
}