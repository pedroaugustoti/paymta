"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Target, Wallet, Star, Loader2, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface RankItem {
  id: string;
  position: number;
  nickname: string;
  status: string;
  level: number | string;
  kills: number | string;
  wallet: number | string;
}

interface ShopConfig {
  primaryColor?: string;
  ranks?: RankItem[];
}

export default function RanksPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [ranks, setRanks] = useState<RankItem[]>([]);
  const [settings, setSettings] = useState<ShopConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanks() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        const data = await res.json();
        
        if (data && !data.error) {
          setSettings(data);
          // Ordena garantindo que a posição 1 seja a primeira
          if (data.ranks) {
            setRanks(data.ranks.sort((a: RankItem, b: RankItem) => a.position - b.position));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar Hall da Fama:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRanks();
  }, [slug]);

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#030303]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      <span className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Consultando Hall da Fama...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-24" style={{ "--primary": settings?.primaryColor || "#facb11" } as React.CSSProperties}>
      
      {/* HEADER RANKS */}
      <div className="p-8 max-w-5xl mx-auto w-full pt-16 md:pt-24 animate-in fade-in duration-700">
        <div className="text-center mb-16 relative">
          <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full mx-auto flex items-center justify-center mb-6 border border-[var(--primary)]/20 shadow-[0_0_30px_var(--primary)] shadow-[var(--primary)]/10">
             <Crown className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Hall da Fama</h2>
          <p className="text-zinc-400 font-medium italic text-sm md:text-base max-w-lg mx-auto">Os jogadores mais influentes e letais que moldaram a história e a economia da nossa cidade.</p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {ranks.length > 0 ? (
            ranks.map((player) => (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: player.position * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`relative overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-[36px] border transition-all hover:scale-[1.01] ${
                  player.position === 1 
                  ? 'bg-gradient-to-r from-[var(--primary)]/10 to-[#0a0a0a] border-[var(--primary)]/30 shadow-[0_10px_40px_rgba(250,203,17,0.1)]' 
                  : player.position === 2
                  ? 'bg-[#0a0a0a] border-zinc-400/30'
                  : player.position === 3
                  ? 'bg-[#0a0a0a] border-amber-700/30'
                  : 'bg-[#09090b] border-white/5 hover:border-white/10'
                }`}
              >
                {/* LINHA DE DESTAQUE PARA TOP 1 */}
                {player.position === 1 && (
                  <div className="absolute top-0 left-0 w-2 h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" />
                )}

                {/* POSIÇÃO E ÍCONE */}
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5 shadow-inner">
                  {player.position === 1 ? <Trophy className="text-[var(--primary)] w-8 h-8 drop-shadow-[0_0_10px_rgba(250,203,17,0.5)]" /> : 
                   player.position === 2 ? <Medal className="text-zinc-300 w-8 h-8 drop-shadow-[0_0_10px_rgba(212,212,216,0.3)]" /> : 
                   player.position === 3 ? <Medal className="text-amber-700 w-8 h-8 drop-shadow-[0_0_10px_rgba(180,83,9,0.3)]" /> : 
                   <span className="text-zinc-600 text-xl font-black italic">#{player.position}</span>}
                </div>

                {/* NICK E STATUS */}
                <div className="flex-1 text-center md:text-left min-w-0">
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter truncate">{player.nickname}</h3>
                  <div className="mt-2 flex justify-center md:justify-start">
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full inline-flex items-center gap-2 border ${
                      player.status.toUpperCase().includes('VIP') 
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30' 
                      : 'bg-black text-zinc-500 border-white/10'
                    }`}>
                      {player.status.toUpperCase().includes('VIP') && <Star className="w-3 h-3 fill-current" />}
                      {player.status}
                    </span>
                  </div>
                </div>

                {/* ESTATÍSTICAS */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center bg-black/40 p-4 rounded-3xl border border-white/5">
                    <Stat icon={<Star className="w-4 h-4 text-zinc-400" />} label="Nível" value={player.level} />
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <Stat icon={<Target className="text-red-500 w-4 h-4" />} label="Kills" value={player.kills} />
                    <div className="w-px h-8 bg-white/10 hidden sm:block" />
                    <Stat icon={<Wallet className="text-emerald-500 w-4 h-4" />} label="Carteira" value={player.wallet} isCurrency />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-[#0a0a0a] rounded-[40px] border border-dashed border-white/10 flex flex-col items-center">
              <Trophy className="w-16 h-16 text-zinc-800 mb-4" />
              <p className="text-zinc-500 font-black uppercase italic tracking-widest text-sm">Nenhum jogador lendário registrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, isCurrency = false }: { icon: React.ReactNode, label: string, value: string | number, isCurrency?: boolean }) {
    return (
        <div className="flex flex-col items-center sm:items-start min-w-[80px]">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase mb-1 tracking-[0.2em]">
                {icon} {label}
            </div>
            <span className="text-white font-black italic text-xl tracking-tighter">
              {isCurrency ? <span className="text-[11px] text-emerald-500 mr-1">R$</span> : null}
              {value}
            </span>
        </div>
    );
}