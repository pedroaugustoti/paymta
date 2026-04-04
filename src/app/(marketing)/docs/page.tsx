"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, Terminal, Download, Settings, 
  ShieldAlert, CheckCircle2, Code2, AlertTriangle,
  ListTree, X
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DocsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { group: "Começando", items: [
      { name: "Requisitos", id: "requisitos" },
      { name: "Instalação", id: "instalacao" }
    ]},
    { group: "Configuração", items: [
      { name: "O arquivo config.lua", id: "configuracao" },
      { name: "Mapeando Comandos", id: "mapeamento" }
    ]},
    { group: "MTA Server", items: [
      { name: "Permissões da ACL", id: "acl" }
    ]}
  ];

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-[#000000] text-zinc-300 pb-24 font-sans selection:bg-yellow-500/30">
      
      {/* 1. BOTÃO FLUTUANTE MOBILE (Melhoria de UX) */}
      <div className="md:hidden fixed bottom-8 right-6 z-[60]">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-14 h-14 bg-yellow-400 text-black rounded-full shadow-[0_10px_30px_rgba(234,179,8,0.4)] flex items-center justify-center border-4 border-black"
        >
          <ListTree className="w-6 h-6" />
        </motion.button>
      </div>

      {/* 2. DRAWER MOBILE (Menu Lateral que desliza) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay Escuro */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] md:hidden"
            />
            {/* Menu Lateral */}
            <motion.aside 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[300px] bg-[#09090b] z-[80] border-l border-white/10 p-8 md:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-white font-black uppercase text-xs tracking-widest">Navegação</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500"><X size={20}/></button>
              </div>
              <nav className="space-y-8">
                {menuItems.map((group) => (
                  <div key={group.group}>
                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">{group.group}</h4>
                    <ul className="space-y-4">
                      {group.items.map(item => (
                        <li key={item.id}>
                          <a 
                            href={`#${item.id}`} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold text-zinc-300 hover:text-yellow-400 flex items-center gap-2"
                          >
                            <ChevronRight size={14} className="text-yellow-500/30" /> {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="pt-24 md:pt-32 pb-12 md:pb-20 border-b border-white/5 bg-gradient-to-b from-[#050505] to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-[10px] font-black tracking-widest uppercase mb-6 border border-yellow-500/20">
            <Code2 size={14} /> Documentação v1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Guia de <span className="text-yellow-400">Integração</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
            Configure seu servidor de MTA:SA para receber pagamentos PIX de forma automatizada e segura.
          </p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start gap-16 mt-16">
        
        {/* Sidebar Desktop (Invisível no Mobile) */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-32 space-y-10">
          {menuItems.map((group) => (
            <div key={group.group}>
              <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-5">{group.group}</h4>
              <ul className="space-y-4">
                {group.items.map(item => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-sm font-bold text-zinc-400 hover:text-yellow-400 transition-all flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-zinc-800 rounded-full group-hover:bg-yellow-400 transition-colors" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Artigo com as Seções */}
        <article className="flex-1 w-full max-w-3xl space-y-24">
          <Section id="requisitos" title="1. Requisitos" icon={<CheckCircle2 className="text-yellow-400" />}>
            <p className="mb-6">Certifique-se de que sua infraestrutura atende aos pontos abaixo:</p>
            <div className="grid gap-4">
              <div className="p-4 rounded-xl bg-[#09090b] border border-white/5 flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <span className="text-sm font-bold">License Key ativa no painel</span>
              </div>
              <div className="p-4 rounded-xl bg-[#09090b] border border-white/5 flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <span className="text-sm font-bold">MTA:SA Server versão 1.5.9 ou superior</span>
              </div>
            </div>
          </Section>

          <Section id="instalacao" title="2. Instalação" icon={<Download className="text-yellow-400" />}>
            <div className="space-y-4">
              {[
                { s: 1, t: "Baixe o PayMTA.zip no seu dashboard." },
                { s: 2, t: "Mova a pasta para resources/[paymta]." },
                { s: 3, t: "Inicie o servidor e aguarde a sincronização." }
              ].map(item => (
                <div key={item.s} className="flex gap-4 items-start p-5 bg-[#09090b] border border-white/5 rounded-2xl">
                  <span className="text-zinc-600 font-black text-2xl tracking-tighter">0{item.s}</span>
                  <p className="text-zinc-300 font-medium leading-relaxed pt-1">{item.t}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="configuracao" title="3. Configuração" icon={<Settings className="text-yellow-400" />}>
            <CodeBlock title="paymta/config.lua">
              <span className="text-blue-400">Config</span> = {'{}'}<br/><br/>
              <span className="text-zinc-500">-- Chave de autenticação única</span><br/>
              <span className="text-blue-400">Config.LicenseKey</span> = <span className="text-yellow-300">"PAYMTA-XXXX-XXXX"</span>
            </CodeBlock>
          </Section>

          <Section id="mapeamento" title="4. Mapeamento" icon={<Terminal className="text-yellow-400" />}>
            <CodeBlock title="paymta/config.lua">
              <span className="text-zinc-500">-- Comandos executados via console</span><br/>
              <span className="text-blue-400">Config.Pacotes</span> = {'{'}<br/>
              &nbsp;&nbsp;[<span className="text-yellow-300">"vip_ouro"</span>] = <span className="text-yellow-300">"addvip {'{'}player{'}'} Ouro 30"</span><br/>
              {'}'}
            </CodeBlock>
          </Section>

          <Section id="acl" title="5. Permissões" icon={<ShieldAlert className="text-yellow-400" />}>
             <div className="bg-yellow-400/5 border border-yellow-400/20 p-6 rounded-2xl mb-8 flex gap-4">
               <AlertTriangle className="text-yellow-400 shrink-0" />
               <p className="text-sm font-bold text-yellow-400/80 leading-relaxed">
                 O script precisa de acesso administrativo no arquivo acl.xml para executar os comandos de entrega.
               </p>
             </div>
             <CodeBlock title="acl.xml">
               <span className="text-emerald-400">&lt;object</span> <span className="text-blue-300">name=</span><span className="text-yellow-300">"resource.paymta"</span> <span className="text-emerald-400">/&gt;</span>
             </CodeBlock>
          </Section>
        </article>
      </div>
    </main>
  );
}

// Componentes Utilitários Reutilizáveis
function Section({ id, title, icon, children }: any) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
      </div>
      <div className="pl-0 md:pl-16">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ title, children }: any) {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-6">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[10px] font-black text-zinc-600 uppercase ml-2">{title}</span>
      </div>
      <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800">
        <pre>{children}</pre>
      </div>
    </div>
  );
}