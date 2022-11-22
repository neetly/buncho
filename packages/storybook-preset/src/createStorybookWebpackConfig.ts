import { createWebpackConfig } from "@buncho/webpack-config";
import type { Configuration } from "webpack";
import {
  customizeArray,
  customizeObject,
  CustomizeRule,
  merge,
  mergeWithCustomize,
} from "webpack-merge";

const override = mergeWithCustomize({
  customizeObject: customizeObject({
    resolve: CustomizeRule.Replace,
    module: CustomizeRule.Replace,
  }),
  customizeArray: customizeArray({
    "optimization.minimizer": CustomizeRule.Replace,
  }),
});

const createStorybookWebpackConfig = (
  config: Configuration,
  {
    mode = "production",
    isDevServer = false,
    useReactRefresh = true,
  }: {
    mode?: "production" | "development";
    isDevServer?: boolean;
    useReactRefresh?: boolean;
  } = {},
) => {
  return merge(
    override(
      config,

      createWebpackConfig({
        mode,
        isDevServer,
        useReactRefresh,
      }),
    ),

    {
      resolve: {
        alias: config.resolve?.alias,
        fallback: config.resolve?.fallback,
      },
    },
  );
};

export { createStorybookWebpackConfig };
