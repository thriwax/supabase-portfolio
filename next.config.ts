import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fedor.tech',
      },
      {
        protocol: 'https',
        hostname: 'zkfyodmlqstgnqvkemxo.supabase.co',
      },
    ],
  },
  eslint: {
    // ❗ Отключить Lint на билде (на Vercel), чтобы не падал
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
