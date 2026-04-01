"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
    >
      <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
      Sair da Conta
    </button>
  );
}