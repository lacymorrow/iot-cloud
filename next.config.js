/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'export',
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
});
