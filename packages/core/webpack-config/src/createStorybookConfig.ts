import * as utils from "@buncho/utils";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import ReactDocgenTypescriptPlugin from "react-docgen-typescript-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import {
  customizeArray,
  CustomizeRule,
  merge,
  mergeWithCustomize,
} from "webpack-merge";

import { EXTENSIONS } from "./constants";
import { createRules } from "./createRules";
import { hasTsconfigPaths, production, useFastRefresh } from "./env";

const config: Configuration = {
  resolve: {
    extensions: EXTENSIONS,
    alias: utils.getWebpackAlias(),
    plugins: hasTsconfigPaths ? [new TsconfigPathsPlugin()] : [],
  },

  module: {
    rules: createRules({
      extract: false,
      customRules: [{ test: /\.ejs$/ }],
    }),
  },

  plugins: [
    new ReactDocgenTypescriptPlugin({
      tsconfigPath: path.resolve("./tsconfig.json"),
      // https://github.com/storybookjs/storybook/blob/v6.2.2/app/react/src/server/framework-preset-react-docgen.ts#L48-L49
      savePropValueAsString: true,
    }),

    new ForkTsCheckerPlugin({
      typescript: {
        configFile: path.resolve("./tsconfig.json"),
        build: true,
        mode: "write-references",
      },
      logger: {
        // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/495
        devServer: false,
      },
    }),

    !production && useFastRefresh && new ReactRefreshPlugin(),
  ].filter(Boolean) as Configuration["plugins"],
};

const mergeConfig = mergeWithCustomize({
  customizeArray: customizeArray({
    "resolve.extensions": CustomizeRule.Replace,
    "module.rules": CustomizeRule.Replace,
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
