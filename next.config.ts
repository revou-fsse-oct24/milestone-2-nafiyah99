import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
module.exports = {
  images: {
    domains: ["api.escuelajs.co"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.lorem.space",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremfaces.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
