"use client";

import { Server, ShieldAlert, Gavel, FileText, AlertTriangle } from "lucide-react";

export default function TermosPage() {
  const secoes = [
    {
      titulo: "1. Natureza do Serviço (SaaS)",
      icon: <Server className="w-6 h-6 text-yellow-400" />,
      texto: "O PayMTA fornece uma infraestrutura de Software como Serviço (SaaS) projetada para a automação de entregas digitais no Multi Theft Auto (MTA). Nós NÃO somos uma instituição financeira, banco, subadquirente ou gateway de pagamento. Nosso sistema atua exclusivamente como um middleware (ponte tecnológica) de comunicação entre a sua conta do Mercado Pago e o seu servidor de jogo."
    },
    {
      titulo: "2. Isenção de Responsabilidade Financeira",
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      texto: "Como os pagamentos realizados pelos jogadores caem diretamente na sua conta do Mercado Pago, o PayMTA não tem acesso, custódia, poder de bloqueio ou controle sobre os seus fundos. Não nos responsabilizamos por bloqueios preventivos na sua conta do Mercado Pago, problemas fiscais, ou disputas abertas por jogadores. Toda a gestão financeira da comunidade é de sua inteira responsabilidade legal."
    },
    {
      titulo: "3. Uso Aceitável e Proibições",
      icon: <Gavel className="w-6 h-6 text-orange-400" />,
      texto: "A sua License Key é de uso pessoal e intransferível, vinculada ao IP/Painel do seu servidor. É estritamente proibido utilizar o PayMTA para fins de lavagem de dinheiro, venda de produtos ilícitos, fora do escopo de games, ou atividades que violem os Termos de Uso do Mercado Pago e da Rockstar Games. Qualquer violação resultará na suspensão imediata da licença."
    },
    {
      titulo: "4. Disponibilidade do Serviço (SLA)",
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      texto: "Nossa equipe trabalha para garantir um Uptime (tempo de atividade) de 99.9%. No entanto, como o nosso sistema depende de APIs de terceiros (como a do Mercado Pago), isentamo-nos de responsabilidade por atrasos ou falhas na entrega de VIPs causados por instabilidades externas na rede do Mercado Pago ou na hospedagem do seu servidor MTA."
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] pt-32 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Termos de Serviço</h1>
          <p className="text-lg text-zinc-400 font-medium">Acordo de Licença e Uso de Software para Servidores (B2B). Atualizado em Abril de 2026.</p>
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
                <h4 className="text-lg font-bold text-yellow-400 mb-2">Aceite Contratual</h4>
                <p className="text-sm text-yellow-400/80 leading-relaxed font-medium">Ao assinar um plano e gerar uma License Key no PayMTA, você reconhece que leu e concorda expressamente com todos os limites de responsabilidade descritos neste documento.</p>
            </div>
        </div>
      </div>
    </main>
  );
}