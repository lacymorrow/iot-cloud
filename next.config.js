/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  async redirects() {
    return [
      // {
      //   source: '/posts',
      //   destination: '/posts/all',
      //   permanent: false,
      // },
    ];
  },
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
