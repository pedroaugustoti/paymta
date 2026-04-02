"use client";

import { Eye, Lock, Database, ShieldCheck, AlertCircle } from "lucide-react";

export default function PrivacidadePage() {
  const secoes = [
    {
      titulo: "1. Coleta de Dados",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      texto: "Coletamos apenas o essencial para sua experiência: seu ID de jogo (MTA), e-mail de login e histórico de transações. Não coletamos dados pessoais fora do escopo da loja."
    },
    {
      titulo: "2. Segurança de Pagamento",
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      texto: "Seus dados financeiros são processados via Mercado Pago. Não armazenamos números de cartão ou senhas em nosso banco de dados; toda a transação é criptografada e segura."
    },
    {
      titulo: "3. Uso das Informações",
      icon: <Eye className="w-6 h-6 text-purple-400" />,
      texto: "Suas informações nunca serão vendidas ou compartilhadas com terceiros. Elas são usadas exclusivamente para garantir a entrega automática dos seus itens e para suporte técnico."
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pt-16">
      <div className="mb-16">
          <h1 className="text-4xl font-black text-white mb-4">Política de Privacidade</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">Entenda como protegemos seus dados e garantimos sua segurança digital.</p>
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

      <div className="mt-20 p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
          <p className="text-sm text-blue-400/80 leading-relaxed">
            <strong>COMPROMISSO:</strong> O Invictus preza pela transparência. Seus dados estão protegidos sob os padrões de segurança da nossa infraestrutura.
          </p>
      </div>
    </div>
  );
}