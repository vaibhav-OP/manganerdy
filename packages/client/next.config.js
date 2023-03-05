/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_serverName],
    minimumCacheTTL: 86400,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
