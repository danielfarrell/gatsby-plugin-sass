"use strict";

var _extractTextWebpackPlugin = require("extract-text-webpack-plugin");

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.modifyWebpackConfig = function (_ref) {
  var args = _ref.args;
  var config = args.config,
      stage = args.stage;


  var cssModulesConf = "css?modules&minimize&importLoaders=1";
  var cssModulesConfDev = cssModulesConf + "&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]";

  switch (stage) {
    case "develop":
      {
        config.loader("sass", {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          loaders: ["style", "css", "sass"]
        });

        config.loader("sassModules", {
          test: /\.module\.s(a|c)ss$/,
          loaders: ["style", cssModulesConfDev, "sass"]
        });
        return config;
      }
    case "build-css":
      {
        config.loader("sass", {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          loader: _extractTextWebpackPlugin2.default.extract(["css?minimize", "sass"])
        });

        config.loader("sassModules", {
          test: /\.module\.s(a|c)ss$/,
          loader: _extractTextWebpackPlugin2.default.extract("style", [cssModulesConf, "sass"])
        });
        return config;
      }
    case "build-html":
      {
        config.loader("sass", {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          loader: "null"
        });

        config.loader("sassModules", {
          test: /\.module\.s(a|c)ss$/,
          loader: _extractTextWebpackPlugin2.default.extract("style", [cssModulesConf, "sass"])
        });
        return config;
      }
    case "build-javascript":
      {
        config.loader("sass", {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          loader: _extractTextWebpackPlugin2.default.extract(["css", "sass"])
        });

        config.loader("sassModules", {
          test: /\.module\.s(a|c)ss$/,
          loader: _extractTextWebpackPlugin2.default.extract("style", [cssModulesConf, "sass"])
        });
        return config;
      }
    default:
      {
        return config;
      }
  }
};