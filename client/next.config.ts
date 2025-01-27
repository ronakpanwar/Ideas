import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add the Cloudinary domain here
  },
  // You can add any other Next.js configuration options here
};

export default nextConfig;
