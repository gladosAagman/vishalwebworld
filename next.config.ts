import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // `next dev --turbopack` and `next build` write incompatible layouts into the
  // output directory, so sharing one `.next` corrupts whichever ran first (the
  // missing build-manifest.json ENOENTs dev then throws on every request).
  // The `build`/`start` scripts set NEXT_DIST_DIR=.next-verify; dev keeps .next.
  distDir: process.env["NEXT_DIST_DIR"] || ".next",
};

export default nextConfig;
