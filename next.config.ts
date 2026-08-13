import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network access (e.g. mobile testing on LAN 192.168.x.x)
  allowedDevOrigins: ["192.168.100.36", "localhost:3000", "192.168.*"],
};

export default nextConfig;
