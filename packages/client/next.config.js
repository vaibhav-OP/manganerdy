/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["manganerdy.com"]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
