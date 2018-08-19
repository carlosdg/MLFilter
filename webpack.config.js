const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_MODE || "development",
  entry: path.resolve(__dirname, "src", "js", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new CopyWebpackPlugin(
      [{ from: "**/*", context: path.resolve(__dirname, "src") }],
      { ignore: ["js/**/*", "index.html"] }
    )
  ]
};
