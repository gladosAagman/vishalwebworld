import type { NextConfig } from "next";

const isHostedBuild = Boolean(process.env["VERCEL"] || process.env["CI"]);
const distDir = (!isHostedBuild && process.env["NEXT_DIST_DIR"]) || ".next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir,
};

export default nextConfig;
