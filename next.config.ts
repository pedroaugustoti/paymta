import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com', // Já deixamos o Discord pronto para a Fase 4
        pathname: '/**',
      },
    ],
  },
  // Fix necessário: Turbopack precisa tratar o Prisma e o driver pg
  // como pacotes externos, ou ele quebra a resolução do client gerado.
  serverExternalPackages: ['@prisma/client', 'pg'],
};

export default nextConfig;