import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Definição global para evitar múltiplas instâncias em Dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. Garante que a URL do banco existe
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("A variável DATABASE_URL não foi definida no seu .env");
}

// 3. Inicialização do Singleton
const createPrismaClient = () => {
  const pool = new Pool({ 
    connectionString,
    // O pulo do gato para a Vercel:
    max: process.env.NODE_ENV === "development" ? 2 : 1, 
    idleTimeoutMillis: 30000, 
  });
  
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

// 4. A EXPORTAÇÃO OBRIGATÓRIA (É isso que a rota API está procurando!)
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;