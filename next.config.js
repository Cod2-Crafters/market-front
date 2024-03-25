/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    webpack(config) {
        // @svg load
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        });

        return config;
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
