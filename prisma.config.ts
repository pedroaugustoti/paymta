import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env explicitamente
dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Se o process.env falhar, ele dá um erro mais claro
    url: process.env.DATABASE_URL as string,
  },
});