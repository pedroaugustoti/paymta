import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider"; // Importando o que acabamos de criar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayMTA | Automação PIX para Servidores MTA",
  description: "Transforme seu servidor em uma Máquina de Vendas B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        {/* Envolvendo tudo com o Provider de Autenticação */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}