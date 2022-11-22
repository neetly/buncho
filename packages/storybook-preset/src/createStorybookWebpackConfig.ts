import { createWebpackConfig } from "@buncho/webpack-config";
import type { Configuration } from "webpack";
import {
  customizeArray,
  customizeObject,
  CustomizeRule,
  mergeWithCustomize,
} from "webpack-merge";

const merge = mergeWithCustomize({
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
    config,

    createWebpackConfig({
      mode,
      isDevServer,
      useReactRefresh,
    }),
  );
};

export { createStorybookWebpackConfig };
