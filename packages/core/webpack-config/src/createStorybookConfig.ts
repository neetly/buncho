import * as utils from "@buncho/utils";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";
import { DefinePlugin } from "webpack";
import {
  customizeArray,
  CustomizeRule,
  merge,
  mergeWithCustomize,
} from "webpack-merge";

import { EXTENSIONS } from "./constants";
import { createRules } from "./createRules";
import { production, useFastRefresh } from "./env";

const config: Configuration = {
  devtool: production ? "source-map" : "eval-source-map",

  resolve: {
    extensions: EXTENSIONS,
    alias: utils.getWebpackAlias(),
  },

  module: {
    rules: createRules({
      extract: false,
      customRules: [{ test: /\.ejs$/ }],
    }),
  },

  experiments: {
    topLevelAwait: true,
  },

  plugins: [
    new ForkTsCheckerPlugin({
      typescript: {
        configFile: path.resolve("./tsconfig.json"),
        build: true,
        mode: "write-references",
      },
      // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/495
      devServer: false,
    }),

    !production && useFastRefresh && new ReactRefreshPlugin(),
  ].filter(Boolean) as Configuration["plugins"],

  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  stats: production ? "normal" : "minimal",
};

const mergeConfig = mergeWithCustomize({
  customizeArray: customizeArray({
    "resolve.extensions": CustomizeRule.Replace,
    "module.rules": CustomizeRule.Replace,
    "optimization.minimizer": CustomizeRule.Replace,
  }),
});

const createStorybookConfig = (
  defaultConfig: Configuration,
  {
    env = {},
  }: {
    env?: Record<string, string | undefined>;
  } = {},
): Configuration => {
  return merge(mergeConfig(defaultConfig, config), {
    plugins: [
      new DefinePlugin(
        Object.fromEntries(
          Object.entries(env).map(([key, value]) => {
            return [`process.env.${key}`, JSON.stringify(value)];
          }),
        ),
      ),
    ],
  });
};

export { createStorybookConfig };
