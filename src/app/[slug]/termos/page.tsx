"use client";

import { ShieldCheck, Gavel, RefreshCcw, AlertTriangle, Lock } from "lucide-react";

export default function TermosPage() {
  const secoes = [
    {
      titulo: "1. Sobre as Vantagens Digitais",
      icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
      texto: "Ao adquirir pacotes VIP ou itens, você recebe benefícios digitais imediatos. Estes itens são exclusivos para uso in-game, não possuem valor monetário real e não podem ser convertidos em moeda corrente."
    },
    {
      titulo: "2. Política de Reembolso",
      icon: <RefreshCcw className="w-6 h-6 text-emerald-400" />,
      texto: "Seguimos o Art. 49 do CDC, garantindo o reembolso em até 7 dias, desde que o produto digital NÃO tenha sido utilizado ou ativado. Uma vez que o benefício foi consumido ou o VIP ativado, o serviço é considerado prestado, impossibilitando o estorno."
    },
    {
      titulo: "3. Privacidade e Dados (LGPD)",
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      texto: "Coletamos apenas dados essenciais (ID, e-mail e logs) para garantir a segurança da sua conta e prevenir fraudes. Seus dados são protegidos conforme a LGPD e nunca serão compartilhados com terceiros."
    },
    {
      titulo: "4. Comportamento e Banimentos",
      icon: <Gavel className="w-6 h-6 text-red-400" />,
      texto: "A aquisição de benefícios não concede imunidade às regras do servidor. Banimentos por violação das normas de Roleplay (RP) ou uso de cheats resultam na perda do acesso sem direito a reembolso dos valores investidos."
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pt-16">
      <div className="mb-16">
          <h1 className="text-4xl font-black text-white mb-4">Termos e Condições</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">
            Atualizado conforme a LGPD e políticas de proteção ao consumidor. Leia atentamente antes de prosseguir.
          </p>
      </div>

      <div className="space-y-12">
        {secoes.map((secao) => (
          <div key={secao.titulo} className="flex gap-6">
            <div className="mt-1 shrink-0">{secao.icon}</div>
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
            <strong>AVISO LEGAL:</strong> Ao finalizar sua compra, você confirma que leu e concorda com a nossa política de consumo imediato e os termos de proteção de dados listados acima.
          </p>
      </div>
    </div>
  );
}