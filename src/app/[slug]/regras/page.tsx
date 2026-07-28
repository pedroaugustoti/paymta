"use client";

import { Scale, BookOpen, UserX, MessageSquare, AlertCircle, Loader2, Info } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // IMPORTAÇÃO CORRIGIDA

interface RuleItem {
  id?: string;
  category?: string;
  cat?: string;
  title: string;
  description?: string;
  desc?: string;
  icon: string;
}

interface ShopConfig {
  primaryColor?: string;
  discordUrl?: string;
  rules?: RuleItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "user-x": <UserX className="w-6 h-6 text-red-500" />,
  "message": <MessageSquare className="w-6 h-6 text-blue-500" />,
  "scale": <Scale className="w-6 h-6 text-yellow-500" />,
  "book": <BookOpen className="w-6 h-6 text-emerald-500" />,
  "alert": <AlertCircle className="w-6 h-6 text-orange-500" />,
};

const regrasPadrao: RuleItem[] = [
  { category: "Geral", title: "RDM & VDM", description: "Proibido matar ou atropelar jogadores sem um motivo de Roleplay (RP) aparente.", icon: "user-x" },
  { category: "Geral", title: "Meta Gaming", description: "Proibido usar informações de fora do jogo (Discord/Live) para benefício in-game.", icon: "message" },
  { category: "Convivência", title: "Respeito Staff", description: "Decisões da administração são soberanas. Questionamentos apenas via Ticket no Discord.", icon: "scale" },
];

export default function RegrasPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [regras, setRegras] = useState<RuleItem[]>([]);
  const [settings, setSettings] = useState<ShopConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRules() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        const data = await res.json();
        
        if (data && !data.error) {
          setSettings(data);
          if (data.rules && data.rules.length > 0) {
            setRegras(data.rules);
          } else {
            setRegras(regrasPadrao);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar regras:", error);
        setRegras(regrasPadrao);
      } finally {
        setLoading(false);
      }
    }
    loadRules();
  }, [slug]);

  // Agrupa as regras por categoria automaticamente
  const groupedRules = useMemo(() => {
    return regras.reduce((acc, rule) => {
      const cat = rule.category || rule.cat || "Outros";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(rule);
      return acc;
    }, {} as Record<string, RuleItem[]>);
  }, [regras]);

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#030303]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      <span className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Consultando Diretrizes...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-24" style={{ "--primary": settings?.primaryColor || "#facb11" } as React.CSSProperties}>
      
      <div className="p-8 max-w-4xl mx-auto w-full pt-16 md:pt-24 animate-in fade-in duration-700">
        <header className="mb-16 text-center">
          <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-3xl mx-auto flex items-center justify-center mb-6 border border-[var(--primary)]/20 shadow-inner">
             <Scale className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Regulamento Interno</h1>
          <p className="text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto italic">Siga rigorosamente as normas da nossa cidade para garantir uma experiência de Roleplay imersiva e justa para todos os jogadores.</p>
        </header>

        <div className="space-y-16">
          {Object.entries(groupedRules).map(([category, rulesInCategory], catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">{category}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              
              <div className="grid gap-4">
                {rulesInCategory.map((r, index) => (
                  <div 
                    key={r.id || index} 
                    className="bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row gap-6 hover:border-[var(--primary)]/30 transition-all duration-300 group shadow-lg hover:shadow-[0_10px_30px_rgba(250,203,17,0.05)]"
                  >
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 group-hover:border-[var(--primary)]/20 transition-all duration-500 shadow-inner">
                      {ICON_MAP[r.icon] || <BookOpen className="w-6 h-6 text-zinc-500" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white mb-2 tracking-tight italic uppercase group-hover:text-[var(--primary)] transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium italic">
                        {r.description || r.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 p-8 md:p-10 rounded-[40px] border border-[var(--primary)]/20 bg-gradient-to-r from-[var(--primary)]/10 to-[#0a0a0a] text-center flex flex-col items-center">
          <Info className="w-8 h-8 text-[var(--primary)] mb-4" />
          <h4 className="text-lg font-black uppercase italic tracking-tighter text-white mb-2">Dúvidas sobre o regulamento?</h4>
          <p className="text-zinc-400 text-sm font-medium italic max-w-md mb-6">
            O desconhecimento das regras não isenta o jogador de punições. Entre em contato com a Staff.
          </p>
          <a href={settings?.discordUrl || "#"} target="_blank" rel="noreferrer">
            <Button className="bg-[var(--primary)] hover:brightness-110 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl shadow-xl shadow-[var(--primary)]/20 transition-all active:scale-95 border-none">
              Acessar Discord Oficial
            </Button>
          </a>
        </footer>
      </div>
    </div>
  );
}