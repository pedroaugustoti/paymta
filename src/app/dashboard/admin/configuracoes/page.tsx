export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <div>
        <div className="flex items-center gap-2 text-sm text-purple-500 font-medium mb-1">
          <span className="material-icons text-base">settings</span>
          ADMIN BACKOFFICE
        </div>
        <h1 className="text-3xl font-black italic uppercase tracking-wider text-white">
          Ajustes Globais
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Configurações sensíveis da plataforma SaaS e limites de operação.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
        <p className="text-zinc-400 text-sm">Formulários de configurações entrarão aqui...</p>
      </div>
    </div>
  );
}