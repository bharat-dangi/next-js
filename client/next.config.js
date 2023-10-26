/** @type {import('next').NextConfig} */
const nextConfig = {
  onError: {
    404: "./app/not-found.tsx",
  },
};

module.exports = nextConfig;
