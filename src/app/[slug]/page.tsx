"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { 
  Users, Activity, ShieldCheck, 
  Play, Loader2, 
  ShoppingBag, Target, Zap, Car, Check, Copy, ExternalLink, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";
import { useParams } from "next/navigation";

interface ShopSettings {
  slug?: string;
  serverName?: string;
  navbarName?: string;
  slogan?: string;
  description?: string;
  heroImageUrl?: string;
  serverIp?: string;
  primaryColor?: string;
  error?: boolean | string; // <-- CORREÇÃO: Avisando ao TS que pode vir um erro da API
}

export default function CityPortalHome() {
  const params = useParams();
  const slug = params.slug as string;

  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const [serverStatus, setServerStatus] = useState({
    online: 0,
    max: 0,
    ping: 0,
    isOnline: false
  });

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

  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    async function loadShopData() {
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`, {
          cache: 'no-store'
        });
        const data: ShopSettings = await res.json();
        if (data && !data.error) {
          setSettings(data);
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

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#030303] text-zinc-600 font-black uppercase italic text-[10px] tracking-[0.4em]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      Sincronizando Host...
    </div>
  );

  if (!settings) return null;

  const firstName = settings.slug?.replace(/-/g, ' ').toUpperCase() || slug?.replace(/-/g, ' ').toUpperCase() || "CITY";
  const primaryColor = settings.primaryColor || "#facb11";

  return (
    <div 
      className="w-full bg-[#030303] text-white font-sans overflow-x-hidden selection:bg-[var(--primary)] selection:text-black" 
      style={{ "--primary": primaryColor } as React.CSSProperties}
    >
      
      {/* 1. HERO SECTION - FLUIDA E IMERSIVA SEM CORTES */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden border-b border-white/5 bg-[#050505]">
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 scale-105 transition-all duration-1000 pointer-events-none"
          style={{ 
            backgroundImage: `url(${settings.heroImageUrl || ""})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-5xl flex flex-col items-center">
          
          {settings.slogan && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <span 
                className="inline-flex items-center gap-2 text-[var(--primary)] font-black uppercase italic tracking-[0.3em] text-[10px] border border-[var(--primary)]/30 px-4 py-2 rounded-full bg-[var(--primary)]/10 backdrop-blur-md mb-6"
                style={{ boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 20%, transparent)" }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                {settings.slogan}
              </span>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-5xl md:text-8xl font-black leading-none bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase italic drop-shadow-2xl tracking-tighter px-4 pb-2">
              {settings.serverName || "MTA ROLEPLAY"}
            </h1>
          </motion.div>

          {settings.description && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-xs md:text-sm text-zinc-400 font-medium italic leading-relaxed max-w-2xl mx-auto mt-4 px-6">
                {settings.description}
              </p>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md"
          >
            <a href={settings.serverIp ? `mtasa://${settings.serverIp}` : "#"} className="w-full sm:w-auto group">
              <Button 
                className="w-full sm:w-auto font-black px-10 py-6 rounded-2xl text-sm md:text-base transition-all group-hover:scale-105 border-none flex items-center justify-center gap-3 uppercase italic tracking-widest"
                style={{ backgroundColor: "var(--primary)", color: "#000", boxShadow: "0 10px 30px color-mix(in srgb, var(--primary) 30%, transparent)" }}
              >
                <Play className="w-5 h-5 fill-current" /> JOGAR AGORA
              </Button>
            </a>
            
            <Link href={`/${slug}/loja`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-white/10 bg-white/5 text-white font-black px-8 py-6 rounded-2xl text-sm md:text-base backdrop-blur-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase italic tracking-widest">
                <ShoppingBag className="w-5 h-5 text-[var(--primary)]" /> LOJA VIP
              </Button>
            </Link>
          </motion.div>

          {settings.serverIp && (
            <div 
              onClick={() => handleCopyIp(settings.serverIp || "")}
              className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-black/60 border border-white/10 rounded-xl cursor-pointer hover:border-[var(--primary)]/40 transition-all group shadow-inner"
            >
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest italic">IP:</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[var(--primary)] transition-colors">{settings.serverIp}</span>
              <div className="pl-2 border-l border-white/10 text-zinc-400 group-hover:text-white flex items-center gap-1.5 text-[10px] uppercase font-black italic transition-colors">
                {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> <span className="text-emerald-400">Copiado!</span></> : <><Copy className="w-3.5 h-3.5" /> <span>Copiar</span></>}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 2. STATUS CARDS */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <StatusCard 
          icon={<Users className="text-[var(--primary)]" />} 
          label="Cidadãos Online" 
          value={serverStatus.isOnline ? `${serverStatus.online} / ${serverStatus.max}` : "Online"} 
          sub="Servidor Ativo na Base" 
        />
        <StatusCard 
          icon={<Activity className="text-emerald-400" />} 
          label="Latência Média" 
          value={serverStatus.isOnline ? `${serverStatus.ping} ms` : "15 ms"} 
          sub="Conexão Otimizada" 
        />
        <StatusCard 
          icon={<ShieldCheck className="text-blue-400" />} 
          label="Sistema de Segurança" 
          value="PROTEGIDO" 
          sub="Anti-Cheat Avançado" 
        />
      </section>

      {/* 3. BANNER DE CONVERSÃO RÁPIDA PARA A LOJA */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[var(--primary)]/30 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: "var(--primary)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none opacity-50" />
          
          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-inner">
              <Sparkles className="w-3 h-3" /> Vantagens Exclusivas
            </div>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white">
              Quer acelerar sua evolução in-game?
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm font-medium italic leading-relaxed">
              Adquira pacotes de VIP, veículos exclusivos e coins diretamente na nossa loja oficial com entrega 100% automatizada via PIX.
            </p>
          </div>

          <Link href={`/${slug}/loja`} className="relative z-10 shrink-0 w-full md:w-auto">
            <Button 
              className="w-full bg-[var(--primary)] hover:brightness-110 text-black font-black px-8 py-7 rounded-2xl text-xs uppercase italic tracking-widest transition-all active:scale-95 border-none"
              style={{ boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              ACESSAR LOJA VIP <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. DIFERENCIAIS DA CIDADE */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] italic">Experiência Única</span>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
            Por que jogar na <span className="text-[var(--primary)]">{settings.serverName || "cidade"}?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Target className="w-6 h-6 text-[var(--primary)]" />} 
            title="Economia Balanceada" 
            desc="Sistemas próprios de empregos, facções e desmanches estruturados para proporcionar um Roleplay dinâmico e justo." 
          />
          <FeatureCard 
            icon={<Car className="w-6 h-6 text-[var(--primary)]" />} 
            title="Veículos Importados" 
            desc="Centenas de carros customizados com handling realista, som imersivo e mecânica otimizada para zero travamentos." 
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-[var(--primary)]" />} 
            title="Staff Ativa 24/7" 
            desc="Equipe de moderação e suporte altamente capacitada para garantir uma convivência saudável e livre de infrações." 
          />
        </div>
      </section>

      {/* 5. MARCA D'ÁGUA COLADA NO RODAPÉ */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-end justify-center w-full overflow-hidden cursor-default h-[14vw] min-h-[100px] mt-10"
      >
        <h2 className="text-[18vw] font-black uppercase italic leading-[0.75] tracking-tighter text-[#0a0a0a] m-0 select-none pointer-events-none translate-y-[20%]">
          {firstName} <span className="text-[3vw] align-top ml-2 italic font-black">T M</span>
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
function StatusCard({ icon, label, value, sub }: { icon: ReactNode, label: string, value: string, sub: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[36px] shadow-lg hover:border-[var(--primary)]/30 transition-all duration-500 group flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-5 text-zinc-500 uppercase font-black text-[10px] tracking-widest italic">
        <div className="w-12 h-12 bg-[#050505] border border-white/5 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">{icon}</div>
        {label}
      </div>
      <p className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-2 leading-none truncate group-hover:text-[var(--primary)] transition-colors">{value}</p>
      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest italic">{sub}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#050505] border border-white/5 p-8 rounded-[36px] group hover:border-[var(--primary)]/30 transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-[0_10px_30px_color-mix(in_srgb,_var(--primary)_5%,_transparent)] hover:-translate-y-1">
      <div>
        <div className="w-14 h-14 bg-[#0a0a0a] border border-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          {icon}
        </div>
        <h4 className="text-2xl font-black italic uppercase text-white tracking-tight mb-3 group-hover:text-[var(--primary)] transition-colors">{title}</h4>
        <p className="text-sm text-zinc-400 font-medium italic leading-relaxed">{desc}</p>
      </div>
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] italic">
        <span>Conheça o servidor</span>
      </div>
    </div>
  );
}