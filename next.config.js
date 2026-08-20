/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    concurrentPlugins: false,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    config.parallelism = 1;
    return config;
  },
};

module.exports = nextConfig;
