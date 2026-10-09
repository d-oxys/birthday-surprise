import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export → `npm run build` writes a plain HTML/CSS/JS site to /out,
  // which Firebase Hosting (or any static host) can serve without a server.
  output: "export",
  images: {
    // The built-in image optimizer needs a server, so it's off for static hosting.
    // Compress photos before adding them to public/memories (≈1600px wide, < 500 KB).
    unoptimized: true,
  },
};

export default nextConfig;
