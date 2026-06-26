import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build for Docker/Coolify (.next/standalone + server.js).
  output: "standalone",
  // The portrait is pre-sized for the web, so skip runtime image optimization
  // (no sharp needed in the container).
  images: { unoptimized: true },
};

export default nextConfig;
