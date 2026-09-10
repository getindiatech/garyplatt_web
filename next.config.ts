import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Catalogue artwork is served by the backend from /uploads, and the seed
    // falls back to the source images on garyplatt.com when it has not been
    // downloaded locally.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "www.garyplatt.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "garyplatt.com", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
