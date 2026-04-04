"use client";

import { RefreshCcw, AlertOctagon, Scale, AlertTriangle } from "lucide-react";

export default function ReembolsoPage() {
  const secoes = [
    {
      titulo: "1. Direito de Arrependimento (CDC)",
      icon: <RefreshCcw className="w-6 h-6 text-emerald-400" />,
      texto: "Em conformidade com o Art. 49 do Código de Defesa do Consumidor, oferecemos 7 dias de garantia para o arrependimento da compra da sua assinatura. Caso você assine o serviço, não consiga instalar ou desista antes de colocá-lo em produção, reembolsaremos 100% do valor da mensalidade."
    },
    {
      titulo: "2. Consumo de Serviço (Exceção à Regra)",
      icon: <AlertOctagon className="w-6 h-6 text-orange-400" />,
      texto: "Se durante o período de 7 dias a sua License Key for utilizada ativamente em um servidor para processar pagamentos reais de jogadores, validando webhooks e entregando pacotes VIPs, o serviço será considerado como 'Consumido e Prestado'. Nestes casos de uso prático para fins lucrativos, o direito ao reembolso do mês vigente é automaticamente anulado."
    },
    {
      titulo: "3. Chargebacks de Jogadores",
      icon: <Scale className="w-6 h-6 text-red-400" />,
      texto: "O PayMTA não se responsabiliza por chargebacks (compras contestadas no cartão) efetuados pelos jogadores da sua comunidade. Como o dinheiro vai direto para a sua conta do Mercado Pago, a gestão, disputa e absorção do risco financeiro de fraudadores in-game (jogadores mal-intencionados) é de responsabilidade da administração do servidor."
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] pt-32 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Política de Reembolso</h1>
          <p className="text-lg text-zinc-400 font-medium">Regras transparentes sobre cancelamentos de assinaturas e disputas financeiras.</p>
        </header>

        <div className="space-y-6">
          {secoes.map((secao) => (
            <div key={secao.titulo} className="bg-[#09090b] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/5">{secao.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{secao.titulo}</h3>
                  <p className="text-zinc-400 leading-relaxed font-medium text-[15px]">{secao.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0 p-4 bg-yellow-500/10 rounded-2xl"><AlertTriangle className="w-8 h-8 text-yellow-400" /></div>
            <div>
                <h4 className="text-lg font-bold text-yellow-400 mb-2">Cancelamento de Assinaturas</h4>
                <p className="text-sm text-yellow-400/80 leading-relaxed font-medium">Você pode cancelar a renovação automática da sua assinatura a qualquer momento através do seu painel. O cancelamento evita cobranças futuras, mas não gera estorno de faturas de meses que já foram utilizados.</p>
            </div>
        </div>
      </div>
    </main>
  );
}