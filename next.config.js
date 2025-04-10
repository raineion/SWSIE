/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Make sure you don't have any CSS modules settings that might interfere
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
