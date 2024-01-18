/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/pixel8labs',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
