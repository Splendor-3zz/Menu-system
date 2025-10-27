import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {},
  },
  devIndicators: false,
};

export default nextConfig;
