import Link from "next/link";

export default function PlanosPage() {
  return (
    <div className="min-h-screen py-24 flex flex-col items-center justify-center relative px-4">
      {/* Efeito de brilho no fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center z-10 max-w-2xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
          Escolha seu <span className="text-purple-500">Arsenal</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Taxas transparentes, sem pegadinhas. Escale as vendas do seu servidor MTA com a automação mais rápida do mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full z-10">
        
        {/* Plano Starter */}
        <div className="flex flex-col p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md animate-in fade-in zoom-in duration-700 delay-100 relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="mb-8">
            <h3 className="text-2xl font-black italic uppercase text-white mb-2">Starter</h3>
            <p className="text-zinc-400 text-sm">Ideal para servidores novos começando a monetizar.</p>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-black text-white">4.9%</span>
            <span className="text-zinc-500 font-medium"> / transação</span>
            <p className="text-sm text-purple-400 mt-2 font-medium">+ R$ 0,00 de mensalidade</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-green-500 text-sm">check_circle</span>
              Integração MTA via Script Lua
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-green-500 text-sm">check_circle</span>
              Painel de Lojista Completo
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-green-500 text-sm">check_circle</span>
              Entrega automática de VIPs/Itens
            </li>
          </ul>

          <Link href="/auth/register" className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-white/10 transition-colors uppercase tracking-wider text-sm">
            Começar Grátis
          </Link>
        </div>

        {/* Plano Pro (Destaque) */}
        <div className="flex flex-col p-8 rounded-3xl border border-purple-500/50 bg-purple-500/10 backdrop-blur-md animate-in fade-in zoom-in duration-700 delay-200 relative overflow-hidden group shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
            Recomendado
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-black italic uppercase text-white mb-2">Pro Server</h3>
            <p className="text-zinc-400 text-sm">Para servidores grandes com alto volume de vendas.</p>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-black text-white">2.9%</span>
            <span className="text-zinc-500 font-medium"> / transação</span>
            <p className="text-sm text-yellow-500 mt-2 font-medium">+ R$ 49,90 / mês</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-purple-500 text-sm">check_circle</span>
              Tudo do plano Starter
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-purple-500 text-sm">check_circle</span>
              Taxas reduzidas no Mercado Pago
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-purple-500 text-sm">check_circle</span>
              Suporte Prioritário no WhatsApp
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <span className="material-icons text-purple-500 text-sm">check_circle</span>
              Webhook customizado
            </li>
          </ul>

          <Link href="/auth/register" className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-center transition-colors uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Assinar Pro
          </Link>
        </div>

      </div>
    </div>
  );
}