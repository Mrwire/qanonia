const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

module.exports = withNextIntl({
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@qanounia/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
});
