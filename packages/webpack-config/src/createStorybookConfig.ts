import type { Configuration, Plugin } from "webpack";
import {
  CustomizeRule,
  mergeWithCustomize,
  customizeArray,
} from "webpack-merge";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { production, useFastRefresh, hasTsconfigPaths } from "./env";
import { createRules } from "./createRules";

const config: Configuration = {
  resolve: {
    extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx"],

    plugins: hasTsconfigPaths ? [new TsconfigPathsPlugin()] : [],
  },

  module: {
    rules: createRules({
      customRules: [{ test: /\.ejs$/ }],
    }),
  },

  plugins: [
    new ForkTsCheckerPlugin(),

    !production && useFastRefresh && new ReactRefreshPlugin(),
  ].filter(Boolean) as Plugin[],
};

const mergeConfig = mergeWithCustomize({
  customizeArray: customizeArray({
    "resolve.extensions": CustomizeRule.Replace,
    "module.rules": CustomizeRule.Replace,
  }),
});

const createStorybookConfig = (defaultConfig: Configuration): Configuration => {
  return mergeConfig(defaultConfig, config);
};

export { createStorybookConfig };
