/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cy"],
    defaultLocale: "en",
    localeDetection: false,
    domains: [
      {
        domain: "dystopias.dev",
        defaultLocale: "en",
      },
      {
        domain: "utopias.dev",
        defaultLocale: "cy",
      }
    ]
  },
  images: {
    domains: ["cdn.sanity.io"]
  },
  swcMinify: true
}

module.exports = nextConfig
