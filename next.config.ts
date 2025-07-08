import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    GITHUB_ID:"Ov23liL5ZGHk3Jb8Hyxs",
    GITHUB_SECRET:"ef90ebad17987b7460849b033a3a961a97cd67d3"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;