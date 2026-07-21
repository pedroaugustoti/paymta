"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Sair da Conta"
      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all group disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-red-400" />
      ) : (
        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
      <span>{isLoading ? "Encerrando..." : "Sair da Conta"}</span>
    </button>
  );
}