import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import type { Configuration } from "webpack";
import type {} from "webpack-dev-server";

import { EXTENSIONS } from "./constants";
import { createRules } from "./createRules";
import { isDevServer, isProduction } from "./env";

const createWebpackConfig = ({
  publicPath = "/",
}: {
  publicPath?: string;
} = {}): Configuration => {
  return {
    mode: isProduction ? "production" : "development",

    context: path.resolve("./src"),

    entry: {
      app: ".",
    },

    output: {
      path: path.resolve("./build"),
      filename: isProduction
        ? "static/[name]-[contenthash:8].js"
        : "static/[name].js",
      assetModuleFilename: "assets/[contenthash][ext]",
      publicPath,
    },

    devtool: isProduction ? "source-map" : "eval-source-map",

    resolve: {
      extensions: EXTENSIONS,
    },

    module: {
      rules: createRules({ extractCss: true }),
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction
          ? "static/[name]-[contenthash:8].css"
          : "static/[name].css",
      }),

      new HtmlPlugin({
        template: path.resolve("./public/index.html"),
        xhtml: true,
      }),

      isDevServer && new ReactRefreshPlugin(),

      !isDevServer &&
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve("./public"),
              globOptions: {
                ignore: ["**/index.html"],
              },
              noErrorOnMissing: true,
            },
          ],
        }),
    ].filter(Boolean) as Configuration["plugins"],

    experiments: {
      topLevelAwait: true,
      asyncWebAssembly: true,
    },

    optimization: {
      minimizer: [
        "...",
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.squooshMinify,
          },
        }),
      ],
    },

    cache: {
      type: "filesystem",
    },

    devServer: {
      hot: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      static: path.resolve("./public"),
    },
  };
};

export { createWebpackConfig };
