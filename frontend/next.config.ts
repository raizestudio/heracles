import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DEMO: process.env.DEMO,
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
