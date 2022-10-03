import { createWebpackConfig } from "@buncho/webpack-config";
import type { Configuration } from "webpack";

import { getConfig } from "../utils/getConfig";

export default async (): Promise<Configuration> => {
  const config = await getConfig();

  return {
    ...createWebpackConfig({
      publicPath: config?.publicPath,
      host: config?.devServer?.host,
      port: config?.devServer?.port,
      proxy: config?.devServer?.proxy,
    }),

    stats: process.env.CI ? "normal" : "minimal",
  };
};
