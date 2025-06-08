import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    dynamicIO: true,
    reactCompiler: true,
    cacheLife: {
      geonames: {
        stale: 3600 * 24 * 28, // 28 days
        revalidate: 3600 * 24 * 14, // 14 days
        expire: 3600 * 24 * 28, // 28 days
      },
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
