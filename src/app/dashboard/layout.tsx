import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Settings, DollarSign, 
  Zap, ExternalLink, Package, Palette, 
  FileText, LogOut 
} from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "./logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }

  const userSettings = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      serverName: true,
      logoUrl: true,
      slug: true,
    }
  });

  return (
    <div className="min-h-screen bg-[#030303] text-white flex font-sans">
      {/* SIDEBAR FIXA */}
      <aside className="w-68 border-r border-white/5 bg-zinc-950 flex flex-col sticky top-0 h-screen shadow-2xl shadow-black">
        
        {/* HEADER: LOGO E LINK EXTERNO */}
        <div className="p-6 flex items-center gap-4 border-b border-white/5">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-black text-lg shadow-[0_0_20px_rgba(234,179,8,0.2)] overflow-hidden bg-yellow-400 shrink-0">
            {userSettings?.logoUrl ? (
              <img src={userSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span>{(userSettings?.serverName || "P").charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-black tracking-widest leading-none uppercase truncate text-zinc-100">
              {userSettings?.serverName || "Painel PayMTA"}
            </span>
            {userSettings?.slug && (
              <Link 
                href={`/${userSettings.slug}`} 
                target="_blank"
                className="text-[10px] text-zinc-500 hover:text-yellow-400 flex items-center gap-1 mt-1.5 transition-colors font-bold italic"
              >
                VISUALIZAR LOJA <ExternalLink className="w-2 h-2" />
              </Link>
            )}
          </div>
        </div>

        {/* PERFIL RESUMIDO */}
        <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
          <div className="relative">
            {session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="Avatar" 
                width={38} 
                height={38} 
                className="rounded-full border-2 border-yellow-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black text-white truncate italic uppercase tracking-tighter">
              {session.user?.name?.split(' ')[0]}
            </span>
            <span className="text-[10px] text-zinc-500 truncate font-medium">Analista Senior</span>
          </div>
        </div>

        {/* MENU DE NAVEGAÇÃO MODULARIZADO */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          <p className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Principal</p>
          <NavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Visão Geral" />
          
          <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Gestão</p>
          <NavLink href="/dashboard/produtos" icon={<Package className="w-5 h-5" />} label="Produtos" />
          <NavLink href="/dashboard/vendas" icon={<DollarSign className="w-5 h-5" />} label="Vendas & PIX" />
          
          <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Customização</p>
          <NavLink href="/dashboard/aparencia" icon={<Palette className="w-5 h-5" />} label="Design da Loja" />
          <NavLink href="/dashboard/content" icon={<FileText className="w-5 h-5" />} label="Páginas & Termos" />
          
          <p className="px-4 py-2 mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Sistema</p>
          <NavLink href="/dashboard/integracao" icon={<Zap className="w-5 h-5" />} label="Integração API" />
          <NavLink href="/dashboard/configuracoes" icon={<Settings className="w-5 h-5" />} label="Configurações" />
        </nav>

        {/* BOTÃO SAIR */}
        <div className="p-4 border-t border-white/5">
          <LogoutButton />
        </div>
      </aside>

      {/* CONTEÚDO DA PÁGINA */}
      <main className="flex-1 overflow-y-auto bg-[#030303]">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all group relative overflow-hidden"
    >
      <span className="group-hover:text-yellow-400 transition-colors shrink-0">
        {icon}
      </span>
      <span className="truncate">{label}</span>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-500 group-hover:h-6 transition-all rounded-r-full" />
    </Link>
  );
}