import Link from "next/link";
import { Check, CheckCircle2, Star, Zap } from "lucide-react";

export default function PlanosPage() {
  return (
    <div className="min-h-screen py-16 flex flex-col items-center justify-center bg-[#030303] px-4">
      
      {/* Cabeçalho */}
      <div className="text-center z-10 max-w-3xl mb-16 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6">
          Escale seu Servidor
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
          Planos <span className="text-green-500">PayMTA</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Transparência total, sem letras miúdas. Automatize suas vendas e escolha o arsenal ideal para o tamanho da sua cidade.
        </p>
      </div>

      {/* Grid de 4 Planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full z-10 items-stretch">
        
        {/* 1. Plano Trial (Automático) */}
        <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-[#080808] hover:bg-[#0a0a0a] transition-colors h-full">
          <div className="mb-6">
            <h3 className="text-xl font-black uppercase text-zinc-300 mb-1">Trial Grátis</h3>
            <p className="text-zinc-500 text-sm">3 Dias para validar a integração.</p>
          </div>
          
          <div className="mb-6 pb-6 border-b border-white/5">
            <span className="text-4xl font-black text-white">Grátis</span>
            <p className="text-xs text-green-500 mt-2 font-bold tracking-wide">ATIVAÇÃO IMEDIATA</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-400">
            <li className="flex items-center gap-3"><Check className="text-zinc-600 w-4 h-4 shrink-0" /> Taxa de 3% por venda</li>
            <li className="flex items-center gap-3"><Check className="text-zinc-600 w-4 h-4 shrink-0" /> Limite de R$ 500 em vendas</li>
            <li className="flex items-center gap-3"><Check className="text-zinc-600 w-4 h-4 shrink-0" /> Integração de 1 Servidor</li>
            <li className="flex items-center gap-3"><Check className="text-zinc-600 w-4 h-4 shrink-0" /> Dashboard Básico</li>
          </ul>
          
          <Link href="/auth/register" className="w-full py-3 rounded-lg border border-white/10 text-white font-bold text-center hover:bg-white/5 transition-colors uppercase text-xs tracking-wider mt-auto">
            Iniciar Trial
          </Link>
        </div>

        {/* 2. Plano Basic */}
        <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-[#080808] hover:bg-[#0a0a0a] transition-colors h-full">
          <div className="mb-6">
            <h3 className="text-xl font-black uppercase text-white mb-1">Basic</h3>
            <p className="text-zinc-500 text-sm">Ideal para cidades em crescimento.</p>
          </div>
          
          <div className="mb-6 pb-6 border-b border-white/5">
            <span className="text-4xl font-black text-white">R$ 49</span><span className="text-xl text-zinc-500">,90/mês</span>
            <p className="text-xs text-green-400 mt-2 font-medium">0% de taxa PayMTA</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-300">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-zinc-400 w-4 h-4 shrink-0" /> Limite de R$ 5.000 em vendas</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-zinc-400 w-4 h-4 shrink-0" /> Dashboard Financeiro Completo</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-zinc-400 w-4 h-4 shrink-0" /> Logs em Tempo Real</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-zinc-400 w-4 h-4 shrink-0" /> Suporte via Ticket (Discord)</li>
          </ul>
          
          <Link href="/auth/register?plan=basic" className="w-full py-3 rounded-lg border border-white/20 text-white font-bold text-center hover:bg-white/10 transition-colors uppercase text-xs tracking-wider mt-auto">
            Assinar Basic
          </Link>
        </div>

        {/* 3. Plano Pro (Destaque Central) */}
        <div className="flex flex-col p-8 rounded-2xl border-2 border-green-500 bg-[#0a0a0a] relative lg:-translate-y-4 shadow-[0_0_30px_rgba(34,197,94,0.15)] h-full">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
            Mais Assinado
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-black uppercase text-green-500 mb-1 flex items-center gap-2">Pro <Zap className="w-5 h-5 fill-green-500" /></h3>
            <p className="text-zinc-400 text-sm">O padrão ouro para grandes servidores.</p>
          </div>
          
          <div className="mb-6 pb-6 border-b border-white/5">
            <span className="text-4xl font-black text-white">R$ 99</span><span className="text-xl text-zinc-500">,90/mês</span>
            <p className="text-xs text-green-400 mt-2 font-medium">0% de taxa PayMTA</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-200">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" /> Limite de R$ 25.000 em vendas</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" /> Até 2 Servidores Conectados</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" /> Webhooks Customizados</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-4 h-4 shrink-0" /> Suporte Prioritário</li>
          </ul>
          
          <Link href="/auth/register?plan=pro" className="w-full py-4 rounded-lg bg-green-500 hover:bg-green-400 text-black font-black text-center transition-colors uppercase text-xs tracking-wider mt-auto">
            Assinar Pro
          </Link>
        </div>

        {/* 4. Plano Advanced */}
        <div className="flex flex-col p-8 rounded-2xl border border-white/10 bg-[#080808] hover:bg-[#0a0a0a] transition-colors h-full">
          <div className="mb-6">
            <h3 className="text-xl font-black uppercase text-white mb-1">Advanced</h3>
            <p className="text-zinc-500 text-sm">Para Networks sem limites.</p>
          </div>
          
          <div className="mb-6 pb-6 border-b border-white/5">
            <span className="text-4xl font-black text-white">R$ 149</span><span className="text-xl text-zinc-500">,90/mês</span>
            <p className="text-xs text-green-400 mt-2 font-medium">0% de taxa PayMTA</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1 text-sm text-zinc-400">
            <li className="flex items-center gap-3"><Star className="text-white w-4 h-4 shrink-0" /> Vendas Ilimitadas (Sem trava)</li>
            <li className="flex items-center gap-3"><Star className="text-white w-4 h-4 shrink-0" /> Até 5 Servidores Conectados</li>
            <li className="flex items-center gap-3"><Star className="text-white w-4 h-4 shrink-0" /> Acesso VIP ao WhatsApp</li>
            <li className="flex items-center gap-3"><Star className="text-white w-4 h-4 shrink-0" /> Configuração Guiada (Call)</li>
          </ul>
          
          <Link href="/auth/register?plan=advanced" className="w-full py-3 rounded-lg border border-white/20 text-white font-bold text-center hover:bg-white/10 transition-colors uppercase text-xs tracking-wider mt-auto">
            Assinar Advanced
          </Link>
        </div>

      </div>
    </div>
  );
}