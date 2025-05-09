import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/**'), new URL('https://image.tmdb.org/t/p/w500/**')],
  },
};

export default nextConfig;

