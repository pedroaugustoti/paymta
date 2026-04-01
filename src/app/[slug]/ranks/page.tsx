"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Target, Wallet, Star, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function RanksPage() {
  const [ranks, setRanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // BUSCA OS RANKS REAIS DO BANCO
  useEffect(() => {
    async function loadRanks() {
      try {
        const res = await fetch("/api/shop/config");
        const data = await res.json();
        
        if (data?.ranks) {
          setRanks(data.ranks);
        }
      } catch (error) {
        console.error("Erro ao carregar Hall da Fama:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRanks();
  }, []);

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center text-zinc-500 font-black uppercase italic tracking-widest">
      <Loader2 className="w-6 h-6 animate-spin mr-3 text-yellow-500" /> Consultando Hall da Fama...
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto w-full pt-16 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Hall da Fama</h2>
        <p className="text-zinc-500 font-medium italic">Os jogadores que moldaram a história da nossa cidade.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ranks.length > 0 ? (
          ranks.map((player) => (
            <motion.div 
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: player.position * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-[32px] border transition-all ${
                player.position === 1 
                ? 'bg-yellow-400/5 border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.05)]' 
                : 'bg-zinc-950/50 border-white/5'
              }`}
            >
              {/* POSIÇÃO E ÍCONE */}
              <div className="w-12 h-12 flex items-center justify-center font-black text-2xl shrink-0">
                {player.position === 1 ? <Trophy className="text-yellow-400 w-9 h-9 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" /> : 
                 player.position === 2 ? <Medal className="text-zinc-400 w-8 h-8" /> : 
                 player.position === 3 ? <Medal className="text-amber-700 w-8 h-8" /> : 
                 <span className="text-zinc-700 text-xl font-black italic">#{player.position}</span>}
              </div>

              {/* NICK E STATUS */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{player.nickname}</h3>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  player.status.includes('VIP') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-zinc-800 text-zinc-400 border border-white/5'
                }`}>
                  {player.status}
                </span>
              </div>

              {/* ESTATÍSTICAS */}
              <div className="flex flex-wrap justify-center gap-8 items-center md:pr-4">
                  <Stat icon={<Star className="w-3 h-3" />} label="Nível" value={player.level} />
                  <Stat icon={<Target className="text-red-500 w-3 h-3" />} label="Kills" value={player.kills} />
                  <Stat icon={<Wallet className="text-emerald-500 w-3 h-3" />} label="Dinheiro" value={player.wallet} />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[32px] border border-dashed border-white/10 text-zinc-600 font-bold uppercase italic">
            Nenhum jogador lendário registrado ainda.
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: any, label: string, value: any }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[9px] font-black uppercase mb-1 tracking-widest">
                {icon} {label}
            </div>
            <span className="text-white font-black italic text-lg tracking-tighter">{value}</span>
        </div>
    );
}