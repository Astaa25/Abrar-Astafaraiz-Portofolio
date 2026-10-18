import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: [
    '10.136.54.52',
    '192.168.137.1',
    'localhost',
    '127.0.0.1',
  ],
  experimental: {
    instantInsights: {
      validationLevel: 'manual-warning',
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
