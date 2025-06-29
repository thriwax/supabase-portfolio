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
};

export default nextConfig;
