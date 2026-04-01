"use client";

import { ShieldCheck, Gavel, RefreshCcw, AlertTriangle } from "lucide-react";

export default function TermosPage() {
  const secoes = [
    {
      titulo: "1. Sobre as Vantagens Digitais",
      icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
      texto: "Ao adquirir um pacote VIP ou vantagem em nossa loja, você está realizando uma doação para a manutenção do servidor. Em troca, você recebe benefícios digitais in-game. Esses itens não possuem valor monetário real e não podem ser trocados por dinheiro vivo."
    },
    {
      titulo: "2. Política de Reembolso",
      icon: <RefreshCcw className="w-6 h-6 text-emerald-400" />,
      texto: "Por se tratar de produtos digitais de consumo imediato, não oferecemos reembolso após o benefício ser entregue na conta. Em caso de problemas técnicos na entrega, nossa equipe de suporte resolverá em até 24 horas."
    },
    {
      titulo: "3. Comportamento e Banimentos",
      icon: <Gavel className="w-6 h-6 text-red-400" />,
      texto: "Ser um doador VIP não o torna imune às regras da cidade. Caso você seja banido por violar as regras de Roleplay (RP), o seu tempo de VIP continuará correndo normalmente e não haverá estorno do valor pago."
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pt-16">
      <div className="mb-16">
          <h1 className="text-4xl font-black text-white mb-4">Termos e Condições</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">Leia atentamente nossas regras antes de realizar qualquer transação na loja oficial.</p>
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

      <div className="mt-20 p-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
          <p className="text-sm text-yellow-400/80 leading-relaxed">
            <strong>AVISO IMPORTANTE:</strong> Ao clicar em 'Finalizar Compra' na nossa loja, você declara estar ciente e de acordo com todos os termos listados acima.
          </p>
      </div>
    </div>
  );
}