import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project — a stray lockfile in the home
  // directory otherwise makes Next.js infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
  // /slush serves the standalone Slush contact card in public/slush.html.
  async rewrites() {
    return [{ source: "/slush", destination: "/slush.html" }];
  },
};

export default nextConfig;
