import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  iconColorClass: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

export function SectionCard({ title, subtitle, icon, iconColorClass, children, headerAction }: SectionCardProps) {
  return (
    <section className="bg-zinc-950/50 border border-white/5 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl shadow-inner ${iconColorClass}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-black italic uppercase text-white leading-tight">{title}</h3>
            {subtitle && <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{subtitle}</p>}
          </div>
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      {children}
    </section>
  );
}