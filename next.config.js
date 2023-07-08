/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'react-challenge.human.hr',
        port: '',
        pathname: '/**',
      },
    ]
  },
}

module.exports = nextConfig
