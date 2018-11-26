const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  return {
    mode: env.mode,
    entry: {
      script: path.resolve(__dirname, "src", "index.js")
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].bundle.min.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react", "minify"]
              }
            }
          ]
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            env.mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")],
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
      }),
      new MiniCssExtractPlugin({ filename: "css/[name].css" })
    ],
    devServer: {
      historyApiFallback: true
    }
  };
};
