import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      geonames: {
        stale: 3600 * 24 * 28, // 28 days
        revalidate: 3600 * 24 * 14, // 14 days
        expire: 3600 * 24 * 28, // 28 days
      },
    },
  },
};

export default nextConfig;
