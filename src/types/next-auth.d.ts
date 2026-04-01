import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      slug?: string | null; // Já adicionamos o slug para futuras implementações
    };
  }

  interface User {
    id: string;
    slug?: string | null;
  }
}