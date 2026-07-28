export default function AdminTicketsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-sm text-purple-500 font-medium mb-1">
          <span className="material-icons text-base">support_agent</span>
          ADMIN BACKOFFICE
        </div>
        <h1 className="text-3xl font-black italic uppercase tracking-wider text-white">
          Fila de Chamados
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Visão global de todos os tickets de suporte abertos pelos lojistas.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <p className="text-zinc-400 text-sm">Fila Kanban ou Tabela de tickets entrará aqui...</p>
      </div>
    </div>
  );
}