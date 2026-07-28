import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
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
        // @ts-ignore (Ignora o aviso de tipagem do TypeScript temporariamente)
        session.user.role = token.role; 
      }
      return session;
    }
  },
  
  session: {
    strategy: "jwt", // Obrigatório para o JWT funcionar
  },

  // GARANTE O REDIRECIONAMENTO DIRETO PARA O DASHBOARD
  pages: {
    signIn: "/login", // Se tiver uma página de login customizada, ou deixe padrão
    signOut: "/",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };