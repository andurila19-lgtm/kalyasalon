import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network access (e.g. mobile testing on LAN 192.168.x.x)
  allowedDevOrigins: ["192.168.100.36", "localhost:3000", "192.168.*"],

  // Gzip / Brotli compression for static assets and HTML
  compress: true,

  // Strict power-saving and clean React behavior
  reactStrictMode: true,

  // Image optimization engine (AVIF & WebP generation, mobile-first device sizes)
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default withPayload(nextConfig);
