import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma', // Apenas a string com o caminho
  datasource: {
    url: process.env.DATABASE_URL,
  },
});