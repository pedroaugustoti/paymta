"use client";

import { Scale, BookOpen, UserX, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Mapeamento de strings para ícones do Lucide
const ICON_MAP: any = {
  "user-x": <UserX className="text-red-500" />,
  "message": <MessageSquare className="text-blue-500" />,
  "scale": <Scale className="text-yellow-500" />,
  "book": <BookOpen className="text-emerald-500" />,
  "alert": <AlertCircle className="text-orange-500" />,
};

export default function RegrasPage() {
  const [regras, setRegras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // REGRAS PADRÃO (Caso o banco de dados esteja vazio)
  const regrasPadrao = [
    { category: "Geral", title: "RDM & VDM", description: "Proibido matar ou atropelar jogadores sem um motivo de Roleplay (RP) aparente.", icon: "user-x" },
    { category: "Geral", title: "Meta Gaming", description: "Proibido usar informações de fora do jogo (Discord/Live) para benefício in-game.", icon: "message" },
    { category: "Convivência", title: "Respeito Staff", description: "Decisões da administração são soberanas. Questionamentos apenas via Ticket no Discord.", icon: "scale" },
  ];

  useEffect(() => {
    async function loadRules() {
      try {
        const res = await fetch("/api/shop/config");
        const data = await res.json();
        
        // Se existirem regras no banco, usa elas; senão, usa o padrão
        if (data?.rules && data.rules.length > 0) {
          setRegras(data.rules);
        } else {
          setRegras(regrasPadrao);
        }
      } catch (error) {
        console.error("Erro ao carregar regras:", error);
        setRegras(regrasPadrao);
      } finally {
        setLoading(false);
      }
    }
    loadRules();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center text-zinc-500 font-bold uppercase italic tracking-tighter">
      <Loader2 className="w-6 h-6 animate-spin mr-3 text-yellow-500" /> Consultando Diretrizes...
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pt-16 animate-in fade-in duration-700">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">Regulamento Interno</h1>
        <p className="text-zinc-500 font-medium leading-relaxed">Siga as normas da nossa cidade para garantir uma boa experiência de Roleplay para todos.</p>
      </header>

      <div className="grid gap-6">
        {regras.map((r, index) => (
          <div 
            key={r.id || index} 
            className="bg-zinc-950/50 border border-white/5 p-6 rounded-[24px] flex gap-6 hover:border-[var(--primary)]/20 transition-all group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              {/* Renderiza o ícone com base na string salva no banco */}
              {ICON_MAP[r.icon] || <BookOpen className="text-zinc-500" />}
            </div>
            
            <div>
              <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest block mb-1">
                {r.category || r.cat}
              </span>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[var(--primary)] transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                {r.description || r.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 p-8 rounded-[32px] border border-white/5 bg-white/5 text-center">
        <p className="text-zinc-500 text-sm font-medium">
          Dúvidas sobre o regulamento? Entre em contato com a Staff através do nosso <span className="text-[var(--primary)] font-bold italic">Discord Oficial</span>.
        </p>
      </footer>
    </div>
  );
}