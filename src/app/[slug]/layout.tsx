"use client";

import Link from "next/link";
import { LogOut, Disc as Discord, ShieldCheck, CreditCard, Landmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params.slug as string;
  
  const [settings, setSettings] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadConfigs() {
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(true);
      }
    }
    if (slug) loadConfigs();
  }, [slug]);

  if (error) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500">
      <h1 className="text-4xl font-black italic uppercase">404</h1>
      <p className="font-bold uppercase text-xs tracking-widest mt-2">Cidade não encontrada no PayMTA</p>
      <Link href="/" className="mt-8 text-yellow-500 font-black uppercase text-[10px] border border-yellow-500/20 px-6 py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">Voltar ao Início</Link>
    </div>
  );

  if (!settings) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center text-zinc-500 font-black uppercase italic tracking-tighter">
      <Loader2 className="w-6 h-6 animate-spin mr-3 text-yellow-500" /> Sincronizando {slug}...
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#030303] text-white font-sans selection:bg-[var(--primary)] selection:text-black"
      style={{ "--primary": settings.primaryColor || "#facb11" } as React.CSSProperties}
    >
      {/* HEADER DINÂMICO */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${slug}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all shadow-lg border border-white/5 bg-[var(--primary)]">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="font-black text-black text-lg uppercase">
                  {(settings.navbarName || settings.serverName || "B").charAt(0)}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight leading-none uppercase">
                {settings.navbarName || settings.serverName}
              </span>
              <span className="text-[10px] text-[var(--primary)] font-bold tracking-widest uppercase">Servidor Oficial</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <Link href={`/${slug}`} className="hover:text-[var(--primary)] transition-colors">Início</Link>
            <Link href={`/${slug}/regras`} className="hover:text-[var(--primary)] transition-colors">Regras</Link>
            <Link href={`/${slug}/ranks`} className="hover:text-[var(--primary)] transition-colors">Ranks</Link>
            <Link href={`/${slug}/loja`} className="hover:text-[var(--primary)] transition-colors">Loja VIP</Link>
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 bg-white/5 p-1 pr-3 rounded-full border border-white/10 group">
                {session.user?.image && <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full border border-[var(--primary)]/30" />}
                <span className="text-xs font-bold text-white">{session.user?.name}</span>
                <button onClick={() => signOut()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <Button onClick={() => signIn('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-5 rounded-xl transition-all flex items-center gap-2.5 text-xs px-5">
                <Discord className="w-4 h-4" /> Entrar
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      {/* FOOTER DINÂMICO */}
      <footer className="mt-20 border-t border-white/5 bg-zinc-950/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center font-black text-white text-xs border border-white/10 uppercase italic">
                  {(settings.footerName || "B").charAt(0)}
                </div>
                <span className="text-xl font-black uppercase tracking-tighter italic">
                  {settings.footerName || settings.serverName}
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-6 italic uppercase">
                {settings.slogan || "A melhor experiência de Roleplay."}
              </p>
              <div className="flex gap-4">
                <SocialLink href={settings.discordUrl} icon={<Discord className="w-5 h-5" />} hover="hover:bg-[#5865F2]" />
                <SocialLink href={settings.instagramUrl} icon={<InstagramIcon />} hover="hover:bg-pink-600" />
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] mb-6 tracking-widest">Navegação</h4>
              <ul className="space-y-3 text-sm font-bold text-zinc-500">
                <li><Link href={`/${slug}`} className="hover:text-white transition-colors">Início</Link></li>
                <li><Link href={`/${slug}/loja`} className="hover:text-white transition-colors">Loja VIP</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase text-[var(--primary)] mb-6 tracking-widest">Legal</h4>
              <ul className="space-y-3 text-sm font-bold text-zinc-500">
                <li><Link href={`/${slug}/termos`} className="hover:text-white transition-colors">Termos</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge icon={<Landmark className="w-3 h-3" />} text="PIX" />
                <Badge icon={<CreditCard className="w-3 h-3" />} text="CARD" />
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[9px] font-bold uppercase text-white tracking-widest">Pagamento Seguro</span>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center md:text-left">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} {settings.footerName || settings.serverName}. POWERED BY PAYMTA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Subcomponentes auxiliares
function SocialLink({ href, icon, hover }: any) {
  return <a href={href} target="_blank" className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 transition-all border border-white/5 ${hover} hover:text-white shadow-lg`}>{icon}</a>;
}
function Badge({ icon, text }: any) {
  return <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[9px] font-bold text-zinc-500 flex items-center gap-2 uppercase tracking-widest">{icon} {text}</div>;
}
function InstagramIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
}