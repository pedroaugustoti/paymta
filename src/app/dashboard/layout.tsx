import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// ADICIONADO: Package para os produtos
import { LayoutDashboard, Settings, DollarSign, Plug, ExternalLink, Package } from "lucide-react";
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
      <aside className="w-64 border-r border-white/5 bg-zinc-950 flex flex-col sticky top-0 h-screen">
        
        {/* LOGO DINÂMICA */}
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm shadow-[0_0_15px_rgba(234,179,8,0.3)] overflow-hidden bg-yellow-400">
            {userSettings?.logoUrl ? (
              <img src={userSettings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span>{(userSettings?.serverName || "P").charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight leading-none uppercase truncate w-32">
              {userSettings?.serverName || "Painel PayMTA"}
            </span>
            {userSettings?.slug && (
              <Link 
                href={`/${userSettings.slug}`} 
                target="_blank"
                className="text-[9px] text-zinc-500 hover:text-yellow-500 flex items-center gap-1 mt-1 transition-colors"
              >
                Ver minha loja <ExternalLink className="w-2 h-2" />
              </Link>
            )}
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-white/5">
          {session.user?.image ? (
            <Image 
              src={session.user.image} 
              alt="Avatar" 
              width={36} 
              height={36} 
              className="rounded-full border border-yellow-500/30"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" />
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">{session.user?.name}</span>
            <span className="text-[10px] text-zinc-500 truncate">{session.user?.email}</span>
          </div>
        </div>

        {/* NAVEGAÇÃO - Aba de Produtos Incluída */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Visão Geral" />
          {/* ADICIONADO AQUI: */}
          <NavLink href="/dashboard/produtos" icon={<Package className="w-5 h-5" />} label="Produtos" />
          
          <NavLink href="/dashboard/vendas" icon={<DollarSign className="w-5 h-5" />} label="Vendas" />
          <NavLink href="/dashboard/integracao" icon={<Plug className="w-5 h-5" />} label="Integração (Script)" />
          <NavLink href="/dashboard/configuracoes" icon={<Settings className="w-5 h-5" />} label="Configurações" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all group"
    >
      <span className="group-hover:text-yellow-400 transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}