/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost"]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
