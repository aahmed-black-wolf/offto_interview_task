const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
};

module.exports = withNextIntl(config);
