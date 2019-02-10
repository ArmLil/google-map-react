const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
    source: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new FriendlyErrorsWebpackPlugin(),
  ]
};
