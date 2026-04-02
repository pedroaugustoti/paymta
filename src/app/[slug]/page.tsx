"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { 
  Users, Activity, ShieldCheck, ChevronRight, 
  Play, Loader2, Hammer, HardHat, Clock as ClockIcon,
  ShoppingBag, Target, Zap, Car, Map 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CityPortalHome() {
  const params = useParams();
  const slug = params.slug as string;

  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para armazenar os dados em tempo real do servidor MTA
  const [serverStatus, setServerStatus] = useState({
    online: 0,
    max: 0,
    ping: 0,
    isOnline: false
  });

  // ============================================================
  // 🛡️ REGRAS DOS HOOKS
  // ============================================================
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const spotlightMask = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
     mouseX.set(-1000);
     mouseY.set(-1000);
  }

  useEffect(() => {
    async function loadShopData() {
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`, {
          cache: 'no-store'
        });
        const data = await res.json();
        if (data) {
          setSettings(data);
          
          // Se tiver um IP cadastrado, busca os dados em tempo real
          if (data.serverIp) {
            fetchMtaStatus(data.serverIp);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar shop:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchMtaStatus(ip: string) {
      try {
        // Esta rota será criada no back-end para consultar o servidor via UDP
        const res = await fetch(`/api/shop/mta-status?ip=${ip}`);
        if(res.ok) {
           const statusData = await res.json();
           setServerStatus({
             online: statusData.players || 0,
             max: statusData.maxPlayers || 0,
             ping: statusData.ping || 0,
             isOnline: true
           });
        }
      } catch (error) {
        console.error("Falha ao buscar status do MTA:", error);
      }
    }

    if (slug) loadShopData();
  }, [slug]);

  // ============================================================
  // 🏁 RETURNS CONDICIONAIS
  // ============================================================
  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4 bg-[#030303] text-zinc-600 font-black uppercase italic text-[10px] tracking-[0.4em]">
      <Loader2 className="w-8 h-8 animate-spin text-white opacity-20" />
      Sincronizando Host...
    </div>
  );

  if (!settings) return null;

  const firstName = settings.serverName?.split(' ')[0]?.toUpperCase() || "CITY";

  if (settings.isMaintenance) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-6" style={{ "--primary": settings.primaryColor || "#facb11" } as any}>
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-[40px] flex items-center justify-center border border-[var(--primary)]/20 mx-auto">
            <Hammer className="w-10 h-10 text-[var(--primary)] animate-bounce" />
          </div>
          <h1 className="text-3xl font-black uppercase italic text-white leading-none">
            {settings.serverName} <br/> <span className="text-[var(--primary)]">Em Obras</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase italic tracking-widest leading-relaxed">
            Estamos aplicando melhorias técnicas. Voltamos logo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#030303] text-white font-sans overflow-x-hidden selection:bg-[var(--primary)] selection:text-black" style={{ "--primary": settings.primaryColor || "#facb11" } as any}>
      
      {/* HERO SECTION - MAIS ESCURA E CONTRASTADA */}
      {/* HERO SECTION - CONTRASTE EQUILIBRADO */}
      <section className="relative h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* IMAGEM DE FUNDO: Aumentei a opacidade para 30% para a imagem aparecer bem */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-all duration-1000"
          style={{ backgroundImage: `url(${settings.heroImageUrl || "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop"})` }} // Coloquei um wallpaper provisório caso o DB esteja vazio, só para você ver o efeito!
        ></div>
        
        {/* PELÍCULA ESCURA: Reduzi para 60% para não "engolir" o banner */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            {/* O drop-shadow continua aqui para destacar o INVICTUS */}
            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent uppercase italic pr-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              {settings.serverName}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto space-y-6"
          >
            <span className="text-[var(--primary)] font-black uppercase italic tracking-[0.5em] text-[10px] border border-[var(--primary)]/20 px-4 py-1 rounded-full bg-[var(--primary)]/10 backdrop-blur-md shadow-xl">
              {settings.slogan}
            </span>
            <p className="text-sm md:text-xl text-zinc-300 font-medium italic leading-relaxed px-4 drop-shadow-md">
              {settings.description}
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            {/* PROTOCOLO MTASA */}
            <a href={settings.serverIp ? `mtasa://${settings.serverIp}` : "#"} className="group">
              <Button 
                className="font-black px-14 py-9 rounded-3xl text-xl transition-all group-hover:scale-105 shadow-2xl border-none"
                style={{ backgroundColor: "var(--primary)", color: "#000", boxShadow: `0 20px 60px ${settings.primaryColor}40` }}
              >
                <Play className="w-6 h-6 mr-3 fill-current" /> JOGAR AGORA
              </Button>
            </a>
            
            <Link href={`/${slug}/loja`}>
              <Button variant="outline" className="border-white/10 bg-white/5 text-white font-black px-14 py-9 rounded-3xl text-xl backdrop-blur-xl hover:bg-white/10 transition-all shadow-2xl">
                <ShoppingBag className="w-6 h-6 mr-3" /> VER LOJA VIP
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATUS CARDS COM DADOS DINÂMICOS */}
      <section className="max-w-7xl mx-auto -mt-24 relative z-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard 
          icon={<Users style={{ color: "var(--primary)" }} />} 
          label="Cidadãos Online" 
          value={serverStatus.isOnline ? `${serverStatus.online}/${serverStatus.max}` : "Offline"} 
          sub="Status do Servidor" 
        />
        <StatusCard 
          icon={<Activity className="text-emerald-500" />} 
          label="Latência" 
          value={serverStatus.isOnline ? `${serverStatus.ping}ms` : "--"} 
          sub="Conexão com a Host" 
        />
        <StatusCard 
          icon={<ShieldCheck className="text-blue-500" />} 
          label="Segurança" 
          value="ATIVO" 
          sub="Anti-Cheat Protegido" 
        />
      </section>

      {/* DIFERENCIAIS */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">
              Performance <br/> <span style={{ color: "var(--primary)" }}>Incomparável.</span>
            </h2>
            <div className="space-y-10">
              <Feature icon={<Target />} title="Sistemas Próprios" desc="Economia e facções gerenciadas por scripts únicos." />
              <Feature icon={<Car />} title="Física Realista" desc="Handlings personalizados para cada veículo importado." />
            </div>
          </div>
          <div className="bg-[#0c0c0c] border border-white/5 p-12 rounded-[60px] text-center space-y-6 group hover:border-[var(--primary)]/20 transition-all duration-500">
             <Zap className="w-12 h-12 text-[var(--primary)] mx-auto fill-current group-hover:scale-110 transition-transform" />
             <h4 className="text-2xl font-black italic uppercase">FPS Otimizado</h4>
             <p className="text-sm text-zinc-500 font-medium italic">Desenvolvido para rodar liso em computadores modestos.</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARCA D'ÁGUA COLADA NO RODAPÉ
          ============================================================ */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-end justify-center w-full overflow-hidden cursor-default h-[14vw] min-h-[100px] mt-10"
      >
        <h2 className="text-[18vw] font-black uppercase italic leading-[0.75] tracking-tighter text-[#0a0a0a] m-0 select-none pointer-events-none translate-y-[20%]">
          {firstName} <span className="text-[3vw] align-top ml-2 italic font-black">TM</span>
        </h2>

        <motion.div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{
             WebkitMaskImage: spotlightMask,
             maskImage: spotlightMask
          }}
        >
           <h2 className="text-[18vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white/10 m-0 select-none translate-y-[20%] drop-shadow-xl">
             {firstName} <span className="text-[3vw] align-top ml-2 italic font-black">TM</span>
           </h2>
        </motion.div>
      </section>

    </div>
  );
}

// COMPONENTES AUXILIARES
function StatusCard({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
  return (
    <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[48px] shadow-3xl backdrop-blur-xl hover:border-[var(--primary)]/20 transition-all duration-500">
      <div className="flex items-center gap-4 mb-6 text-zinc-500 uppercase font-black text-[10px] tracking-widest italic">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner">{icon}</div>
        {label}
      </div>
      <p className="text-5xl font-black text-white italic tracking-tighter mb-2 leading-none truncate">{value}</p>
      <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest italic">{sub}</p>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="p-4 bg-white/5 rounded-2xl text-[var(--primary)] border border-white/5 group-hover:bg-[var(--primary)]/10 transition-colors duration-300">{icon}</div>
      <div>
        <h4 className="text-xl font-black italic uppercase text-white tracking-tight">{title}</h4>
        <p className="text-sm text-zinc-500 font-medium italic leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}