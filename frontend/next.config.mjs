/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname);
    return config;
  },
};

export default nextConfig;
