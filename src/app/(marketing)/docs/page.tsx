"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle2, Code2, Key, Server, 
  Terminal, HelpCircle, ChevronRight, BookOpen 
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introducao");

  // Rastreia o scroll do usuário para acender o menu lateral automaticamente
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Margens para acionar a mudança antes do topo encostar
      { rootMargin: "-20% 0px -60% 0px" } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 selection:bg-green-500/30 font-sans">
      
      {/* Background Otimizado */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 lg:py-32 flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
        
        {/* MENU LATERAL (SIDEBAR) */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <BookOpen className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">Docs</h3>
            </div>

            <nav className="space-y-8">
              {/* Categoria 1 */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 px-3">Primeiros Passos</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#introducao" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "introducao" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Introdução
                    </a>
                  </li>
                  <li>
                    <a href="#credenciais" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "credenciais" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Integração Mercado Pago
                    </a>
                  </li>
                </ul>
              </div>

              {/* Categoria 2 */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 px-3">Servidor MTA</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#instalacao" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "instalacao" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Permissões (ACL)
                    </a>
                  </li>
                  <li>
                    <a href="#configuracao" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "configuracao" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Configuração (Lua)
                    </a>
                  </li>
                  <li>
                    <a href="#eventos" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "eventos" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Eventos (Callbacks)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Categoria 3 */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 px-3">Suporte</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#troubleshooting" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === "troubleshooting" ? "bg-green-500/10 text-green-500" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                      Solução de Problemas
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (MÓDULOS DE DÚVIDAS) */}
        <main className="flex-1 max-w-3xl space-y-24">
          
          <section id="introducao" className="scroll-mt-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4" /> Guia do Desenvolvedor
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
              Documentação <span className="text-green-500">API</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Bem-vindo à documentação oficial da PayMTA. Nós construímos nossa plataforma para ser o mais transparente e invisível possível. Siga os módulos abaixo para colocar seu servidor no piloto automático em menos de 10 minutos.
            </p>
          </section>

          <section id="credenciais" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Key className="w-6 h-6 text-green-500" /> Mercado Pago (Credenciais)
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                A PayMTA não retém o seu dinheiro (nos planos pagos). Para que o valor caia direto na sua conta, precisamos do seu Token de Produção.
              </p>
              <ul className="space-y-3 text-sm text-zinc-300 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Acesse o <a href="https://www.mercadopago.com.br/developers/panel" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Painel de Desenvolvedores do Mercado Pago</a>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Crie uma nova aplicação (Escolha "Pagamentos Online" e "Checkout Pro / API").</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Vá em <strong>Credenciais de Produção</strong> e copie o seu <code>Access Token</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Cole este token no seu Painel Administrativo da PayMTA, na aba "Integração API".</span>
                </li>
              </ul>
            </div>
          </section>

          <section id="instalacao" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-green-500" /> Permissões no Servidor (ACL)
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Baixe o nosso resource oficial (<code>paymta_core</code>) e coloque na pasta <code>resources</code> do seu servidor. <strong>Atenção:</strong> O script precisa de permissão de Admin para conseguir setar VIPs e dar itens aos jogadores.
              </p>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                <p className="text-xs text-yellow-500/90 leading-relaxed">
                  Abra o arquivo <code>acl.xml</code> do seu servidor e adicione a linha abaixo dentro do grupo <strong>Admin</strong>. Sem isso, o resource não terá permissão para executar o callback de entrega.
                </p>
              </div>

              <div className="bg-[#030303] border border-white/10 rounded-lg p-4 overflow-x-auto transform-gpu">
                <pre className="text-sm font-mono text-zinc-300">
                  <code>
<span className="text-zinc-500">&lt;!-- Adicione dentro da tag &lt;group name="Admin"&gt; --&gt;</span>{`\n`}
<span className="text-blue-400">&lt;object</span> <span className="text-green-400">name=</span><span className="text-orange-400">"resource.paymta_core"</span><span className="text-blue-400">&gt;&lt;/object&gt;</span>
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section id="configuracao" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Code2 className="w-6 h-6 text-green-500" /> Configuração do Resource
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                Abra o arquivo <code>config.lua</code> dentro da pasta do nosso resource. Você precisará do seu <strong>Token de Loja</strong>, que é a sua chave secreta única encontrada no painel da PayMTA.
              </p>
              <div className="bg-[#030303] border border-white/10 rounded-lg p-4 overflow-x-auto transform-gpu">
                <pre className="text-sm text-zinc-300 font-mono">
                  <code>
<span className="text-zinc-500">-- config.lua</span>{`\n`}
Config = {`{`}{`\n`}
  <span className="text-zinc-500">-- Cole sua chave privada gerada no nosso painel</span>{`\n`}
  LOJA_TOKEN = <span className="text-green-400">"tkn_SuaChaveSecretaAqui123"</span>,{`\n`}
  
  <span className="text-zinc-500">-- Mude para 'false' quando o servidor for para produção</span>{`\n`}
  DEBUG_MODE = <span className="text-orange-400">true</span>{`\n`}
{`}`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section id="eventos" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-green-500" /> Evento de Entrega (Callback)
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl">
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                Sempre que um jogador pagar um PIX, a nossa API envia um Webhook silencioso e criptografado para o seu servidor. O resource capta esse Webhook e dispara o evento global <code>onPayMTAPaymentApproved</code>.
              </p>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Basta adicionar o script abaixo em qualquer arquivo <strong>server-side</strong> da sua base (seja VRP, Creative, ou base própria) para efetuar a entrega ao jogador.
              </p>

              <div className="bg-[#030303] border border-white/10 rounded-lg p-4 overflow-x-auto transform-gpu">
                <pre className="text-sm text-zinc-300 font-mono leading-loose">
                  <code>
<span className="text-zinc-500">-- Adicione isso no seu sistema de VIP (Server-side)</span>{`\n`}
<span className="text-blue-400">addEvent</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, <span className="text-orange-400">true</span>){`\n`}
<span className="text-blue-400">addEventHandler</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, root, {`\n`}
  <span className="text-blue-400">function</span>(passaporte, pacoteID, valor){`\n`}
    {"\n"}
    <span className="text-zinc-500">    -- Exemplo de validação: Se ele comprou o VIP Ouro</span>{`\n`}
    <span className="text-blue-400">    if</span> pacoteID == <span className="text-green-400">"vip_ouro"</span> <span className="text-blue-400">then</span>{`\n`}
        {"\n"}
        <span className="text-zinc-500">        -- Use a função nativa da sua base para dar o VIP</span>{`\n`}
        vRP.addVIP(passaporte, <span className="text-green-400">"Ouro"</span>){`\n`}
        {"\n"}
        <span className="text-blue-400">        outputDebugString</span>(<span className="text-green-400">"[PayMTA] VIP Ouro entregue ao ID: "</span> .. tostring(passaporte)){`\n`}
    <span className="text-blue-400">    end</span>{`\n`}
    {"\n"}
  <span className="text-blue-400">end</span>{`\n`}
)
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section id="troubleshooting" className="scroll-mt-32 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-green-500" /> Solução de Problemas
            </h2>
            <div className="space-y-4">
              
              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> O PIX foi pago, mas o item não chegou.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Verifique 3 coisas: 1) Se o seu <code>Access Token</code> do Mercado Pago está correto no painel. 2) Se o resource <code>paymta_core</code> está com permissão de Admin na sua <code>acl.xml</code>. 3) Se o nome do pacote no seu script (ex: "vip_ouro") está escrito exatamente igual ao cadastrado no painel PayMTA.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Erro "Access Denied" no console.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Isso significa que o script tentou comunicar o pagamento, mas o seu servidor MTA bloqueou por falta de permissão. Volte ao <strong>Passo 2 (ACL)</strong> desta documentação. Após adicionar a permissão, digite <code>reloadacl</code> no console.
                </p>
              </div>

            </div>

            <div className="mt-12 bg-green-500/5 border border-green-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-white font-bold text-lg mb-2">Ainda precisa de ajuda?</h3>
              <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
                Nossa equipe técnica está pronta para ajudar você a integrar a API na sua base VRP, Creative ou própria.
              </p>
              <a href="https://discord.gg/seu-link-aqui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider text-sm transition-transform active:scale-95 shadow-lg shadow-green-500/20">
                Suporte no Discord <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}