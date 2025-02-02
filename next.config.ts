import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "ev-database.org",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
