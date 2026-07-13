import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 758, 1024, 1280, 1536],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
