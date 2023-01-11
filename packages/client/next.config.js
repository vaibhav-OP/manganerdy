/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost", "107.189.12.106"]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
