"use client";

import Link from "next/link";
import { 
  LogOut, Disc as Discord, ShieldCheck, CreditCard, 
  Landmark, Loader2, Globe, Zap, MessageSquare, 
  ChevronRight, ExternalLink, ShieldAlert, Camera,
  Menu, X, Hammer // <-- HAMMER ADICIONADO AQUI
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  
  const [settings, setSettings] = useState<any>(null);
  const [error, setError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadConfigs() {
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(true);
      }
    }
    if (slug) loadConfigs();
  }, [slug, pathname]);

  // 1. TELA DE 404 (NÃO ENCONTRADO)
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

  // 2. TELA DE LOADING
  if (!settings) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-800" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-[0.5em]">Sincronizando {slug}...</span>
    </div>
  );

// =========================================================================
  // 3. TELA DE MANUTENÇÃO PREMIUM: BLOQUEIO TOTAL E REFINADO
  // =========================================================================
  if (settings.isMaintenance) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[var(--primary)] selection:text-black"
        style={{ 
          "--primary": settings.primaryColor || "#facb11",
          // FUNDO: Preto profundo -> Gradiente Radial para o centro -> Grade Geométrica sutil
          backgroundColor: "#030303",
          backgroundImage: `
            radial-gradient(circle at center, ${settings.primaryColor || "#facb11"}08 0%, rgba(3,3,3,0) 70%),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40H40z'/%3E%3C/g%3E%3C/svg%3E")
          `
        } as React.CSSProperties}
      >
        {/* Camada de brilho de fundo (Glow Atmosférico) */}
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at center, ${settings.primaryColor || "#facb11"}15 0%, rgba(3,3,3,0) 50%)` }} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Ease Out Expo (Premium)
          className="relative z-10 max-w-xl w-full text-center space-y-10"
        >
          {/* CONTAINER DO ÍCONE COM EFEITO NEON PULSANTE */}
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center group">
            {/* Brilho Externo Pulsante */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[48px] blur-2xl opacity-60" 
              style={{ backgroundColor: `${settings.primaryColor || "#facb11"}30` }}
            />
            {/* Container Interno */}
            <div className="relative w-full h-full bg-zinc-950 rounded-[48px] flex items-center justify-center border-2 border-white/5 shadow-2xl backdrop-blur-sm group-hover:border-[var(--primary)]/30 transition-colors duration-500 overflow-hidden">
               {/* Reflexo de luz na borda superior */}
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <Hammer className="w-14 h-14 text-[var(--primary)] group-hover:rotate-[-10deg] transition-transform duration-300" />
            </div>
          </div>

          {/* BLOCO DE TEXTO REFINADO */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic text-white leading-none tracking-tighter break-words">
              {settings.navbarName || settings.serverName} <br/> 
              {/* Texto com gradiente sutil na cor primária */}
              <span 
                className="bg-gradient-to-b from-[var(--primary)] to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,203,17,0.3)]"
              >
                Em Obras
              </span>
            </h1>
            
            {/* Tag de Status Operacional */}
            <div className="flex items-center gap-3 justify-center px-4 py-1.5 bg-black/50 border border-white/5 rounded-full inline-block">
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
                <p className="text-zinc-500 text-[9px] md:text-[10px] font-black uppercase italic tracking-[0.3em]">
                  Atualização Técnica em Andamento
                </p>
            </div>

            <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto pt-4">
              {/* Mudamos de uppercase para normal para melhorar a leitura, mas mantivemos o itálico se preferir */}
              Estamos aplicando melhorias na infraestrutura do portal para garantir mais velocidade e segurança nas suas transações. Voltamos em breve!
            </p>
          </div>

          {/* BOTÃO DE SUPORTE (Para o usuário não se sentir perdido) */}
          {settings.discordUrl && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href={settings.discordUrl} target="_blank">
                <Button variant="outline" className="border-white/5 bg-white/5 text-zinc-400 hover:bg-[#5865F2]/10 hover:text-[#5865F2] hover:border-[#5865F2]/20 font-bold px-8 py-6 rounded-2xl text-xs gap-2 transition-all">
                   <Discord className="w-4 h-4" /> Central de Suporte
                </Button>
              </a>
            </motion.div>
          )}

        </motion.div>

        {/* Rodapé técnico sutil */}
        <footer className="absolute bottom-6 left-6 z-10 hidden sm:block">
           <p className="text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">PayMTA SaaS Protocol — MNT Mode ACTIVE</p>
        </footer>
      </div>
    );
  }
  
  // =========================================================================

  const navLinks = [
    { label: "Início", href: `/${slug}` },
    { label: "Regras", href: `/${slug}/regras` },
    { label: "Ranks", href: `/${slug}/ranks` },
    { label: "Loja VIP", href: `/${slug}/loja` },
  ];

  const displayFooterName = settings.footerName || settings.serverName;

  // 4. LAYOUT NORMAL (Se não estiver em manutenção)
  return (
    <div 
      className="min-h-screen flex flex-col bg-[#030303] text-white font-sans selection:bg-[var(--primary)] selection:text-black"
      style={{ "--primary": settings.primaryColor || "#facb11" } as React.CSSProperties}
    >
      {/* HEADER DINÂMICO COM GLASSMORPHISM */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* BRANDING */}
          <Link href={`/${slug}`} className="flex items-center gap-4 group shrink-0">
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt="Logo do Servidor" 
                className="h-10 md:h-12 w-auto max-w-[120px] md:max-w-[150px] object-contain drop-shadow-xl group-hover:scale-105 transition-all duration-300" 
              />
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center overflow-hidden transition-all shadow-2xl border border-white/10 bg-[var(--primary)] group-hover:scale-105 duration-300">
                <span className="font-black text-black text-lg md:text-xl uppercase italic">
                  {(settings.navbarName || settings.serverName || "B").charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-white tracking-tighter leading-none uppercase italic group-hover:text-[var(--primary)] transition-colors">
                {settings.navbarName || settings.serverName}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] md:text-[9px] text-zinc-500 font-black tracking-widest uppercase italic hidden sm:block">Servidor Verificado</span>
              </div>
            </div>
          </Link>

          {/* NAV CENTRAL */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`px-5 py-2 text-[11px] font-black uppercase italic tracking-widest transition-all rounded-xl border border-transparent ${
                    isActive 
                    ? "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* USER ACTIONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <Link href={settings.discordUrl || "#"} target="_blank" className="hidden md:flex p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-[#5865F2]/20 hover:text-[#5865F2] transition-all group">
              <Discord className="w-4 h-4" />
            </Link>

            {session ? (
              <div className="hidden sm:flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-2xl border border-white/10">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-xl border border-[var(--primary)]/30" />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-zinc-800" />
                )}
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white leading-none truncate max-w-[80px] uppercase italic">{session.user?.name}</span>
                    <button onClick={() => signOut()} className="text-[9px] font-bold text-zinc-600 hover:text-red-500 transition-colors uppercase text-left">Sair</button>
                </div>
              </div>
            ) : (
              <Button onClick={() => signIn('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-5 md:py-6 rounded-2xl transition-all flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] px-4 md:px-6 shadow-xl shadow-[#5865F2]/10 uppercase italic">
                <Discord className="w-4 h-4 fill-current" /> <span className="hidden sm:inline">Entrar</span>
              </Button>
            )}

            {/* BOTÃO HAMBÚRGUER */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE EXPANSÍVEL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 z-[90] p-6 flex flex-col gap-2 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-5 py-4 text-xs font-black uppercase italic tracking-widest transition-all rounded-xl border ${
                    isActive 
                    ? "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {session ? (
              <button 
                onClick={() => { signOut(); setIsMobileMenuOpen(false); }} 
                className="mt-4 px-5 py-4 text-xs font-black uppercase italic tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-left flex items-center gap-3"
              >
                <LogOut className="w-4 h-4" /> Desconectar Conta
              </button>
            ) : (
              <button 
                onClick={() => { signIn('discord'); setIsMobileMenuOpen(false); }} 
                className="mt-4 px-5 py-4 text-xs font-black uppercase italic tracking-widest text-white bg-[#5865F2] border border-[#5865F2] rounded-xl text-left flex items-center gap-3 sm:hidden"
              >
                <Discord className="w-4 h-4" /> Entrar com Discord
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* FOOTER DETALHADO */}
      <footer className="border-t border-white/5 bg-zinc-950/40 backdrop-blur-md pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* BRANDING */}
            <div className="md:col-span-4 space-y-8">
              <div className="flex items-center gap-4">
                {settings.logoUrl ? (
                  <img 
                    src={settings.logoUrl} 
                    alt="Logo" 
                    className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300" 
                  />
                ) : (
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-white text-sm border border-white/10 uppercase italic shadow-inner">
                    {(displayFooterName || "B").charAt(0)}
                  </div>
                )}
                
                <span className="text-2xl font-black uppercase tracking-tighter italic text-white break-words">
                  {displayFooterName}
                </span>
              </div>
              
              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase italic tracking-widest max-w-xs">
                {settings.slogan || "Elevando o nível do seu Roleplay com tecnologia PayMTA."}
              </p>
              <div className="flex gap-4">
                <SocialLink href={settings.discordUrl} icon={<Discord className="w-4 h-4" />} color="hover:bg-[#5865F2]" />
                <SocialLink href={settings.instagramUrl} icon={<Camera className="w-4 h-4" />} color="hover:bg-pink-600" />
                <SocialLink href="#" icon={<MessageSquare className="w-4 h-4" />} color="hover:bg-emerald-600" />
              </div>
            </div>

            {/* PORTAL LINKS */}
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-4 italic">Portal</h4>
              <ul className="space-y-4">
                <li><FooterLink href={`/${slug}`}>Home</FooterLink></li>
                <li><FooterLink href={`/${slug}/loja`}>Loja VIP</FooterLink></li>
                <li><FooterLink href={`/${slug}/regras`}>Regras</FooterLink></li>
                <li><FooterLink href={`/${slug}/ranks`}>Ranks</FooterLink></li>
              </ul>
            </div>

            {/* LEGAL LINKS */}
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-4 italic">Legal</h4>
              <ul className="space-y-4">
                <li><FooterLink href={`/${slug}/termos`}>Termos de Uso</FooterLink></li>
                <li><FooterLink href={`/${slug}/privacidade`}>Privacidade</FooterLink></li>
                <li><FooterLink href={`/${slug}/reembolso`}>Reembolso</FooterLink></li>
              </ul>
            </div>

            {/* PAGAMENTO & SEGURANÇA */}
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

          {/* COPYRIGHT & TECH STACK */}
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

// COMPONENTES AUXILIARES
function SocialLink({ href, icon, color }: any) {
  return (
    <a href={href} target="_blank" className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 transition-all border border-white/5 ${color} hover:text-white hover:-translate-y-1 shadow-lg`}>
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: any) {
  return (
    <Link href={href} className="text-[11px] font-bold text-zinc-500 hover:text-[var(--primary)] transition-all flex items-center gap-2 group italic uppercase tracking-wider">
      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      {children}
    </Link>
  );
}

function Badge({ icon, text }: any) {
  return (
    <div className="px-4 py-2 bg-black border border-white/10 rounded-xl text-[9px] font-black text-zinc-400 flex items-center gap-2.5 uppercase tracking-[0.2em] shadow-inner">
      <span className="text-zinc-600">{icon}</span> {text}
    </div>
  );
}