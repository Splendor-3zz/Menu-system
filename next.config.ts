import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: 2 * 1024 * 1024, // 2 MB
    },
  },
  devIndicators: false,
};

export default nextConfig;
