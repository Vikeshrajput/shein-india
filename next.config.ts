import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.GITHUB_PAGES === "true" ? "/shein-india" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
