import { createWebpackConfig } from "@buncho/webpack-config";
import { merge } from "webpack-merge";

import { getConfig } from "../utils/getConfig";

export default async () => {
  const config = await getConfig();

  return merge(
    createWebpackConfig({
      publicPath: config?.publicPath,
    }),

    {
      stats: process.env.CI ? "normal" : "minimal",

      devServer: {
        host: config?.devServer?.host ?? "localhost",
        port: config?.devServer?.port ?? 3000,
        proxy: config?.devServer?.proxy,
      },
    },
  );
};
