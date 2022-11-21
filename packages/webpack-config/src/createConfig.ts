import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import mimeTypes from "mime-types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ProjectReferencesPlugin } from "project-references-webpack-plugin";
import type { Configuration } from "webpack";
import type {} from "webpack-dev-server";

import { createRules } from "./createRules";

const createConfig = ({
  mode = "production",
  isDevServer = false,
  useReactRefresh = true,
}: {
  mode?: "production" | "development";
  isDevServer?: boolean;
  useReactRefresh?: boolean;
} = {}): Configuration => {
  const isProduction = mode === "production";

  return {
    mode,

    output: {
      filename: isProduction
        ? "static/[name].[contenthash:8].js"
        : "static/[name].js",
      assetModuleFilename: "assets/[contenthash][ext]",

      // #region futureDefaults
      charset: false,
      hashFunction: "xxhash64",
      hashDigestLength: 16,
      // #endregion
    },

    devtool: isProduction ? "source-map" : "eval-source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
        ".js": [".ts", ".tsx", ".js"],
        ".mjs": [".mts", ".mjs"],
        ".cjs": [".cts", ".cjs"],
      },
      plugins: [new ProjectReferencesPlugin()],
    },

    module: {
      parser: {
        javascript: {
          exportsPresence: "error",
        },

        asset: {
          dataUrlCondition: (source, { filename }) => {
            const mimeType = mimeTypes.lookup(filename);
            return Boolean(mimeType) && Buffer.byteLength(source) <= 8192;
          },
        },
      },

      rules: createRules({
        mode,
        isDevServer,
        useReactRefresh,
      }),
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction
          ? "static/[name].[contenthash:8].css"
          : "static/[name].css",
        linkType: false,
      }),

      isDevServer && useReactRefresh && new ReactRefreshPlugin(),
    ].filter(Boolean) as Configuration["plugins"],

    node: false,

    experiments: {
      backCompat: false,
      topLevelAwait: true,
      asyncWebAssembly: true,
    },

    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },

    cache: {
      type: "filesystem",
    },

    devServer: {
      hot: true,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
  };
};

export { createConfig };
