import type { NextConfig } from "next";

/**
 * Where /uploads is fetched from. Defaults to the public API origin.
 * In production set API_ORIGIN=http://127.0.0.1:4000 so the rewrite stays on
 * the machine and does not loop back through nginx.
 */
const API_ORIGIN = (
  process.env.API_ORIGIN ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api/v1"
)
  .replace(/\/api\/v\d+\/?$/, "")
  .replace(/\/$/, "");

const nextConfig: NextConfig = {
  /**
   * Catalogue artwork lives on the backend under /uploads. It is proxied here
   * rather than linked to directly so the browser only ever sees same-origin
   * image paths.
   *
   * That matters beyond tidiness: Next 16 refuses to optimise an absolute URL
   * whose host resolves to a private IP (SSRF protection), which is exactly
   * what http://localhost:4000 is in development. Proxying keeps the images
   * local, so no dangerouslyAllowLocalIP escape hatch is needed, and the site
   * does not need to know the backend's public hostname in production.
   */
  async rewrites() {
    return [{ source: "/uploads/:path*", destination: `${API_ORIGIN}/uploads/:path*` }];
  },

  images: {
    // The seed falls back to the source images on garyplatt.com when artwork
    // has not been downloaded to the backend.
    remotePatterns: [
      { protocol: "https", hostname: "www.garyplatt.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "garyplatt.com", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
