"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, AlertCircle, CreditCard, ShieldX, CheckCircle2 } from "lucide-react";

export default function ReembolsoPage() {
  const [activeSection, setActiveSection] = useState("politica-geral");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 selection:bg-green-500/30 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 lg:py-32 flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
        
        {/* MENU LATERAL */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <RefreshCcw className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">Reembolso</h3>
            </div>

            <nav className="space-y-1">
              <a href="#politica-geral" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "politica-geral" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>1. Política Geral</a>
              <a href="#jogadores" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "jogadores" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>2. Para Jogadores</a>
              <a href="#planos" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "planos" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>3. Planos PayMTA</a>
              <a href="#chargebacks" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "chargebacks" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>4. Chargebacks</a>
            </nav>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 max-w-3xl space-y-20">
          
          <section id="politica-geral" className="scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
              Política de <span className="text-green-500">Reembolso</span>
            </h1>
            <p className="text-zinc-400 text-sm mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                A PayMTA atua estritamente como um provedor de tecnologia de integração (Gateway). Por lidarmos com transações diretas para a conta do lojista e com produtos digitais (SaaS), possuímos regras claras sobre estornos e devoluções.
              </p>
            </div>
          </section>

          <section id="jogadores" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-green-500" /> 2. Para Jogadores (Clientes Finais)
            </h2>
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-bold">
                A PayMTA não realiza reembolsos de VIPs, moedas ou itens comprados dentro dos servidores de MTA:SA.
              </p>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> O pagamento via PIX cai integralmente e diretamente na conta do Mercado Pago do dono do servidor (Lojista).</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> Nós não temos acesso ou custódia sobre esse dinheiro.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> Qualquer pedido de reembolso por arrependimento ou falha na entrega do benefício deve ser tratado diretamente no Discord oficial do servidor onde a compra foi realizada.</li>
              </ul>
            </div>
          </section>

          <section id="planos" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-green-500" /> 3. Assinatura de Planos (Para Lojistas)
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Se você é um dono de servidor e assinou um dos nossos planos pagos (Basic, Pro ou Advanced), você está protegido pelo Código de Defesa do Consumidor (Art. 49).
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> <strong>Garantia de 7 Dias:</strong> Você pode solicitar o reembolso integral da sua mensalidade em até 7 dias corridos após a primeira assinatura, caso desista do uso da plataforma.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> <strong>Renovações:</strong> Não reembolsamos renovações automáticas mensais esquecidas pelo lojista. O cancelamento do plano deve ser feito antes da data de vencimento no painel.</li>
              </ul>
            </div>
          </section>

          <section id="chargebacks" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <ShieldX className="w-6 h-6 text-red-500" /> 4. Chargebacks e Contestações
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Como os pagamentos processados pela nossa tecnologia vão diretamente para o seu Mercado Pago, qualquer contestação (Chargeback) aberta pelo jogador ocorrerá no seu ambiente.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A PayMTA fornecerá em seu painel os Logs (Registros) detalhados da aprovação do Webhook e execução do comando no servidor. Esses logs podem ser usados por você como prova de entrega para contestar o Chargeback junto ao Mercado Pago.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}