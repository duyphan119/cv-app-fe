/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["scontent.fsgn8-2.fna.fbcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.fsgn4-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn8-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-4.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-3.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn3-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fsgn13-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
