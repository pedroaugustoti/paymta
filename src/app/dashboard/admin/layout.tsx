import Link from "next/link";
import { 
  LayoutDashboard, Users, LifeBuoy, 
  Activity, ShieldAlert, LogOut, Settings 
} from "lucide-react";

export const metadata = {
  title: "PayMTA | Backoffice",
  description: "Painel Administrativo para a Staff",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex selection:bg-violet-500/30">
      
      {/* SIDEBAR FIXA PARA A STAFF */}
      <aside className="w-72 bg-[#050505] border-r border-white/5 hidden md:flex flex-col justify-between h-screen sticky top-0">
        <div>
          {/* LOGO E BADGE */}
          <div className="h-24 flex items-center px-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black uppercase italic text-white leading-none tracking-tighter">PayMTA</h1>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-400">Backoffice</span>
              </div>
            </div>
          </div>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="p-4 space-y-2 mt-4">
            <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Gestão do SaaS</p>
            
            <MenuLink href="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Visão Geral" active />
            <MenuLink href="/admin/clientes" icon={<Users className="w-4 h-4" />} label="Lojas & Clientes" />
            <MenuLink href="/admin/tickets" icon={<LifeBuoy className="w-4 h-4" />} label="Fila de Chamados" />
            <MenuLink href="/admin/monitoramento" icon={<Activity className="w-4 h-4" />} label="Monitoramento API" />
            <MenuLink href="/admin/configuracoes" icon={<Settings className="w-4 h-4" />} label="Ajustes Globais" />
          </nav>
        </div>

        {/* FOOTER DA SIDEBAR (PERFIL STAFF) */}
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20 group">
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Encerrar Turno</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO DINÂMICO */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Aviso de ambiente restrito topo */}
        <div className="bg-violet-600/10 border-b border-violet-500/20 px-8 py-2 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-violet-400">
          <span>Ambiente Restrito Nível: Admin</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Servidor Operacional
          </span>
        </div>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Subcomponente para os links do menu não repetirem código
function MenuLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
        active 
          ? "bg-violet-600/10 text-violet-400 border-violet-500/20 shadow-inner" 
          : "text-zinc-500 hover:text-white hover:bg-white/5 border-transparent"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}