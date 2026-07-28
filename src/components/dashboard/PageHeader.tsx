import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  category: string;
  categoryColor: string;
  actionButton?: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isLoading?: boolean;
    colorClass?: string;
  };
}

export function PageHeader({ title, subtitle, icon, category, categoryColor, actionButton }: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
      <div>
        <div className={`flex items-center gap-2 ${categoryColor} mb-2`}>
          {icon}
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{category}</span>
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">{title}</h1>
        <p className="text-zinc-500 text-sm font-medium mt-1">{subtitle}</p>
      </div>

      {actionButton && (
        <button 
          onClick={actionButton.onClick} 
          disabled={actionButton.isLoading} 
          className={`${actionButton.colorClass || 'bg-white text-black hover:bg-zinc-200'} font-black px-10 py-7 rounded-2xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50`}
        >
          {actionButton.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{actionButton.icon} {actionButton.label}</>}
        </button>
      )}
    </header>
  );
}