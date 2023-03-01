/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    STRAPI_UPLOAD_FOLDER: process.env.STRAPI_UPLOAD_FOLDER,
    STRAPI_GRAPHQL_ENDPOINT: process.env.STRAPI_GRAPHQL_ENDPOINT,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
