/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Fix module resolution issues
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      module: false
    };
    
    return config;
  }
};

module.exports = nextConfig;
