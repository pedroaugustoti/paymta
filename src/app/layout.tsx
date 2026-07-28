import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayMTA | Automação PIX e Loja B2B para Servidores MTA",
  description: "Transforme seu servidor em uma máquina de vendas automatizada via Mercado Pago.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#030303] text-white selection:bg-yellow-500/30 min-h-screen flex flex-col selection:text-black`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}