import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js and its ecosystem ship ESM that Next transpiles fine,
  // but transpilePackages keeps drei/postprocessing happy across versions.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Lint is run separately; don't block production builds on it.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
