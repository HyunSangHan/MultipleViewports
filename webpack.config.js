const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const rootDir = path.join(__dirname, "./");

module.exports = (env, options) => {
  const config = {
    entry: {
      background: path.join(rootDir, "src", "background"),
      "extension_content_script": path.join(
        rootDir,
        "src",
        "contentScript",
        "index.ts",
      ),
    },
    output: {
      path: path.join(rootDir, "dist"),
      filename: "[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(rootDir, "src", "_locales"),
          to: "./_locales/",
        },
        {
          from: path.join(rootDir, "static"),
          to: "./",
        },
        {
          from: path.join(rootDir, "src/manifest.json"),
          transform(content) {
            let space = 0;
            if (options.mode === "development") {
              space = 2;
            }
            return Buffer.from(
              JSON.stringify(
                {
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString()),
                },
                null,
                space,
              ),
            );
          },
          to: "./manifest.json",
        },
      ]),
      new CleanWebpackPlugin(),
    ],
  };

  return config;
};
