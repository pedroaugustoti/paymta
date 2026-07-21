import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";

// Isotipo Exclusivo PayMTA (Vetor para o Rodapé)
const FooterLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(234,179,8,0.2)] shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M20 15C20 9.47715 24.4772 5 30 5H65C81.5685 5 95 18.4315 95 35C95 51.5685 81.5685 65 65 65H45V90C45 92.7614 42.7614 95 40 95H25C22.2386 95 20 92.7614 20 90V15ZM45 45H65C70.5228 45 75 40.5228 75 35C75 29.4772 70.5228 25 65 25H45V45Z" fill="url(#footer-grad)" />
    <defs>
      <linearGradient id="footer-grad" x1="20" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

// O FOOTER ESTÁTICO NÃO PRECISA DO USE CLIENT
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303] pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-6">
              <FooterLogo />
              <span className="text-2xl font-black text-white tracking-tighter">PayMTA</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 font-medium">
              Profissionalizando a economia dos servidores de MTA:SA com tecnologia de ponta e segurança para donos de cidades.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Produto</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">Visão Geral</Link></li>
              <li><Link href="/planos" className="hover:text-yellow-400 transition-colors">Preços e Planos</Link></li>
              <li><Link href="/#features" className="hover:text-yellow-400 transition-colors">Funcionalidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Suporte</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/docs" className="hover:text-yellow-400 transition-colors">Documentação</Link></li>
              <li><a href="https://discord.gg/seu-link" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Discord Oficial</a></li>
              <li><Link href="/docs#troubleshooting" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link href="/reembolso" className="hover:text-white transition-colors">Reembolso</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[11px] md:text-xs text-zinc-600 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} PayMTA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// LAYOUT PRINCIPAL AGORA É UM SERVER COMPONENT (MUITO MAIS RÁPIDO)
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-[#000000] min-h-screen text-zinc-300 antialiased flex flex-col selection:bg-yellow-500/30">
      {/* Navbar puxada do componente isolado com o novo isotipo */}
      <Navbar />
      
      {/* Conteúdo Dinâmico */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer Estático com o novo isotipo */}
      <Footer />
    </div>
  );
}