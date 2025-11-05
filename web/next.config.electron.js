/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  compress: true,
  poweredByHeader: false,
  trailingSlash: true,
};

module.exports = nextConfig;
