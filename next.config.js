const path = require("path");
const compose = require("next-compose");
const withImages = require("next-images");

require("dotenv").config({ path: path.resolve(__dirname, ".env.dev") });

module.exports = compose([
  [withImages, { inlineImageLimit: 100 }],
  {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
      config.plugins.push(new webpack.DefinePlugin(env));
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config
      config.resolve.modules.push(
        path.resolve(__dirname, "./"),
        "node_modules"
      );
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]"
          }
        }
      });
      return config;
    }
  },
  // {
  //   env: {
  //     API_URL: "hmmm",
  //     MIXPANEL_ID: process.env.MIXPANEL_ID
  //   }
  // }
]);
