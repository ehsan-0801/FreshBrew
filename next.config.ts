import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback — both far smaller than the JPEG source.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [128, 256, 384, 512],
  },

  // three.js and drei are large; keeping them out of the shared chunk matters.
  experimental: {
    optimizePackageImports: ["@react-three/drei", "lenis"],
  },
};

export default nextConfig;
