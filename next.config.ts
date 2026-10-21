import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 : pour la photo du fondateur, servie en haute qualité
    qualities: [75, 90],
  },
};

export default nextConfig;
