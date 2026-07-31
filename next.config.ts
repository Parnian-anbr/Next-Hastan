import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: builds the site to plain HTML/CSS/JS in `out/`,
  // so it can be hosted on Cloudflare Pages / GitHub Pages with no server.
  output: "export",

  // Static export can't use Next's image optimization server,
  // so we disable it (images are served as-is).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
