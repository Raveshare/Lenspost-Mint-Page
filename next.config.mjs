/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lenspost.s3.ap-south-1.amazonaws.com',
        protocol: 'https'
      }
    ]
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'iokijs', 'encoding');
    return config;
  },
  reactStrictMode: true
};

export default nextConfig;
