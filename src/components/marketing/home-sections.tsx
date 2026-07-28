import Link from "next/link";
import { 
  Zap, Wallet, ShieldCheck, ArrowRight, Code2, Server, 
  Terminal, CheckCircle2, ChevronRight 
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="text-center max-w-4xl mx-auto pt-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        A Evolução das Lojas de MTA
      </div>
      <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[1.1]">
        Venda VIPs no <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          Piloto Automático.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
        Integração PIX nativa com Mercado Pago e entrega in-game no mesmo segundo. O dinheiro cai direto na sua conta, sem intermediários.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <Link href="/auth/register" className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-green-500 text-black font-black uppercase tracking-wider transition-all hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transform-gpu">
          Começar Agora
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href="#integration" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider transition-all transform-gpu">
          <Code2 className="w-5 h-5 text-zinc-400" />
          Ver Integração
        </Link>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-y border-white/10 py-10 bg-black/40">
      <div className="text-center">
        <h4 className="text-4xl font-black text-white italic">0%</h4>
        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1">Taxa de Saque</p>
      </div>
      <div className="text-center">
        <h4 className="text-4xl font-black text-white italic">1s</h4>
        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1">Entrega In-Game</p>
      </div>
      <div className="text-center">
        <h4 className="text-4xl font-black text-white italic">PIX</h4>
        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1">Gateway Nativo</p>
      </div>
      <div className="text-center">
        <h4 className="text-4xl font-black text-white italic"><Server className="inline w-8 h-8 -mt-2 text-green-500"/></h4>
        <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold mt-1">Multi-Servidores</p>
      </div>
    </section>
  );
}

export function BentoFeatures() {
  return (
    // 👇 Adicionei o id="features" e o scroll-mt-24 aqui!
    <section id="features" className="scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
          Por que escolher a <span className="text-green-500">PayMTA?</span>
        </h2>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">Tudo que você precisa para monetizar sua cidade sem dor de cabeça.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] group relative overflow-hidden transform-gpu">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7 text-green-500" />
          </div>
          <h3 className="text-xl font-black uppercase italic text-white mb-3">Entrega Fulminante</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">O jogador pagou? O webhook aciona seu servidor instantaneamente e o VIP cai na conta dele em menos de 1 segundo.</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] group relative overflow-hidden transform-gpu">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Wallet className="w-7 h-7 text-green-500" />
          </div>
          <h3 className="text-xl font-black uppercase italic text-white mb-3">Direto no seu Bolso</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">Sem botão de "Solicitar Saque". O valor cai 100% direto na sua conta do Mercado Pago. Nós somos apenas a ponte.</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] group relative overflow-hidden transform-gpu">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-7 h-7 text-green-500" />
          </div>
          <h3 className="text-xl font-black uppercase italic text-white mb-3">Anti-Fraude Nativo</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">Comprovantes falsos são inúteis. O script in-game só executa o comando com a confirmação criptografada da API.</p>
        </div>

      </div>
    </section>
  );
}

export function DeveloperSection() {
  return (
    <section id="integration" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          Feito para Desenvolvedores
        </div>
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-tight">
          Apenas <span className="text-green-500">1 Evento</span> para integrar tudo.
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Diga adeus as APIs complexas. Você só precisa arrastar nosso resource para sua base e adicionar o seu script de entrega dentro do nosso callback nativo. Simples, limpo e seguro.
        </p>
        <ul className="space-y-4 pt-4">
          <li className="flex items-center gap-3 text-zinc-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Resource oficial pronto para uso.
          </li>
          <li className="flex items-center gap-3 text-zinc-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Sem limites de requisição.
          </li>
          <li className="flex items-center gap-3 text-zinc-300 font-medium">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Funciona com qualquer base (VRP, Creative, etc).
          </li>
        </ul>
      </div>
      
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 bg-green-500/20 translate-y-4 -translate-x-4 rounded-2xl pointer-events-none" />
        <div className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform-gpu hover:-translate-y-1 transition-transform">
          <div className="bg-[#141414] border-b border-white/5 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-xs font-mono text-zinc-500">paymta_delivery.lua</div>
          </div>
          <div className="p-6 overflow-x-auto text-sm font-mono leading-loose">
            <pre>
              <code>
<span className="text-zinc-500">-- Evento disparado ao aprovar o PIX</span>{"\n"}
<span className="text-blue-400">addEvent</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, <span className="text-orange-400">true</span>){"\n"}
<span className="text-blue-400">addEventHandler</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, root, {"\n"}
  <span className="text-blue-400">function</span>(passaporte, pacoteID){"\n"}
    {"\n"}
    <span className="text-zinc-500">    -- Sua lógica de entrega no servidor</span>{"\n"}
    <span className="text-blue-400">    if</span> pacoteID == <span className="text-green-400">"vip_diamante"</span> <span className="text-blue-400">then</span>{"\n"}
        vRP.addVIP(passaporte, <span className="text-green-400">"Diamante"</span>){"\n"}
        {"\n"}
        <span className="text-blue-400">outputChatBox</span>(<span className="text-green-400">"✅ VIP Ativado!"</span>, player){"\n"}
    <span className="text-blue-400">    end</span>{"\n"}
  <span className="text-blue-400">end</span>{"\n"}
)
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="border-t border-white/10 pt-24 text-center">
      <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-16">
        Como funciona na <span className="text-green-500">Prática?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-black border-2 border-green-500 text-green-500 text-2xl font-black flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform transform-gpu">1</div>
          <h3 className="text-lg font-bold text-white mb-2">Crie sua Conta</h3>
          <p className="text-sm text-zinc-400">Cadastre-se na PayMTA e conecte seu Mercado Pago com 1 clique.</p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-black border-2 border-green-500 text-green-500 text-2xl font-black flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform transform-gpu">2</div>
          <h3 className="text-lg font-bold text-white mb-2">Instale o Resource</h3>
          <p className="text-sm text-zinc-400">Coloque nosso script na base e insira sua chave secreta.</p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-black border-2 border-green-500 text-green-500 text-2xl font-black flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:scale-110 transition-transform transform-gpu">3</div>
          <h3 className="text-lg font-bold text-white mb-2">Venda no Automático</h3>
          <p className="text-sm text-zinc-400">O jogador compra na sua loja web e recebe na hora dentro do jogo.</p>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-green-500 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)] transform-gpu hover:shadow-[0_0_80px_rgba(34,197,94,0.3)] transition-shadow duration-500">
      <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-black mb-6">
        Pronto para faturar?
      </h2>
      <p className="text-black/80 font-medium text-lg mb-10 max-w-2xl mx-auto">
        Crie sua conta agora, faça um teste gratuito no plano Trial e veja a mágica acontecer no seu servidor hoje mesmo.
      </p>
      <Link href="/auth/register" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-black text-white font-black uppercase tracking-wider transition-transform hover:scale-105 shadow-xl transform-gpu">
        Criar Loja Grátis
        <ChevronRight className="w-5 h-5" />
      </Link>
    </section>
  );
}