/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'production',

  trailingSlash: true,
};

export default nextConfig;
