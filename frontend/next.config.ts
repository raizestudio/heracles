import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DEMO: process.env.DEMO,
    NEXT_PUBLIC_API_BASE_URL: `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOSTNAME}${
      process.env.BACKEND_PORT ? `:${process.env.BACKEND_PORT}` : ""
    }`,
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
