import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"; // <-- Adicionado o Provider do Google

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    // 1. Quando o Token (JWT) é criado na hora do login:
    async jwt({ token, user, profile }) {
      if (user) {
        // Coloque aqui o SEU ID do Discord (e dos seus sócios/staffs)
        const adminDiscordIds = ["484134751284756483"]; 
        const discordId = (profile as { id?: string })?.id;

        if (profile && adminDiscordIds.includes(discordId as string)) {
          token.role = "ADMIN";
        } else {
          token.role = "USER";
        }
      }
      return token;
    },

    // 2. Quando a Sessão vai para o Front-End (useSession):
    async session({ session, token }) {
      if (session.user) {
        // Injetamos a role do token para dentro da sessão
        // @ts-ignore
        session.user.role = token.role; 
      }
      return session;
    }
  },
  
  session: {
    strategy: "jwt", // Obrigatório para o JWT funcionar
  },

  // GARANTE O REDIRECIONAMENTO DIRETO PARA AS NOVAS PÁGINAS
  pages: {
    signIn: "/auth/login", // <-- Atualizado para a nova rota
    signOut: "/",
    error: "/auth/login",  // <-- Se der erro (ex: senha errada), volta pra cá
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };