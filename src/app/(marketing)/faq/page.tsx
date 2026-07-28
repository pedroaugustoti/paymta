"use client";

import { useEffect, useState } from "react";
import { MessageCircle, HelpCircle, Wallet, Terminal, Layers } from "lucide-react";

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState("geral");

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
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">FAQ</h3>
            </div>

            <nav className="space-y-1">
              <a href="#geral" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "geral" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}><HelpCircle className="w-4 h-4" /> Dúvidas Gerais</a>
              <a href="#financeiro" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "financeiro" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}><Wallet className="w-4 h-4" /> Pagamentos</a>
              <a href="#tecnico" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "tecnico" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}><Terminal className="w-4 h-4" /> Integração Técnica</a>
              <a href="#planos" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "planos" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}><Layers className="w-4 h-4" /> Planos e Limites</a>
            </nav>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 max-w-3xl space-y-20">
          
          <section id="geral" className="scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-8">
              Perguntas <span className="text-green-500">Frequentes</span>
            </h1>
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">O que exatamente a PayMTA faz?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Nós somos uma ponte tecnológica entre o Mercado Pago e o seu servidor de MTA:SA. Quando um jogador compra um item na sua loja web usando PIX, nossa API avisa seu servidor imediatamente para que o item seja entregue sem a intervenção de um Administrador.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">Preciso saber programar para usar?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Você precisará de um conhecimento muito básico de Lua para usar a nossa documentação e conectar o nosso evento com o sistema de VIP da sua base. Se tiver dificuldades, nossa comunidade no Discord pode ajudar a adaptar o código para o seu servidor.</p>
              </div>
            </div>
          </section>

          <section id="financeiro" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Pagamentos e Recebimentos</h2>
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">Como e quando eu recebo meu dinheiro?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">O dinheiro do PIX cai <strong>imediatamente</strong> na conta do Mercado Pago atrelada ao seu Access Token. Nós não retemos o dinheiro (com exceção dos 3% no plano Trial). Você não precisa solicitar saques no nosso painel.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">Como funciona a taxa de 3% do plano Trial?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">No plano Trial, nós configuramos o split de pagamento (divisão) na API do Mercado Pago. Se você vender um VIP de R$ 100,00, R$ 97,00 vão direto para você, e R$ 3,00 vêm para a PayMTA automaticamente. Ao assinar um plano pago (Basic, Pro, Advanced), essa taxa de 3% é removida.</p>
              </div>
            </div>
          </section>

          <section id="tecnico" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Integração Técnica</h2>
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">Funciona em qualquer base de MTA?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Sim! Nosso resource é 100% independente. Ele apenas capta o Webhook e dispara um evento global (<code>onPayMTAPaymentApproved</code>). Você pode usar esse evento para interligar com VRP, Creative, Paradise, ou qualquer base criada do zero.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">Qual é o impacto do resource no servidor?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Praticamente nulo. O resource não fica rodando em <i>looping</i>. Ele fica dormindo e só desperta quando recebe a requisição HTTP da nossa API no exato momento que um PIX é pago.</p>
              </div>
            </div>
          </section>

          <section id="planos" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Planos e Limites</h2>
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">O que acontece se eu atingir o limite de vendas do meu plano?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Se você assinar o plano Basic (Limite R$ 5.000) e atingir esse valor, o sistema irá pausar a geração de novos códigos PIX na sua loja. Você poderá fazer o Upgrade para o plano Pro direto no painel, pagando apenas a diferença, e a loja voltará a vender imediatamente.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-lg mb-2">O que é a Integração de "Multi-Servidores"?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Disponível nos planos Pro e Advanced. Permite que você conecte mais de uma base (Ex: Servidor 1 (PvP) e Servidor 2 (RP)) usando a mesma loja e a mesma assinatura da PayMTA. A entrega é direcionada ao servidor correto no momento da compra.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}