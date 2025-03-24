import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" }, // Ảnh chính của Spotify
      { protocol: "https", hostname: "mosaic.scdn.co" }, // Ảnh ghép của Spotify
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" }, // CDN FA
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" }, // CDN AK
    ],
  },
};

export default nextConfig;
