/** @type {import('next').Config} */
const nextConfig = {
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
};

export default nextConfig;