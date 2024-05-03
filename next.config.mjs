/** @type {import('next').NextConfig} */

import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '/**',
        hostname: '**',
        port: ''
      }
    ]
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'iokijs', 'encoding');
    return config;
  },
  reactStrictMode: true
};

export default withPlaiceholder(nextConfig);
