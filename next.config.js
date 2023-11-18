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
  // async redirects() {
  //   return [
  //     {
  //       source: '/posts',
  //       destination: '/posts/all',
  //       permanent: false,
  //     },
  //   ];
  // },

  // PREACT
  // webpack: (config) => {
  //   // Replace React with Preact only in client production build
  //   // webpack: (config, { dev, isServer }) => {
  //   // if (!dev && !isServer) {

  //   Object.assign(config.resolve.alias, {
  //     react: 'preact/compat',
  //     'react-dom/test-utils': 'preact/test-utils',
  //     'react-dom': 'preact/compat',
  //     'react/jsx-runtime': 'preact/jsx-runtime',
  //   });
  //   return config;
  // },
});
