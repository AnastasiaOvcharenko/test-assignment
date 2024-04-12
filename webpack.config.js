const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {};

module.exports = (env) => {
  return {
    output: {
      publicPath: "/",
      path: path.join(__dirname, "/dist"), // the bundle output path
      filename: "bundle.js", // the name of the bundle
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html", // to import index.html file inside index.js
      }),
      new webpack.DefinePlugin({
        "process.env.token": JSON.stringify(process.env.token),
      }),
    ],
    devServer: {
      historyApiFallback: true,
      port: 3030, // you can change the port
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
  };
};
