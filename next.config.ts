import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/shein-india",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
