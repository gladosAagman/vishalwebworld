import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A separate build output can be requested with NEXT_DIST_DIR, so a
  // production build never clobbers the .next a running `next dev` is using.
  distDir: process.env["NEXT_DIST_DIR"] || ".next",
};

export default nextConfig;
