/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost","images.novel-fast.club", "i.pinimg.com", "scansraw.com", "www.asurascans.com", "toonix.xyz", "ww4.manganelo.tv", "avt.mkklcdnv6temp.com", "toonily.net", "cdn.realmscans.com"]
  },
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
