const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "deltaimg.rahnama.com",
      "picsum.photos",
      "s3.ir-thr-at1.arvanstorage.com",
    ],
    minimumCacheTTL: 31536000,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName: false,
      // Enabled by default.
      ssr: true,
      // Enabled by default.
      fileName: false,
    },
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.VERSION": JSON.stringify(process.env.npm_package_version),
      })
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/clear",
        headers: [
          {
            key: "Clear-Site-Data",
            value: '"cache", "cookies", "storage"',
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
