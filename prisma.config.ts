import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env explicitamente
dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Como este arquivo serve para o Prisma CLI (Terminal),
    // usamos APENAS a conexão direta (porta 5432) para ele conseguir formatar o banco.
    url: process.env.DIRECT_URL as string,
  },
});