import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam-app.elevate-bootcamp.cloud",
        pathname: "/storage/entities/diploma/**",
      },
    ],
  },
};

export default nextConfig;
