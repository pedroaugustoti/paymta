"use client";

import { useEffect, useState } from "react";
import { Shield, Eye, Lock, Server, CheckCircle2 } from "lucide-react";

export default function PrivacidadePage() {
  const [activeSection, setActiveSection] = useState("coleta");

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
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">Privacidade</h3>
            </div>

            <nav className="space-y-1">
              <a href="#coleta" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "coleta" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>1. Dados Coletados</a>
              <a href="#uso" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "uso" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>2. Uso dos Dados</a>
              <a href="#compartilhamento" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "compartilhamento" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>3. Compartilhamento</a>
              <a href="#seguranca" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "seguranca" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>4. Segurança</a>
            </nav>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 max-w-3xl space-y-20">
          
          <section id="coleta" className="scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
              Política de <span className="text-green-500">Privacidade</span>
            </h1>
            <p className="text-zinc-400 text-sm mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                A privacidade dos seus dados (Lojista) e dos seus jogadores é prioridade máxima na PayMTA. Nós coletamos apenas o estritamente necessário para operar a plataforma de integração.
              </p>
              <h4 className="text-white font-bold text-sm mb-3 mt-6">O que nós coletamos:</h4>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <strong>Dados de Cadastro:</strong> Nome da loja, E-mail, Senha (criptografada) e IDs do Discord/Google (quando usados para login).</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <strong>Dados de Transação:</strong> ID do PIX, Valor, Status, e o "Passaporte/ID" do jogador no seu servidor.</li>
              </ul>
              <p className="text-zinc-500 text-xs mt-4">
                * Nós NÃO processamos, NÃO coletamos e NÃO armazenamos dados bancários, CPFs ou cartões de crédito dos seus jogadores. Toda a transação ocorre no ambiente do Mercado Pago.
              </p>
            </div>
          </section>

          <section id="uso" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-green-500" /> 2. Uso dos Dados
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed">
                As informações coletadas são usadas exclusivamente para:
                <br /><br />- Autenticar sua entrada no Painel Administrativo.
                <br />- Fornecer métricas e logs visuais (Dashboard) sobre as vendas do seu servidor.
                <br />- Disparar os Webhooks para efetivar a entrega do item in-game.
                <br />- Entrar em contato via e-mail ou Discord para avisos importantes (atualizações críticas ou falhas de renovação de plano).
              </p>
            </div>
          </section>

          <section id="compartilhamento" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-green-500" /> 3. Compartilhamento de Dados
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                A PayMTA não vende, não aluga e não repassa sua base de dados para terceiros. O único compartilhamento existente ocorre na comunicação técnica obrigatória:
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> <strong>Mercado Pago:</strong> Enviamos a requisição de geração de PIX contendo o valor e o nome do pacote para a API deles utilizando a sua chave privada.</li>
              </ul>
            </div>
          </section>

          <section id="seguranca" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-green-500" /> 4. Segurança da Informação
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Adotamos as melhores práticas do mercado de desenvolvimento web moderno para proteger as informações da sua loja:
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> Criptografia de ponta a ponta (SSL/HTTPS) em todo o tráfego do site.</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> Senhas hashadas (nunca armazenadas em texto puro).</li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> Validação de IP e autenticação via Webhook para prevenir injeção de pacotes falsos no servidor MTA.</li>
              </ul>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}