const path = require("path");
const withImages = require('next-images');

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = withImages({
  inlineImageLimit: 100,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.resolve.modules.push(path.resolve(__dirname, ""), "node_modules")
    return config
  },
  env: {
    API_URL: process.env.API_URL
  }
})