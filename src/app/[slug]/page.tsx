"use client";

import { motion } from "framer-motion";
import { Users, Activity, ShieldCheck, ChevronRight, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importante para o SaaS

export default function CityPortalHome() {
  const params = useParams();
  const slug = params.slug as string; // Captura o nome da cidade da URL

  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      try {
        // Agora buscamos as infos específicas desse SLUG
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        const data = await res.json();
        
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Shop:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadShopData();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 italic font-black uppercase tracking-widest">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
        Sincronizando com a host...
      </div>
    );
  }

  // Fallback caso a cidade não exista (opcional, já que o layout trata isso)
  if (!settings) return null;

  return (
    <div className="w-full" style={{ "--primary": settings.primaryColor || "#facb11" } as any}>
      
      {/* HERO SECTION - DINÂMICO POR CIDADE */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url(${settings.heroImageUrl || "https://images.unsplash.com/photo-1514565131-fce0801e5785"})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent uppercase italic"
          >
            {settings.serverName}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-zinc-400 font-black uppercase italic max-w-2xl mx-auto mb-10 leading-relaxed tracking-widest"
          >
            {settings.slogan}
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="font-black px-10 py-8 rounded-2xl text-xl transition-all hover:scale-105 group border-none"
              style={{ backgroundColor: "var(--primary)", color: "#000", boxShadow: `0 0 40px ${settings.primaryColor}44` }}
            >
              <Play className="w-6 h-6 mr-2 fill-current" /> JOGAR AGORA
            </Button>
            {/* LINK DINÂMICO: Usa o slug da cidade */}
            <Link href={`/${slug}/loja`}>
                <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-8 rounded-2xl text-xl">
                    VER LOJA VIP
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATUS CARDS */}
      <section className="max-w-7xl mx-auto -mt-16 relative z-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatusCard icon={<Users style={{ color: "var(--primary)" }} />} label="Jogadores Online" value="124/200" sub="Servidor Estável" />
            <StatusCard icon={<Activity className="text-emerald-400" />} label="Uptime do Servidor" value="99.9%" sub="Ping Médio: 15ms" />
            <StatusCard icon={<ShieldCheck className="text-blue-400" />} label="Staff Ativa" value="6 Admins" sub="Suporte via Discord" />
        </div>
      </section>

      {/* CHAMADA LOJA DINÂMICA */}
      <section className="max-w-7xl mx-auto py-32 px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                  <h2 className="text-5xl font-black leading-tight tracking-tighter uppercase italic">
                    Apoie a <span style={{ color: "var(--primary)" }}>{settings.serverName}</span> e ganhe benefícios.
                  </h2>
                  <p className="text-lg text-zinc-400 font-medium italic uppercase tracking-tight">Ao adquirir um pacote VIP, você ajuda a manter a nossa host online e ganha acesso a recursos únicos.</p>
                  <Link href={`/${slug}/loja`}>
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-6 px-8 rounded-xl flex items-center gap-2 group">
                        Acessar a Loja VIP <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="h-48 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col justify-end group hover:border-[var(--primary)]/30 transition-all">
                      <span className="text-[10px] font-black uppercase mb-2 tracking-widest" style={{ color: "var(--primary)" }}>Populares</span>
                      <p className="font-black text-xl text-white italic uppercase">Carros Importados</p>
                  </div>
                  <div className="h-48 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col justify-end translate-y-8 group hover:border-cyan-500/30 transition-all">
                      <span className="text-[10px] font-black text-cyan-500 uppercase mb-2 tracking-widest">Exclusivo</span>
                      <p className="font-black text-xl text-white italic uppercase">Tag Diamante</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}

function StatusCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
    return (
        <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl transition-all hover:border-[var(--primary)]/20 group">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-4xl font-black text-white mb-1 italic tracking-tighter">{value}</p>
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{sub}</p>
        </div>
    );
}