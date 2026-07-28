"use client";

import { Scale, BookOpen, UserX, MessageSquare, AlertCircle, Loader2, Search, ChevronRight, ChevronLeft, Shield } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  serverName?: string;
  rules?: RuleItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "user-x": <UserX className="w-5 h-5 text-red-400" />,
  "message": <MessageSquare className="w-5 h-5 text-blue-400" />,
  "scale": <Scale className="w-5 h-5 text-yellow-400" />,
  "book": <BookOpen className="w-5 h-5 text-emerald-400" />,
  "alert": <AlertCircle className="w-5 h-5 text-orange-400" />,
  "shield": <Shield className="w-5 h-5 text-[var(--primary)]" />
};

const regrasPadrao: RuleItem[] = [
  { category: "Regras Gerais", title: "RDM & VDM", description: "É estritamente proibido matar ou atropelar jogadores sem um motivo de Roleplay (RP) aparente e justificado.", icon: "user-x" },
  { category: "Regras Gerais", title: "Meta Gaming", description: "Proibido usar informações obtidas fora do jogo (Discord, Lives da Twitch, etc) para se beneficiar in-game.", icon: "message" },
  { category: "Regras Gerais", title: "Power Gaming", description: "Proibido realizar ações impossíveis na vida real para obter vantagem (ex: saltar de prédios sem dano).", icon: "alert" },
  { category: "Ilegal & Facções", title: "Ações de Rua", description: "Toda ação ilegal deve ter uma motivação clara. É proibido roubar sem anunciar o assalto previamente.", icon: "book" },
  { category: "Convivência", title: "Respeito à Staff", description: "As decisões da administração são soberanas. Questionamentos devem ser feitos civilizadamente via Ticket no Discord.", icon: "scale" },
];

export default function RegrasPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [regras, setRegras] = useState<RuleItem[]>([]);
  const [settings, setSettings] = useState<ShopConfig | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados da Documentação
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadRules() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        const data = await res.json();
        
        if (data && !data.error) {
          setSettings(data);
          const rulesToSet = (data.rules && data.rules.length > 0) ? data.rules : regrasPadrao;
          setRegras(rulesToSet);
          
          // Define a primeira categoria como ativa inicialmente
          const firstCat = rulesToSet[0]?.category || rulesToSet[0]?.cat || "Geral";
          setActiveCategory(firstCat);
        }
      } catch (error) {
        console.error("Erro ao carregar regras:", error);
        setRegras(regrasPadrao);
        setActiveCategory("Regras Gerais");
      } finally {
        setLoading(false);
      }
    }
    loadRules();
  }, [slug]);

  // Extrai as categorias únicas
  const categories = useMemo(() => {
    const cats = regras.map(r => r.category || r.cat || "Outros");
    return Array.from(new Set(cats));
  }, [regras]);

  // Filtra as regras baseadas na categoria ativa OU na pesquisa global
  const displayedRules = useMemo(() => {
    if (search.trim() !== "") {
      return regras.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase()) || 
        (r.description || r.desc || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    return regras.filter(r => (r.category || r.cat || "Outros") === activeCategory);
  }, [regras, activeCategory, search]);

  // Lógica de Paginação (Anterior / Próximo)
  const currentIndex = categories.indexOf(activeCategory);
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#030303]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      <span className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Sincronizando Leis...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-24" style={{ "--primary": settings?.primaryColor || "#facb11" } as React.CSSProperties}>
      
      {/* CONTAINER PRINCIPAL ESTILO DOCUMENTAÇÃO (GITBOOK) */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-24 md:pt-32 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-20 items-start">
        
        {/* SIDEBAR DE NAVEGAÇÃO (DESKTOP) & HORIZONTAL (MOBILE) */}
        <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-32 h-auto lg:h-[calc(100vh-10rem)] flex flex-col gap-6">
          
          {/* BARRA DE PESQUISA */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Pesquisar regra..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:border-[var(--primary)]/50 outline-none transition-all text-white placeholder:text-zinc-600 shadow-inner"
            />
          </div>

          {/* MENU DE CATEGORIAS */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-4 shadow-xl flex-1 overflow-hidden flex flex-col">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 px-2">Capítulos</h3>
            
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-hide pb-2 lg:pb-0">
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat && search.trim() === "";
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal text-left group border ${
                      isActive
                      ? 'bg-[var(--primary)]/10 border-[var(--primary)]/20 shadow-inner'
                      : 'bg-transparent border-transparent hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-md border shrink-0 transition-colors ${
                      isActive 
                      ? 'bg-[var(--primary)] text-black border-[var(--primary)]' 
                      : 'bg-zinc-900 text-zinc-500 border-white/10 group-hover:border-zinc-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-sm font-bold truncate transition-colors ${
                      isActive ? 'text-[var(--primary)]' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {cat}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO PRINCIPAL (REGRAS) */}
        <main className="flex-1 min-w-0 w-full animate-in fade-in duration-500">
          
          <header className="mb-10 pb-6 border-b border-white/5">
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-3 flex items-center gap-4">
              {search.trim() !== "" ? "Resultados da Busca" : activeCategory}
            </h1>
            <p className="text-zinc-400 font-medium">
              {search.trim() !== "" 
                ? `Encontramos ${displayedRules.length} regra(s) para "${search}"` 
                : "Leia atentamente as diretrizes abaixo para evitar punições in-game."}
            </p>
          </header>

          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {displayedRules.map((rule, idx) => (
                <motion.div 
                  key={rule.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#09090b] border border-white/5 p-6 md:p-8 rounded-[24px] flex flex-col sm:flex-row gap-6 hover:border-[var(--primary)]/30 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 group-hover:border-[var(--primary)]/30 transition-all duration-500 shadow-inner">
                    {ICON_MAP[rule.icon] || <BookOpen className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />}
                  </div>
                  
                  <div className="flex-1">
                    {/* Exibe a tag da categoria se estivermos no modo de busca global */}
                    {search.trim() !== "" && (
                      <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest block mb-2">
                        {rule.category || rule.cat}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight uppercase italic group-hover:text-[var(--primary)] transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
                      {rule.description || rule.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

              {displayedRules.length === 0 && (
                <div className="py-20 text-center bg-[#0a0a0a] rounded-[32px] border border-dashed border-white/10">
                  <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Nenhuma regra encontrada.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTÕES DE NAVEGAÇÃO DE PÁGINA (ANTERIOR / PRÓXIMO) */}
          {search.trim() === "" && (
            <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevCategory ? (
                <button 
                  onClick={() => {
                    setActiveCategory(prevCategory);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-4 p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-white/20 transition-all text-left group"
                >
                  <ChevronLeft className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-600 block mb-1">Capítulo Anterior</span>
                    <span className="text-sm font-bold text-white group-hover:text-[var(--primary)] transition-colors">{prevCategory}</span>
                  </div>
                </button>
              ) : <div />}

              {nextCategory && (
                <button 
                  onClick={() => {
                    setActiveCategory(nextCategory);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-end gap-4 p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-[var(--primary)]/30 transition-all text-right group"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-zinc-600 block mb-1">Próximo Capítulo</span>
                    <span className="text-sm font-bold text-white group-hover:text-[var(--primary)] transition-colors">{nextCategory}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[var(--primary)] transition-colors" />
                </button>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}