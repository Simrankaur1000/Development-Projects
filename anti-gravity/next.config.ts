import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/anti-gravity",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
