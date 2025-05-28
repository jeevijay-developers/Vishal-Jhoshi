/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  // ✅ No need for `output: "export"` or `"standalone"` unless you're using Docker
};

module.exports = nextConfig;
