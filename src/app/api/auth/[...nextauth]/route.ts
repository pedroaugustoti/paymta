import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // O arquivo que acabamos de arrumar!

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };