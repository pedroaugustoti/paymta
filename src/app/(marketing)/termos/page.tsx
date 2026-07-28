"use client";

import { useEffect, useState } from "react";
import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export default function TermosPage() {
  const [activeSection, setActiveSection] = useState("aceitacao");

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
                <Scale className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">Termos</h3>
            </div>

            <nav className="space-y-1">
              <a href="#aceitacao" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "aceitacao" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>1. Aceitação</a>
              <a href="#plataforma" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "plataforma" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>2. A Plataforma</a>
              <a href="#taxas" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "taxas" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>3. Pagamentos e Taxas</a>
              <a href="#responsabilidades" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "responsabilidades" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>4. Responsabilidades</a>
              <a href="#rescisao" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "rescisao" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>5. Rescisão e Bloqueio</a>
            </nav>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 max-w-3xl space-y-20">
          
          <section id="aceitacao" className="scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
              Termos de <span className="text-green-500">Uso</span>
            </h1>
            <p className="text-zinc-400 text-sm mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Ao acessar e utilizar a plataforma PayMTA, você (doravante "Lojista" ou "Usuário") concorda expressamente com estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A PayMTA reserva-se o direito de modificar estes termos a qualquer momento, sendo responsabilidade do Lojista revisar esta página periodicamente.
              </p>
            </div>
          </section>

          <section id="plataforma" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-green-500" /> 2. Natureza da Plataforma
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                A PayMTA atua <strong>exclusivamente como um Gateway de Integração (SaaS)</strong>. Nossa tecnologia facilita a comunicação entre o seu servidor de MTA:SA e a API do Mercado Pago.
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Não somos um servidor de jogos e não hospedamos arquivos do MTA.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Não intermediamos disputas entre jogadores (clientes finais) e donos de servidores.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> O dinheiro processado vai diretamente para a conta do Mercado Pago do Lojista.</li>
              </ul>
            </div>
          </section>

          <section id="taxas" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">3. Pagamentos e Taxas</h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl space-y-4">
              <p className="text-zinc-400 text-sm leading-relaxed">
                O uso da plataforma está sujeito às regras do plano escolhido no momento do cadastro:
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-sm mb-1">Plano Trial (Gratuito)</h4>
                <p className="text-zinc-400 text-sm">A PayMTA reterá automaticamente uma taxa de intermediação tecnológica de 3% sobre o valor de cada transação processada.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-white font-bold text-sm mb-1">Planos Pagos (Basic, Pro, Advanced)</h4>
                <p className="text-zinc-400 text-sm">A PayMTA não cobra comissões por venda (0%). O Lojista pagará apenas a mensalidade fixa do plano e as taxas padrão do próprio Mercado Pago.</p>
              </div>
            </div>
          </section>

          <section id="responsabilidades" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <ShieldAlert className="w-6 h-6 text-yellow-500" /> 4. Isenção de Responsabilidade
            </h2>
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                A configuração da entrega in-game (dentro do jogo) é de inteira responsabilidade do Lojista. A PayMTA apenas dispara o Webhook confirmando o pagamento.
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Não nos responsabilizamos por:
                <br />- Falhas na entrega devido a erros de script (Lua) no servidor do cliente.
                <br />- Reembolsos exigidos por jogadores (chargebacks). O lojista deve resolver disputas diretamente no seu Mercado Pago.
                <br />- Quedas ou instabilidades nos servidores do próprio MTA:SA ou do Mercado Pago.
              </p>
            </div>
          </section>

          <section id="rescisao" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" /> 5. Rescisão e Bloqueio
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, se identificarmos:
                <br /><br />- Uso da plataforma para lavagem de dinheiro, fraudes ou atividades ilegais.
                <br />- Venda de itens que violem os Termos de Serviço da Rockstar Games ou do projeto MTA:SA.
                <br />- Inadimplência na renovação dos planos pagos.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}