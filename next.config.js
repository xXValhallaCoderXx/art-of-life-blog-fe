const path = require("path");
const compose = require('next-compose')
const withCSS = require('@zeit/next-css');
const withSass = require("@zeit/next-sass")
const withImages = require("next-images");

require("dotenv").config({ path: path.resolve(__dirname, ".env.dev") });

module.exports = compose([
  [withImages, { inlineImageLimit: 100 }],
  [withCSS],
  [withSass, { cssModules: true }],
  {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config
      config.resolve.modules.push(
        path.resolve(__dirname, "./"),
        "node_modules"
      );
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 100000,
                name: '[name].[ext]'
            }
        }
    })
      return config;
    }
  },
  {
    env: {
      API_URL: process.env.API_URL
    }
  }
]);
