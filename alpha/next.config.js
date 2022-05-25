/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cy"],
    defaultLocale: "en",
    localeDetection: false,
    domains: [
      {
        domain: "artsed.wales",
        defaultLocale: "en",
      },
      {
        domain: "celfadd.cymru",
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
