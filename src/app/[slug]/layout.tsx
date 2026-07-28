"use client";

import Link from "next/link";
import { 
  LogOut, ShieldCheck, CreditCard, 
  Landmark, Loader2, MessageSquare, 
  ChevronRight, ShieldAlert, Camera,
  Menu, X, Hammer 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ShopConfig {
  serverName?: string;
  navbarName?: string;
  footerName?: string;
  slogan?: string;
  logoUrl?: string;
  primaryColor?: string;
  isMaintenance?: boolean;
  discordUrl?: string;
  instagramUrl?: string;
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  
  const [settings, setSettings] = useState<ShopConfig | null>(null);
  const [error, setError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function loadConfigs() {
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (!res.ok) throw new Error();
        const data: ShopConfig = await res.json();
        setSettings(data);
      } catch {
        setError(true);
      }
    }
    if (slug) loadConfigs();
  }, [slug, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-6 text-white">
      <div className="w-20 h-20 bg-red-500/10 rounded-[32px] flex items-center justify-center border border-red-500/20 mb-6">
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-5xl font-black italic uppercase tracking-tighter">Cidade Offline</h1>
      <p className="font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500 mt-4 max-w-xs">
        O servidor <span className="text-red-500">{slug}</span> não foi encontrado no ecossistema PayMTA.
      </p>
      <Link href="/" className="mt-10 group">
        <Button variant="outline" className="border-white/10 bg-white/5 text-white font-black px-8 py-6 rounded-2xl flex items-center gap-2">
          VOLTAR AO HUB <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
        </Button>
      </Link>
    </div>
  );

  if (!settings) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-800" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.5em]">Sincronizando {slug}...</span>
    </div>
  );

  if (settings.isMaintenance) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden selection:bg-[var(--primary)] selection:text-black"
        style={{ "--primary": settings.primaryColor || "#facb11" } as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-[#030303] z-0" />
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 50% -20%, var(--primary) 0%, transparent 60%)` }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl w-full"
        >
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />

            <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-[32px] flex items-center justify-center relative z-10 shadow-inner mb-8">
              <Hammer className="w-10 h-10 text-[var(--primary)]" />
            </div>

            <div className="space-y-6 w-full">
              <div className="inline-flex items-center justify-center gap-3 px-5 py-2.5 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full mx-auto">
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
                <span className="text-[var(--primary)] text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Protocolo de Manutenção</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase italic text-white leading-tight tracking-tighter">
                {settings.navbarName || settings.serverName} <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Em Obras</span>
              </h1>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-md mx-auto">
                Nossa infraestrutura está passando por um upgrade programado para melhorar a performance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const navLinks = [
    { label: "Início", href: `/${slug}` },
    { label: "Regras", href: `/${slug}/regras` },
    { label: "Ranks", href: `/${slug}/ranks` },
    { label: "Loja VIP", href: `/${slug}/loja` },
  ];

  const displayFooterName = settings.footerName || settings.serverName;
  const serverDisplayName = settings.navbarName || settings.serverName || "CIDADE";

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#030303] text-white font-sans selection:bg-[var(--primary)] selection:text-black"
      style={{ "--primary": settings.primaryColor || "#facb11" } as React.CSSProperties}
    >
      
      {/* NAVBAR COM TRANSIÇÃO LENTA, SUAVE E ELEGANTE (DURATION-700) */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out ${
        scrolled ? "px-4 pt-3 flex justify-center" : "px-0 pt-0 w-full"
      }`}>
        <div className={`flex items-center justify-between transition-all duration-700 ease-in-out ${
          scrolled 
            ? "w-full max-w-7xl bg-[#030303]/90 backdrop-blur-xl border border-white/15 rounded-2xl px-8 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            : "w-full bg-[#030303] border-b border-white/5 px-8 py-5 rounded-none shadow-none"
        }`}>
          
          {/* LOGO + NOME DA CIDADE GERENCIADO PELO DASHBOARD */}
          <Link href={`/${slug}`} className="flex items-center gap-3.5 group shrink-0">
            {settings.logoUrl && settings.logoUrl.trim() !== "" ? (
              <div className="relative h-10 w-32 md:w-40 flex items-center">
                <Image 
                  src={settings.logoUrl} 
                  alt="Logo do Servidor" 
                  fill
                  sizes="160px"
                  unoptimized
                  className="object-contain object-left drop-shadow-xl group-hover:scale-105 transition-all duration-300" 
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all shadow-2xl border border-white/10 bg-[var(--primary)] group-hover:scale-105 duration-300">
                <span className="font-black text-black text-base uppercase italic">
                  {serverDisplayName.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-black text-white tracking-tighter leading-none uppercase italic group-hover:text-[var(--primary)] transition-colors">
                {serverDisplayName}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] text-zinc-500 font-black tracking-widest uppercase italic">Verificado</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`px-4 py-2 text-[11px] font-black uppercase italic tracking-widest transition-all rounded-xl border border-transparent ${
                    isActive 
                    ? "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <div className="hidden sm:flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-xl border border-white/10">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="Avatar" width={28} height={28} className="rounded-lg border border-[var(--primary)]/30" />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800" />
                )}
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white leading-none truncate max-w-[80px] uppercase italic">{session.user?.name}</span>
                    <button onClick={() => signOut()} className="text-[8px] font-bold text-zinc-500 hover:text-red-500 transition-colors uppercase text-left">Sair</button>
                </div>
              </div>
            ) : (
              <Button onClick={() => signIn('discord')} className="hidden sm:flex bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-2.5 px-4 rounded-xl transition-all items-center gap-2 text-[10px] uppercase italic shadow-lg shadow-[#5865F2]/20">
                Entrar
              </Button>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#030303]/95 backdrop-blur-2xl pt-28 px-6 lg:hidden flex flex-col justify-between pb-12"
          >
            <nav className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-5 py-4 text-sm font-black uppercase italic tracking-widest transition-all rounded-2xl border ${
                      isActive 
                      ? "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20" 
                      : "text-zinc-300 hover:text-white hover:bg-white/5 border-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3">
              {session ? (
                <button 
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }} 
                  className="w-full py-4 text-xs font-black uppercase italic tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Desconectar Conta
                </button>
              ) : (
                <button 
                  onClick={() => { signIn('discord'); setIsMobileMenuOpen(false); }} 
                  className="w-full py-4 text-xs font-black uppercase italic tracking-widest text-white bg-[#5865F2] rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                >
                  Entrar com Discord
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 flex-1 pt-20">{children}</main>

      <footer className="border-t border-white/5 bg-zinc-950/40 backdrop-blur-md pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            <div className="md:col-span-4 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black uppercase tracking-tighter italic text-white">
                  {displayFooterName}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase italic tracking-widest max-w-xs">
                {settings.slogan || "Elevando o nível do seu Roleplay com tecnologia PayMTA."}
              </p>
              <div className="flex gap-4">
                <SocialLink href={settings.discordUrl} icon={<MessageSquare className="w-4 h-4" />} color="hover:bg-[#5865F2]" />
                <SocialLink href={settings.instagramUrl} icon={<Camera className="w-4 h-4" />} color="hover:bg-pink-600" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-4 italic">Portal</h4>
              <ul className="space-y-4">
                <li><FooterLink href={`/${slug}`}>Home</FooterLink></li>
                <li><FooterLink href={`/${slug}/loja`}>Loja VIP</FooterLink></li>
                <li><FooterLink href={`/${slug}/regras`}>Regras</FooterLink></li>
                <li><FooterLink href={`/${slug}/ranks`}>Ranks</FooterLink></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-6">
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-4 italic">Legal</h4>
              <ul className="space-y-4">
                <li><FooterLink href={`/${slug}/termos`}>Termos de Uso</FooterLink></li>
                <li><FooterLink href={`/${slug}/privacidade`}>Privacidade</FooterLink></li>
                <li><FooterLink href={`/${slug}/reembolso`}>Reembolso</FooterLink></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-8 bg-white/[0.02] p-8 rounded-[40px] border border-white/5">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest italic">Métodos Aceitos</p>
                <div className="flex flex-wrap gap-3">
                  <Badge icon={<Landmark className="w-3 h-3" />} text="PIX" />
                  <Badge icon={<CreditCard className="w-3 h-3" />} text="CARTÃO" />
                </div>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-[11px] font-black uppercase italic text-white tracking-tight leading-none">Pagamento Seguro</h5>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1.5">Transações blindadas via Mercado Pago.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] text-center md:text-left italic leading-relaxed">
              © {new Date().getFullYear()} {displayFooterName}. TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon, color }: { href?: string; icon: ReactNode; color: string }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 transition-all border border-white/5 ${color} hover:text-white hover:-translate-y-1 shadow-lg`}>
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[11px] font-bold text-zinc-500 hover:text-[var(--primary)] transition-all flex items-center gap-2 group italic uppercase tracking-wider">
      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      {children}
    </Link>
  );
}

function Badge({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="px-4 py-2 bg-black border border-white/10 rounded-xl text-[9px] font-black text-zinc-400 flex items-center gap-2.5 uppercase tracking-[0.2em] shadow-inner">
      <span className="text-zinc-600">{icon}</span> {text}
    </div>
  );
}