const path = require("path");

module.exports = {
  future: {
    webpack5: true,
  },
};

// module.exports = compose([
//   {
//     webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//       config.resolve.modules.push(
//         path.resolve(__dirname, "./"),
//         "node_modules"
//       );
//       config.module.rules.push({
//         test: /\.(eot|woff|woff2|ttf)$/,
//         use: {
//           loader: "url-loader",
//           options: {
//             limit: 100000,
//             name: "[name].[ext]",
//           },
//         },
//       });
//       return config;
//     },
//   },
// ]);
