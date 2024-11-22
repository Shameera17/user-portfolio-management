/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "firebasestorage.googleapis.com",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
