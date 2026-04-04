"use client";

import { Lock, EyeOff, DatabaseZap, CheckCircle2 } from "lucide-react";

export default function PrivacidadePage() {
  const secoes = [
    {
      titulo: "1. Papéis na LGPD (Controlador vs Operador)",
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      texto: "Para fins legais (Lei Geral de Proteção de Dados - LGPD), o dono do servidor de MTA atua como o 'Controlador' dos dados dos seus jogadores. O PayMTA atua exclusivamente como o 'Operador' tecnológico. Nós processamos os dados estritamente necessários (IDs in-game, e-mails e logs de webhook) para garantir o funcionamento da automação em nome do Controlador."
    },
    {
      titulo: "2. Coleta de Dados do Contratante",
      icon: <DatabaseZap className="w-6 h-6 text-yellow-400" />,
      texto: "Quando você cria uma conta de Dono de Servidor no PayMTA, coletamos seu e-mail, nome, dados de faturamento e informações técnicas do seu servidor (IP e Porta) para gerar sua License Key e fornecer o suporte técnico necessário à sua assinatura."
    },
    {
      titulo: "3. Sigilo e Compartilhamento",
      icon: <EyeOff className="w-6 h-6 text-emerald-400" />,
      texto: "Nós prezamos pelo sigilo absoluto da sua comunidade. O PayMTA jamais enviará e-mails de marketing para os jogadores do seu servidor, jamais venderá sua base de dados de transações e não compartilha seus números de faturamento com terceiros ou concorrentes. Seus dados estão restritos ao nosso banco de dados criptografado."
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] pt-32 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Política de Privacidade</h1>
          <p className="text-lg text-zinc-400 font-medium">Como processamos, armazenamos e protegemos os seus dados e os dos seus jogadores.</p>
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

        <div className="mt-12 p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl"><CheckCircle2 className="w-8 h-8 text-blue-400" /></div>
            <div>
                <h4 className="text-lg font-bold text-blue-400 mb-2">Conformidade Legal</h4>
                <p className="text-sm text-blue-400/80 leading-relaxed font-medium">Garantimos medidas de segurança compatíveis com o estado da arte para evitar acessos indevidos. Ao utilizar nossos serviços, você concorda com o processamento destes dados.</p>
            </div>
        </div>
      </div>
    </main>
  );
}